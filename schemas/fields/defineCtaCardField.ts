import { ArrowRightIcon } from '@sanity/icons'
import { FieldDefinition, defineField } from 'sanity'
import { defineCtaActionOfType } from './defineCtaActionOfType'
import { blockPreview } from 'sanity-pills'

export const defineCtaCardField = (
  fieldOptions: Partial<FieldDefinition> = {},
) => {
  const {
    name = 'ctaCard',
    title = 'CTA Card',
    icon = ArrowRightIcon,
    hidden,
    group,
    fieldset,
  } = fieldOptions

  return defineField({
    name,
    title,
    icon,
    type: 'object',
    hidden,
    group,
    fieldset,
    fields: [
      defineField({
        name: 'heading',
        title: 'Heading',
        type: 'string',
      }),
      defineField({
        name: 'body',
        title: 'Body',
        type: 'simpleRichText',
      }),
      defineField({
        name: 'actions',
        title: 'Actions',
        type: 'array',
        of: [
          defineCtaActionOfType([
            'link',
            'internalLink',
            'download',
            'emailCapture',
          ]),
        ],
        validation: (Rule) => [
          Rule.error().custom((field?: any[]) => {
            if (!field || field.length < 1 || field.length > 2) {
              return 'A CTA must have either 1 or 2 actions'
            }
            return true
          }),
          // If the field includes an action where action.type === 'emailCapture', there must be only one action
          Rule.error().custom((field?: any[]) => {
            if (
              field &&
              field.some((action) => action.type === 'emailCapture') &&
              field.length > 1
            ) {
              return 'A CTA with an email capture action can only have one action.'
            }
            return true
          }),
        ],
      }),
    ],
    preview: {
      select: {
        heading: 'heading',
        body: 'body',
      },
      prepare: ({ heading, body }) => {
        const title = heading || blockPreview(body)
        return {
          title,
          subtitle: `CTA`,
          media: ArrowRightIcon,
        }
      },
    },
  })
}
