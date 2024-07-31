// –------------------------------------------------
// BLOG POST (document)
//
// Contains content for blog posts on the site.
//
// –------------------------------------------------

import { EditIcon, HashIcon, TagIcon, WrenchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { defineSeoField } from '@/schemas/fields/defineSeoField'
import { defineLanguageField } from '@/schemas/fields/defineLanguageField'
import { defineCategoriesField } from '@/schemas/fields/defineCategoriesField'
import { defineRichImageField } from '@/schemas/fields/defineRichImageField'
import { definePublicationDatesField } from '@/schemas/fields/definePublicationDatesField'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: EditIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: EditIcon,
      default: true,
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
  fields: [
    // Content
    defineField({
      name: 'title',
      title: 'Title',
      description: 'This title will be displayed on the site.',
      type: 'string',
      group: 'content',
      validation: (Rule) =>
        Rule.required().error('You must provide a title for this blog post.'),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'complexRichText',
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'A brief summary of the content.',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'person' }],
        },
      ],
      group: 'content',
    }),
    defineRichImageField({
      name: 'featuredImage',
      title: 'Featured Image',
      group: 'content',
    }),
    definePublicationDatesField({}),
    defineCategoriesField(),

    // SEO
    defineSeoField({
      name: 'seo',
      title: 'SEO Settings',
      group: 'seo',
      slugPrefix: 'resources/articles',
      includeSlugPrefixInStoredValue: false,
    }),

    // SETTINGS
    defineField({
      name: 'hideFromListing',
      title: 'Hide from Listing?',
      description:
        'Prevent this case study from appearing in content listings.',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      description:
        'Use this name for internal reference only. It will not be displayed on the site.',
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
      internalName: 'internalName',
      excerpt: 'excerpt',
      media: 'featuredImage',
      language: 'language',
    },
    prepare({ title, internalName, excerpt, media, language }) {
      return {
        title: internalName || title,
        subtitle: `${language ? '[' + language + '] ' : ''}${excerpt}`,
        media,
      }
    },
  },
})
