import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports misc pages to a file in ndjson format
 */
export class ExportMiscPages extends ExportNdjsonBase {
  /**
   * @param obj Craft misc page data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
