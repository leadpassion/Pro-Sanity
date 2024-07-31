import { ExportNdjsonBase } from './ExportNdjsonBase'

/**
 * This class exports blog to a file in ndjson format
 */
export class ExportMarketoForms extends ExportNdjsonBase {
  private seenIds: Set<string>

  /**
   * @param obj Craft marketo form data to save
   */

  constructor(fileName: string) {
    super(fileName)
    this.seenIds = new Set<string>()
  }

  write(formDoc: any) {
    if (this.seenIds.has(formDoc.formId)) {
      // log warning
      console.log('\x1b[33m%s\x1b[0m', `\tSkipping duplicate marketo form: ${formDoc.formId}`)
      return
    }

    super.writeJson(formDoc)
    this.seenIds.add(formDoc.formId)
  }
}
