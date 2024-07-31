import { ArrayInputWithJsonView } from '@/components/ArrayInputWithJsonView'
import { alphabetizeByType } from '@/utils'
import { ComponentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { defineLanguageField } from '@/schemas/fields/defineLanguageField'
import {
  accordion,
  awardsSlider,
  basicText,
  bentoBox,
  brazeBenefitsPanel,
  brazeLeadershipPanel,
  caseStudyPanel,
  conversionPanel,
  floatingLinks,
  headingBlock,
  hero,
  heroWithForm,
  imageGallery,
  jobListingPanel,
  overlappingCards,
  resourceCardDeck,
  scroller,
  section,
  statsPanel,
  switchback,
  trustBar,
  brazeOfficesPanel,
  logoLinks,
  agenda,
} from '@/schemas/componentSchemas'
import { switcher } from '@/schemas/componentSchemas/switcher'
import { defineEmbeddedFormField } from '@/schemas/fields'
import { defineCalloutUIField } from '@/schemas/utilities'
import { PreviewReusableContent } from './PreviewReusableContent'

export const sharedComponent = defineType({
  name: 'sharedComponent',
  title: 'Shared Component',
  description: 'A component that can be shared across multiple pages.',
  icon: ComponentIcon,
  type: 'document',
  fields: [
    defineCalloutUIField({
      heading: 'This is a Shared Component.',
      body: 'Shared components are reusable pieces of content that can be used across multiple pages. They are a great way to maintain consistency and reduce duplication.',
    }),
    defineField({
      name: 'name',
      title: 'Component Name',
      description: 'This is used to identify the component in Sanity.',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      description:
        'These components will be displayed wherever this shared component is used.',
      type: 'array',
      of: alphabetizeByType([
        trustBar,
        awardsSlider,
        caseStudyPanel,
        headingBlock,
        scroller,
        section,
        switchback,
        resourceCardDeck,
        conversionPanel,
        hero,
        heroWithForm,
        bentoBox,
        imageGallery,
        overlappingCards,
        statsPanel,
        floatingLinks,
        switcher,
        accordion,
        basicText,
        logoLinks,
        agenda,
        defineEmbeddedFormField(),
        // Specific types for shared components
        jobListingPanel,
        brazeBenefitsPanel,
        brazeLeadershipPanel,
        brazeOfficesPanel,
      ]),
      components: {
        input: ArrayInputWithJsonView,
      },
    }),
    defineLanguageField(),
  ],
  components: {
    preview: PreviewReusableContent,
  },
})
