import { DocumentVideoIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const video = defineType({
  name: 'video',
  type: 'document',
  icon: DocumentVideoIcon,
  fields: [
    defineField({
      name: 'videoDetails',
      title: 'Video Details',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'videoProvider',
          title: 'Video Provider',
          type: 'string',
          options: {
            list: [
              { title: 'YouTube', value: 'youtube' },
              { title: 'Wistia', value: 'wistia' },
            ],
          },
          validation: (Rule) => Rule.required(),
          initialValue: 'wistia',
        }),
        defineField({
          name: 'videoId',
          title: 'Video ID',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'thumbnail',
          title: 'Thumbnail',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'videoDetails.title',
      media: 'videoDetails.thumbnail',
      subtitle: 'videoDetails.videoProvider',
    },
  },
})
