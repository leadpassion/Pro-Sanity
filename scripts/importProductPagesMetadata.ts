import enProductPages from '@/scripts/data/craftExports/craftProduct.json'
// import krProductPages from '@/scripts/data/craftExports/localization/craftProductKR.json'
// import jpProductPages from '@/scripts/data/craftExports/localization/craftProductJP.json'

import { CraftProductPage } from './craftTypes'
import {
  clientImporter,
  craftIdToSanityId,
  generateCategoryReferences,
  getSeoMetadata,
} from './helpers'

function transformForSanity(pages: CraftProductPage[], langCode: string = '') {
  const transformedPages = []

  for (const [index, page] of pages.entries()) {
    const {
      canonicalId,
      title,
      slug
    } = page

    console.log(`Processing page(${index + 1}/${pages.length}):`, title)

    const sanityPage = {
      _type: 'productPage',
      _id: craftIdToSanityId(canonicalId, '', langCode),
      title,
      language: langCode,
      seo: getSeoMetadata(page, 'product/'),
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

const enPagesToImport = transformForSanity(enProductPages, 'en-us')
// const jpPagesToImport = transformForSanity(jpProductPages, 'ja')
// const krPagesToImport = transformForSanity(krProductPages, 'ko')
const pagesToImport = [...enPagesToImport]//, ...jpPagesToImport, ...krPagesToImport]

clientImporter.excludeFieldsFromUpdate(['title', 'categories']).importPages(pagesToImport)