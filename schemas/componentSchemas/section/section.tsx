import { CgScrollV } from 'react-icons/cg'
import { FieldDefinition, PreviewProps, defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'
import { Box, Stack, Text } from '@sanity/ui'
import { definePageComponent } from '../definePageComponent'
import { headingBlock } from '../headingBlock'
import { scroller } from '../scroller'
import { switchback } from '../switchback'
import { trustBar } from '../trustBar'
import { caseStudyPanel } from '../caseStudyPanel'
import { resourceCardDeck } from '../resourceCardDeck'
import { awardsSlider } from '../awardsSlider'
import { conversionPanel } from '../conversionPanel'
import { hero } from '../hero'
import { bentoBox } from '../bentoBox'
import { imageGallery } from '../imageGallery'
import { overlappingCards } from '../overlappingCards'
import { statsPanel } from '../statsPanel'
import { sharedComponentReference } from '../sharedComponentReference'
import { cardDeck } from '../cardDeck'
import { testimonialPanel } from '../testimonialPanel'
import { embed } from '../embed'
import { videoEmbed } from '../videoEmbed'
import { floatingLinks } from '../floatingLinks'
import { switcher } from '../switcher'
import { accordion } from '../accordion'

interface PreviewSectionProps extends PreviewProps {
  componentTitles: string[]
}

const ALLOWED_SECTION_TYPES_WITHIN_SCROLLER: FieldDefinition[] = [
  headingBlock,
  scroller,
  switchback,
  trustBar,
  caseStudyPanel,
  resourceCardDeck,
  awardsSlider,
  conversionPanel,
  hero,
  bentoBox,
  imageGallery,
  overlappingCards,
  statsPanel,
  sharedComponentReference,
  cardDeck,
  testimonialPanel,
  embed,
  videoEmbed,
  floatingLinks,
  switcher,
  accordion,
]

const PreviewSection = (props: PreviewSectionProps) => {
  const { renderDefault, componentTitles } = props

  if (!componentTitles)
    return renderDefault({ ...props, subtitle: 'No sections added yet' })

  return (
    <Box>
      {renderDefault(props)}
      <Stack space={2} paddingTop={1} paddingX={3} paddingBottom={3}>
        {componentTitles.map((sectionTitle, index) => (
          <Text size={1} key={index} muted>
            {index + 1}. {sectionTitle}
          </Text>
        ))}
      </Stack>
    </Box>
  )
}

export const section = definePageComponent({
  name: 'section',
  title: 'Section',
  description:
    'A section is a series of page components within a single scrollable container.',
  icon: CgScrollV,
  fields: [
    defineField({
      name: 'isScrolling',
      title: 'Is Scrolling?',
      description:
        'If enabled, each component will be displayed next to an index as the user scrolls down the page.',
      type: 'boolean',
      initialValue: false,
      group: 'layout',
    }),
    defineField({
      name: 'components',
      title: 'Components',
      type: 'array',
      of: ALLOWED_SECTION_TYPES_WITHIN_SCROLLER,
    }),
  ],
  preview: {
    select: {
      components: 'components',
    },
    prepare({ components }) {
      const componentTitles = components?.map(
        // TODO: Update this to accomodate different section types
        (section: any) => {
          const title =
            blockPreview(section.heading?.text).trim() || 'Untitled Section'
          const type = section._type

          const sectionLabel = `${title} (${type})`

          return sectionLabel
        },
      )

      return {
        title: 'Section',
        componentTitles,
      }
    },
  },
  components: {
    preview: PreviewSection,
  },
})
