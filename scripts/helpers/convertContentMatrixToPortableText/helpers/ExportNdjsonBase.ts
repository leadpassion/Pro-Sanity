import * as fs from 'fs'
import ndjson from 'ndjson'
import crypto from 'crypto'
import { LANG_CODE_FIELD_NAME } from '@/lib/localization.config'

type LocalizedSanityDocument = {
  _id: string
  _type: string
  [LANG_CODE_FIELD_NAME]: string
} & Record<string, any>

type translationMetadataDocumentObject = {
  _key: string
  value: {
    _type: string
    _ref: string
  }
}

/**
 * This class exports ndson data to a file in ndjson format
 */
export class ExportNdjsonBase {
  private serialize: any
  private translationMetadata: {
    [key: number]: translationMetadataDocumentObject[]
  }
  private schemaType: string

  /**
   *
   * @param fileName The name of the file to write the ndjson data to
   */
  constructor(fileName: string) {
    this.serialize = ndjson.stringify()
    this.serialize.pipe(fs.createWriteStream(fileName, { encoding: 'utf8' }))
    this.translationMetadata = {}

    this.schemaType = ''
  }

  /**
   * writes a json object to the ndjson serializer
   * @param obj json object to write to as ndjson
   */
  writeJson(obj: object) {
    this.serialize.write(obj)
  }

  /**
   * Save ndjson file
   */
  save() {
    this.serialize.end()
  }

  addTranslationMetadataDoc(
    canonicalId: number,
    doc: LocalizedSanityDocument,
    overrideMapKey: string = '',
  ) {
    // define document for translation.metadata
    const translationMetadataDocObj: translationMetadataDocumentObject = {
      // set langCode as key
      _key: doc[LANG_CODE_FIELD_NAME],
      // set reference to this document
      value: {
        _type: 'reference',
        _ref: doc._id,
      },
    }

    // Define schema type for later, if needed
    if (!this.schemaType) {
      this.schemaType = doc._type
    }

    const mapKey = overrideMapKey || canonicalId

    // Save for later - writeTranslations()
    if (this.translationMetadata[mapKey]) {
      this.translationMetadata[mapKey].documents.push(translationMetadataDocObj)
    } else {
      this.translationMetadata[mapKey] = {
        canonicalId,
        documents: [translationMetadataDocObj],
      }
    }
  }

  writeTranslations() {
    Object.values(this.translationMetadata).forEach(
      ({ canonicalId, documents }) => {
        // Don't create metadata doc unless there's multiple translations references
        if (documents.length > 1) {
          const metadata = {
            _id: this.hashMetadataId(canonicalId.toString()),
            _type: 'translation.metadata',
            translations: documents,
            schemaTypes: this.schemaType ? [this.schemaType] : undefined,
          }
          this.writeJson(metadata)
        }
      },
    )
  }

  hashMetadataId(canonicalId: string) {
    return crypto.createHash('sha1').update(canonicalId).digest('hex')
  }
}
