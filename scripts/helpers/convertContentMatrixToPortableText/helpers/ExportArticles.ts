import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports blog to a file in ndjson format
 */
export class ExportArticles extends ExportNdjsonBase {
  /**
   * @param obj Craft blog data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
