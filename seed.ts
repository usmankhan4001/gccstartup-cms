/**
 * Seed Payload with the existing GCC Startup content.
 * Reuses the exact data exported from ../build_pages.js (no duplication).
 *
 * Run from the cms/ project (after `cp .env.example .env` and `pnpm install`):
 *   pnpm dlx tsx seed.ts          (or add a "seed": "tsx seed.ts" script)
 *
 * Idempotent: upserts by slug, so you can re-run it safely.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
// build_pages.js ships inside the repo, next to the static site source
const { countries, services, tiers } = require('./website-static/build_pages.cjs') as {
  countries: any[]
  services: any[]
  tiers: any[]
}

const REGION: Record<string, string> = {
  uae: 'gulf', bahrain: 'gulf', hongkong: 'asia', singapore: 'asia', ireland: 'europe', 'bvi-cayman': 'offshore',
}
const ICON: Record<string, string> = {
  'company-registration': 'building', 'bank-account': 'bank', 'nominee-ubo': 'shield',
  'shelf-company': 'box', 'tax-residency': 'id', 'annual-renewals': 'refresh',
}
const pairs = (arr: any[]) => (arr || []).map(([title, desc]: [string, string]) => ({ title, desc }))
const items = (arr: any[]) => (arr || []).map((item: string) => ({ item }))

async function upsert(payload: any, collection: string, slug: string, data: any) {
  const found = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, overrideAccess: true })
  if (found.docs.length) {
    await payload.update({ collection, id: found.docs[0].id, data, overrideAccess: true })
    console.log(`updated ${collection}/${slug}`)
  } else {
    await payload.create({ collection, data, overrideAccess: true })
    console.log(`created ${collection}/${slug}`)
  }
}

async function run() {
  const payload = await getPayload({ config })

  for (const c of countries) {
    await upsert(payload, 'countries', c.slug, {
      name: c.name, slug: c.slug, flag: c.flag, region: REGION[c.slug],
      tax: c.tax, timeline: c.timeline, fromPrice: c.from, workDays: c.workDays,
      headline: c.headline, intro: c.intro,
      benefits: pairs(c.benefits), documents: items(c.docs), process: pairs(c.process),
      faq: c.faq,
    })
  }

  for (const s of services) {
    await upsert(payload, 'services', s.slug, {
      name: s.name, slug: s.slug, icon: ICON[s.slug],
      headline: s.headline, intro: s.intro,
      meta: (s.meta || []).map(([value, label]: [string, string]) => ({ value, label })),
      features: pairs(s.features), process: pairs(s.process), faq: s.faq,
    })
  }

  for (const t of tiers) {
    await upsert(payload, 'pricingTiers', t.slug, {
      name: t.name, slug: t.slug, tierLabel: t.tierLabel, featured: !!t.featured,
      price: t.price, priceNote: t.note, intro: t.intro,
      features: pairs(t.features), whoFor: items(t.whofor), process: pairs(t.process), faq: t.faq,
    })
  }

  await payload.updateGlobal({
    slug: 'homepage', overrideAccess: true,
    data: {
      hero: {
        eyebrow: 'Company Formation · Global Banking · Tax Residency',
        headline: 'Legally pay <em>0% tax.</em><br>Bank globally. Own 100%.',
        subhead: 'Launch your company in the UAE, Bahrain, Hong Kong & beyond — with real bank accounts, full privacy, and total ownership. Founder-led by a Finance Director. Set up in days, not months.',
        primaryCta: 'Start My Company Today',
        secondaryCta: 'Get the Free 2026 Guide',
      },
      stats: [
        { number: '15+', label: 'Jurisdictions covered' },
        { number: '500+', label: 'Companies registered' },
        { number: '48h', label: 'Fastest shelf company' },
        { number: '0%', label: 'Tax rate in Bahrain' },
      ],
      sections: [
        { key: 'services', eyebrow: 'What we do', title: 'Everything you need to go global — under one roof.', intro: 'Formation, real banking, privacy, and ongoing compliance. One expert partner handles your entire international structure, start to finish.' },
        { key: 'jurisdictions', eyebrow: 'Where we operate', title: 'Pick the country that pays you back.', intro: 'We match your income, lifestyle, and tax situation to the jurisdiction that actually fits — not just the most popular one.' },
        { key: 'pricing', eyebrow: 'Pricing', title: 'Simple pricing. Zero surprises.', intro: 'Every cost on the table before you sign — government fees, service charges, and renewals all agreed upfront.' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'siteSettings', overrideAccess: true,
    data: {
      brandName: 'GCC Startup',
      contact: { email: 'info@gccstartup.com', whatsappNumber: '' },
      footer: {
        about: 'Global company registration and tax optimization. Founded by a Finance Director with deep UAE oil & gas corporate finance expertise. Trusted by 500+ entrepreneurs worldwide.',
        legal: 'Tax optimization services. Not legal or financial advice. All structures are jurisdiction-compliant.',
      },
    },
  })

  console.log('✓ Seed complete.')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
