import { LaunchIcon } from '@sanity/icons'
import { FieldDefinition, defineField } from 'sanity'

export const defineLinkField = (
  fieldOptions: Partial<FieldDefinition> | void,
) => {
  const {
    name = 'link',
    title = 'External Link',
    icon = LaunchIcon,
    group,
    hidden,
    validation,
  } = fieldOptions || {}

  return defineField({
    name,
    title,
    icon,
    group,
    hidden,
    type: 'object',
    options: {
      collapsed: false,
    },
    validation,
    fields: [
      defineField({
        name: 'href',
        title: 'URL',
        type: 'url',
        validation: (Rule) =>
          Rule.uri({
            scheme: ['http', 'https', 'mailto', 'tel'],
            // This allows relative URLs, including anchor links
            allowRelative: true,
          }),
      }),
      defineField({
        name: 'alt',
        title: 'Alt text',
        description: 'Descriptive text for screen readers',
        type: 'string',
      }),
      defineField({
        name: 'blank',
        title: 'Open in new tab',
        type: 'boolean',
        initialValue: false,
      }),
    ],
  })
}
