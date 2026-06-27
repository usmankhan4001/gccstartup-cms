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

async function seed() {
  const payload = await getPayload({ config })
  
  for (const c of countries) {
    const layout = [
      {
        blockType: 'subhero',
        flag: c.flag,
        title: c.headline,
        description: c.intro,
        breadcrumbs: [
          { label: 'Home', url: '/' },
          { label: 'Jurisdictions', url: '/#jur' },
          { label: c.name, url: '' }
        ],
        buttons: [
          { label: 'Book a free call', url: 'mailto:info@gccstartup.com', style: 'primary' },
          { label: 'WhatsApp us', url: `https://wa.me/gccstartup?text=Hi, I'm interested in setting up in ${c.name}.`, style: 'outline' }
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
          buttonLink: `https://wa.me/gccstartup?text=Hi, I'm interested in setting up in ${c.name}.`
        },
        faqs: c.faq.map(f => ({
          q: f.q,
          a: f.a
        }))
      }
    ];

    await payload.create({
      collection: 'landingPages',
      data: {
        title: `${c.name} Company Registration`,
        slug: c.slug,
        layout: layout as any,
        seo: {
          metaTitle: `${c.name} Company Registration — Cost, Process & Requirements | GCC Startup`,
          metaDescription: `Register your company in ${c.name}: ${c.tax}. Costs, timeline, requirements, process and FAQs. Founder-led, fully compliant setup from ${c.from}.`
        }
      }
    });
    
    console.log(`Seeded landing page for ${c.name}`);
  }
  
  console.log('Done!');
  process.exit(0)
}

seed().catch(console.error)
