import type { SanityImageAsset } from '@/sanity.types'
import { Box, Card, Flex, Grid, Stack, Text } from '@sanity/ui'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewBentoBoxProps extends PreviewProps {
  heading?: TypedObject[]
  subheading?: string
  contentCards?: {
    logo?: SanityImageAsset
    description?: string
    content?: {
      _ref: string
    }
  }[]
  callouts?: string[]
}

export const PreviewBentoBox = (props: PreviewBentoBoxProps) => {
  const { renderDefault, heading, subheading, contentCards, callouts } = props

  const nothingToPreview = !heading && !subheading && !contentCards

  if (nothingToPreview) {
    return renderDefault(props)
  }

  const headingString = blockPreview(heading)

  return (
    <Box>
      {renderDefault(props)}
      <Card margin={3} marginTop={2} padding={4} border>
        <Stack space={3}>
          {headingString && (
            <Text size={1} weight="bold">
              {headingString}
            </Text>
          )}
          {subheading && <Text size={1}>{subheading}</Text>}
          <Grid columns={2} gap={3}>
            {contentCards?.map((card) => {
              return (
                <Card key={card.description} padding={3} border>
                  {card.description && <Text size={1}>{card.description}</Text>}
                </Card>
              )
            })}
            {callouts?.map((callout) => {
              return (
                <Card key={callout} padding={3} border>
                  <Text size={1}>{callout}</Text>
                </Card>
              )
            })}
          </Grid>
        </Stack>
      </Card>
    </Box>
  )
}
