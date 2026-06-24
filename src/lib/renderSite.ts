/**
 * Renders the marketing pages by driving the HTML generator with CMS content.
 * The generator + its i18n/template files are committed to src/site/ —
 * no runtime file reads, so nothing can go missing in the container.
 */
// @ts-ignore - bundled CommonJS generator (no type declarations needed)
import generator from '@/site/generator.cjs'

const gen: any = generator

const pairs = (a: any[] = []) => (a || []).map((x: any) => [x.title, x.desc])
const items = (a: any[] = [], k = 'item') => (a || []).map((x: any) => x[k])

/** Extract SEO meta from a Payload doc (seoPlugin adds doc.meta.{title,description,image}) */
function extractMeta(doc: any) {
  const m = doc?.meta || {}
  return {
    title: m.title || '',
    description: m.description || '',
    image: m.image?.url || '',
    canonical: '',
    robots: m.robots || 'index, follow',
  }
}

const relatedDefault =
  '<a href="/#tiers" class="btn btn-ghost btn-arrow">See pricing</a>' +
  '<a href="mailto:info@gccstartup.com?subject=Enquiry" class="btn btn-fill">Get started</a>'

export function countryHTML(doc: any, locale = 'en', settings: any = {}): string {
  const meta = extractMeta(doc)
  return gen.linkFix(
    gen.countryPage({
      slug: doc.slug, name: doc.name, flag: doc.flag, file: `country-${doc.slug}.html`,
      tax: doc.tax, timeline: doc.timeline, from: doc.fromPrice, workDays: doc.workDays || 14,
      headline: doc.headline || doc.name, intro: doc.intro || '',
      benefits: pairs(doc.benefits), docs: items(doc.documents), process: pairs(doc.process),
      faq: doc.faq || [],
      metaTitle: meta.title, metaDesc: meta.description, metaImage: meta.image,
      canonical: meta.canonical, robots: meta.robots,
    }, locale, settings),
    locale,
  )
}

export function serviceHTML(doc: any, locale = 'en', settings: any = {}): string {
  const meta = extractMeta(doc)
  // relatedLinks is an array of {label, url} from the CMS; fall back to default buttons
  const relatedHTML = Array.isArray(doc.relatedLinks) && doc.relatedLinks.length
    ? doc.relatedLinks.map((r: any) => `<a href="${r.url}" class="btn btn-ghost btn-arrow">${r.label}</a>`).join('')
    : relatedDefault
  return gen.linkFix(
    gen.servicePage({
      slug: doc.slug, name: doc.name, file: `service-${doc.slug}.html`,
      headline: doc.headline || doc.name, intro: doc.intro || '',
      meta: (doc.statChips || []).map((m: any) => [m.value, m.label]),
      features: pairs(doc.features), process: pairs(doc.process), faq: doc.faq || [],
      related: relatedHTML,
      metaTitle: meta.title, metaDesc: meta.description, metaImage: meta.image,
      canonical: meta.canonical, robots: meta.robots,
    }, locale, settings),
    locale,
  )
}

export function pricingHTML(doc: any, locale = 'en', settings: any = {}): string {
  const meta = extractMeta(doc)
  return gen.linkFix(
    gen.pricingPage({
      slug: doc.slug, name: doc.name, tierLabel: doc.tierLabel, featured: !!doc.featured,
      price: doc.price, note: doc.priceNote, intro: doc.intro || '',
      features: pairs(doc.features), whofor: items(doc.whoFor), process: pairs(doc.process),
      faq: doc.faq || [],
      metaTitle: meta.title, metaDesc: meta.description, metaImage: meta.image,
      canonical: meta.canonical, robots: meta.robots,
    }, locale, settings),
    locale,
  )
}

export function homeHTML(hp: any, settings: any, locale = 'en'): string {
  return gen.homepageHTML(hp, settings, locale)
}

export function partnerPageHTML(data: any = {}, settings: any = {}): string {
  return gen.linkFix(gen.partnerPageHTML(data, settings), 'en')
}

/** Supported locale codes (en + translated). Used by route handlers. */
export const LOCALES: string[] = gen.i18n.CODES
export const isLocale = (c: string): boolean => gen.i18n.CODES.includes(c)

export const htmlResponse = (html: string, status = 200) =>
  new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8' } })
