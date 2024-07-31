import { defineField } from 'sanity'
import { definePageComponent } from '../definePageComponent'
import { BiHealth } from 'react-icons/bi'

export const brazeBenefitsPanel = definePageComponent({
  name: 'brazeBenefitsPanel',
  title: 'Braze Benefits Panel',
  description: 'A panel listing Braze benefits for multiple countries.',
  icon: BiHealth,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Braze Benefits',
      hidden: true,
    }),
    defineField({
      name: 'document',
      type: 'reference',
      to: [{ type: 'brazeBenefits' }],
      initialValue: {
        _ref: 'braze-benefits',
      },
      readOnly: true,
    }),
  ],
})
