import craftMiscPages from '@/scripts/data/craftExports/craftMiscPages.json'
import { CraftMiscPage, ExportHandlers } from './craftTypes'
import { ExportMiscPages, craftIdToSanityId, generateCategoryReferences } from './helpers'
import { htmlToText } from 'html-to-text'

const miscPages = craftMiscPages as unknown as CraftMiscPage[]

// Create export handler(s)
const buildImportFile = async () => {
  const exportHandlers: Partial<ExportHandlers> = {
    miscPagesExport: new ExportMiscPages(
      'scripts/data/sanityImports/miscPages.ndjson',
    ),
  }

  for (const [index, page] of miscPages.entries()) {
    const {
      canonicalId,
      title,
      slug,
      relatedCategories,
      intro,
      lang,
    } = page;

    console.log(`Processing page(${index + 1}/${miscPages.length}):`, title)

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

    const seo = {
      slug: {
        current: slug,
      },
      pageTitle: title,
      pageDescription: htmlToText(intro || '', {
        // prevent newlines at 80 characters (the default)
        wordwrap: false,
        // skip images and remove links
        selectors: [
          { selector: 'img', format: 'skip' },
          { selector: 'figure', format: 'skip' },
          { selector: 'a', format: 'inlineString' },
        ],
      }).replace(/\n/g, ' '),
    }

    const sanityPage = {
      _type: 'page',
      _id: craftIdToSanityId(canonicalId),
      title: title,
      categories,
      seo,
    }

    exportHandlers.miscPagesExport?.write(sanityPage)
  }

  for (const handler in exportHandlers) {
    if (exportHandlers.hasOwnProperty(handler)) {
      exportHandlers[handler as keyof ExportHandlers]!.save()
    }
  }
}

buildImportFile()
