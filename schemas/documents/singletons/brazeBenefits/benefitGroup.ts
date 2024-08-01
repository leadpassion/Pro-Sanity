import { ICON_COLORS } from '@/lib'
import { icon } from '@/schemas/fields/icon'
import { defineField } from 'sanity'
import { benefit } from './benefit'

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
    {
      ...icon,
      fieldset: 'icon',
    },
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
