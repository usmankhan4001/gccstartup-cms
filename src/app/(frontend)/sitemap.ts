import type { MetadataRoute } from 'next'
import { staticPageMap } from '@/lib/staticPages'
import { defaultLocale, localeCodes } from '@/i18n/locales'

function entry(siteUrl: string, route: string): MetadataRoute.Sitemap[number] {
  const path = route ? `/${route}` : ''
  const languages: Record<string, string> = {}

  for (const code of localeCodes) {
    languages[code] = `${siteUrl}${code === defaultLocale ? path : `/${code}${path}`}`
  }

  return {
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    alternates: { languages },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'https://gccstartup.com').replace(/\/$/, '')
  return Object.keys(staticPageMap).map((route) => entry(siteUrl, route))
}
