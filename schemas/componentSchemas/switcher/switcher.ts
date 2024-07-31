import { BsLayoutSidebarReverse } from 'react-icons/bs'
import { definePageComponent } from '../definePageComponent'
import { defineHeadingField } from '@/schemas/fields/defineHeadingField'
import { defineField } from 'sanity'
import { panel } from './panel'

export const switcher = definePageComponent({
  name: 'switcher',
  title: 'Switcher',
  description: 'A tabbed collection of panels',
  icon: BsLayoutSidebarReverse,
  fields: [
    defineHeadingField({}),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'panels',
      title: 'Panels',
      type: 'array',
      of: [panel],
    }),
  ],
  preview: {
    select: {
      heading: 'heading.text',
      panels: 'panels',
    },
    prepare: ({ heading, panels }) => {
      return {
        title: 'Switcher',
        heading,
        panels,
      }
    },
  },
})
