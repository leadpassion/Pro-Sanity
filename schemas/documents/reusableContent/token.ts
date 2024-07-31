import { TokenIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const token = defineType({
  name: 'token',
  title: 'Token',
  icon: TokenIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
    }),
  ],
})
