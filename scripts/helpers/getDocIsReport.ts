import { CraftReport } from '../craftTypes'

const REPORT_CATEGORY_ID = 30338

export const getDocIsReport = (doc: CraftReport) => {
  const groupedCategories = [
    doc.primaryCategory || [],
    doc.relatedCategories || [],
  ]

  const ids = groupedCategories.flat()

  return ids.includes(REPORT_CATEGORY_ID)
}
