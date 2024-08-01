import { seo } from '@/schemas/fields/seo'
import { genericPage } from './definePageType'

export const personaPage = {
  ...genericPage,
  name: 'personaPage',
  title: 'Persona Page',
  fields: [...genericPage.fields, seo],
}
