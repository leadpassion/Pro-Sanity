import { GoFoldDown } from 'react-icons/go'
import { definePageComponent } from '../definePageComponent'
import { defineArrayMember, defineField } from 'sanity'

export const scroller = definePageComponent({
  name: 'scroller',
  title: 'Section Link Scroller',
  icon: GoFoldDown,
  description:
    'A scroller is a list of buttons that a user can click to scroll to particular sections of a page.',
  fields: [
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'target',
              title: 'Target Section ID',
              description:
                "The ID of the section that this link will scroll to. You can set the ID for any section in its Settings tab. Once you've set the ID, it will appear in this list.",
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      links: 'links',
    },
    prepare({ links }) {
      const subtitle = (links as { label: string }[])
        ?.map((link) => link.label)
        .filter(Boolean)
        .join(', ')

      return {
        title: 'Section Link Scroller',
        subtitle,
      }
    },
  },
})
