import { getPayload } from 'payload'
import config from '@payload-config'
import { homeHTML, htmlResponse } from '@/lib/renderSite'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const locale = new URL(request.url).searchParams.get('locale') || 'en'
    const payload = await getPayload({ config })
    const [hp, settings, countriesRes, servicesRes, pricingRes] = await Promise.all([
      payload.findGlobal({ slug: 'homepage' }).catch(() => null),
      payload.findGlobal({ slug: 'siteSettings' }).catch(() => null),
      payload.find({ collection: 'countries', limit: 100, locale: locale as any }).catch(() => ({ docs: [] })),
      payload.find({ collection: 'services', limit: 100, locale: locale as any }).catch(() => ({ docs: [] })),
      payload.find({ collection: 'pricingTiers', limit: 100, locale: locale as any }).catch(() => ({ docs: [] })),
    ])
    return htmlResponse(homeHTML(hp, settings, locale, countriesRes.docs, servicesRes.docs, pricingRes.docs))
  } catch (err: any) {
    console.error('[frontend GET] Server-side crash caught:', err)
    return htmlResponse(`
      <div style="font-family: system-ui, sans-serif; padding: 48px; max-width: 600px; margin: 0 auto; line-height: 1.6;">
        <h1 style="color: #ea4335;">Database Connection or Startup Error</h1>
        <p>A server-side exception occurred while initializing Payload CMS or fetching data from PostgreSQL:</p>
        <pre style="background: #f1f3f4; padding: 16px; border-radius: 4px; overflow-x: auto; font-family: monospace;">${err.message || err}</pre>
        <p><strong>Troubleshooting Steps:</strong></p>
        <ol>
          <li>Check that your <code>DATABASE_URI</code> environment variable is set and correct.</li>
          <li>Ensure your PostgreSQL database service is running and accessible from this container.</li>
          <li>Check your server/container logs on Dokploy or Docker for detailed tracebacks.</li>
        </ol>
      </div>
    `, 500)
  }
}
