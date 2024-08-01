import { defineField } from 'sanity'

export const agendaEvent = defineField({
  name: 'agendaEvent',
  title: 'Event',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'time',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'simpleRichText',
    }),
  ],
})
