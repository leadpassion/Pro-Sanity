import { FieldDefinition, defineField } from 'sanity'
import { Icon, iconIds } from '@/components/Icon'

const defaultIconFieldOptions = {
  collapsible: false,
  configurations: [
    {
      title: 'Braze Icons',
      provider: 'braze',
      icons: () =>
        iconIds.map((iconId) => ({
          name: iconId,
          component: () => (
            <Icon size={24} icon={iconId} style={{ marginTop: '0.25rem' }} />
          ),
          tags: [iconId],
        })),
    },
  ],
}

export const defineIconField = (
  fieldOptions: Partial<FieldDefinition> | void,
) => {
  const {
    name = 'icon',
    title = 'Icon',
    group,
    options = defaultIconFieldOptions,
    hidden,
    fieldset,
  } = fieldOptions || {}

  return defineField({
    name,
    title,
    type: 'iconPicker',
    group,
    fieldset,
    hidden,
    options,
    preview: {
      select: {
        provider: 'icon.provider',
        name: 'icon.name',
      },
      prepare(icon) {
        return {
          title: icon.provider,
          subtitle: icon.name,
        }
      },
    },
  })
}
