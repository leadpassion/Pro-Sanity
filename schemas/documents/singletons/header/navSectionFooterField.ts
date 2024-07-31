import { SPECIAL_BRANDING_OPTIONS } from '@/lib'
import { defineField } from 'sanity'
import { headerCtaField } from './headerCtaField'
import { defineIconField } from '@/schemas/fields'

export const navSectionFooterField = defineField({
  name: 'navSectionFooter',
  title: 'Footer',
  type: 'object',
  group: 'footer',
  options: {
    collapsible: false,
  },
  fields: [
    defineField({
      name: 'hasFooter',
      title: 'Has Footer?',
      type: 'boolean',
      description:
        'If true, a footer will be displayed at the bottom of the left subnav section.',
      initialValue: false,
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      hidden: ({ parent }) => !parent?.hasFooter,
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      hidden: ({ parent }) => !parent?.hasFooter,
    }),
    defineIconField({
      hidden: ({ parent }) => !parent?.hasFooter,
    }),
    defineField({
      name: 'specialBranding',
      title: 'Special Branding',
      type: 'string',
      options: {
        list: SPECIAL_BRANDING_OPTIONS,
      },
      hidden: ({ parent }) => !parent?.hasFooter,
    }),
    { ...headerCtaField, hidden: ({ parent }) => !parent?.hasFooter },
  ],
})
