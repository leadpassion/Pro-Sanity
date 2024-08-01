import { categories } from '@/schemas/fields/categories'
import { language } from '@/schemas/fields/language'
import { richImage } from '@/schemas/fields/richImage'
import { seo } from '@/schemas/fields/seo'
import { EditIcon, HashIcon, TagIcon, WrenchIcon } from '@sanity/icons'
import { GoVideo } from 'react-icons/go'
import { defineField, defineType } from 'sanity'

export const videoPage = defineType({
  name: 'videoPage',
  title: 'Video Page',
  type: 'document',
  icon: GoVideo,
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
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
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
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      group: 'content',
    }),
    categories,
    {
      ...seo,
      options: {
        slugPrefix: 'resources/videos',
        includeSlugPrefixInStoredValue: false,
      },
    },
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      group: 'settings',
    }),
    // SETTINGS
    defineField({
      name: 'hideFromListing',
      title: 'Hide from listing?',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'hideFromSearch',
      title: 'Hide from search?',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    {
      ...language,
      group: 'settings',
    },
  ],
})
