import { getPayload } from 'payload'
import config from '@payload-config'
import { htmlResponse, partnerPageHTML } from '@/lib/renderSite'

export const dynamic = 'force-dynamic'

/** Flatten the nested PartnerPage global into the flat shape the generator expects */
function flattenPartnerPage(d: any): Record<string, any> {
  if (!d) return {}
  return {
    // SEO
    metaTitle: d.seo?.metaTitle,
    metaDesc: d.seo?.metaDesc,
    metaImage: d.seo?.metaImage?.url,
    // Top bar + hero
    urgencyBar: d.urgencyBar,
    badge: d.hero?.badge,
    heroHeadline: d.hero?.heroHeadline,
    heroSubhead: d.hero?.heroSubhead,
    heroCta: d.hero?.heroCta,
    heroFine: d.hero?.heroFine,
    // Stats
    stats: d.stats,
    // How it works
    howLabel: d.howItWorks?.howLabel,
    howHeadline: d.howItWorks?.howHeadline,
    howIntro: d.howItWorks?.howIntro,
    steps: d.howItWorks?.steps,
    // Apply form
    applyLabel: d.applySection?.applyLabel,
    applyHeadline: d.applySection?.applyHeadline,
    applySubhead: d.applySection?.applySubhead,
    // FAQ
    faqLabel: d.faqSection?.faqLabel,
    faqHeadline: d.faqSection?.faqHeadline,
    faqIntro: d.faqSection?.faqIntro,
    faq: d.faqSection?.faq,
    // Success state
    successTitle: d.successState?.successTitle,
    successBody: d.successState?.successBody,
  }
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const [partnerPage, settings] = await Promise.all([
      payload.findGlobal({ slug: 'partnerPage' }).catch(() => null),
      payload.findGlobal({ slug: 'siteSettings' }).catch(() => null),
    ])
    return htmlResponse(partnerPageHTML(flattenPartnerPage(partnerPage), settings || {}))
  } catch (err: any) {
    console.error('[philippines-partners GET] Server-side crash caught:', err)
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
