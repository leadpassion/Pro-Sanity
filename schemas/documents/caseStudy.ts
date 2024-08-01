import { LANG_CODE_FIELD_NAME } from '@/lib/localization.config'
import { categories } from '@/schemas/fields/categories'
import { language } from '@/schemas/fields/language'
import { metric } from '@/schemas/fields/metric'
import { publicationDates } from '@/schemas/fields/publicationDates'
import { seo } from '@/schemas/fields/seo'
import {
  BarChartIcon,
  EditIcon,
  HashIcon,
  TagIcon,
  WrenchIcon,
} from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { richImage } from '../fields/richImage'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: BarChartIcon,
  groups: [
    {
      name: 'content',
      title: 'Content',
      icon: EditIcon,
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: HashIcon,
    },
    {
      name: 'categories',
      title: 'Categories',
      icon: TagIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: WrenchIcon,
    },
  ],
  fieldsets: [
    { name: 'overview', title: 'Overview', options: { collapsible: true } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'This title will be displayed on the site.',
      type: 'string',
      group: 'content',
      validation: (Rule) =>
        Rule.required().error('You must provide a title for this case study.'),
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }],
      group: 'content',
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      description: 'The partners who helped with this case study.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'technologyPartner' }, { type: 'solutionsPartner' }],
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'text',
      rows: 4,
      group: 'content',
      fieldset: 'overview',
    }),
    defineField({
      name: 'strategy',
      title: 'Strategy',
      type: 'text',
      rows: 4,
      group: 'content',
      fieldset: 'overview',
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'text',
      rows: 4,
      group: 'content',
      fieldset: 'overview',
    }),

    // Metrics
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [metric],
      group: 'content',
      // Can have between 0 and 3 metrics
      validation: (Rule) =>
        Rule.max(3).error('You can only have up to 3 metrics.'),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'complexRichText',
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'A brief summary of the content.',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'takeaway',
          type: 'object',
          fields: [
            {
              name: 'point',
              title: 'Point',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'simpleRichText',
            },
          ],
        }),
      ],
    }),
    {
      ...richImage,
      name: 'featuredImage',
      title: 'Featured Image',
      group: 'content',
    },
    defineField({
      name: 'authors',
      title: 'Author',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'person' }],
        },
      ],
      group: 'content',
    }),
    publicationDates,
    categories,
    {
      ...seo,
      options: {
        slugPrefix: 'customers',
        includeSlugPrefixInStoredValue: false,
      },
    },
    defineField({
      name: 'hideFromListing',
      title: 'Hide from Listing?',
      description:
        'Prevent this case study from appearing in content listings.',
      type: 'boolean',
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      name: 'internalName',
      title: 'Internal Name',
      description:
        'Use this name for internal reference only. It will not be displayed on the site.',
      type: 'string',
      group: 'settings',
    }),
    {
      ...language,
      group: 'settings',
    },
  ],
  preview: {
    select: {
      title: 'title',
      company: 'company.name',
      media: 'featuredImage',
      language: LANG_CODE_FIELD_NAME,
    },
    prepare: ({ title, company, media, language }) => {
      return {
        title,
        // TODO remove language
        subtitle: `[${language}] ${company}`,
        media,
      }
    },
  },
})
