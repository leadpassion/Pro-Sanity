import { heading } from '@/schemas/fields/heading'
import { language } from '@/schemas/fields/language'
import { ControlsIcon } from '@sanity/icons'
import { PiSquareHalfBottomDuotone } from 'react-icons/pi'
import { TbAlignBoxLeftTop, TbBoxAlignBottom, TbColumns3 } from 'react-icons/tb'
import { defineField, defineType } from 'sanity'
import { footerNavLink } from './footerNavLink'
import { navColumn } from './navColumn'

export const footer = defineType({
  name: 'footer',
  title: 'Global Footer Settings',
  icon: PiSquareHalfBottomDuotone,
  type: 'document',
  fields: [
    defineField({
      name: 'navColumns',
      title: 'Navigation Columns',
      type: 'array',
      of: [navColumn],
    }),
  ],
  preview: {
    select: {
      title: 'settingsDocumentName',
    },
    prepare: ({ title }) => ({
      title: title || 'Global Footer Settings',
    }),
  },
})
