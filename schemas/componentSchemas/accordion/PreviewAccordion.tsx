import { Box, Stack, Text } from '@sanity/ui'
import type { PreviewProps } from 'sanity'

interface PreviewAccordionProps extends PreviewProps {
  items: {
    title?: string
  }[]
}

export const PreviewAccordion = (props: PreviewAccordionProps) => {
  const { renderDefault, items } = props

  if (!items || items?.length === 0) {
    return renderDefault({ ...props, subtitle: 'No items given' })
  }

  return (
    <Box>
      {renderDefault(props)}
      {items?.length && (
        <Box margin={3} marginTop={2}>
          <Stack space={2}>
            {items.map((item) => (
              <Text size={1} muted key={item.title}>
                {item.title}
              </Text>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}
