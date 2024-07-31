import { nanoid } from 'nanoid'
import { getVideoDetailsFromEmbed } from '../helpers/getVideoDetailsFromEmbed'
import { craftIdToSanityId } from '../../craftIdToSanityId'

export type SanityVideoReferenceBlock = {
  _key: string
  _type: string
  _ref: string
}

export type CraftVideoBlockFields = {
  embed: string
  videoEmbed?: string
}

export type VideoBlocks = {
  videoBlockId: string
  videoBlocks: SanityVideoReferenceBlock[]
}

export const handleVideoBlock = async (
  fields: CraftVideoBlockFields,
): VideoBlocks => {
  const embedCode = fields.embed || fields.videoEmbed

  const { videoId } = await getVideoDetailsFromEmbed(embedCode)

  const videoBlockId = craftIdToSanityId(videoId)

  const videoReferenceBlock = {
    _key: nanoid(),
    _type: 'videoReference',
    _ref: videoBlockId,
  }

  return {
    videoBlockId: videoBlockId,
    videoBlocks: [videoReferenceBlock],
  }
}
