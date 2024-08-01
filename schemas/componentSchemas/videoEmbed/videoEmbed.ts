import { PlayIcon } from '@sanity/icons'
import { definePageComponent } from '../definePageComponent'
import { defineField } from 'sanity'

export const videoEmbed = definePageComponent({
  name: 'videoEmbed',
  title: 'Video',
  description: 'An embedded video',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'videoReference',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
    }),
  ],
  preview: {
    select: {
      videoReference: 'videoReference',
      videoTitle: 'videoReference.videoDetails.title',
      thumbnail: 'videoReference.videoDetails.thumbnail',
    },
    prepare({ videoReference, videoTitle, thumbnail }) {
      const subtitle = videoReference
        ? videoTitle || 'Untitled video'
        : 'No video selected'

      return {
        title: 'Video Block',
        subtitle,
        media: thumbnail,
      }
    },
  },
})
