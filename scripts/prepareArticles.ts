// -------------------------------
// migrateBlogPosts() is a script that prepares Craft CMS blog posts
// for import into Sanity. It reads the Craft CMS blog posts from
// the articles.json file, transforms them into a format that can be
// imported into Sanity, and writes the transformed data to a new
// file called blogPosts.ndjson. The script uses the following helper
// functions:
// - craftIdToSanityId: Converts a Craft CMS entry ID to a Sanity document ID
// - htmlToText: Converts HTML content to plain text
// - convertContentMatrixToPortableText: Converts a Craft CMS content matrix
//   field to a Portable Text field
// - getCraftAssetUrl: Retrieves the URL of a Craft CMS asset by its canonical ID
// The script imports the blog posts from the articles.json file, processes
// each post, and writes the transformed data to the blogPosts.ndjson file.

import { htmlToText } from 'html-to-text'
import {
  craftIdToSanityId,
  ExportTestimonials,
  ExportArticles,
  getCraftAssetInfo,
  generateCategoryReferences,
  convertContentMatrixToPortableText,
  ExportVideos,
  getArticleIsPressRelease,
  getSeoMetadata,
  ExportPersons,
  getCraftAuthorInfo,
} from './helpers'
import { nanoid } from 'nanoid'
import { CraftPost, ExportHandlers } from './craftTypes'
import enPosts from './data/craftExports/craftArticles.json'
import jaPosts from './data/craftExports/localization/craftArticlesJP.json'
// N/A import koPosts from './data/craftExports/localization/craftArticlesKR.json'

// Create any export handlers
const exportHandlers: Partial<ExportHandlers> = {
  articlesExport: new ExportArticles(
    'scripts/data/sanityImports/articles.ndjson',
  ),
  testimonialsExport: new ExportTestimonials(
    'scripts/data/sanityImports/testimonials.ndjson',
  ),
  videosExport: new ExportVideos('scripts/data/sanityImports/videos.ndjson'),
  exportPersons: new ExportPersons(
    'scripts/data/sanityImports/authors.ndjson',
  )
}

const enCraftPosts = enPosts as unknown as CraftPost[]
const jaCraftPosts = jaPosts as unknown as CraftPost[]

const authorIdsForImport: Record<string, boolean> = {}

const buildImportFile = async () => {
  await processPages(enCraftPosts, 'en-us')
  // TODO JP AND KR SITES IMPORT
  // await processPages(jaCraftPosts, 'ja')

  // Save any export files we need to
  for (const handler in exportHandlers) {
    if (exportHandlers.hasOwnProperty(handler)) {
      exportHandlers[handler as keyof ExportHandlers]!.writeTranslations()
      exportHandlers[handler as keyof ExportHandlers]!.save()
    }
  }
}

const processPages = async (craftPosts: CraftPost[], langCode: string) => {
  for (const [index, post] of craftPosts.entries()) {
    // Get the page type from categories
    let _type = 'blogPost'
    if (
      getArticleIsPressRelease([
        post.primaryCategory || [],
        post.relatedCategories || [],
      ])
    ) {
      _type = 'pressRelease'
    }

    console.log(
      `Processing ${_type}(${index + 1}/${craftPosts.length}): ${post.title}`,
      langCode
    )

    // Transform the excerpt from HTML to plain text
    const excerpt = post.excerpt
      ? htmlToText(post.excerpt, { wordwrap: false })
      : undefined

    // Transform body from content matrix to portable text
    const body = post.contentMatrixSimple
      ? await convertContentMatrixToPortableText(
        post.contentMatrixSimple,
        'blogPost',
        'body',
        post.canonicalId.toString(),
        exportHandlers,
        { langCode },
      )
      : undefined

    // Handle author
    if (!post.authorEntry.length) {
        // log as error for visibility
        console.log('\x1b[41m%s\x1b[0m', `\t!!!!! Author is missing in Craft?`)
    }

    const authors = post.authorEntry.map((author: number) => {
      const authorInfo = getCraftAuthorInfo(author, langCode)
      // if author is found
      if (authorInfo) {
        // prevent importing duplicate authors
        if (!authorIdsForImport[authorInfo._id]) {
          exportHandlers.exportPersons!.write(authorInfo)
          exportHandlers.exportPersons!.addTranslationMetadataDoc(
            // get just the numerical id from Sanity id
            Number(authorInfo._id.replace(/[^1-9]/g, '')),
            authorInfo,
            // map translations based on author name instead of id
            `${authorInfo.firstName} ${authorInfo.lastName}`
          )

          // save for later
          authorIdsForImport[authorInfo._id] = true
        } else {
          // log warning
          console.log('\x1b[33m%s\x1b[0m', `\tSkipping import of duplicate author ${authorInfo.firstName} ${authorInfo.lastName} (${authorInfo._id})`)
        }

        return {
          _ref: authorInfo._id,
          _type: 'reference',
          _key: nanoid(),
        }
      } else {
        // log as error for visibility
        console.log('\x1b[41m%s\x1b[0m', `\t!!!!! Missing author with id ${author}`)
      }
    }).filter(a => Boolean(a))


    // Get the featured image URL
    const { url: featuredImageUrl, altText: featuredAltText } =
      getCraftAssetInfo(post.heroImage[0]) || { url: '', altText: '' }

    const featuredImage = featuredImageUrl
      ? {
        _type: 'richImage',
        _sanityAsset: `image@${featuredImageUrl}`,
        alt: featuredAltText,
        caption: featuredAltText,
      }
      : undefined
    if (!featuredImage && post.heroImage[0]) {
      // log as warning
      console.log('\x1b[43m%s\x1b[0m', `\t!!! No featured image found: id ${post.heroImage[0]}`)
    }

    const categories = generateCategoryReferences([
      post.primaryCategory || [],
      post.relatedCategories || [],
      post.productCategory || [],
    ])

    // Assemble the new document for Sanity
    const sanityPost = {
      _type,
      _id: craftIdToSanityId(post.canonicalId, '', langCode),
      language: langCode,
      title: post.title,
      excerpt,
      body,
      featuredImage,
      categories,
      publicationDates: {
        _type: 'publicationDates',
        publishedAt: post.postDate,
      },
      seo: getSeoMetadata(post), //, _type === 'pressRelease' ? 'company/news/' : 'resources/articles/'),
      author: authors,
    }

    exportHandlers.articlesExport?.write(sanityPost)
    exportHandlers.articlesExport?.addTranslationMetadataDoc(
      post.canonicalId,
      sanityPost,
    )
  }
}

buildImportFile()
