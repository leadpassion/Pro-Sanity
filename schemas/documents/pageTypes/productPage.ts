import { seo } from '@/schemas/fields/seo'
import { FiPackage } from 'react-icons/fi'
import { genericPage } from './definePageType'

export const productPage = {
  ...genericPage,
  name: 'productPage',
  title: 'Product Page',
  icon: FiPackage,
  fields: [
    ...genericPage.fields,
    {
      ...seo,
      options: {
        slugPrefix: 'product',
        includeSlugPrefixInStoredValue: true,
      },
    },
  ],
}
