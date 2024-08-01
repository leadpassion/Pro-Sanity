import enProductPages from '@/scripts/data/craftExports/craftProduct.json'
// import koProductPages from '@/scripts/data/craftExports/localization/craftProductKR.json'
// import jaProductPages from '@/scripts/data/craftExports/localization/craftProductJP.json'
import { CraftProductPage, ExportHandlers } from './craftTypes'
import { ExportProductPages, craftIdToSanityId } from './helpers'
import { LANG_CODE_FIELD_NAME } from '@/lib/localization.config'

// Create export handler(s)
const exportHandlers: Partial<ExportHandlers> = {
  productPagesExport: new ExportProductPages(
    'scripts/data/sanityImports/productPages.ndjson',
  ),
}

const buildImportFile = () => {
  processPages(enProductPages as unknown as CraftProductPage[], 'en-us')
  // processPages(koProductPages as unknown as CraftProductPage[], 'ko')
  // processPages(jaProductPages as unknown as CraftProductPage[], 'ja')

  for (const handler in exportHandlers) {
    if (exportHandlers.hasOwnProperty(handler)) {
      exportHandlers[handler as keyof ExportHandlers]!.writeTranslations()
      exportHandlers[handler as keyof ExportHandlers]!.save()
    }
  }
}

// Write pages to file and track translation metadata
function processPages(productPages: CraftProductPage[], langCode: string) {
  console.log(`PROCESSING PRODUCT PAGES IN ${langCode}`)

  for (const [index, page] of productPages.entries()) {
    const { canonicalId, title, slug } = page

    console.log(
      `Processing page(${index + 1}/${productPages.length}): "${title}"`,
      langCode,
    )

    const seo = {
      slug: {
        current: slug,
      },
      pageTitle: title,
    }

    const sanityPage = {
      _type: 'productPage',
      _id: craftIdToSanityId(canonicalId, '', langCode),
      title,
      [LANG_CODE_FIELD_NAME]: langCode,
      seo,
    }

    exportHandlers.productPagesExport?.write(sanityPage)
    exportHandlers.productPagesExport?.addTranslationMetadataDoc(
      canonicalId,
      sanityPage,
      // Use slugs to match up product pages for translation metadata
      seo.slug.current,
    )
  }
}

buildImportFile()
