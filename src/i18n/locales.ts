export const defaultLocale = 'en'

export const locales = [
  { label: 'English', code: 'en' },
  { label: 'Arabic', code: 'ar', rtl: true },
  { label: 'Chinese', code: 'zh' },
  { label: 'German', code: 'de' },
  { label: 'French', code: 'fr' },
  { label: 'Dutch', code: 'nl' },
  { label: 'Spanish', code: 'es' },
  { label: 'Italian', code: 'it' },
] as const

export const localeCodes = locales.map((locale) => locale.code)
export type LocaleCode = (typeof localeCodes)[number]

export const rtlLocales = locales.filter((locale) => 'rtl' in locale && locale.rtl).map((locale) => locale.code)
