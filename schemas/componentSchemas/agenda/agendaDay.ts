import { defineField } from 'sanity'
import { agendaEvent } from './agendaEvent'

export const agendaDay = defineField({
  name: 'day',
  type: 'object',
  fields: [
    defineField({
      name: 'date',
      type: 'date',
      title: 'Date',
      description: 'The date of the day',
    }),
    defineField({
      name: 'events',
      type: 'array',
      of: [agendaEvent],
    }),
  ],
  preview: {
    select: {
      date: 'date',
      events: 'events',
    },
    prepare: ({ date, events }) => {
      return {
        title: date || 'No date provided',
        subtitle: `${events?.length} event${events?.length === 1 ? '' : 's'}`,
      }
    },
  },
})
