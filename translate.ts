/**
 * Machine-translates the whole site into every non-English locale using
 * Google Cloud Translate (v2 REST API). Run AFTER `pnpm seed`:
 *
 *   GOOGLE_TRANSLATE_API_KEY=xxxx pnpm tsx translate.ts
 *   # or put GOOGLE_TRANSLATE_API_KEY in .env
 *
 * It does three things, each idempotent (safe to re-run):
 *   A) UI chrome strings  -> src/site/locales/<code>.json
 *   B) CMS content        -> Payload localized fields (countries/services/
 *                            pricingTiers + homepage/siteSettings globals)
 *   C) Homepage template  -> src/site/indexHtml.<code>.b64.cjs
 *
 * English is the source and is never overwritten. Anything that fails to
 * translate falls back to English at render time, so the site never breaks.
 */
import { getPayload } from 'payload'
import config from './src/payload.config'
import { createRequire } from 'module'
import fs from 'fs'
import path from 'path'

const require = createRequire(import.meta.url)
const I18N = require('./src/site/i18n.cjs') as any
const { countries, services, tiers } = require('./src/site/generator.cjs') as any

const API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || process.env.GOOGLE_API_KEY
if (!API_KEY) {
  console.error('✗ Set GOOGLE_TRANSLATE_API_KEY (Google Cloud Translate v2 API key).')
  process.exit(1)
}

const TARGETS = I18N.LOCALES.filter((l: any) => l.code !== 'en')
const SITE_DIR = path.join(process.cwd(), 'src', 'site')
const LOCALES_DIR = path.join(SITE_DIR, 'locales')

// ── Google Translate v2 (batched) ───────────────────────────────────────────
async function googleTranslate(texts: string[], target: string, format: 'text' | 'html'): Promise<string[]> {
  const out: string[] = []
  for (let i = 0; i < texts.length; i += 100) {
    const batch = texts.slice(i, i + 100)
    const res = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: batch, source: 'en', target, format }),
    })
    if (!res.ok) throw new Error(`Google Translate ${res.status}: ${await res.text()}`)
    const json: any = await res.json()
    for (const t of json.data.translations) out.push(t.translatedText)
  }
  return out
}

// Protect {placeholder} tokens so the translator never touches them.
const SENT = (i: number) => `[[${i}]]`
function protect(s: string): { masked: string; vars: string[] } {
  const vars: string[] = []
  const masked = s.replace(/\{[^}]+\}/g, (m) => {
    vars.push(m)
    return SENT(vars.length - 1)
  })
  return { masked, vars }
}
function restore(s: string, vars: string[]): string {
  let out = s
  vars.forEach((v, i) => {
    out = out.split(SENT(i)).join(v).split(`[[ ${i} ]]`).join(v)
  })
  return out
}

// ── A) UI chrome strings ─────────────────────────────────────────────────────
async function translateChrome() {
  fs.mkdirSync(LOCALES_DIR, { recursive: true })
  const masks = I18N.STRINGS.map((s: string) => protect(s))
  for (const loc of TARGETS) {
    const translated = await googleTranslate(masks.map((m: any) => m.masked), loc.google, 'html')
    const dict: Record<string, string> = {}
    I18N.STRINGS.forEach((src: string, i: number) => {
      dict[src] = restore(translated[i], masks[i].vars)
    })
    fs.writeFileSync(path.join(LOCALES_DIR, `${loc.code}.json`), JSON.stringify(dict, null, 2))
    console.log(`A) chrome -> locales/${loc.code}.json (${I18N.STRINGS.length} strings)`)
  }
}

// ── B) CMS content ───────────────────────────────────────────────────────────
const TRANSLATE_KEYS = new Set([
  'name', 'tax', 'timeline', 'headline', 'intro', 'title', 'desc', 'item',
  'label', 'q', 'a', 'eyebrow', 'subhead', 'primaryCta', 'secondaryCta',
  'about', 'legal',
])

// Walk an object; collect every translatable string with a setter, then bulk-translate.
function collect(obj: any, sink: { val: string; set: (v: string) => void }[]) {
  if (Array.isArray(obj)) {
    obj.forEach((v) => collect(v, sink))
  } else if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      const v = obj[k]
      if (typeof v === 'string' && TRANSLATE_KEYS.has(k) && v.trim()) {
        sink.push({ val: v, set: (nv: string) => { obj[k] = nv } })
      } else {
        collect(v, sink)
      }
    }
  }
}

async function translateDoc(data: any, target: string) {
  const sink: { val: string; set: (v: string) => void }[] = []
  collect(data, sink)
  if (!sink.length) return data
  const translated = await googleTranslate(sink.map((s) => s.val), target, 'html')
  sink.forEach((s, i) => s.set(translated[i]))
  return data
}

async function translateContent(payload: any) {
  const collMap: Record<string, any[]> = { countries, services, pricingTiers: tiers }
  for (const [collection, list] of Object.entries(collMap)) {
    for (const item of list) {
      const found = await payload.find({ collection, where: { slug: { equals: item.slug } }, limit: 1, locale: 'en', overrideAccess: true })
      const doc = found.docs[0]
      if (!doc) continue
      for (const loc of TARGETS) {
        const data = await translateDoc(stripMeta(doc), loc.google)
        await payload.update({ collection, id: doc.id, data, locale: loc.code, overrideAccess: true })
      }
      console.log(`B) ${collection}/${item.slug} -> ${TARGETS.length} locales`)
    }
  }
  for (const slug of ['homepage', 'siteSettings']) {
    const en = await payload.findGlobal({ slug, locale: 'en', overrideAccess: true }).catch(() => null)
    if (!en) continue
    for (const loc of TARGETS) {
      const data = await translateDoc(stripMeta(en), loc.google)
      await payload.updateGlobal({ slug, data, locale: loc.code, overrideAccess: true })
    }
    console.log(`B) global/${slug} -> ${TARGETS.length} locales`)
  }
}

// Drop fields Payload manages so update() doesn't choke.
function stripMeta(doc: any) {
  const d = JSON.parse(JSON.stringify(doc))
  for (const k of ['id', 'createdAt', 'updatedAt', 'globalType', '_status']) delete d[k]
  return d
}

// ── C) Homepage template (index.html) ────────────────────────────────────────
async function translateHomepage() {
  const b64 = require('./src/site/indexHtml.b64.cjs') as string
  const html = Buffer.from(b64, 'base64').toString('utf8')

  // Protect <script> and <style> blocks (must NOT be translated).
  const blocks: string[] = []
  const masked = html.replace(/<(script|style)[\s\S]*?<\/\1>/gi, (m) => {
    blocks.push(m)
    return `<!--GCCB${blocks.length - 1}-->`
  })

  // Translate in chunks on tag boundaries to stay under request limits.
  const parts = masked.match(/[\s\S]{1,4000}(?=<|$)/g) || [masked]
  for (const loc of TARGETS) {
    const translatedParts = await googleTranslate(parts, loc.google, 'html')
    let out = translatedParts.join('')
    out = out.replace(/<!--\s*GCCB(\d+)\s*-->/g, (_, n) => blocks[Number(n)]) // restore code
    const outB64 = Buffer.from(out, 'utf8').toString('base64')
    fs.writeFileSync(
      path.join(SITE_DIR, `indexHtml.${loc.code}.b64.cjs`),
      `module.exports = ${JSON.stringify(outB64)};\n`,
    )
    console.log(`C) homepage -> indexHtml.${loc.code}.b64.cjs`)
  }
}

async function run() {
  console.log(`Translating into: ${TARGETS.map((l: any) => l.code).join(', ')}\n`)
  await translateChrome()
  const payload = await getPayload({ config })
  await translateContent(payload)
  await translateHomepage()
  console.log('\n✓ Translation complete. Rebuild/redeploy the app to serve translated pages.')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
