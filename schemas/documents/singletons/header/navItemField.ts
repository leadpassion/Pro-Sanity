import { SPECIAL_BRANDING_OPTIONS } from '@/lib'
import { icon } from '@/schemas/fields/icon'
import { defineField } from 'sanity'

export const navItemField = defineField({
  name: 'navItem',
  title: 'Nav Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: (Rule) => Rule.uri({ allowRelative: true }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    icon,
    defineField({
      name: 'specialBranding',
      title: 'Special Branding',
      type: 'string',
      options: {
        list: SPECIAL_BRANDING_OPTIONS,
      },
    }),
  ],
})
