import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports legal pages to a file in ndjson format
 */
export class ExportLegalPages extends ExportNdjsonBase {
  /**
   * @param obj Craft legal page data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
