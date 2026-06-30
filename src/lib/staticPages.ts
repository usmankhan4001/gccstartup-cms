import fs from 'fs'
import path from 'path'

const pagesDir = path.join(process.cwd(), 'Pages')

export const staticPageMap: Record<string, string> = {
  '': 'index.html',
  'index.html': 'index.html',
  'tax-guide': '0-tax-guide-cta.html',
  '0-tax-guide-cta.html': '0-tax-guide-cta.html',
  'guide-thank-you': '00-gccstartup-nl-hk-thank-you-page.html',
  '00-gccstartup-nl-hk-thank-you-page.html': '00-gccstartup-nl-hk-thank-you-page.html',
  'whatsapp-consultation': '1-whatsapp-specialist-cta.html',
  '1-whatsapp-specialist-cta.html': '1-whatsapp-specialist-cta.html',
  'strategy-call': '2-meeting-booking-cta.html',
  '2-meeting-booking-cta.html': '2-meeting-booking-cta.html',
  'jurisdiction-comparison': '3-promo-banner.html',
  '3-promo-banner.html': '3-promo-banner.html',
  uae: 'country-uae.html',
  'country-uae.html': 'country-uae.html',
  bahrain: 'country-bahrain.html',
  'country-bahrain.html': 'country-bahrain.html',
  hongkong: 'country-hongkong.html',
  'country-hongkong.html': 'country-hongkong.html',
  singapore: 'country-singapore.html',
  'country-singapore.html': 'country-singapore.html',
  ireland: 'country-ireland.html',
  'country-ireland.html': 'country-ireland.html',
  'bvi-cayman': 'country-bvi-cayman.html',
  'country-bvi-cayman.html': 'country-bvi-cayman.html',
  'services/company-registration': 'service-company-registration.html',
  'service-company-registration.html': 'service-company-registration.html',
  'services/bank-account': 'service-bank-account.html',
  'service-bank-account.html': 'service-bank-account.html',
  'services/nominee-ubo': 'service-nominee-ubo.html',
  'service-nominee-ubo.html': 'service-nominee-ubo.html',
  'services/shelf-company': 'service-shelf-company.html',
  'service-shelf-company.html': 'service-shelf-company.html',
  'services/tax-residency': 'service-tax-residency.html',
  'service-tax-residency.html': 'service-tax-residency.html',
  'services/annual-renewals': 'service-annual-renewals.html',
  'service-annual-renewals.html': 'service-annual-renewals.html',
  'pricing/self-ubo': 'pricing-self-ubo.html',
  'pricing-self-ubo.html': 'pricing-self-ubo.html',
  'pricing/nominee-ubo': 'pricing-nominee-ubo.html',
  'pricing-nominee-ubo.html': 'pricing-nominee-ubo.html',
  'pricing/shelf-company': 'pricing-shelf-company.html',
  'pricing-shelf-company.html': 'pricing-shelf-company.html',
  'lp/tax-guide': '0-tax-guide-cta.html',
  'lp/whatsapp-consultation': '1-whatsapp-specialist-cta.html',
  'lp/strategy-call': '2-meeting-booking-cta.html',
  'lp/jurisdiction-comparison': '3-promo-banner.html',
}

function readPageFile(fileName: string) {
  const fullPath = path.join(pagesDir, fileName)
  if (!fullPath.startsWith(pagesDir) || !fs.existsSync(fullPath)) return null
  return fs.readFileSync(fullPath, 'utf8')
}

function extractBody(html: string) {
  const styles = [...html.matchAll(/<style[\s\S]*?<\/style>/gi)].map((match) => match[0]).join('\n')
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  return bodyMatch ? `${styles}\n${bodyMatch[1]}` : html
}

function readChatBubble() {
  const raw = readPageFile('4-whatsapp-chat-bubble.html') || ''
  const marker = raw.indexOf('<!-- GCC Startup')
  return marker >= 0 ? raw.slice(marker) : raw
}

function normalizeHtml(html: string) {
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || process.env.ADMIN_WHATSAPP || '447868762416').replace(/\D/g, '')
  return extractBody(html)
    .replace(/var CMS\s*=\s*'https:\/\/cms\.gccstartup\.com'/g, "var CMS='' ")
    .replace(/const LEAD_ENDPOINT\s*=\s*''/g, "const LEAD_ENDPOINT='/api/lead'")
    .replace(/https:\/\/cms\.gccstartup\.com\/api\/lead/g, '/api/lead')
    .replace(/wa\.me\/447868762416/g, `wa.me/${whatsapp}`)
    .replace(/wa\.me\/gccstartup/g, `wa.me/${whatsapp}`)
    .replace(/YOURWHATSAPPNUMBER/g, whatsapp)
    .replace(/href="index\.html/g, 'href="/')
    .replace(/href="country-uae\.html/g, 'href="/uae')
    .replace(/href="country-bahrain\.html/g, 'href="/bahrain')
    .replace(/href="country-hongkong\.html/g, 'href="/hongkong')
    .replace(/href="country-singapore\.html/g, 'href="/singapore')
    .replace(/href="country-ireland\.html/g, 'href="/ireland')
    .replace(/href="country-bvi-cayman\.html/g, 'href="/bvi-cayman')
    .replace(/href="service-company-registration\.html/g, 'href="/services/company-registration')
    .replace(/href="service-bank-account\.html/g, 'href="/services/bank-account')
    .replace(/href="service-nominee-ubo\.html/g, 'href="/services/nominee-ubo')
    .replace(/href="service-shelf-company\.html/g, 'href="/services/shelf-company')
    .replace(/href="service-tax-residency\.html/g, 'href="/services/tax-residency')
    .replace(/href="service-annual-renewals\.html/g, 'href="/services/annual-renewals')
    .replace(/href="pricing-self-ubo\.html/g, 'href="/pricing/self-ubo')
    .replace(/href="pricing-nominee-ubo\.html/g, 'href="/pricing/nominee-ubo')
    .replace(/href="pricing-shelf-company\.html/g, 'href="/pricing/shelf-company')
}

export function getStaticPage(route: string) {
  const cleanRoute = route.replace(/^\/+|\/+$/g, '')
  const fileName = staticPageMap[cleanRoute]
  if (!fileName) return null
  const page = readPageFile(fileName)
  if (!page) return null
  return `${normalizeHtml(page)}\n${normalizeHtml(readChatBubble())}`
}

export function staticPageTitle(route: string) {
  const fileName = staticPageMap[route.replace(/^\/+|\/+$/g, '')]
  if (!fileName) return 'GCC Startup'
  const html = readPageFile(fileName) || ''
  return html.match(/<title>(.*?)<\/title>/i)?.[1] || 'GCC Startup'
}
