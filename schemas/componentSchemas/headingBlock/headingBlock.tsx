import { complexComponentBody } from '@/schemas/fields'
import { ctaBar } from '@/schemas/fields/complexComponentBody/ctaBar/ctaBar'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { richImage } from '@/schemas/fields/richImage'
import { GoHeading } from 'react-icons/go'
import { defineField } from 'sanity'
import { blockPreview } from 'sanity-pills'
import { definePageComponent } from '../definePageComponent'

export const headingBlock = definePageComponent({
  name: 'headingBlock',
  title: 'Heading Block',
  description:
    'A heading block, including eyebrow, heading, subheading, and optional CTAs.',
  icon: GoHeading,
  fields: [
    {
      ...richImage,
      name: 'image',
      title: 'Image',
      group: 'media',
    },
    eyebrow,
    {
      ...heading,
      initialValue: {
        headingLevel: 'h2',
        headingSize: 'display-xl',
      },
    },
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'simpleRichText',
    }),
    {
      ...ctaBar,
      options: {
        allowedCtaTypes: ['link', 'internalLink', 'download', 'emailCapture'],
      },
    },
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Offset', value: 'offset' },
          { title: 'Split', value: 'split' },
        ],
      },
      initialValue: 'default',
    }),
    {
      ...complexComponentBody,
      name: 'bodyRight',
      title: 'Body Right',
      group: 'right',
      hidden: ({ parent }) => parent?.layout !== 'split',
    },
  ],
  preview: {
    select: {
      heading: 'heading.text',
    },
    prepare: ({ heading }) => {
      const headingString = blockPreview(heading)

      return {
        title: 'Heading Block',
        subtitle: headingString,
      }
    },
  },
  components: {
    // preview: PreviewHeadingBlock,
  },
})
