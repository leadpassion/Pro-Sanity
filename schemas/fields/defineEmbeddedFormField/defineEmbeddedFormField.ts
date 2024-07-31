import { ConditionalProperty, defineField } from 'sanity'
import { TbForms } from 'react-icons/tb'
import { defineHeadingField } from '../defineHeadingField'
import { defineEyebrowField } from '../defineEyebrowField'
import { REFERENCABLE_DOCUMENT_TYPES } from '../linkTypes'

interface EmbeddedFormFieldOptions {
  name?: string
  title?: string
  icon?: any
  description?: string
  group?: string
  hidden?: ConditionalProperty
  allowedSubmitBehaviors?: ('stayOnPage' | 'thankYouPage' | 'otherRedirect')[]
}

export const defineEmbeddedFormField = (
  fieldOptions: EmbeddedFormFieldOptions = {},
) => {
  const {
    name = 'embeddedForm',
    title = 'Form',
    icon = TbForms,
    description,
    group,
    hidden,
    allowedSubmitBehaviors = ['stayOnPage', 'otherRedirect', 'thankYouPage'],
  } = fieldOptions
  return defineField({
    name,
    title,
    description,
    icon,
    group,
    hidden,
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
      // FORM
      defineField({
        name: 'marketoForm',
        title: 'Marketo Form',
        type: 'reference',
        to: [{ type: 'marketoForm' }],
      }),
      defineField({
        name: 'submitBehavior',
        title: 'Submit Behavior',
        type: 'string',
        options: {
          // @ts-expect-error -- Typescript isn't smart enough to know that we're filtering out undefined values
          list: [
            allowedSubmitBehaviors.includes('stayOnPage') && {
              title: 'Stay on Page',
              value: 'stayOnPage',
            },
            allowedSubmitBehaviors.includes('thankYouPage') && {
              title: 'Redirect to Thank You Page',
              value: 'thankYouPage',
            },
            allowedSubmitBehaviors.includes('otherRedirect') && {
              title: 'Redirect to Other URL',
              value: 'otherRedirect',
            },
          ].filter(Boolean),
        },
        initialValue: 'stayOnPage',
        validation: (Rule) => Rule.required(),
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

            const parent = context.parent as any

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
      defineEyebrowField({
        fieldset: 'options',
      }),
      defineHeadingField({
        defaultHeadingLevel: 'h3',
        defaultSize: 'display-sm',
        fieldset: 'options',
      }),
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
}
