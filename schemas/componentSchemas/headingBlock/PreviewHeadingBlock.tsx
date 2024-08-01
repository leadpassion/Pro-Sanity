import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewHeadingBlockProps extends PreviewProps {
  title?: string
  eyebrow?: TypedObject[]
  heading?: TypedObject[]
  subheading?: TypedObject[]
  ctas?: {
    actionType: string
    buttonText?: string
  }[]
}

export const PreviewHeadingBlock = (props: PreviewHeadingBlockProps) => {
  const { renderDefault, eyebrow, heading, subheading, ctas } = props

  const nothingToPreview = !eyebrow && !heading && !subheading && !ctas

  if (nothingToPreview) {
    return renderDefault({ ...props, subtitle: 'No content added' })
  }

  const eyebrowString = blockPreview(eyebrow)?.trim()
  const headingString = blockPreview(heading)?.trim()
  const subheadingString = blockPreview(subheading)?.trim()

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
          {ctas && ctas.length > 0 && (
            <Flex direction="row" gap={2}>
              {ctas?.map((cta) => (
                <Card
                  key={`cta-${cta.buttonText}`}
                  radius="full"
                  border
                  padding={2}
                >
                  <Text size={0}>{cta.buttonText}</Text>
                </Card>
              ))}
            </Flex>
          )}
        </Stack>
      </Card>
    </Box>
  )
}
