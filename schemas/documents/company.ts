// –------------------------------------------------
// COMPANY (document)
//
// Contains details about companies referenced anywhere on the site.
// For example, this document may be referenced as an employer for
// a person or a customer to include in a logo coursel.
//
// –------------------------------------------------

import { CaseIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { defineLogoField } from '../fields/defineLogoField'

export const company = defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {
      name: 'details',
      title: 'Company Details',
      default: true,
    },
    {
      name: 'other',
      title: 'Other',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().error('You must provide a name for this company.'),
      group: 'details',
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      group: 'details',
    }),
    defineField({
      name: 'size',
      title: 'Company Size',
      description: 'The number of employees at this company.',
      type: 'string',
      options: {
        list: [
          { title: 'Small (1-99 Employees)', value: 'small' },
          { title: 'Medium (100-500 Employees)', value: 'medium' },
          { title: 'Large (500+ Employees)', value: 'large' },
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'details',
    }),
    defineLogoField({
      name: 'logotype',
      title: 'Logotype',
      group: 'details',
    }),
    defineLogoField({
      name: 'icon',
      title: 'Icon',
      group: 'details',
    }),
    defineField({
      name: 'isAwardGiver',
      title: 'Is an Award Giver?',
      description: 'Check this box if this company gives awards, like Gartner.',
      type: 'boolean',
      group: 'other',
      initialValue: false,
    }),
  ],
  // For preview, use the icon or else the logo.
  preview: {
    select: {
      title: 'name',
      icon: 'icon.onLight',
      logo: 'logotype.default',
    },
    prepare({ title, icon, logo }) {
      return {
        title,
        media: icon || logo,
      }
    },
  },
})
