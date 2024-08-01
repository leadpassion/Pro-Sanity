import { Box, Stack, Text } from '@sanity/ui'
import type { PreviewProps, TypedObject } from 'sanity'
import { blockPreview } from 'sanity-pills'

interface PreviewOverlappingCardsProps extends PreviewProps {
  cards: {
    heading: {
      text: TypedObject[]
    }
  }[]
}

export const PreviewOverlappingCards = (
  props: PreviewOverlappingCardsProps,
) => {
  const { renderDefault, cards } = props

  if (!cards) return renderDefault({ ...props, subtitle: 'No cards added yet' })

  return (
    <Box>
      {renderDefault(props)}
      <Stack space={2} paddingTop={1} paddingX={3} paddingBottom={3}>
        {cards.map((card, index) => {
          const headingString = blockPreview(card.heading?.text)
          return (
            <Text size={1} key={headingString} muted>
              {index + 1}. {headingString || 'Untitled Card'}
            </Text>
          )
        })}
      </Stack>
    </Box>
  )
}
