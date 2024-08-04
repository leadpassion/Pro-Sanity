import { PADDING_OPTIONS, PAGE_COMPONENT_BACKGROUND_COLORS } from '@/lib'
import { defineField } from 'sanity'

export const sharedComponentLayoutFields = [
  defineField({
    name: 'padding',
    title: 'Vertical Padding',
    description:
      'The amount of padding above and below the component, in pixels.',
    type: 'object',
    group: 'layout',
    options: {
      collapsible: false,
      columns: 2,
    },
    fields: [
      defineField({
        name: 'top',
        title: 'Top',
        type: 'number',
        initialValue: 64,
      }),
      defineField({
        name: 'bottom',
        title: 'Bottom',
        type: 'number',
        initialValue: 64,
      }),
    ],
  }),
  defineField({
    name: 'textColor',
    title: 'Text Color',
    description: 'Use light or dark text for this component?',
    type: 'string',
    options: {
      list: [
        { title: 'Dark Text', value: 'dark' },
        { title: 'Light Text', value: 'light' },
      ],
    },
    initialValue: 'dark',
    group: 'layout',
  }),
  defineField({
    name: 'backgroundIsCustomized',
    title: 'Customize Background?',
    type: 'boolean',
    initialValue: false,
    group: 'layout',
  }),
  defineField({
    name: 'backgroundColor',
    title: 'Background Color',
    type: 'simplerColor',
    hidden: ({ parent }) => !parent.backgroundIsCustomized,
    group: 'layout',
    options: {
      collapsible: false,
      colorList: PAGE_COMPONENT_BACKGROUND_COLORS,
    },
  }),
  defineField({
    name: 'backgroundImage',
    title: 'Background Image',
    type: 'image',
    hidden: ({ parent }) => !parent.backgroundIsCustomized,
    group: 'layout',
  }),
]
