// –------------------------------------------------
// SIMPLE RICH TEXT (field)
//
// A rich text editor without headings and custom
// block types.
//
// –------------------------------------------------

import { defineArrayMember, defineType } from 'sanity'
import { defineInternalLinkField, defineLinkField } from '../linkTypes'
import { defineTokenReferenceField } from '../defineTokenReferenceField'
import { imageBlock } from '@/schemas/componentSchemas/imageBlock'

export const simpleRichText = defineType({
  name: 'simpleRichText',
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
      },
    }),
    imageBlock,
  ],
})
