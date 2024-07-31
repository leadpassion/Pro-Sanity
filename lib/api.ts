export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: SANITY_STUDIO_PROJECT_ID',
)

export const datasetDev = assertValue(
  process.env.SANITY_STUDIO_DATASET_DEV,
  'Missing environment variable: SANITY_STUDIO_DATASET_DEV',
)

export const datasetProd = assertValue(
  process.env.SANITY_STUDIO_DATASET_PROD,
  'Missing environment variable: SANITY_STUDIO_DATASET_PROD',
)

export const studioApiVersion = assertValue(
  process.env.SANITY_STUDIO_API_VERSION,
  'Missing environment variable: SANITY_STUDIO_API_VERSION',
)

function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined) {
    throw new Error(errorMessage)
  }
  return value
}
