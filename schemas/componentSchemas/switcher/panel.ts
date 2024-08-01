import { complexComponentBody } from '@/schemas/fields'
import { heading } from '@/schemas/fields/heading'
import { richImage } from '@/schemas/fields/richImage'
import { PanelLeftIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export const panel = defineField({
  name: 'panel',
  title: 'Generic Panel',
  type: 'object',
  icon: PanelLeftIcon,
  fields: [
    defineField({
      name: 'tabTitle',
      title: 'Tab Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    {
      ...heading,
      initialValue: {
        headingLevel: 'h3',
        headingSize: 'display-md',
      },
    },
    {
      ...complexComponentBody,
      group: [],
    },
    {
      ...richImage,
      name: 'image',
    },
  ],
  preview: {
    select: {
      title: 'tabTitle',
    },
    prepare({ title }) {
      return {
        title,
      }
    },
  },
})
