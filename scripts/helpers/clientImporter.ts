import { SanityClient } from '@sanity/client'
import crypto from 'crypto'
import { createScriptClient } from './createScriptClient'
import { translationMetadataDocumentObject, LocalizedSanityDocument } from './helpers'
import { LANG_CODE_FIELD_NAME } from '@/lib/localization.config'

class ClientImporter {
  private client: SanityClient
  private excludedFromUpdate: string[]
  private translationsDocs: Record<string, {
    canonicalId: number
    schemaType: string
    translations: translationMetadataDocumentObject[]
  }>
  private assetUploads: Record<string, string>

  constructor() {
    this.client = createScriptClient('dev')
    this.excludedFromUpdate = []
    this.translationsDocs = {}
    this.assetUploads = {}
  }

  async importPages(pages: LocalizedSanityDocument[]) {
    const transaction = this.client.transaction()

    console.log(`Importing ${pages.length} pages...`)

    // set mutations for each page
    for (const [count, page] of pages.entries()) {
      console.log(`Creating mutations for page(${count+1}/${pages.length}) ${page.title}`)

      // Handle special case for seo.openGraphImage 
      if (page.seo?.openGraphImage) {
        const assetValue = await this.handleAsset(page.seo.openGraphImage)

        if (assetValue) {
          page.seo.openGraphImage = assetValue
        } else {
          // something went wrong, skip this field
          delete page.seo.openGraphImage
        }
      }

      transaction.createIfNotExists(page)
        .patch(this.getPatchMutation(page))
    }

    console.log(`Creating mutations for translations`)
    
    // set mutations for translation metadata docs
    Object.values(this.translationsDocs).forEach(
      ({ canonicalId, schemaType, translations }) => {
        // Don't create metadata doc unless there's multiple translations references
        if (translations.length > 1) {
          const metadata = {
            _id: this.hashMetadataId(canonicalId.toString()),
            _type: 'translation.metadata',
            translations,
            schemaTypes: schemaType ? [schemaType] : undefined,
          }

          transaction.createIfNotExists(metadata)
            .patch(
              this.client.patch(metadata._id).set({
                translations
              })
            )

        }
      })

    // console.log('Committing transaction', JSON.stringify(transaction, null, 2))

    return transaction.commit()
      .then((res) => {
        // log result in green
        console.log('\x1b[32m%s\x1b[0m', `Successfully imported! Details:`, JSON.stringify(res, null, 2))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  /**
   * Tell importer to skip these fields when updating existing documents.
   *
   * @param      {string[]}  fieldNames  The field names
   * @chainable
   */
  excludeFieldsFromUpdate(fieldNames: string[]) {
    this.excludedFromUpdate = fieldNames

    return this
  }

  createTranslationReference(
    canonicalId: number,
    doc: LocalizedSanityDocument,
    overrideMapKey: string = '',
  ) {
    // define document for translation.metadata
    const translationRef: translationMetadataDocumentObject = {
      // set langCode as key
      _key: doc[LANG_CODE_FIELD_NAME],
      // set reference to this document
      value: {
        _type: 'reference',
        _ref: doc._id,
      },
    }

    // do nothing if no language set or no ref id
    if (!translationRef._key || !translationRef.value._ref) {
      return
    }

    const mapKey = overrideMapKey || canonicalId


    // Save for later 
    if (this.translationsDocs[mapKey]) {
      this.translationsDocs[mapKey].translations.push(translationRef)
    } else {
      this.translationsDocs[mapKey] = {
        canonicalId,
        schemaType: doc._type,
        translations: [translationRef],
      }
    }

    console.log('\x1b[34m%s\x1b[0m',
      `\tDefined translation reference for ${translationRef.value._ref} in ${translationRef._key}`,
      this.translationsDocs[mapKey])
  }

  /////// Client

  getPatchMutation({ _id, _type, ...fieldsToUpdate }) {
    // Clean up the fields, if any should be excluded from update
    this.excludedFromUpdate.forEach(fieldName => {
      delete fieldsToUpdate[fieldName]
    })

    // coerce to format Sanity client expects for patches
    const flatFieldsMap = this.deepFlattenToObject(fieldsToUpdate)
    // create patch mutation
    return this.client.patch(_id).set(flatFieldsMap)
  }

  /////// Helpers

  getAllIds(pages: { _id: string }[]) {
    return pages.map(p => p._id)
  }

  hashMetadataId(canonicalId: string) {
    return crypto.createHash('sha1').update(canonicalId).digest('hex')
  }

  /**
   * Assets must be uploaded separately, get the result to save to the page's field
   */
  async handleAsset(field: { _type: string; _sanityAsset: string }) {
    const imageToUpload = field._sanityAsset.replace(/^image@/, '');

    // Check if asset has already been uploaded, if it has use the same ref
    if (this.assetUploads[imageToUpload]) {
      console.log('\x1b[34m%s\x1b[0m', `\tUsing asset ${imageToUpload}`)

      return {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: this.assetUploads[imageToUpload]
        }
      }
    }

    console.log('\x1b[34m%s\x1b[0m', `\tUploading asset ${imageToUpload}`)

    let imgContentType = undefined
    const filename = imageToUpload.split('/').pop()

    // Fetch the image from url
    const imageBuffer = await fetch(imageToUpload)
      .then(resp => {
        imgContentType = resp.headers.get('content-type')
        return resp.arrayBuffer()
      })
      .then(respBuffer => Buffer.from(respBuffer))

    // Upload and get image document's id
    const refId = await this.client.assets
      .upload('image', imageBuffer, { contentType: imgContentType, filename })
      .then((document) => {
        // log in green
        console.log('\x1b[32m%s\x1b[0m', `\tImage ${document._id} (${document.originalFilename}) uploaded successfully!`)

        return document._id
      })
      .catch((error) => {
        console.error('\t!!!!! Upload failed:', error.message)
      })

    if (refId) {
      // track this to prevent re-uploads
      this.assetUploads[imageToUpload] = refId

      // Save to page document
      return {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: refId
        }
      }
    }
  }

  deepFlattenToObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, k) => {
      const pre = prefix.length ? prefix + '.' : '';

      if (typeof obj[k] === 'object' && obj[k] !== null) {
        Object.assign(acc, this.deepFlattenToObject(obj[k], pre + k));
      } else {
        acc[pre + k] = obj[k];
      }

      return acc;
    }, {});
  }
}

export const clientImporter = new ClientImporter()