import { ConditionalPropertyCallback, defineField } from 'sanity'
import { defineRichImageField } from './defineRichImageField'

interface MaskableMediaFieldsOptions {
  group: string | string[]
  hidden?: ConditionalPropertyCallback
}

export const defineMaskableMediaFields = (
  options: MaskableMediaFieldsOptions,
) => {
  const { group, hidden: hiddenByParent } = options || {}

  return [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      group,
      hidden: hiddenByParent,
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
    defineRichImageField({
      name: 'image',
      title: 'Image',
      group,
      hidden: (context) => {
        const hiddenByThis = context.parent.mediaType !== 'image'
        return hiddenByParent
          ? hiddenByParent(context) || hiddenByThis
          : hiddenByThis
      },
    }),
    defineField({
      name: 'imageGalleryImages',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      group,
      hidden: (context) => {
        const hiddenByThis = context.parent.mediaType !== 'imageGallery'
        return hiddenByParent
          ? hiddenByParent(context) || hiddenByThis
          : hiddenByThis
      },
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
      group,
      hidden: (context) => {
        const hiddenByThis = context.parent.mediaType !== 'video'
        return hiddenByParent
          ? hiddenByParent(context) || hiddenByThis
          : hiddenByThis
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
      group,
      hidden: (context) => {
        const hiddenByThis = context.parent.mediaType !== 'testimonials'
        return hiddenByParent
          ? hiddenByParent(context) || hiddenByThis
          : hiddenByThis
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
      group,
      hidden: (context) => {
        const thisHidden = ['none', 'imageGallery', 'tesimonials'].includes(
          context.parent.mediaType,
        )
        return hiddenByParent
          ? hiddenByParent(context) || thisHidden
          : thisHidden
      },
    }),
  ]
}
