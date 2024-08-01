import { complexComponentBody } from '@/schemas/fields'
import { simpleEmbeddedForm } from '@/schemas/fields/embeddedForm/simpleEmbeddedForm'
import { heading } from '@/schemas/fields/heading'
import { BlockContentIcon } from '@sanity/icons'
import { defineField } from 'sanity'
import { basicText } from '../basicText'
import { definePageComponent } from '../definePageComponent'
import { trustBar } from '../trustBar'

export const heroWithForm = definePageComponent({
  name: 'heroWithForm',
  title: 'Hero with Sticky Form',
  description: 'A hero component with a form',
  icon: BlockContentIcon,
  fields: [
    {
      ...heading,
      initialValue: {
        headingLevel: 'h1',
        headingSize: 'display-xl',
      },
    },
    {
      ...complexComponentBody,
      options: {
        allowedCtaTypes: ['link', 'internalLink', 'glassLinkCard'],
      },
    },
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
            simpleEmbeddedForm,
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
