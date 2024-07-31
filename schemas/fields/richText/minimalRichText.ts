// –------------------------------------------------
// SIMPLE RICH TEXT (field)
//
// A rich text editor without headings and custom
// block types.
//
// –------------------------------------------------

import { defineArrayMember, defineType } from 'sanity'
import { defineTokenReferenceField } from '../defineTokenReferenceField'

export const minimalRichText = defineType({
  name: 'minimalRichText',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      of: [defineTokenReferenceField()],
      styles: [],
      lists: [],
      marks: {
        annotations: [],
        decorators: [
          {
            title: 'Strong',
            value: 'strong',
          },
          {
            title: 'Underline',
            value: 'underline',
          },
        ],
      },
    }),
  ],
})
