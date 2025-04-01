import ndjson from 'ndjson'
import fs from 'fs'

const tempArr = []
let bandwidthInBytes = 0

const seenDomains = new Set()

console.log('start parsing')

fs.createReadStream('scripts/data/misc/logs.ndjson')
  .pipe(ndjson.parse())
  .on('data', (obj) => {
    const domain = obj.attributes.sanity.domain
    const url = obj.body.url

    if (domain === 'cdn' && url.includes('mp4')) {
      tempArr.push(obj)
      bandwidthInBytes += obj.body.responseSize
      bandwidthInBytes += obj.body.requestSize
    }
  })
  .on('end', () => {
    console.log('done parsing')
    console.log('tempArr.length', tempArr.length)
    const bandwidthInGBs = bandwidthInBytes / 1024 / 1024 / 1024
    console.log('bandwidthInGBs', bandwidthInGBs)
    console.log('seen domains', seenDomains)
    console.log(tempArr[0])
  })
