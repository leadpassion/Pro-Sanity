// --------------------------------------------------------------------
// This script reads all files in the scripts/data/sanityImports folder
// and concatenates them into a single ndjson file called import.ndjson.
// This file can be used to import all documents into Sanity Studio.
// --------------------------------------------------------------------

import fs from 'fs'
import path from 'path'

const concatenateNdjsonFiles = async () => {
  // Import all documents in the scripts/data/sanityImports folder
  const files = fs.readdirSync('scripts/data/sanityImports', {
    withFileTypes: true,
  })

  const documents = await Promise.all(
    files.map(async (file: fs.Dirent) => {
      const data = fs.readFileSync(
        path.join('scripts/data/sanityImports', file.name),
        'utf8',
      )
      return data
    }),
  )

  console.log('\nWriting combined ndjson to ./import.ndjson...')
  fs.writeFileSync('import.ndjson', documents.join('\n'))
}

try {
  await concatenateNdjsonFiles()
  console.log('Successfully concatenated ndjson files!')
} catch (error) {
  console.error('Error concatenating ndjson files: ', error)
}
