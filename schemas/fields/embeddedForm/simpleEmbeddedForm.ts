import { genericEmbeddedForm } from '@/schemas/fields/embeddedForm/genericEmbeddedForm'
import { defineField } from 'sanity'

export const simpleEmbeddedForm = defineField({
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
