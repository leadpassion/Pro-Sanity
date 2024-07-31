import { ConditionalProperty, defineField } from 'sanity'
import { ArrowRightIcon } from '@sanity/icons'
import { CtaActionType } from '../../defineCtaActionOfType'
import { defineCtaField } from '../../defineCtaField'

interface CtaBarOptions {
  name?: string
  title?: string
  group?: string | string[]
  allowedCtaTypes: CtaActionType[]
  description?: string
  hidden?: ConditionalProperty
  maxCtas?: number
}

export const defineCtaBarField = (options?: CtaBarOptions) => {
  const {
    name = 'ctaBar',
    title = 'CTA Bar',
    group,
    allowedCtaTypes,
    description,
    hidden,
    maxCtas,
  } = options || {}

  return defineField({
    name,
    title,
    description,
    icon: ArrowRightIcon,
    type: 'object',
    hidden,
    group,
    options: {
      collapsed: false,
    },
    fields: [
      defineField({
        name: 'ctas',
        title: 'CTAs',
        type: 'array',
        of: [
          defineCtaField({
            name: 'localCta',
          }),
          {
            title: 'Shared CTA',
            type: 'reference',
            to: [{ type: 'cta' }],
            options: allowedCtaTypes
              ? {
                  filter: 'type in $types',
                  filterParams: {
                    types: allowedCtaTypes,
                  },
                }
              : undefined,
          },
        ],
        validation: maxCtas
          ? (Rule) =>
              Rule.max(maxCtas).error(`Only ${maxCtas} CTAs are allowed`)
          : undefined,
      }),
    ],
    preview: {
      select: {
        ctas: 'ctas',
      },
      prepare({ ctas }) {
        return {
          title: 'CTA Bar',
          ctas,
        }
      },
    },
    // components: {
    //   preview: PreviewCtaBar,
    // },
  })
}
