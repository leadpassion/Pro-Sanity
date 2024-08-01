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
        options: {
          list: PADDING_OPTIONS,
        },
        initialValue: 64,
      }),
      defineField({
        name: 'bottom',
        title: 'Bottom',
        type: 'number',
        options: {
          list: PADDING_OPTIONS,
        },
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
    name: 'edgeTreatments',
    title: 'Edge Treatments',
    description:
      'Add rounded corners or a slanted edge to the top or bottom of the component.',
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
        type: 'string',
        options: {
          list: [
            { title: 'Straight', value: 'straight' },
            { title: 'Rounded', value: 'rounded' },
            { title: 'Slanted', value: 'slanted' },
          ],
        },
        initialValue: 'straight',
      }),
      defineField({
        name: 'bottom',
        title: 'Bottom',
        type: 'string',
        options: {
          list: [
            { title: 'Straight', value: 'straight' },
            { title: 'Rounded', value: 'rounded' },
            { title: 'Slanted', value: 'slanted' },
          ],
        },
        initialValue: 'straight',
      }),
    ],
  }),
  defineField({
    name: 'inset',
    title: 'Inset',
    description:
      'If the section is inset it will slightly sit on top of the section above or below it, creating a stylistic overlap of sections.',
    type: 'object',
    group: 'layout',
    options: {
      collapsible: false,
      columns: 2,
    },
    fields: [
      defineField({
        name: 'insetTop',
        title: 'Top',
        type: 'boolean',
        initialValue: false,
      }),
      defineField({
        name: 'insetBottom',
        title: 'Bottom',
        type: 'boolean',
        initialValue: false,
      }),
    ],
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
