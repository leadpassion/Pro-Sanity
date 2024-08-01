import craftSolutions from '@/scripts/data/craftExports/craftSolutions.json'
import { CraftSolutionsPage, ExportHandlers } from './craftTypes'
import {
  ExportSolutionsPages,
  craftIdToSanityId,
  generateCategoryReferences,
} from './helpers'
import { htmlToText } from 'html-to-text'

const solutions = craftSolutions as unknown as CraftSolutionsPage[]

const buildImportFile = async () => {
  const exportHandlers: Partial<ExportHandlers> = {
    solutionPagesExport: new ExportSolutionsPages(
      'scripts/data/sanityImports/industriesAndUseCases.ndjson',
    ),
  }

  for (const [index, page] of solutions.entries()) {
    const { canonicalId, title, slug, relatedCategories, intro, lang } = page

    console.log(`Processing page(${index + 1}/${solutions.length}):`, title)

    if (lang) {
      // log as error for visibility
      console.log('\x1b[41m%s\x1b[0m', `\t!!!!! Skipping page(${index + 1}/${solutions.length}) - reason: language is ${lang}`)
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

    const _type = page.relatedCategories?.includes(447)
      ? 'industryPage'
      : 'useCasePage'

    const sanityPage = {
      _type,
      _id: craftIdToSanityId(canonicalId),
      title: title,
      categories,
      seo,
    }

    exportHandlers.solutionPagesExport?.write(sanityPage)
  }

  for (const handler in exportHandlers) {
    if (exportHandlers.hasOwnProperty(handler)) {
      exportHandlers[handler as keyof ExportHandlers]!.save()
    }
  }
}

buildImportFile()
