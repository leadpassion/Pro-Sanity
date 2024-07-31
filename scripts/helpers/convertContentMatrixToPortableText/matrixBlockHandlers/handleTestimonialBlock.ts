import { nanoid } from 'nanoid'
import { newSanityDocumentId } from '../../newSanityDocumentId'

export type TestimonialBlock = {
  _key: string
  _type: string
  _ref: string
}

export type CraftTestimonialFields = {
  attributionName: string | undefined
  attributionTitle: string | undefined
  quotation?: string
  quote?: string
}

export type TestimonialBlocks = {
  testimonialBlockId: string
  testimonialBlocks: TestimonialBlock[]
}

/**
 * This function takes the fields for a Craft testimonial block and returns
 * an object containing the ID of a new testimonial document and a Portable
 * text block that references that testimonial.
 * @param parentDocumentCraftId the ID of the parent Craft CMS document
 * @param contentMatrixBlockId the ID of the content matrix block
 * @returns an object containing the ID of a new testimonial document and a Portable text block that references that testimonial
 */
export const handleTestimonialBlock = (
  parentDocumentCraftId: string,
  contentMatrixBlockId: string,
  langCode: string = '',
): TestimonialBlocks => {
  // Generate the ID for the new testimonial document
  const testimonialBlockId = newSanityDocumentId(
    parentDocumentCraftId,
    contentMatrixBlockId,
    'testimonial',
    langCode,
  )

  // Set up the testimonial block
  const testimonialBlock = {
    _key: nanoid(),
    _type: 'testimonialReference',
    _ref: testimonialBlockId,
  }

  return {
    testimonialBlockId,
    testimonialBlocks: [testimonialBlock],
  }
}
