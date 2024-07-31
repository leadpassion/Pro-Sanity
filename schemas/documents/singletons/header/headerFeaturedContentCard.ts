import { defineField } from 'sanity'

const REFERENCABLE_TYPES = ['caseStudy']

export const headerFeaturedContentCard = defineField({
  name: 'featuredContentCard',
  title: 'Featured Content Card',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'reference',
      to: REFERENCABLE_TYPES.map((type) => ({ type })),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],
})
