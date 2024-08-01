// –------------------------------------------------
// COMPLEX RICH TEXT (field)
//
// Contains the body content for blog posts on the site.
//
// –------------------------------------------------

import { anchor } from '@/schemas/fields/anchor'
import { ctaBar } from '@/schemas/fields/complexComponentBody/ctaBar/ctaBar'
import { ctaCard } from '@/schemas/fields/ctaCard'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { richImage } from '@/schemas/fields/richImage'
import { tokenReference } from '@/schemas/fields/tokenReference'
import { GoHorizontalRule } from 'react-icons/go'
import { defineArrayMember, defineType } from 'sanity'

export const complexRichText = defineType({
  name: 'complexRichText',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // These blocks can be added inline with text in the editor
      of: [tokenReference],
      // This config limits the styles that can be applied to text in the editor
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
        annotations: [link, internalLink],
      },
    }),
    richImage,
    ctaCard,
    ctaBar,
    defineArrayMember({
      name: 'testimonialReference',
      title: 'Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
    defineArrayMember({
      name: 'videoReference',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
    }),
    anchor,
    defineArrayMember({
      name: 'hr',
      title: 'Horizontal Rule',
      icon: GoHorizontalRule,
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
          initialValue: 'hr',
          hidden: true,
        },
      ],
      components: {
        preview: () => <hr />,
      },
    }),
  ],
})
