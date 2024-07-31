import { SPECIAL_BRANDING_OPTIONS } from '@/lib'
import { defineIconField } from '@/schemas/fields'
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
    defineIconField(),
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
