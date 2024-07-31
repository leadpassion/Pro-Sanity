import { ControlsIcon, EditIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { RiLayoutTopLine } from 'react-icons/ri'

import { topNavItemField } from './topNavItemField'
import { headerLanguagesField } from './headerLanguagesField'
import { defineLanguageField } from '@/schemas/fields'

export const header = defineType({
  name: 'globalHeader',
  title: 'Global Header Settings',
  type: 'document',
  icon: RiLayoutTopLine,
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
      icon: ControlsIcon,
    },
  ],
  fields: [
    defineField({
      name: 'left',
      title: 'Left Side',
      type: 'array',
      of: [topNavItemField],
      group: 'content',
    }),
    { ...headerLanguagesField, group: 'content' },
    defineField({
      name: 'right',
      title: 'Right Side',
      type: 'array',
      of: [topNavItemField],
      group: 'content',
    }),
    defineField({
      name: 'settingsDocumentName',
      title: 'Settings Document Name',
      type: 'string',
      group: 'settings',
      hidden: true,
    }),
    defineLanguageField({ group: 'settings' }),
  ],
  preview: {
    select: {
      title: 'settingsDocumentName',
      language: 'language',
    },
    prepare: ({ title, language }) => ({
      title: title || 'Global Header Settings',
      subtitle: language || 'Language not set',
    }),
  },
})
