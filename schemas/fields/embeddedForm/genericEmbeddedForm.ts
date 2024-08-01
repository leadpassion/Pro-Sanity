import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { REFERENCABLE_DOCUMENT_TYPES } from '@/schemas/fields/linkTypes/internalLink'
import { TbForms } from 'react-icons/tb'
import { defineField } from 'sanity'

export const genericEmbeddedForm = defineField({
  name: 'embeddedForm',
  title: 'Form',
  icon: TbForms,
  type: 'object',
  fieldsets: [
    {
      name: 'layout',
      title: 'Layout',
      options: {
        collapsed: true,
        collapsible: true,
      },
    },
    {
      name: 'options',
      title: 'Other Options',
      options: {
        collapsed: true,
        collapsible: true,
      },
    },
    {
      name: 'samePageThankYou',
      title: 'Custom thank you message',
      options: {
        collapsed: false,
        collapsible: true,
      },
    },
  ],
  fields: [
    defineField({
      name: 'marketoForm',
      title: 'Marketo Form',
      type: 'reference',
      to: [{ type: 'marketoForm' }],
    }),

    // SAME PAGE THANK YOU
    defineField({
      name: 'thankYouHeadline',
      title: 'Thank You Headline Override',
      description:
        'The headline to display after the form is submitted. If not provided, the default will be used.',
      type: 'string',
      fieldset: 'samePageThankYou',
      hidden: ({ parent }) => parent?.submitBehavior !== 'stayOnPage',
    }),
    defineField({
      name: 'thankYouMessage',
      title: 'Thank You Message Override',
      description:
        'The message to display after the form is submitted. If not provided, the default message will be used.',
      type: 'simpleRichText',
      fieldset: 'samePageThankYou',
      hidden: ({ parent }) => parent?.submitBehavior !== 'stayOnPage',
    }),

    // REDIRECT TO OTHER URL
    defineField({
      name: 'redirectUrl',
      title: 'Redirect URL',
      description:
        'An optional URL to redirect to after the form is submitted.',
      type: 'object',
      hidden: ({ parent }) => parent?.submitBehavior !== 'otherRedirect',
      options: {
        collapsible: false,
      },
      validation: (Rule) =>
        Rule.custom((fieldValue, context) => {
          const value = fieldValue as {
            actionType?: 'link' | 'internalLink'
            href?: string
            reference?: { _ref: string }
          }

          const parent = context.parent as { submitBehavior: string }

          const shouldRedirectOnSubmit =
            parent?.submitBehavior === 'otherRedirect'

          if (!shouldRedirectOnSubmit) return true

          if (!value?.actionType) {
            return 'You must provide specify a redirect URL type.'
          }

          if (value.actionType === 'link' && !value.href) {
            return 'You must provide a URL to redirect to.'
          }

          if (value.actionType === 'internalLink' && !value.reference) {
            return 'You must provide a document to redirect to.'
          }

          return true
        }),
      fields: [
        defineField({
          name: 'actionType',
          title: 'Action Type',
          type: 'string',
          options: {
            list: ['link', 'internalLink'],
          },
          initialValue: undefined,
        }),

        // ACTION TYPES
        // Link
        defineField({
          name: 'href',
          title: 'URL',
          type: 'url',
          hidden: ({ parent }) => parent?.actionType !== 'link',
        }),
        // Internal Link
        defineField({
          name: 'reference',
          title: 'Page',
          description: 'Select a document to link to',
          type: 'reference',
          to: REFERENCABLE_DOCUMENT_TYPES.map((type) => ({ type })),
          hidden: ({ parent }) => parent?.actionType !== 'internalLink',
        }),
      ],
    }),

    // FORM OPTIONS
    {
      ...eyebrow,
      fieldset: 'options',
    },
    {
      ...heading,
      fieldset: 'options',
      initialValue: {
        headingLevel: 'h3',
        headingSize: 'display-sm',
      },
    },
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      fieldset: 'options',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      description:
        'The text to display on the submit button. If not provided, the default text from Marketo will be used.',
      type: 'string',
      fieldset: 'options',
      hidden: ({ parent }) => parent?.submitBehavior !== 'stayOnPage',
    }),
  ],
})
