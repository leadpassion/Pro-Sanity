import { UserIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export const brazeLeader = defineField({
  name: 'brazeLeader',
  title: 'Braze Leader',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sponsors',
      title: 'Sponsors',
      description: 'What employee groups does this leader sponsor?',
      type: 'string',
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      title: 'title',
      media: 'headshot',
    },
    prepare({ name, title, media }) {
      return {
        title: name,
        subtitle: title,
        media,
      }
    },
  },
})
