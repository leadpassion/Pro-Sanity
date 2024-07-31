import enCraftEventsAndWebinars from '@/scripts/data/craftExports/craftWebinarsAndEvents.json'
import jaEventsAndWebinars from '@/scripts/data/craftExports/localization/craftWebinarsAndEventsJP.json'
// N/A import koEventsAndWebinars from '@/scripts/data/craftExports/localization/craftWebinarsAndEventsKR.json'

import { CraftEvent, ExportHandlers } from './craftTypes'
import {
  ExportPersons,
  ExportEventsAndWebinars,
  craftIdToSanityId,
  getCraftAssetInfo,
  getEventType,
  getCraftFormInfo,
  generateCategoryReferences,
  convertContentMatrixToPortableText,
  handleEventPresenters,
  handleEventTimezone,
  ExportVideosFromFields,
  ExportMarketoForms,
  getSeoMetadata,
  getParsedLinkDetails,
  processCraftHrefMarks,
} from './helpers'
import { getBlockContentType } from './helpers'
import { htmlToBlocks } from '@sanity/block-tools'
import { JSDOM } from 'jsdom'
import { htmlToText } from 'html-to-text'
import { handleVideoEmbedField } from './helpers/handleVideoEmbedField'
import { LANG_CODE_FIELD_NAME } from '@/lib/localization.config'

const exportHandlers: Partial<ExportHandlers> = {
  exportEventsAndWebinars: new ExportEventsAndWebinars(
    'scripts/data/sanityImports/eventsAndWebinars.ndjson',
  ),
  exportPersons: new ExportPersons('scripts/data/sanityImports/authors.ndjson'),
  exportVideosFromFields: new ExportVideosFromFields(
    'scripts/data/sanityImports/videos.ndjson',
  ),
  marketoFormsExport: new ExportMarketoForms(
    'scripts/data/sanityImports/marketoForms.ndjson',
  ),
}

const buildImportFile = async () => {
  await processPages(
    enCraftEventsAndWebinars as unknown as CraftEvent[],
    'en-us',
  )
  // TODO JP AND KR SITES IMPORT
  // await processPages(jaEventsAndWebinars as unknown as CraftEvent[], 'ja')

  for (const handler in exportHandlers) {
    if (exportHandlers.hasOwnProperty(handler)) {
      exportHandlers[handler as keyof ExportHandlers]!.save()
    }
  }
}

async function processPages(events: CraftEvent[], langCode: string) {
  console.log(`PROCESSING EVENTS AND WEBINARS IN ${langCode}`)

  for (const [index, event] of events.entries()) {
    const _type = getEventType(event)

    console.log(
      `Processing ${_type}(${index + 1}/${events.length}): `,
      event.title,
    )

    if (event.lang) {
      // log as error for visibility
      console.log('\x1b[41m%s\x1b[0m', `\t!!!!! Skipping - reason: language is ${event.lang}`)
      continue
    }

    // prevent null
    const date = event.eventDate || undefined

    const excerpt = event.excerpt
      ? htmlToBlocks(
        event.excerpt.replaceAll(/<br \/>/g, ''),
        getBlockContentType('event', 'description'),
        {
          parseHtml: (html) => new JSDOM(html).window.document,
          rules: [],
        },
      )
      : []

    const bodySimple = event.contentMatrixSimple
      ? await convertContentMatrixToPortableText(
        event.contentMatrixSimple,
        'event',
        'description',
        String(event.canonicalId),
        exportHandlers,
      )
      : []

    const description = [...excerpt, ...bodySimple]

    // featured image
    const { url: featuredImageUrl } = getCraftAssetInfo(event.heroImage[0]) || {}
    const featuredImage = featuredImageUrl
      ? {
        _type: 'image',
        _sanityAsset: `image@${featuredImageUrl}`,
      }
      : undefined
    if (!featuredImage && event.heroImage[0]) {
      // log as warning
      console.log('\x1b[43m%s\x1b[0m', `\t!!! No featured image found: id ${event.heroImage[0]}`)
    }

    const presenters = handleEventPresenters(
      event,
      exportHandlers.exportPersons!,
    )

    const videoReference = event.videoEmbed
      ? await handleVideoEmbedField(
        event.videoEmbed,
        exportHandlers.exportVideosFromFields!,
      )
      : undefined

    const categories = generateCategoryReferences([
      event.primaryCategory || [],
      event.relatedCategories || [],
      event.productCategories || [],
    ])

    // Marketo form
    const { embeddedForm, newSanityFormDoc } = getCraftFormInfo(
      event.marketoForm[0]
    ) || {}
    // handle marketo form submit behavior
    if (embeddedForm) {
      const {
        submitButtonText,
        redirectUrl,
        thankYouOverride,
        marketoThankYou,
      } = event

      embeddedForm.submitBehavior = 'thankYouPage' // default for Craft
      let { actionType, href, reference, file } = getParsedLinkDetails(redirectUrl, event.siteId) || {}
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

    const sanityEvent = {
      _id: craftIdToSanityId(event.canonicalId, '', langCode),
      _type,
      title: event.title,
      [LANG_CODE_FIELD_NAME]: langCode,
      date,
      timezone: handleEventTimezone(event),
      description,
      featuredImage,
      presenters,
      categories,
      embeddedForm,
      video: videoReference,
      seo: getSeoMetadata(event),
    }

    exportHandlers.exportEventsAndWebinars!.write(sanityEvent)

    if (newSanityFormDoc) {
      exportHandlers.marketoFormsExport!.write(newSanityFormDoc)
    }
  }
}

buildImportFile()
