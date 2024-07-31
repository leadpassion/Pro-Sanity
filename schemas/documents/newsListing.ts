// ----------------------------------
// News Listing (document)
// ----------------------------------

import { EditIcon, LinkIcon, WrenchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { defineLanguageField } from '@/schemas/fields/defineLanguageField'

export const newsListing = defineType({
  name: 'newsListing',
  title: 'News Listing',
  type: 'document',
  icon: LinkIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: EditIcon,
      default: true,
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
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'publication',
      title: 'Publication',
      type: 'reference',
      to: [{ type: 'publication' }],
      validation: (Rule) =>
        Rule.required().error(
          'You must associate this news listing with a publication.',
        ),
      group: 'content',
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      group: 'content',
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
})
