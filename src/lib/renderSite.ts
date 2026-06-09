/**
 * Renders the marketing pages by driving the EXISTING HTML generator
 * (website-static/build_pages.cjs) with content pulled from Payload.
 * No React rewrite — same design, same microtools, content from the CMS.
 */
import { createRequire } from 'module'
import path from 'path'
import fs from 'fs'

const requireCjs = createRequire(import.meta.url)

// Find the HTML generator wherever it landed in the image; print diagnostics if missing.
let cachedGen: any = null
const gen = () => {
  if (cachedGen) return cachedGen
  const cwd = process.cwd()
  const tries = [
    path.join(cwd, 'website-static', 'build_pages.cjs'),
    path.join(cwd, '.next', 'server', 'website-static', 'build_pages.cjs'),
    '/app/website-static/build_pages.cjs',
  ]
  for (const p of tries) {
    if (fs.existsSync(p)) {
      cachedGen = requireCjs(p)
      return cachedGen
    }
  }
  let cwdList: string[] = []
  try { cwdList = fs.readdirSync(cwd) } catch {}
  throw new Error(
    `[renderSite] generator not found. cwd=${cwd}; tried=${tries.join(' | ')}; cwd contents=[${cwdList.join(', ')}]`,
  )
}

const pairs = (a: any[] = []) => (a || []).map((x: any) => [x.title, x.desc])
const items = (a: any[] = [], k = 'item') => (a || []).map((x: any) => x[k])

const relatedDefault =
  '<a href="/#tiers" class="btn btn-ghost btn-arrow">See pricing</a>' +
  '<a href="mailto:info@gccstartup.com?subject=Enquiry" class="btn btn-fill">Get started</a>'

export function countryHTML(doc: any): string {
  const g = gen()
  return g.linkFix(
    g.countryPage({
      slug: doc.slug, name: doc.name, flag: doc.flag, file: `country-${doc.slug}.html`,
      tax: doc.tax, timeline: doc.timeline, from: doc.fromPrice, workDays: doc.workDays || 14,
      headline: doc.headline || doc.name, intro: doc.intro || '',
      benefits: pairs(doc.benefits), docs: items(doc.documents), process: pairs(doc.process),
      faq: doc.faq || [],
    }),
  )
}

export function serviceHTML(doc: any): string {
  const g = gen()
  return g.linkFix(
    g.servicePage({
      slug: doc.slug, name: doc.name, file: `service-${doc.slug}.html`,
      headline: doc.headline || doc.name, intro: doc.intro || '',
      meta: (doc.statChips || []).map((m: any) => [m.value, m.label]),
      features: pairs(doc.features), process: pairs(doc.process), faq: doc.faq || [],
      related: relatedDefault,
    }),
  )
}

export function pricingHTML(doc: any): string {
  const g = gen()
  return g.linkFix(
    g.pricingPage({
      slug: doc.slug, name: doc.name, tierLabel: doc.tierLabel, featured: !!doc.featured,
      price: doc.price, note: doc.priceNote, intro: doc.intro || '',
      features: pairs(doc.features), whofor: items(doc.whoFor), process: pairs(doc.process),
      faq: doc.faq || [],
    }),
  )
}

export function homeHTML(hp: any, settings: any): string {
  const g = gen()
  return g.homepageHTML(hp, settings)
}

export const htmlResponse = (html: string, status = 200) =>
  new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8' } })
