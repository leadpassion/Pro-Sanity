import { DownloadIcon } from '@sanity/icons'
import { FieldDefinition, defineField } from 'sanity'

export const defineDownloadLinkField = (
  fieldOptions: Partial<FieldDefinition> | void,
) => {
  const {
    name = 'downloadLink',
    title = 'Download Link',
    icon = DownloadIcon,
    group,
    hidden,
  } = fieldOptions || {}

  return defineField({
    name,
    title,
    icon,
    type: 'object',
    group,
    hidden,
    fields: [
      {
        name: 'file',
        title: 'File',
        type: 'file',
        validation: (Rule) => Rule.required(),
      },
    ],
  })
}
