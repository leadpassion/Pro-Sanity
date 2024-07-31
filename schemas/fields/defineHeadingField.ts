import { TEXT_SIZES } from '@/lib'
import { ConditionalProperty, FieldDefinition, defineField } from 'sanity'

interface HeadingOptions {
  name?: string
  title?: string
  description?: string
  defaultHeadingLevel?: string
  defaultSize?: string
  group?: string
  fieldset?: string
  options?: {
    collapsed?: boolean
    collapsible?: boolean
  }
  hidden?: ConditionalProperty
}

export const defineHeadingField = (
  headingOptions?: HeadingOptions,
): FieldDefinition => {
  const {
    name = 'heading',
    title = 'Heading',
    defaultHeadingLevel = 'h2',
    defaultSize = 'lg',
    group,
    fieldset,
    options = {
      collapsible: true,
      collapsed: false,
    },
    hidden,
  } = headingOptions || {}

  return defineField({
    name,
    title,
    fieldset,
    type: 'object',
    options,
    group,
    hidden,
    fieldsets: [
      {
        name: 'settings',
        title: 'Heading settings',
        options: { collapsible: true, collapsed: true },
      },
    ],
    fields: [
      defineField({
        name: 'text',
        title: 'Text',
        type: 'colorablePlainText',
      }),
      defineField({
        name: 'headingLevel',
        title: 'Heading Level',
        type: 'string',
        options: {
          list: [
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'H6', value: 'h6' },
          ],
        },
        fieldset: 'settings',
        initialValue: defaultHeadingLevel,
      }),
      defineField({
        name: 'headingSize',
        title: 'Heading Size',
        type: 'string',
        options: {
          list: TEXT_SIZES,
        },
        fieldset: 'settings',
        initialValue: defaultSize,
      }),
    ],
  })
}
