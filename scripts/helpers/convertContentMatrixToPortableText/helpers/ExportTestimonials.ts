import { htmlToBlocks } from '@sanity/block-tools'
import { JSDOM } from 'jsdom'
import { ExportNdjsonBase } from './ExportNdjsonBase'
import { CraftTestimonialFields } from '../matrixBlockHandlers/handleTestimonialBlock'
import { getBlockContentType } from './getBlockContentType'
import { LANG_CODE_FIELD_NAME } from '@/lib/localization.config'

/**
 * This class exports testimonials to a file in ndjson format
 */
export class ExportTestimonials extends ExportNdjsonBase {
  /**
   * Writes a testimonial to ndjson lines
   * @param testimonialId id to saving the testmonial as
   * @param testimonialfields Craft testimonial data to save
   * @param langCode language code
   */
  write(
    testimonialId: string,
    testimonialfields: CraftTestimonialFields,
    langCode: string = '',
  ) {
    let blockBody = testimonialfields.quotation || testimonialfields.quote || ''

    // Remove trailing and leading quotes
    blockBody = blockBody
      .replace(/^"/, '')
      .replace(/"$/, '')
      .replace(/^“/, '')
      .replace(/”$/, '')

    const blockContentType = getBlockContentType('testimonial', 'body')

    const portableTextBlocks = htmlToBlocks(blockBody, blockContentType, {
      parseHtml: (html) => new JSDOM(html).window.document,
      rules: [],
    })

    const attributionDetails = [
      testimonialfields.attributionName,
      testimonialfields.attributionTitle,
    ]
      .filter(Boolean)
      .join(', ')

    const testimonialJson = {
      _type: 'testimonial',
      _id: testimonialId,
      [LANG_CODE_FIELD_NAME]: langCode,
      body: portableTextBlocks,
      overrideAttribution: true,
      attributionDetails: attributionDetails,
    }

    super.writeJson(testimonialJson)
    // note: need consistent id so remove appended langCode if any
    super.addTranslationMetadataDoc(
      testimonialId.replace(new RegExp(`-${langCode}$`), ''),
      testimonialJson,
    )
  }
}
