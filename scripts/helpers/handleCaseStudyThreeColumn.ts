import { CraftCaseStudy } from '../craftTypes'

export const handleCaseStudyThreeColumn = (craftCaseStudy: CraftCaseStudy) => {
  const threeColumnField = craftCaseStudy.threeColumn

  if (!threeColumnField) return undefined

  // All examples of this field have the same structure,
  // following the order problem, strategy, results
  // Their keys are random, so we'll rely on the order

  const keys = Object.keys(threeColumnField)

  if (keys.length !== 3) {
    console.error(
      `Case study ${craftCaseStudy.canonicalId} has an unexpected number of threeColumn fields: ${keys.length}`,
    )
    return undefined
  }

  return {
    problem: threeColumnField[keys[0]]?.fields?.body,
    strategy: threeColumnField[keys[1]]?.fields?.body,
    results: threeColumnField[keys[2]]?.fields?.body,
  }
}
