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
  const payload = await getPayload({ config })
  const [partnerPage, settings] = await Promise.all([
    payload.findGlobal({ slug: 'partnerPage' }).catch(() => null),
    payload.findGlobal({ slug: 'siteSettings' }).catch(() => null),
  ])
  return htmlResponse(partnerPageHTML(flattenPartnerPage(partnerPage), settings || {}))
}
