import { BUTTON_SIZES, BUTTON_STYLES, RESOURCE_TYPES } from '@/lib'
import { heading } from '@/schemas/fields/heading'
import { convertCamelCaseToTitleCase } from '@/utils'
import { ArrowRightIcon, ProjectsIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { PreviewResourceCardDeck } from './PreviewResourceCardDeck'
import { REFERENCABLE_RESOURCE_CARD_TYPES, resourceCard } from './resourceCard'

export const resourceCardDeck = definePageComponent({
  name: 'resourceCardDeck',
  title: 'Resource Card Deck',
  description:
    'A collection of cards linking to resources like case studies and tools.',
  icon: ProjectsIcon,
  groups: [
    {
      name: 'cta',
      title: 'CTA',
      icon: ArrowRightIcon,
    },
  ],
  fields: [
    {
      ...heading,
      initialValue: {
        headingLevel: 'h2',
        headingSize: 'display-2',
      },
    },
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'minimalRichText',
    }),
    defineField({
      name: 'mode',
      title: 'Mode',
      description:
        'How resources should be selected for this deck. Dyanmic mode will automatically pull in resources based on this document. Manual mode allows you to select specific resources.',
      type: 'string',
      options: {
        list: [
          { title: 'Dynamic', value: 'dynamic' },
          { title: 'Manual', value: 'manual' },
        ],
      },
      initialValue: 'dynamic',
      validation: (Rule) =>
        Rule.required().error('You must select a mode for choosing resources.'),
    }),
    defineField({
      name: 'allowedResourceTypes',
      title: 'Allowed Resource Types',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: REFERENCABLE_RESOURCE_CARD_TYPES.map((type) => ({
          title: convertCamelCaseToTitleCase(type),
          value: type,
        })),
        layout: 'grid',
      },
      hidden: ({ parent }) => parent?.mode !== 'dynamic',
      initialValue: RESOURCE_TYPES,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mode: string }

          if (parent?.mode === 'dynamic' && !value?.length) {
            return 'At least one resource type must be selected.'
          }

          return true
        }),
    }),
    defineField({
      name: 'resourceLimit',
      title: 'Resource Limit',
      description: 'The maximum number of resources to display in this deck.',
      type: 'number',
      options: {
        list: [3, 6, 9, 12],
      },
      initialValue: 3,
      hidden: ({ parent }) => parent?.mode !== 'dynamic',
    }),
    defineField({
      name: 'resources',
      type: 'array',
      title: 'Resources',
      of: [resourceCard],
      hidden: ({ parent }) => parent?.mode === 'dynamic',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'View the Blog',
      group: 'cta',
    }),
    defineField({
      name: 'ctaButtonStyle',
      title: 'CTA Button Style',
      type: 'string',
      group: 'cta',
      options: {
        list: BUTTON_STYLES,
      },
      initialValue: 'black-button',
    }),
    defineField({
      name: 'ctaButtonSize',
      title: 'CTA Button Size',
      type: 'string',
      group: 'cta',
      options: {
        list: BUTTON_SIZES,
      },
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'reference',
      to: [{ type: 'page' }],
      group: 'cta',
      initialValue: {
        // This is the _id of the blog listing page
        _ref: 'dbbfb768-e85f-42d4-b089-9deeeb2a7a62',
      },
    }),
  ],
  preview: {
    select: {
      mode: 'mode',
      resources: 'resources',
    },
    prepare({ mode, resources }) {
      const cardsLength = resources?.length

      const subtitle = cardsLength
        ? `${resources?.length} resource card${cardsLength > 1 ? 's' : ''}`
        : 'No resource cards added yet'

      return {
        title: 'Resource Card Deck',
        mode,
        subtitle,
        resources,
      }
    },
  },
  components: {
    preview: PreviewResourceCardDeck,
  },
})
