import { DownloadIcon } from '@sanity/icons'
import { definePageComponent } from '../definePageComponent'
import { defineField } from 'sanity'
import { defineRichImageField } from '@/schemas/fields/defineRichImageField'
import { defineCtaActionOfType } from '@/schemas/fields/defineCtaActionOfType'

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
    defineRichImageField({
      name: 'featuredImage',
      title: 'Featured Image',
      description: 'The image that will be displayed in the panel.',
      group: ['media'],
    }),
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
    defineCtaActionOfType(['download', 'internalLink', 'link'], {
      hidden: ({ parent }) => !parent?.customCta,
    }),
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
