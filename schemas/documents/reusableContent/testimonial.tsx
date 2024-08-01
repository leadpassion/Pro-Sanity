import { language } from '@/schemas/fields/language'
import { CommentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { blockPreview } from 'sanity-pills'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'simpleRichText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'person' }, { type: 'company' }],
      // Required if overrideAttribution is false
      validation: (Rule) =>
        Rule.error().custom((field, context) => {
          const parent = context.parent as
            | { overrideAttribution: boolean }
            | undefined

          if (!parent?.overrideAttribution && !field) {
            return 'Author is required if you do not override attribution details'
          }

          return true
        }),
    }),

    // Manual override of author details
    // This should only be used for posts that are imported from Craft CMS,
    // where testimonial attribution deatils are hard-coded in the content.
    // TODO: Hide this field in the CMS UI after testing
    defineField({
      name: 'overrideAttribution',
      title: 'Override Attribution Details?',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'showStars',
      title: 'Show Stars?',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'attributionDetails',
      title: 'Attribution Details',
      type: 'string',
      hidden: ({ parent }) => !parent?.overrideAttribution,
    }),

    language,
  ],
  preview: {
    select: {
      body: 'body',
      firstName: 'author.firstName',
      lastName: 'author.lastName',
      authorTitle: 'author.title',
      attributionDetails: 'attributionDetails',
    },
    prepare({ body, firstName, lastName, attributionDetails }) {
      const subtitle =
        attributionDetails || [firstName, lastName].filter(Boolean).join(' ')
      return {
        title: blockPreview(body),
        subtitle,
      }
    },
  },
})
