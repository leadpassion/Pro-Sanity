import { BUTTON_SIZES, BUTTON_STYLES, ButtonStyle } from '@/lib'
import { convertCamelCaseToTitleCase } from '@/utils'
import { ConditionalProperty, ObjectOptions } from 'sanity'
import { defineField } from 'sanity'
import {
  defineDownloadLinkField,
  defineInternalLinkField,
  defineLinkField,
} from './linkTypes'
import { defineIconField } from './defineIconField'

export type CtaActionType =
  | 'link'
  | 'internalLink'
  | 'download'
  | 'emailCapture'
  | 'playVideo'
  | 'glassLinkCard'

interface CtaActionOptions {
  name?: string
  title?: string
  group?: string
  initialButtonStyle?: ButtonStyle
  initialActionType?: CtaActionType
  fieldOptions?: ObjectOptions
  hidden?: ConditionalProperty
}

export const defineCtaActionOfType = (
  allowedActionTypes: CtaActionType[],
  options: CtaActionOptions | void,
) => {
  const {
    name = 'ctaAction',
    title = 'CTA Action',
    group,
    initialActionType = 'internalLink',
    initialButtonStyle = 'purple-button',
    fieldOptions,
    hidden,
  } = options || {}

  const actionTypeOptions = allowedActionTypes.map((type) => ({
    title: convertCamelCaseToTitleCase(type),
    value: type,
  }))

  return defineField({
    name,
    title,
    group,
    type: 'object',
    hidden,
    options: fieldOptions,
    fields: [
      defineField({
        name: 'actionType',
        title: 'Action Type',
        type: 'string',
        options: {
          list: actionTypeOptions,
        },
        initialValue: initialActionType,
        // validation: (Rule) => Rule.required(),
      }),

      defineField({
        name: 'buttonText',
        title: 'Button Text',
        type: 'string',
        // validation: (Rule) => Rule.required(),
      }),

      defineField({
        name: 'buttonStyle',
        title: 'Button Style',
        type: 'string',
        options: {
          list: BUTTON_STYLES,
        },
        initialValue: initialButtonStyle,
      }),

      defineField({
        name: 'buttonSize',
        title: 'Button Size',
        type: 'string',
        options: {
          list: BUTTON_SIZES,
        },
        initialValue: 'lg',
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
        hidden: ({ parent }) => parent?.actionType !== 'link',
        validation: (Rule) =>
          Rule.warning().custom((value, context) => {
            const parent = context.parent as any
            const field = value as any

            if (parent.actionType === 'link' && !field?.href) {
              return 'This link will not be work as expected because no URL is set'
            }

            if (parent.actionType !== 'link' && field?.href) {
              return 'This link will not be used because the action type is not set to "Link"'
            }

            return true
          }),
      }),

      // Internal Link
      defineInternalLinkField({
        hidden: ({ value, parent }) => {
          const field = value as any

          return parent?.actionType !== 'internalLink' && !field?.reference
        },
        validation: (Rule) =>
          Rule.warning().custom((value, context) => {
            const parent = context.parent as any
            const field = value as any

            if (parent.actionType === 'internalLink' && !field?.reference) {
              return 'This internal link will not work as expected because no document is selected'
            }

            if (parent.actionType !== 'internalLink' && field?.reference) {
              return 'This internal link will not be used because the action type is not set to "Internal Link"'
            }

            return true
          }),
      }),

      // Download
      defineDownloadLinkField({
        hidden: ({ parent }) => parent?.actionType !== 'download',
      }),

      // Email Capture
      defineField({
        name: 'hubspotFormId',
        title: 'HubSpot Form ID',
        type: 'string',
        hidden: ({ parent }) =>
          parent?.type !== 'emailCapture' && parent?.type !== 'popup',
      }),

      // Play Video
      defineField({
        name: 'videoReference',
        title: 'Video',
        type: 'reference',
        to: [{ type: 'video' }],
        hidden: ({ parent }) => parent?.actionType !== 'playVideo',
      }),
    ],
    preview: {
      select: {
        actionType: 'actionType',
        buttonText: 'buttonText',
      },
      prepare: ({ actionType, buttonText }) => {
        const subtitle =
          actionType === 'emailCapture'
            ? 'Email Capture'
            : actionType === 'download'
              ? 'Download'
              : 'Link'
        return {
          title: buttonText,
          subtitle,
        }
      },
    },
  })
}
