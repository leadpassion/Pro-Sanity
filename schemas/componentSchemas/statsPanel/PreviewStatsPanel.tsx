import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewStatsPanelProps extends PreviewProps {
  stats?: {
    value?: string
    description?: TypedObject[]
  }[]
}

export const PreviewStatsPanel = (props: PreviewStatsPanelProps) => {
  const { renderDefault, stats } = props

  if (!stats || stats?.length === 0) {
    return renderDefault({ ...props, subtitle: 'No stats provided yet' })
  }

  return (
    <Box>
      {renderDefault(props)}
      {stats.length > 0 && (
        <div style={{ overflowX: 'scroll' }}>
          <Flex margin={3} marginTop={2} dir="row" gap={3}>
            {stats.map((stat, index) => {
              const shouldShowCard = stat.value || stat.description

              if (!shouldShowCard) {
                return undefined
              }

              const descriptionString = blockPreview(stat.description)
              return (
                <Card
                  key={index}
                  padding={3}
                  style={{
                    width: '150px',
                    minWidth: '150px',
                    flexShrink: 0,
                  }}
                  border
                >
                  <Stack space={3}>
                    <Text size={3} weight="bold">
                      {stat.value}
                    </Text>
                    <Text size={1}>{descriptionString}</Text>
                  </Stack>
                </Card>
              )
            })}
          </Flex>
        </div>
      )}
    </Box>
  )
}

// Tes
