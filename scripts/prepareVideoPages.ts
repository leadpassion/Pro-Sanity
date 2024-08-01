import enVideoPages from '@/scripts/data/craftExports/craftVideoPages.json'
// import jpVideoPages from 'scripts/data/craftExports/localization/craftVideoPagesJP.json'
// no KR
import { CraftVideoPage, ExportHandlers } from './craftTypes'
import {
  ExportVideoPages,
  ExportVideosFromFields,
  craftIdToSanityId,
  generateCategoryReferences,
  getBlockContentType,
  getCraftAssetInfo,
  getSeoMetadata,
  processCraftHrefMarks,
} from './helpers'
import { htmlToText } from 'html-to-text'
import { handleVideoEmbedField } from './helpers/handleVideoEmbedField'
import { htmlToBlocks } from '@sanity/block-tools'
import { JSDOM } from 'jsdom'

const exportHandlers: Partial<ExportHandlers> = {
  videoPagesExport: new ExportVideoPages(
    'scripts/data/sanityImports/videoPages.ndjson',
  ),
  exportVideosFromFields: new ExportVideosFromFields(
    'scripts/data/sanityImports/videos.ndjson',
  ),
}

const buildImportFile = async () => {
  await processPages(enVideoPages as unknown as CraftVideoPage[], 'en-us')
  // TODO JP AND KR SITES IMPORT
  // await processPages(jpVideoPages as unknown as CraftVideoPage[], 'ja')

  for (const handler in exportHandlers) {
    if (exportHandlers.hasOwnProperty(handler)) {
      exportHandlers[handler as keyof ExportHandlers]!.writeTranslations()
      exportHandlers[handler as keyof ExportHandlers]!.save()
    }
  }
}

const processPages = async (videoPages: CraftVideoPage[], langCode: string) => {
  for (const [count, entry] of videoPages.entries()) {
    console.log(
      `Processing video page (${count+1}/${videoPages.length}): ${entry.title}`,
      langCode,
    )

    // Get the featured image URL
    const { url: featuredImageUrl, altText: featuredImageAlt } =
      getCraftAssetInfo(entry.heroImage[0]) || {
        url: '',
        altText: '',
      }

    const featuredImage = featuredImageUrl
      ? {
          _type: 'richImage',
          _sanityAsset: `image@${featuredImageUrl}`,
          alt: featuredImageAlt,
          caption: featuredImageAlt,
        }
      : undefined
    if (!featuredImage && entry.heroImage[0]) {
      // log as warning
      console.log('\x1b[43m%s\x1b[0m', `\t!!! No featured image found: id ${entry.heroImage[0]}`)
    }

    const videoReference = entry.videoEmbed
      ? await handleVideoEmbedField(
          entry.videoEmbed,
          exportHandlers.exportVideosFromFields!,
        )
      : undefined

    if (!videoReference) {
      // log as error for visibility
      console.log('\x1b[41m%s\x1b[0m', `\t!!!!! Skipping - reason: no video reference`, entry.videoEmbed)
      continue
    }

    const blockContentType = getBlockContentType('videoPage', 'description')

    const description = entry.excerpt
      ? processCraftHrefMarks(htmlToBlocks(entry.excerpt, blockContentType, {
                parseHtml: (html) => new JSDOM(html).window.document,
                rules: [],
              }))
      : undefined

    const categories = generateCategoryReferences([
      entry.primaryCategory || [],
      entry.relatedCategories || [],
      entry.productCategories || [],
    ])

    const seo = getSeoMetadata(entry)

    const sanityVideoPage = {
      _type: 'videoPage',
      _id: craftIdToSanityId(entry.canonicalId, '', langCode),
      title: entry.title,
      language: langCode,
      video: videoReference,
      description,
      featuredImage,
      date: entry.dateCreated,
      categories,
      hideFromListing: entry.hideFromListing || false,
      hideFromSearch: entry.hideFromSearch || false,
      seo,
    }

    exportHandlers.videoPagesExport!.write(sanityVideoPage)
    exportHandlers.videoPagesExport!.addTranslationMetadataDoc(
      entry.canonicalId,
      sanityVideoPage,
      // Use slugs to match up product pages for translation metadata
      seo.slug.current,
    )
  }
}

buildImportFile()
