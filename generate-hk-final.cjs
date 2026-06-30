const fs = require('fs');
const path = require('path');

const base = fs.readFileSync(path.join(__dirname, 'Pages', 'country-hongkong.html'), 'utf8');
const taxGuide = fs.readFileSync(path.join(__dirname, 'embeds', '0-tax-guide-cta.html'), 'utf8');
const waSpec = fs.readFileSync(path.join(__dirname, 'embeds', '1-whatsapp-specialist-cta.html'), 'utf8');
const promoBanner = fs.readFileSync(path.join(__dirname, 'embeds', '3-promo-banner.html'), 'utf8');

let out = base;

// TITLE & META
out = out.replace(
  /<title>.*?<\/title>/,
  '<title>Hong Kong Company Registration for Dutch Entrepreneurs | GCC Startup</title>'
);
out = out.replace(
  /<meta name="description" content=".*?">/,
  '<meta name="description" content="Register a Hong Kong company in 2-3 days. 0% tax on foreign-sourced income. Airwallex or Wise banking. No relocation required.">'
);

// HERO
out = out.replace(
  /<span class="eyebrow" .*?>.*?<\/span>/,
  '<span class="eyebrow" style="color: #93B4FF;">🇭🇰 Hong Kong • 0% Foreign Tax • 2-3 Day Setup • 100% Remote</span>'
);
out = out.replace(
  /<h1>.*?<\/h1>/,
  '<h1>Hong Kong Company Registration for Dutch Entrepreneurs</h1>'
);
out = out.replace(
  /<p class="hero-desc">.*?<\/p>/,
  '<p class="hero-desc">Register a Hong Kong company in 2-3 days. 0% tax on foreign-sourced income. Airwallex or Wise banking. No relocation required. Legal. Fast. Transparent.</p>'
);

// OVERVIEW METRICS
out = out.replace(
  /16.5%<\/div>\s*<div class="kpi-lbl">Corporate Tax<\/div>/,
  '0%</div>\n          <div class="kpi-lbl">Tax on Foreign Income</div>'
);
out = out.replace(
  /Yes<\/div>\s*<div class="kpi-lbl">Foreign Ownership<\/div>/,
  '100%</div>\n          <div class="kpi-lbl">Foreign Ownership</div>'
);

// HIGHLIGHTS/FEATURES TITLE
out = out.replace(
  /<h2>Why Structure in Hong Kong\?<\/h2>/,
  '<h2>Why Dutch Entrepreneurs Choose Hong Kong</h2>'
);
out = out.replace(
  /<p>Hong Kong is a globally recognized financial hub.*?<\/p>/,
  '<p>Hong Kong company registration for Dutch entrepreneurs offers a strategic gateway to international markets with a highly favourable tax regime and minimal bureaucracy.</p>'
);

// PRICING TITLE
out = out.replace(
  /<h2>Transparent Hong Kong Setup Packages<\/h2>/,
  '<h2>Clear, Transparent Pricing for Dutch Founders</h2>'
);

// INJECT EMBEDS
out = out.replace(/(<\/section>)/, `$1\n\n<!-- INJECTED PROMO BANNER -->\n${promoBanner}\n`);
out = out.replace(/(<section id="pricing".*?>)/, `<!-- INJECTED WA CTA -->\n${waSpec}\n\n$1`);
out = out.replace(/(<footer class="site-footer">)/, `<!-- INJECTED TAX GUIDE -->\n${taxGuide}\n\n$1`);

fs.writeFileSync(path.join(__dirname, 'Pages', 'lp-company-registration-hongkong.html'), out);
console.log("Re-generated lp-company-registration-hongkong.html with original content & theme!");
