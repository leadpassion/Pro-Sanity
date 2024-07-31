import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports video pages to a file in ndjson format
 */
export class ExportVideoPages extends ExportNdjsonBase {
  /**
   * @param obj Craft video page data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
