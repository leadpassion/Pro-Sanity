import { ArrayInputWithJsonView } from '@/components/ArrayInputWithJsonView'
import {
  accordion,
  agenda,
  awardsSlider,
  basicText,
  bentoBox,
  brazeBenefitsPanel,
  brazeLeadershipPanel,
  brazeOfficesPanel,
  caseStudyPanel,
  conversionPanel,
  floatingLinks,
  headingBlock,
  hero,
  heroWithForm,
  heroMarquee,
  imageGallery,
  jobListingPanel,
  logoLinks,
  overlappingCards,
  resourceCardDeck,
  scroller,
  section,
  statsPanel,
  switchback,
  trustBar,
} from '@/schemas/componentSchemas'
import { switcher } from '@/schemas/componentSchemas/switcher'
import { simpleEmbeddedForm } from '@/schemas/fields/embeddedForm/simpleEmbeddedForm'
import { language } from '@/schemas/fields/language'
import { defineCalloutUIField } from '@/schemas/utilities'
import { alphabetizeByType } from '@/utils'
import { ComponentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
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
        heroMarquee,
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
        simpleEmbeddedForm,
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
    language,
  ],
  components: {
    preview: PreviewReusableContent,
  },
})
