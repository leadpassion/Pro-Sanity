import fs from 'fs'
import path from 'path'

import craftArticlesEn from 'scripts/data/craftExports/craftArticles.json'
import craftArticlesJp from 'scripts/data/craftExports/localization/craftArticlesJP.json'
// N/A import craftArticlesKr from 'scripts/data/craftExports/localization/craftArticlesKR.json'

import craftCaseStudiesEn from 'scripts/data/craftExports/craftCaseStudies.json'
import craftCaseStudiesJp from 'scripts/data/craftExports/localization/craftCaseStudiesJP.json'
import craftCaseStudiesKr from 'scripts/data/craftExports/localization/craftCaseStudiesKR.json'

import craftLegalPagesEn from 'scripts/data/craftExports/craftLegalPages.json'
import craftLegalPagesJp from 'scripts/data/craftExports/localization/craftLegalPagesJP.json'
// N/A import craftLegalPagesKr from 'scripts/data/craftExports/localization/craftLegalPagesKR.json'

import craftMiscPagesEn from 'scripts/data/craftExports/craftMiscPages.json'
import craftMiscPagesJp from 'scripts/data/craftExports/localization/craftMiscPagesJP.json'
// N/A import craftMiscPagesKr from 'scripts/data/craftExports/localization/craftMiscPagesKR.json'

import craftPartnersEn from 'scripts/data/craftExports/craftPartners.json'
import craftPartnersJp from 'scripts/data/craftExports/localization/craftPartnersJP.json'
// N/A import craftPartnersKr from 'scripts/data/craftExports/localization/craftPartnersKR.json'

import craftProductEn from 'scripts/data/craftExports/craftProduct.json'
import craftProductJp from 'scripts/data/craftExports/localization/craftProductJP.json'
import craftProductKr from 'scripts/data/craftExports/localization/craftProductKR.json'

import craftReportsAndGuidesEn from 'scripts/data/craftExports/craftReportsAndGuides.json'
import craftReportsAndGuidesJp from 'scripts/data/craftExports/localization/craftReportsAndGuidesJP.json'
import craftReportsAndGuidesKr from 'scripts/data/craftExports/localization/craftReportsAndGuidesKR.json'

import craftSolutionsEn from 'scripts/data/craftExports/craftSolutions.json'
import craftSolutionsJp from 'scripts/data/craftExports/localization/craftSolutionsJP.json'
// N/A import craftSolutionsKr from 'scripts/data/craftExports/localization/craftSolutionsKR.json'

import craftVideoPagesEn from 'scripts/data/craftExports/craftVideoPages.json'
import craftVideoPagesJp from 'scripts/data/craftExports/localization/craftVideoPagesJP.json'
// N/A import craftVideoPagesKr from 'scripts/data/craftExports/localization/craftVideoPagesKR.json'

import craftWebinarsAndEventsEn from 'scripts/data/craftExports/craftWebinarsAndEvents.json'
import craftWebinarsAndEventsJp from 'scripts/data/craftExports/localization/craftWebinarsAndEventsJP.json'
// N/A import craftWebinarsAndEventsKr from 'scripts/data/craftExports/localization/craftWebinarsAndEventsKR.json'

import craftSinglesEn from 'scripts/data/craftExports/singles'
import craftSinglesJpKr from 'scripts/data/craftExports/localization/singles'

export function compileCraftEntriesWithProps(propsToInclude: string[]) {
  // log in blue for visibility
  console.log(
    '\x1b[34m%s\x1b[0m',
    `Creating list of entries with these properties included: canonicalId, ${propsToInclude.join(', ')}`,
  )

  const allEntries = []

  // articles
  const articles = [...craftArticlesEn, ...craftArticlesJp]
  allEntries.push(...articles.map(includePropsMapFunc))

  // case studies
  const caseStudies = [
    ...craftCaseStudiesEn,
    ...craftCaseStudiesJp,
    ...craftCaseStudiesKr,
  ]
  allEntries.push(...caseStudies.map(includePropsMapFunc))

  // legal pages
  const legalPages = [...craftLegalPagesEn, ...craftLegalPagesJp]
  allEntries.push(...legalPages.map(includePropsMapFunc))

  // misc pages
  const miscPages = [...craftMiscPagesEn, ...craftMiscPagesJp]
  allEntries.push(...miscPages.map(includePropsMapFunc))

  // partners
  const partners = [...craftPartnersEn, ...craftPartnersJp]
  allEntries.push(...partners.map(includePropsMapFunc))

  // product
  const product = [...craftProductEn, ...craftProductJp, ...craftProductKr]
  allEntries.push(...product.map(includePropsMapFunc))

  // reports and guides
  const reportsAndGuides = [
    ...craftReportsAndGuidesEn,
    ...craftReportsAndGuidesJp,
    ...craftReportsAndGuidesKr,
  ]
  allEntries.push(...reportsAndGuides.map(includePropsMapFunc))

  // solutions
  const solutions = [...craftSolutionsEn, ...craftSolutionsJp]
  allEntries.push(...solutions.map(includePropsMapFunc))

  // videoPages
  const videoPages = [...craftVideoPagesEn, ...craftVideoPagesJp]
  allEntries.push(...videoPages.map(includePropsMapFunc))

  // webinars and events
  const webinarsAndEvents = [
    ...craftWebinarsAndEventsEn,
    ...craftWebinarsAndEventsJp,
  ]
  allEntries.push(...webinarsAndEvents.map(includePropsMapFunc))

  // singles
  const singlesPages = [...craftSinglesEn, ...craftSinglesJpKr]
  allEntries.push(...singlesPages.map(includePropsMapFunc))

  function includePropsMapFunc(entry: Record<string, any>) {
    const cleanedEntry: Record<string, any> = {
      // always include canonicalId
      canonicalId: entry.canonicalId,
    }
    for (const propName of propsToInclude) {
      cleanedEntry[propName] = entry[propName] || undefined
    }
    return cleanedEntry
  }

  fs.writeFileSync(
    'scripts/data/misc/craftEntriesPropMap.json',
    JSON.stringify(allEntries),
    { encoding: 'utf8' },
  )
  // log in blue for visibility
  console.log(
    '\x1b[34m%s\x1b[0m',
    `Saved list of entries properties to scripts/data/misc/craftEntriesPropMap.json`,
  )
}
