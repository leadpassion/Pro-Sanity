import { Box, Card, Flex, Text } from '@sanity/ui'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewBasicTextProps extends PreviewProps {
  title?: string
  panelLayout?: 'singleColumn' | 'twoColumns'
  body?: TypedObject[]
  bodyRight?: TypedObject[]
}

export const PreviewBasicText = (props: PreviewBasicTextProps) => {
  const { renderDefault, panelLayout, body, bodyRight } = props

  const nothingToPreview = !body && !bodyRight

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No text added' })
  }

  const bodyString = `${blockPreview(body)?.trim().slice(0, 200)}...`
  const bodyRightString = `${blockPreview(bodyRight)?.trim().slice(0, 200)}...`

  return (
    <Box>
      {renderDefault(props)}
      <Card margin={3} marginTop={2} padding={4} border>
        <Flex
          direction={panelLayout === 'twoColumns' ? 'row' : 'column'}
          gap={4}
          wrap="wrap"
        >
          {body && (
            <Text size={1} style={{ flex: 1, minWidth: '150px' }} muted>
              {bodyString}
            </Text>
          )}
          {bodyRight && (
            <Text size={1} style={{ flex: 1, minWidth: '150px' }} muted>
              {bodyRightString}
            </Text>
          )}
        </Flex>
      </Card>
    </Box>
  )
}
