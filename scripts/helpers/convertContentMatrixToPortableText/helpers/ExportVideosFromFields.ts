import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports videos stored as embed code in a dedicated field to a file in ndjson format
 */
export class ExportVideosFromFields extends ExportNdjsonBase {
  /**
   * @param obj Craft video data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
