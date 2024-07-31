import { BookIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { defineLanguageField } from '@/schemas/fields/defineLanguageField'

export const glossaryTerm = defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pronunciation',
      title: 'Pronunciation',
      type: 'string',
      description: 'How the definition is pronounced.',
    }),
    defineField({
      name: 'tldr',
      title: 'TL;DR',
      description: 'A brief summary of the term.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'definition',
      title: 'Definition',
      description: 'A detailed explanation of the term.',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'usedInASentence',
      title: 'Used in a Sentence',
      description: 'A sentence that uses the term.',
      type: 'text',
      rows: 3,
    }),
    defineLanguageField(),
  ],
})
