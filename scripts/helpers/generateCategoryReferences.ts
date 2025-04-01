// @ts-nocheck
import categories from '../data/misc/contentCategories.json'
import craftCategories from '../data/craftExports/craftCategories.json'
import partnerCategories from '../data/misc/technologyPartnerTypeCategories.json'
import productPages from '../data/craftExports/craftProduct.json'
import { CraftCategory } from '../craftTypes'

// This will take [primaryCategory, relatedCategories, productCategory] and return a list of references
export const generateCategoryReferences = (
  groupedCategories: CraftCategory[][] | number[][],
) => {
  const searchableCategories = [...categories, ...partnerCategories]

  // If the categories are just numbers, convert them to CraftCategory objects
  const normalizedCategories = groupedCategories.flat().map((category) => {
    if (typeof category === 'number') {
      return {
        id: category,
      }
    }
    return category
  })

  // Get the productPage ids that are referenced
  const referencedProductIds = normalizedCategories
    .map((cat) => {
      const productPage = productPages.find((p) => p.id === cat.id)
      if (!productPage) return undefined

      const { realId, formattedId } = translateCategoryId(productPage.id)

      return {
        title: productPage.title,
        id: realId,
        categoryType: 'productFeature',
        entryForSanity: {
          _type: 'reference',
          _ref: formattedId,
        },
      }
    })
    .filter(Boolean)

  // Get the IDs and types for all other categories
  const categoryEntries = normalizedCategories.map((category) => {
    const { realId, formattedId } = translateCategoryId(category.id)
    return {
      id: realId,
      craftCategory: craftCategories.find((c) => c.id === realId)?.title,
      categoryType: searchableCategories.find(
        (c) => c._id === `imported-craft-${realId}`,
      )?._type,
      entryForSanity: {
        _type: 'reference',
        _ref: formattedId,
      },
    }
  })

  categoryEntries.push(...referencedProductIds)

  const groupedByType = {}

  // Group by category type
  categoryEntries.forEach((category) => {
    if (!category.categoryType) return

    const pluralizedCategoryName = pluralizeCategoryName(category.categoryType)

    if (!groupedByType[pluralizedCategoryName]) {
      groupedByType[pluralizedCategoryName] = []
    }

    groupedByType[pluralizedCategoryName].push(...[category.entryForSanity])
  })

  // If there are no categories, return undefined
  if (Object.keys(groupedByType).length === 0) {
    return undefined
  }

  // Deduplicate the categories
  Object.keys(groupedByType).forEach((key) => {
    groupedByType[key] = groupedByType[key].filter(
      (category, index, self) =>
        index === self.findIndex((t) => t._ref === category._ref),
    )
  })

  return groupedByType
}

const pluralizeCategoryName = (categoryName: string) => {
  return categoryName.endsWith('y')
    ? `${categoryName.slice(0, -1)}ies`
    : `${categoryName}s`
}

// This will take a category id and return the id and formatted id for use in references
export const translateCategoryId = (
  id: number,
): {
  realId: number | string
  formattedId: string
} => {
  if (duplicateCategoryMap[id]) {
    const correctId = duplicateCategoryMap[id]
    return {
      id: correctId,
      formattedId:
        typeof correctId === 'number'
          ? `imported-craft-${correctId}`
          : correctId,
    }
  }

  return {
    realId: id,
    formattedId: typeof id === 'number' ? `imported-craft-${id}` : id,
  }
}

// This is a map of craft category ids to the correct id in Sanity
// Because of the crazy way we've done things, some categories in Sanity were
// not imported with the `imported-craft-` prefix, so we need to account for that.
const duplicateCategoryMap = {
  75360: 68879,
  75363: 62692,
  // Email
  765: 49349,
  // SMS
  768: 27527,
  // Mobile App Messaging,
  865240: 'c7825ea5-c4c6-4da3-b900-065d1d0bfe83', // needs to not be prefixed with imported-craft-
  // Journey Orchestration
  865137: '2a27d10c-fc9f-4ed6-a94b-80e09e0d28f5',
  // Content Cards
  762: 60391,
  // Data Activation
  865562: 'a713d34b-cb90-478d-af1a-ceca12faf377',
  // Feature Flags
  780297: 'f5397b80-cae0-4e29-aa2a-67a7eb2afb1d',
  // WhatsApp
  623397: 675679,
}
