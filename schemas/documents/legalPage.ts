import { LANG_CODE_FIELD_NAME } from '@/lib/localization.config'
import { language } from '@/schemas/fields/language'
import { seo } from '@/schemas/fields/seo'
import { BillIcon, EditIcon, HashIcon, WrenchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  icon: BillIcon,
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
      name: 'body',
      title: 'Body',
      type: 'legalRichText',
      group: 'content',
    }),
    {
      ...seo,
      options: {
        slugPrefix: 'company/legal',
        includeSlugPrefixInStoredValue: false,
      },
    },
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
      slug: 'seo.slug.current',
      language: LANG_CODE_FIELD_NAME,
    },
    prepare({ title, internalName, slug, language }) {
      const slugString = slug ? `${slug}` : null
      const subtitle = [language, slugString].filter(Boolean).join(' | ')

      return {
        title: title || internalName || 'Untitled Legal Page',
        subtitle,
      }
    },
  },
})
