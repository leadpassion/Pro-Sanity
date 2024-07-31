import {
  CogIcon,
  EditIcon,
  HashIcon,
  JoystickIcon,
  TagIcon,
} from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { defineSeoField } from '../fields/defineSeoField'
import { RESOURCE_TYPES } from '@/lib'
import { defineLanguageField } from '@/schemas/fields/defineLanguageField'
import { defineCategoriesField } from '../fields/defineCategoriesField'
import { definePageBodyField } from '../fields'
import { userIsAdministrator } from '@/utils'

export const technologyPartner = defineType({
  name: 'technologyPartner',
  title: 'Technology Partner',
  type: 'document',
  icon: JoystickIcon,
  groups: [
    {
      title: 'Basics',
      name: 'basics',
      icon: EditIcon,
      default: true,
    },
    {
      title: 'Categories',
      name: 'categories',
      icon: TagIcon,
    },
    {
      title: 'SEO',
      name: 'seo',
      icon: HashIcon,
    },
    {
      title: 'Settings',
      name: 'settings',
      icon: CogIcon,
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'basics',
    },
    {
      name: 'company',
      title: 'Company',
      description: 'The company that is this technology partner.',
      type: 'reference',
      to: [{ type: 'company' }],
      group: 'basics',
    },
    {
      name: 'documentationUrl',
      title: 'Documentation URL',
      description: 'The URL to the documentation for this partner.',
      type: 'url',
      group: 'basics',
    },
    {
      name: 'whatIsIt',
      title: 'What is it?',
      type: 'complexRichText',
      group: 'basics',
    },
    {
      name: 'howWeWorkTogether',
      title: 'How we work together',
      type: 'complexRichText',
      group: 'basics',
    },
    {
      name: 'featuredContent',
      title: 'Featured Content',
      type: 'reference',
      to: RESOURCE_TYPES.map((type) => ({ type })),
      group: 'basics',
    },
    definePageBodyField({
      group: 'basics',
      // TODO: Remove this once we have page bodies implemented for partners
      hidden: true,
    }),
    defineCategoriesField(),
    defineSeoField({
      name: 'seo',
      title: 'SEO Settings',
      group: 'seo',
    }),
    defineLanguageField({
      group: 'settings',
    }),
    defineField({
      name: 'integrationPartnerId',
      title: 'Integration Partner ID',
      description:
        'This ID is used to populate data about this partner in the Braze dashboard.',
      type: 'string',
      group: 'settings',
      readOnly: (context) => {
        const { currentUser } = context

        if (userIsAdministrator(currentUser)) {
          return false
        }

        return true
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'language',
      media: 'company.logotype.default',
    },
  },
})
