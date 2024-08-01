import { userIsAdministrator } from '@/utils'
import { EditIcon, HashIcon, WrenchIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { definePageBodyField } from '../../fields/definePageBodyField'
import { defineSeoField } from '@/schemas/fields/defineSeoField'
import { definePageType } from './definePageType'

export const personaPage = definePageType({
  name: 'personaPage',
  title: 'Persona Page',
})
