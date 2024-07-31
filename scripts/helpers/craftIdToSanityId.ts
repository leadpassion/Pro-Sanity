/**
 * Converts a Craft CMS entry ID to a Sanity.io document ID
 * @param craftId -- the Craft CMS entry ID
 * @param postfix -- 
 * @param langCode -- language code, "en" is ignored
 * @returns the Sanity.io document ID
 * @example
 * craftIdToSanityId(123) // 'imported-craft-123'
 */
export const craftIdToSanityId = (craftId: string | number, postfix: string  = '', langCode: string  = '') => {
  return `imported-craft-${postfix ? postfix + '-' : ''}${craftId}${langCode && langCode !== 'en-us' ? '-' + langCode : ''}`
}
