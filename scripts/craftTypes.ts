import { CraftContentMatrix } from './helpers/convertContentMatrixToPortableText'
import {
  ExportArticles,
  ExportBrands,
  ExportCaseStudies,
  ExportEventsAndWebinars,
  ExportLegalPages,
  ExportNewsListings,
  ExportPartners,
  ExportPersons,
  ExportTestimonials,
  ExportVideosFromFields,
  ExportReportsAndGuides,
  ExportVideos,
  ExportPublications,
  ExportVideoPages,
  ExportMiscPages,
  ExportSingles,
  ExportProductPages,
  ExportSolutionsPages,
  ExportMarketoForms,
} from './helpers/convertContentMatrixToPortableText/helpers'
import { TypedObject } from 'sanity'

type CraftBlock = {
  type: string
  enabled: boolean
  collapsed: boolean
}

export type CraftPdfBlock = CraftBlock & {
  fields: {
    contentWidth: 'full' | 'medium'
    pdfLink: string // json object containing a url
  }
}

export type CraftMarketoFormBlock = CraftBlock & {
  fields: {
    form: [number] // -> form
  }
}

export type CraftFullWidthBlock = CraftBlock & {
  fields: {
    contentWidth: 'full' | 'medium'
    body: string // html
  }
}

type CraftAdvancedFAQ = {
  fields: {
    question: string
    answer: string // html
  }
}

export type CraftFAQsAdvancedBlock = CraftBlock & {
  fields: {
    isInContainer: boolean
    isBigHeadline: boolean
    headline: string | null
    faqs: {
      [key: string]: CraftAdvancedFAQ
    }
  }
}

export type CraftFormBlock = CraftBlock & {
  fields: {
    form: [number] // -> form
    submitButtonText: string | null
  }
}

export type CraftReport = {
  canonicalId: number
  slug: string
  title: string
  heroImage: [number] // -> asset
  excerpt: string // html
  contentMatrixSimple: CraftContentMatrix
  contentMatrix: CraftContentMatrix
  marketoForm: [number] // -> form
  resourceLink: string // json string with linkedUrl
  primaryCategory: number[] // 30338 = report; 30339 = guide
  relatedCategories: number[]
  productCategories: number[]
  hideFromSearch: boolean
  hideFromListing: boolean

  lang?: string
  siteId: number

  submitButtonText: string | null
  redirectUrl: string
  thankYouOverride: string | null // -> thankYouHeadline
  marketoThankYou: string | null // -> thankYouMessage

  seoMetadata: {
    pageTitle: string
    pageDescription: string
    openGraphImage: Array<number>
    openGraphImageAlt: string
    robots: string
  }
}

export type CraftNewsListing = {
  canonicalId: number
  title: string
  slug: string
  heroImage: [number] // -> asset
  publicationDate: string
  publicationName: string
  urlField: string
}

export type CraftLegalPage = {
  canonicalId: number
  slug: string
  title: string
  intro: string // html
  contentMatrix: CraftContentMatrix

  seoMetadata: {
    pageTitle: string
    pageDescription: string
    openGraphImage: Array<number>
    openGraphImageAlt: string
    robots: string
  }
}

export type CraftEvent = {
  canonicalId: number
  slug: string
  title: string
  excerpt?: string

  heroImage: [number] // -> featuredImage
  eventDate: string
  eventDateEnd?: string
  eventTimezone?: string

  videoEmbed: string // html

  eventAgenda: {
    [key: string]: {
      fields: {
        time: string
        description: string // html
      }
    }
  }

  eventSpeakers: {
    [key: string]: {
      fields: {
        speakerName: string
        speakerTitle: string
        speakerImage: [number]
      }
    }
  }

  contentMatrixSimple?: CraftContentMatrix
  contentMatrix?: CraftContentMatrix
  marketoForm: [number]

  primaryCategory: [number] // -> category + _type (30337 -> event; 30336 -> webinar; 850097 -> webinar)
  relatedCategories: number[]
  productCategories: number[]

  lang?: string
  siteId: number

  submitButtonText: string | null
  redirectUrl: string
  thankYouOverride: string | null // -> thankYouHeadline
  marketoThankYou: string | null // -> thankYouMessage

  seoMetadata: {
    pageTitle: string
    pageDescription: string
    openGraphImage: Array<number>
    openGraphImageAlt: string
    robots: string
  }
}

export type CraftWebinar = CraftEvent

export type CraftBrand = {
  canonicalId: number
  slug: string
  title: string
  whatIs: string // html
  howWeWorkTogether: string // html
  coreCompetency: string
  companySize: string
  urlField: string
}

export type CraftPartner = {
  canonicalId: number
  partnerLogo: [number]
  title: string
  slug: string
  brazeDocumentationUrl: string | null
  videoEmbed: string // html
  contentMatrix: CraftContentMatrix
  whatIs: string // html
  howWeWorkTogether: string // html
  brand: [number] // -> brand
  partnerCategories: number[] // -> categories, distinguish tech partners from solution partners
  relatedCategories: number[] // -> categories
  industries: number[] // -> industry
  specialty: number[] // -> specialty?
  integrationPartnerId?: string
  featuredContent: number[]
  featuredPartner: boolean
  excerpt: string // -> featuredPartnerShortDescription
  specialty: [number] // -> partnerSpecialty
  partnerIntegrationMethods: Record<string,string>[]
  dashboardIntegrationMethods: Record<string,string>[]

  seoMetadata: {
    pageTitle: string
    pageDescription: string
    openGraphImage: Array<number>
    openGraphImageAlt: string
    robots: string
  }
}

export type CraftCaseStudy = {
  canonicalId: number // -> _id
  dateCreated: string // -> publicationDates.publishedAt
  dateUpdated: string // -> publicationDates.updatedAt
  authorId: number // -> author
  title?: string // -> title
  intro?: string // -> intro
  slug: string // -> seo.slug.current
  featuredStatHeadline?: string // -> metrics[0].value
  featuredStatSubheadline?: string // -> metrics[0].description
  heroImage: [number] // -> featuredImage
  threeColumn: {
    [key: string]: {
      type: number
      fields: {
        subheader: string
        body: string // Plain text
      }
    }
  }
  stats: {
    [key: string]: {
      type: 40
      fields: {
        stat: string
        body: string
      }
    }
  }
  contentMatrixSimple?: CraftContentMatrix // -> body
  contentMatrix?: CraftContentMatrix // -> body
  brand: [number] // -> brand
  partners: number[] // []-> partner
  relatedCategories: number[]
  relatedProducts: number[]

  seoMetadata: {
    pageTitle: string
    pageDescription: string
    openGraphImage: Array<number>
    openGraphImageAlt: string
    robots: string
  }
}

export type CraftVideoPage = {
  canonicalId: number
  title: string
  slug: string
  dateCreated: string
  dateUpdated: string
  excerpt: string // html
  heroImage: [number] // -> featuredImage
  videoEmbed: string // html
  primaryCategory: number[] // -> categories
  relatedCategories: number[] // -> categories
  productCategories: number[] // -> categories
  hideFromListing: boolean
  hideFromSearch: boolean

  seoMetadata: {
    pageTitle: string
    pageDescription: string
    openGraphImage: Array<number>
    openGraphImageAlt: string
    robots: string
  }
}

export type CraftPost = {
  canonicalId: number // -> _id
  dateCreated: string // -> _createdAt
  dateUpdated: string // -> _updatedAt

  // Content + SEO
  title?: string // -> title, seo.pageTitle
  slug: string // -> seo.slug.current
  excerpt?: string // -> excerpt, seo.pageDescription (needs html -> plain text conversion)
  heroImage: [number] // -> featuredImage, seo.openGraphImage.asset._ref (needs image asset conversion)
  contentMatrixSimple?: CraftContentMatrix // -> body (needs html -> Portable Text conversion)
  postDate: string // -> publicationDates.publishedAt

  // Categories
  primaryCategory?: number[] // -> categories
  relatedCategories?: number[] // -> categories
  productCategory?: number[] // -> categories

  // Status
  trashed: boolean
  enabled: boolean
  archived: boolean
  status: 'live' | 'draft'

  // Authors
  authorEntry: number[] // -> author (needs author conversion)

  seoMetadata: {
    pageTitle: string
    pageDescription: string
    openGraphImage: Array<number>
    openGraphImageAlt: string
    robots: string
  }
}

export type CraftMiscPage = {
  canonicalId: number // -> _id
  title: string // -> title, seo.pageTitle
  slug: string // -> seo.slug.current
  relatedCategories: number[] // -> categories
  lang: string | null // -> lang
  intro: string // html

  seoMetadata: {
    pageTitle: string
    pageDescription: string
    openGraphImage: Array<number>
    openGraphImageAlt: string
    robots: string
  }
}

export type CraftSolutionsPage = {
  canonicalId: number // -> _id
  title: string // -> title, seo.pageTitle
  slug: string // -> seo.slug.current
  relatedCategories: number[] // -> categories
  lang: string | null // -> lang
  intro: string // html

  seoMetadata: {
    pageTitle: string
    pageDescription: string
    openGraphImage: Array<number>
    openGraphImageAlt: string
    robots: string
  }
}

export type CraftSinglePage = {
  canonicalId: number // -> _id
  title: string // -> title, seo.pageTitle
  slug: string // -> seo.slug.current
}

export type CraftProductPage = {
  canonicalId: number // -> _id
  title: string // -> title, seo.pageTitle
  slug: string // -> seo.slug.current

  seoMetadata: {
    pageTitle: string
    pageDescription: string
    openGraphImage: Array<number>
    openGraphImageAlt: string
    robots: string
  }
}

export type CraftPartnerType = 'technology' | 'solutions'

export type CraftAuthor = {
  id: number // -> _id
  authorBio?: string | null
  title?: string | null
  authorJobTitle?: string | null
  authorProfilePhoto: number[]
  linkedinUrl?: string | null
  twitterUrl?: string | null
  facebookUrl?: string | null
}

export type CraftAuthorInfo = Omit<
  CraftAuthor,
  'authorProfilePhoto' | 'bio'
> & {
  bio: TypedObject[] | undefined
  profilePhotoUrl: string | null
  xUrl?: string | null
  _id: string
  _type: string
  language: string
  firstName: string
  lastName: string
}

export type ExportHandlers = {
  testimonialsExport: ExportTestimonials
  videosExport: ExportVideos
  legalPagesExport: ExportLegalPages
  exportCaseStudies: ExportCaseStudies
  exportBrands: ExportBrands
  exportPartners: ExportPartners
  exportEventsAndWebinars: ExportEventsAndWebinars
  exportPersons: ExportPersons
  exportVideosFromFields: ExportVideosFromFields
  exportReportsAndGuides: ExportReportsAndGuides
  articlesExport: ExportArticles
  newsListingsExport: ExportNewsListings
  publicationsExport: ExportPublications
  videoPagesExport: ExportVideoPages
  miscPagesExport: ExportMiscPages
  singlesExport: ExportSingles
  productPagesExport: ExportProductPages
  solutionPagesExport: ExportSolutionsPages
  marketoFormsExport: ExportMarketoForms
}

export type CraftCategory = {
  id: number
}
