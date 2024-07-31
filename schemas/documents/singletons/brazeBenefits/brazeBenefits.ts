import { defineHeadingField } from '@/schemas/fields/defineHeadingField'
import { BiHealth } from 'react-icons/bi'
import { defineField, defineType } from 'sanity'
import { benefitsForCountry } from './benefitsForCountry'
import { defineLanguageField } from '@/schemas/fields/defineLanguageField'

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
    defineHeadingField({
      defaultHeadingLevel: 'h2',
      defaultSize: 'display-lg',
    }),
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
    defineLanguageField(),
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
