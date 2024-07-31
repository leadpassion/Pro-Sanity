import { studioApiVersion } from '@/lib/api'
import { Box, Card, Flex, Text } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { PreviewProps, useClient } from 'sanity'

interface PreviewCtaBarProps extends PreviewProps {
  ctas: {
    _ref: string
  }[]
}

export const PreviewCtaBar = (props: PreviewCtaBarProps) => {
  const [ctaLabels, setCtaLabels] = useState<string[]>([])
  const { renderDefault, ctas } = props

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

    if (!ctas) {
      return
    }

    const ctaIds = ctas.map((cta) => cta._ref)

    getCtaLabels(ctaIds)
  }, [ctas, client])

  if (!ctas) {
    return (
      <Box>
        {renderDefault({
          ...props,
          title: 'CTA Bar',
          subtitle: 'No CTAs added yet',
        })}
      </Box>
    )
  }

  return (
    <Box>
      {renderDefault({ ...props, title: 'CTA Bar' })}
      {ctaLabels && ctaLabels?.length > 0 && (
        <Flex direction="row" gap={2} padding={2}>
          {ctaLabels?.map((label, index) => {
            return (
              <Card key={index} padding={2} radius="full" border>
                <Flex direction="row" gap={1} align="center">
                  <Text size={1}>{label}</Text>
                </Flex>
              </Card>
            )
          })}
        </Flex>
      )}
    </Box>
  )
}
