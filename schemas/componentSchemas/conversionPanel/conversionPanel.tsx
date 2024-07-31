import { definePageComponent } from '@/schemas/componentSchemas/definePageComponent'
import { ArrowRightIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { defineHeadingField } from '@/schemas/fields/defineHeadingField'
import { defineCtaBarField } from '@/schemas/fields/defineComplexComponentBodyField/ctaBar/defineCtaBarField'
import { ctaCard } from '@/schemas/componentSchemas/conversionPanel/ctaCard'
import { PreviewConversionPanel } from './PreviewConversionPanel'

export const conversionPanel = definePageComponent({
  name: 'conversionPanel',
  title: 'Conversion Panel',
  description: 'A panel featuring one or more CTAs.',
  icon: ArrowRightIcon,
  fields: [
    defineHeadingField({
      defaultHeadingLevel: 'h2',
      defaultSize: 'display-lg',
    }),
    defineField({
      name: 'subheading',
      title: 'subheading',
      type: 'text',
      rows: 3,
    }),
    defineCtaBarField({
      allowedCtaTypes: ['link', 'internalLink', 'download', 'emailCapture'],
      description:
        'These CTAs will be displayed below the subheading and above the CTA cards.',
    }),
    defineField({
      name: 'ctaCards',
      title: 'CTA Cards',
      type: 'array',
      of: [ctaCard],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      subheading: 'subheading',
      ctaBar: 'ctaBar',
      ctaCards: 'ctaCards',
    },
    prepare: ({ heading, subheading, ctaBar, ctaCards }) => {
      return {
        title: 'Conversion Panel',
        heading,
        subheading,
        ctaBar,
        ctaCards,
      }
    },
  },
  components: {
    preview: PreviewConversionPanel,
  },
})
