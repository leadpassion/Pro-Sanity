import { TfiLayoutAccordionSeparated } from 'react-icons/tfi'
import { definePageComponent } from '../definePageComponent'
import { defineField } from 'sanity'
import { accordionItem } from './accordionItem'
import { PreviewAccordion } from './PreviewAccordion'

export const accordion = definePageComponent({
  name: 'accordion',
  title: 'Accordion',
  description: 'Accordion component',
  icon: TfiLayoutAccordionSeparated,
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [accordionItem],
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare: ({ items }) => ({
      title: 'Accordion',
      items,
    }),
  },
  components: {
    preview: PreviewAccordion,
  },
})
