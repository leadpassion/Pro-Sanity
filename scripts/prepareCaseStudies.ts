import enCaseStudies from '@/scripts/data/craftExports/craftCaseStudies.json'
import koCaseStudies from '@/scripts/data/craftExports/localization/craftCaseStudiesKR.json'
import jaCaseStudies from '@/scripts/data/craftExports/localization/craftCaseStudiesJP.json'
import livePartnerIds from '@/scripts/data/misc/partnerIdsWithLang.json'
import { CraftCaseStudy, ExportHandlers } from './craftTypes'
import {
  ExportCaseStudies,
  ExportTestimonials,
  ExportVideos,
  convertContentMatrixToPortableText,
  craftIdToSanityId,
  generateCategoryReferences,
  getCraftAssetInfo,
  handleCaseStudyThreeColumn,
  getBrandId,
  getSeoMetadata,
} from './helpers'
import { handleCaseStudyMetrics } from './helpers/handleCaseStudyMetrics'
import { htmlToText } from 'html-to-text'
import { LANG_CODE_FIELD_NAME } from '@/lib/localization.config'

const exportHandlers: Partial<ExportHandlers> = {
  exportCaseStudies: new ExportCaseStudies(
    'scripts/data/sanityImports/caseStudies.ndjson',
  ),
  testimonialsExport: new ExportTestimonials(
    'scripts/data/sanityImports/testimonials.ndjson',
  ),
  videosExport: new ExportVideos('scripts/data/sanityImports/videos.ndjson'),
}

const buildImportFile = async () => {
  await processPages(enCaseStudies as unknown as CraftCaseStudy[], 'en-us')
  // TODO JP AND KR SITES IMPORT
  // await processPages(koCaseStudies as unknown as CraftCaseStudy[], 'ko')
  // await processPages(jaCaseStudies as unknown as CraftCaseStudy[], 'ja')

  for (const handler in exportHandlers) {
    if (exportHandlers.hasOwnProperty(handler)) {
      exportHandlers[handler as keyof ExportHandlers]!.writeTranslations()
      exportHandlers[handler as keyof ExportHandlers]!.save()
    }
  }
}

async function processPages(caseStudies: CraftCaseStudy[], langCode: string) {
  for (const [index, page] of caseStudies.entries()) {
    console.log(
      `Processing page(${index + 1}/${caseStudies.length}): "${page.title}"`,
      langCode,
    )

    // note: translation not needed
    const problemStrategyResults = handleCaseStudyThreeColumn(page)

    // note: KO translation not needed - KR site only uses "Use Case" top-level category
    const categories = generateCategoryReferences([
      page.relatedCategories || [],
      page.partners || [],
      page.relatedProducts || [],
    ])

    const metrics = handleCaseStudyMetrics(page)

    // featured image
    const { url: featuredImageUrl, altText: featuredAltText } =
      getCraftAssetInfo(page.heroImage[0]) || { url: '', altText: '' }
    const featuredImage = featuredImageUrl
      ? {
        _type: 'richImage',
        _sanityAsset: `image@${featuredImageUrl}`,
        alt: featuredAltText,
        caption: featuredAltText,
      }
      : undefined
    if (!featuredImage && page.heroImage[0]) {
      // log as warning
      console.log('\x1b[43m%s\x1b[0m', `\t!!! No featured image found: id ${page.heroImage[0]}`)
    }

    // note: translation handled separately - see preparePartners
    const partners =
      page.partners?.reduce((pArr, partnerId) => {
        if (livePartnerIds[partnerId]) {
          const partnerLangCode = livePartnerIds[partnerId].find(lang => lang === langCode) ?
            langCode : livePartnerIds[partnerId][0]

          pArr.push({
            _type: 'reference',
            _ref: craftIdToSanityId(partnerId, '', partnerLangCode),
          })
        } else {
          console.log('\x1b[33m%s\x1b[0m', `\t!!!!! missing Partner (likely not live) with id ${partnerId}`)
        }
        return pArr
      }, []) || []

    // note: not translated - handled in prepareBrands
    const brand = page.brand[0]
      ? {
        _type: 'reference',
        _ref: getBrandId(page.brand[0]),
        _weak: false,
      }
      : undefined

    const publicationDates = {
      publishedAt: page.dateCreated,
      updatedAt: page.dateUpdated,
    }

    const simpleBody = page.contentMatrixSimple
      ? await convertContentMatrixToPortableText(
        page.contentMatrixSimple,
        'caseStudy',
        'body',
        String(page.canonicalId),
        exportHandlers,
        { langCode },
      )
      : []

    const complexBody = page.contentMatrix
      ? await convertContentMatrixToPortableText(
        page.contentMatrix,
        'caseStudy',
        'body',
        page.canonicalId.toString(),
        exportHandlers,
        { langCode },
      )
      : []

    const body = [...simpleBody, ...complexBody]

    const excerpt = page.intro
      ? htmlToText(page.intro).replaceAll('\n', ' ')
      : undefined

    const seo = getSeoMetadata(page)

    const sanityCaseStudy = {
      _type: 'caseStudy',
      _id: craftIdToSanityId(page.canonicalId, '', langCode),
      title: page.title,
      [LANG_CODE_FIELD_NAME]: langCode,
      excerpt,
      featuredImage,
      company: brand,
      partners,
      ...problemStrategyResults,
      publicationDates,
      metrics,
      categories,
      body,
      seo,
    }

    exportHandlers.exportCaseStudies!.write(sanityCaseStudy)
    exportHandlers.exportCaseStudies!.addTranslationMetadataDoc(
      page.canonicalId,
      sanityCaseStudy,
      // Use slugs to match up case study pages for translation metadata
      seo.slug.current,
    )
  }
}

buildImportFile()
