import { ArrayInputWithJsonView } from '@/components/ArrayInputWithJsonView'
import { ConditionalProperty, defineField } from 'sanity'
import { alphabetizeByType } from '@/utils'
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
import { defineEmbeddedFormField } from './defineEmbeddedFormField'

interface PageBodyFieldOptions {
  name?: string
  title?: string
  group?: string
  hidden?: ConditionalProperty
}

export const definePageBodyField = (options: PageBodyFieldOptions | void) => {
  const {
    name = 'body',
    title = 'Body',
    group = 'content',
    hidden,
  } = options || {}
  return defineField({
    name,
    title,
    group,
    type: 'array',
    hidden,
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
      headingBlock,

      // Misc.
      sharedComponentReference,
      basicText,
      imageBlock,
      embed,
      videoEmbed,
      agenda,

      defineEmbeddedFormField({ name: 'embeddedForm' }),
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
            of: ['hero', 'heroWithForm', 'headingBlock'],
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
}
