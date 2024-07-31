import { nanoid } from 'nanoid'
import { getCraftAssetInfo } from '../helpers'

export type CraftPdfBlockFields = {
  contentWidth: 'full' | 'medium'
  pdfLink: string // json object containing a url
}

export const handlePdfBlock = (fields: CraftPdfBlockFields) => {
  const { pdfLink: pdfLinkField } = fields

  if (!pdfLinkField) return undefined

  // Parse the linkField to get the linkedUrl
  // Example of the field in Craft: "{\"linkedUrl\":\"https://marketing-assets.braze.com/production/legacy/documents/Braze_Code_of_Conduct_2022-1-1.pdf?v=1649178834\",\"linkedId\":null,\"linkedSiteId\":null,\"linkedTitle\":null,\"payload\":\"[]\",\"type\":\"url\"}"
  const parsedLinkField = JSON.parse(pdfLinkField)

  // Some PDFs are stored as a url directly to the pdf in the linkedUrl field
  // Others are Craft asset references stored in linkedId

  let pdfUrl: string | null = null

  if (parsedLinkField.linkedUrl) {
    pdfUrl = parsedLinkField.linkedUrl
  }

  if (parsedLinkField.linkedId) {
    // Get the Craft asset info
    const { url } = getCraftAssetInfo(parsedLinkField.linkedId) || {
      url: '',
    }

    pdfUrl = url
  }

  if (!pdfUrl) return

  const newSanityBlock = {
    _key: nanoid(),
    _type: 'pdf',
    _sanityAsset: `file@${pdfUrl}`,
  }

  return [newSanityBlock]
}
