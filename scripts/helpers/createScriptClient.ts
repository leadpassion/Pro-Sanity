import {
  datasetDev,
  datasetProd,
  projectId,
  studioApiVersion as apiVersion,
} from '@/lib/api'
import { ClientPerspective, createClient } from '@sanity/client'

/**
 * Create a client for the Sanity API
 * @param env - The environment to use
 * @param perspective - The perspective to use
 * @returns A Sanity client
 * @example
 * const client = scriptClient('dev')
 * const response = await client.fetch('*[_type == "post"]')
 */
export const createScriptClient = (
  env: 'dev' | 'prod',
  perspective: ClientPerspective = 'raw',
) => {
  const dataset = env === 'dev' ? datasetDev : datasetProd

  return createClient({
    dataset,
    projectId,
    perspective,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  })
}
