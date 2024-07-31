import { projectId, studioApiVersion } from '@/lib'
import { createClient } from '@sanity/client'

interface QueryEmbeddingsIndexOptions {
  dataset?: string
  embeddingsIndex: string
  query: string
  filter?: {
    type?: string | string[]
  }
  maxResults?: number
}

const queryEmbeddingsIndex = async (options: QueryEmbeddingsIndexOptions) => {
  const {
    dataset = 'marketing-dev',
    embeddingsIndex,
    query,
    filter,
    maxResults,
  } = options

  const url = `https://${projectId}.api.sanity.io/vX/embeddings-index/query/${dataset}/${embeddingsIndex}`
  const token = process.env.SANITY_API_WRITE_TOKEN
  const body = {
    query,
    maxResults,
    filter,
  }

  const searchResults = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json())

  if (searchResults.error) {
    throw new Error(searchResults.error)
  }

  // Set up the Saniy client to fetch document details
  const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: studioApiVersion,
  })

  // Get document details for each result
  const detailedResults = []
  for (const result of searchResults) {
    const id = result.value.documentId
    const query = `*[_id == $id][0]{
      title,
      "slug": seo.slug.current
    }`
    const doc = await client.fetch(query, { id })
    detailedResults.push(doc)
  }

  return detailedResults
}

const results = await queryEmbeddingsIndex({
  query: 'Black Friday',
  embeddingsIndex: 'blogPosts',
  maxResults: 10,
  filter: {
    type: 'blogPost',
  },
})

console.log(results)
