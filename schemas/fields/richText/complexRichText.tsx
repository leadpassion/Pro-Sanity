// –------------------------------------------------
// COMPLEX RICH TEXT (field)
//
// Contains the body content for blog posts on the site.
//
// –------------------------------------------------

import { GoHorizontalRule } from 'react-icons/go'
import { defineArrayMember, defineType } from 'sanity'
import { defineCtaBarField } from '../defineComplexComponentBodyField/ctaBar/defineCtaBarField'
import { defineRichImageField } from '../defineRichImageField'
import { defineInternalLinkField, defineLinkField } from '../linkTypes'
import { defineAnchorField } from '../defineAnchorField'
import { defineCtaCardField } from '../defineCtaCardField'
import { defineTokenReferenceField } from '../defineTokenReferenceField'

export const complexRichText = defineType({
  name: 'complexRichText',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // These blocks can be added inline with text in the editor
      of: [defineTokenReferenceField()],
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
        annotations: [defineLinkField(), defineInternalLinkField()],
      },
    }),
    defineRichImageField(),
    defineCtaCardField(),
    defineCtaBarField(),
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
    defineAnchorField(),
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
