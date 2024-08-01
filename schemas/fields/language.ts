import {
  LANG_CODE_FIELD_NAME,
  supportedLanguages,
} from '@/lib/localization.config'
import { userIsAdministrator } from '@/utils'
import { TranslateIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export const language = defineField({
  name: LANG_CODE_FIELD_NAME,
  title: 'Language',
  type: 'string',
  icon: TranslateIcon,
  readOnly: ({ currentUser }) => !userIsAdministrator(currentUser),
  hidden: ({ currentUser }) => !userIsAdministrator(currentUser), // && if localization team ?
  options: {
    list: supportedLanguages.map(({ id, title }) => {
      return { value: id, title }
    }),
  },
})
