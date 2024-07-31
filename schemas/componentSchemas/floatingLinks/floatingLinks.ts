import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { defineHeadingField } from '@/schemas/fields/defineHeadingField'
import { HashIcon } from '@sanity/icons'
import { defineInternalLinkField, defineLinkField } from '@/schemas/fields'

export const floatingLinks = definePageComponent({
  name: 'floatingLinks',
  title: 'Floating Links',
  icon: HashIcon,
  description:
    'A component that presents a list of pills that the user can click on.',
  fields: [
    defineHeadingField(),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'links',
      title: 'Links',
      description:
        'Select the categories you want to display. These will be displayed as pills that the user can click on.',
      type: 'array',
      of: [
        {
          name: 'link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'External Link', value: 'external' },
                  { title: 'Link to Content', value: 'internal' },
                ],
              },
            }),
            defineInternalLinkField({
              hidden: ({ parent }) => parent?.type !== 'internal',
            }),
            defineLinkField({
              hidden: ({ parent }) => parent?.type !== 'external',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      links: 'links',
    },
    prepare: ({ categories: links }) => {
      const subtitle = links ? `${links.length} Links` : ''
      return {
        title: 'Floating Links',
        subtitle,
      }
    },
  },
})
