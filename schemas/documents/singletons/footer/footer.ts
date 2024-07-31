import { defineHeadingField } from '@/schemas/fields/defineHeadingField'
import { ControlsIcon } from '@sanity/icons'
import { PiSquareHalfBottomDuotone } from 'react-icons/pi'
import { defineField, defineType } from 'sanity'
import { navColumn } from './navColumn'
import { footerNavLink } from './footerNavLink'
import { TbAlignBoxLeftTop, TbBoxAlignBottom, TbColumns3 } from 'react-icons/tb'
import { defineLanguageField } from '@/schemas/fields'

export const footer = defineType({
  name: 'footer',
  title: 'Global Footer Settings',
  icon: PiSquareHalfBottomDuotone,
  type: 'document',
  groups: [
    {
      name: 'headingAndSocial',
      title: 'Heading & Social Links',
      icon: TbAlignBoxLeftTop,
      default: true,
    },
    {
      name: 'navigationColumns',
      title: 'Navigation Columns',
      icon: TbColumns3,
    },
    {
      name: 'bottomRow',
      title: 'Bottom Row',
      icon: TbBoxAlignBottom,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: ControlsIcon,
    },
  ],
  fieldsets: [
    {
      name: 'socialLinks',
      title: 'Social Links',
      options: { collapsible: true, collapsed: false, columns: 3 },
    },
  ],
  fields: [
    // HEADING & SOCIAL LINKS
    defineHeadingField({
      group: 'headingAndSocial',
      defaultHeadingLevel: 'h2',
      defaultSize: 'display-lg',
    }),
    defineField({
      name: 'instagramLink',
      title: 'Instagram',
      type: 'url',
      group: 'headingAndSocial',
      fieldset: 'socialLinks',
    }),
    defineField({
      name: 'xLink',
      title: 'X',
      type: 'url',
      group: 'headingAndSocial',
      fieldset: 'socialLinks',
    }),
    defineField({
      name: 'linkedInLink',
      title: 'LinkedIn',
      type: 'url',
      group: 'headingAndSocial',
      fieldset: 'socialLinks',
    }),

    // Navigation Columns
    defineField({
      name: 'navColumns',
      title: 'Navigation Columns',
      type: 'array',
      of: [navColumn],
      group: 'navigationColumns',
    }),

    // BOTTOM ROW
    defineField({
      name: 'bottomRow',
      title: 'Bottom Row',
      type: 'array',
      of: [footerNavLink],
      group: 'bottomRow',
    }),

    // SETTINGS
    defineField({
      name: 'settingsDocumentName',
      title: 'Settings Document Name',
      type: 'string',
      group: 'settings',
      hidden: true,
    }),
    defineLanguageField({ group: 'settings' }),
  ],
  preview: {
    select: {
      title: 'settingsDocumentName',
      language: 'language',
    },
    prepare: ({ title, language }) => ({
      title: title || 'Global Footer Settings',
      subtitle: language || 'Language not set',
    }),
  },
})
