/**
 * Seed Payload with the existing GCC Startup content.
 * Reuses the exact data exported from ../build_pages.js (no duplication).
 *
 * Run from the cms/ project (after `cp .env.example .env` and `pnpm install`):
 *   pnpm dlx tsx seed.ts          (or add a "seed": "tsx seed.ts" script)
 *
 * Idempotent: upserts by slug, so you can re-run it safely.
 */
import { getPayload } from 'payload'
import config from './src/payload.config'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
// Reuse the bundled generator's data (no website-static / fs dependency)
const { countries, services, tiers } = require('./src/site/generator.cjs') as {
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
      statChips: (s.meta || []).map(([value, label]: [string, string]) => ({ value, label })),
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
      process: [
        { title: 'Initial consultation', desc: 'Contact us by WhatsApp or email. We discuss your goals, budget, preferred jurisdiction, and timeline. No commitment required.' },
        { title: 'Strategic recommendation', desc: 'We recommend the optimal jurisdiction, tier, and structure. A formal proposal with all costs, timelines, and renewal terms follows.' },
        { title: 'KYC & government filing', desc: 'You submit your documents. We handle all government applications, filings, and compliance. Status updates via WhatsApp throughout.' },
        { title: 'Handover & ongoing support', desc: 'Company registered, banking active. Full document handover with credentials. GCCStartup remains available for renewals and expansion.' }
      ],
      footerCta: {
        headline: 'Your global company is<br><em>15 minutes away.</em>',
        subhead: 'Book a free strategy call — direct with the founder. No obligation, no sales script. Just a straight answer on the fastest, most tax-efficient way to set up.',
        primaryCta: 'Book a free call',
        secondaryCta: 'WhatsApp us'
      }
    },
  })

  await payload.updateGlobal({
    slug: 'partnerPage', overrideAccess: true,
    data: {
      seo: {
        metaTitle: 'Join the Global Verification Network | GCCstartup Partners',
        metaDesc: 'Earn $100 USD per completed corporate verification. Join GCCstartup as an independent remote director or representative in the Philippines. Secure, 100% remote, and free to join.',
      },
      urgencyBar: 'Now Accepting Remote Verification Partners in the Philippines &nbsp;·&nbsp; <strong>Limited intake open</strong>',
      hero: {
        badge: '● Now Accepting Partners — Philippines',
        heroHeadline: 'Earn <em>$100 USD</em> per Completed<br>Corporate Verification.',
        heroSubhead: 'Become an independent remote director or entity representative for international companies entering global markets. 100% remote, zero upfront fees, and guaranteed milestone-based payouts.',
        heroCta: 'Check Your Eligibility ↓',
        heroFine: 'Takes less than 60 seconds. No identity documents required to apply today.',
      },
      stats: [
        { number: '$100', label: 'Per verification payout' },
        { number: '100%', label: 'Remote — work from anywhere' },
        { number: '$0',   label: 'Zero fees to join' },
        { number: '500+', label: 'Global corporate clients' },
      ],
      howItWorks: {
        howLabel: 'How It Works',
        howHeadline: '3 Simple Steps to Your First Payout',
        howIntro: 'No experience required. No upfront costs. Just follow the process and collect your milestone payment.',
        steps: [
          { title: 'Submit Eligibility', desc: 'Fill out our quick 1-minute basic registration form below. We only require your contact details and asset readiness to start — <strong>no sensitive ID uploads or documents are needed at this stage.</strong>' },
          { title: 'WhatsApp Orientation', desc: 'When an international corporate client matches your profile, our automation engine will reach out to you directly on WhatsApp. You\'ll receive a short step-by-step instructional video detailing the specific assignment.' },
          { title: 'Verify & Get Paid', desc: 'Complete the secure identity verification (KYC) checkpoint for the assigned entity. Once the milestone is successfully achieved, your <strong>$100 USD payout is instantly released</strong> to your account.' },
        ],
      },
      applySection: {
        applyLabel: 'Secure Application',
        applyHeadline: 'Apply for the Network',
        applySubhead: 'Complete this basic screening form to log your profile into our backend matching database. One minute. No documents needed today.',
      },
      faqSection: {
        faqLabel: 'Common Questions',
        faqHeadline: 'Everything You Need to Know',
        faqIntro: 'Answers to the most common questions from prospective partners.',
        faq: [
          { q: 'Do I need formal corporate experience?', a: 'No. GCC Startup provides all training and materials. If you meet the basic eligibility — a valid passport and an active bank account — you can apply.' },
          { q: 'How and when do I get paid?', a: 'Payments are milestone-based. Once the KYC verification for an assigned entity is successfully completed, your $100 USD payout is processed immediately to your nominated bank account.' },
          { q: 'Is there any cost to join?', a: 'Zero. There is no registration fee, no training fee, and no subscription. We earn when you earn.' },
          { q: 'What does the verification process actually involve?', a: 'You will receive a short instructional video via WhatsApp explaining the specific assignment. It typically involves verifying your identity as a representative for a corporate structure — a straightforward, guided process.' },
          { q: 'How many verifications can I do?', a: 'There is no cap. Once you are in the network and successfully complete your first milestone, you become eligible for repeat assignments as more international clients are matched to your profile.' },
          { q: 'Is this legal and compliant?', a: 'Yes. All structures and verification processes are fully compliant with international KYC, AML and corporate governance standards. GCC Startup operates across regulated jurisdictions globally.' },
        ],
      },
      successState: {
        successTitle: 'Application Received!',
        successBody: 'Your profile has been logged in our matching database. When a corporate client matches your profile, you\'ll receive a WhatsApp message with your assignment details and instructional video.',
      },
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
