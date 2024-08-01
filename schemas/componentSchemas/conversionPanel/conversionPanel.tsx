import { ctaCard } from '@/schemas/componentSchemas/conversionPanel/ctaCard'
import { definePageComponent } from '@/schemas/componentSchemas/definePageComponent'
import { ctaBar } from '@/schemas/fields/complexComponentBody/ctaBar/ctaBar'
import { heading } from '@/schemas/fields/heading'
import { ArrowRightIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { PreviewConversionPanel } from './PreviewConversionPanel'

export const conversionPanel = definePageComponent({
  name: 'conversionPanel',
  title: 'Conversion Panel',
  description: 'A panel featuring one or more CTAs.',
  icon: ArrowRightIcon,
  fields: [
    {
      ...heading,
      initialValue: {
        headingLevel: 'h2',
        headingSize: 'display-lg',
      },
    },
    defineField({
      name: 'subheading',
      title: 'subheading',
      type: 'text',
      rows: 3,
    }),
    {
      ...ctaBar,
      description:
        'These CTAs will be displayed below the subheading and above the CTA cards.',
      options: {
        allowedCtaTypes: ['link', 'internalLink', 'download', 'emailCapture'],
      },
    },
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
