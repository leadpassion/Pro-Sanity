import { BUTTON_SIZES, BUTTON_STYLES } from '@/lib'
import { icon } from '@/schemas/fields/icon'
import { downloadLink } from '@/schemas/fields/linkTypes/downloadLink'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { defineField } from 'sanity'

export type CtaActionType =
  | 'link'
  | 'internalLink'
  | 'download'
  | 'emailCapture'
  | 'playVideo'
  | 'glassLinkCard'

export const ctaAction = defineField({
  name: 'ctaAction',
  title: 'CTA',
  type: 'object',
  fields: [
    // Action Type gets spread in here from the parent

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
      initialValue: 'blue-fill',
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
    icon,
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
    {
      ...link,
      hidden: ({ parent }) => parent?.actionType !== 'link',
      validation: (Rule) =>
        Rule.warning().custom((value, context) => {
          const parent = context.parent as { actionType: string }
          const field = value as { href: string }

          if (parent.actionType === 'link' && !field?.href) {
            return 'This link will not be work as expected because no URL is set'
          }

          if (parent.actionType !== 'link' && field?.href) {
            return 'This link will not be used because the action type is not set to "Link"'
          }

          return true
        }),
    },

    // Internal Link
    {
      ...internalLink,
      hidden: ({ value, parent }) => {
        const field = value as { reference: unknown }

        return parent?.actionType !== 'internalLink' && !field?.reference
      },
      validation: (Rule) =>
        Rule.warning().custom((value, context) => {
          const parent = context.parent as { actionType: string }

          const field = value as { reference: unknown }

          if (parent.actionType === 'internalLink' && !field?.reference) {
            return 'This internal link will not work as expected because no document is selected'
          }

          if (parent.actionType !== 'internalLink' && field?.reference) {
            return 'This internal link will not be used because the action type is not set to "Internal Link"'
          }

          return true
        }),
    },

    // Download
    {
      ...downloadLink,
      hidden: ({ parent }) => parent?.actionType !== 'download',
    },

    // Email Capture
    defineField({
      name: 'marketoFormId',
      title: 'Marketo Form ID',
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
