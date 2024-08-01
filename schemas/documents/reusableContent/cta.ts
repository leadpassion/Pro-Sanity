import { BUTTON_SIZES, BUTTON_STYLES } from '@/lib'
import { icon } from '@/schemas/fields/icon'
import { language } from '@/schemas/fields/language'
import { downloadLink } from '@/schemas/fields/linkTypes/downloadLink'
import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { defineCalloutUIField } from '@/schemas/utilities'
import { convertCamelCaseToTitleCase } from '@/utils'
import { RxButton } from 'react-icons/rx'
import { defineField, defineType } from 'sanity'
import { PreviewReusableContent } from './PreviewReusableContent'

export const cta = defineType({
  name: 'cta',
  title: 'Shared CTA',
  type: 'document',
  icon: RxButton,
  fields: [
    defineCalloutUIField({
      heading: 'This is a Shared CTA.',
      body: 'This CTA can be used across multiple pages. It is a great way to maintain consistency and reduce duplication, but you should only use it if your CTA is truly reusable.',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      description:
        'Give this CTA a unique name so you can make it easy to find later!',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
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
      initialValue: 'lg',
      hidden: ({ parent }) => !parent?.type,
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
      hidden: ({ parent }) => parent?.type !== 'link',
    },

    // Internal Link
    {
      ...internalLink,
      hidden: ({ parent }) => parent?.type !== 'internalLink',
    },

    // Download
    {
      ...downloadLink,
      hidden: ({ parent }) => parent?.type !== 'download',
    },

    // Email Capture
    defineField({
      name: 'marketoForm',
      title: 'Marketo Form',
      type: 'reference',
      to: [{ type: 'marketoForm' }],
      hidden: ({ parent }) =>
        parent?.type !== 'emailCapture' && parent?.type !== 'popup',
    }),

    language,
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
  components: {
    preview: PreviewReusableContent,
  },
})
