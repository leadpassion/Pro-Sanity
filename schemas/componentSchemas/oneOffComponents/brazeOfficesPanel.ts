import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { IoBusiness } from 'react-icons/io5'

export const brazeOfficesPanel = definePageComponent({
  name: 'brazeOfficesPanel',
  title: 'Braze Offices Panel',
  description: 'A panel listing Braze Offices.',
  icon: IoBusiness,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Braze Offices',
      hidden: true,
    }),
    defineField({
      name: 'document',
      type: 'reference',
      to: [{ type: 'brazeOffices' }],
      initialValue: {
        _ref: 'braze-offices',
      },
      readOnly: true,
    }),
  ],
})
