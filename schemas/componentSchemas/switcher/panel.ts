import { defineComplexComponentBodyField } from '@/schemas/fields/defineComplexComponentBodyField/defineComplexComponentBodyField'
import { defineHeadingField } from '@/schemas/fields/defineHeadingField'
import { defineRichImageField } from '@/schemas/fields/defineRichImageField'
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
    defineHeadingField({
      defaultHeadingLevel: 'h3',
      defaultSize: 'display-md',
    }),
    defineComplexComponentBodyField({
      group: [],
    }),
    defineRichImageField({
      name: 'image',
      title: 'Image',
    }),
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
