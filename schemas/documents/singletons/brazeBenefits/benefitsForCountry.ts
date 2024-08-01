import { defineField } from 'sanity'
import { benefitGroup } from './benefitGroup'

export const benefitsForCountry = defineField({
  name: 'benefitsForCountry',
  title: 'Benefits For Country',
  type: 'object',
  fields: [
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'benefitGroup',
      title: 'Benefit Groups',
      type: 'array',
      of: [benefitGroup],
    }),
  ],
})
