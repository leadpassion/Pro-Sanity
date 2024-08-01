// –------------------------------------------------
// BLOG POST (document)
//
// Contains content for blog posts on the site.
//
// –------------------------------------------------

import { categories } from '@/schemas/fields/categories'
import { language } from '@/schemas/fields/language'
import { publicationDates } from '@/schemas/fields/publicationDates'
import { richImage } from '@/schemas/fields/richImage'
import { seo } from '@/schemas/fields/seo'
import { EditIcon, HashIcon, TagIcon, WrenchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

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
    {
      ...richImage,
      name: 'featuredImage',
      title: 'Featured Image',
      group: 'content',
    },
    publicationDates,
    categories,

    // SEO
    {
      ...seo,
      options: {
        slugPrefix: 'resources/articles',
        includeSlugPrefixInStoredValue: false,
      },
    },

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
    {
      ...language,
      group: 'settings',
    },
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
        subtitle: `${language ? `[${language}] ` : ''}${excerpt}`,
        media,
      }
    },
  },
})
