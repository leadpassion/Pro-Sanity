import { categories } from '@/schemas/fields/categories'
import { embeddedFormForResources } from '@/schemas/fields/embeddedForm/embeddedFormForResources'
import { language } from '@/schemas/fields/language'
import { pageBody } from '@/schemas/fields/pageBody'
import { richImage } from '@/schemas/fields/richImage'
import { seo } from '@/schemas/fields/seo'
import {
  EditIcon,
  HashIcon,
  OlistIcon,
  TagIcon,
  WrenchIcon,
} from '@sanity/icons'
import { TbForms } from 'react-icons/tb'
import { defineField, defineType } from 'sanity'

export const guide = defineType({
  name: 'guide',
  title: 'Guide',
  icon: OlistIcon,
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: EditIcon,
      default: true,
    },
    {
      name: 'form',
      title: 'Form',
      icon: TbForms,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: HashIcon,
    },
    {
      name: 'categories',
      title: 'Categories',
      icon: TagIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: WrenchIcon,
    },
  ],
  fieldsets: [
    {
      name: 'resource',
      title: 'Resource',
      description:
        'The resource that users will be able to download or view after submitting the Marketo form.',
      options: { collapsible: false },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      fieldset: 'resource',
      initialValue: 'none',
      group: 'content',
      options: {
        list: [
          { title: 'Document', value: 'document' },
          { title: 'Link', value: 'link' },
          { title: 'None', value: 'none' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'document',
      title: 'Document',
      description:
        'The document that users will be able to download after submitting the Marketo form.',
      type: 'file',
      fieldset: 'resource',
      group: 'content',
      hidden: ({ parent }) => parent?.resourceType !== 'document',
      validation: (Rule) =>
        Rule.error().custom((_value, document) => {
          const doc = document as unknown as { resourceType: string }

          if (doc.resourceType === 'document') {
            return 'You must provide a document.'
          }

          return true
        }),
    }),
    defineField({
      name: 'resourceLink',
      title: 'Resource Link',
      description:
        'The link that users will be redirected to after submitting the Marketo form.',
      fieldset: 'resource',
      group: 'content',
      type: 'url',
      hidden: ({ parent }) => parent?.resourceType !== 'link',
      validation: (Rule) =>
        Rule.error().custom((_value, document) => {
          const doc = document as unknown as { resourceType: string }

          if (doc.resourceType === 'link') {
            return 'You must provide a resource link.'
          }
          return true
        }),
    }),
    {
      ...embeddedFormForResources,
      group: 'form',
    },
    {
      ...pageBody,
      name: 'thankYouPageBody',
      title: 'Thank You Page Body',
      group: 'form',
      hidden: ({ parent }) => {
        return !parent?.embeddedForm?.submitBehavior?.includes('thankYouPage')
      },
    },
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleRichTextWithImages',
      group: 'content',
    }),
    {
      ...richImage,
      name: 'featuredImage',
      title: 'Featured Image',
      group: 'content',
    },
    pageBody,
    categories,
    {
      ...seo,
      options: {
        slugPrefix: 'resources/reports-and-guides',
        includeSlugPrefixInStoredValue: false,
      },
    },
    defineField({
      name: 'hideFromSearch',
      title: 'Hide from Search?',
      description:
        'Prevent this report from appearing in content listings and search results.',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'hideFromListing',
      title: 'Hide from Listing?',
      description: 'Prevent this report from appearing in content listings.',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      group: 'settings',
    }),
    {
      ...language,
      group: 'settings',
    },
  ],
  preview: {
    select: {
      title: 'title',
      resourceType: 'resourceType',
      media: 'featuredImage',
    },
  },
})
