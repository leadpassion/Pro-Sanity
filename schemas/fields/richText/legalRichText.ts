import { DocumentPdfIcon } from '@sanity/icons'
import { SiMarketo } from 'react-icons/si'
import { defineArrayMember, defineType } from 'sanity'
import {
  defineLinkField,
  defineInternalLinkField,
  defineDownloadLinkField,
  defineAnchorField,
} from '@/schemas/fields'
import { defineFaqsField } from '../faqs/defineFaqsField'

export const legalRichText = defineType({
  name: 'legalRichText',
  title: 'Legal Rich Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // This config limits the styles can be applied to text in the editor
      // Specifically, this removes the default H1 option to avoid conflict
      // with the blog post title.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Heading 5', value: 'h5' },
        { title: 'Heading 6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          {
            title: 'Strong',
            value: 'strong',
          },
          {
            title: 'Emphasis',
            value: 'em',
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
        annotations: [
          defineLinkField(),
          defineInternalLinkField(),
          defineDownloadLinkField(),
        ],
      },
    }),
    defineFaqsField(),
    defineAnchorField(),
    defineArrayMember({
      name: 'pdf',
      title: 'PDF Embed',
      icon: DocumentPdfIcon,
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineArrayMember({
      type: 'reference',
      to: [{ type: 'marketoForm' }],
      icon: SiMarketo,
    }),
  ],
})
