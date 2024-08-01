import { nanoid } from 'nanoid'

export type CraftAnchorLinkBlockFields = {
  anchorId: string
}

/**
 * This function takes the fields for a Craft anchor link block and returns
 * an equivalent portable text block
 * @param fields -- the fields for the anchor link block
 * @returns the anchor link block or undefined if the anchorId is not provided
 */
export const handleAnchorLinkBlock = (fields: CraftAnchorLinkBlockFields) => {
  const { anchorId } = fields

  if (!anchorId) return

  // Set up the anchor link block
  const anchorLinkBlock = {
    _key: nanoid(),
    _type: 'anchor',
    anchorId: anchorId,
  }

  // Return the anchor link block in an array, so it can be concatenated with other blocks
  return [anchorLinkBlock]
}
