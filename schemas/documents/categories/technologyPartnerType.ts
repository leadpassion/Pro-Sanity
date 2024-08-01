import { PAGE_TYPES } from '@/lib'
import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const technologyPartnerType = defineType({
  name: 'technologyPartnerType',
  title: 'Technology Partner Type',
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
      name: 'parent',
      title: 'Parent',
      type: 'reference',
      to: [{ type: 'technologyPartnerType' }],
      options: {
        // Prevent adding other children or self-reference
        filter: ({ document }) => {
          return {
            filter: '!defined(parent) && (_id != $docId)', // prevent draft !(_id in path("drafts.**")) &&
            params: {
              docId: document._id,
            },
          }
        },
      },
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
