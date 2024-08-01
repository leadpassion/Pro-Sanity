import { studioApiVersion } from '@/lib/api'
import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { type PreviewProps, type TypedObject, useClient } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewConversionPanelProps extends PreviewProps {
  heading: {
    text: TypedObject[]
  }
  subheading: string
  ctaBar: {
    ctas: {
      _ref: string
    }[]
  }
  ctaCards: {
    title: string
    description: string
    ctaBar: {
      ctas: {
        actionType: string
        buttonText: string
      }[]
    }
  }[]
}

export const PreviewConversionPanel = (props: PreviewConversionPanelProps) => {
  const [ctaLabels, setCtaLabels] = useState<string[]>([])
  const { renderDefault, ctaBar, heading, subheading, ctaCards } = props
  const ctaIds = ctaBar?.ctas.map((cta) => cta._ref)
  const ctasBottom = ctaCards
    ?.map((ctaCard) => {
      return { title: ctaCard.title, description: ctaCard.description }
    })
    .filter(Boolean)

  const client = useClient({
    apiVersion: studioApiVersion,
  })

  useEffect(() => {
    const getCtaLabels = async (ctaIds: string[]) => {
      const ctaLabels = await client.fetch('*[_id in $ctaIds].buttonText', {
        ctaIds,
      })

      setCtaLabels(ctaLabels)
    }

    getCtaLabels(ctaIds)
  }, [ctaIds, client])

  const headingString = blockPreview(heading?.text)

  const nothingToPreview =
    !headingString && !subheading && !ctaIds && !ctasBottom

  return (
    <Box>
      {renderDefault({
        ...props,
        subtitle: nothingToPreview ? 'Add content to see it here.' : undefined,
      })}
      {!nothingToPreview && (
        <Card padding={4} margin={3} marginTop={2} border>
          <Stack space={3}>
            {headingString && (
              <Text size={1} weight="bold">
                {headingString}
              </Text>
            )}
            {subheading && (
              <Text size={1} muted>
                {subheading}
              </Text>
            )}
            {ctaLabels && (
              <Flex dir="row" gap={3}>
                {ctaLabels.map((label) => (
                  <Card key={label} padding={2} radius="full" border>
                    <Text size={1}>{label}</Text>
                  </Card>
                ))}
              </Flex>
            )}
            {ctasBottom && (
              <div>
                <div style={{ overflowX: 'scroll' }}>
                  <Flex dir="row" gap={3}>
                    {ctasBottom?.map((cta) => (
                      <Card
                        key={cta.title}
                        padding={3}
                        border
                        flex={1}
                        style={{ minWidth: '133px' }}
                      >
                        <Stack space={3}>
                          {cta.title && (
                            <Text size={0} weight="semibold">
                              {cta.title}
                            </Text>
                          )}
                          {cta.description && (
                            <Text size={0} muted>
                              {cta.description}
                            </Text>
                          )}
                        </Stack>
                      </Card>
                    ))}
                  </Flex>
                </div>
              </div>
            )}
          </Stack>
        </Card>
      )}
    </Box>
  )
}
