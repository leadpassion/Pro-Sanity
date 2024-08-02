import { Box, Card, Stack, Text } from '@sanity/ui'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewHeadingBlockProps extends PreviewProps {
  title?: string
  eyebrow?: TypedObject[]
  heading?: TypedObject[]
  subheading?: TypedObject[]
  body?: TypedObject[]
}

export const PreviewHeadingBlock = (props: PreviewHeadingBlockProps) => {
  const { renderDefault, eyebrow, heading, subheading, body } = props

  const nothingToPreview = !eyebrow && !heading && !subheading && !body

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No content added' })
  }

  const eyebrowString = blockPreview(eyebrow)?.trim()
  const headingString = blockPreview(heading)?.trim()
  const subheadingString = blockPreview(subheading)?.trim()
  const bodyString = blockPreview(body)?.trim()

  return (
    <Box>
      {renderDefault(props)}
      <Card marginX={3} marginTop={2} marginBottom={3} padding={3} border>
        <Stack space={3}>
          {eyebrowString && (
            <Text size={0} weight="semibold" muted>
              {eyebrowString}
            </Text>
          )}
          {headingString && (
            <Text size={1} weight="bold">
              {headingString}
            </Text>
          )}
          {subheadingString && (
            <Text size={1} muted>
              {subheadingString}
            </Text>
          )}
          {bodyString && (
            <Text size={1} muted>
              {bodyString}
            </Text>
          )}
        </Stack>
      </Card>
    </Box>
  )
}
