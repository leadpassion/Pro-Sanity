import { TEXT_SIZES, EYEBROW_COLORS } from '@/lib'
import { ConditionalProperty, defineField } from 'sanity'
import { defineIconField } from './defineIconField'

interface EyebrowOptions {
  title?: string
  group?: string
  hidden?: ConditionalProperty
  fieldset?: string
  options?: {
    collapsed?: boolean
    collapsible?: boolean
  }
}

export const defineEyebrowField = (eyebrowOptions?: EyebrowOptions) => {
  const {
    title = 'Eyebrow',
    group,
    hidden,
    fieldset,
    options = { collapsed: false, collapsible: true },
  } = eyebrowOptions || {}

  return defineField({
    name: 'eyebrow',
    title,
    type: 'object',
    group,
    hidden,
    fieldset,
    options,
    fieldsets: [
      {
        name: 'settings',
        title: 'Eyebrow settings',
        options: { collapsible: true, collapsed: true },
      },
    ],
    fields: [
      defineField({
        name: 'text',
        title: 'Text',
        type: 'minimalRichText',
      }),
      defineIconField({
        fieldset: 'settings',
      }),
      defineField({
        name: 'color',
        title: 'Customize Color',
        type: 'simplerColor',
        options: {
          collapsible: false,
          colorList: EYEBROW_COLORS,
        },
        fieldset: 'settings',
      }),
      defineField({
        name: 'headingLevel',
        title: 'Heading Level',
        type: 'string',
        options: {
          list: [
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'H6', value: 'h6' },
          ],
        },
        fieldset: 'settings',
        initialValue: 'h4',
      }),
      defineField({
        name: 'headingSize',
        title: 'Heading Size',
        type: 'string',
        options: {
          list: TEXT_SIZES,
        },
        fieldset: 'settings',
      }),
    ],
  })
}
