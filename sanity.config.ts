import { SanityFormConfig, defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from './schemas'
import { projectId, datasetDev, datasetProd, studioApiVersion } from './lib/api'
import { media, mediaAssetSource } from 'sanity-plugin-media'
import { assist } from '@sanity/assist'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
import { iconPicker } from 'sanity-plugin-icon-picker'
import { structure } from './lib/structure'
import { embeddingsIndexDashboard } from '@sanity/embeddings-index-ui'
import { defineDocuments, presentationTool } from '@sanity/presentation'
import {
  documentInternationalizationPluginWithConfig,
  internationalizeArrayPluginWithConfig,
  supportedLanguageCodes,
} from './lib/localization.config'

import './static/studioStyles.css'
import { locationResolver } from './lib/locationResolver'
import { resolveDocForRoute } from './lib/resolveRouteForDoc'

// SHARED CONFIG ELEMENTS

const plugins = [
  structureTool({
    structure,
  }),
  presentationTool({
    previewUrl: {
      origin: process.env.SANITY_STUDIO_PREVIEW_URL_ORIGIN,
      previewMode: {
        enable: '/api/draft',
      },
    },
    resolve: {
      mainDocuments: defineDocuments([
        // One-off pages
        // {
        //   route: '/',
        //   filter: '_type == "page" && seo.slug.current == "/"',
        // },
        // {
        //   route: '/resources/benchmarks',
        //   filter:
        //     '_type == "page" && seo.slug.current == "resources/benchmarks"',
        // },
        // {
        //   route: '/api',
        //   filter: '_type == "page" && seo.slug.current == "/"',
        // },
        // // Resources
        // {
        //   route: '/customers/:slug',
        //   filter: '_type == "caseStudy" && seo.slug.current == $slug',
        // },
        // {
        //   route: '/resources/articles/:slug',
        //   filter: '_type == "blogPost" && seo.slug.current == $slug',
        // },
        // {
        //   route: '/resources/videos/:slug',
        //   filter: '_type == "videoPage" && seo.slug.current == $slug',
        // },
        // {
        //   route: '/resources/webinars-and-events/:slug',
        //   filter: '_type in ["webinar", "event"] && seo.slug.current == $slug',
        // },
        // {
        //   route: '/resources/reports-and-guides/:slug',
        //   filter: '_type in ["report", "guide"] && seo.slug.current == $slug',
        // },
        // {
        //   route: '/product/:slug',
        //   filter:
        //     '_type == "productPage" && seo.slug.current == "product/" + $slug',
        // },
        // {
        //   route: '/solutions/:slug',
        //   filter:
        //     '_type in ["useCasePage", "industryPage"] && seo.slug.current == "solutions/" + $slug',
        // },
        // {
        //   route: '/partners/technology-partners/:slug',
        //   filter: '_type == "technologyPartner" && seo.slug.current == $slug',
        // },
        // {
        //   route: '/partners/solutions-partners/:slug',
        //   filter: '_type == "solutionsPartner" && seo.slug.current == $slug',
        // },
        // {
        //   route: '/press-releases/:slug',
        //   filter: '_type == "pressRelease" && seo.slug.current == $slug',
        // },
        // All other pages
        // {
        //   route: '/(.*)',
        //   filter:
        //     '_type in ["page", "productPage", "personaPage", "industryPage", "useCasePage", "paidLandingPage"] && seo.slug.current == $0',
        // },
        {
          route: '/(.*)',
          // @ts-expect-error - valid filter params can include records with a string array value
          resolve: resolveDocForRoute,
        },
      ]),
      locations: locationResolver,
    },
  }),
  media(),
  visionTool({ defaultApiVersion: studioApiVersion }),
  assist(),
  simplerColorInput(),
  iconPicker(),
  embeddingsIndexDashboard(),
  documentInternationalizationPluginWithConfig,
  internationalizeArrayPluginWithConfig,
]

const schema = { types: schemas }

const form: SanityFormConfig = {
  file: {
    assetSources: (previousAssetSources) => {
      return previousAssetSources.filter(
        (assetSource) => assetSource !== mediaAssetSource,
      )
    },
  },
  image: {
    assetSources: [mediaAssetSource],
  },
}

const beta = {
  // treeArrayEditing: {
  //   enabled: true,
  // },
}

// ENVIRONMENT-SPECIFIC CONFIGS

const prodConfig = defineConfig({
  title: 'Braze',
  name: 'production',
  dataset: datasetProd,
  basePath: '/production',

  beta,
  projectId,
  plugins,
  schema,
  form,
})

const devConfig = defineConfig({
  title: 'Braze (Dev)',
  name: 'development',
  dataset: datasetDev,
  basePath: '/development',

  beta,
  projectId,
  plugins,
  schema,
  form,
})

// Create an array of configs
const configs = [prodConfig]

// Prepend the dev config if not in production
// if (
//   process.env.NODE_ENV !== 'production' ||
//   ['preview', 'development'].includes(process.env.SANITY_STUDIO_VERCEL_ENV!)
// )

configs.unshift(devConfig)

export default configs
