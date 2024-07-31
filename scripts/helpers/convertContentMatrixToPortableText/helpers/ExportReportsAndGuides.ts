import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports reports and guides to a file in ndjson format
 */
export class ExportReportsAndGuides extends ExportNdjsonBase {
  /**
   * @param obj Craft reports and guides data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
