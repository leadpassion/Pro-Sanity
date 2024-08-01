import craftPartners from '@/scripts/data/craftExports/craftPartners.json'
import craftTags from '@/scripts/data/craftExports/craftTags.json'
import craftBrands from '@/scripts/data/craftExports/craftBrands.json'
import { craftIdToSanityId, createScriptClient } from './helpers'
import fs from 'fs'

const payloadsToSave = []

for (const partner of craftPartners) {
  const brand = craftBrands.find(
    (brand) => brand.canonicalId === partner.brand[0],
  )

  const headquartersTagId = partner.headquarters[0]

  if (!headquartersTagId) continue

  const headquartersTag = craftTags.find(
    (tag) => tag.canonicalId === headquartersTagId,
  )

  if (!headquartersTag) continue

  const payload = {
    _id: craftIdToSanityId(brand.canonicalId),
    location: headquartersTag.title,
  }

  payloadsToSave.push(payload)
}

const client = createScriptClient('dev')

for (const payload of payloadsToSave) {
  client.patch(payload._id).set(payload).commit()
}
