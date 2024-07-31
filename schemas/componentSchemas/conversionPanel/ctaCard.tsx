import { PreviewProps, defineField } from 'sanity'
import { ArrowRightIcon } from '@sanity/icons'
import { defineCtaBarField } from '@/schemas/fields/defineComplexComponentBodyField/ctaBar/defineCtaBarField'
import { Box, Card, Flex, Stack, Text } from '@sanity/ui'

interface PreviewCtaCardProps extends PreviewProps {
  heading: string
  description: string
  ctaBar: {
    ctas: {
      actionType: string
      buttonText: string
    }[]
  }
}

const PreviewCtaCard = (props: PreviewCtaCardProps) => {
  const { renderDefault, ctaBar, heading, description } = props
  const ctas = ctaBar?.ctas

  if (!ctas) {
    return renderDefault({
      ...props,
      subtitle: 'No CTAs added',
    })
  }

  return (
    <Box>
      {renderDefault(props)}
      <Card padding={3} margin={3} marginTop={2} border>
        <Stack space={3}>
          {heading && (
            <Text size={1} weight="bold">
              {heading}
            </Text>
          )}
          {description && (
            <Text size={1} muted>
              {description}
            </Text>
          )}
          <Flex dir="row" gap={3}>
            {ctas.map((cta, index) => (
              <Card key={index} padding={2} radius="full" border>
                <Text key={index} size={1}>
                  {cta.buttonText}
                </Text>
              </Card>
            ))}
          </Flex>
        </Stack>
      </Card>
    </Box>
  )
}

export const ctaCard = defineField({
  name: 'ctaCard',
  title: 'CTA Card',
  icon: ArrowRightIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineCtaBarField({
      allowedCtaTypes: ['link', 'internalLink', 'download'],
    }),
  ],
  preview: {
    select: {
      heading: 'title',
      description: 'description',
      ctaBar: 'ctaBar',
    },
    prepare({ heading, description, ctaBar }) {
      return {
        title: 'CTA Card',
        heading,
        description,
        ctaBar,
      }
    },
  },
  components: {
    preview: PreviewCtaCard,
  },
})
