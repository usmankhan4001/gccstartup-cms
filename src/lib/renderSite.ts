/**
 * Renders the marketing pages by driving the HTML generator with CMS content.
 * The generator + its index.html template are BUNDLED (src/site/*) — no runtime
 * file reads, so nothing can go missing in the container.
 */
// @ts-ignore - bundled CommonJS generator (no type declarations needed)
import generator from '@/site/generator.cjs'

const gen: any = generator

const pairs = (a: any[] = []) => (a || []).map((x: any) => [x.title, x.desc])
const items = (a: any[] = [], k = 'item') => (a || []).map((x: any) => x[k])

const relatedDefault =
  '<a href="/#tiers" class="btn btn-ghost btn-arrow">See pricing</a>' +
  '<a href="mailto:info@gccstartup.com?subject=Enquiry" class="btn btn-fill">Get started</a>'

export function countryHTML(doc: any, locale = 'en'): string {
  return gen.linkFix(
    gen.countryPage({
      slug: doc.slug, name: doc.name, flag: doc.flag, file: `country-${doc.slug}.html`,
      tax: doc.tax, timeline: doc.timeline, from: doc.fromPrice, workDays: doc.workDays || 14,
      headline: doc.headline || doc.name, intro: doc.intro || '',
      benefits: pairs(doc.benefits), docs: items(doc.documents), process: pairs(doc.process),
      faq: doc.faq || [],
    }, locale),
    locale,
  )
}

export function serviceHTML(doc: any, locale = 'en'): string {
  return gen.linkFix(
    gen.servicePage({
      slug: doc.slug, name: doc.name, file: `service-${doc.slug}.html`,
      headline: doc.headline || doc.name, intro: doc.intro || '',
      meta: (doc.statChips || []).map((m: any) => [m.value, m.label]),
      features: pairs(doc.features), process: pairs(doc.process), faq: doc.faq || [],
      related: relatedDefault,
    }, locale),
    locale,
  )
}

export function pricingHTML(doc: any, locale = 'en'): string {
  return gen.linkFix(
    gen.pricingPage({
      slug: doc.slug, name: doc.name, tierLabel: doc.tierLabel, featured: !!doc.featured,
      price: doc.price, note: doc.priceNote, intro: doc.intro || '',
      features: pairs(doc.features), whofor: items(doc.whoFor), process: pairs(doc.process),
      faq: doc.faq || [],
    }, locale),
    locale,
  )
}

export function homeHTML(hp: any, settings: any, locale = 'en'): string {
  return gen.homepageHTML(hp, settings, locale)
}

/** Supported locale codes (en + translated). Used by route handlers. */
export const LOCALES: string[] = gen.i18n.CODES
export const isLocale = (c: string): boolean => gen.i18n.CODES.includes(c)

export const htmlResponse = (html: string, status = 200) =>
  new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8' } })

export function partnerPageHTML(): string {
  return gen.partnerPageHTML()
}
