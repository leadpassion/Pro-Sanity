import { documentInternationalization } from '@sanity/document-internationalization'
import { studioApiVersion } from './api'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'

export const LANG_CODE_FIELD_NAME = 'language'

export const supportedLanguages = [
  { id: 'en-us', title: 'English' },
  { id: 'ja', title: 'Japanese' },
  { id: 'ko', title: 'Korean' },
]

export const supportedLanguageCodes = supportedLanguages.map((lang) => lang.id)

export const internationalizeArrayPluginWithConfig = internationalizedArray({
  languages: supportedLanguages,
  defaultLanguages: ['en-us'],
  fieldTypes: ['string'],
})

export const documentInternationalizationPluginWithConfig =
  documentInternationalization({
    // Required
    supportedLanguages,
    // supportedLanguages: (client) => client.fetch(`*[_type == "language"]{id, title}`),

    // Required - Translations UI will only appear on these schema types
    schemaTypes: [
      'blogPost',
      'brazeBenefits',
      'brazeLeadership',
      'caseStudy',
      'cta',
      'event',
      'glossaryTerm',
      'guide',
      'industryPage',
      'legalPage',
      'newsListing',
      'page',
      'paidLandingPage',
      'person',
      'personaPage',
      'pressRelease',
      'productPage',
      'report',
      'sharedComponent',
      'solutionsPartner',
      'technologyPartner',
      'testimonial',
      'useCasePage',
      'videoPage',
      'webinar',
      'globalHeader',
      'footer',
    ],

    // Optional - Customizes the name of the language field
    languageField: LANG_CODE_FIELD_NAME,

    // Optional - Keep translation.metadata references weak
    weakReferences: false,

    // Optional - Adds UI for publishing all translations at once. Requires access to the Scheduling API
    bulkPublish: true,

    // Optional - Adds additional fields to the metadata document
    // metadataFields: [
    //   defineField({ name: 'slug', type: 'slug' })
    // ],

    // Optional - Define API Version for all queries
    apiVersion: studioApiVersion,
  })
