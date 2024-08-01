import enReportsAndGuides from '@/scripts/data/craftExports/craftReportsAndGuides.json'
// import jpReportsAndGuides from '@/scripts/data/craftExports/localization/craftReportsAndGuidesKR.json'
// import krReportsAndGuides from '@/scripts/data/craftExports/localization/craftReportsAndGuidesKR.json'
import { CraftReport, ExportHandlers } from './craftTypes'
import {
  convertContentMatrixToPortableText,
  craftIdToSanityId,
  ExportReportsAndGuides,
  ExportMarketoForms,
  generateCategoryReferences,
  getBlockContentType,
  getCraftAssetInfo,
  getCraftFormInfo,
  getParsedLinkDetails,
  getSeoMetadata,
  processCraftHrefMarks,
} from './helpers'
import { getDocIsReport } from './helpers/getDocIsReport'
import { htmlToBlocks } from '@sanity/block-tools'
import { JSDOM } from 'jsdom'
import { htmlToText } from 'html-to-text'
import { LANG_CODE_FIELD_NAME } from '@/lib/localization.config'

// Create export handler(s)
const exportHandlers: Partial<ExportHandlers> = {
  exportReportsAndGuides: new ExportReportsAndGuides(
    'scripts/data/sanityImports/reportsAndGuides.ndjson',
  ),
  marketoFormsExport: new ExportMarketoForms(
    'scripts/data/sanityImports/marketoForms.ndjson',
  ),
}

const buildImportFile = async () => {
  await processPages(enReportsAndGuides as unknown as CraftReport[], 'en-us')
  // TODO JP AND KR SITES IMPORT
  // await processPages(jpReportsAndGuides as unknown as CraftReport[], 'ja')
  // await processPages(krReportsAndGuides as unknown as CraftReport[], 'ko')

  for (const handler in exportHandlers) {
    if (exportHandlers.hasOwnProperty(handler)) {
      exportHandlers[handler as keyof ExportHandlers]!.writeTranslations()
      exportHandlers[handler as keyof ExportHandlers]!.save()
    }
  }
}

async function processPages(reportsAndGuides: CraftReport[], langCode: string) {
  for (const [count, page] of reportsAndGuides.entries()) {
    const _type = getDocIsReport(page) ? 'report' : 'guide'

    console.log(
      `Processing ${_type}(${count}/${reportsAndGuides.length}): ${page.title}`,
      langCode,
    )

    // Exclude "microsite" pages (not all have language set -_- )
    if (page.lang ||
      [437269, 223178, 189735, 152267, 746169, 451003, 647852, 184518].indexOf(page.canonicalId) >= 0) {
      // log as error for visibility
      console.log('\x1b[41m%s\x1b[0m', `\t!!!!! Skipping - reason: language is ${page.lang || 'German or French'}`)
      continue
    }

    // featured image
    const { url: featuredImageUrl } = getCraftAssetInfo(page.heroImage[0]) || {}
    const featuredImage = featuredImageUrl
      ? {
        _type: 'richImage',
        _sanityAsset: `image@${featuredImageUrl}`,
      }
      : undefined
    if (!featuredImage && page.heroImage[0]) {
      // log as warning
      console.log('\x1b[43m%s\x1b[0m', `\t!!! No featured image found: id ${page.heroImage[0]}`)
    }

    // get the resource and set the respective fields
    const { resourceType = 'none', href, file, reference } = getParsedLinkDetails(
      page.resourceLink, page.siteId
    ) || {}
    const document = file && resourceType === 'document' ? file : undefined
    const resourceLink = href && resourceType === 'link' ? href : undefined
    // unsupported - show warning for internal links
    if (resourceType === 'none' && reference) {
      // log as error
      console.log('\x1b[43m%s\x1b[0m', `\t!!!!! Unsupported resource type - internal link: ${reference}`)
    }
    // log as warning
    !document && !resourceLink && console.log('\x1b[33m%s\x1b[0m', `\t!!! No resource link`)

    // Marketo form
    const { embeddedForm, newSanityFormDoc } = getCraftFormInfo(
      page.marketoForm[0],
    ) || {}
    // handle marketo form submit behavior
    if (embeddedForm) {
      const {
        submitButtonText,
        redirectUrl,
        thankYouOverride,
        marketoThankYou,
      } = page

      embeddedForm.submitBehavior = 'thankYouPage' // default for Craft
      let { actionType, href, reference, file } = getParsedLinkDetails(redirectUrl, page.siteId) || {}
      if (actionType === 'link' && href) {
        embeddedForm.submitBehavior = 'otherRedirect'
        embeddedForm.redirectUrl = {
          actionType,
          href,
        }
      } else if (actionType === 'internalLink' && reference) {
        embeddedForm.submitBehavior = 'otherRedirect'
        embeddedForm.redirectUrl = {
          actionType,
          reference,
        }
      } else if (actionType === 'downloadLink' && file) {
        // unsupported - show warning for document types and prevent importing them
        console.log('\x1b[33m%s\x1b[0m', `\t!!!!! Skipped document redirect link ${file._sanityAsset}`)
      } else {
        console.log('\x1b[33m%s\x1b[0m', `\tDefault embeddedForm submit behavior (thankYouPage)`)
      }

      const thankYouMessage = marketoThankYou ? processCraftHrefMarks(
        htmlToBlocks(
          marketoThankYou,
          // Note: quick fix using this since it's the same type as thankYouMessage type
          getBlockContentType('testimonial', 'body'),
          {
            parseHtml: (html) => new JSDOM(html).window.document,
            rules: [],
          }
        )
      ) : undefined

      Object.assign(embeddedForm, {
        submitButtonText: submitButtonText || undefined, // no null
        thankYouHeadline: thankYouOverride || undefined, // no null
        thankYouMessage,
      })
    }

    const blockContentType = getBlockContentType('report', 'description')

    const excerpt = page.excerpt
      ? htmlToBlocks(
        page.excerpt.replaceAll(/<br \/>/g, ''),
        blockContentType,
        {
          parseHtml: (html) => new JSDOM(html).window.document,
          rules: [],
        },
      )
      : []

    const bodySimple = page.contentMatrixSimple
      ? await convertContentMatrixToPortableText(
        page.contentMatrixSimple,
        _type,
        'description',
        String(page.canonicalId),
        exportHandlers,
        {
          allowTestimonials: false,
          langCode,
        },
      )
      : []

    const description = [...excerpt, ...bodySimple]

    const categories = generateCategoryReferences([
      page.primaryCategory || [],
      page.relatedCategories || [],
      page.productCategories || [],
    ])

    const sanityPage = {
      _id: craftIdToSanityId(page.canonicalId, '', langCode),
      _type,
      title: page.title,
      [LANG_CODE_FIELD_NAME]: langCode,
      resourceType: resourceType || 'none',
      document,
      resourceLink,
      description,
      embeddedForm,
      featuredImage,
      categories,
      hideFromSearch: page.hideFromSearch || false,
      hideFromListing: page.hideFromListing || false,
      seo: getSeoMetadata(page),
    }

    exportHandlers.exportReportsAndGuides!.write(sanityPage)
    exportHandlers.exportReportsAndGuides!.addTranslationMetadataDoc(
      page.canonicalId,
      sanityPage,
    )

    if (newSanityFormDoc) {
      exportHandlers.marketoFormsExport!.write(newSanityFormDoc)
    }
  }
}

buildImportFile()
