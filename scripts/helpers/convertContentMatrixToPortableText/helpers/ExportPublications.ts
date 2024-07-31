import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports publications (news outlets) to a file in ndjson format
 */
export class ExportPublications extends ExportNdjsonBase {
  private seenIds: Set<string> // Declare the seenIds property

  // Keep track of the video document ID and the video fields
  constructor(fileName: string) {
    super(fileName)
    this.seenIds = new Set<string>() // Initialize the seenIds property
  }

  async write(_id: string, obj: object) {
    // If we've already seen this video, skip it
    if (this.seenIds.has(_id)) {
      // log warning
      console.log('\x1b[33m%s\x1b[0m', `\tSkipping duplicate publications: ${_id}`)
      return
    }

    const sanityPublication = {
      ...obj,
      _type: 'publication',
      _id,
    }

    super.writeJson(sanityPublication)
    this.seenIds.add(_id)
  }
}
