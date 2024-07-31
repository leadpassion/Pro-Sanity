import { CraftFAQsAdvancedBlock } from '@/scripts/craftTypes'
import { htmlToBlocks } from '@sanity/block-tools'
import { ArraySchemaType } from 'sanity'
import { JSDOM } from 'jsdom'
import { nanoid } from 'nanoid'

export type CraftFaqBlockFields = Pick<
  CraftFAQsAdvancedBlock,
  'fields'
>['fields']

export const handleFaqBlock = (
  fields: CraftFaqBlockFields,
  blockContentType: ArraySchemaType<unknown>,
) => {
  const { headline: heading, faqs } = fields

  const questions = Object.values(faqs).map((faq) => ({
    _type: 'faq',
    _key: nanoid(),
    question: faq.fields.question,
    answer: htmlToBlocks(faq.fields.answer, blockContentType, {
      parseHtml: (html) => new JSDOM(html).window.document,
      rules: [],
    }),
  }))

  const newSanityBlock = {
    _key: nanoid(),
    _type: 'faqs',
    heading: heading || 'Frequently Asked Questions',
    questions,
  }

  return [newSanityBlock]
}
