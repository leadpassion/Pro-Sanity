import { ICON_COLORS } from '@/lib'
import { defineField } from 'sanity'
import { benefit } from './benefit'
import { defineIconField } from '@/schemas/fields'

export const benefitGroup = defineField({
  name: 'benefitGroup',
  title: 'Benefit Group',
  type: 'object',
  fieldsets: [
    {
      name: 'icon',
      title: 'Icon',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineIconField({
      fieldset: 'icon',
    }),
    defineField({
      name: 'iconColor',
      title: 'Icon Color',
      type: 'simplerColor',
      options: {
        collapsible: false,
        colorList: ICON_COLORS,
      },
      fieldset: 'icon',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [benefit],
    }),
  ],
})
