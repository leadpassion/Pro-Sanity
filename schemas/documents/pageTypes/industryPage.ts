import { definePageType } from './definePageType'

export const industryPage = definePageType({
  name: 'industryPage',
  title: 'Industry Page',
  slugPrefix: 'solutions',
  includeSlugPrefixInStoredValue: true,
})
