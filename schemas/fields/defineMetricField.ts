import { FieldDefinition, defineField } from 'sanity'

export const defineMetricField = (
  fieldOptions: Partial<FieldDefinition> = {},
) => {
  const {
    name = 'metric',
    title = 'Metric',
    fieldset,
    group,
    hidden,
  } = fieldOptions

  return defineField({
    name,
    title,
    type: 'object',
    fieldset,
    group,
    hidden,
    fields: [
      {
        name: 'value',
        title: 'Value',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
    ],
    options: {
      columns: 2,
    },
    preview: {
      select: {
        title: 'value',
        subtitle: 'description',
      },
    },
  })
}
