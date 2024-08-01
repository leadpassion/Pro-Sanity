import { heading } from '@/schemas/fields/heading'
import { BsLayoutSidebarReverse } from 'react-icons/bs'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { panel } from './panel'

export const switcher = definePageComponent({
  name: 'switcher',
  title: 'Switcher',
  description: 'A tabbed collection of panels',
  icon: BsLayoutSidebarReverse,
  fields: [
    heading,
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
