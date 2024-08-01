import url from 'url'
import { getCraftAssetInfo } from './convertContentMatrixToPortableText'
import { findCraftEntryByProp, cleanUri, resolveCraftIdToSanityId } from './findCraftEntryByProp'

const DOC_FILE_EXTENSIONS = ['pdf', 'doc', 'docx']

type ParsedLinkDetails =
  | {
    actionType: 'link' | 'internalLink' | 'downloadLink'
    resourceType: 'document' | 'link' | 'none'
    href?: string
    reference?: {
      _type: string
      _ref: string
    },
    file?: {
      _type: string
      _sanityAsset: string
    }
  }
  | undefined

// Get redirectUrl or resourceUrl links from Craft typed link field
export const getParsedLinkDetails = (parsedLink: string, siteId: number): ParsedLinkDetails => {
  const json = JSON.parse(parsedLink)


  // get relevant values from Craft typed link field
  const { linkedUrl, linkedId, type, linkedSiteId } = json

  // no type means no link
  if (!type || !(linkedUrl || linkedId)) {
    return undefined
  }

  // log in blue for visibility
  console.log(
    '\x1b[34m%s\x1b[0m',
    `\tParsing link of type ${type} with ${linkedId ? 'id: ' + linkedId : ''}${linkedUrl ? 'url: ' + linkedUrl : ''}`
  )

  if (type === 'url' && linkedUrl) {
    const cleanedLink: string | void = linkedUrl?.split('?')[0]

    // Check if it's a direct link to an asset
    if (cleanedLink && DOC_FILE_EXTENSIONS.some((ext) => cleanedLink.endsWith(ext))) {
      const documentResource = {
        actionType: 'downloadLink',
        resourceType: 'document',
        file: {
          _type: 'file',
          _sanityAsset: `file@${cleanedLink}`,
        }
      }
      console.log('\x1b[32m%s\x1b[0m', `\tParsed link is document / downloadLink: ${documentResource.file._sanityAsset}`)
      return documentResource
    }

    // Note: copied from processCraftHrefMarks
    const brazeDomains = [
      'www.braze.com',
      'www.braze.co.jp',
      // heroku (tech debt?)
      'braze-redesign-production.herokuapp.com',
      // very old domain
      'www.appboy.com',
    ]
    // regex: http[s]://[any of brazeDomains]/[not docs/]
    const isBrazeRegExp = new RegExp(`^https?:\/\/(${brazeDomains.join('|')})[/](?!(docs[/]))`)
    const isBrazeSite = linkedUrl.match(isBrazeRegExp)

    let href = linkedUrl
    if (isBrazeSite) {
      const urlParts = url.parse(linkedUrl)
      const cleanedUri = cleanUri(urlParts.pathname?.replace(/^[/]/, '') || '')
      href = `${urlParts.protocol}//${urlParts.hostname}/${cleanedUri}${urlParts.search || ''}`
    }

    const linkResource = {
      actionType: 'link',
      resourceType: 'link',
      // Note: link resourceType doesn't support internal links
      href,
    }
    console.log('\x1b[32m%s\x1b[0m', `\tParsed link is link: ${linkResource.href}`)
    return linkResource
  }

  if (type === 'asset' && linkedId) {
    const { url } = getCraftAssetInfo(linkedId) || {}
    const cleanedLink = url?.split('?')[0]

    if (!cleanedLink) return

    const documentResource = {
      actionType: 'downloadLink',
      resourceType: 'document',
      file: {
        _type: 'file',
        _sanityAsset: `file@${cleanedLink}`,
      }
    }
    console.log('\x1b[32m%s\x1b[0m', `\tParsed link is document / downloadLink: ${documentResource.file._sanityAsset}`)
    return documentResource
  }

  if (type === 'entry' && linkedId) {
    const craftEntry = findCraftEntryByProp(
      'canonicalId',
      linkedId.toString(),
      linkedSiteId?.toString() || siteId.toString()
    )
    if (craftEntry) {
      const internalResource = {
        actionType: 'internalLink',
        // not supported for resource links
        resourceType: 'none',
        reference: {
          _type: 'reference',
          _ref: resolveCraftIdToSanityId(craftEntry.canonicalId, craftEntry.siteId),
        },
      }
      console.log('\x1b[32m%s\x1b[0m', `\tParsed link is none / internalLink: ${internalResource.reference._ref}`)
      return internalResource
    }

    console.log('\x1b[41m%s\x1b[0m', `\t!!!!! Failed to find Craft entry for parsed link`, json)
    throw Error('NO CRAFT ENTRY FOUND')
  }

  // show error log if a case was missed
  if (linkedId || linkedUrl) console.log('\x1b[41m%s\x1b[0m', `!!!!! Unhandled link type: ${type}`, json)
  return undefined
}