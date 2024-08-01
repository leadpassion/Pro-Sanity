import { SiMarketo } from 'react-icons/si'
import { defineField, defineType } from 'sanity'

export const marketoForm = defineType({
  name: 'marketoForm',
  title: 'Marketo Form',
  type: 'document',
  icon: SiMarketo,
  fields: [
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      description:
        "This is the name that will be used to reference this form in the code. Try to use something that makes this form's purpose clear.",
      type: 'string',
    }),
    defineField({
      name: 'formId',
      title: 'Form ID',
      description: 'This is the ID of the form in Marketo.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultThankYouHeadline',
      title: 'Default Thank You Headline',
      description:
        'A heading displayed after the form is submitted. This can be overriden when you reference this form in other documents.',
      type: 'string',
      initialValue: 'Thank You!',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultThankYouMessage',
      title: 'Default Thank You Message',
      description:
        'A message displayed after the form is submitted. This can be overriden when you reference this form in other documents.',
      type: 'complexRichText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'internalName',
      subtitle: 'formId',
    },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: `Form ID: ${subtitle}`,
    }),
  },
})
