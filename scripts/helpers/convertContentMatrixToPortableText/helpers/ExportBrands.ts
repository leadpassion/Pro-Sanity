import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports brands to a file in ndjson format
 */
export class ExportBrands extends ExportNdjsonBase {
  /**
   * @param obj Craft brand data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
