// --------------------------------------------------------------------------------------------
//
// convertContentMatrixToPortableText()
//
// This script converts a content matrix from Craft CMS to a portable text array.
// The portable text array can then be used to populate a portable text field in Sanity.
// The portable text array is an array of objects, each object representing a block of content.
// Each block can be a paragraph, heading, image, or any other custom block type.
// The blocks are then rendered in the Sanity editor.
//
// The script uses Sanity's block tools to convert html strings stored in blocks with type === 'text'
// to portable text blocks. Other block types are handled handled with custom functions, found
// in the matrixBlockHandlers folder.
//
//
// --------------------------------------------------------------------------------------------

import { TypedObject } from 'sanity'

import { getBlockContentType, processCraftHrefMarks } from './helpers'

import {
  CraftAnchorLinkBlockFields,
  CraftImageBlockFields,
  CraftTestimonialFields,
  CraftTextBlockFields,
  handleAnchorLinkBlock,
  handleImageBlock,
  handleTextBlock,
  handleTestimonialBlock,
  handleDownloadCtaBlock,
  CraftDownloadCtaBlockFields,
} from './matrixBlockHandlers'

import { ExportHandlers } from '@/scripts/craftTypes'
import {
  CraftVideoBlockFields,
  handleVideoBlock,
} from './matrixBlockHandlers/handleVideoBlock'
import {
  CraftPdfBlockFields,
  handlePdfBlock,
} from './matrixBlockHandlers/handlePdfBlock'
import {
  CraftMarketoFormBlockFields,
  handleFormBlock,
} from './matrixBlockHandlers/handleMarketoFormBlock'
import {
  CraftFaqBlockFields,
  handleFaqBlock,
} from './matrixBlockHandlers/handleFaqBlock'

export type CraftContentMatrix = {
  key: string
  type: string
  enabled: boolean
  collapsed: boolean
  fields:
    | CraftTextBlockFields
    | CraftImageBlockFields
    | CraftAnchorLinkBlockFields
    | CraftDownloadCtaBlockFields
    | CraftTestimonialFields
    | CraftVideoBlockFields
    | CraftPdfBlockFields
    | CraftMarketoFormBlockFields
    | CraftFaqBlockFields
}[]

type ConentMatrixConverterOptions = {
  allowImages?: boolean
  allowTestimonials?: boolean
  allowVideos?: boolean
  langCode?: string
}

/**
 * This function converts a content matrix from Craft CMS to a portable text array.
 *
 * @param {CraftContentMatrix} contentMatrix The content matrix from Craft CMS
 * @param {string} schemaName The name of the schema in Sanity
 * @param {string} blockContentFieldName The name of the field in the schema that holds the portable text blocks
 * @param {string} parentDocumentCraftId The ID of the parent Craft CMS document
 * @returns {(TypedObject[] | undefined)}
 */
export const convertContentMatrixToPortableText = async (
  contentMatrix: CraftContentMatrix,
  schemaName: string,
  blockContentFieldName: string,
  parentDocumentCraftId: string,
  exportHandlers: Partial<ExportHandlers>,
  options?: ConentMatrixConverterOptions,
): Promise<TypedObject[]> => {
  const blockContentType = getBlockContentType(
    schemaName,
    blockContentFieldName,
  )

  // Create an empty array to hold the blocks
  let portableTextBlocks: any[] = []

  // Loop through the Craft content matrix
  for (const blockId in contentMatrix) {
    const block = contentMatrix[blockId]

    // Skip the block if it's not enabled
    if (!block.enabled) return []

    // Process the block based on its type
    switch (block.type) {
      // Handle text blocks
      case 'text': {
        const fields = block.fields as CraftTextBlockFields

        const newPortableTextBlocks = handleTextBlock(fields, blockContentType)

        if (newPortableTextBlocks) {
          portableTextBlocks.push(...newPortableTextBlocks)
        }

        break
      }

      // Handle fullWidth blocks
      // We'll treat these as text blocks, ignoring the contentWidth field right now
      case 'fullWidth': {
        const fields = block.fields as CraftTextBlockFields

        const newPortableTextBlocks = handleTextBlock(fields, blockContentType)

        if (newPortableTextBlocks) {
          portableTextBlocks.push(...newPortableTextBlocks)
        }

        break
      }

      // Handle testimonial blocks
      case 'testimonial': {
        if (options?.allowTestimonials === false) {
          break
        }

        const fields = block.fields as CraftTestimonialFields

        // Create a new testimonial block entry
        const { testimonialBlockId, testimonialBlocks } =
          handleTestimonialBlock(
            parentDocumentCraftId,
            blockId,
            options?.langCode,
          )

        if (testimonialBlocks) {
          portableTextBlocks.push(...testimonialBlocks)

          // Export the testimonial block to a new file
          exportHandlers.testimonialsExport?.write(
            testimonialBlockId,
            fields,
            options?.langCode,
          )
        }

        break
      }

      // Handle video blocks
      case 'video': {
        if (options?.allowVideos === false) {
          break
        }

        const fields = block.fields as CraftVideoBlockFields

        const { videoBlockId, videoBlocks } = await handleVideoBlock(fields)

        if (videoBlocks) {
          portableTextBlocks.push(...videoBlocks)

          // Export the video block to a new file
          await exportHandlers.videosExport?.writeDoc(videoBlockId, fields)
        }

        break
      }

      // Handle image blocks
      case 'image': {
        if (options?.allowImages === false) {
          break
        }

        const fields = block.fields as CraftImageBlockFields

        const newPortableTextBlocks = handleImageBlock(fields)

        if (newPortableTextBlocks) {
          portableTextBlocks.push(...newPortableTextBlocks)
        }

        break
      }

      // Anchor link blocks insert an empty div with the given id
      // These need to be handled as a custom block type in Sanity
      // so we can make them appear in an understandable way in the editor
      case 'anchorLink': {
        const fields = block.fields as CraftAnchorLinkBlockFields

        const newPortableTextBlocks = handleAnchorLinkBlock(fields)

        if (newPortableTextBlocks) {
          portableTextBlocks.push(...newPortableTextBlocks)
        }

        break
      }

      case 'downloadCta': {
        const fields = block.fields as CraftDownloadCtaBlockFields

        const newPortableTextBlocks = handleDownloadCtaBlock(fields)

        if (newPortableTextBlocks) {
          portableTextBlocks.push(...newPortableTextBlocks)
        }

        break
      }

      case 'pdf': {
        const fields = block.fields as CraftPdfBlockFields

        const newPortableTextBlocks = handlePdfBlock(fields)

        if (newPortableTextBlocks) {
          portableTextBlocks.push(...newPortableTextBlocks)
        }

        break
      }

      case 'form': {
        const fields = block.fields as CraftMarketoFormBlockFields

        const newPortableTextBlocks = handleFormBlock(fields)

        if (newPortableTextBlocks) {
          portableTextBlocks.push(...newPortableTextBlocks)
        }

        break
      }

      case 'faqsAdvanced': {
        const fields = block.fields as CraftFaqBlockFields

        const newPortableTextBlocks = handleFaqBlock(fields, blockContentType)

        if (newPortableTextBlocks) {
          portableTextBlocks.push(...newPortableTextBlocks)
        }

        break
      }

      default:
        break
    }
  }

  // Process the href marks in the portable text blocks to get rid of the Craft CMS entry links
  portableTextBlocks = processCraftHrefMarks(portableTextBlocks)

  return portableTextBlocks
}
