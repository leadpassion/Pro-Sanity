import { TitledListValue } from 'sanity'

export const PAGE_TYPES = [
  'page',
  'personaPage',
  'productPage',
  'paidLandingPage',
  'industryPage',
  'useCasePage',
  'legalPage',
]

export const RESOURCE_TYPES = [
  'caseStudy',
  'blogPost',
  'event',
  'guide',
  'report',
  'videoPage',
  'webinar',
]

export const SPECIAL_BRANDING_OPTIONS: TitledListValue<string>[] = [
  {
    title: 'Sage AI',
    value: 'sageAi',
  },
]

export const BUTTON_STYLES: TitledListValue<string>[] = [
  {
    title: 'Purple Button',
    value: 'purple-button',
  },
  {
    title: 'Black Button',
    value: 'black-button',
  },
  {
    title: 'White Button',
    value: 'white-button',
  },
  {
    title: 'Gradient Button',
    value: 'gradient-button',
  },
  {
    title: 'White Ghost Link',
    value: 'white-ghost-link',
  },
  {
    title: 'Purple Ghost Button',
    value: 'purple-ghost-button',
  },
  {
    title: 'Gray Link',
    value: 'gray-link',
  },
  {
    title: 'Purple Link',
    value: 'purple-link',
  },
]

// A type ButtonStyle that is any value from BUTTON_STYLES
export type ButtonStyle = (typeof BUTTON_STYLES)[number]['value']

export const BUTTON_SIZES = ['sm', 'lg', 'xl']

export type ButtonSize = (typeof BUTTON_SIZES)[number]

// The slightly different naming convention is different
// to meet the requirements of the simpler-color-picker plugin
export const EYEBROW_COLORS = [
  {
    label: 'Black',
    value: 'hsla(220, 43%, 11%, 1)',
  },
  {
    label: 'Green',
    value: 'hsla(155, 91%, 24%, 1)',
  },
  {
    label: 'Purple',
    value: 'hsla(239, 99%, 39%, 1)',
  },
  {
    label: 'Pink',
    value: 'hsla(319, 89%, 82%, 1)',
  },
  {
    label: 'Magenta',
    value: 'hsla(327, 80%, 42%, 1)',
  },
  {
    label: 'Orange',
    value: 'hsla(22, 92%, 37%, 1)',
  },
  {
    label: 'Gray',
    value: 'hsla(221, 13%, 46%, 1)',
  },
  {
    label: 'White',
    value: 'hsla(0, 0%, 100%, 1)',
  },
]

export const ICON_COLORS = [
  {
    label: 'Black',
    value: 'hsla(220, 43%, 11%, 1)',
  },
  {
    label: 'Green',
    value: 'hsla(155, 91%, 24%, 1)',
  },
  {
    label: 'Purple',
    value: 'hsla(239, 99%, 39%, 1)',
  },
  {
    label: 'Pink',
    value: 'hsla(319, 89%, 82%, 1)',
  },
  {
    label: 'Magenta',
    value: 'hsla(327, 80%, 42%, 1)',
  },
  {
    label: 'Bright Orange',
    value: 'hsla(34, 94%, 50%, 1)',
  },
  {
    label: 'Orange',
    value: 'hsla(22, 92%, 37%, 1)',
  },
  {
    label: 'Gray',
    value: 'hsla(221, 13%, 46%, 1)',
  },
]

export const PAGE_COMPONENT_BACKGROUND_COLORS = [
  {
    label: 'Transparent',
    value: 'transparent',
  },
  {
    label: 'White',
    value: '#ffffff',
  },
  {
    label: 'Blur',
    value: '#FFFFFFCC'
  },
  {
    label: 'Light Gray',
    value: '#F9FAFB',
  },
  {
    label: 'Medium Gray',
    value: '#F3F3FA',
  },
  {
    label: 'Pink',
    value: '#F8D3E8',
  },
  {
    label: 'Heat 1',
    value:
      'linear-gradient(127deg, #C9C4FF -18.91%, #801ED7 44.07%, #FFA524 104.04%)',
  },
  {
    label: 'Heat 2',
    value:
      'linear-gradient(323deg, #E9371F -0.14%, #FFA524 49.92%, #FFA4FB 102.11%)',
  },
  {
    label: 'Heat 2 (Reverse)',
    value:
      'linear-gradient(147deg, #E9371F -0.14%, #FFA524 49.92%, #FFA4FB 102.11%)',
  },
  {
    label: 'Heat 3',
    value:
      'linear-gradient(326deg, #FFA524 -2.19%, #FFA4FB 50.13%, #D2F3F3 99.29%)',
  },
  {
    label: 'Heat 3 (Reverse)',
    value:
      'linear-gradient(147deg, #FFA524 -2.19%, #FFA4FB 50.13%, #D2F3F3 99.29%)',
  },
  {
    label: 'Heat 4',
    value:
      'linear-gradient(327deg, rgba(217, 213, 255, 0.00) -64.07%, #7C30D9 67.77%), linear-gradient(0deg, #FFA4FB 0%, #FFA4FB 100%), #FFF;',
  },
  {
    label: 'Heat 4 (Reverse)',
    value:
      'linear-gradient(147deg, rgba(217, 213, 255, 0.00) -64.07%, #7C30D9 67.77%), linear-gradient(0deg, #FFA4FB 0%, #FFA4FB 100%), #FFF;',
  },
  {
    label: 'Heat 5',
    value:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.40) 100%), linear-gradient(112deg, #D2F3F3 4.88%, #FFA4FB 61.95%, #FFA524 116.3%), linear-gradient(327deg, rgba(217, 213, 255, 0.00) -64.07%, #7C30D9 67.77%), linear-gradient(0deg, #FFA4FB 0%, #FFA4FB 100%), #FFF;',
  },
  {
    label: 'Heat 6',
    value: 'linear-gradient(95deg, #782DCF 0%, #FFA524 115.04%)',
  },
  {
    label: 'Dark Flash',
    value: 'var(--Colors-Background-bg-primary, #0C111D);',
  },
  {
    label: 'Blur - Purple',
    value: 'blur-purple',
  },
  {
    label: 'Supergraphic 1',
    value: 'supergraphic-1',
  },
  {
    label: 'Supergraphic 2',
    value: 'supergraphic-2',
  },
  {
    label: 'Supergraphic 3',
    value: 'supergraphic-3',
  },
  {
    label: 'Supergraphic 4',
    value: 'supergraphic-4',
  },
  {
    label: 'Supergraphic 5',
    value: 'supergraphic-5',
  },
]

const paddingPixelOptions = [
  { title: 'xs', value: 'xs' },
  { title: 'sm', value: 'sm' },
  { title: 'md', value: 'md' },
  { title: 'lg', value: 'lg' },
  { title: 'xl', value: 'xl' },
  { title: '2xl', value: '2xl' },
  { title: '3xl', value: '3xl' },
  { title: '4xl', value: '4xl' },
  { title: '5xl', value: '5xl' },
  { title: '6xl', value: '6xl' },
  { title: '7xl', value: '7xl' },
];

export const PADDING_OPTIONS: TitledListValue<string>[] = [
  {
    title: 'None',
    value: 'none',
  },
  ...paddingPixelOptions,
]

export const TEXT_SIZES: TitledListValue<string>[] = [
  {
    title: 'xs',
    value: 'xs',
  },
  {
    title: 'sm',
    value: 'sm',
  },
  {
    title: 'md',
    value: 'md',
  },
  {
    title: 'lg',
    value: 'lg',
  },
  {
    title: 'xl',
    value: 'xl',
  },
  {
    title: '2xl',
    value: '2xl',
  },
]

export const COLORS = {
  current: 'currentColor',
  transparent: 'transparent',
  black: '#000000',
  white: '#ffffff',
  secondaryHover: '#182230',
  rgba: 'rgba(126, 45, 208, 0.20)',
  purple: 'rgba(130, 43, 209, 1)',
  gray: {
    25: '#FCFCFD',
    50: '#F9FAFB',
    100: '#F3F3FA',
    200: '#EAECF0',
    300: '#D0D5DD',
    400: '#98A2B3',
    500: '#667085',
    600: '#475467',
    700: '#344054',
    800: '#1D2939',
    900: '#101828',
  },
  primary: {
    25: '#F6F1FF',
    50: '#EDE5FB',
    100: '#D1C0F5',
    200: '#B295F0',
    300: '#9168EC',
    400: '#7643E9',
    500: '#5711E5',
    600: '#4A0CDF',
    700: '#3608D7',
    800: '#1704D2',
    900: '#0003CD',
  },
  error: {
    25: '#FFFBFA',
    50: '#FEF3F2',
    100: '#FEE4E2',
    200: '#FECDCA',
    300: '#FDA29B',
    400: '#F97066',
    500: '#F04438',
    600: '#D92D20',
    700: '#B42318',
    800: '#912018',
    900: '#7A271A',
  },
  warning: {
    25: '#FFFCF5',
    50: '#FFFAEB',
    100: '#FEF0C7',
    200: '#FEDF89',
    300: '#FEC84B',
    400: '#FDB022',
    500: '#F79009',
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#7A2E0E',
  },
  success: {
    25: '#F6FEF9',
    50: '#ECFDF3',
    100: '#D1FADF',
    200: '#A6F4C5',
    300: '#6CE9A6',
    400: '#32D583',
    500: '#12B76A',
    600: '#039855',
    700: '#027A48',
    800: '#05603A',
    900: '#054F31',
  },
} as const

export const namedColors = {
  light: {
    sharedComponent: {
      bg: `hsla(261 85 74 / 5%)`,
      border: `hsla(261 85 74 / 90%)`,
      fg: `hsla(261 85 15 / 100%)`,
    },
  },
  dark: {
    sharedComponent: {
      bg: `hsla(261 85 74 / 15%)`,
      border: `hsla(261 85 74 / 90%)`,
      fg: `hsla(261 85 75 / 100%)`,
    },
  },
}
