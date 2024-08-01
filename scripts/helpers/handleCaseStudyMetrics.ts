import { CraftCaseStudy } from '../craftTypes'
import { htmlToText } from 'html-to-text'

type SanityMetrics = {
  value: string | undefined
  description: string | undefined
}[]

export const handleCaseStudyMetrics = (
  craftCaseStudy: CraftCaseStudy,
): SanityMetrics | [] => {
  let metrics = []

  if (
    craftCaseStudy.featuredStatSubheadline &&
    craftCaseStudy.featuredStatSubheadline
  ) {
    metrics.push({
      value: craftCaseStudy.featuredStatHeadline,
      description: craftCaseStudy.featuredStatSubheadline,
    })
  }

  // Handle top-level 'stats' field
  if (craftCaseStudy.stats && Object.keys(craftCaseStudy.stats).length > 0) {
    for (const key in craftCaseStudy.stats) {
      const stat = craftCaseStudy.stats[key]

      const { stat: statString, body: statBodyString } = stat.fields

      metrics.push({
        value: statString,
        description: htmlToText(statBodyString),
      })
    }
  }

  // Handle 'statCircle' block in contentMatrix
  const statCircleBlock = craftCaseStudy.contentMatrix?.find(
    (block) => block.type === 'statCircle',
  )

  if (statCircleBlock) {
    const stats = statCircleBlock.fields.stats

    for (const key in stats) {
      const stat = stats[key].fields
      const { stat: statString, statBody: statBodyString } = stat

      metrics.push({
        value: statString,
        description: htmlToText(statBodyString),
      })
    }
  }

  const dedupedMetrics = dedupeMetrics(metrics)

  return dedupedMetrics
}

const dedupeMetrics = (metrics: SanityMetrics): SanityMetrics => {
  const seen = new Set()

  const dedupedMetrics = metrics.filter((metric) => {
    const isDuplicate = seen.has(metric.value)
    seen.add(metric.value)
    return !isDuplicate
  })

  return dedupedMetrics
}
