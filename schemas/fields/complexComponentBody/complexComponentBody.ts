import { imageBlock } from '@/schemas/componentSchemas/imageBlock'
import { metricsBar } from '@/schemas/componentSchemas/metricsBar'
import { trustBar } from '@/schemas/componentSchemas/trustBar'
import { ctaBar } from '@/schemas/fields/complexComponentBody/ctaBar/ctaBar'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { defineArrayMember, defineField } from 'sanity'
import { tokenReference } from '../tokenReference'
import { featuredContent } from './featuredContent'
import { featuredTestimonial } from './featuredTestimonial'
import { list } from './list/list'

export const complexComponentBody = defineField({
  name: 'body',
  title: 'Body',
  type: 'array',
  group: 'content',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [],
      marks: {
        annotations: [link, internalLink],
      },
      of: [tokenReference],
    }),
    {
      ...ctaBar,
      options: {
        allowedCtaTypes: ['link', 'internalLink', 'download'],
      },
    },
    featuredContent,
    featuredTestimonial,
    imageBlock,
    list,
    metricsBar,
    trustBar,
  ],
})
