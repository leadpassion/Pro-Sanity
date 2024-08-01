import { CraftAuthor, CraftEvent } from '../craftTypes'
import craftAuthors from '@/scripts/data/craftExports/craftAuthors.json'
import {
  ExportPersons,
  getCraftAssetInfo,
} from './convertContentMatrixToPortableText'
import { craftIdToSanityId } from './craftIdToSanityId'
import crypto from 'crypto'

const authors = craftAuthors as CraftAuthor[]

const addedAuthorIds: string[] = []

export const handleEventPresenters = (
  event: CraftEvent,
  personExporter: ExportPersons,
) => {
  const { eventSpeakers } = event
  if (!eventSpeakers) return []

  const speakers: { name: string; title: string; image: [number] }[] = []

  Object.values(eventSpeakers).map((presenter) => {
    const { fields } = presenter

    const speaker = {
      name: fields.speakerName,
      title: fields.speakerTitle,
      image: fields.speakerImage,
    }

    speakers.push(speaker)
  })

  const speakerRefs = speakers.map((speaker) => {
    // Does this speaker exist in the authors array?
    const extantAuthor: CraftAuthor | undefined = authors.find(
      (author) => author.title === speaker.name,
    )

    if (extantAuthor) {
      const _id = craftIdToSanityId(extantAuthor.id, 'author')

      // TODO save to export

      return {
        _type: 'reference',
        _ref: _id,
      }
    }

    // If not, add them
    if (!extantAuthor) {
      const firstName = speaker.name.split(' ')[0]
      const lastName = speaker.name.split(' ')[1]

      // This isn't a perfect approach, but it allows us to rerun the script without creating duplicate authors
      const newId = `imported-craft-author-from-event-${cleanAuthorName(firstName)}-${cleanAuthorName(lastName)}`

      const { url: profilePhotoUrl } = getCraftAssetInfo(speaker.image[0]) || {
        url: '',
        altText: '',
      }

      const newAuthor = {
        _type: 'person',
        _id: newId,
        firstName,
        lastName,
        role: speaker.title,
        headshot: profilePhotoUrl ? {
          _type: 'image',
          _sanityAsset: `image@${profilePhotoUrl}`,
        } : undefined,
      }

      if (!addedAuthorIds.includes(newId)) {
        personExporter.write(newAuthor)
        addedAuthorIds.push(newId)
      }

      return {
        _type: 'reference',
        _ref: newId,
      }
    }
  })

  return speakerRefs
}

const cleanAuthorName = (name: string) => {
  if (!name) return ''
  // Clear out any characters other than letters, numbers, and spaces
  const cleanedName = name.replace(/[^a-zA-Z0-9 ]/g, '')

  if (cleanedName !== '') return cleanedName

  // This will handle the case where the name is empty after cleaning
  // This is only likely to happen for Japanese and Korean names
  const hashedPublicationName = crypto
    .createHash('sha1')
    .update(name)
    .digest('hex')

  return hashedPublicationName
}
