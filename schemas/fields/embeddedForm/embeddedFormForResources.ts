import { genericEmbeddedForm } from '@/schemas/fields/embeddedForm/genericEmbeddedForm'
import { defineField } from 'sanity'

export const embeddedFormForResources = defineField({
  ...genericEmbeddedForm,
  fields: [
    genericEmbeddedForm.fields[0],
    defineField({
      name: 'submitBehavior',
      title: 'Submit Behavior',
      type: 'string',
      options: {
        list: [
          {
            title: 'Stay on Page',
            value: 'stayOnPage',
          },
          {
            title: 'Redirect to Thank You Page',
            value: 'thankYouPage',
          },
          {
            title: 'Redirect to Other URL',
            value: 'otherRedirect',
          },
        ],
      },
      initialValue: 'stayOnPage',
    }),
    ...genericEmbeddedForm.fields.slice(1),
  ],
})
