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
} from './lib/localization.config'
import { WebstacksLogo } from './lib/WebstackLogo'

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
  title: 'Webstacks',
  name: 'production',
  dataset: datasetProd,
  basePath: '/production',
  icon: WebstacksLogo,

  beta,
  projectId,
  plugins,
  schema,
  form,
})

const devConfig = defineConfig({
  title: 'Webstacks (Dev)',
  name: 'development',
  dataset: datasetDev,
  basePath: '/development',
  icon: WebstacksLogo,

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
