import { convertCamelCaseToTitleCase } from '@/utils'
import { defineField } from 'sanity'
import {
  defineDownloadLinkField,
  defineInternalLinkField,
  defineLinkField,
} from './linkTypes'
import { defineIconField } from './defineIconField'
import { BUTTON_SIZES, BUTTON_STYLES } from '@/lib'
import { RxButton } from 'react-icons/rx'

interface CtaFieldOptions {
  name?: string
}

export const defineCtaField = (fieldOptions: CtaFieldOptions = {}) => {
  const { name = 'cta' } = fieldOptions
  return defineField({
    name,
    title: 'CTA',
    type: 'object',
    icon: RxButton,
    fields: [
      defineField({
        name: 'type',
        title: 'CTA Type',
        type: 'string',
        options: {
          list: [
            { title: 'External Link', value: 'link' },
            { title: 'Internal Link', value: 'internalLink' },
            { title: 'Download', value: 'download' },
            { title: 'Email Capture', value: 'emailCapture' },
            { title: 'Glass Link Card', value: 'glassLinkCard' },
            { title: 'Popup', value: 'popup' },
          ],
        },
        initialValue: 'internalLink',
      }),

      defineField({
        name: 'buttonText',
        title: 'Button Text',
        type: 'string',
        validation: (Rule) => Rule.required(),
        hidden: ({ parent }) => !parent?.type,
      }),

      defineField({
        name: 'buttonStyle',
        title: 'Button Style',
        type: 'string',
        options: {
          list: BUTTON_STYLES,
        },
        initialValue: 'purple-button',
        hidden: ({ parent }) => !parent?.type,
      }),

      defineField({
        name: 'buttonSize',
        title: 'Button Size',
        type: 'string',
        options: {
          list: BUTTON_SIZES,
        },
        initialValue: 'sm',
        hidden: ({ parent }) => !parent?.type,
      }),
      defineIconField(),
      defineField({
        name: 'iconPosition',
        title: 'Icon Position',
        type: 'string',
        options: {
          list: ['leading', 'trailing'],
        },
        initialValue: 'trailing',
        hidden: ({ parent }) => !parent?.icon,
      }),

      // ACTION TYPES
      // Link
      defineLinkField({
        hidden: ({ parent }) => parent?.type !== 'link',
      }),

      // Internal Link
      defineInternalLinkField({
        hidden: ({ parent }) => parent?.type !== 'internalLink',
      }),

      // Download
      defineDownloadLinkField({
        hidden: ({ parent }) => parent?.type !== 'download',
      }),

      // Email Capture
      defineField({
        name: 'marketoForm',
        title: 'Marketo Form',
        type: 'reference',
        to: [{ type: 'marketoForm' }],
        hidden: ({ parent }) => parent?.type !== 'emailCapture' && parent?.type !== 'popup',
      }),
    ],
    preview: {
      select: {
        name: 'name',
        type: 'type',
        buttonText: 'buttonText',
      },
      prepare: ({ name, type, buttonText }) => {
        return {
          title: name || buttonText,
          subtitle: convertCamelCaseToTitleCase(type),
        }
      },
    },
  })
}
