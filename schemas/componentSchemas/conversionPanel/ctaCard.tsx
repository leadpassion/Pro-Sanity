import { ctaBar } from '@/schemas/fields/complexComponentBody/ctaBar/ctaBar'
import { ArrowRightIcon } from '@sanity/icons'
import { defineField } from 'sanity'

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
    {
      ...ctaBar,
      options: {
        allowedCtaTypes: ['link', 'internalLink', 'download'],
      },
    },
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
})
