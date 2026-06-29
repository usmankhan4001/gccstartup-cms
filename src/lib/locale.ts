import { headers } from 'next/headers'
import { defaultLocale, localeCodes, rtlLocales, type LocaleCode } from '@/i18n/locales'

export async function getLocale(): Promise<LocaleCode> {
  const h = await headers()
  return (h.get('x-locale') as LocaleCode) || defaultLocale
}

export async function getPathname(): Promise<string> {
  const h = await headers()
  return h.get('x-pathname') || '/'
}

export function getBaseUrl(siteUrl?: string | null): string {
  return (siteUrl || process.env.NEXT_PUBLIC_SERVER_URL || 'https://gccstartup.com').replace(/\/$/, '')
}

export function localePath(path: string, locale: string): string {
  if (!path.startsWith('/')) path = '/' + path
  return locale === defaultLocale ? path : `/${locale}${path}`
}

export function isRtl(locale: string): boolean {
  return rtlLocales.includes(locale as LocaleCode)
}

export function generateHreflang(path: string, siteUrl?: string | null): Record<string, string> {
  const baseUrl = getBaseUrl(siteUrl)
  const languages: Record<string, string> = {}
  for (const code of localeCodes) {
    languages[code] = `${baseUrl}${localePath(path, code)}`
  }
  languages['x-default'] = `${baseUrl}${localePath(path, defaultLocale)}`
  return languages
}
