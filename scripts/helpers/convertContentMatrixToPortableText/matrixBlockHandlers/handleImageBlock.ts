import { getCraftAssetInfo } from '../helpers/getCraftAssetInfo'

export type CraftImageBlockFields = {
  asset?: [number]
  image?: [number]
  caption: string | null
}

/**
 * This function takes the fields for a Craft image block and returns
 * an equivalent portable text block. It uses Sanity's _sanityAsset syntax
 * to create an image asset from the URL of the asset in Craft.
 * @param fields -- the fields for the image block
 * @returns the image block or undefined if the asset is not provided
 */
export const handleImageBlock = (fields: CraftImageBlockFields) => {
  const { asset, image, caption } = fields

  // If there's no asset or asset URL, return undefined
  if (!asset && !image) return

  // Sometimes the asset is stored in the asset field, sometimes in the image field
  const assetRef = asset ? asset[0] : image ? image[0] : undefined

  if (!assetRef) return

  const { url: assetUrl, altText: altText } = getCraftAssetInfo(assetRef) || {
    url: '',
    altText: '',
  }

  if (!assetUrl) return

  // Set up the image block
  const imageBlock = {
    _type: 'richImage',
    // This is a special syntax that tells Sanity to create an image asset from the URL
    // and then reference that asset in this block. Very handy!
    // See: https://www.sanity.io/docs/importing-data
    _sanityAsset: `image@${assetUrl}`,
    caption: caption,
    alt: caption || altText,
  }

  // Return the image block in an array, so it can be concatenated with other blocks
  return [imageBlock]
}
