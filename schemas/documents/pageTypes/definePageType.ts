import { userIsAdministrator } from '@/utils'
import { EditIcon, HashIcon, TagIcon, WrenchIcon } from '@sanity/icons'
import {
  FieldDefinition,
  FieldGroupDefinition,
  defineField,
  defineType,
} from 'sanity'
import { definePageBodyField } from '../../fields/definePageBodyField'
import { defineSeoField } from '@/schemas/fields/defineSeoField'
import { defineLanguageField } from '@/schemas/fields/defineLanguageField'
import { LANG_CODE_FIELD_NAME } from '@/lib/localization.config'
import { defineCategoriesField } from '@/schemas/fields/defineCategoriesField'
import { singletonPageComponent } from '@/schemas/componentSchemas'
import { defineCalloutUIField } from '@/schemas/utilities'

interface PageTypeProps {
  name?: string
  title?: string
  description?: string
  icon?: any
  fields?: FieldDefinition[]
  groups?: FieldGroupDefinition[]
  slugPrefix?: string
  includeSlugPrefixInStoredValue?: boolean
}

export const definePageType = (props: PageTypeProps | void) => {
  const {
    name = 'page',
    title,
    description,
    icon,
    fields = [],
    groups = [],
    slugPrefix,
    includeSlugPrefixInStoredValue,
  } = props || {}

  return defineType({
    name,
    title,
    description,
    icon,
    type: 'document',
    groups: [
      {
        name: 'content',
        title: 'Content',
        icon: EditIcon,
        default: true,
      },
      ...groups,
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
    fields: [
      defineCalloutUIField({
        heading: 'This page is password protected',
        body: 'Visitors to this page will need to enter a password to view its contents. You can view the password set for this page in the Settings tab.',
        hidden: (props) =>
          !props.parent?.isPasswordProtected || !props.parent?.password,
        group: 'content',
      }),
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
        group: 'content',
      }),
      defineField({
        name: 'mandatoryBodyComponents',
        title: 'Mandatory Body Components',
        description:
          'These components are required on the page and can only be edited by an admin.',
        group: 'content',
        type: 'array',
        of: [singletonPageComponent],
        readOnly: (props) => {
          if (userIsAdministrator(props.currentUser)) {
            return false
          }
          return true
        },
        hidden: (props) => {
          return true

          // Always show this field to administrators
          if (userIsAdministrator(props.currentUser)) {
            return false
          }
          // Otherwise, hide it if there are no mandatory components
          return !props.value?.length
        },
      }),
      definePageBodyField(),
      ...fields,
      defineSeoField({
        slugPrefix,
        includeSlugPrefixInStoredValue,
      }),
      defineCategoriesField(),
      defineField({
        name: 'backgroundImage',
        title: 'Background Image',
        type: 'string',
        options: {
          list: [
            {
              title: 'Swoosh 1',
              value: 'swoosh1',
            },
            {
              title: 'Swoosh 2',
              value: 'swoosh2',
            },
          ],
        },
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
      defineField({
        name: 'isPasswordProtected',
        title: 'Password Protected?',
        description:
          'If checked, the page will require a password to view. (You must be an admin to edit this field.)',
        type: 'boolean',
        group: 'settings',
        initialValue: false,
        readOnly: (props) => {
          if (userIsAdministrator(props.currentUser)) {
            return false
          }

          return true
        },
      }),
      defineField({
        name: 'password',
        title: 'Password',
        description:
          'The password required to view the page. (You must be an admin to edit this field.)',
        type: 'string',
        group: 'settings',
        hidden: (props) => !props.parent?.isPasswordProtected,
        validation: (Rule) =>
          Rule.error().custom((value, context) => {
            const parent = context.parent as any

            if (parent.isPasswordProtected && !value) {
              return 'Password is required'
            }

            return true
          }),
        readOnly: (props) => {
          if (userIsAdministrator(props.currentUser)) {
            return false
          }

          return true
        },
      }),
    ],
    preview: {
      select: {
        title: 'title',
        internalName: 'internalName',
        slug: 'seo.slug.current',
        mandatoryBodyComponents: 'mandatoryBodyComponents',
        body: 'body',
        language: LANG_CODE_FIELD_NAME,
      },
      prepare: ({
        title,
        internalName,
        slug,
        mandatoryBodyComponents,
        body,
        language,
      }) => {
        const wholeBody = [...(mandatoryBodyComponents || []), ...(body || [])]
        const media = undefined;
        const slugPreview = slug ? `${slug}` : 'Not published'
        const subtitle = [language, slugPreview].filter(Boolean).join(' | ')

        return {
          title: internalName || title,
          subtitle,
          media,
        }
      },
    },
  })
}
