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
    title: 'Blue Fill',
    value: 'blue-fill',
  },
  {
    title: 'Titanic Fill',
    value: 'titanic-fill',
  },
  {
    title: 'Black Fill',
    value: 'black-fill',
  },
  {
    title: 'White Fill',
    value: 'white-fill',
  },
  {
    title: 'Blue Link',
    value: 'blue-link',
  },
  {
    title: 'White Link',
    value: 'white-link',
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
    label: 'White',
    value: 'hsla(0, 0%, 100%, 1)',
  },
  {
    label: 'Blue',
    value: 'hsla(209, 100%, 50%, 1)',
  },
]

export const ICON_COLORS = [
  {
    label: 'White',
    value: 'hsla(220, 43%, 11%, 1)',
  },
  {
    label: 'Black',
    value: 'hsla(155, 91%, 24%, 1)',
  },
  {
    label: 'Blue',
    value: 'hsla(239, 99%, 39%, 1)',
  },
]

export const PAGE_COMPONENT_BACKGROUND_COLORS = [
  {
    label: 'Black',
    value: 'black',
  },
  {
    label: 'White',
    value: '#ffffff',
  },
]

const paddingPixelOptions = Array.from({ length: 31 }, (_, i) => {
  const value = (i - 15) * 8
  return {
    title: `${value}px`,
    value: value,
  }
})

export const PADDING_OPTIONS: TitledListValue<number>[] = [
  {
    title: 'None',
    value: 0,
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
  {
    title: '3xl',
    value: '3xl',
  },
  {
    title: '4xl',
    value: '4xl',
  },
  {
    title: '5xl',
    value: '5xl',
  },
  {
    title: '6xl',
    value: '6xl',
  },
  {
    title: '7xl',
    value: '7xl',
  },
  {
    title: '8xl',
    value: '8xl',
  },
  {
    title: '9xl',
    value: '9xl',
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
