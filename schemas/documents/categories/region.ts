import { PAGE_TYPES } from '@/lib'
import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const region = defineType({
  name: 'region',
  title: 'Region',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'internationalizedArrayString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Category Slug',
      type: 'slug',
      description: 'Unique part of the url for this category',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedPage',
      title: 'Related Page',
      description:
        'The page that this category is associated with, if any. Clicking on this category will take the user to this page in some contexts.',
      type: 'reference',
      to: PAGE_TYPES.map((page) => ({ type: page })),
    }),
  ],
  preview: {
    select: {
      title: 'name.0.value',
    },
  },
})
