import { defineField, defineType } from 'sanity'
import { brazeLeader } from './brazeLeader'
import { defineLanguageField } from '@/schemas/fields/defineLanguageField'
import { UserIcon } from '@sanity/icons'

export const brazeLeadership = defineType({
  name: 'brazeLeadership',
  title: 'Braze Leadership',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'leaders',
      title: 'Leaders',
      description:
        'Braze leaders to be displayed on the Braze Leaders page. These leaders will be displayed in the order they are added.',
      type: 'array',
      of: [brazeLeader],
    }),
    defineField({
      name: 'title',
      title: 'Singleton Title',
      type: 'string',
      // hidden: true,
    }),
    defineLanguageField(),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare: ({ title, language }) => ({
      title,
      subtitle: language,
    }),
  },
})
