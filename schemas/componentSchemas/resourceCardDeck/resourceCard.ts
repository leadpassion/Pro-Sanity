import { PAGE_TYPES, RESOURCE_TYPES } from '@/lib'
import { convertCamelCaseToTitleCase } from '@/utils'
import { DocumentIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export const REFERENCABLE_RESOURCE_CARD_TYPES = [
  ...RESOURCE_TYPES,
  ...PAGE_TYPES,
]

export const resourceCard = defineField({
  name: 'resourceCard',
  title: 'Resource Card',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'resource',
      title: 'Resource',
      type: 'reference',
      to: REFERENCABLE_RESOURCE_CARD_TYPES.map((type) => ({ type })),
    }),
    defineField({
      name: 'featuredImageOverride',
      title: 'Featured Image Override',
      type: 'image',
      description:
        'If provided, this image will be used as the featured image instead of the resource’s default image.',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Full Bleed', value: 'fullBleed' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      title: 'resource.title',
      media: 'resource.featuredImage',
      mediaOverride: 'featuredImageOverride',
      subtitle: 'resource._type',
      style: 'style',
    },
    prepare({ title, media, mediaOverride, subtitle, style }) {
      const mediaAsset = mediaOverride || media

      const styleString = style === 'fullBleed' ? '(Full Bleed)' : ''

      return {
        title,
        subtitle: `${convertCamelCaseToTitleCase(subtitle)} ${styleString}`,
        media: mediaAsset,
      }
    },
  },
})
