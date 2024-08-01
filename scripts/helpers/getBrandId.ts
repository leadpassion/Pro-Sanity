import duplicateIdMap from '@/scripts/data/misc/brandDuplicateIds.json'
import { craftIdToSanityId } from './craftIdToSanityId'

export function getBrandId(canonicalId: string | number) {
	if (duplicateIdMap[canonicalId]) {
		console.log('\x1b[33m%s\x1b[0m', `\t!!!!! duplicate brand with id ${canonicalId}: using ${duplicateIdMap[canonicalId]}`)
		return craftIdToSanityId(duplicateIdMap[canonicalId])
	}

	return craftIdToSanityId(canonicalId)
}