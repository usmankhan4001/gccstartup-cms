import { getPayload } from 'payload'
import config from '@payload-config'
import { homeHTML, htmlResponse } from '@/lib/renderSite'

export const dynamic = 'force-dynamic'

export async function GET() {
  const payload = await getPayload({ config })
  const [hp, settings] = await Promise.all([
    payload.findGlobal({ slug: 'homepage' }).catch(() => null),
    payload.findGlobal({ slug: 'siteSettings' }).catch(() => null),
  ])
  return htmlResponse(homeHTML(hp, settings))
}
