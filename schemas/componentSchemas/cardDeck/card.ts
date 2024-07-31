import { defineIconField } from '@/schemas/fields'
import { defineCtaActionOfType } from '@/schemas/fields/defineCtaActionOfType'
import { defineField } from 'sanity'

export const card = defineField({
  name: 'card',
  title: 'Card',
  type: 'object',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'cta',
      title: 'CTA',
    },
  ],
  fields: [
    defineIconField({
      hidden: ({ parent }) => parent.useCustomIcon,
      group: 'content',
    }),
    defineField({
      name: 'useCustomIcon',
      title: 'Use Custom Icon?',
      type: 'boolean',
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: 'customIcon',
      title: 'Custom Icon',
      type: 'image',
      hidden: ({ parent }) => !parent.useCustomIcon,
      group: 'content',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleRichText',
      group: 'content',
    }),
    defineCtaActionOfType(['link', 'internalLink', 'playVideo'], {
      name: 'cta',
      title: 'CTA',
      initialActionType: undefined,
      initialButtonStyle: 'purple-link',
      group: 'cta',
    }),
  ],
})
