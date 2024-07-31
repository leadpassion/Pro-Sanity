import { LinkIcon } from '@sanity/icons'
import { FieldDefinition, defineField } from 'sanity'
import { PreviewAnchor } from './PreviewAnchor'

export const defineAnchorField = (
  fieldOptions: Partial<FieldDefinition> | void,
) => {
  const {
    name = 'anchor',
    title = 'Anchor',
    group,
    hidden,
    fieldset,
  } = fieldOptions || {}

  return defineField({
    name,
    title,
    icon: LinkIcon,
    type: 'object',
    description:
      'An invisible marker that can be linked to. Use this to set up anchor links.',
    group,
    hidden,
    fieldset,
    fields: [
      {
        name: 'anchorId',
        title: 'Anchor ID',
        description:
          'The ID that anchor links will point to. For example, if you set this to "faqs", you can link to this anchor with "/#faqs".',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
    ],
    preview: {
      select: {
        anchorId: 'anchorId',
      },
    },
    components: {
      // @ts-expect-error
      preview: PreviewAnchor,
    },
  })
}
