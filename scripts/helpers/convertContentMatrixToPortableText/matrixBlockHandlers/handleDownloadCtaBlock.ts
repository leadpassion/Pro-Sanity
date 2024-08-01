import { htmlToBlocks } from '@sanity/block-tools'
import { getBlockContentType } from '../helpers/getBlockContentType'
import { JSDOM } from 'jsdom'

export type CraftDownloadCtaBlockFields = {
  headline: string | null
  linkField: string
}

/**
 * This function takes the fields for a Craft download cta block and returns
 * an equivalent portable text block.
 * @param fields -- the fields for the download cta block
 * @returns the Portable Text block or undefined if the asset is not provided
 */
export const handleDownloadCtaBlock = (fields: CraftDownloadCtaBlockFields) => {
  const { headline: craftHeadline, linkField: craftLinkField } = fields

  if (!craftLinkField) return undefined

  // Note: quick fix using testimonial block type since it's the same as ctaCard block type
  const blockContentType = getBlockContentType('testimonial', 'body')

  const body = craftHeadline
    ? htmlToBlocks(craftHeadline, blockContentType, {
        parseHtml: (html) => new JSDOM(html).window.document,
        rules: [],
      })
    : undefined

  // Parse the linked field to get the linkedUrl and customText
  // Example of the linkField value in Craft: '{"linkedUrl":"https://www.braze.com/customers/tiket-case-study","linkedId":null,"linkedSiteId":null,"linkedTitle":null,"payload":"{\\"customText\\":\\"Read more\\"}","type":"url"}'
  const parsedLinkedField = JSON.parse(craftLinkField)

  const { linkedUrl } = parsedLinkedField

  const { customText } = JSON.parse(parsedLinkedField.payload)

  const cta = {
    _type: 'cta',
    body,
    actions: [
      {
        _type: 'ctaAction',
        actionType: 'link',
        buttonText: customText || 'Check It Out',
        link: linkedUrl,
      },
    ],
  }

  return [cta]
}
