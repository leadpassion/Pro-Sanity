import { ImageIcon } from '@sanity/icons'
import { defineRichImageField } from '@/schemas/fields'

export const imageBlock = defineRichImageField({
  name: 'imageBlock',
  title: 'Image Block',
  icon: ImageIcon,
})
