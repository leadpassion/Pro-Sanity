import { definePageType } from './definePageType'

export const useCasePage = definePageType({
  name: 'useCasePage',
  title: 'Use Case Page',
  slugPrefix: 'solutions',
  includeSlugPrefixInStoredValue: true,
})
