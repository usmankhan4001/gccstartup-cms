import { getPayload } from 'payload'
import config from '@payload-config'
import { countryHTML, homeHTML, htmlResponse, isLocale } from '@/lib/renderSite'

export const dynamic = 'force-dynamic'

// Handles both `/<locale>` (localized homepage) and `/<country-slug>` (English country page).
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  // /de, /ar, ... → that language's homepage (en lives at "/")
  if (isLocale(slug) && slug !== 'en') {
    const [hp, settings] = await Promise.all([
      payload.findGlobal({ slug: 'homepage', locale: slug as any }).catch(() => null),
      payload.findGlobal({ slug: 'siteSettings', locale: slug as any }).catch(() => null),
    ])
    return htmlResponse(homeHTML(hp, settings, slug))
  }

  // otherwise treat as an English country slug
  const res = await payload.find({ collection: 'countries', where: { slug: { equals: slug } }, limit: 1 })
  const doc = res.docs[0]
  if (!doc) return htmlResponse('<h1>Page not found</h1><p><a href="/">Back home</a></p>', 404)
  return htmlResponse(countryHTML(doc))
}
