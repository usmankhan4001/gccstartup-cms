const fs = require('fs');
const path = require('path');

const hkBase = fs.readFileSync(path.join(__dirname, 'Pages', 'country-hongkong.html'), 'utf8');

const taxGuide = fs.readFileSync(path.join(__dirname, 'embeds', '0-tax-guide-cta.html'), 'utf8');
const waSpec = fs.readFileSync(path.join(__dirname, 'embeds', '1-whatsapp-specialist-cta.html'), 'utf8');
const promoBanner = fs.readFileSync(path.join(__dirname, 'embeds', '3-promo-banner.html'), 'utf8');

// 1. Replace Title and Hero
let out = hkBase.replace(
  /<title>.*?<\/title>/,
  '<title>Hong Kong Company Registration - Fast & Remote Setup | GCC Startup</title>'
);

out = out.replace(
  /<h1>.*?<\/h1>/,
  '<h1>Set up your Hong Kong Company in 3 Days</h1>'
);

out = out.replace(
  /<p class="hero-desc">.*?<\/p>/,
  '<p class="hero-desc">The ultimate corporate gateway to Asia. 0% tax on foreign-sourced income, fully remote registration, and fast-track multi-currency business banking.</p>'
);

// 2. Inject Promo Banner after Hero Section
// We find </section> of the hero, which is the first </section>
out = out.replace(/(<\/section>)/, `$1\n\n<!-- INJECTED PROMO BANNER -->\n${promoBanner}\n`);

// 3. Inject WA Specialist CTA before the Pricing Section
out = out.replace(/(<section id="pricing".*?>)/, `<!-- INJECTED WA CTA -->\n${waSpec}\n\n$1`);

// 4. Inject Tax Guide before the Footer
out = out.replace(/(<footer class="site-footer">)/, `<!-- INJECTED TAX GUIDE -->\n${taxGuide}\n\n$1`);

fs.writeFileSync(path.join(__dirname, 'Pages', 'lp-company-registration-hongkong.html'), out);
console.log("Successfully generated clean Hong Kong Campaign Landing Page!");
