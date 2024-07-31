import { defineField } from 'sanity'
import { defineEyebrowField } from '../../fields/defineEyebrowField'
import { defineComplexComponentBodyField } from '../../fields/defineComplexComponentBodyField'
import { definePageComponent } from '../definePageComponent'
import { defineHeadingField } from '../../fields/defineHeadingField'
import { defineMaskableMediaFields } from '../../fields/defineMaskableMediaField'
import { blockPreview } from 'sanity-pills'
import { GoColumns } from 'react-icons/go'

export const switchback = definePageComponent({
  name: 'switchback',
  title: 'Switchback',
  icon: GoColumns,
  description:
    'A switchback is a component that alternates between an image or video and a block of text.',
  fields: [
    defineEyebrowField({
      group: 'content',
    }),
    defineHeadingField({
      group: 'content',
      defaultHeadingLevel: 'h3',
      defaultSize: 'display-lg',
    }),
    defineComplexComponentBodyField({ group: 'content' }),
    defineField({
      name: 'mediaSide',
      title: 'Media Side',
      type: 'string',
      options: {
        list: ['left', 'right'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'right',
      group: ['media', 'layout'],
    }),
    ...defineMaskableMediaFields({ group: 'media' }),
  ],
  preview: {
    select: {
      eyebrow: 'eyebrow.text',
      heading: 'heading.text',
      media: 'media',
    },
    prepare({ eyebrow, heading, media }) {
      const title = blockPreview(heading)
      const subtitle = blockPreview(eyebrow)

      return {
        title,
        subtitle,
        media: media?.mediaType === 'image' ? media?.image : null,
      }
    },
  },
})
