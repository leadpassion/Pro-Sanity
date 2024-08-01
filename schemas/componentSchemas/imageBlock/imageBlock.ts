import { richImage } from '@/schemas/fields/richImage'
import { ImageIcon } from '@sanity/icons'

export const imageBlock = {
  ...richImage,
  name: 'imageBlock',
  title: 'Image Block',
  icon: ImageIcon,
}
