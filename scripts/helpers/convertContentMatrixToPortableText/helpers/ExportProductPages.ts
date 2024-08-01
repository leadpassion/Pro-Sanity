import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports product pages to a file in ndjson format
 */
export class ExportProductPages extends ExportNdjsonBase {
  /**
   * @param obj Craft product page data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
