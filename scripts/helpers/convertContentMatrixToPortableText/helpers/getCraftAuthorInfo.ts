import enAuthors from '@/scripts/data/craftExports/craftAuthors.json'
import jpAuthors from '@/scripts/data/craftExports/localization/craftAuthorsJP.json'
import { JSDOM } from 'jsdom'
import { htmlToBlocks } from '@sanity/block-tools'
import { getCraftAssetInfo } from './getCraftAssetInfo'
import { getBlockContentType } from './getBlockContentType'
import { CraftAuthor, CraftAuthorInfo } from '@/scripts/craftTypes'
import { craftIdToSanityId } from '@/scripts/helpers/craftIdToSanityId'

import { TypedObject } from 'sanity'

const craftAuthors = [...enAuthors, ...jpAuthors] as CraftAuthor[]
// export const authorOverrideMap = {
// Sunny Manivannan
// 'imported-craft-author-158685': 'imported-craft-author-5031',
// // Mary Kearl
// 'imported-craft-author-158720': 'imported-craft-author-5375',
// // Team Braze
// 'imported-craft-author-149871': 'imported-craft-author-5326',
// 'af8d090c-47dd-436b-9091-15d4b3315919': 'imported-craft-author-5326',
// // Erin Bankaitis
// 'imported-craft-author-1022': 'imported-craft-author-5069',
// // Gurbir Singh
// 'imported-craft-author-121624': 'imported-craft-author-5191',
// // Magith Noohukhan
// 'imported-craft-author-243004': 'imported-craft-author-5203',
// // Nazgul Kemelbek
// 'imported-craft-author-238149': 'imported-craft-author-5209',
// }

/**
 * This function takes a craft author id for an author and returns author information
 * @param craftAuthorId -- the unique id of author in craft, invariant based on the environment or draft status
 * @returns the author info or undefined if the author is not found
 */
export const getCraftAuthorInfo = (
  craftAuthorId: number,
  langCode: string
): CraftAuthorInfo | undefined => {
  // get the author from Craft export
  const siteId = langCode === 'en-us' ? 1 : 2
  const matchingAuthors = craftAuthors.filter((author) => author.id === craftAuthorId)
  // get the author specific to the current site first, or fallback to first match (ie uses author from other site)
  const author = matchingAuthors.find(author => author.siteId === siteId)?.[0] || matchingAuthors[0]

  if (!author) return undefined

  const {
    id: authorId,
    title,
    authorBio,
    authorJobTitle,
    linkedinUrl,
    twitterUrl,
    facebookUrl,
  } = author

  // _id
  const _id = craftIdToSanityId(authorId, 'author', langCode)

  // title -> first and last name
  const [firstName, lastName] = authorTitleToName(title)

  // headshot
  const { url: profilePhotoUrl } = getCraftAssetInfo(
    author?.authorProfilePhoto[0],
  ) || { url: null }
  const headshot = profilePhotoUrl
    ? {
      _type: 'image',
      _sanityAsset: `image@${profilePhotoUrl}`,
    }
    : undefined

  // bio
  const bio = authorBio
    ? htmlToBlocks(authorBio, getBlockContentType('person', 'bio'), {
      parseHtml: (html) => new JSDOM(html).window.document,
      rules: [],
    })
    : undefined

  return {
    _id,
    _type: 'person',
    firstName,
    lastName,
    headshot,
    bio,
    role: authorJobTitle,
    linkedinUrl,
    xUrl: twitterUrl,
    facebookUrl,
    language: langCode,
  }
}

function authorTitleToName(title: string | null | undefined): string[] {
  if (!title) return ['', '']

  const fullName = title.includes('・') ? title.split('・') : title.split(' ')
  return [fullName.slice(0, -1).join(' '), fullName.slice(-1).join(' ')]
}
