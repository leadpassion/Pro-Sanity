import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { LinkIcon } from '@sanity/icons'

export const logoLinks = definePageComponent({
  name: 'logoLinks',
  title: 'Logo Links',
  description:
    'A component that presents a list of logos that the user can click on to follow a link.',
  type: 'object',
  icon: LinkIcon,
  fields: [
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        defineField({
          name: 'logoLink',
          title: 'Logo Link',
          type: 'object',
          fieldsets: [
            { name: 'logo', title: 'Logo' },
            { name: 'link', title: 'Link' },
          ],
          fields: [
            defineField({
              name: 'company',
              title: 'Company',
              description: 'If set, the logo will be pulled from this company.',
              type: 'reference',
              fieldset: 'logo',
              to: [{ type: 'company' }],
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              fieldset: 'logo',
              description:
                'If set, this logo will be used instead of the company logo.',
              type: 'image',
            }),
            defineField({
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              fieldset: 'link',
              options: {
                list: [
                  { title: 'External Link', value: 'external' },
                  { title: 'Internal Link', value: 'internal' },
                ],
              },
              initialValue: 'external',
            }),
            defineField({
              name: 'internalLink',
              title: 'Internal Link',
              type: 'reference',
              fieldset: 'link',
              to: [{ type: 'page' }],
              hidden: ({ parent }) => parent?.linkType !== 'internal',
            }),
            defineField({
              name: 'externalLink',
              title: 'External Link',
              type: 'url',
              fieldset: 'link',
              hidden: ({ parent }) => parent?.linkType !== 'external',
            }),
          ],
        }),
      ],
    },
  ],
})
