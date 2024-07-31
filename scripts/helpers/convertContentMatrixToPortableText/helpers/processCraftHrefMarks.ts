import { PortableTextTextBlock, TypedObject } from 'sanity'
import { craftIdToSanityId, findCraftEntryByProp, cleanUri, resolveCraftIdToSanityId, translateCategoryId } from '@/scripts/helpers'

/**
 * This function processes the href marks in a portable text block.
 * If it finds an href mark with a href value that starts with "{entry:",
 * it will replace the href value with the URL of the entry in the href value.
 *
 * @param {(TypedObject | PortableTextTextBlock<unknown>)[]} blocks
 * @returns {(TypedObject | PortableTextTextBlock<unknown>)[]}
 */
export const processCraftHrefMarks = (
  blocks: (TypedObject | PortableTextTextBlock<unknown>)[],
): (TypedObject | PortableTextTextBlock<unknown>)[] => {
  const newBlocks = blocks.map((block) => {
    // If the block is not a standard block (and is some kind of custom block), return it as is
    if (block._type !== 'block') return block

    // If the block has no marks, return it as is
    if (!(block.markDefs as any[]).length) return block

    // If the block has marks, check each mark
    const newMarkDefs = (block.markDefs as any[]).map((markDef) => {
      // If the mark is not a link, return it as is
      if (markDef._type !== 'link') return markDef

      // If the mark is a link, check the href value
      const href = markDef.href
      let fullHref = ''

      console.log('\x1b[34m%s\x1b[0m', `\tProcessing Craft href mark`, href)

      // If the href value starts with "{asset:", set the _type to "downloadLink"
      if (href.startsWith('{asset:')) {
        // Get the fallback href value. It's between `||` and `}`
        const fallbackHref = href.split('||')[1].split('}')[0].split('?')[0]

        const downloadMarkDef = {
          _key: markDef._key,
          _type: 'downloadLink',
          file: {
            _type: 'file',
            _sanityAsset: `file@${fallbackHref}`,
          },
        }
        console.log('\x1b[32m%s\x1b[0m', `\tCraft href mark is downloadLink ${downloadMarkDef.file._sanityAsset}`)
        return downloadMarkDef
      }

      // If the href value starts with "{category:", use the fallback url
      if (href.startsWith('{category:')) {
        // Get the fallback href value. It's between `||` and `}`
        const fallbackHref = href.split('||')[1].split('}')[0].split('?')[0]
        // Fallback to absolute url
        fullHref = fallbackHref
      }

      // If the href value starts with "{asset:", check if the entry exists for internalLink
      if (href.startsWith('{entry:')) {
        // Get the entry ID from the href value
        // It should be the string between "{entry:" and "@"
        const entryId = href.split('{entry:')[1].split('@')[0]
        // Get the siteId as well, it's the number after the "@"
        const siteId = href.split('@')[1][0]

        // verify the entry exists
        const entryRef = findCraftEntryByProp(
          'canonicalId',
          entryId,
          siteId
        )
        // console.log(`\tFound entry by id ${entryId}?`, entryRef)

        // Set _type to internalLink
        // TODO JP AND KR SITES IMPORT - TEMP FIX: Handle special case for EN page referring to JP page missing July 19 2024
        if (entryRef
          && !(entryRef.canonicalId === 13 && entryRef.siteId == 2)) {
          const internalMarkDef = {
            _key: markDef._key,
            _type: 'internalLink',
            reference: {
              _type: 'reference',
              _ref: resolveCraftIdToSanityId(entryRef.canonicalId, entryRef.siteId),
            },
          }
          console.log('\x1b[32m%s\x1b[0m', `\tCraft href mark is internalLink ${internalMarkDef.reference._ref}`)
          return internalMarkDef
        }

        // Get the fallback href value. It's between `||` and `}`
        const fallbackHref = href.split('||')[1].split('}')[0].split('?')[0]
        // Fallback to absolute url
        fullHref = fallbackHref
      }

      // Handle absolute links
      fullHref = fullHref || (href.startsWith('http') ? href : '')

      if (fullHref) {
        // define domain replacement regex for href
        const brazeDomains = [
          'www.braze.com',
          'www.braze.co.jp',
          // heroku (tech debt?)
          'braze-redesign-production.herokuapp.com',
          // very old domain
          'www.appboy.com',
          // staging?? U_U'
          'homeslice.braze.com',
        ]
        // regex: http[s]://[any of brazeDomains]/[not docs/]
        const isBrazeRegExp = new RegExp(`^https?:\/\/(${brazeDomains.join('|')})[/](?!(docs[/]))`)
        const isBrazeSite = fullHref.match(isBrazeRegExp)

        // Is this a link to our website?
        if (isBrazeSite) {
          // get the entry uri from the href
          let relativeHref = fullHref.replace(isBrazeRegExp, '')

          // define site id by checking domain or prefix path
          let siteId = '1'
          if (isBrazeSite[1] === brazeDomains[1] || relativeHref.startsWith('jp/')) {
            // JP
            siteId = '2'
          } else if (relativeHref.startsWith('kr/')) {
            // KR
            siteId = '6'
          }

          // get the uri for the Craft site, without querystring or trailing slash
          relativeHref = cleanUri(relativeHref.replace(/^(jp|kr)[/]/, '').split('?')[0].replace(/[/]$/, ''))
          // Check if the entry exists for internalLink by (correct) uri, skipping if it's a base url
          const entryRef = relativeHref ?
            findCraftEntryByProp(
              'uri',
              relativeHref,
              siteId,
            ) :
            undefined
          // console.log(`\tFound entry by uri ${relativeHref}?`, entryRef)

          // Set _type to internalLink
          if (entryRef) {
            const internalMarkDef = {
              _key: markDef._key,
              _type: 'internalLink',
              reference: {
                _type: 'reference',
                _ref: resolveCraftIdToSanityId(entryRef.canonicalId, entryRef.siteId),
              },
            }
            console.log('\x1b[32m%s\x1b[0m', `\tCraft href mark is internalLink ${internalMarkDef.reference._ref}`)
            return internalMarkDef
          }

          // Not found, continue to set the _type to link without tech debt paths
          const correctedMarkHref = {
            _key: markDef._key,
            href: relativeHref ? `/${relativeHref}` : fullHref,
            _type: 'link',
          }
          console.log('\x1b[32m%s\x1b[0m', `\tCraft href mark is link ${correctedMarkHref.href}`)
          return correctedMarkHref
        }
      }

      // Double-check there are no issues
      if (href.match(/^{|localhost/)) {
        console.log('\x1b[43m%s\x1b[0m', `\t!!!!! Malformed link found: ${href}`)
        throw Error('Failed to process Craft Href Marks')
      }

      // Must be an external link, return with no changes
      console.log('\x1b[32m%s\x1b[0m', `\tCraft href mark is link ${href}`)
      return markDef
    })

    // Return the block with the updated markDefs
    return {
      ...block,
      markDefs: newMarkDefs,
    }
  })

  return newBlocks
}
