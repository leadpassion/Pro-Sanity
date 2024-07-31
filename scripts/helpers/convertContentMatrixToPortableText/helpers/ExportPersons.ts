import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports a person to a file in ndjson format
 */
export class ExportPersons extends ExportNdjsonBase {
  /**
   * @param obj Craft person data to save
   */
  write(obj: object) {
    super.writeJson(obj)
  }
}
