import { studioApiVersion } from '@/lib'
import { Box, Card, Flex, Text } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { PreviewProps, useClient } from 'sanity'

interface PreviewResourceCardDeckProps extends PreviewProps {
  mode: 'dynamic' | 'manual'
  resources: {
    resource?: {
      _ref: string
    }
  }[]
}

export const PreviewResourceCardDeck = (
  props: PreviewResourceCardDeckProps,
) => {
  const [resourceTitles, setResourceTitles] = useState<string[]>([])
  const { renderDefault, mode, resources } = props
  const client = useClient({
    apiVersion: studioApiVersion,
  })
  const nothingToPreview =
    mode === 'manual' && (!resources || resources.length === 0)

  useEffect(() => {
    const resourceRefs = resources?.map((resource) => resource.resource?._ref)

    if (!resourceRefs) {
      return
    }

    const fetchResourceTitles = async () => {
      const resourceTitles = await client.fetch(
        `*[_id in $resourceRefs].title`,
        {
          resourceRefs,
        },
      )
      setResourceTitles(resourceTitles)
    }

    if (mode === 'manual' && resourceRefs.length > 0) {
      fetchResourceTitles()
    }
  }, [resources, client, mode])

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No resources added yet' })
  }

  if (mode === 'dynamic') {
    return renderDefault({
      ...props,
      subtitle: 'Resources will be selected dynamically.',
    })
  }

  return (
    <Box>
      {renderDefault(props)}
      {resourceTitles.length > 0 && (
        <Box padding={3}>
          <Flex
            direction="row"
            gap={2}
            wrap="nowrap"
            style={{ overflowX: 'scroll' }}
          >
            {resourceTitles?.map((title, index) => {
              return (
                <Card
                  key={index}
                  padding={2}
                  marginBottom={3}
                  border
                  style={{
                    width: '150px',
                    minWidth: '150px',
                  }}
                >
                  <Text size={1} muted>
                    {title}
                  </Text>
                </Card>
              )
            })}
          </Flex>
        </Box>
      )}
    </Box>
  )
}
