import { UlistIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { navItemField } from './navItemField'

export const navItemListField = defineField({
  name: 'navItemList',
  title: 'Nav Item List',
  type: 'object',
  icon: UlistIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'navItems',
      title: 'Nav Items',
      type: 'array',
      of: [navItemField],
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      items: 'navItems',
    },
    prepare({ heading, items }) {
      const title = heading || '[headingless list]'
      const subtitle = items?.length
        ? items.map((item: any) => item.title).join(', ')
        : 'No items'
      return {
        title,
        subtitle,
      }
    },
  },
})
