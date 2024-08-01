import { BsCardHeading } from 'react-icons/bs'
import { defineField } from 'sanity'

const REFERENCABLE_TYPES = [
  'caseStudy',
  'blogPost',
  'page',
  'event',
  'webinar',
  'report',
  'guide',
]

export const bentoContentCard = defineField({
  name: 'bentoContentCard',
  title: 'Bento Content Card',
  icon: BsCardHeading,
  type: 'object',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'reference',
      to: REFERENCABLE_TYPES.map((type) => ({ type })),
    }),
  ],
})
