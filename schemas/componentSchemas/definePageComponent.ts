import {
  CogIcon,
  EditIcon,
  ExpandIcon,
  ImageIcon,
  PanelLeftIcon,
} from '@sanity/icons'
import { FieldDefinition, FieldGroup, PreviewConfig, defineField } from 'sanity'
import { sharedComponentLayoutFields } from '../fields/sharedComponentLayoutFields'
import { sharedComponentSettingsFields } from '../fields/sharedComponentSettingsFields'
import { ComponentType, ReactNode } from 'react'
import { GenericInputWithJsonView } from '@/components/GenericInputWithJsonView'
import { TbForms } from 'react-icons/tb'

interface FieldDefinitionOptions {
  name: string
  title: string
  description: string
  type?: string
  icon?: ReactNode | ComponentType
  groups?: FieldGroup[]
  fieldsets?: {
    name: string
    title: string
    options?: { collapsible: boolean; collapsed: boolean }
  }[]
  fields?: FieldDefinition[]
  preview?: PreviewConfig
  components?: any
}

export const definePageComponent = ({
  name,
  title,
  description,
  groups = [],
  fieldsets = [],
  fields = [],
  preview,
  components,
  icon,
  type = 'object',
}: FieldDefinitionOptions) => {
  return defineField({
    name,
    title,
    description,
    icon,
    type,
    preview,
    components: {
      ...components,
      // input: GenericInputWithJsonView,
    },
    groups: [
      {
        name: 'content',
        title: 'Content',
        icon: EditIcon,
        default: true,
      },
      {
        name: 'right',
        title: 'Right',
        icon: PanelLeftIcon,
      },
      {
        name: 'media',
        title: 'Media',
        icon: ImageIcon,
      },
      {
        name: 'form',
        title: 'Form',
        icon: TbForms,
      },
      {
        name: 'layout',
        title: 'Layout',
        icon: ExpandIcon,
      },
      {
        name: 'settings',
        title: 'Settings',
        icon: CogIcon,
      },
      ...groups,
    ],
    fieldsets,
    fields: [
      ...fields.map((field) => ({
        ...field,
        group: field.group ? field.group : 'content',
      })),
      ...sharedComponentLayoutFields,
      ...sharedComponentSettingsFields,
    ],
  })
}
