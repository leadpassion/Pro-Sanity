import * as fs from 'fs'
import enCraftBrands from '@/scripts/data/craftExports/craftBrands.json'
import koCraftBrands from '@/scripts/data/craftExports/localization/craftBrandsKR.json'
import jpCraftBrands from '@/scripts/data/craftExports/localization/craftBrandsJP.json'
import { CraftBrand, ExportHandlers } from './craftTypes'
import { ExportBrands, craftIdToSanityId, getCraftAssetInfo } from './helpers'

const brands = []

// Note: brands -> companies are not translated

const duplicateBrands = {}
function combineBrands(localeBrand) {
  const matchingBrands = brands.filter(brand => brand.canonicalId === localeBrand.canonicalId || brand.slug === localeBrand.slug)
  if (!matchingBrands.length) {
    brands.push(localeBrand)
  } else if (localeBrand.canonicalId.toString() !== matchingBrands[0].canonicalId.toString()) {
    // Keep track of mismatched canonicalId to save to file for other imports
    duplicateBrands[localeBrand.canonicalId] = matchingBrands[0].canonicalId
  }
}

// Include unique brands that are only on Korean site
enCraftBrands.forEach(combineBrands)
// Include unique brands that are only on Korean site
koCraftBrands.forEach(combineBrands)
// Include unique brands that are only on Japanese site
jpCraftBrands.forEach(combineBrands)

const buildImportFile = () => {
  const exportHandlers: Partial<ExportHandlers> = {
    exportBrands: new ExportBrands('scripts/data/sanityImports/brands.ndjson'),
  }

  for (const [count, brand] of brands.entries()) {
    console.log(`Processing brand(${(count+1)}/${brands.length}): `, brand.title)

    if (duplicateBrands[brand.canonicalId]) {
      // log warning
      console.log('\x1b[33m%s\x1b[0m', `\tSkipping duplicate brand ${brand.title} (${brand.canonicalId})`)
      continue
    }

    const { url: logoUrl } = getCraftAssetInfo(brand.brandLogo[0]) || {
      url: '',
      altText: '',
    }

    const logotype = logoUrl
      ? {
          _type: 'logo',
          default: {
            _type: 'image',
            _sanityAsset: `image@${logoUrl}`,
          },
        }
      : undefined

    const company = {
      _id: craftIdToSanityId(brand.canonicalId),
      _type: 'company',
      name: brand.title,
      url: brand.urlField,
      logotype,
    }

    exportHandlers.exportBrands?.write(company)
  }

  for (const handler in exportHandlers) {
    if (exportHandlers.hasOwnProperty(handler)) {
      exportHandlers[handler as keyof ExportHandlers]!.save()
    }
  }

  // Write duplicate brands to misc file for other imports to reference
  console.log(`Writing ${Object.keys(duplicateBrands).length} duplicate brands by canonicalId to file`)
  const duplicatesWriteStream = fs.createWriteStream('scripts/data/misc/brandDuplicateIds.json', { encoding: 'utf8', autoClose: true })
  duplicatesWriteStream.write(JSON.stringify(duplicateBrands))
  duplicatesWriteStream.end()
}

buildImportFile()
