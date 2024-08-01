import enPartners from '@/scripts/data/craftExports/craftPartners.json'
// import jaPartners from '@/scripts/data/craftExports/localization/craftPartnersJP.json'
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
import { htmlToText } from 'html-to-text'
import { JSDOM } from 'jsdom'

const exportHandlers: Partial<ExportHandlers> = {
  exportPartners: new ExportPartners(
    'scripts/data/sanityImports/partners.ndjson',
  ),
  videosExport: new ExportVideos('scripts/data/sanityImports/videos.ndjson'),
}

// keep record of ids used
const livePartnerIds: Record<number, string[]> = {}

const buildImportFile = async () => {
  await processPages(enPartners as unknown as CraftPartner[], 'en-us')
  // await processPages(jaPartners as unknown as CraftPartner[], 'ja')

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
    const _type = getPartnerType(partner)

    console.log(
      `Processing ${_type}Partner(${count + 1}/${partners.length}): "${partner.title}"`,
      langCode,
    )


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
      partner.industries || [],
      partner.relatedCategories || [],
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

    // Technology Partners only - start

    const isTechnology = _type === 'technology'
    const featuredPartnerShortDescription = isTechnology && partner.excerpt
      ? (htmlToText(partner.excerpt, { wordwrap: false }).trim() || undefined)
      : undefined

    // Partner Specialty
    const partnerSpecialtyCategories = isTechnology && partner.specialty[0]
      ? generateCategoryReferences([
        partner.specialty
      ])
      : undefined
    const partnerSpecialty = isTechnology && partnerSpecialtyCategories
      // @ts-ignore
      ? Object.values(partnerSpecialtyCategories)[0][0]
      : undefined

    // Partner categories for api
    const onlyRelatedCategories = isTechnology && partner.relatedCategories.length
      ? generateCategoryReferences([
        partner.relatedCategories
      ])
      : undefined
    const partnerCategories = onlyRelatedCategories
      ? Object.values(onlyRelatedCategories).flat()
      : undefined

    const partnerIntegrationMethods = isTechnology && partner.partnerIntegrationMethods
      ? partner.partnerIntegrationMethods.flatMap(methodRow => Object.values(methodRow))
        .filter(Boolean)
      : undefined

    const dashboardIntegrationMethods = isTechnology && partner.dashboardIntegrationMethods
      ? partner.dashboardIntegrationMethods.map(handleDashboardIntegrationMethods)
        .filter(Boolean)
      : undefined

    // end - Technology partners only

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
      integrationPartnerId: partner.integrationPartnerId || undefined,
      isFeaturedPartner: isTechnology ? partner.featuredPartner : undefined,
      featuredPartnerShortDescription,
      partnerSpecialty,
      partnerCategories,
      partnerIntegrationMethods,
      dashboardIntegrationMethods: dashboardIntegrationMethods?.length ? dashboardIntegrationMethods : undefined,
      seo: getSeoMetadata(partner),
    }

    exportHandlers.exportPartners!.write(sanityPartner)
    exportHandlers.exportPartners!.addTranslationMetadataDoc(
      partner.canonicalId,
      sanityPartner,
      // Use slugs to match up partner pages for translation metadata
      sanityPartner.seo.slug.current,
    )
  }
}

// helper for tech partners
function handleDashboardIntegrationMethods(dashIntRow: Record<string, string>) {
  const { col1: title, col2: methodId, col3: brazeDocumentationUrl, col4: partnerDocumentationUrl } = dashIntRow

  if (!title && !methodId && !brazeDocumentationUrl && !partnerDocumentationUrl) {
    return null
  }

  return {
    title: title ? title : undefined,
    methodId: methodId ? methodId : undefined,
    brazeDocumentationUrl: brazeDocumentationUrl ? brazeDocumentationUrl : undefined,
    partnerDocumentationUrl: partnerDocumentationUrl ? partnerDocumentationUrl : undefined
  }
}

buildImportFile()
