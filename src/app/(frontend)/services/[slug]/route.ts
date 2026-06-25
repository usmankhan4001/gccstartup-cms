import { getPayload } from 'payload'
import config from '@payload-config'
import { serviceHTML, htmlResponse } from '@/lib/renderSite'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
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
  } catch (err: any) {
    console.error('[services GET] Server-side crash caught:', err)
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
