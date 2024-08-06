import { GenericInputWithJsonView } from '@/components/GenericInputWithJsonView'
import { complexComponentBody } from '@/schemas/fields'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { sharedComponentSettingsFields } from '@/schemas/fields/sharedComponentSettingsFields'
import {
  BlockContentIcon,
  ControlsIcon,
  ExpandIcon,
  PanelRightIcon,
} from '@sanity/icons'
import { defineArrayMember, defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'
import { ctaCard } from './ctaCard/ctaCard'
import { tokenReference } from '@/schemas/fields/tokenReference'
import { trustBar } from './trustBar'

export const heroMarquee = defineField({
  name: 'heroMarquee',
  title: 'Hero (Marquee Video)',
  icon: BlockContentIcon,
  description: 'A hero with background video',
  type: 'object',
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: PanelRightIcon,
      default: true,
    },
    {
      name: 'layout',
      title: 'Layout',
      icon: ExpandIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: ControlsIcon,
    },
  ],
  fieldsets: [
    {
      name: 'eyebrow',
      title: 'Eyebrow',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    // LEFT
    defineField({
      name: 'eyebrowType',
      title: 'Eyebrow Type',
      type: 'string',
      options: {
        list: [
          { title: 'Standard Eyebrow', value: 'standard' },
          { title: 'Page Switcher', value: 'pageSwitcher' },
          { title: 'None', value: 'none' },
        ],
      },
      initialValue: 'standard',
      fieldset: 'eyebrow',
      group: 'content',
    }),
    {
      ...eyebrow,
      title: 'Standard Eyebrow',
      fieldset: 'eyebrow',
      group: 'content',
      hidden: ({ parent }) => parent?.eyebrowType !== 'standard',
    },
    defineField({
      name: 'pageSwitcherLinks',
      title: 'Page Switcher Links',
      type: 'array',
      hidden: ({ parent }) => parent?.eyebrowType !== 'pageSwitcher',
      fieldset: 'eyebrow',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'pageLink',
          title: 'Page Link',
          type: 'object',
          fields: [
            defineField({
              name: 'page',
              title: 'Page',
              type: 'reference',
              to: [{ type: 'page' }],
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    {
      ...heading,
      group: 'content',
      initialValue: {
        headingLevel: 'h1',
        headingSize: '2xl',
      },
    },
    {
      ...complexComponentBody,
      name: 'body',
      title: 'Body',
      description:
        'This content is shown on the left side of the hero. If the alignment is set to center, this content will be centered.',
      group: 'content',
      of: [...complexComponentBody.of, ctaCard],
      options: {
        allowedCtaTypes: [
          'link',
          'internalLink',
          'emailCapture',
          'playVideo',
          'glassLinkCard',
        ],
      },
    },

    defineField({
      name: 'trustbar',
      title: 'Trustbar',
      group: 'content',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [],
              of: [tokenReference],
            }),
          ],
        }),
        defineField({
          name: 'trustbars',
          title: 'Trustbars',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  ...trustBar,
                }),
                defineField({
                  name: 'token',
                  title: 'Token',
                  type: 'reference',
                  to: [{ type: 'token' }],
                }),
              ],
              options: {
                collapsible: false,
              },
            }),
          ],
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),

    defineField({
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'video',
      group: 'layout',
    }),
    ...sharedComponentSettingsFields,
  ],
  preview: {
    select: {
      heading: 'heading.text',
    },
    prepare: ({ heading }) => {
      const headingString = heading ? blockPreview(heading) : 'No heading'

      return {
        title: 'Hero',
        subtitle: headingString,
      }
    },
  },
  components: {
    input: GenericInputWithJsonView,
  },
})
