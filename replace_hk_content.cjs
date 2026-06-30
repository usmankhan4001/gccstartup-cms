const fs = require('fs');

let html = fs.readFileSync('./Pages/lp-company-registration-hongkong.html', 'utf8');

// 1. Update the "Why founders choose Hong Kong" section (benefits)
const benefitsSectionOld = `<div class="benefit-grid reveal">
      <div class="benefit-item"><span class="benefit-num">01</span><h3>0% on foreign-sourced income</h3><p>Hong Kong taxes only locally-sourced profits — offshore income can be fully exempt.</p></div>
      <div class="benefit-item"><span class="benefit-num">02</span><h3>100% remote setup</h3><p>No need to travel. The entire incorporation is handled online in under three weeks.</p></div>
      <div class="benefit-item"><span class="benefit-num">03</span><h3>Fintech banking</h3><p>Fast accounts with Airwallex, Wise and Statrys — ideal for global digital businesses.</p></div>
      <div class="benefit-item"><span class="benefit-num">04</span><h3>Gateway to Asia & China</h3><p>A trusted, English-common-law hub for trading with mainland China and Asia.</p></div>
      <div class="benefit-item"><span class="benefit-num">05</span><h3>Simple, low compliance</h3><p>One annual return and audit — straightforward for owner-managed companies.</p></div>
      <div class="benefit-item"><span class="benefit-num">06</span><h3>Strong reputation</h3><p>A top-tier financial centre that adds instant credibility with clients and platforms.</p></div>
    </div>`;

const benefitsSectionNew = `<div class="benefit-grid reveal">
      <div class="benefit-item"><span class="benefit-num">01</span><h3>Fast Setup, Real Banking</h3><p>Company registered in 2–3 working days. Airwallex or Wise business account fully operational in approximately 15 days.</p></div>
      <div class="benefit-item"><span class="benefit-num">02</span><h3>0% Tax on Foreign Income</h3><p>Hong Kong taxes only locally-sourced profits — offshore income can be fully exempt from corporate tax.</p></div>
      <div class="benefit-item"><span class="benefit-num">03</span><h3>100% Remote Setup</h3><p>No need to travel or relocate. The entire incorporation is handled completely remotely from your home country.</p></div>
      <div class="benefit-item"><span class="benefit-num">04</span><h3>Global Payment Gateways</h3><p>Full support for Stripe, PayPal, Shopify, and SWIFT transactions without payment blocks or freezes.</p></div>
      <div class="benefit-item"><span class="benefit-num">05</span><h3>Nominee Director Options</h3><p>Keep your name off public-facing company documents with our fully managed nominee director and shareholder service.</p></div>
      <div class="benefit-item"><span class="benefit-num">06</span><h3>Transparent Renewals</h3><p>Annual renewal managed by GCCStartup — costs fixed in contract at setup, no surprise fees, no missed deadlines.</p></div>
    </div>`;

html = html.replace(benefitsSectionOld, benefitsSectionNew);

// 2. Insert Pricing Section right before the FAQ
const pricingSection = `
<section class="section section-alt">
  <div class="wrap">
    <div class="section-header reveal center">
      <span class="eyebrow">Pricing</span>
      <h2>Select Your Hong Kong Package</h2>
      <p>Transparent pricing with all government fees included. No hidden costs.</p>
    </div>
    <div class="pricing-grid reveal">
      <div class="pricing-card">
        <span class="pricing-tier">Tier 1</span>
        <h3 class="pricing-name">Self as UBO</h3>
        <p class="pricing-desc">The standard setup for digital entrepreneurs and consultants.</p>
        <div class="pricing-amount">
          <div class="pricing-price"><sup>$</sup>2,000</div>
          <div class="pricing-note">One-time setup fee</div>
        </div>
        <ul class="pricing-list">
          <li><span class="pricing-check">✓</span>Company Registration ($1,500)</li>
          <li><span class="pricing-check">✓</span>Bank Account Setup ($500)</li>
          <li><span class="pricing-check">✓</span>All Government Fees Included</li>
          <li><span class="pricing-check">✓</span>Remote Incorporation</li>
        </ul>
        <button class="pricing-btn orange" onclick="document.getElementById('leadModal').classList.add('show')">Get Started</button>
      </div>
      
      <div class="pricing-card featured">
        <div class="pricing-popular">Most Private</div>
        <span class="pricing-tier">Tier 2</span>
        <h3 class="pricing-name">Nominee UBO</h3>
        <p class="pricing-desc">Maximum privacy with a nominee director and shareholder.</p>
        <div class="pricing-amount">
          <div class="pricing-price"><sup>$</sup>3,500</div>
          <div class="pricing-note">Starting from</div>
        </div>
        <ul class="pricing-list">
          <li><span class="pricing-check">✓</span>Everything in Tier 1</li>
          <li><span class="pricing-check">✓</span>Nominee Director Service</li>
          <li><span class="pricing-check">✓</span>Nominee Shareholder Service</li>
          <li><span class="pricing-check">✓</span>Full Privacy Protection</li>
        </ul>
        <button class="pricing-btn outline" onclick="document.getElementById('leadModal').classList.add('show')">Get Started</button>
      </div>
      
      <div class="pricing-card">
        <span class="pricing-tier">Tier 3</span>
        <h3 class="pricing-name">Shelf Company</h3>
        <p class="pricing-desc">Bypass the setup time with a pre-registered entity.</p>
        <div class="pricing-amount">
          <div class="pricing-price"><sup>$</sup>1,500<span style="font-size:18px">-2,500</span></div>
          <div class="pricing-note">Depending on age of company</div>
        </div>
        <ul class="pricing-list">
          <li><span class="pricing-check">✓</span>Pre-registered Hong Kong Entity</li>
          <li><span class="pricing-check">✓</span>Active Bank Account Included</li>
          <li><span class="pricing-check">✓</span>Immediate Trading Capability</li>
          <li><span class="pricing-check">✓</span>Clean History Guaranteed</li>
        </ul>
        <button class="pricing-btn outline" onclick="document.getElementById('leadModal').classList.add('show')">Get Started</button>
      </div>
    </div>
  </div>
</section>
`;

if (!html.includes('class="pricing-grid reveal"')) {
  html = html.replace('<section class="section" id="faq">', pricingSection + '\n<section class="section" id="faq">');
}

// 3. Update FAQ
const oldFAQList = `<div class="faq-list reveal" style="transition-delay:.1s">
        <div class="faq-item"><div class="faq-q" onclick="faqToggle(this)">How does the 0% offshore tax claim work? <span class="faq-icon">+</span></div><div class="faq-a">Hong Kong is territorial: profits not sourced in Hong Kong are not taxed. If your clients, work and operations are outside Hong Kong, you can apply for an Offshore Profits Tax Exemption. We help document and file the claim correctly.</div></div>
        <div class="faq-item"><div class="faq-q" onclick="faqToggle(this)">Can I really set up without visiting? <span class="faq-icon">+</span></div><div class="faq-a">Yes — incorporation and fintech banking are 100% remote. Traditional bank branches may ask for a visit, but Airwallex, Wise and Statrys onboard online.</div></div>
        <div class="faq-item"><div class="faq-q" onclick="faqToggle(this)">Does Hong Kong require a local director? <span class="faq-icon">+</span></div><div class="faq-a">No local director is required — you can be the sole director and shareholder. A local company secretary and registered address are required, both of which we provide.</div></div>
        <div class="faq-item"><div class="faq-q" onclick="faqToggle(this)">Is an audit required every year? <span class="faq-icon">+</span></div><div class="faq-a">Yes, Hong Kong companies must file an annual audited return. It is straightforward for small companies and we can arrange the audit and filing for you.</div></div>
        <div class="faq-item"><div class="faq-q" onclick="faqToggle(this)">Who is Hong Kong best for? <span class="faq-icon">+</span></div><div class="faq-a">Digital service providers, consultants, agencies, SaaS and e-commerce sellers earning from clients outside Hong Kong who want remote setup, clean banking and a 0% offshore position.</div></div>
      </div>`;
      
const newFAQList = `<div class="faq-list reveal" style="transition-delay:.1s">
        <div class="faq-item"><div class="faq-q" onclick="faqToggle(this)">How does the 0% offshore tax claim work? <span class="faq-icon">+</span></div><div class="faq-a">Hong Kong is territorial: profits not sourced in Hong Kong are not taxed. If your clients, work and operations are outside Hong Kong, you can apply for an Offshore Profits Tax Exemption. We help document and file the claim correctly.</div></div>
        <div class="faq-item"><div class="faq-q" onclick="faqToggle(this)">Can I really set up without visiting? <span class="faq-icon">+</span></div><div class="faq-a">Yes — incorporation and fintech banking are 100% remote. Traditional bank branches may ask for a visit, but Airwallex, Wise and Statrys onboard online.</div></div>
        <div class="faq-item"><div class="faq-q" onclick="faqToggle(this)">Does Hong Kong require a local director? <span class="faq-icon">+</span></div><div class="faq-a">No local director is required — you can be the sole director and shareholder. A local company secretary and registered address are required, both of which we provide.</div></div>
        <div class="faq-item"><div class="faq-q" onclick="faqToggle(this)">Is an audit required every year? <span class="faq-icon">+</span></div><div class="faq-a">Yes, Hong Kong companies must file an annual audited return. It is straightforward for small companies and we can arrange the audit and filing for you.</div></div>
        <div class="faq-item"><div class="faq-q" onclick="faqToggle(this)">Who is Hong Kong best for? <span class="faq-icon">+</span></div><div class="faq-a">Digital service providers, consultants, agencies, SaaS and e-commerce sellers earning from clients outside Hong Kong who want remote setup, clean banking and a 0% offshore position.</div></div>
      </div>`;

// They are similar, I'll leave them as is since the user's FAQ was literally this.

fs.writeFileSync('./Pages/lp-company-registration-hongkong.html', html);
console.log('Successfully updated lp-company-registration-hongkong.html');
