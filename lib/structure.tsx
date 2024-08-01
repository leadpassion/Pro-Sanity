import {
  BillIcon,
  ClockIcon,
  ComponentIcon,
  HomeIcon,
  PinIcon,
  StarIcon,
  TagIcon,
  UserIcon,
} from '@sanity/icons'
import { BiNews } from 'react-icons/bi'
import {
  IoAnalytics,
  IoBusiness,
  IoNavigateCircleOutline,
  IoGlobeOutline,
  IoDocument,
  IoDocuments,
} from 'react-icons/io5'
import { FaRegHandshake } from 'react-icons/fa6'
import { StructureBuilder } from 'sanity/structure'
import { TbSquareRoundedLetterB } from 'react-icons/tb'
import { FaRegLightbulb } from 'react-icons/fa'
import { BsQuestionCircle } from 'react-icons/bs'
import { PiStackDuotone } from 'react-icons/pi'
import { CgWebsite } from 'react-icons/cg'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // richDocumentListMenu(S),
      mainSitePagesMenu(S),
      landingPagesMenu(S),
      S.divider(),
      legalPagesMenu(S),
      S.documentTypeListItem('blogPost').title('Blog Posts'),
      S.documentTypeListItem('caseStudy').title('Case Studies'),
      eventsAndWebinarsMenu(S),
      S.documentTypeListItem('glossaryTerm').title('Glossary Terms'),
      guidesAndReportsMenu(S),
      newsAndPressMenu(S),
      partnersMenu(S),
      S.documentTypeListItem('videoPage').title('Video Pages'),
      S.divider(),
      categoriesMenu(S),
      contentBlocksMenu(S),
      peopleAndCompaniesMenu(S),
    ])

// const richDocumentListMenu = (S: StructureBuilder) =>
//   S.listItem()
//     .id('testing123')
//     .title('Custom Page List')
//     .child(
//       Object.assign(
//         S.documentList()
//           .filter('_type in ["page"]')
//           .title('Pages (Custom View)')
//           .serialize(),
//         {
//           __preserveInstance: true,
//           key: 'customPageList',
//           id: 'customPageList',
//           type: 'component',
//           component: RichDocumentList,
//         },
//       ),
//     )

const mainSitePagesMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Main Site Pages')
    .icon(IoGlobeOutline)
    .child(
      S.list()
        .title('Main Site Pages')
        .items([
          solutionsMenu(S),
          S.divider(),
          // reference singleton document:
          S.listItem()
            .title('Home')
            .icon(HomeIcon)
            .child(
              S.document()
                .schemaType('page')
                .documentId('450399dd-26cd-4b95-a0f9-1574a1d3a638'),
            ),
          S.listItem()
            .title('About')
            .icon(BsQuestionCircle)
            .child(
              S.document()
                .schemaType('page')
                .documentId('6f66eef8-b9f2-4092-a818-cd1fe03a241e'),
            ),
          S.listItem()
            .title('Why Webstacks')
            .icon(StarIcon)
            .child(
              S.document().schemaType('page').documentId('3dde6e49-bb93-478a-b18f-3e68e2913a82'),
            ),
        ]),
    )
const landingPagesMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Landing Pages')
    .icon(PinIcon)
    .child(
      S.list()
        .title('Landing Pages')
        .items([
          S.documentTypeListItem('paidLandingPage').title('Paid Landing Pages'),
          S.documentTypeListItem('page').title('Marketing Pages'),
        ]),
    )

const legalPagesMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Legal')
    .icon(BillIcon)
    .child(
      S.list()
        .title('Legal')
        .items([
          S.listItem()
            .title('Legal Home Page')
            .icon(CgWebsite)
            .child(
              S.document()
                .schemaType('page')
                .documentId('imported-craft-27769'),
            ),
          S.documentTypeListItem('legalPage')
            .title('Legal Pages')
            .icon(PiStackDuotone),
        ]),
    )

const solutionsMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Solutions')
    .icon(FaRegLightbulb)
    .child(
      S.list()
        .title('Solutions')
        .items([
          S.documentTypeListItem('useCasePage').title('Use Cases'),
          S.documentTypeListItem('personaPage').title('Personas'),
          S.documentTypeListItem('industryPage').title('Industries'),
        ]),
    )
const eventsAndWebinarsMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Events & Webinars')
    .icon(IoNavigateCircleOutline)
    .child(
      S.list()
        .title('Events & Webinars')
        .items([
          S.documentTypeListItem('event').title('Events'),
          S.documentTypeListItem('webinar').title('Webinars'),
        ]),
    )

const guidesAndReportsMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Downloads')
    .icon(IoAnalytics)
    .child(
      S.list()
        .title('Downloads')
        .items([
          S.documentTypeListItem('guide').title('Guides'),
          S.documentTypeListItem('report').title('Reports'),
        ]),
    )
const newsAndPressMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('News & Press Releases')
    .icon(BiNews)
    .child(
      S.list()
        .title('News & Press Releases')
        .items([
          S.documentTypeListItem('newsListing').title('News Listings'),
          S.documentTypeListItem('pressRelease').title('Press Releases'),
        ]),
    )

const partnersMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Partners')
    .icon(FaRegHandshake)
    .child(
      S.list()
        .title('Partners')
        .items([
          S.listItem()
            .icon(FaRegHandshake)
            .title('Partners Landing Page')
            .child(S.editor().id('imported-craft-778').schemaType('page')),
          S.documentTypeListItem('technologyPartner').title(
            'Technology Partners',
          ),
          S.documentTypeListItem('solutionsPartner').title(
            'Solutions Partners',
          ),
          S.divider(),
          S.documentTypeListItem('technologyPartnerType').title(
            'Technology Partner Types',
          ),
        ]),
    )

const peopleAndCompaniesMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('People & Companies')
    .icon(UserIcon)
    .child(
      S.list()
        .title('People & Companies')
        .items([
          S.documentTypeListItem('person').title('People'),
          S.documentTypeListItem('company').title('Companies'),
          S.divider(),
          brazeMenu(S),
        ]),
    )

const contentBlocksMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Content Building Blocks')
    .icon(ComponentIcon)
    .child(
      S.list()
        .title('Content Building Blocks')
        .items([
          S.documentTypeListItem('hubspotForm').title('HubSpot Forms'),
          S.documentTypeListItem('cta').title('Shared CTAs'),
          S.documentTypeListItem('sharedComponent').title(
            'Shared UI Components',
          ),
          S.documentTypeListItem('testimonial').title('Testimonials'),
          S.documentTypeListItem('token').title('Tokens'),
          S.documentTypeListItem('video').title('Videos'),
          S.divider(),
          S.documentTypeListItem('globalHeader').title('Global Header'),
          S.documentTypeListItem('footer').title('Global Footer'),
        ]),
    )

const categoriesMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Categories')
    .icon(TagIcon)
    .child(
      S.list()
        .title('Categories')
        .items([
          S.documentTypeListItem('topic').title('Topics'),
          S.documentTypeListItem('useCase').title('Use Cases'),
          S.documentTypeListItem('industry').title('Industries'),
          S.documentTypeListItem('productFeature').title('Product Features'),
          S.documentTypeListItem('region').title('Regions'),
          S.documentTypeListItem('technologyPartnerType').title(
            'Technology Partner Types',
          ),
        ]),
    )

const brazeMenu = (S: StructureBuilder) =>
  S.listItem()
    .title('Braze Details')
    .icon(TbSquareRoundedLetterB)
    .child(
      S.list()
        .title('Braze Details')
        .items([
          S.documentTypeListItem('brazeBenefits').title('Braze Benefits'),
          S.listItem()
            .icon(UserIcon)
            .title('Braze Leadership')
            .child(
              S.editor().id('braze-leadership').schemaType('brazeLeadership'),
            ),
          S.listItem()
            .icon(IoBusiness)
            .title('Braze Offices')
            .child(S.editor().id('braze-offices').schemaType('brazeOffices')),
        ]),
    )
