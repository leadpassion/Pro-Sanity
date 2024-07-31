import { PAGE_TYPES, RESOURCE_TYPES } from '@/lib'
import { LinkIcon } from '@sanity/icons'
import { FieldDefinition, defineField } from 'sanity'

export const REFERENCABLE_DOCUMENT_TYPES = [
  'pressRelease',
  'solutionsPartner',
  'technologyPartner',
  ...PAGE_TYPES,
  ...RESOURCE_TYPES,
]

export const defineInternalLinkField = (
  fieldOptions: Partial<FieldDefinition> | void,
) => {
  const {
    name = 'internalLink',
    title = 'Link to Content',
    icon = LinkIcon,
    group,
    hidden,
    validation,
  } = fieldOptions || {}

  return defineField({
    name,
    title,
    icon,
    type: 'object',
    group,
    hidden,
    validation,
    options: {
      collapsible: false,
    },
    fields: [
      defineField({
        name: 'reference',
        title: 'Reference',
        description: 'Select a document to link to',
        type: 'reference',
        to: REFERENCABLE_DOCUMENT_TYPES.map((type) => ({ type })),
      }),
      defineField({
        name: 'blank',
        title: 'Open in new tab',
        type: 'boolean',
        initialValue: false,
      }),
      defineField({
        name: 'alt',
        title: 'Alt text',
        description: 'Descriptive text for screen readers',
        type: 'string',
      }),
    ],
  })
}
