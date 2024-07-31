// –------------------------------------------------
// SIMPLE RICH TEXT (field)
//
// A rich text editor without headings and custom
// block types.
//
// –------------------------------------------------

import { defineArrayMember, defineType } from 'sanity'
import { defineRichImageField } from '../defineRichImageField'
import { defineInternalLinkField, defineLinkField } from '../linkTypes'
import { defineTokenReferenceField } from '../defineTokenReferenceField'

export const simpleRichTextWithImages = defineType({
  name: 'simpleRichTextWithImages',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      of: [defineTokenReferenceField()],
      // This config limits the styles can be applied to text in the editor
      // Specifically, this removes the default H1 option to avoid conflict
      // with the blog post title.
      styles: [],
      marks: {
        annotations: [defineLinkField(), defineInternalLinkField()],
        decorators: [
          {
            title: 'Strong',
            value: 'strong',
          },
          {
            title: 'Underline',
            value: 'underline',
          },
          {
            title: 'Code',
            value: 'code',
          },
        ],
      },
    }),
    defineRichImageField(),
  ],
})
