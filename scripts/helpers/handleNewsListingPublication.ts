import { CraftNewsListing } from '../craftTypes'
import {
  ExportPublications,
  getCraftAssetInfo,
} from './convertContentMatrixToPortableText'
import crypto from 'crypto'
import { craftIdToSanityId } from './craftIdToSanityId'

type NewsListingPublisherRefBlock = {
  _type: 'reference'
  _ref: string
}

export const handleNewsListingPublication = (
  newsListing: CraftNewsListing,
  publicationExporter: ExportPublications,
): NewsListingPublisherRefBlock | undefined => {
  if (!newsListing.publicationName) return undefined

  // There are many duplicate publications in the Craft data, so we need to hash the publication name
  // to ensure we only create one publication document in Sanity for each unique publication
  const hashedPublicationName = hashPublicationName(newsListing.publicationName)

  const _id = craftIdToSanityId(hashedPublicationName)

  const { url: logoUrl } = getCraftAssetInfo(newsListing.heroImage[0]) || {
    url: undefined,
  }

  const logo = logoUrl
    ? {
        _type: 'image',
        _sanityAsset: `image@${logoUrl}`,
      }
    : undefined

  publicationExporter.write(_id, {
    name: newsListing.publicationName,
    logo,
  })

  return {
    _type: 'reference',
    _ref: _id,
  }
}

const hashPublicationName = (publicationName: string) => {
  const hashedPublicationName = crypto
    .createHash('sha1')
    .update(publicationName)
    .digest('hex')

  return hashedPublicationName
}
