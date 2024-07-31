import { definePageComponent } from '../definePageComponent'
import { BsStackOverflow } from 'react-icons/bs'
import { card } from './card'
import { PreviewCardDeck } from './PreviewCardDeck'
import { defineHeadingField } from '@/schemas/fields/defineHeadingField'
import { defineField } from 'sanity'

export const cardDeck = definePageComponent({
  name: 'cardDeck',
  title: 'Card Deck',
  description: 'A panel of cards arrayed in columns',
  icon: BsStackOverflow,
  fields: [
    defineHeadingField({
      defaultHeadingLevel: 'h2',
      defaultSize: 'display-lg',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [card],
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Flat', value: 'flat' },
          { title: 'Raised', value: 'raised' },
          { title: 'Transparent', value: 'transparent' },
          { title: 'Rainbow', value: 'rainbow' },
        ],
      },
      initialValue: 'flat',
    },
    {
      name: 'shownOnCard',
      title: 'Shown on Card?',
      description:
        'If enabeled, the cards will be shown on top of a card background.',
      type: 'boolean',
      initialValue: false,
      group: 'layout',
    },
    {
      name: 'cardSize',
      title: 'Card Size',
      type: 'string',
      group: 'layout',
      options: {
        options: [
          { title: 'Small', value: 'small' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'large',
    },
  ],
  preview: {
    select: {
      cards: 'cards',
    },
    prepare: ({ cards }) => {
      return {
        title: 'Card Deck',
        cards,
      }
    },
  },
  components: {
    preview: PreviewCardDeck,
  },
})
