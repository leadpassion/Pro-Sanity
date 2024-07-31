import enSolutionsPages from '@/scripts/data/craftExports/craftSolutions.json'
import jpSolutionsPages from '@/scripts/data/craftExports/localization/craftSolutionsJP.json'
// No KO pages
import { CraftSolutionsPage } from './craftTypes'
import {
  clientImporter,
  craftIdToSanityId,
  generateCategoryReferences,
  getSeoMetadata,
} from './helpers'

function transformForSanity(pages: CraftSolutionsPage[], langCode: string = '') {
  const transformedPages = []

  for (const [index, page] of pages.entries()) {
    const {
      canonicalId,
      title,
      slug,
      relatedCategories,
      intro,
      lang
    } = page

    console.log(`Processing page(${index + 1}/${pages.length}):`, title)

    const categories = generateCategoryReferences([
      [],
      relatedCategories || [],
      [],
    ])

    const _type = page.relatedCategories?.includes(447)
      ? 'industryPage'
      : 'useCasePage'

    const sanityPage = {
      _type,
      _id: craftIdToSanityId(canonicalId, '', langCode),
      title,
      categories,
      language: langCode,
      seo: getSeoMetadata(page, 'solutions/'),
    }

    transformedPages.push(sanityPage)

    // prepare translation metadata references
    clientImporter.createTranslationReference(
      canonicalId,
      sanityPage,
      // Use slugs to match up product pages for translation metadata
      sanityPage.seo.slug.current,
    )
  }

  return transformedPages
}

const enPagesToImport = transformForSanity(enSolutionsPages, 'en-us')
const jpPagesToImport = transformForSanity(jpSolutionsPages, 'ja')
const pagesToImport = [...enPagesToImport, ...jpPagesToImport]

clientImporter.excludeFieldsFromUpdate(['title', 'categories']).importPages(pagesToImport)