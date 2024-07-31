import { defineRichImageField } from '@/schemas/fields/defineRichImageField'
import { defineField } from 'sanity'

export const footerBadgeRow = defineField({
  name: 'footerBadgeRow',
  title: 'Footer Badge Row',
  type: 'object',
  fields: [
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [defineRichImageField()],
    }),
  ],
  preview: {
    select: {
      badges: 'badges',
    },
    prepare({ badges }) {
      const subtitle = `${badges.length} Badge${badges.length > 1 ? 's' : ''}`
      return {
        title: 'Badge Row',
        subtitle,
        media: badges[0],
      }
    },
  },
})
