import { ctaAction } from '@/schemas/fields/ctaAction'
import { richImage } from '@/schemas/fields/richImage'
import { DownloadIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'

export const downloadPanel = definePageComponent({
  name: 'downloadPanel',
  title: 'Download Panel',
  description:
    'A panel that allows the user to download a resource, typically a report or guide.',
  icon: DownloadIcon,
  fields: [
    defineField({
      name: 'resource',
      title: 'Resource',
      type: 'reference',
      to: [{ type: 'report' }, { type: 'guide' }],
    }),
    defineField({
      name: 'sourceCompany',
      title: 'Source',
      description:
        'The company that published the resource. If set, the company logo will be displayed.',
      type: 'reference',
      to: [{ type: 'company' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleRichText',
      description:
        'A description of or quote from the resource being offered for download.',
    }),
    {
      ...richImage,
      name: 'featuredImage',
      title: 'Featured Image',
      description: 'The image that will be displayed in the panel.',
      group: ['media'],
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
      initialValue: 'left',
      group: ['media', 'layout'],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      description:
        'The text that will be displayed on the CTA button. By default, the cta will link to the resource.',
      type: 'string',
      hidden: ({ parent }) => parent?.customCta,
      initialValue: 'Download Report',
    }),
    defineField({
      name: 'customCta',
      title: 'Custom CTA?',
      description:
        'If set, the default CTA will be replaced with a custom one.',
      type: 'boolean',
    }),
    {
      ...ctaAction,
      hidden: ({ parent }) => !parent?.customCta,
      fields: [
        defineField({
          name: 'actionType',
          title: 'CTA Type',
          type: 'string',
          initialValue: 'internalLink',
          options: {
            list: [
              { title: 'External Link', value: 'link' },
              { title: 'Internal Link', value: 'internalLink' },
              { title: 'Download', value: 'download' },
              { title: 'Play Video', value: 'playVideo' },
            ],
          },
        }),
        ...ctaAction.fields,
      ],
    },
  ],
  preview: {
    select: {
      title: 'resource.title',
      resourceImage: 'resource.featuredImage',
      featuredImage: 'featuredImage',
    },
    prepare: ({ title, resourceImage, featuredImage }) => {
      return {
        title: title,
        subtitle: 'Download Panel',
        media: resourceImage || featuredImage,
      }
    },
  },
})
