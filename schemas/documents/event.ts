// –------------------------------------------------
// EVENT (document)
//
// Contains details about an event. This is distinct
// from a webinar.
//
// –------------------------------------------------

import {
  CalendarIcon,
  EditIcon,
  HashIcon,
  TagIcon,
  WrenchIcon,
} from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { defineSeoField } from '../fields/defineSeoField'
import { defineLanguageField } from '@/schemas/fields/defineLanguageField'
import { defineEmbeddedFormField } from '../fields/defineEmbeddedFormField'
import { TbForms } from 'react-icons/tb'
import { defineCategoriesField } from '../fields/defineCategoriesField'
import { defineTimezoneField } from '../fields/defineTimezoneField'
import { definePageBodyField } from '../fields'

export const event = defineType({
  name: 'event',
  title: 'Event',
  icon: CalendarIcon,
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: EditIcon,
      default: true,
    },
    {
      name: 'form',
      title: 'Form',
      icon: TbForms,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: HashIcon,
    },
    {
      name: 'categories',
      title: 'Categories',
      icon: TagIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: WrenchIcon,
    },
  ],
  fieldsets: [
    {
      name: 'datetime',
      title: 'Date and Time',
      options: { collapsible: true, collapsed: false, columns: 2 },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'content',
      fieldset: 'datetime',
    }),
    defineTimezoneField({
      group: 'content',
      fieldset: 'datetime',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleRichTextWithImages',
      group: 'content',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'content',
    }),
    defineField({
      name: 'presenters',
      title: 'Presenters',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      group: 'content',
    }),
    definePageBodyField(),
    defineEmbeddedFormField({
      group: 'form',
      allowedSubmitBehaviors: ['stayOnPage', 'thankYouPage', 'otherRedirect'],
    }),
    definePageBodyField({
      name: 'thankYouPageBody',
      title: 'Thank You Page Body',
      group: 'form',
      hidden: ({ parent }) => {
        return !parent?.embeddedForm?.submitBehavior?.includes('thankYouPage')
      },
    }),
    defineCategoriesField(),
    defineSeoField({
      name: 'seo',
      title: 'SEO Settings',
      group: 'seo',
      slugPrefix: 'resources/webinars-and-events',
      includeSlugPrefixInStoredValue: false,
    }),
    // SETTINGS
    defineField({
      name: 'hideFromListing',
      title: 'Hide from Listing?',
      description:
        'Prevent this case study from appearing in content listings.',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      group: 'settings',
    }),
    defineLanguageField({
      group: 'settings',
    }),
  ],
})
