/**
 * This function generates an id for a new Sanity document
 * created from a Craft CMS content matrix block. These
 * IDs need to be deterministic so that they can be referenced
 * in the Portable Text blocks that are created from the
 * content matrix blocks to reference the new Sanity documents.
 * To achieve this, we combine the parent document's Craft ID
 * and the content matrix block's ID.
 * @param parentDocumentCraftId the ID of the parent Craft CMS document
 * @param contentMatrixBlockId the ID of the content matrix block
 * @param documentType the type of document being created
 * @returns the ID of the new Sanity document
 */
export const newSanityDocumentId = (
  parentDocumentCraftId: string,
  contentMatrixBlockId: string,
  documentType: string,
  langCode: string,
): string => {
  return `imported-craft-${documentType}-from-doc-${parentDocumentCraftId}-block-${contentMatrixBlockId}${langCode && langCode !== 'en-us' ? '-' + langCode : ''}`
}
