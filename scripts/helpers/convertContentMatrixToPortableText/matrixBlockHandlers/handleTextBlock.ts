import { htmlToBlocks } from '@sanity/block-tools'
import { JSDOM } from 'jsdom'
import { ArraySchemaType } from 'sanity'

export type CraftTextBlockFields = {
  body: string
}

/**
 * This function takes the fields for a Craft text block and returns
 * an equivalent portable text block. It uses Sanity's handy block-tools
 * library to convert the HTML body of the text block into portable text.
 * @param fields -- the fields for the text block
 * @param blockContentType -- the content type for the block
 * @returns the text block or undefined if the body is not provided
 */
export const handleTextBlock = (
  fields: CraftTextBlockFields,
  blockContentType: ArraySchemaType<unknown>,
) => {
  let blockBody = fields.body

  if (!blockBody || blockBody === '') return

  // Remove <br> tags from the block body
  // These are currently used liberally in the Craft CMS content
  // and don't translate well to portable text
  blockBody = blockBody
    .replaceAll(/<br>/g, '')
    .replaceAll(/<br \/>/g, '')
    .replaceAll(/\n/g, '')
    .replaceAll(/<p><\/p>/g, '')

  const portableTextBlocks = htmlToBlocks(blockBody, blockContentType, {
    // Since we're running this in a script, we need to use JSDOM to parse the HTML
    parseHtml: (html) => new JSDOM(html).window.document,

    // Custom rules go here for things like inline images, code blocks, etc.
    // See https://www.npmjs.com/package/@sanity/block-tools for more info
    rules: [
      {
        deserialize(el, next, block) {
          if (el.tagName?.toLowerCase() !== 'img') return undefined
          if (el.tagName?.toLowerCase() === 'img') {
            const e = el as HTMLImageElement

            let src = e.getAttribute('src')

            if (!src) return undefined

            // Replace the host for images
            const hostToReplace =
              'https://www.appboy.com/blog/wp-content/uploads/'
            const replaceWith =
              'https://marketing-assets.braze.com/production/legacy/wp/'
            src = src?.replace(hostToReplace, replaceWith)

            // Get rid of the entry notation if present
            // Example: {asset:128434@1:url||https://www.braze.com/why-braze/customer-engagement}
            const entryNotation = '{asset:'
            if (src.includes(entryNotation)) {
              src = src.split(entryNotation)[1].split('||')[1].split('}')[0]
            }

            return block({
              _type: 'richImage',
              _sanityAsset: `image@${src}`,
            })
          }
        },
      },
    ],
  })

  // console.log(JSON.stringify(portableTextBlocks, null, 2))

  // Remove any blocks where `children.text` is ''
  // This is a common issue with the Craft CMS content
  // and can cause issues in Sanity
  // return portableTextBlocks.filter(
  //   (block) => (block as PortableTextTextBlock).children[0].text !== '',
  // )

  return portableTextBlocks
}
