import { definePageComponent } from '../definePageComponent';
import { defineEyebrowField } from '../../fields/defineEyebrowField';
import { GoHeading } from 'react-icons/go';
import { defineHeadingField } from '../../fields/defineHeadingField';
import { defineField } from 'sanity';
import { ctaCard } from './ctaCard/ctaCard';
import { defineComplexComponentBodyField } from '../../fields/defineComplexComponentBodyField/defineComplexComponentBodyField';
import { defineRichImageField } from '@/schemas/fields/defineRichImageField';
import { blockPreview } from 'sanity-pills';

export const headingBlock = definePageComponent({
  name: 'headingBlock',
  title: 'Heading Block',
  description:
    'A heading block, including eyebrow, heading, subheading, and optional CTAs.',
  icon: GoHeading,
  fields: [
    defineRichImageField({
      name: 'image',
      title: 'Image',
      group: 'media'
    }),
    defineEyebrowField(),
    defineHeadingField({
      defaultHeadingLevel: 'h2',
      defaultSize: 'display-xl'
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'simpleRichText'
    }),
    defineComplexComponentBodyField({
      name: 'bodyLeft',
      title: 'Body',
      description:
        'This content is shown on the left side of the hero. If the alignment is set to center, this content will be centered.',
      group: 'left',
      allowedCtaTypes: [
        'link',
        'internalLink',
        'emailCapture',
        'playVideo',
        'glassLinkCard'
      ],
      customBodyComponentTypes: [ctaCard]
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
          { title: 'Split', value: 'split' }
        ]
      },
      initialValue: 'default'
    }),
    defineComplexComponentBodyField({
      name: 'bodyRight',
      title: 'Body Right',
      allowedCtaTypes: [],
      group: 'right',
      hidden: ({ parent }) => parent?.layout !== 'split'
    })
  ],
  preview: {
    select: {
      heading: 'heading.text'
    },
    prepare: ({ eyebrow, heading, subheading, ctas }) => {
      const headingString = blockPreview(heading);

      return {
        title: 'Heading Block',
        subtitle: headingString
      };
    }
  },
  components: {
    // preview: PreviewHeadingBlock,
  }
});
