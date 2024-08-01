import { heading } from '@/schemas/fields/heading'
import { language } from '@/schemas/fields/language'
import { BiHealth } from 'react-icons/bi'
import { defineField, defineType } from 'sanity'
import { benefitsForCountry } from './benefitsForCountry'

export const brazeBenefits = defineType({
  name: 'brazeBenefits',
  title: 'Braze Benefits',
  type: 'document',
  icon: BiHealth,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
      // This is a hidden field that is used to set the title of the document in the studio
      hidden: true,
    },
    {
      ...heading,
      initialValue: {
        headingLevel: 'h2',
        headingSize: 'display-lg',
      },
    },
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'simpleRichText',
    }),
    defineField({
      name: 'countries',
      title: 'Countries',
      type: 'array',
      of: [benefitsForCountry],
    }),
    language,
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare: ({ title, language }) => ({
      title,
      subtitle: language,
    }),
  },
})
