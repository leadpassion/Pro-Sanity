import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { UserIcon } from '@sanity/icons'

export const brazeLeadershipPanel = definePageComponent({
  name: 'brazeLeadershipPanel',
  title: 'Braze Leadership Panel',
  description: 'A panel listing Braze leadership.',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Braze Leadership',
      hidden: true,
    }),
    defineField({
      name: 'document',
      type: 'reference',
      to: [{ type: 'brazeLeadership' }],
      initialValue: {
        _ref: 'braze-leadership',
      },
      readOnly: true,
    }),
  ],
})
