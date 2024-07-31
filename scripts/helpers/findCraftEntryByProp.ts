import fs from 'fs'
import path from 'path'
import { compileCraftEntriesWithProps, craftIdToSanityId } from '@/scripts/helpers'

let allCraftEntries: Record<string, any>[] = []

/**
 * Finds a craft entry by property using file created by compileCraftEntriesWithProps.
 *
 * @param      {string}           propName           The property name
 * @param      {string}           propVal            The property value
 * @param      {number}           siteId             The Craft site id
 * @return     {Record<string, any> | undefined}     The entry props or undefined
 */
export function findCraftEntryByProp(propName: string, propVal: string, siteId: string) {
  // log in blue for visibility
  console.log('\x1b[34m%s\x1b[0m', `\tFinding entry on site id ${siteId} by ${propName}: ${propVal}`)

  // load file with this info if we haven't (used in loops)
  if (!allCraftEntries.length) {
    // prepare the file to use to get the correct reference for internal links
    compileCraftEntriesWithProps(['uri', 'siteId'])
    allCraftEntries = JSON.parse(fs.readFileSync('scripts/data/misc/craftEntriesPropMap.json', 'utf8'))
    if (!allCraftEntries.length) { throw Error('\t!!!!! No Craft entries found! File was empty!') }
  }

  const entriesToSearch = allCraftEntries.filter(
    (entryObj: Record<string, any>) => entryObj.siteId.toString() === siteId
  )

  return entriesToSearch.find((entryObj: Record<string, any>) => entryObj[propName].toString() === propVal)
}

// Helpers
// including here for convenience; this code doesn't have to be that maintainable...

// quick helper for this code block to resolve tech debt links
export function cleanUri(uncleanedUri: string) {
  const techDebtUriPaths: Record<string, string> = {
    'perspectives/article/': 'resources/articles/',
    'blog/': 'resources/articles/',
    'perspectives/video/': 'resources/videos/',
    'resources/library/report/': 'resources/reports-and-guides/',
    'resources/library/guide/': 'resources/reports-and-guides/',
    'resources/library/webinar/': 'resources/webinars-and-events/',
    'product/alloys/solutions/': 'product/partners/solutions/',
  }

  // handle special case for multiple /perspectives/article/XXXX-case-study to /customers/XXXX-case-study
  // note doesn't fix other articles that are now case studies
  const matchArticleIsCaseStudy = uncleanedUri.match(/^perspectives[/]article[/](.+case-study)$/)
  if (matchArticleIsCaseStudy) {
    return 'customers/' + matchArticleIsCaseStudy[1]
  }

  // remove trailing slash, "confirmation page" /thanks /confirmation, and slug
  const uriPath = uncleanedUri.replace(/([/]thanks|[/]confirmation)?[/]?$/, '').replace(/[/][^/]+$/, '/')

  return techDebtUriPaths[uriPath] ? uncleanedUri.replace(uriPath, techDebtUriPaths[uriPath]) : uncleanedUri
}

// quick helper for this code block to resolve manually created pages that don't use imported-craft- prefix
export function resolveCraftIdToSanityId(entryId: number, siteId: number): string {
  const manualPagesIds: Record<number, string> = {
    // homepage
    13: '450399dd-26cd-4b95-a0f9-1574a1d3a638',
    // technology partner contact
    27670: '64239c50-9c18-4d66-9e5b-92b38f49bf43',
    // solutions partner contact
    1052: '65d6984f-c83c-4228-8ff7-dbe0f043e62b',
    // tech for equitable future
    224076: '933f6905-0b9b-43bf-811f-72b760421a29',
  }

  // TODO: jp site
  if (Number(siteId) === 1 && manualPagesIds[entryId]) {
    return manualPagesIds[entryId]
  }

  const langCodeOfRef = siteId === 2 ? 'ja' : siteId === 6 ? 'ko' : ''
  return craftIdToSanityId(entryId, '', langCodeOfRef)

}