import { CraftPartner } from './craftTypes'
import craftPartners from './data/craftExports/craftPartners.json'
import { createScriptClient } from './helpers'

const client = createScriptClient('dev')

const query = `*[_type == "technologyPartner"]{ _id, integrationPartnerId }`

const partners = craftPartners as unknown as CraftPartner[]
const partnersWithIntegrationPartnerIds = partners.filter(
  (partner) => partner.integrationPartnerId,
)

const getTechPartners = async () => {
  const techPartners = await client.fetch(query)
  return techPartners
}

const main = async () => {
  const techPartners = await getTechPartners()
  techPartners.forEach(async (techPartner) => {
    // If the partner already has an integrationPartnerId, skip it
    if (techPartner.integrationPartnerId) {
      return
    }

    // If the partner
  })
}
