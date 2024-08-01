import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports solution pages to a file in ndjson format
 */
export class ExportSolutionsPages extends ExportNdjsonBase {
  /**
   * @param obj Craft solution page data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
