type DocWithType = {
  _type?: string
  language?: string
  seo?: {
    slug: {
      current: string
    }
  }
}

const getRoutePrefixForType = (type: string) => {
  switch (type) {
    case 'blogPost':
      return 'resources/articles'
    case 'caseStudy':
      return 'customers'
    case 'pressRelease':
      return 'press-releases'
    case 'legalPage':
      return 'company/legal'
    case 'glossaryTerm':
      return 'resources/articles/glossary'
    case 'report':
      return 'resources/reports-and-guides'
    case 'guide':
      return 'resources/reports-and-guides'
    case 'webinar':
      return 'resources/webinars-and-events'
    case 'event':
      return 'resources/webinars-and-events'
    case 'newsListing':
      return 'company/news'
    case 'videoPage':
      return 'resources/videos'
    case 'technologyPartner':
      return 'partners/technology-partners'
    case 'solutionsPartner':
      return 'partners/solutions-partners'
    default:
      return null
  }
}

export const getRouteForDoc = ({
  _type,
  language = 'en-us',
  seo,
}: DocWithType) => {
  if (!_type) {
    return null
  }

  if (!seo?.slug?.current) {
    return null
  }

  if (seo.slug.current === '/') {
    return '/'
  }

  const prefix = getRoutePrefixForType(_type)

  const shouldIncludeLocaleInRoute = language && language !== 'en-us'

  const routeSegements = [
    shouldIncludeLocaleInRoute ? `/${language}` : undefined,
    prefix ? `/${prefix}` : undefined,
    `/${seo.slug.current}`,
  ]

  const route = routeSegements.filter(Boolean).join('')

  return route
}
