import { ExportVideosFromFields } from './convertContentMatrixToPortableText'
import { getVideoDetailsFromEmbed } from './convertContentMatrixToPortableText/helpers/getVideoDetailsFromEmbed'

const seenVideoIds: Set<string> = new Set()

export const handleVideoEmbedField = async (
  embed: string,
  videoExportHandler: ExportVideosFromFields,
) => {
  const videoDetails = await getVideoDetailsFromEmbed(embed)

  if (!videoDetails) return undefined

  const _id = `imported-craft-${videoDetails.videoId}`

  if (seenVideoIds.has(_id)) {
    return {
      _type: 'reference',
      _ref: _id,
    }
  }

  const sanityVideo = {
    _type: 'video',
    _id,
    videoDetails,
  }

  seenVideoIds.add(_id)

  videoExportHandler.write(sanityVideo)

  return {
    _type: 'reference',
    _ref: _id,
  }
}
