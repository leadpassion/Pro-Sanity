import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports event and webinar pages to a file in ndjson format
 */
export class ExportEventsAndWebinars extends ExportNdjsonBase {
  /**
   * @param obj Craft event and webinar data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
