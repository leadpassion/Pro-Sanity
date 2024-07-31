import { defineField } from 'sanity'

const REFERENCABLE_TYPES = ['report', 'blogPost', 'pressRelease']

export const awardField = defineField({
  name: 'award',
  type: 'object',
  fields: [
    defineField({
      name: 'award',
      type: 'reference',
      description:
        'The report, blog post, or press release that this award is associated with.',
      to: REFERENCABLE_TYPES.map((type) => ({ type })),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      description:
        'If provided, the CTA button will link to this URL instead of related content.',
      type: 'url',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      description: 'The text for the CTA button.',
      type: 'string',
      initialValue: 'Download Report',
    }),
    defineField({
      name: 'company',
      title: 'Awarding Company',
      description: 'The company that gave the award.',
      type: 'reference',
      to: [{ type: 'company' }],
      options: {
        // Looking at the Sanity source code, this works as expected
        // even though it's not in the documentation.
        // @ts-expect-error
        sort: [{ field: 'isAwardGiver', direction: 'asc' }],
      },
    }),
    defineField({
      name: 'awardImage',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'simpleRichText',
    }),
  ],
  preview: {
    select: {
      title: 'award.title',
      subtitle: 'company.name',
      media: 'awardImage',
    },
  },
})
