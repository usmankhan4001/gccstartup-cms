import { getPayload } from 'payload'
import config from '@payload-config'
import { pricingHTML, htmlResponse } from '@/lib/renderSite'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const res = await payload.find({ collection: 'pricingTiers', where: { slug: { equals: slug } }, limit: 1 })
  const doc = res.docs[0]
  if (!doc) return htmlResponse('<h1>Page not found</h1><p><a href="/">Back home</a></p>', 404)
  return htmlResponse(pricingHTML(doc))
}
