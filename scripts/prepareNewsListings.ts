import enCraftNewsListings from 'scripts/data/craftExports/craftNewsListings.json'
import jaCraftNewsListings from 'scripts/data/craftExports/localization/craftInTheNewsJP.json'
import koCraftNewsListings from 'scripts/data/craftExports/localization/craftInTheNewsKR.json'
import { CraftNewsListing, ExportHandlers } from './craftTypes'
import {
  ExportNewsListings,
  ExportPublications,
  craftIdToSanityId,
  handleNewsListingPublication,
} from './helpers'
import { LANG_CODE_FIELD_NAME } from '@/lib/localization.config'

const exportHandlers: Partial<ExportHandlers> = {
  newsListingsExport: new ExportNewsListings(
    'scripts/data/sanityImports/newsListings.ndjson',
  ),
  publicationsExport: new ExportPublications(
    'scripts/data/sanityImports/publications.ndjson',
  ),
}

const buildImportFile = async () => {
  processPages(enCraftNewsListings as unknown as CraftNewsListing[], 'en-us')
  processPages(jaCraftNewsListings as unknown as CraftNewsListing[], 'ja')
  processPages(koCraftNewsListings as unknown as CraftNewsListing[], 'ko')

  for (const handler in exportHandlers) {
    if (exportHandlers[handler as keyof ExportHandlers]) {
      exportHandlers[handler as keyof ExportHandlers]!.save()
    }
  }
}

async function processPages(
  newsListings: CraftNewsListing[],
  langCode: string,
) {
  console.log(`PROCESSING NEWS LISTINGS IN ${langCode}`)

  for (const [index, entry] of newsListings.entries()) {
    console.log(
      `Processing entry(${index + 1}/${newsListings.length}): `,
      entry.title,
    )

    const publication = handleNewsListingPublication(
      entry,
      exportHandlers.publicationsExport!,
    )

    const publicationDate = entry.publicationDate.split(' ')[0]

    const sanityNewsListing = {
      _id: craftIdToSanityId(entry.canonicalId, '', langCode),
      [LANG_CODE_FIELD_NAME]: langCode,
      _type: 'newsListing',
      title: entry.title,
      url: entry.urlField,
      publicationDate,
      publication,
    }

    exportHandlers.newsListingsExport?.write(sanityNewsListing)
  }
}

buildImportFile()
