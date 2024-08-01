import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports partners to a file in ndjson format
 */
export class ExportPartners extends ExportNdjsonBase {
  /**
   * @param obj Craft partner data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
