import type { DocumentResolver, DocumentResolverContext } from '@sanity/presentation'
import { supportedLanguageCodes } from './localization.config'

export const resolveDocForRoute = (
  context: DocumentResolverContext,
): DocumentResolver => {
  const fullRoute = context.path
  const firstRouteSegment = fullRoute.split('/')[0]
  const language = supportedLanguageCodes.includes(firstRouteSegment)
    ? firstRouteSegment
    : 'en-us'
  const fullRouteWithoutLanguage = fullRoute.replace(`${language}/`, '')
  const slug = fullRoute.split('/').pop()

  const types = fullRoute.includes('press-releases')
    ? ['pressRelease']
    : fullRoute.includes('partners/technology-partners')
      ? ['technologyPartner']
      : fullRoute.includes('partners/solutions-partners')
        ? ['solutionsPartner']
        : fullRoute.includes('solutions')
          ? ['useCasePage', 'industryPage']
          : fullRoute.includes('product')
            ? ['productPage']
            : fullRoute.includes('resources/reports-and-guides')
              ? ['report', 'guide']
              : fullRoute.includes('resources/webinars-and-events')
                ? ['webinar', 'event']
                : fullRoute.includes('resources/videos')
                  ? ['videoPage']
                  : fullRoute.includes('resources/articles')
                    ? ['blogPost']
                    : fullRoute.includes('company/legal/')
                      ? ['legalPage']
                      : fullRoute.includes('customers')
                        ? ['caseStudy']
                        : ['page']

  const filterParams = {
    types,
    slug:
      fullRoute === '/'
        ? fullRoute
        : arraysOverlap(types, [
              'page',
              'productPage',
              'personaPage',
              'industryPage',
              'useCasePage',
              'paidLandingPage',
            ])
          ? fullRouteWithoutLanguage.replace('/', '')
          : slug,
    language,
  }

  return {
    filter: `seo.slug.current == $slug && coalesce(language, "en-us") == $language`,
    // @ts-ignore - valid filter params can include records with a string array value
    params: filterParams,
  }
}

const arraysOverlap = (arr1: string[], arr2: string[]): boolean =>
  arr1.some((item) => arr2.includes(item))
