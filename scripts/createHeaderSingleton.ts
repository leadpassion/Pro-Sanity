import { createScriptClient } from './helpers'

const client = createScriptClient('dev')

await client.delete('global-header')

client.create({
  _type: 'globalHeader',
  _id: 'global-header',
})
