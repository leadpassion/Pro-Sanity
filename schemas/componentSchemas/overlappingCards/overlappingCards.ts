import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { GoVersions } from 'react-icons/go'
import { PreviewOverlappingCards } from './PreviewOverlappingCards'
import { switchback } from '../switchback'

export const overlappingCards = definePageComponent({
  name: 'overlappingCards',
  title: 'Overlapping Cards',
  description: 'A list of switchbacks that overlap each other.',
  icon: GoVersions,
  fields: [
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [switchback],
    }),
  ],
  preview: {
    select: {
      cards: 'cards',
    },
    prepare({ cards }) {
      return {
        title: 'Overlapping Cards',
        cards,
      }
    },
  },
  components: {
    preview: PreviewOverlappingCards,
  },
})
