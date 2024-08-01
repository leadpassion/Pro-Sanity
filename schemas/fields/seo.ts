// –------------------------------------------------
// SEO (field)
//
// This custom field type collects common SEO settings that can be
// applied to any document type. It includes fields for the page title,
// description, and open graph image, as well as options to prevent
// search engines from indexing or following links on the page.
//
// –------------------------------------------------

import { PrefixedSlugInput } from '@/components/PrefixedSlugInput'
import { isUniquePerLanguage } from '@/utils'
import { defineField } from 'sanity'

export const seo = defineField({
  name: 'seo',
  title: 'SEO Settings',
  group: 'seo',
  type: 'object',
  fieldsets: [
    {
      name: 'searchEngineSettings',
      title: 'Search Engine Settings',
      options: {
        columns: 2,
      },
    },
  ],
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL path for this page.',
      options: {
        // The Generate button will use the parent document's title field to generate the slug.
        source: 'title',
        isUnique: isUniquePerLanguage,
      },
      components: {
        input: PrefixedSlugInput,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
      description: 'The title that will appear in search engine results.',
    },
    {
      name: 'pageDescription',
      title: 'Page Description',
      type: 'text',
      description: 'The description that will appear in search engine results.',
      rows: 4,
    },
    {
      name: 'openGraphImage',
      title: 'Open Graph Image',
      type: 'image',
      description:
        'The image that will appear when this page is shared on social media.',
    },
    defineField({
      name: 'breadcrumbs',
      title: 'Breadcrumbs',
      description:
        'The top-most pages that lead to this page. The first item should be the homepage.',
      type: 'array',
      // TODO: Expand this list of types over time.
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      // TODO: Remove this once we have breadcrumbs implemented
      hidden: true,
    }),

    // Search Engine Settings
    {
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      fieldset: 'searchEngineSettings',
      description: 'Prevent search engines from indexing this page.',
      initialValue: false,
    },
    {
      name: 'noFollow',
      title: 'No Follow',
      type: 'boolean',
      fieldset: 'searchEngineSettings',
      description: 'Prevent search engines from following links on this page.',
      initialValue: false,
    },
  ],
})
