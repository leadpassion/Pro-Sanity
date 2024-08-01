import { Box, Stack, Text } from '@sanity/ui'
import { CgScrollV } from 'react-icons/cg'
import {
  type FieldDefinition,
  type PreviewProps,
  type TypedObject,
  defineField,
} from 'sanity'
import { blockPreview } from 'sanity-pills'
import { accordion } from '../accordion'
import { awardsSlider } from '../awardsSlider'
import { bentoBox } from '../bentoBox'
import { cardDeck } from '../cardDeck'
import { caseStudyPanel } from '../caseStudyPanel'
import { conversionPanel } from '../conversionPanel'
import { definePageComponent } from '../definePageComponent'
import { embed } from '../embed'
import { floatingLinks } from '../floatingLinks'
import { headingBlock } from '../headingBlock'
import { hero } from '../hero'
import { imageGallery } from '../imageGallery'
import { overlappingCards } from '../overlappingCards'
import { resourceCardDeck } from '../resourceCardDeck'
import { scroller } from '../scroller'
import { sharedComponentReference } from '../sharedComponentReference'
import { statsPanel } from '../statsPanel'
import { switchback } from '../switchback'
import { switcher } from '../switcher'
import { testimonialPanel } from '../testimonialPanel'
import { trustBar } from '../trustBar'
import { videoEmbed } from '../videoEmbed'

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
          <Text size={1} key={sectionTitle} muted>
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
        (section: { _type: string; heading?: { text?: TypedObject[] } }) => {
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
