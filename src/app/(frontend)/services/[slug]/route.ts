import { getPayload } from 'payload'
import config from '@payload-config'
import { serviceHTML, htmlResponse } from '@/lib/renderSite'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const locale = new URL(request.url).searchParams.get('locale') || 'en'
  const payload = await getPayload({ config })
  const [res, settings] = await Promise.all([
    payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 }),
    payload.findGlobal({ slug: 'siteSettings' }).catch(() => null),
  ])
  const doc = res.docs[0]
  if (!doc) return htmlResponse('<h1>Page not found</h1><p><a href="/">Back home</a></p>', 404)
  return htmlResponse(serviceHTML(doc, locale, settings))
}
