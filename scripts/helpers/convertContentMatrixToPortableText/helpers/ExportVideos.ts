import { ExportNdjsonBase } from './ExportNdjsonBase'
import { CraftVideoBlockFields } from '../matrixBlockHandlers/handleVideoBlock'
import { getVideoDetailsFromEmbed } from './getVideoDetailsFromEmbed'

/**
 * This class exports videos to a file in ndjson format
 */
export class ExportVideos extends ExportNdjsonBase {
  private seenIds: Set<string> // Declare the seenIds property

  /**
   * Appends a testimonial to ndjson lines
   * @param videoDocId id to saving the video as
   * @param videoFields Craft video data to save
   */

  // Keep track of the video document ID and the video fields
  constructor(fileName: string) {
    super(fileName)
    this.seenIds = new Set<string>() // Initialize the seenIds property
  }

  async writeDoc(videoDocId: string, videofields: CraftVideoBlockFields) {
    const { embed, videoEmbed } = videofields

    const embedCode = embed || videoEmbed

    const { videoProvider, videoId, title, thumbnail } =
      await getVideoDetailsFromEmbed(embedCode)

    // If we've already seen this video, skip it
    if (this.seenIds.has(videoId)) {
      // log warning
      console.log('\x1b[33m%s\x1b[0m', `\tSkipping duplicate video: ${videoId}`)
      return
    }

    const sanityVideo = {
      _type: 'video',
      _id: videoDocId,
      videoDetails: {
        videoProvider,
        videoId,
        title,
        thumbnail,
      },
    }

    super.writeJson(sanityVideo)
    this.seenIds.add(videoId)
  }
}
