import enPartners from '@/scripts/data/craftExports/craftPartners.json'
import jaPartners from '@/scripts/data/craftExports/localization/craftPartnersJP.json'
// No KO partners
import * as fs from 'fs'
import { CraftPartner, ExportHandlers } from './craftTypes'
import {
  ExportPartners,
  ExportVideos,
  convertContentMatrixToPortableText,
  craftIdToSanityId,
  generateCategoryReferences,
  getBlockContentType,
  getPartnerType,
  getBrandId,
  getSeoMetadata,
  processCraftHrefMarks,
} from './helpers'
import { htmlToBlocks } from '@sanity/block-tools'
import { JSDOM } from 'jsdom'

const exportHandlers: Partial<ExportHandlers> = {
  exportPartners: new ExportPartners(
    'scripts/data/sanityImports/partners.ndjson',
  ),
  videosExport: new ExportVideos('scripts/data/sanityImports/videos.ndjson'),
}

// keep record of ids used
const livePartnerIds = {}

const buildImportFile = async () => {
  await processPages(enPartners as unknown as CraftPartner[], 'en-us')
  await processPages(jaPartners as unknown as CraftPartner[], 'ja')

  for (const handler in exportHandlers) {
    if (exportHandlers.hasOwnProperty(handler)) {
      exportHandlers[handler as keyof ExportHandlers]!.writeTranslations()
      exportHandlers[handler as keyof ExportHandlers]!.save()
    }
  }

  // Write brand ids to misc file for other imports (case studies) to reference
  console.log('Writing partner ids to file')
  const prandIdsWriteStream = fs.createWriteStream('scripts/data/misc/partnerIdsWithLang.json', { encoding: 'utf8', autoClose: true })
  prandIdsWriteStream.write(JSON.stringify(livePartnerIds))
  prandIdsWriteStream.end()
}

async function processPages(partners: CraftPartner[], langCode: string) {
  for (const [count, partner] of partners.entries()) {
    console.log(
      `Processing partner(${count + 1}/${partners.length}): "${partner.title}"`,
      langCode,
    )

    const _type = getPartnerType(partner)

    if (!_type) {
      // log as error for visibility
      console.log(
        '\x1b[41m%s\x1b[0m',
        `\t!!!!! Skipping partner ${partner.title} due to missing type`
      )
      continue
    }

    // add to list of partner for later imports (case studies)
    livePartnerIds[partner.canonicalId] = livePartnerIds[partner.canonicalId] ?
      livePartnerIds[partner.canonicalId].push(langCode) : [langCode]

    // not translated
    const company = partner.brand[0]
      ? {
        _type: 'reference',
        _ref: getBrandId(partner.brand[0]),
      }
      : undefined

    const documentationUrl = partner.brazeDocumentationUrl || undefined

    const blockContentType = getBlockContentType('solutionsPartner', 'whatIsIt')

    const whatIsIt = partner.whatIs
      ? processCraftHrefMarks(htmlToBlocks(partner.whatIs, blockContentType, {
        parseHtml: (html) => new JSDOM(html).window.document,
        rules: [],
      }))
      : []

    const howWeWorkTogether = partner.howWeWorkTogether
      ? processCraftHrefMarks(htmlToBlocks(partner.howWeWorkTogether, blockContentType, {
        parseHtml: (html) => new JSDOM(html).window.document,
        rules: [],
      }))
      : []

    const categories = generateCategoryReferences([
      partner.partnerCategories || [],
      partner.relatedCategories || [],
      partner.industries || [],
      partner.specialty || [],
    ])

    const videoEmbedBlocks = partner.videoEmbed
      ? await convertContentMatrixToPortableText(
        [
          {
            key: '0',
            type: 'video',
            enabled: true,
            collapsed: false,
            fields: {
              embed: partner.videoEmbed,
            },
          },
        ],
        'technologyPartner',
        'whatIsIt',
        String(partner.canonicalId),
        exportHandlers,
        { langCode },
      )
      : []

    const featuredContent = partner.featuredContent.length 
      ? {
        _type: 'reference',
        _ref: craftIdToSanityId(partner.featuredContent[0], '', langCode),
      }
      : undefined

    const sanityPartner = {
      _id: craftIdToSanityId(partner.canonicalId, '', langCode),
      _type: `${_type}Partner`,
      title: partner.title,
      language: langCode,
      company,
      documentationUrl,
      categories,
      whatIsIt: [...whatIsIt, ...videoEmbedBlocks],
      howWeWorkTogether,
      featuredContent,
      seo: getSeoMetadata(partner),
    }

    exportHandlers.exportPartners.write(sanityPartner)
    exportHandlers.exportPartners.addTranslationMetadataDoc(
      partner.canonicalId,
      sanityPartner,
      // Use slugs to match up partner pages for translation metadata
      sanityPartner.seo.slug.current,
    )
  }
}

buildImportFile()
