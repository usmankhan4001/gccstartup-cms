import { getPayload } from 'payload'
import config from '@payload-config'
import { pricingHTML, htmlResponse, isLocale } from '@/lib/renderSite'

export const dynamic = 'force-dynamic'

// /<locale>/pricing/<slug>
export async function GET(_req: Request, { params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) return htmlResponse('<h1>Page not found</h1>', 404)
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'pricingTiers', where: { slug: { equals: slug } }, limit: 1, locale: locale as any,
  })
  const doc = res.docs[0]
  if (!doc) return htmlResponse('<h1>Page not found</h1><p><a href="/">Back home</a></p>', 404)
  return htmlResponse(pricingHTML(doc, locale))
}
