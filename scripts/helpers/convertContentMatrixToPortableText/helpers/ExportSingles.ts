import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports single pages to a file in ndjson format
 */
export class ExportSingles extends ExportNdjsonBase {
  /**
   * @param obj Craft single page data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
