import enMiscPages from '@/scripts/data/craftExports/craftMiscPages.json'
import jpMiscPages from '@/scripts/data/craftExports/localization/craftMiscPagesJP.json'
// No KO pages

import { CraftMiscPage } from './craftTypes'
import {
  clientImporter,
  craftIdToSanityId,
  generateCategoryReferences,
  getSeoMetadata,
} from './helpers'

function transformForSanity(pages: CraftMiscPage[], langCode: string = '') {
  const transformedPages = []

  for (const [index, page] of pages.entries()) {
    const {
      canonicalId,
      title,
      slug,
      relatedCategories,
      intro,
      lang,
    } = page;

    console.log(`Processing page(${index + 1}/${pages.length})`, title)

    if (lang) {
      // log as error for visibility
      console.log('\x1b[41m%s\x1b[0m', `\t!!!!! Skipping - reason: language is ${lang}:`)
      continue
    }

    const categories = generateCategoryReferences([
      [],
      relatedCategories || [],
      [],
    ])

    const sanityPage = {
      _type: 'page',
      _id: craftIdToSanityId(canonicalId, '', langCode),
      title,
      categories,
      language: langCode,
      seo: getSeoMetadata(page),
    }

    transformedPages.push(sanityPage)

    // prepare translation metadata references
    clientImporter.createTranslationReference(
      canonicalId,
      sanityPage,
      // Use slugs to match up pages for translation metadata (about 5 share a slug)
      sanityPage.seo.slug.current,
    )
  }

  return transformedPages
}

const enPagesToImport = transformForSanity(enMiscPages, 'en-us')
const jpPagesToImport = transformForSanity(jpMiscPages, 'ja')
const pagesToImport = [...enPagesToImport, ...jpPagesToImport]

clientImporter.excludeFieldsFromUpdate(['title', 'categories']).importPages(pagesToImport)