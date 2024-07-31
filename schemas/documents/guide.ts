import {
  EditIcon,
  HashIcon,
  OlistIcon,
  TagIcon,
  WrenchIcon,
} from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { defineSeoField } from '../fields/defineSeoField'
import { defineLanguageField } from '@/schemas/fields/defineLanguageField'
import { TbForms } from 'react-icons/tb'
import { defineEmbeddedFormField } from '../fields/defineEmbeddedFormField'
import { defineCategoriesField } from '../fields/defineCategoriesField'
import { defineRichImageField } from '../fields/defineRichImageField'
import { definePageBodyField } from '../fields'

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
        Rule.error().custom((_value, doc: any) => {
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
        Rule.error().custom((_value, doc: any) => {
          if (doc.resourceType === 'link') {
            return 'You must provide a resource link.'
          }
          return true
        }),
    }),
    defineEmbeddedFormField({
      group: 'form',
      allowedSubmitBehaviors: ['stayOnPage', 'thankYouPage', 'otherRedirect'],
    }),
    definePageBodyField({
      name: 'thankYouPageBody',
      title: 'Thank You Page Body',
      group: 'form',
      hidden: ({ parent }) => {
        return !parent?.embeddedForm?.submitBehavior?.includes('thankYouPage')
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleRichTextWithImages',
      group: 'content',
    }),
    defineRichImageField({
      name: 'featuredImage',
      title: 'Featured Image',
      group: 'content',
    }),
    definePageBodyField(),
    defineCategoriesField(),
    defineSeoField({
      name: 'seo',
      title: 'SEO Settings',
      group: 'seo',
      slugPrefix: 'resources/reports-and-guides',
      includeSlugPrefixInStoredValue: false,
    }),
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
    defineLanguageField({
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      resourceType: 'resourceType',
      media: 'featuredImage',
    },
  },
})
