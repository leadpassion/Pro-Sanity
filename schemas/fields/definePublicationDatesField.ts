// –------------------------------------------------
// PUBLICATION DATES (field)
//
// This custom field type consolidates the dates when a piece of
// content was published and last updated.
//
// –------------------------------------------------

import { FieldDefinition, defineField } from 'sanity'

export const definePublicationDatesField = (
  options: Partial<FieldDefinition> | void,
) => {
  const {
    name = 'publicationDates',
    title = 'Publication Dates',
    group,
    hidden,
  } = options || {}
  return defineField({
    name,
    title,
    type: 'object',
    group,
    hidden,
    options: {
      columns: 2,
    },
    fields: [
      {
        name: 'publishedAt',
        title: 'Published',
        type: 'datetime',
        description: 'The date and time this content was published.',
      },
      {
        name: 'updatedAt',
        title: 'Updated',
        type: 'datetime',
        description: 'The date and time this content was last updated.',
      },
    ],
  })
}
