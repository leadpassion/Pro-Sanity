import craftSingles from '@/scripts/data/craftExports/singles'
import { CraftSinglePage, ExportHandlers } from './craftTypes'
import { ExportSingles, craftIdToSanityId } from './helpers'
import { htmlToText } from 'html-to-text'

const singlesPages = craftSingles as unknown as CraftSinglePage[]

// Create export handler(s)
const buildImportFile = async () => {
  const exportHandlers: Partial<ExportHandlers> = {
    singlesExport: new ExportSingles(
      'scripts/data/sanityImports/singles.ndjson',
    ),
  }

  for (const [index, page] of singlesPages.entries()) {
    const {
      canonicalId,
      title,
      slug,
    } = page;

    console.log(`Processing page(${index + 1}/${singlesPages.length}):`, title)

    const seo = {
      slug: {
        current: slug,
      },
      pageTitle: title,
    }

    const sanityPage = {
      _type: 'page',
      _id: craftIdToSanityId(canonicalId),
      title,
      seo,
    }

    exportHandlers.singlesExport?.write(sanityPage)
  }

  for (const handler in exportHandlers) {
    if (exportHandlers.hasOwnProperty(handler)) {
      exportHandlers[handler as keyof ExportHandlers]!.save()
    }
  }
}

buildImportFile()
