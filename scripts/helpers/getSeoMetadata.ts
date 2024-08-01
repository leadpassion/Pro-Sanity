import { getCraftAssetInfo } from './convertContentMatrixToPortableText/helpers/getCraftAssetInfo'

type CraftEntryWithSeo = {
	slug: string
	seoMetadata: {
		pageTitle: string
		pageDescription: string
		openGraphImage: Array<number>
		openGraphImageAlt: string
		robots: string
	}
} & Record<string, any>

export const getSeoMetadata = (entry: CraftEntryWithSeo, slugPrefix = '') => {
	const {
		pageTitle,
		pageDescription,
		openGraphImage,
		openGraphImageAlt,
		robots,
	} = entry.seoMetadata

	// Get the asset url
	const { url: assetUrl = '' } = getCraftAssetInfo(openGraphImage[0]) || { url: '' }
	const openGraphImageUrl = assetUrl?.split('?')[0]

	// Get noIndex and noFollow from robots value(s)
	let noIndex = false
	let noFollow = false
	const robotsValues = robots.split(',')
	robotsValues.forEach(rVal => {
		switch (rVal) {
			case 'all':
				// no op - both false
				break;
			case 'nofollow':
				noFollow = true
				break;
			case 'noindex':
				noIndex = true
				break;
			case 'none':
				noIndex = true
				noFollow = true
				break;
			default:
				console.log('\x1b[41m%s\x1b[0m', '!!!!! No matching robots value', rVal)
		}
	})

	return {
		slug: {
			current: `${slugPrefix}${entry.slug}`,
		},
		pageTitle,
		pageDescription,
		openGraphImage: openGraphImageUrl ? {
			_type: 'image',
			_sanityAsset: `image@${openGraphImageUrl}`,
			// altText: openGraphImageAlt || undefined, TODO - this is a media plugin field...?
		} : undefined,
		noIndex,
		noFollow,
	}
}