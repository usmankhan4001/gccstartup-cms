import { getPayload } from 'payload'
import config from '@payload-config'
import { countryHTML, homeHTML, htmlResponse, isLocale } from '@/lib/renderSite'

export const dynamic = 'force-dynamic'

// Handles both `/<locale>` (localized homepage) and `/<country-slug>` (English country page).
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const locale = new URL(request.url).searchParams.get('locale') || 'en'
  const payload = await getPayload({ config })
  const res = await payload.find({ collection: 'countries', where: { slug: { equals: slug } }, limit: 1 })
  const doc = res.docs[0]
  if (!doc) return htmlResponse('<h1>Page not found</h1><p><a href="/">Back home</a></p>', 404)
  return htmlResponse(countryHTML(doc, locale))
}
