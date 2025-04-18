import { internalLink } from '@/schemas/fields/linkTypes/internalLink'
import { link } from '@/schemas/fields/linkTypes/link'
import { eyebrow } from '@/schemas/fields/eyebrow'
import { heading } from '@/schemas/fields/heading'
import { GoHeading } from 'react-icons/go'
import { defineField, defineArrayMember } from 'sanity'
import { tokenReference } from '@/schemas/fields/tokenReference'
import { blockPreview } from 'sanity-pills'
import { definePageComponent } from '../definePageComponent'
import { ctaBar } from '@/schemas/fields/complexComponentBody/ctaBar/ctaBar'

export const headingBlock = definePageComponent({
  name: 'headingBlock',
  title: 'Heading Block',
  description:
    'A heading block, including eyebrow, heading, subheading, and optional CTAs.',
  icon: GoHeading,
  fields: [
    eyebrow,
    {
      ...heading,
      initialValue: {
        headingLevel: 'h2',
        headingSize: '2xl',
      },
    },
    defineField({
      name: 'body',
      title: 'body',
      description:
        'This content is shown on the left side of the hero. If the alignment is set to center, this content will be centered.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [],
          marks: {
            annotations: [link, internalLink],
          },
          of: [tokenReference],
        }),
        {
          ...ctaBar,
          description:
            'These CTAs will be displayed below the subheading and above the CTA cards.',
          options: {
            allowedCtaTypes: [
              'link',
              'internalLink',
              'download',
              'emailCapture',
            ],
          },
        },
      ],
      group: 'content',
    }),
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
