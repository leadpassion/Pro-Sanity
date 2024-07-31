import { HelpCircleIcon } from '@sanity/icons'
import { FaqsPreview } from './FaqsPreview'
import { FieldDefinition, defineField } from 'sanity'
import { faq } from './faq'

export const defineFaqsField = (
  fieldOptions: Partial<FieldDefinition> = {},
) => {
  const {
    name = 'faqs',
    title = 'FAQs',
    icon = HelpCircleIcon,
    group,
    hidden,
    fieldset,
  } = fieldOptions || {}

  return defineField({
    name,
    title,
    icon,
    type: 'object',
    fieldset,
    group,
    hidden,
    fields: [
      defineField({
        name: 'heading',
        title: 'Heading',
        type: 'string',
        initialValue: 'Frequently Asked Questions',
      }),
      defineField({
        name: 'questions',
        title: 'Questions',
        type: 'array',
        of: [faq],
      }),
    ],
    preview: {
      select: {
        heading: 'heading',
        questions: 'questions',
      },
    },
    components: {
      // @ts-expect-error
      preview: FaqsPreview,
    },
  })
}
