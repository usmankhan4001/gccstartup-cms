import { getPayload } from 'payload'
import config from './src/payload.config'

const countries = [
  {
    slug:'uae', flag:'🇦🇪', name:'UAE', file:'country-uae.html',
    tax:'9% / 0% on foreign income', timeline:'~30 days incl. visit', from:'$1,500', workDays:18,
    headline:'Set up in the <em>UAE</em> — 0% personal tax, world-class banking.',
    intro:'The Gulf’s most credible base for founders who want substance and status. Emirates ID, full tax residency, top-tier banking and 100% ownership — handled end to end, in days.',
    benefits:[
      ['0% personal income tax','No tax on your salary, dividends or personal income as a UAE tax resident.'],
      ['Residency visa & Emirates ID','Renewable residence visa for you and your family, with full banking and lifestyle access.'],
      ['100% foreign ownership','Own your company outright in both free zones and most mainland activities.'],
      ['World-class banking','Emirates NBD, FAB, RAK Bank and Mashreq — credible accounts recognised globally.'],
      ['9% corporate tax (with relief)','Low headline corporate tax, with a 0% band on the first AED 375,000 of profit.'],
      ['Double-tax treaty network','140+ treaties protect you from being taxed twice on the same income.'],
    ],
    docs:['Passport copy (all shareholders/directors)','Passport-size photograph','3 proposed company names','Chosen business activity','Proof of residential address','Bank reference letter','CV or professional profile','NOC from current sponsor (if UAE-resident)'],
    process:[
      ['Consultation','We confirm your goals, the right emirate, free zone vs mainland, and a fixed quote.'],
      ['Activity & name approval','We reserve your trade name and secure initial activity approval from the authority.'],
      ['License & establishment card','Your trade license and establishment card are issued; we prepare your visa file.'],
      ['Banking & Emirates ID','We open your corporate account and complete your residency visa and Emirates ID.'],
    ],
    faq:[
      {q:'Do I need to visit the UAE in person?',a:'For full residency and local banking, yes — a short visit of around a week is required for biometrics, the medical and bank KYC. We also offer a remote setup option that excludes personal tax residency.'},
      {q:'Free zone or mainland — which is right for me?',a:'Free zones give 100% ownership, fast setup and are ideal for services, e-commerce and holding. Mainland is best if you need to trade directly with the UAE market or take government contracts. We recommend based on your actual activity.'},
      {q:'Does the 9% corporate tax apply to me?',a:'Corporate tax is 9% on taxable profit above AED 375,000; profit below that is 0%. Qualifying free-zone income can remain at 0%. We structure your entity to use every relief you are entitled to.'},
      {q:'Can I open the bank account remotely?',a:'Local Tier-1 banks generally require one in-person meeting. If you want fully remote banking, we pair your UAE company with a fintech account (Wise, Airwallex) while the local account is arranged.'},
      {q:'Can my family get visas too?',a:'Yes. Once your residency is issued you can sponsor your spouse and children. We handle the dependant visa applications as part of the package.'},
    ],
  },
  {
    slug:'bahrain', flag:'🇧🇭', name:'Bahrain', file:'country-bahrain.html',
    tax:'0% corporate tax', timeline:'~30 days incl. visit', from:'$1,500', workDays:18,
    headline:'Go live in <em>Bahrain</em> — 0% corporate tax, lower cost.',
    intro:'The Gulf’s most tax-efficient base: 0% corporate income tax, cheaper than the UAE, credible local banking, and a 25-minute bridge straight into the Saudi market.',
    benefits:[
      ['0% corporate income tax','No corporate income tax on your trading profits — the strongest headline rate in the Gulf.'],
      ['Lower cost than the UAE','Comparable Gulf credibility and banking at a meaningfully lower setup and renewal cost.'],
      ['Gateway to Saudi Arabia','A 25-minute causeway to the largest GCC market — popular for regional trading bases.'],
      ['Credible local banking','Established Bahraini and regional banks with strong correspondent relationships.'],
      ['Tax residency available','Personal tax residency with in-person setup, useful for relocating founders.'],
      ['100% foreign ownership','Full foreign ownership across a wide range of commercial activities.'],
    ],
    docs:['Passport copy (all shareholders/directors)','Passport-size photograph','Proposed company names','Business activity description','Proof of residential address','Bank reference letter','CV or professional profile','Educational certificates (some activities)'],
    process:[
      ['Consultation','We confirm activity, structure and a fixed all-in quote for your Bahrain entity.'],
      ['Name & commercial registration','We reserve the name and file your Commercial Registration (CR) with the Ministry.'],
      ['License issuance','Your CR and activity license are issued; we prepare your residency file if needed.'],
      ['Banking & handover','We open your corporate account, complete residency, and hand over all credentials.'],
    ],
    faq:[
      {q:'Is Bahrain really 0% corporate tax?',a:'Yes — Bahrain levies no corporate income tax on most commercial activities (oil & gas is the main exception). For trading, consulting, e-commerce and holding companies, profits are untaxed at the corporate level.'},
      {q:'Why choose Bahrain over the UAE?',a:'Bahrain offers similar Gulf credibility and 0% corporate tax at a lower cost, plus direct access to Saudi Arabia. The UAE wins on global brand recognition and lifestyle; Bahrain wins on price and Saudi proximity.'},
      {q:'Do I need to visit Bahrain?',a:'For local banking and tax residency a short in-person visit is required. A remote-registration option is available if you only need the entity and will bank via fintech.'},
      {q:'How long does setup take?',a:'Commercial Registration is typically issued within a few weeks; allow around 30 days end-to-end including the banking visit and residency steps.'},
      {q:'Can I use Bahrain to trade into Saudi Arabia?',a:'Yes — many clients use a Bahrain base to service Saudi clients. We can advise on the structure and any Saudi registration needed for direct in-Kingdom activity.'},
    ],
  },
  {
    slug:'hongkong', flag:'🇭🇰', name:'Hong Kong', file:'country-hongkong.html',
    tax:'0% on foreign-sourced income', timeline:'17–18 days, remote', from:'$2,000', workDays:13,
    headline:'Launch in <em>Hong Kong</em> — 100% remote, 0% on foreign income.',
    intro:'The digital founder’s favourite: incorporate fully online in under three weeks, pay 0% on foreign-sourced profits, and bank fast with Airwallex &amp; Wise — without ever flying out.',
    benefits:[
      ['0% on foreign-sourced income','Hong Kong taxes only locally-sourced profits — offshore income can be fully exempt.'],
      ['100% remote setup','No need to travel. The entire incorporation is handled online in under three weeks.'],
      ['Fintech banking','Fast accounts with Airwallex, Wise and Statrys — ideal for global digital businesses.'],
      ['Gateway to Asia & China','A trusted, English-common-law hub for trading with mainland China and Asia.'],
      ['Simple, low compliance','One annual return and audit — straightforward for owner-managed companies.'],
      ['Strong reputation','A top-tier financial centre that adds instant credibility with clients and platforms.'],
    ],
    docs:['Passport copy (all directors/shareholders)','Proof of residential address (each individual)','Proposed company name (English &/or Chinese)','Brief business description','Director & shareholder details','Significant Controllers Register details'],
    process:[
      ['Consultation','We confirm the structure, share split and whether you’ll claim offshore status.'],
      ['Incorporation','We file with the Companies Registry and obtain your Certificate of Incorporation & BR.'],
      ['Fintech banking','We guide your Airwallex / Wise application from submission to approval.'],
      ['Handover','You receive all corporate documents and credentials, ready to invoice immediately.'],
    ],
    faq:[
      {q:'How does the 0% offshore tax claim work?',a:'Hong Kong is territorial: profits not sourced in Hong Kong are not taxed. If your clients, work and operations are outside Hong Kong, you can apply for an Offshore Profits Tax Exemption. We help document and file the claim correctly.'},
      {q:'Can I really set up without visiting?',a:'Yes — incorporation and fintech banking are 100% remote. Traditional bank branches may ask for a visit, but Airwallex, Wise and Statrys onboard online.'},
      {q:'Does Hong Kong require a local director?',a:'No local director is required — you can be the sole director and shareholder. A local company secretary and registered address are required, both of which we provide.'},
      {q:'Is an audit required every year?',a:'Yes, Hong Kong companies must file an annual audited return. It is straightforward for small companies and we can arrange the audit and filing for you.'},
      {q:'Who is Hong Kong best for?',a:'Digital service providers, consultants, agencies, SaaS and e-commerce sellers earning from clients outside Hong Kong who want remote setup, clean banking and a 0% offshore position.'},
    ],
  },
  {
    slug:'singapore', flag:'🇸🇬', name:'Singapore', file:'country-singapore.html',
    tax:'~5% effective (new co. relief)', timeline:'17–18 days, remote', from:'$2,000', workDays:13,
    headline:'Build in <em>Singapore</em> — Asia’s most trusted hub.',
    intro:'Enterprise-grade credibility with startup tax breaks, top-tier banking, and a resident nominee director included — so you own and control everything from anywhere in the world.',
    benefits:[
      ['Low effective tax','Startup exemptions and partial reliefs bring the effective rate on early profits to roughly 5%.'],
      ['Nominee director included','We provide the required resident director so you can own and control from abroad.'],
      ['Top-tier banking','DBS, OCBC and UOB — among the most respected banks in Asia.'],
      ['ASEAN credibility','A Singapore entity opens doors across Southeast Asia and with global enterprise clients.'],
      ['Strong IP & legal system','Reliable courts and robust IP protection for technology and brand-led businesses.'],
      ['Remote setup','Incorporation is handled online; most banking can be arranged remotely or with one visit.'],
    ],
    docs:['Passport copy (all directors/shareholders)','Proof of residential address','Proposed company name','Business activity (SSIC) description','Director & shareholder particulars','Brief CV / professional background'],
    process:[
      ['Consultation','We confirm the structure, the nominee-director arrangement and a fixed quote.'],
      ['Incorporation','We file with ACRA and appoint the resident director; your company is registered.'],
      ['Banking','We introduce and guide your application to DBS / OCBC / UOB or a fintech alternative.'],
      ['Handover','Full corporate kit and credentials handed over; ongoing compliance available.'],
    ],
    faq:[
      {q:'Why does Singapore require a nominee director?',a:'Singapore law requires at least one director who is ordinarily resident in Singapore. We provide a professional nominee director to satisfy this while you retain full beneficial ownership and control.'},
      {q:'What is the real tax rate?',a:'The headline rate is 17%, but the Start-Up Tax Exemption and partial exemptions substantially reduce tax on the first years of profit — an effective rate around 5% is common for qualifying new companies.'},
      {q:'Can I set up without flying to Singapore?',a:'Incorporation is fully remote. Some banks prefer a short in-person meeting; fintech and certain bank programmes allow remote onboarding, which we arrange.'},
      {q:'Do I keep control with a nominee director?',a:'Yes. The nominee is a non-executive, compliance-only appointment. You hold the shares, control the bank account and run the business. The arrangement is documented to protect you.'},
      {q:'Who is Singapore best for?',a:'Established and venture-backed businesses, fintechs and companies selling into Asian or enterprise markets that need a reputable, bankable regional headquarters.'},
    ],
  },
  {
    slug:'ireland', flag:'🇮🇪', name:'Ireland', file:'country-ireland.html',
    tax:'12.5% corporate tax', timeline:'2–3 days, remote', from:'$1,500', workDays:3,
    headline:'Incorporate in <em>Ireland</em> — your EU gateway in 2–3 days.',
    intro:'The lowest corporate tax in the EU, full single-market access, and the fastest setup we offer. The natural EU home for UK and global founders after Brexit.',
    benefits:[
      ['12.5% corporate tax','The lowest standard corporate rate in the European Union on trading income.'],
      ['Full EU market access','Sell across the EU single market with an English-speaking, common-law base.'],
      ['Fastest setup','Companies can be registered in just 2–3 working days — the quickest in our network.'],
      ['Post-Brexit UK alternative','The natural EU landing point for UK businesses needing continued EU presence.'],
      ['Extensive treaty network','A wide double-tax treaty network and EU directives reduce cross-border tax friction.'],
      ['Reputable & remote','A respected onshore EU jurisdiction with fully remote incorporation.'],
    ],
    docs:['Passport copy (all directors/shareholders)','Proof of residential address','Proposed company name','Business activity (NACE) description','Director & shareholder details','Details for the Register of Beneficial Ownership'],
    process:[
      ['Consultation','We confirm the structure and whether you need the non-resident director bond.'],
      ['Incorporation','We file with the CRO; your company is typically registered within 2–3 days.'],
      ['Banking & VAT','We arrange banking (bank or fintech) and register for VAT where required.'],
      ['Handover','Constitution, certificates and credentials handed over, ready to trade in the EU.'],
    ],
    faq:[
      {q:'Do I need an EEA-resident director?',a:'Irish companies need at least one EEA-resident director, OR a Section 137 non-resident directors’ bond if none of the directors are EEA-resident. We arrange the bond so non-EEA founders can own and direct the company.'},
      {q:'How fast can the company be registered?',a:'Using the CRO’s online scheme, incorporation is often completed in 2–3 working days once documents are signed — the fastest option we offer.'},
      {q:'Does Ireland give me EU market access?',a:'Yes. An Irish company is an EU company, with full access to the single market and EU tax directives — a key reason UK businesses choose Ireland after Brexit.'},
      {q:'Will I need to register for VAT?',a:'If you trade within the EU or exceed thresholds, yes. Irish VAT registration requires demonstrating real economic activity; we guide the application and supporting evidence.'},
      {q:'Who is Ireland best for?',a:'UK and international founders needing a credible onshore EU base, SaaS and digital businesses selling into Europe, and groups wanting a low-tax EU trading or holding company.'},
    ],
  },
  {
    slug:'bvi-cayman', flag:'🌴', name:'BVI & Cayman', file:'country-bvi-cayman.html',
    tax:'0% tax · maximum privacy', timeline:'Varies by structure', from:'Custom quote', workDays:10,
    headline:'Structure in the <em>BVI &amp; Cayman</em> — 0% tax, total privacy.',
    intro:'Zero-tax, maximum-privacy vehicles for asset protection, holding companies and HNWI planning — no public register of owners, and decades of trusted offshore law behind you.',
    benefits:[
      ['0% tax','No corporate, capital gains or income tax on the offshore entity itself.'],
      ['Maximum privacy','No public register of directors or beneficial owners — confidentiality by design.'],
      ['Asset protection','Robust, well-tested structures favoured for holding, IP and investment vehicles.'],
      ['Holding & SPV structures','Ideal as a clean top-co for groups, funds, joint ventures and crypto ventures.'],
      ['Trusted case law','Decades of English-derived commercial law and a deep professional ecosystem.'],
      ['Flexible & fast','Minimal local substance for pure holding; entities can be formed quickly.'],
    ],
    docs:['Certified passport copy (all beneficial owners)','Certified proof of address','Professional or bank reference','Source-of-funds summary','Proposed company name','Description of intended activity / structure'],
    process:[
      ['Confidential consultation','We discuss your objective — holding, protection, investment — and recommend BVI or Cayman.'],
      ['Structuring & KYC','We design the structure and complete enhanced due diligence discreetly.'],
      ['Incorporation','The entity is formed with registered agent and office; nominee options available.'],
      ['Banking & handover','We arrange offshore or fintech banking where required and hand over all documents.'],
    ],
    faq:[
      {q:'Are BVI and Cayman companies legal and compliant?',a:'Yes. They are legitimate, internationally recognised structures used by funds, multinationals and private clients. We build them in full compliance with economic-substance rules, FATF and CRS reporting obligations.'},
      {q:'What are the economic substance rules?',a:'Certain activities (e.g. finance, IP) require local substance. Pure equity-holding companies have light substance requirements. We assess your activity and ensure the structure meets the rules.'},
      {q:'How private are these structures?',a:'There is no public register of beneficial owners. Information is held privately by the registered agent and disclosed only to competent authorities under law — far more confidential than onshore registers.'},
      {q:'Can an offshore company get a bank account?',a:'Yes, though banking due diligence is rigorous. We pair offshore entities with substance-friendly banks or fintech providers and prepare the source-of-funds file to maximise approval.'},
      {q:'Who are these structures best for?',a:'High-net-worth individuals, groups needing a neutral holding company, fund and investment vehicles, IP holding and clients for whom privacy and asset protection are the priority.'},
    ],
  },
];

const stripMarkup = (value: string) => value.replace(/<[^>]+>/g, '')
const wa = (text: string) => `https://wa.me/971501234567?text=${encodeURIComponent(text)}`

const services = [
  {
    slug: 'company-registration', name: 'Company Registration', icon: 'building',
    headline: 'Company registration, end to end.',
    intro: 'Full company formation in the UAE, Bahrain, Hong Kong, Singapore, Ireland, BVI and more. Government fees included, no hidden charges.',
    features: [
      ['Jurisdiction selection', 'We match your activity, tax goals and banking needs to the right country and structure.'],
      ['Name & activity approval', 'We reserve your trade name and secure activity approval with the authority.'],
      ['Government filing', 'All incorporation paperwork filed for you, with fees built into a fixed quote.'],
      ['Registered address', 'A compliant registered office or agent provided where the jurisdiction requires it.'],
      ['Corporate documents', 'Certificate of incorporation, constitution, share certificates and full kit handed over.'],
      ['Fast turnaround', 'From 2-3 days to around 30 days depending on jurisdiction.'],
    ],
  },
  {
    slug: 'bank-account', name: 'Bank Account Setup', icon: 'bank',
    headline: 'Corporate banking without the guesswork.',
    intro: 'Local credible banking or fintech accounts through Airwallex, Wise and similar providers, guided from application to approval.',
    features: [
      ['Bank selection', 'We match your profile to banks and fintechs most likely to approve.'],
      ['KYC preparation', 'We prepare the account-opening file before submission.'],
      ['Application support', 'Guidance through forms, calls, evidence requests and follow-up.'],
    ],
  },
  {
    slug: 'nominee-ubo', name: 'Nominee UBO Service', icon: 'shield',
    headline: 'Privacy with operational control.',
    intro: 'GCC Startup provides nominee UBO support while you retain practical control through documented agreements.',
    features: [
      ['Privacy structure', 'Reduce public exposure while maintaining a compliant ownership trail.'],
      ['Documented control', 'Agreements define powers, liabilities and operating boundaries.'],
      ['Annual renewal', 'Ongoing nominee renewal and compliance support.'],
    ],
  },
  {
    slug: 'shelf-company', name: 'Shelf Companies', icon: 'box',
    headline: 'Operational faster with ready-made entities.',
    intro: 'Pre-registered entities with available history or accounts where suitable, subject to compliance checks.',
    features: [
      ['Pre-registered company', 'Acquire an existing entity instead of starting from zero.'],
      ['Fast handover', 'Operational access can be completed much faster than standard incorporation.'],
      ['Compliance review', 'We verify fit, documents and risk before transfer.'],
    ],
  },
  {
    slug: 'tax-residency', name: 'Tax Residency', icon: 'id',
    headline: 'Build a real tax residency position.',
    intro: 'Residency routes in UAE, Bahrain and other jurisdictions with practical banking and document support.',
    features: [
      ['Residency route', 'Choose the route that fits your travel, family and business needs.'],
      ['ID and visa support', 'We coordinate applications, medicals and biometrics where required.'],
      ['Substance planning', 'Practical guidance for maintaining a defensible position.'],
    ],
  },
  {
    slug: 'annual-renewals', name: 'Annual Renewals', icon: 'refresh',
    headline: 'Stay compliant without deadline stress.',
    intro: 'License renewals, nominee renewals, registered agent renewals and compliance filings managed on your behalf.',
    features: [
      ['Renewal calendar', 'We track deadlines and requirements before they become urgent.'],
      ['Authority filings', 'Renewal documents and filings handled end to end.'],
      ['Ongoing support', 'WhatsApp and email support for renewals and changes.'],
    ],
  },
]

const pricingTiers = [
  {
    slug: 'self-ubo', name: 'Self as UBO', tierLabel: 'Tier 01', price: '$1,500', priceNote: 'Company registration + $500 per bank account', featured: false,
    intro: 'You are the registered director and ultimate beneficial owner. Full transparency, the lowest cost, and complete compliance.',
    features: ['Government fees included', 'Fintech or local bank account', 'Full KYC documentation support', 'Available in all jurisdictions', 'WhatsApp and email support'],
    whoFor: ['Founders comfortable being publicly listed as owner', 'Lowest-cost compliant setup', 'Businesses seeking financing or investment'],
  },
  {
    slug: 'nominee-ubo', name: 'Nominee UBO', tierLabel: 'Tier 02', price: '$2,250+', priceNote: 'Registration + bank + nominee from $750', featured: true,
    intro: 'GCC Startup provides nominated UBO support. Full privacy and corporate credibility while you control operations.',
    features: ['Full corporate privacy', 'Nominee liability support', 'Complete account access retained by you', 'Priority support', 'Annual renewal from $750/year'],
    whoFor: ['Founders who value privacy', 'Consultants and digital operators', 'Clients who do not want public registry exposure'],
  },
  {
    slug: 'shelf-company', name: 'Shelf Company', tierLabel: 'Tier 03', price: '$1,500-2,500', priceNote: 'Varies by account age and transaction history', featured: false,
    intro: 'A ready-made company with existing profile or banking where available. Operational faster than new incorporation.',
    features: ['Pre-registered company entity', 'Existing banking where available', 'Transaction history options', 'Access within 24-48 hours', 'Immediate operational status'],
    whoFor: ['Clients who need speed', 'Procurement or platform onboarding deadlines', 'Operators who need an aged entity'],
  },
]

async function upsertCollection(payload: any, collection: string, slug: string, data: Record<string, any>) {
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, overrideAccess: true })
  if (existing.docs[0]) {
    await payload.update({ collection, id: existing.docs[0].id, data, overrideAccess: true })
    return 'updated'
  }
  await payload.create({ collection, data, overrideAccess: true })
  return 'created'
}

function countryLayout(c: any) {
  return [
    {
      blockType: 'subhero', flag: c.flag, watermark: c.flag, title: stripMarkup(c.headline), description: c.intro,
      breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'Jurisdictions', url: '/#jur' }, { label: c.name, url: '' }],
      buttons: [
        { label: `Start my ${c.name} setup`, url: '#lead-form', style: 'primary' },
        { label: 'WhatsApp us', url: wa(`Hi, I'm interested in setting up in ${c.name}.`), style: 'outline' },
      ],
      metaPoints: [{ value: c.tax, label: 'Tax position' }, { value: c.timeline, label: 'Timeline' }, { value: c.from, label: 'Starting from' }],
    },
    {
      blockType: 'benefitGrid', eyebrow: `Why ${c.name}`, title: `Why founders choose ${c.name}.`, description: 'The real advantages and who they are built for.',
      benefits: c.benefits.map((b: any, i: number) => ({ number: `0${i + 1}`, title: b[0], description: b[1] })),
    },
    {
      blockType: 'processSteps', eyebrow: 'How it works', title: `Your ${c.name} setup, step by step.`,
      steps: c.process.map((p: any) => ({ title: p[0], description: p[1] })),
    },
    {
      blockType: 'requirementsList', eyebrow: 'What you will need', title: `${c.name} document requirements.`, description: 'Standard requirements. We confirm the exact list for your activity during consultation.',
      requirements: c.docs.map((item: string) => ({ item })),
    },
    {
      blockType: 'faq', title: `${c.name} questions, answered.`,
      contactBox: { title: 'Still have questions?', description: 'WhatsApp us for a direct, honest answer.', buttonText: 'WhatsApp us now', buttonLink: wa(`Hi, I'm interested in setting up in ${c.name}.`) },
      faqs: c.faq,
    },
    { blockType: 'leadForm', eyebrow: 'Get started', title: `Request a ${c.name} consultation`, description: 'A specialist replies within 24 hours.', formType: 'lead', submitButtonText: 'Send my enquiry', successMessage: 'Thank you. We received your enquiry and will reply shortly.' },
    { blockType: 'globalCta', headline: 'Ready to get started?', subhead: 'Book a free 15-minute strategy call.', primaryBtn: 'Book a free call', primaryLink: '#lead-form', secondaryBtn: 'WhatsApp us', secondaryLink: wa(`Hi, I'm interested in setting up in ${c.name}.`) },
  ]
}

function serviceLayout(s: any) {
  return [
    { blockType: 'subhero', title: s.headline, description: s.intro, breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'Services', url: '/#services' }, { label: s.name, url: '' }], buttons: [{ label: `Enquire about ${s.name}`, url: '#lead-form', style: 'primary' }, { label: 'WhatsApp us', url: wa(`Hi, I'd like to know more about your ${s.name} service.`), style: 'outline' }], metaPoints: [{ value: '15+', label: 'Jurisdictions' }, { value: 'Fixed quote', label: 'Pricing' }, { value: 'End to end', label: 'Delivery' }] },
    { blockType: 'benefitGrid', eyebrow: 'What is included', title: `Everything in our ${s.name} service.`, description: 'Clear scope, fixed pricing, founder-led delivery.', benefits: s.features.map((f: any, i: number) => ({ number: `0${i + 1}`, title: f[0], description: f[1] })) },
    { blockType: 'processSteps', eyebrow: 'How it works', title: 'A clear, guided process.', steps: ['Consultation', 'Planning', 'Filing', 'Handover'].map((title) => ({ title, description: 'We handle the details and keep you updated at every stage.' })) },
    { blockType: 'leadForm', eyebrow: 'Next step', title: `Get a ${s.name} quote`, formType: 'lead', submitButtonText: 'Request quote' },
  ]
}

function pricingLayout(t: any) {
  return [
    { blockType: 'subhero', title: t.name, description: t.intro, breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'Pricing', url: '/#tiers' }, { label: t.name, url: '' }], buttons: [{ label: `Get started with ${t.name}`, url: '#lead-form', style: 'primary' }, { label: 'WhatsApp us', url: wa(`Hi, I'd like to know more about the ${t.name} package.`), style: 'outline' }], metaPoints: [{ value: t.tierLabel, label: 'Package' }, { value: t.price, label: 'Starting price' }, { value: t.featured ? 'Most popular' : 'Available', label: 'Status' }] },
    { blockType: 'pricingDetail', price: t.price, priceNote: t.priceNote, ctaLabel: 'Get started', ctaUrl: '#lead-form', features: t.features.map((item: string) => ({ title: item, description: '' })), whoFor: t.whoFor.map((item: string) => ({ item })) },
    { blockType: 'processSteps', eyebrow: 'How it works', title: 'From enquiry to operational.', steps: ['Consultation', 'Registration', 'Banking', 'Handover'].map((title) => ({ title, description: 'We manage the process and confirm all costs before you commit.' })) },
    { blockType: 'leadForm', eyebrow: 'Next step', title: `Request ${t.name}`, formType: 'lead', submitButtonText: 'Request package' },
  ]
}

function homepageLayout() {
  return [
    {
      blockType: 'hero', eyebrow: 'Company Formation · Global Banking · Tax Residency', title: 'Legally pay 0% tax. Bank globally. Own 100%.', description: 'Launch your company in the UAE, Bahrain, Hong Kong and beyond with real bank accounts, full privacy and total ownership.', primaryCta: 'Start My Company Today', primaryCtaLink: '#lead-form',
      proofPoints: [{ num: '15+', label: 'Jurisdictions' }, { num: '500+', label: 'Companies registered' }, { num: '48h', label: 'Fastest setup' }, { num: '0%', label: 'Tax in Bahrain & HK' }],
    },
    { blockType: 'ticker', items: countries.map((c) => ({ text: `${c.name} - ${c.tax}` })) },
    { blockType: 'statsRow', stats: [{ value: '15+', label: 'Jurisdictions covered' }, { value: '500+', label: 'Companies registered' }, { value: '48h', label: 'Fastest shelf company' }, { value: '0%', label: 'Tax rate in Bahrain' }] },
    { blockType: 'servicesGrid', eyebrow: 'What we do', title: 'Everything you need to go global - under one roof.', description: 'Formation, real banking, privacy, and ongoing compliance.', services: services.map((s) => ({ title: s.name, description: s.intro, url: `/services/${s.slug}`, linkText: 'Learn more' })) },
    { blockType: 'jurisdictionsGrid', eyebrow: 'Where we operate', title: 'Pick the country that pays you back.', description: 'We match your income, lifestyle and tax situation to the jurisdiction that fits.', jurisdictions: countries.map((c) => ({ region: c.slug, flag: c.flag, name: c.name, rate: c.tax, description: c.intro, timeline: c.timeline, price: c.from, url: `/${c.slug}` })) },
    { blockType: 'comparisonTool', eyebrow: 'Free tool', title: 'Compare two jurisdictions side by side.', description: 'Cost, timeline, tax, banking and ownership.', options: countries.map((c) => ({ key: c.slug, label: `${c.flag} ${c.name}`, tax: c.tax, timeline: c.timeline, banking: c.slug === 'hongkong' ? 'Fintech-first' : 'Bank + fintech options', ownership: '100% ownership options', price: c.from })), ctaLabel: 'Compare for my business type', ctaUrl: '#lead-form' },
    { blockType: 'jurisdictionQuiz', eyebrow: 'Free tool', title: 'Which jurisdiction is right for you?', description: 'Answer a few questions and get an instant recommendation.', callout: 'Most digital founders choose Hong Kong + Nominee UBO for remote setup and privacy.', questions: [{ question: 'What is your primary goal?', answers: [{ label: 'Reduce tax', value: 'tax' }, { label: 'Full privacy', value: 'privacy' }, { label: 'Credible banking', value: 'banking' }, { label: 'Relocate', value: 'relocate' }] }], results: [{ matchValue: 'tax', flag: '🇭🇰', name: 'Hong Kong', rate: '0% on foreign income', description: 'Best for remote digital income with clean fintech banking.', ctaLabel: 'Get started', ctaUrl: '#lead-form' }, { matchValue: 'relocate', flag: '🇦🇪', name: 'UAE', rate: '0% personal tax', description: 'Best for founders who want residency, Emirates ID and local banking.', ctaLabel: 'Get started', ctaUrl: '#lead-form' }] },
    { blockType: 'pricingCards', eyebrow: 'Pricing', title: 'Simple pricing. Zero surprises.', description: 'Every cost on the table before you sign.', tiers: pricingTiers.map((t) => ({ label: t.tierLabel, name: t.name, description: t.intro, price: t.price, priceNote: t.priceNote, featured: t.featured, badge: t.featured ? 'Most popular' : '', url: `/pricing/${t.slug}`, features: t.features.map((item) => ({ item })) })) },
    { blockType: 'leadForm', eyebrow: 'Get started', title: 'Request a free consultation', description: 'A specialist replies within 24 hours.', formType: 'lead', submitButtonText: 'Send my enquiry' },
  ]
}

const campaignLandingPages = [
  {
    slug: 'tax-guide',
    title: 'GCC Tax Optimization Guide',
    seoTitle: 'Free GCC Tax Optimization Guide | GCC Startup',
    seoDescription: 'Download the GCC Startup tax optimization guide covering UAE, Bahrain, Hong Kong, Singapore, Ireland, privacy structures, costs and timelines.',
    layout: [
      {
        blockType: 'subhero',
        title: 'Get the GCC Tax Optimization Guide',
        description: "Fill in your details — the PDF downloads immediately. We'll also send you a WhatsApp copy.",
        breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'Free Guide', url: '' }],
        buttons: [{ label: 'Download free guide', url: '#lead-form', style: 'primary' }, { label: 'Ask on WhatsApp', url: wa('Hi, please send me the GCC Tax Optimization Guide.'), style: 'outline' }],
        metaPoints: [{ value: '2026', label: 'Edition' }, { value: '5+', label: 'Jurisdictions' }, { value: 'Free', label: 'Download' }],
      },
      {
        blockType: 'benefitGrid',
        eyebrow: 'What is inside',
        title: "Legally pay 0% tax - here's the full playbook.",
        description: 'The complete guide to choosing the right jurisdiction and structure for your business.',
        benefits: [
          ['01', 'Jurisdictions compared', 'UAE, Bahrain, Hong Kong, Singapore and Ireland compared side by side.'],
          ['02', 'Costs and timelines', 'Step-by-step costs and timelines per country.'],
          ['03', '0% tax structures', 'How 0% tax structures work, explained in plain English.'],
          ['04', 'Privacy strategies', 'Nominee UBO and full privacy strategies for founders.'],
          ['05', 'Avoid mistakes', 'Common mistakes founders make and how to avoid them.'],
        ].map(([number, title, description]) => ({ number, title, description })),
      },
      { blockType: 'leadForm', eyebrow: 'Free instant download', title: 'Download the free guide', description: 'Confidential. No spam. We reply within 24 hours.', formType: 'lead', submitButtonText: 'Download free guide', successMessage: "Your guide is ready. Check your WhatsApp — we've sent you the PDF link.", redirectUrl: '/thank-you' },
    ],
  },
  {
    slug: 'whatsapp-consultation',
    title: 'WhatsApp Consultation',
    seoTitle: 'Free WhatsApp Consultation | GCC Startup',
    seoDescription: 'Get clarity in 15 minutes from a GCC Startup specialist before choosing a jurisdiction.',
    layout: [
      { blockType: 'subhero', title: 'Talk to a GCC expert right now', description: 'Most founders waste months picking the wrong jurisdiction. Get clarity in 15 minutes — free, no obligation.', breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'WhatsApp Consultation', url: '' }], buttons: [{ label: 'Chat on WhatsApp now', url: wa('Hi, I want a free consultation about the right jurisdiction for my business.'), style: 'primary' }], metaPoints: [{ value: 'Free', label: 'Consultation' }, { value: '<2 min', label: 'Typical reply' }, { value: 'No card', label: 'Needed' }] },
      { blockType: 'leadForm', eyebrow: 'Free consultation', title: 'Claim your free consultation', description: "Enter your details — we'll WhatsApp you in under 2 minutes.", formType: 'lead', submitButtonText: 'Connect me on WhatsApp', successMessage: 'Thank you. A specialist will contact you on WhatsApp shortly.' },
    ],
  },
  {
    slug: 'strategy-call',
    title: 'Free Strategy Call',
    seoTitle: 'Book a Free Strategy Call | GCC Startup',
    seoDescription: 'Book a free strategy call and learn which jurisdiction, license and structure fits your business.',
    layout: [
      { blockType: 'subhero', title: 'Book your free strategy call', description: 'Walk away knowing exactly which jurisdiction, license, and structure fits your business.', breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'Strategy Call', url: '' }], buttons: [{ label: 'Request my free call', url: '#lead-form', style: 'primary' }, { label: 'WhatsApp us', url: wa('Hi, I want to book a free strategy call.'), style: 'outline' }], metaPoints: [{ value: '30 min', label: 'Call length' }, { value: 'Free', label: 'No pitch' }, { value: '1 hour', label: 'WhatsApp confirmation' }] },
      { blockType: 'leadForm', eyebrow: 'Book now', title: 'Confirm my free call', description: 'Send your details and we will confirm your call time on WhatsApp.', formType: 'lead', submitButtonText: 'Request strategy call', successMessage: 'Thank you. We will confirm your call on WhatsApp within the hour.' },
    ],
  },
  {
    slug: 'jurisdiction-comparison',
    title: 'Free Jurisdiction Comparison',
    seoTitle: 'Free Jurisdiction Comparison | GCC Startup',
    seoDescription: 'Tell us your business and receive a personalized jurisdiction breakdown with costs and timeline.',
    layout: [
      { blockType: 'subhero', title: 'Get your free jurisdiction comparison', description: "Tell us your business — we'll send exactly where to set up, costs, and timeline straight to your WhatsApp.", breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'Jurisdiction Comparison', url: '' }], buttons: [{ label: 'Claim free analysis', url: '#lead-form', style: 'primary' }], metaPoints: [{ value: 'Free', label: 'Analysis' }, { value: '24h', label: 'Delivery' }, { value: 'WhatsApp', label: 'Sent to you' }] },
      { blockType: 'comparisonTool', eyebrow: 'Compare now', title: 'Start with the quick comparison tool.', description: 'Cost, timeline, tax, banking and ownership for each option.', options: countries.map((c) => ({ key: c.slug, label: `${c.flag} ${c.name}`, tax: c.tax, timeline: c.timeline, banking: c.slug === 'hongkong' ? 'Fintech-first' : 'Bank + fintech options', ownership: '100% ownership options', price: c.from })), ctaLabel: 'Get my personalized breakdown', ctaUrl: '#lead-form' },
      { blockType: 'leadForm', eyebrow: 'Claim your free analysis', title: 'Send me the free analysis', description: "We'll WhatsApp your personalized breakdown within 24 hours.", formType: 'lead', submitButtonText: 'Send me the free analysis', successMessage: 'Thank you. A specialist will send your jurisdiction breakdown to WhatsApp within 24 hours.' },
    ],
  },
  {
    slug: 'guide-thank-you',
    title: 'Your Free Guide Is Ready',
    pageType: 'thank-you',
    seoTitle: 'Guide Ready | GCC Startup',
    seoDescription: 'Download your GCC Startup tax optimization guide and request a free structure review.',
    noIndex: true,
    layout: [
      { blockType: 'subhero', title: 'Your free guide is ready.', description: 'Download the GCC Startup Tax Optimization Guide below. It explains how online sellers, consultants and founders can use compliant structures such as Hong Kong companies to reduce tax and simplify international operations.', breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'Guide Ready', url: '' }], buttons: [{ label: 'Download guide', url: 'https://gccstartup.com/wp-content/uploads/2022/11/GCCStartup_TaxOptimization_Guide.pdf', style: 'primary' }, { label: 'Free WhatsApp review', url: wa('Hi GCCStartup, I downloaded the Tax Optimization Guide and want a free consultation.'), style: 'outline' }], metaPoints: [{ value: 'PDF', label: 'Guide format' }, { value: 'Free', label: 'Review available' }, { value: '24h', label: 'Typical reply' }] },
      { blockType: 'processSteps', eyebrow: 'Next steps', title: 'What to do next', description: 'Use the guide first, then request a quick structure review.', steps: [{ title: 'Download the guide', description: 'Read the core options and compare the tax structures.' }, { title: 'Send your business model', description: 'Tell us what you sell, where clients are, and how you get paid.' }, { title: 'Book a free review', description: "We'll suggest the most suitable route and next steps." }] },
      { blockType: 'globalCta', headline: 'Want us to review your structure?', subhead: 'Send your business model on WhatsApp and we will suggest the most suitable route.', primaryBtn: 'Start free WhatsApp review', primaryLink: wa('Hi GCCStartup, please review my business for the Hong Kong company structure.') },
    ],
  },
]

export async function runSeed() {
  const payload = await getPayload({ config })

  console.log('Seeding database...')

  await payload.updateGlobal({
    slug: 'siteSettings',
    overrideAccess: true,
    data: {
      brandName: 'GCC Startup',
      siteUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'https://gccstartup.com',
      contact: { email: 'info@gccstartup.com', whatsappNumber: '971501234567' },
      footer: {
        about: 'Global company registration and tax optimization. Founder-led, fully compliant setup for entrepreneurs worldwide.',
        legal: 'Tax optimization services. Not legal or financial advice. All structures are jurisdiction-compliant.',
      },
      navMenu: [
        { label: 'Services', url: '/#services' },
        { label: 'Jurisdictions', url: '/#jur' },
        { label: 'Pricing', url: '/#tiers' },
        { label: 'Free Tools', url: '/#tools' },
        { label: 'FAQ', url: '/#faq' },
      ],
      announcementBar: { enabled: true, text: 'Get the free 2026 GCC setup guide', link: '#lead-form' },
      defaultSeo: {
        title: 'GCC Startup - Company Registration & Tax Optimization',
        description: 'Register companies, open bank accounts and structure tax-efficient global operations with GCC Startup.',
      },
    },
  })
  console.log('Updated site settings')

  await payload.updateGlobal({
    slug: 'homepage',
    overrideAccess: true,
    data: {
      layout: homepageLayout() as any,
      seo: {
        metaTitle: 'GCC Startup - Company Registration & Tax Optimization',
        metaDescription: 'Launch your company in the UAE, Bahrain, Hong Kong and beyond with banking, tax residency and privacy support.',
      },
    },
  })
  console.log('Updated homepage')

  for (const c of countries) {
    await upsertCollection(payload, 'countries', c.slug, {
      name: c.name,
      slug: c.slug,
      flag: c.flag,
      region: c.slug === 'uae' || c.slug === 'bahrain' ? 'gulf' : c.slug === 'ireland' ? 'europe' : c.slug === 'bvi-cayman' ? 'offshore' : 'asia',
      tax: c.tax,
      timeline: c.timeline,
      fromPrice: c.from,
      workDays: c.workDays,
      headline: stripMarkup(c.headline),
      intro: c.intro,
      benefits: c.benefits.map((b) => ({ title: b[0], desc: b[1] })),
      documents: c.docs.map((item) => ({ item })),
      process: c.process.map((p) => ({ title: p[0], desc: p[1] })),
      faq: c.faq,
    })

    const layout = [
      {
        blockType: 'subhero',
        flag: c.flag,
        title: stripMarkup(c.headline),
        description: c.intro,
        breadcrumbs: [
          { label: 'Home', url: '/' },
          { label: 'Jurisdictions', url: '/#jur' },
          { label: c.name, url: '' }
        ],
        buttons: [
          { label: 'Book a free call', url: 'mailto:info@gccstartup.com', style: 'primary' },
          { label: 'WhatsApp us', url: wa(`Hi, I'm interested in setting up in ${c.name}.`), style: 'outline' }
        ],
        metaPoints: [
          { value: c.tax, label: 'Tax' },
          { value: c.timeline, label: 'Timeline' },
          { value: c.from, label: 'Pricing' }
        ]
      },
      {
        blockType: 'benefitGrid',
        eyebrow: 'Advantages',
        title: `Why ${c.name}?`,
        description: `Key benefits of setting up in ${c.name}.`,
        benefits: c.benefits.map((b, i) => ({
          number: `0${i + 1}`,
          title: b[0],
          description: b[1]
        }))
      },
      {
        blockType: 'processSteps',
        eyebrow: 'Process',
        title: 'How it works',
        description: 'Step-by-step incorporation process.',
        steps: c.process.map(p => ({
          title: p[0],
          description: p[1]
        }))
      },
      {
        blockType: 'requirementsList',
        requirements: c.docs.map(doc => ({
          item: doc
        }))
      },
      {
        blockType: 'faq',
        title: 'Common questions',
        contactBox: {
          title: 'Still have questions?',
          description: 'WhatsApp us for a direct, honest answer.',
          buttonText: 'WhatsApp us now',
          buttonLink: wa(`Hi, I'm interested in setting up in ${c.name}.`)
        },
        faqs: c.faq.map(f => ({
          q: f.q,
          a: f.a
        }))
      }
    ];

    const data = {
      title: `${c.name} Company Registration`,
      slug: c.slug,
      layout: layout as any,
      _status: 'published',
      seo: {
        metaTitle: `${c.name} Company Registration — Cost, Process & Requirements | GCC Startup`,
        metaDescription: `Register your company in ${c.name}: ${c.tax}. Costs, timeline, requirements, process and FAQs. Founder-led, fully compliant setup from ${c.from}.`
      }
    }

    await upsertCollection(payload, 'pages', c.slug, { ...data, pageType: 'generic', layout: countryLayout(c) as any })
    await upsertCollection(payload, 'landingPages', c.slug, data)
    console.log(`Seeded country content for ${c.name}`)
  }

  for (const s of services) {
    await upsertCollection(payload, 'services', s.slug, {
      name: s.name,
      slug: s.slug,
      icon: s.icon,
      headline: s.headline,
      intro: s.intro,
      features: s.features.map((f) => ({ title: f[0], desc: f[1] })),
      process: ['Consultation', 'Planning', 'Filing', 'Handover'].map((title) => ({ title, desc: 'We handle the details and keep you updated at every stage.' })),
      faq: [{ q: `How does ${s.name} work?`, a: 'Send your requirements and we will recommend the right structure, timeline and fixed quote.' }],
      relatedLinks: [{ label: 'See pricing tiers', url: '/#tiers' }, { label: 'Choose a jurisdiction', url: '/#jur' }],
    })
    await upsertCollection(payload, 'pages', `services/${s.slug}`, {
      title: s.name,
      slug: `services/${s.slug}`,
      pageType: 'generic',
      layout: serviceLayout(s) as any,
      _status: 'published',
      seo: { metaTitle: `${s.name} - GCC Startup`, metaDescription: s.intro },
    })
    console.log(`Seeded service content for ${s.name}`)
  }

  for (const t of pricingTiers) {
    await upsertCollection(payload, 'pricingTiers', t.slug, {
      name: t.name,
      slug: t.slug,
      tierLabel: t.tierLabel,
      featured: t.featured,
      price: t.price,
      priceNote: t.priceNote,
      intro: t.intro,
      features: t.features.map((item) => ({ title: item, desc: '' })),
      whoFor: t.whoFor.map((item) => ({ item })),
      process: ['Consultation', 'Registration', 'Banking', 'Handover'].map((title) => ({ title, desc: 'We manage the process and confirm all costs before you commit.' })),
      faq: [{ q: `Who is ${t.name} for?`, a: t.intro }],
    })
    await upsertCollection(payload, 'pages', `pricing/${t.slug}`, {
      title: t.name,
      slug: `pricing/${t.slug}`,
      pageType: 'generic',
      layout: pricingLayout(t) as any,
      _status: 'published',
      seo: { metaTitle: `${t.name} - Pricing | GCC Startup`, metaDescription: t.intro },
    })
    console.log(`Seeded pricing content for ${t.name}`)
  }

  await upsertCollection(payload, 'pages', 'thank-you', {
    title: 'Thank You',
    slug: 'thank-you',
    pageType: 'thank-you',
    _status: 'published',
    layout: [
      { blockType: 'subhero', title: 'Your request is ready.', description: 'Thank you. We received your request and will follow up shortly.', buttons: [{ label: 'Back to homepage', url: '/', style: 'primary' }, { label: 'WhatsApp us', url: wa('Hi, I just submitted a request.'), style: 'outline' }] },
    ] as any,
    seo: { metaTitle: 'Thank You - GCC Startup', noIndex: true },
  })

  for (const campaign of campaignLandingPages) {
    const data = {
      title: campaign.title,
      slug: campaign.slug,
      layout: campaign.layout as any,
      _status: 'published',
      seo: {
        metaTitle: campaign.seoTitle,
        metaDescription: campaign.seoDescription,
        noIndex: campaign.noIndex || false,
      },
    }

    await upsertCollection(payload, 'landingPages', campaign.slug, data)
    await upsertCollection(payload, 'pages', campaign.slug, {
      ...data,
      pageType: campaign.pageType || 'campaign',
    })
    console.log(`Seeded campaign content for ${campaign.title}`)
  }

  console.log('Done!');
  return { success: true }
}
