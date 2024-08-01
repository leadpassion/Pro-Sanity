import { defineField } from 'sanity'
import { navItemListField } from './navItemListField'
import { navSectionFooterField } from './navSectionFooterField'

export const navSectionLeftField = defineField({
  name: 'left',
  title: 'Left',
  type: 'object',
  options: {
    collapsible: true,
  },
  hidden: ({ parent }) => !parent?.hasSubNav,
  groups: [
    {
      name: 'navItems',
      title: 'Nav Items',
      default: true,
    },
    {
      name: 'footer',
      title: 'Footer',
    },
  ],
  group: 'subNav',
  fields: [
    defineField({
      name: 'navItemLists',
      title: 'Nav Item Lists',
      type: 'array',
      of: [navItemListField],
      group: 'navItems',
    }),
    navSectionFooterField,
  ],
})
