import {
  BlockContentIcon,
  ControlsIcon,
  ExpandIcon,
  ImageIcon,
  PanelLeftIcon,
  PanelRightIcon,
} from '@sanity/icons'
import {
  defineEyebrowField,
  defineHeadingField,
  defineComplexComponentBodyField,
  defineMaskableMediaFields,
  sharedComponentLayoutFields,
  sharedComponentSettingsFields,
  defineEmbeddedFormField,
} from '@/schemas/fields'
import { defineArrayMember, defineField } from 'sanity'
import { ctaCard } from './ctaCard/ctaCard'
import { GenericInputWithJsonView } from '@/components/GenericInputWithJsonView'
import { blockPreview } from 'sanity-pills'

export const hero = defineField({
  name: 'hero',
  title: 'Hero',
  icon: BlockContentIcon,
  description: 'A hero component',
  type: 'object',
  groups: [
    {
      name: 'left',
      title: 'Left',
      icon: PanelRightIcon,
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
      group: 'left',
    }),
    defineEyebrowField({
      title: 'Standard Eyebrow',
      fieldset: 'eyebrow',
      group: 'left',
      hidden: ({ parent }) => parent?.eyebrowType !== 'standard',
    }),
    defineField({
      name: 'pageSwitcherLinks',
      title: 'Page Switcher Links',
      type: 'array',
      hidden: ({ parent }) => parent?.eyebrowType !== 'pageSwitcher',
      fieldset: 'eyebrow',
      group: 'left',
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
    defineHeadingField({
      defaultHeadingLevel: 'h1',
      defaultSize: 'display-xl',
      group: 'left',
    }),
    defineComplexComponentBodyField({
      name: 'bodyLeft',
      title: 'Body (Left)',
      description:
        'This content is shown on the left side of the hero. If the alignment is set to center, this content will be centered.',
      group: 'left',
      allowedCtaTypes: [
        'link',
        'internalLink',
        'emailCapture',
        'playVideo',
        'glassLinkCard',
      ],
      customBodyComponentTypes: [ctaCard],
    }),

    // RIGHT
    defineField({
      name: 'rightContentType',
      title: 'Right Content Type',
      type: 'string',
      group: 'right',
      options: {
        list: [
          { title: 'Media', value: 'media' },
          { title: 'Standard Body', value: 'body' },
          { title: 'Form', value: 'form' },
        ],
      },
      hidden: ({ parent }) => parent?.alignment === 'vertical',
    }),
    ...defineMaskableMediaFields({
      group: 'right',
      hidden: ({ parent }) =>
        parent?.alignment === 'vertical' ||
        parent?.rightContentType !== 'media',
    }),
    defineComplexComponentBodyField({
      name: 'bodyRight',
      title: 'Body (Right)',
      group: 'right',
      allowedCtaTypes: [
        'link',
        'internalLink',
        'emailCapture',
        'playVideo',
        'glassLinkCard',
      ],
      customBodyComponentTypes: [ctaCard],
      hidden: ({ parent }) => parent?.rightContentType !== 'body',
    }),
    defineEmbeddedFormField({
      name: 'embeddedForm',
      title: 'Form',
      group: 'right',
      allowedSubmitBehaviors: ['stayOnPage', 'otherRedirect'],
      hidden: ({ parent }) => parent?.rightContentType !== 'form',
    }),

    // LAYOUT
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Side-By-Side', value: 'sideBySide' },
          { title: 'Vertical', value: 'vertical' },
        ],
      },
      initialValue: 'sideBySide',
    }),

    ...sharedComponentLayoutFields,
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
