import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { localeCodes, defaultLocale } from '@/i18n/locales'

export const dynamic = 'force-dynamic'

const route = (siteUrl: string, path: string): MetadataRoute.Sitemap[number] => {
  const urlPath = path === 'home' ? '' : `/${path}`
  const languages: Record<string, string> = {}
  
  for (const code of localeCodes) {
    languages[code] = `${siteUrl}${code === defaultLocale ? urlPath : `/${code}${urlPath}`}`
  }
  
  return {
    url: `${siteUrl}${urlPath}`,
    lastModified: new Date(),
    alternates: {
      languages,
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'https://gccstartup.com').replace(/\/$/, '')
  const entries: MetadataRoute.Sitemap = [route(siteUrl, 'home')]
  let payload

  try {
    payload = await getPayload({ config })
  } catch (error) {
    console.error('[sitemap] failed to load Payload, returning base sitemap', error)
    return entries
  }

  const [pages, countries, services, pricing, posts] = await Promise.all([
    payload.find({ collection: 'pages' as any, limit: 1000, depth: 0 }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'countries', limit: 1000, depth: 0 }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'services', limit: 1000, depth: 0 }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'pricingTiers', limit: 1000, depth: 0 }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'posts', limit: 1000, depth: 0 }).catch(() => ({ docs: [] })),
  ])

  for (const page of pages.docs as any[]) {
    if (page.slug && page.slug !== 'home' && !page.seo?.noIndex) entries.push(route(siteUrl, page.slug))
  }
  for (const item of countries.docs as any[]) if (item.slug) entries.push(route(siteUrl, item.slug))
  for (const item of services.docs as any[]) if (item.slug) entries.push(route(siteUrl, `services/${item.slug}`))
  for (const item of pricing.docs as any[]) if (item.slug) entries.push(route(siteUrl, `pricing/${item.slug}`))
  for (const item of posts.docs as any[]) if (item.slug) entries.push(route(siteUrl, `blog/${item.slug}`))

  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values())
}
