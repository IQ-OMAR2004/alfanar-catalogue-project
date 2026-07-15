// Supported locales for the kiosk. Order here = order in the language gate.
// `dir` drives the whole-layout mirroring; `font` maps to a token in tokens.css.
// Flags are emoji so they render offline with no image assets.
export const LOCALES = [
  {
    code: 'en',
    name: 'English',
    native: 'English',
    dir: 'ltr',
    flag: '🇬🇧',
    font: 'var(--font-body)',
  },
  {
    code: 'ar',
    name: 'Arabic',
    native: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦',
    font: 'var(--font-ar)',
  },
  {
    code: 'ur',
    name: 'Urdu',
    native: 'اردو',
    dir: 'rtl',
    flag: '🇵🇰',
    font: 'var(--font-ur)',
  },
  {
    code: 'hi',
    name: 'Hindi',
    native: 'हिन्दी',
    dir: 'ltr',
    flag: '🇮🇳',
    font: 'var(--font-hi)',
  },
  {
    code: 'fr',
    name: 'French',
    native: 'Français',
    dir: 'ltr',
    flag: '🇫🇷',
    font: 'var(--font-body)',
  },
]

export const LOCALE_CODES = LOCALES.map((l) => l.code)
export const DEFAULT_LOCALE = 'en'

export const getLocale = (code) =>
  LOCALES.find((l) => l.code === code) || LOCALES[0]

export const isRTL = (code) => getLocale(code).dir === 'rtl'
