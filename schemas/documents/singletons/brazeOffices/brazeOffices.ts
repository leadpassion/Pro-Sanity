import { IoBusiness } from 'react-icons/io5'
import { defineField, defineType } from 'sanity'

export const brazeOffices = defineType({
  name: 'brazeOffices',
  title: 'Braze Offices',
  type: 'document',
  icon: IoBusiness,
  fields: [
    defineField({
      name: 'offices',
      title: 'Offices',
      type: 'array',
      of: [
        defineField({
          name: 'office',
          title: 'Office',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'address',
              title: 'Address',
              type: 'text',
              rows: 3,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'title',
      title: 'Singleton Title',
      type: 'string',
      initialValue: 'Braze Offices',
      hidden: true,
    }),
  ],
})
