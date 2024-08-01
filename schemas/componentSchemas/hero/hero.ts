import { GenericInputWithJsonView } from '@/components/GenericInputWithJsonView'
import { complexComponentBody } from '@/schemas/fields'
import { simpleEmbeddedForm } from '@/schemas/fields/embeddedForm/simpleEmbeddedForm'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { richImage } from '@/schemas/fields/richImage'
import { sharedComponentLayoutFields } from '@/schemas/fields/sharedComponentLayoutFields'
import { sharedComponentSettingsFields } from '@/schemas/fields/sharedComponentSettingsFields'
import {
  BlockContentIcon,
  ControlsIcon,
  ExpandIcon,
  ImageIcon,
  PanelLeftIcon,
  PanelRightIcon,
} from '@sanity/icons'
import { defineArrayMember, defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'
import { ctaCard } from './ctaCard/ctaCard'

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
    {
      ...eyebrow,
      title: 'Standard Eyebrow',
      fieldset: 'eyebrow',
      group: 'left',
      hidden: ({ parent }) => parent?.eyebrowType !== 'standard',
    },
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
    {
      ...heading,
      group: 'left',
      initialValue: {
        headingLevel: 'h1',
        headingSize: 'display-xl',
      },
    },
    {
      ...complexComponentBody,
      name: 'bodyLeft',
      title: 'Body (Left)',
      description:
        'This content is shown on the left side of the hero. If the alignment is set to center, this content will be centered.',
      group: 'left',
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

    // Maskable Media Fields
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      hidden: ({ parent }) =>
        parent?.alignment === 'vertical' ||
        parent?.rightContentType !== 'media',
      options: {
        list: [
          {
            title: 'Image',
            value: 'image',
          },
          {
            title: 'Image Gallery',
            value: 'imageGallery',
          },
          {
            title: 'Video',
            value: 'video',
          },
          {
            title: 'Testimonials',
            value: 'testimonials',
          },
          {
            title: 'None',
            value: 'none',
          },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
    }),
    defineField({
      ...richImage,
      name: 'image',
      title: 'Image',
      group: 'right',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByParent =
          parent?.alignment === 'vertical' ||
          parent?.rightContentType !== 'media'

        const hiddenByThis = parent.mediaType !== 'image'

        return hiddenByParent || hiddenByThis
      },
    }),
    defineField({
      name: 'imageGalleryImages',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      group: 'right',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByParent =
          parent?.alignment === 'vertical' ||
          parent?.rightContentType !== 'media'

        const hiddenByThis = parent.mediaType !== 'imageGallery'

        return hiddenByParent || hiddenByThis
      },
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'reference',
      to: [{ type: 'video' }],
      group: 'right',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByParent =
          parent?.alignment === 'vertical' ||
          parent?.rightContentType !== 'media'

        const hiddenByThis = context.parent.mediaType !== 'video'

        return hiddenByParent || hiddenByThis
      },
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimonial' }],
        },
      ],
      group: 'right',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByParent =
          parent?.alignment === 'vertical' ||
          parent?.rightContentType !== 'media'

        const hiddenByThis = context.parent.mediaType !== 'testimonials'

        return hiddenByParent || hiddenByThis
      },
    }),
    defineField({
      name: 'mask',
      title: 'Mask',
      type: 'string',
      options: {
        list: [
          {
            title: 'None',
            value: 'none',
          },
          {
            title: 'Swoosh 1',
            value: 'swoosh1',
          },
          {
            title: 'Swoosh 2',
            value: 'swoosh2',
          },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'none',
      group: 'right',
      hidden: (context) => {
        const parent = context.parent

        const hiddenByParent =
          parent?.alignment === 'vertical' ||
          parent?.rightContentType !== 'media'

        const hiddenByThis = ['none', 'imageGallery', 'tesimonials'].includes(
          context.parent.mediaType,
        )
        return hiddenByParent || hiddenByThis
      },
    }),

    {
      ...complexComponentBody,
      name: 'bodyRight',
      title: 'Body (Right)',
      group: 'right',
      of: [...complexComponentBody.of, ctaCard],
      hidden: ({ parent }) => parent?.rightContentType !== 'body',
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

    {
      ...simpleEmbeddedForm,
      name: 'embeddedForm',
      title: 'Form',
      group: 'right',
      hidden: ({ parent }) => parent?.rightContentType !== 'form',
    },

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
