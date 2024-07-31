import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports legal pages to a file in ndjson format
 */
export class ExportCaseStudies extends ExportNdjsonBase {
  /**
   * @param obj Craft case study data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
