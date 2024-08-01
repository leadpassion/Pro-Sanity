import { SlugValidationContext } from 'sanity'

export async function isUniquePerLanguage(
  slug: string,
  context: SlugValidationContext,
) {
  const { getClient } = context

  // TODO don't allow language to be null/undefined
  // if (!context.document?.language) {
    // throw new Error(`\`language\` was not provided in validation context.`)
  // }

  const client = getClient({
    apiVersion: process.env.SANITY_STUDIO_API_VERSION || '2023-12-10',
  })

  const id = context.document._id.replace(/^drafts\./, '')

  // TODO: We will need this when we implement the Sanity/Phrase integration
  if (
    context.document.phraseMetadata &&
    typeof context.document.phraseMetadata === 'object' &&
    '_type' in context.document.phraseMetadata &&
    context.document.phraseMetadata._type === 'phrase.ptd.meta'
  ) {
    return true
  }

  const queryUsedInOtherDocument = `
    defined(*[
      _type == $docType &&
      !(_id in [$draft, $published]) &&
      !(_id in path("drafts.**")) &&
      seo.slug.current == $slug &&
      phraseMetadata._type != 'phrase.ptd.meta' &&
      language == $language
    ][0]._id)
  `

  const usedInOtherDocument = await client.fetch<boolean>(
    queryUsedInOtherDocument,
    {
      docType: context.document._type,
      draft: draftId(id),
      published: undraftId(id),
      // TODO don't allow language to be null/undefined
      language: context.document.language || null,
      slug,
    },
  )

  return !usedInOtherDocument
}

function undraftId(id: string) {
  return id.replace('drafts.', '')
}

function draftId(id: string) {
  return `drafts.${undraftId(id)}`
}
