import { definePageType } from './definePageType'
import { FiPackage } from 'react-icons/fi'

export const productPage = definePageType({
  name: 'productPage',
  title: 'Product Page',
  slugPrefix: 'product',
  includeSlugPrefixInStoredValue: true,
  icon: FiPackage,
})
