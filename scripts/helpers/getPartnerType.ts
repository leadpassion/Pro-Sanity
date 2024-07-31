import { CraftPartner, CraftPartnerType } from '../craftTypes'

const craftPartnerTypeCategoryIds: { [key: string]: CraftPartnerType } = {
  '1143': 'solutions',
  '1144': 'technology',
}

export const getPartnerType = (
  partner: CraftPartner,
): CraftPartnerType | undefined => {
  if (partner.partnerCategories.length === 0) {
    console.log(`Partner ${partner.title} has no partner categories`)
    return undefined
  }

  const partnerTypeCategoryId = String(partner.partnerCategories[0])

  return craftPartnerTypeCategoryIds[partnerTypeCategoryId]
}
