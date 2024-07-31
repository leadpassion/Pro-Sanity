import { BlockContentIcon } from '@sanity/icons'
import { definePageComponent } from '../definePageComponent'
import { defineHeadingField } from '@/schemas/fields/defineHeadingField'
import { defineComplexComponentBodyField } from '@/schemas/fields/defineComplexComponentBodyField/defineComplexComponentBodyField'
import { defineField } from 'sanity'
import { defineEmbeddedFormField } from '@/schemas/fields/defineEmbeddedFormField'
import { trustBar } from '../trustBar'
import { basicText } from '../basicText'

export const heroWithForm = definePageComponent({
  name: 'heroWithForm',
  title: 'Hero with Sticky Form',
  description: 'A hero component with a form',
  icon: BlockContentIcon,
  fields: [
    defineHeadingField({
      defaultHeadingLevel: 'h1',
      defaultSize: 'display-xl',
    }),
    defineComplexComponentBodyField({
      name: 'body',
      allowedCtaTypes: ['link', 'internalLink', 'glassLinkCard'],
    }),
    defineField({
      name: 'underHeroBody',
      title: 'Under-Hero Body',
      description:
        'Content that appears directly below the hero, shifted left to avoid the form. This is meant to present a stylized trust bar.',
      type: 'array',
      of: [
        basicText,
        trustBar,
        { type: 'reference', to: [{ type: 'sharedComponent' }] },
      ],
    }),
    defineField({
      name: 'forms',
      title: 'Forms',
      description:
        'One or more forms to display in the hero. If multiple forms are provided, they will be displayed in tabs.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineEmbeddedFormField({
              name: 'embeddedForm',
              title: 'Form',
              allowedSubmitBehaviors: ['stayOnPage', 'otherRedirect'],
            }),
            defineField({
              name: 'tabTitle',
              title: 'Tab Title',
              type: 'string',
              description:
                'This will only be displayed if there are multiple forms.',
            }),
          ],
        },
      ],
      group: 'form',
    }),
  ],
  preview: {
    select: {
      heading: 'heading.text',
      heroBody: 'heroBody',
    },
    prepare: ({ heading, heroBody }) => ({
      title: 'Hero with Sticky Form',
      heading,
      heroBody,
    }),
  },
})
