import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports news listings to a file in ndjson format
 */
export class ExportNewsListings extends ExportNdjsonBase {
  /**
   * @param obj Craft news listing data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
