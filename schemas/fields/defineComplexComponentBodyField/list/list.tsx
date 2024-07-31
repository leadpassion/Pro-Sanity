import { SPECIAL_BRANDING_OPTIONS } from '@/lib'
import { UlistIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { defineIconField } from '../../defineIconField'
import { PreviewList } from './PreviewList'

export const list = defineType({
  name: 'listEmbed',
  title: 'List',
  icon: UlistIcon,
  description: 'A list of items, including heading, description, and icons.',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              description: 'This will only be shown if the list is vertical.',
              type: 'minimalRichText',
            }),
            defineIconField(),
            defineField({
              name: 'specialBranding',
              title: 'Special Branding',
              description:
                'Does this item pertain to a topic with special branding, such as Sage AI?',
              type: 'string',
              options: {
                list: SPECIAL_BRANDING_OPTIONS,
              },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'direction',
      title: 'Direction',
      type: 'string',
      options: {
        list: ['vertical', 'horizontal'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'vertical',
    }),
  ],
  preview: {
    select: {
      items: 'items',
      direction: 'direction',
    },
  },
  components: {
    // @ts-expect-error
    preview: PreviewList,
  },
})
