import enLegalPages from '@/scripts/data/craftExports/craftLegalPages.json'
// import jaLegalPages from '@/scripts/data/craftExports/localization/craftLegalPagesJP.json'
import { CraftLegalPage, ExportHandlers } from './craftTypes'
import {
  ExportLegalPages,
  convertContentMatrixToPortableText,
  craftIdToSanityId,
  getSeoMetadata,
} from './helpers'

// Create export handler(s)
const exportHandlers: Partial<ExportHandlers> = {
  legalPagesExport: new ExportLegalPages(
    'scripts/data/sanityImports/legalPages.ndjson',
  ),
}

const buildImportFile = async () => {
  await processPages(enLegalPages as unknown as CraftLegalPage[], 'en-us')  
  // Note JA pages don't share canonicalId
  // await processPages(jaLegalPages as unknown as CraftLegalPage[], 'ja')  

  for (const handler in exportHandlers) {
    if (exportHandlers.hasOwnProperty(handler)) {
      exportHandlers[handler as keyof ExportHandlers]!.writeTranslations()
      exportHandlers[handler as keyof ExportHandlers]!.save()
    }
  }
}

async function processPages(legalPages: CraftLegalPage[], langCode: string) {
  for (const [count, page] of legalPages.entries()) {
    console.log(`Processing page(${count+1}/${legalPages.length}): "${page.title}"`, langCode)

    const intro = page.intro
      ? await convertContentMatrixToPortableText(
          [
            {
              key: '0',
              type: 'text',
              enabled: true,
              collapsed: false,
              fields: {
                body: page.intro,
              },
            },
          ],
          'legalPage',
          'body',
          page.canonicalId.toString(),
          exportHandlers,
        )
      : []

    const body = page.contentMatrix
      ? await convertContentMatrixToPortableText(
          page.contentMatrix,
          'legalPage',
          'body',
          page.canonicalId.toString(),
          exportHandlers,
          { langCode },
        )
      : []

    const sanityLegalPage = {
      _type: 'legalPage',
      _id: craftIdToSanityId(page.canonicalId, '' , langCode),
      title: page.title,
      language: langCode,
      body: [...intro, ...body],
      seo: getSeoMetadata(page),
    }

    exportHandlers.legalPagesExport.write(sanityLegalPage)
    exportHandlers.legalPagesExport.addTranslationMetadataDoc(
      page.canonicalId,
      sanityLegalPage,
      // Use slugs to match up legal pages translation metadata
      sanityLegalPage.seo.slug.current,
    )
  }
}

buildImportFile()
