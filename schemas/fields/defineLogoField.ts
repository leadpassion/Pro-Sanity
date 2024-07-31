// –------------------------------------------------
// LOGO (field)
//
// This custom field type consolidates the different versions
// of a brand asset such as a logo or icon. It includes the
// versions for light and dark backgrounds, and an option to
// specify the default version.
//
// –------------------------------------------------

import { ConditionalProperty, defineField } from 'sanity'

interface LogoFieldOptions {
  name?: string
  title?: string
  group?: string
  hidden?: ConditionalProperty
}

export const defineLogoField = (props: LogoFieldOptions | void) => {
  const { name = 'logo', title = 'Logo', group, hidden } = props || {}
  return defineField({
    name,
    title,
    type: 'object',
    group,
    hidden,
    fields: [
      defineField({
        name: 'onLight',
        title: 'On Light',
        type: 'image',
      }),
      defineField({
        name: 'onDark',
        title: 'On Dark',
        type: 'image',
      }),
      defineField({
        name: 'default',
        title: 'Default',
        type: 'image',
      }),
    ],
  })
}
