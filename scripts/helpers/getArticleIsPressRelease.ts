const PRESS_RELEASE_CATEGORY_ID = 28066

export const getArticleIsPressRelease = (groupedCategories: number[][]) => {
  // Flatten the array and get the IDs
  const ids = groupedCategories.flat()

  return ids.includes(PRESS_RELEASE_CATEGORY_ID)
}
