import craftAssets from '@/scripts/data/craftExports/craftAssets.json'

type CraftAsset = {
  canonicalId: number
  url: string
  altText: string
}

/**
 * This function takes a craft canonical id for an assets and returns its info
 * @param craftCanonicalId -- the unique id of the asset in craft, invariant based on the environment or draft status
 * @returns the asset info or undefined if the asset is not found
 */
export const getCraftAssetInfo = (
  craftCanonicalId: number,
): CraftAsset | undefined => {
  const assets = craftAssets as CraftAsset[]

  const asset = assets.find((asset) => asset.canonicalId === craftCanonicalId)

  if (!asset) return undefined

  return {
    canonicalId: asset.canonicalId,
    url: asset.url,
    altText: asset.altText,
  }
}
