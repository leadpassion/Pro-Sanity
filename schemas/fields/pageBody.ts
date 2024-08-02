import { simpleEmbeddedForm } from '@/schemas/fields/embeddedForm/simpleEmbeddedForm'
import { alphabetizeByType } from '@/utils'
import { defineField } from 'sanity'
import {
  accordion,
  agenda,
  awardsSlider,
  basicText,
  bentoBox,
  cardDeck,
  caseStudyPanel,
  conversionPanel,
  downloadPanel,
  embed,
  floatingLinks,
  headingBlock,
  hero,
  heroWithForm,
  heroMarquee,
  imageBlock,
  imageGallery,
  logoLinks,
  overlappingCards,
  resourceCardDeck,
  scroller,
  section,
  sharedComponentReference,
  statsPanel,
  switchback,
  testimonialPanel,
  trustBar,
  videoEmbed,
} from '../componentSchemas'
import { switcher } from '../componentSchemas/switcher'

export const pageBody = defineField({
  name: 'body',
  title: 'Body',
  group: 'content',
  type: 'array',
  of: alphabetizeByType([
    // Layouts
    scroller,
    section,
    switchback,
    switcher,
    accordion,
    cardDeck,
    bentoBox,

    // Links + Resources
    resourceCardDeck,
    floatingLinks,
    downloadPanel,
    conversionPanel,
    logoLinks,

    // Customers
    statsPanel,
    testimonialPanel,
    caseStudyPanel,
    overlappingCards,
    imageGallery,
    trustBar,
    awardsSlider,

    // Intros
    hero,
    heroWithForm,
    heroMarquee,
    headingBlock,

    // Misc.
    sharedComponentReference,
    basicText,
    imageBlock,
    embed,
    videoEmbed,
    agenda,
    simpleEmbeddedForm,
  ]),
  components: {
    // input: ArrayInputWithJsonView,
  },
  options: {
    insertMenu: {
      filter: true,
      views: [
        {
          name: 'grid',
          // @ts-expect-error -- sanity types are missing for this new feature
          previewImageUrl: (schemaTypeName) =>
            `/static/componentPreviews/${schemaTypeName}.png`,
        },
        { name: 'list' },
      ],
      groups: [
        {
          name: 'layouts',
          title: 'Layouts',
          of: [
            'scroller',
            'section',
            'switchback',
            'switcher',
            'accordion',
            'cardDeck',
            'bentoBox',
          ],
        },
        {
          name: 'intros',
          title: 'Intros',
          of: ['hero', 'heroWithForm', 'heroMarquee', 'headingBlock'],
        },
        {
          name: 'customers',
          title: 'Customers',
          of: [
            'statsPanel',
            'testimonialPanel',
            'trustBar',
            'caseStudyPanel',
            'overlappingCards',
            'imageGallery',
          ],
        },
        {
          name: 'linksAndResources',
          title: 'Links & Resources',
          of: [
            'resourceCardDeck',
            'floatingLinks',
            'downloadPanel',
            'conversionPanel',
            'logoLinks',
          ],
        },
        {
          name: 'misc',
          title: 'Misc.',
          of: [
            'sharedComponentReference',
            'basicText',
            'awardsSlider',
            'embed',
            'videoEmbed',
            'agenda',
          ],
        },
      ],
    },
  },
})
