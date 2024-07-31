import { defineArrayMember, defineField } from 'sanity'

export const headerLanguagesField = defineField({
  name: 'languages',
  title: 'Languages',
  type: 'array',
  of: [
    defineArrayMember({
      name: 'language',
      title: 'Language',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'languageCode',
          title: 'Language Code',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
})
