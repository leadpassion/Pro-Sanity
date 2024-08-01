import { RxDividerHorizontal } from 'react-icons/rx'
import { defineField } from 'sanity'

export const footerDivider = defineField({
  name: 'divider',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      initialValue: 'divider',
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: 'Divider',
        media: RxDividerHorizontal,
      }
    },
  },
})
