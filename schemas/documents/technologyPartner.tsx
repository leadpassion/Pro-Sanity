import { RESOURCE_TYPES } from '@/lib'
import { categories } from '@/schemas/fields/categories'
import { language } from '@/schemas/fields/language'
import { pageBody } from '@/schemas/fields/pageBody'
import { seo } from '@/schemas/fields/seo'
import {
  CodeIcon,
  CogIcon,
  EditIcon,
  HashIcon,
  JoystickIcon,
  TagIcon,
} from '@sanity/icons'
import { Stack, Text } from '@sanity/ui'
import { defineField, defineType } from 'sanity'

const partnerCategoryTypes = ['topic', 'useCase', 'productFeature']

export const technologyPartner = defineType({
  name: 'technologyPartner',
  title: 'Technology Partner',
  type: 'document',
  icon: JoystickIcon,
  groups: [
    {
      title: 'Basics',
      name: 'basics',
      icon: EditIcon,
      default: true,
    },
    {
      title: 'Categories',
      name: 'categories',
      icon: TagIcon,
    },
    {
      title: 'SEO',
      name: 'seo',
      icon: HashIcon,
    },
    {
      title: 'Settings',
      name: 'settings',
      icon: CogIcon,
    },
    {
      title: 'Dashboard Integration',
      name: 'dashboardIntegration',
      icon: CodeIcon,
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'The name of the technology partner. This is displayed both on braze.com and in the Braze dashboard.',
      validation: (Rule) => Rule.required(),
      group: ['basics', 'dashboardIntegration'],
    },
    {
      name: 'company',
      title: 'Company',
      description:
        'The company related to this partner. Their logo and url are pulled from this document.',
      type: 'reference',
      to: [{ type: 'company' }],
      group: ['basics', 'dashboardIntegration'],
    },
    {
      name: 'documentationUrl',
      title: 'Documentation URL',
      description: 'The URL to the documentation for this partner.',
      type: 'url',
      group: 'basics',
    },
    {
      name: 'whatIsIt',
      title: 'What is it?',
      type: 'complexRichText',
      group: 'basics',
    },
    {
      name: 'howWeWorkTogether',
      title: 'How we work together',
      type: 'complexRichText',
      group: 'basics',
    },
    {
      name: 'featuredContent',
      title: 'Featured Content',
      type: 'reference',
      to: RESOURCE_TYPES.map((type) => ({ type })),
      group: 'basics',
    },
    {
      ...pageBody,
      group: 'basics',
      // TODO: Remove this once we have page bodies implemented for partners
      hidden: true,
    },
    categories,
    seo,
    {
      ...language,
      group: 'settings',
    },

    // Dashboard integration methods
    defineField({
      name: 'integrationPartnerId',
      title: 'Integration Partner ID',
      description: (
        <Stack space={3} marginTop={2}>
          <Text size={1} muted>
            This id is required to display this partner in the dashboard.
          </Text>
          <details>
            <summary>How do I find this ID?</summary>
            <Text size={1}>
              <ol>
                <li>
                  Search for the partner in Salesforce and make sure the account
                  type is {'"'}Alliances{'"'}
                </li>
                <li>
                  Copy the Integration Partner ID from the URL from between
                  /Account/ and /view, e.g.
                  https://braze.lightning.force.com/lightning/r/Account/{'<'}ID
                  {'>'}/view
                </li>
              </ol>
            </Text>
          </details>
        </Stack>
      ),
      type: 'string',
      group: 'dashboardIntegration',
    }),
    defineField({
      name: 'isFeaturedPartner',
      title: 'Is Featured Partner?',
      description:
        'This is used to spotlight a partner in the "Featured" section of the dashboard.',
      type: 'boolean',
      initialValue: false,
      group: 'dashboardIntegration',
    }),
    defineField({
      name: 'featuredPartnerShortDescription',
      title: 'Featured Partner Short Description',
      description:
        'A short description of the featured partner to display in the dashboard.',
      type: 'text',
      rows: 3,
      group: 'dashboardIntegration',
      hidden: ({ document }) => !document?.isFeaturedPartner,
    }),
    defineField({
      name: 'partnerSpecialty',
      title: 'Partner Speciality',
      description: 'The specialty of this partner.',
      type: 'reference',
      to: partnerCategoryTypes.map((type) => ({ type })),
      group: 'dashboardIntegration',
    }),
    defineField({
      name: 'partnerCategories',
      title: 'Partner Categories',
      description: 'The categories of this partner.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: partnerCategoryTypes.map((type) => ({ type })),
        },
      ],
      group: 'dashboardIntegration',
    }),
    defineField({
      name: 'partnerIntegrationMethods',
      title: 'Partner Integration Methods',
      description:
        'The primary integration method(s) of this partner, such as API, Currents, or Cohort Import.',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'dashboardIntegration',
    }),
    defineField({
      name: 'dashboardIntegrationMethods',
      title: 'Dashboard Integration Methods',
      description: 'The integration methods of this partner in the dashboard.',
      type: 'array',
      group: 'dashboardIntegration',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: (
                <Text size={1} muted>
                  The title of the integration method. Please use{' '}
                  <a href="https://confluence.braze.com/display/PAR/Alloys+Taxonomy">
                    this guide
                  </a>{' '}
                  to select the correct title.),
                </Text>
              ),
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'methodId',
              title: 'Method ID',
              type: 'string',
            },
            {
              name: 'brazeDocumentationUrl',
              title: 'Braze Documentation URL',
              type: 'url',
            },
            {
              name: 'partnerDocumentationUrl',
              title: 'Partner Documentation URL',
              type: 'url',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'language',
      media: 'company.logotype.default',
    },
  },
})
