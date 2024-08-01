import { ImageIcon } from '@sanity/icons'
import { definePageComponent } from '../definePageComponent'
import { defineField } from 'sanity'
import { PreviewImageGallery } from './PreviewImageGallery'

export const imageGallery = definePageComponent({
  name: 'imageGallery',
  title: 'Image Gallery',
  description: 'A gallery of images.',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({ images }) {
      return {
        title: 'Image Gallery',
        images,
      }
    },
  },
  components: {
    preview: PreviewImageGallery,
  },
})
