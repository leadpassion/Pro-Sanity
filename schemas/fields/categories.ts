// –------------------------------------------------
// Categories (field)
//
// Used to create a group of categories fields in
// multiple contexts across the site.
//
// –------------------------------------------------

import { defineField } from 'sanity'

export const categories = defineField({
  name: 'categories',
  title: 'Categories',
  type: 'object',
  group: 'categories',
  fields: [
    defineField({
      name: 'industries',
      title: 'Industries',
      description:
        'Select one or more relevant Industry tags so visitors can find it through search or related content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'industry' },
          options: {
            filter: categoryFilterFn,
            disableNew: true,
          },
        },
      ],
      // Enforce preventing duplicates
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'productFeatures',
      title: 'Product Features',
      description:
        'Select one or more relevant Product Feature tags so visitors can find it through search or related content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'productFeature' },
          options: {
            filter: categoryFilterFn,
            disableNew: true,
          },
        },
      ],
      // Enforce preventing duplicates
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'regions',
      title: 'Regions',
      description:
        'Select one or more relevant Region tags so visitors can find it through search or related content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'region' },
          options: {
            filter: categoryFilterFn,
            disableNew: true,
          },
        },
      ],
      // Enforce preventing duplicates
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'technologyPartnerTypes',
      title: 'Technology Partner Types',
      description:
        'Select one or more relevant Technology Partner Type tags so visitors can find it through search or related content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'technologyPartnerType' },
          options: {
            // filter: categoryFilterFn,
            disableNew: true,
          },
        },
      ],
      // Enforce preventing duplicates
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      description:
        'Select one or more relevant Topic tags so visitors can find it through search or related content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'topic' },
          options: {
            // filter: categoryFilterFn,
            disableNew: true,
          },
        },
      ],
      // Enforce preventing duplicates
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      description:
        'Select one or more relevant Use Case tags so visitors can find it through search or related content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'useCase' },
          options: {
            // filter: categoryFilterFn,
            disableNew: true,
          },
        },
      ],
      // Enforce preventing duplicates
      validation: (Rule) => Rule.unique(),
    }),
  ],
})

/**
 * Filter function for category fields
 */
function categoryFilterFn({ document, parentPath }) {
  // Prevent duplicates from showing
  const fieldValue = parentPath.reduce((obj, path) => obj[path], document)
  const refs = fieldValue.reduce((refArr, { _ref }) => {
    _ref && refArr.push(_ref)
    return refArr
  }, [])

  return {
    filter: '!(_id in $refs)',
    params: {
      refs,
    },
  }
}
