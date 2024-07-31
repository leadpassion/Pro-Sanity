import { ConditionalProperty, defineArrayMember, defineField } from 'sanity'
import { list } from './list/list'
import { featuredContent } from './featuredContent'
import { defineCtaBarField } from './ctaBar/defineCtaBarField'
import { featuredTestimonial } from './featuredTestimonial'
import { trustBar } from '@/schemas/componentSchemas/trustBar'
import { defineInternalLinkField, defineLinkField } from '../linkTypes'
import { CtaActionType } from '../defineCtaActionOfType'
import { defineTokenReferenceField } from '../defineTokenReferenceField'
import { imageBlock } from '@/schemas/componentSchemas/imageBlock'
import { metricsBar } from '@/schemas/componentSchemas/metricsBar'

interface ComplexComponentBodyOptions {
  name?: string
  title?: string
  description?: string
  group?: string | string[]
  allowedCtaTypes?: CtaActionType[]
  customBodyComponentTypes?: any[]
  hidden?: ConditionalProperty
}

export const defineComplexComponentBodyField = (
  options: ComplexComponentBodyOptions | void,
) => {
  const {
    name = 'body',
    title = 'Body',
    description,
    group = 'content',
    allowedCtaTypes = ['link', 'internalLink', 'download'],
    customBodyComponentTypes = [],
    hidden,
  } = options || {}

  return defineField({
    name,
    title,
    description,
    type: 'array',
    group,
    hidden,
    of: [
      defineArrayMember({
        type: 'block',
        styles: [],
        marks: {
          annotations: [defineLinkField(), defineInternalLinkField()],
        },
        of: [defineTokenReferenceField()],
      }),
      defineCtaBarField({ allowedCtaTypes }),
      featuredContent,
      featuredTestimonial,
      imageBlock,
      list,
      metricsBar,
      trustBar,
      ...customBodyComponentTypes,
    ],
  })
}
