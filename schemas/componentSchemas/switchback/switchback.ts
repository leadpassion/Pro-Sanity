import { complexComponentBody } from '@/schemas/fields'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { richImage } from '@/schemas/fields/richImage'
import { GoColumns } from 'react-icons/go'
import { defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'
import { definePageComponent } from '../definePageComponent'

export const switchback = definePageComponent({
  name: 'switchback',
  title: 'Switchback',
  icon: GoColumns,
  description:
    'A switchback is a component that alternates between an image or video and a block of text.',
  fields: [
    {
      ...eyebrow,
      group: 'content',
    },
    {
      ...heading,
      group: 'content',
      initialValue: {
        headingLevel: 'h3',
        headingSize: 'display-lg',
      },
    },
    {
      ...complexComponentBody,
      group: 'content',
    },
    defineField({
      name: 'mediaSide',
      title: 'Media Side',
      type: 'string',
      options: {
        list: ['left', 'right'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'right',
      group: ['media', 'layout'],
    }),

    // MASKABLE MEDIA FIELDS
    // Maskable Media Fields
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      hidden: ({ parent }) =>
        parent?.alignment === 'vertical' ||
        parent?.rightContentType !== 'media',
      options: {
        list: [
          {
            title: 'Image',
            value: 'image',
          },
          {
            title: 'Image Gallery',
            value: 'imageGallery',
          },
          {
            title: 'Video',
            value: 'video',
          },
          {
            title: 'Testimonials',
            value: 'testimonials',
          },
          {
            title: 'None',
            value: 'none',
          },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
    }),
    defineField({
      ...richImage,
      name: 'image',
      title: 'Image',
      group: 'right',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByThis = parent.mediaType !== 'image'

        return hiddenByThis
      },
    }),
    defineField({
      name: 'imageGalleryImages',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      group: 'right',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByThis = parent.mediaType !== 'imageGallery'

        return hiddenByThis
      },
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
      group: 'right',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByThis = parent.mediaType !== 'video'

        return hiddenByThis
      },
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
      group: 'right',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByThis = parent.mediaType !== 'testimonials'

        return hiddenByThis
      },
    }),
    defineField({
      name: 'mask',
      title: 'Mask',
      type: 'string',
      options: {
        list: [
          {
            title: 'None',
            value: 'none',
          },
          {
            title: 'Swoosh 1',
            value: 'swoosh1',
          },
          {
            title: 'Swoosh 2',
            value: 'swoosh2',
          },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'none',
      group: 'right',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByThis = ['none', 'imageGallery', 'tesimonials'].includes(
          parent.mediaType,
        )
        return hiddenByThis
      },
    }),
  ],
  preview: {
    select: {
      eyebrow: 'eyebrow.text',
      heading: 'heading.text',
      media: 'media',
    },
    prepare({ eyebrow, heading, media }) {
      const title = blockPreview(heading)
      const subtitle = blockPreview(eyebrow)

      return {
        title,
        subtitle,
        media: media?.mediaType === 'image' ? media?.image : null,
      }
    },
  },
})
