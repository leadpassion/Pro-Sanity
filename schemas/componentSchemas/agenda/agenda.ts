import { CalendarIcon } from '@sanity/icons'
import { definePageComponent } from '../definePageComponent'
import { defineField } from 'sanity'
import { agendaDay } from './agendaDay'

export const agenda = definePageComponent({
  name: 'agenda',
  title: 'Agenda',
  description: 'A list of days with events and event details',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'days',
      type: 'array',
      of: [agendaDay],
    }),
  ],
  preview: {
    select: {
      days: 'days',
    },
    prepare: ({ days }) => {
      return {
        title: `Agenda with ${days?.length} day${days?.length === 1 ? '' : 's'}`,
      }
    },
  },
})
