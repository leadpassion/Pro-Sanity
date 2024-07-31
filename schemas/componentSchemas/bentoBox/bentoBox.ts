import { DashboardIcon } from '@sanity/icons'
import { definePageComponent } from '../definePageComponent'
import { defineHeadingField } from '@/schemas/fields/defineHeadingField'
import { defineField } from 'sanity'
import { bentoContentCard } from './bentoContentCard'
import { PreviewBentoBox } from './PreviewBentoBox'

export const bentoBox = definePageComponent({
  name: 'bentoBox',
  title: 'Bento Box',
  description: 'A stylized collection of content links, images, and callouts.',
  icon: DashboardIcon,
  fields: [
    defineHeadingField({
      defaultHeadingLevel: 'h2',
      defaultSize: 'display-lg',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'contentCards',
      title: 'Content Cards',
      description:
        'These cards link to other resources on the site. You must provide 4 to fill the bento box.',
      type: 'array',
      of: [bentoContentCard],
      validation: (Rule) =>
        Rule.required()
          .min(4)
          .max(4)
          .error('You must provide 4 content cards to fill the bento box.'),
    }),
    defineField({
      name: 'callouts',
      title: 'Callouts',
      description:
        'These callouts are displayed around the content cards. You must provide 2.',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(2)
          .error('You must provide 2 callouts to fill the bento box.'),
    }),
  ],
  preview: {
    select: {
      heading: 'heading.text',
      subheading: 'subheading',
      contentCards: 'contentCards',
      callouts: 'callouts',
    },
    prepare({ heading, subheading, contentCards, callouts }) {
      return {
        title: 'Bento Box',
        heading,
        subheading,
        contentCards,
        callouts,
      }
    },
  },
  components: {
    preview: PreviewBentoBox,
  },
})
