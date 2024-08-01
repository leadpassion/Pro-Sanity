import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'b7pblshe',
  dataset: 'production',
  token:
    'skflTyVFLgmCw96bL2IRkYY2eERdZTRQZcD1BdnecJ0na6IdIftv4EN3fZetlM2jV6yOpEATtcHK19laVhctC1iVeEwwmfsMjshZGwub6eV61fPdOAmJ1SoaWBD4AXitteBm6pNDPCSdj1XXmOWqxPWtglzudpd6SrHhdCKeMRMZMjv99sj5',
  useCdn: false,
  apiVersion: '2023-05-03',
  perspective: 'raw',
})

const id = 'phrase.tmd.31cda12d'

client.delete(id).then((response) => {
  console.log('Document deleted:', response)
})
