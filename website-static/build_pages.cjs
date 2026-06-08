/* Generates GCC Startup subpages (6 country + 3 pricing) reusing index.html's design system. */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

// ── Reuse the homepage <style> block so every page shares one design system ──
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const styleMatch = indexHtml.match(/<style>[\s\S]*?<\/style>/);
const baseStyle = styleMatch ? styleMatch[0] : '<style></style>';

// ── Extra CSS for subpage-specific components ──
const extraCss = `<style>
.subhero { background: var(--blue-dkr); padding: 64px 0 56px; position: relative; overflow: hidden; }
.subhero::after { content:''; position:absolute; bottom:0; right:0; width:50%; height:100%; background:linear-gradient(135deg,transparent 40%,rgba(255,255,255,0.022) 100%); pointer-events:none; }
.subhero .crumbs { font-size: 12.5px; color: rgba(255,255,255,0.45); margin-bottom: 18px; }
.subhero .crumbs a { color: rgba(255,255,255,0.6); } .subhero .crumbs a:hover { color: #fff; }
.subhero-flag { font-size: 40px; display:block; margin-bottom: 14px; }
.subhero h1 { color: #fff; font-size: clamp(30px,4.5vw,48px); margin-bottom: 16px; }
.subhero h1 em { font-style: normal; color: var(--orange); }
.subhero p { color: rgba(255,255,255,0.62); font-size: 16px; max-width: 600px; line-height: 1.7; font-weight: 300; margin-bottom: 28px; }
.subhero-meta { display:flex; gap: 36px; flex-wrap: wrap; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); }
.subhero-meta .smi-n { font-size: 22px; font-weight: 700; color: #fff; display:block; line-height:1.1; }
.subhero-meta .smi-l { font-size: 12px; color: rgba(255,255,255,0.45); margin-top:3px; }
.subhero-btns { display:flex; gap:12px; flex-wrap:wrap; margin-top: 28px; }

.benefit-grid { display:grid; grid-template-columns: repeat(3,1fr); border:1px solid var(--line); }
.benefit-item { padding: 28px 26px; border-right:1px solid var(--line); border-bottom:1px solid var(--line); }
.benefit-item:nth-child(3n){border-right:none;} .benefit-item:nth-child(n+4){}
.benefit-num { font-size:11px;font-weight:700;color:var(--orange);letter-spacing:0.1em;display:block;margin-bottom:14px; }
.benefit-item h3 { font-size:15px;font-weight:700;color:var(--ink);margin-bottom:8px; }
.benefit-item p { font-size:13.5px;color:var(--muted);line-height:1.6; }

.req-list { list-style:none; border:1px solid var(--line); }
.req-list li { display:flex; gap:14px; align-items:flex-start; padding:16px 24px; border-bottom:1px solid var(--line); font-size:14px; color:var(--body); }
.req-list li:last-child{border-bottom:none;}
.req-list .req-ic { width:22px;height:22px;min-width:22px;background:var(--blue-lt);color:var(--blue);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700; }

.midcta { background: var(--blue-lt); border-left: 3px solid var(--orange); padding: 28px 32px; display:flex; justify-content:space-between; align-items:center; gap:24px; flex-wrap:wrap; }
.midcta h3 { font-size:18px; color:var(--ink); margin-bottom:4px; }
.midcta p { font-size:13.5px; color:var(--body); }

/* Document readiness checker */
.docheck { border:1px solid var(--line); }
.docheck-head { background:var(--blue); padding:18px 24px; display:flex; justify-content:space-between; align-items:center; }
.docheck-head h4 { color:#fff; font-size:15px; font-weight:500; }
.docheck-head span { font-size:12px; color:rgba(255,255,255,0.6); }
.docheck-bar { height:4px; background:var(--line); }
.docheck-fill { height:100%; background:var(--orange); width:0; transition:width 0.35s; }
.docheck-body { padding:12px 24px 24px; }
.docheck-item { display:flex; gap:12px; align-items:center; padding:12px 0; border-bottom:1px solid var(--line); cursor:pointer; font-size:14px; color:var(--body); }
.docheck-item:last-of-type{border-bottom:none;}
.docheck-box { width:20px;height:20px;min-width:20px;border:1.5px solid var(--line); display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;transition:all 0.15s; }
.docheck-item.on .docheck-box { background:var(--blue); border-color:var(--blue); }
.docheck-result { background:var(--blue-lt); padding:16px 20px; margin-top:14px; font-size:13.5px; color:var(--body); }
.docheck-result strong { color:var(--blue); }

/* Timeline calculator */
.timecalc { border:1px solid var(--line); }
.timecalc-head { background:var(--blue); padding:18px 24px; }
.timecalc-head h4 { color:#fff; font-size:15px; font-weight:500; }
.timecalc-body { padding:24px; }
.timecalc-field { margin-bottom:14px; }
.timecalc-field label { display:block;font-size:11.5px;font-weight:500;color:var(--muted);margin-bottom:5px;letter-spacing:0.03em; }
.timecalc-field input { width:100%;padding:10px 13px;border:1px solid var(--line);font-family:var(--font);font-size:14px;color:var(--ink);outline:none; }
.timecalc-field input:focus{border-color:var(--blue);}
.timecalc-result { background:var(--blue-lt); padding:16px 20px; margin-top:6px; font-size:14px; color:var(--body); }
.timecalc-result strong { color:var(--blue); }
.tool-2col { display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:start; }

/* Pricing detail */
.pd-amount { font-size:46px;font-weight:700;color:var(--blue);letter-spacing:-0.02em;line-height:1; }
.pd-amount sup{font-size:22px;} .pd-note{font-size:13px;color:var(--muted);margin-top:8px;}
.pd-feature-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--line);border:1px solid var(--line); }
.pd-feature { background:#fff; padding:22px 24px; }
.pd-feature h4 { font-size:14px;font-weight:700;color:var(--ink);margin-bottom:6px;display:flex;gap:8px;align-items:center; }
.pd-feature .pdf-ic{width:18px;height:18px;background:var(--blue-lt);color:var(--blue);display:flex;align-items:center;justify-content:center;font-size:10px;}
.pd-feature p { font-size:13px;color:var(--muted);line-height:1.55; }
.whofor { border:1px solid var(--line); padding:28px 32px; background:var(--bg); }
.whofor h3{font-size:16px;color:var(--ink);margin-bottom:14px;}
.whofor li{font-size:14px;color:var(--body);list-style:none;padding:7px 0 7px 26px;position:relative;}
.whofor li::before{content:'✓';position:absolute;left:0;color:var(--blue);font-weight:700;}

@media (max-width:768px){
  .benefit-grid{grid-template-columns:1fr;} .benefit-item{border-right:none;}
  .tool-2col{grid-template-columns:1fr;} .pd-feature-grid{grid-template-columns:1fr;}
  .subhero-meta{gap:20px;} .midcta{flex-direction:column;align-items:flex-start;}
}
</style>`;

// ── Inline SVG icons (stroke-based, no external assets) ──
const SVG = {
  building:'<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h6"/></svg>',
  bank:'<svg viewBox="0 0 24 24"><path d="M3 10l9-6 9 6"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8"/><path d="M3 21h18"/></svg>',
  shield:'<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  box:'<svg viewBox="0 0 24 24"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>',
  id:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M14 9h4M14 13h4M5 16c.7-1.5 2-2 3.5-2s2.8.5 3.5 2"/></svg>',
  refresh:'<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-2.6-6.4M21 4v5h-5"/></svg>',
  chat:'<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 01-11.5 7.2L3 21l1.8-6.5A8 8 0 1121 12z"/></svg>',
  target:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/></svg>',
  filecheck:'<svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5"/><path d="M9 15l2 2 4-4"/></svg>',
  check:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-5"/></svg>',
};
const PROC_ICONS = [SVG.chat, SVG.target, SVG.filecheck, SVG.check];
const SVC_ICON = {
  'company-registration':SVG.building, 'bank-account':SVG.bank, 'nominee-ubo':SVG.shield,
  'shelf-company':SVG.box, 'tax-residency':SVG.id, 'annual-renewals':SVG.refresh,
};
const SKYLINE = `<svg class="skyline" viewBox="0 0 1440 180" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <g class="sk-b"><rect x="10" y="70" width="74" height="110"/><rect x="90" y="108" width="52" height="72"/><rect x="150" y="44" width="60" height="136"/><rect x="216" y="92" width="42" height="88"/><rect x="264" y="60" width="82" height="120"/><rect x="352" y="120" width="46" height="60"/><rect x="404" y="30" width="64" height="150"/><rect x="474" y="84" width="52" height="96"/><rect x="532" y="52" width="92" height="128"/><rect x="630" y="100" width="42" height="80"/><rect x="724" y="86" width="56" height="94"/><rect x="786" y="56" width="78" height="124"/><rect x="870" y="112" width="46" height="68"/><rect x="922" y="38" width="62" height="142"/><rect x="990" y="72" width="86" height="108"/><rect x="1082" y="98" width="42" height="82"/><rect x="1130" y="48" width="72" height="132"/><rect x="1208" y="90" width="50" height="90"/><rect x="1264" y="62" width="82" height="118"/><rect x="1352" y="106" width="56" height="74"/><rect x="1414" y="50" width="26" height="130"/></g>
    <g class="sk-accent"><rect x="678" y="20" width="42" height="160"/><rect x="695" y="6" width="8" height="20"/></g>
    <g class="sk-win"><rect x="166" y="60" width="8" height="8"/><rect x="184" y="60" width="8" height="8"/><rect x="166" y="80" width="8" height="8"/><rect x="184" y="80" width="8" height="8"/><rect x="420" y="48" width="8" height="8"/><rect x="440" y="48" width="8" height="8"/><rect x="938" y="56" width="8" height="8"/><rect x="958" y="56" width="8" height="8"/><rect x="1146" y="66" width="8" height="8"/><rect x="1166" y="66" width="8" height="8"/></g>
  </svg>`;
const GLOBE = `<svg class="cta-globe" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="78"/><ellipse cx="100" cy="100" rx="78" ry="30"/><ellipse cx="100" cy="100" rx="78" ry="55"/><ellipse cx="100" cy="100" rx="30" ry="78"/><ellipse cx="100" cy="100" rx="55" ry="78"/><line x1="22" y1="100" x2="178" y2="100" stroke="rgba(255,255,255,0.12)"/><line x1="100" y1="22" x2="100" y2="178" stroke="rgba(255,255,255,0.12)"/><circle class="cg-dot" cx="138" cy="64" r="4"/><circle class="cg-dot" cx="70" cy="120" r="4"/><circle class="cg-dot" cx="120" cy="140" r="4"/></svg>`;

function procSteps(steps){
  return steps.map((p,i)=>`<div class="process-step reveal"${i?` style="transition-delay:.0${i*8}s"`:''}><div class="step-ic"><span class="ico">${PROC_ICONS[i%4]}</span></div><span class="step-n">0${i+1}</span><h4>${p[0]}</h4><p>${p[1]}</p></div>`).join('\n      ');
}

// ── Shared head/nav/footer ──
function head(title, desc) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
${baseStyle}
${extraCss}
</head>
<body>`;
}

function nav() {
  return `
<div class="topbar">
  <div class="wrap">
    <div class="topbar-left">
      <a href="mailto:info@gccstartup.com">info@gccstartup.com</a>
      <a href="https://wa.me/gccstartup">WhatsApp Consultation</a>
    </div>
    <div class="topbar-right">
      <a href="index.html#resources">Free Guides</a>
      <a href="index.html#jur">Jurisdictions</a>
      <a href="index.html#tiers" class="pill">Get Started</a>
    </div>
  </div>
</div>
<nav class="site-nav" id="nav">
  <div class="wrap">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">
        <img src="GCC_Startup_Logo.png" alt="GCC Startup" onerror="this.style.display='none';document.getElementById('logoText').style.display='block'">
        <div id="logoText" class="nav-logo-text" style="display:none">GCC <span>Startup</span></div>
      </a>
      <nav class="nav-menu">
        <div class="nav-item">
          <a href="index.html#services">Services <span class="nav-caret">▼</span></a>
          <div class="nav-dd">
            <a href="service-company-registration.html">Company Registration</a>
            <a href="service-bank-account.html">Bank Account Setup</a>
            <a href="service-nominee-ubo.html">Nominee UBO Service</a>
            <a href="service-shelf-company.html">Shelf Companies</a>
            <a href="service-tax-residency.html">Tax Residency</a>
            <a href="service-annual-renewals.html">Annual Renewals</a>
          </div>
        </div>
        <div class="nav-item">
          <a href="index.html#jur">Jurisdictions <span class="nav-caret">▼</span></a>
          <div class="nav-dd">
            <a href="country-uae.html"><span class="dd-flag">🇦🇪</span> UAE</a>
            <a href="country-bahrain.html"><span class="dd-flag">🇧🇭</span> Bahrain</a>
            <a href="country-hongkong.html"><span class="dd-flag">🇭🇰</span> Hong Kong</a>
            <a href="country-singapore.html"><span class="dd-flag">🇸🇬</span> Singapore</a>
            <a href="country-ireland.html"><span class="dd-flag">🇮🇪</span> Ireland</a>
            <a href="country-bvi-cayman.html"><span class="dd-flag">🌴</span> BVI &amp; Cayman</a>
          </div>
        </div>
        <div class="nav-item">
          <a href="index.html#tiers">Pricing <span class="nav-caret">▼</span></a>
          <div class="nav-dd">
            <a href="pricing-self-ubo.html">Self as UBO</a>
            <a href="pricing-nominee-ubo.html">Nominee UBO</a>
            <a href="pricing-shelf-company.html">Shelf Company</a>
          </div>
        </div>
        <a href="index.html#tools">Free Tools</a>
        <a href="index.html#resources">Free Guides</a>
        <a href="index.html#faq">FAQ</a>
      </nav>
      <div class="nav-right">
        <a href="https://wa.me/gccstartup" class="btn btn-ghost">WhatsApp</a>
        <a href="mailto:info@gccstartup.com?subject=Free Consultation" class="btn btn-fill">Book a Call</a>
        <button class="nav-burger" id="burger" onclick="toggleNav()" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </div>
  <div class="nav-drawer" id="drawer">
    <a href="index.html#services" onclick="closeNav()" style="font-weight:500">Services</a>
    <a href="service-company-registration.html" onclick="closeNav()" style="padding-left:48px">Company Registration</a>
    <a href="service-bank-account.html" onclick="closeNav()" style="padding-left:48px">Bank Account Setup</a>
    <a href="service-nominee-ubo.html" onclick="closeNav()" style="padding-left:48px">Nominee UBO Service</a>
    <a href="service-shelf-company.html" onclick="closeNav()" style="padding-left:48px">Shelf Companies</a>
    <a href="service-tax-residency.html" onclick="closeNav()" style="padding-left:48px">Tax Residency</a>
    <a href="service-annual-renewals.html" onclick="closeNav()" style="padding-left:48px">Annual Renewals</a>
    <a href="index.html#jur" onclick="closeNav()" style="font-weight:500">Jurisdictions</a>
    <a href="country-uae.html" onclick="closeNav()" style="padding-left:48px">🇦🇪 UAE</a>
    <a href="country-bahrain.html" onclick="closeNav()" style="padding-left:48px">🇧🇭 Bahrain</a>
    <a href="country-hongkong.html" onclick="closeNav()" style="padding-left:48px">🇭🇰 Hong Kong</a>
    <a href="country-singapore.html" onclick="closeNav()" style="padding-left:48px">🇸🇬 Singapore</a>
    <a href="country-ireland.html" onclick="closeNav()" style="padding-left:48px">🇮🇪 Ireland</a>
    <a href="country-bvi-cayman.html" onclick="closeNav()" style="padding-left:48px">🌴 BVI &amp; Cayman</a>
    <a href="index.html#tiers" onclick="closeNav()" style="font-weight:500">Pricing</a>
    <a href="pricing-self-ubo.html" onclick="closeNav()" style="padding-left:48px">Self as UBO</a>
    <a href="pricing-nominee-ubo.html" onclick="closeNav()" style="padding-left:48px">Nominee UBO</a>
    <a href="pricing-shelf-company.html" onclick="closeNav()" style="padding-left:48px">Shelf Company</a>
    <a href="index.html#tools" onclick="closeNav()">Free Tools</a>
    <a href="index.html#resources" onclick="closeNav()">Free Guides</a>
    <a href="index.html#faq" onclick="closeNav()">FAQ</a>
    <a href="mailto:info@gccstartup.com?subject=Free Consultation" class="btn btn-fill" onclick="closeNav()">Book a Free Consultation</a>
  </div>
</nav>`;
}

function footer(waMsg) {
  return `
<section class="cta-block">${GLOBE}
  <div class="wrap">
    <div class="cta-inner">
      <div>
        <h2>Ready to get started?<br>Book a <em>free 15-min strategy call.</em></h2>
        <p>Direct access to the founder. No obligation, no sales script — just an honest answer about what works for your situation.</p>
      </div>
      <div class="cta-actions">
        <a href="mailto:info@gccstartup.com?subject=Free Strategy Call" class="btn btn-fill btn-arrow">Book a free call</a>
        <a href="https://wa.me/gccstartup?text=${encodeURIComponent(waMsg)}" class="btn btn-stroke">WhatsApp us</a>
      </div>
    </div>
  </div>
</section>
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-brand-name">GCC <span>Startup</span></div>
        <p>Global company registration and tax optimization. Founded by a Finance Director with deep UAE oil &amp; gas corporate finance expertise. Trusted by 500+ entrepreneurs worldwide.</p>
        <div class="footer-social">
          <a href="#" title="LinkedIn"><svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.8-2.05 3.7-2.05 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4z"/></svg></a>
          <a href="#" title="X"><svg viewBox="0 0 24 24"><path d="M17.5 3h3l-7.2 8.2L22 21h-6.4l-5-6.1L4.8 21H1.8l7.7-8.8L2 3h6.6l4.5 5.6zM16.4 19.2h1.66L7.7 4.7H5.9z"/></svg></a>
          <a href="https://wa.me/gccstartup" title="WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a9.9 9.9 0 00-8.4 15.2L2 22l4.9-1.5A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1112 20zm4.4-5.9c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-1.43-.72-2.37-1.28-3.31-2.9-.25-.43.25-.4.71-1.32.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.65 1.53.66 2.13.72 2.9.6.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28z"/></svg></a>
          <a href="#" title="Telegram"><svg viewBox="0 0 24 24"><path d="M21.9 4.3l-3 14.2c-.2 1-.8 1.2-1.7.75l-4.6-3.4-2.2 2.1c-.25.25-.45.45-.9.45l.3-4.6 8.5-7.7c.37-.33-.08-.5-.57-.18L7.05 12.9l-4.5-1.4c-1-.3-1-1 .2-1.45L20.6 3.1c.8-.3 1.5.2 1.3 1.2z"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Services</h5>
        <ul class="footer-links">
          <li><a href="service-company-registration.html">Company Registration</a></li>
          <li><a href="service-bank-account.html">Bank Account Setup</a></li>
          <li><a href="service-nominee-ubo.html">Nominee UBO Service</a></li>
          <li><a href="service-shelf-company.html">Shelf Companies</a></li>
          <li><a href="service-tax-residency.html">Tax Residency</a></li>
          <li><a href="service-annual-renewals.html">Annual Renewals</a></li>
        </ul>
        <h5 style="margin-top:22px">Pricing</h5>
        <ul class="footer-links">
          <li><a href="pricing-self-ubo.html">Self as UBO</a></li>
          <li><a href="pricing-nominee-ubo.html">Nominee UBO</a></li>
          <li><a href="pricing-shelf-company.html">Shelf Company</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Jurisdictions</h5>
        <ul class="footer-links">
          <li><a href="country-uae.html">UAE</a></li>
          <li><a href="country-bahrain.html">Bahrain</a></li>
          <li><a href="country-hongkong.html">Hong Kong</a></li>
          <li><a href="country-singapore.html">Singapore</a></li>
          <li><a href="country-ireland.html">Ireland</a></li>
          <li><a href="country-bvi-cayman.html">BVI &amp; Cayman</a></li>
        </ul>
      </div>
      <div class="footer-nl">
        <h5>Free Tax Guide</h5>
        <p>47-page guide on legal tax optimization across 15+ jurisdictions.</p>
        <div class="nl-row"><input type="email" placeholder="Your email address"><button type="button">Get guide</button></div>
        <div class="footer-contact">
          <h5>Contact</h5>
          <a href="mailto:info@gccstartup.com">info@gccstartup.com</a>
          <a href="https://wa.me/gccstartup">WhatsApp consultation</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">© <span class="cur-year">2025</span> GCCStartup.com — All rights reserved.</span>
      <span class="footer-legal">Tax optimization services. Not legal or financial advice. All structures are jurisdiction-compliant.</span>
    </div>
  </div>
</footer>
<button class="wa-float" onclick="openForm('Quick enquiry')" title="Request a free consultation" aria-label="Request a free consultation">
  <svg viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zM7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/></svg>
</button>

<!-- ─── LEAD FORM MODAL (all CTAs open this) ─── -->
<div class="lead-overlay" id="leadOverlay" onclick="if(event.target===this)closeForm()">
  <div class="lead-modal">
    <button class="lead-close" onclick="closeForm()" aria-label="Close">✕</button>
    <div class="lead-head">
      <span class="eyebrow">Get started</span>
      <h3>Request a free consultation</h3>
      <p id="leadCtx">A specialist replies within 24 hours. No obligation.</p>
    </div>
    <form class="lead-body" id="leadForm" onsubmit="return submitLead(event)">
      <div class="lead-row">
        <div class="lead-field"><label>Full name *</label><input name="name" required placeholder="Your name"></div>
        <div class="lead-field"><label>Email *</label><input type="email" name="email" required placeholder="you@email.com"></div>
      </div>
      <div class="lead-row">
        <div class="lead-field"><label>WhatsApp / phone</label><input name="phone" placeholder="+ country code"></div>
        <div class="lead-field"><label>Country of interest</label><select name="country">
          <option value="">Not sure yet</option><option>UAE</option><option>Bahrain</option><option>Hong Kong</option><option>Singapore</option><option>Ireland</option><option>BVI &amp; Cayman</option>
        </select></div>
      </div>
      <div class="lead-field"><label>What do you need?</label><select name="interest">
        <option value="">Select…</option><option>Company registration</option><option>Bank account setup</option><option>Nominee UBO</option><option>Shelf company</option><option>Tax residency</option><option>Annual renewals</option><option>Not sure / general enquiry</option>
      </select></div>
      <div class="lead-field"><label>Message <span style="opacity:.6">(optional)</span></label><textarea name="message" placeholder="Tell us a bit about your situation…"></textarea></div>
      <input type="hidden" name="source" id="leadSource">
      <button type="submit" class="btn btn-fill btn-arrow" style="width:100%;justify-content:center">Send my enquiry</button>
      <p class="lead-note">🔒 Confidential. No spam. We reply within 24 hours.</p>
    </form>
    <div class="lead-success" id="leadSuccess"><div class="ls-ic">✓</div><strong>Thank you!</strong><br>We’ve received your enquiry and will reply within 24 hours.</div>
  </div>
</div>
<script>
// ─── LEAD FORM MODAL — all CTAs open this ───
const LEAD_ENDPOINT = ''; // e.g. 'https://cms.gccstartup.com/api/lead' — your Payload lead endpoint (Twenty + WAHA fire server-side)
function openForm(ctx){
  var o=document.getElementById('leadOverlay');
  document.getElementById('leadForm').style.display='';
  document.getElementById('leadSuccess').classList.remove('on');
  var c=document.getElementById('leadCtx');
  if(ctx){ document.getElementById('leadSource').value=ctx; c.textContent=ctx+' — a specialist replies within 24 hours.'; mapInterest(ctx); }
  else { document.getElementById('leadSource').value=location.pathname; c.textContent='A specialist replies within 24 hours. No obligation.'; }
  o.classList.add('show'); document.body.style.overflow='hidden';
}
function closeForm(){ document.getElementById('leadOverlay').classList.remove('show'); document.body.style.overflow=''; }
function setSel(sel,val){ if(!sel)return; Array.prototype.forEach.call(sel.options,function(o){ if(o.value===val||o.text===val) sel.value=o.value; }); }
function mapInterest(ctx){
  var t=ctx.toLowerCase();
  var co={'uae':'UAE','bahrain':'Bahrain','hong kong':'Hong Kong','singapore':'Singapore','ireland':'Ireland','bvi':'BVI & Cayman','cayman':'BVI & Cayman'};
  var iv={'registration':'Company registration','bank':'Bank account setup','nominee':'Nominee UBO','shelf':'Shelf company','residency':'Tax residency','renewal':'Annual renewals'};
  var cs=document.querySelector('#leadForm [name=country]'), is=document.querySelector('#leadForm [name=interest]');
  Object.keys(co).forEach(function(k){ if(t.indexOf(k)>-1) setSel(cs,co[k]); });
  Object.keys(iv).forEach(function(k){ if(t.indexOf(k)>-1) setSel(is,iv[k]); });
}
function submitLead(e){
  e.preventDefault();
  var data={}; new FormData(e.target).forEach(function(v,k){ data[k]=v; });
  data.page=location.pathname; data.ts=new Date().toISOString();
  if(LEAD_ENDPOINT){ fetch(LEAD_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).catch(function(){}); }
  else { console.log('LEAD captured (set LEAD_ENDPOINT to send to CRM):',data); }
  document.getElementById('leadForm').style.display='none';
  document.getElementById('leadSuccess').classList.add('on');
  return false;
}
(function wireCtas(){
  function ctxOf(h){ var s=h.match(/subject=([^&]*)/), t=h.match(/[?&]text=([^&]*)/);
    if(s) return decodeURIComponent(s[1].replace(/\\+/g,' '));
    if(t) return decodeURIComponent(t[1].replace(/\\+/g,' '));
    return ''; }
  document.querySelectorAll('a[href^="mailto:"], a[href*="wa.me"], a[href*="whatsapp"]').forEach(function(a){
    a.addEventListener('click',function(e){ e.preventDefault(); openForm(ctxOf(a.getAttribute('href')||'')); });
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeForm(); });
})();
</script>
<script>
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('shadow',scrollY>50));
function toggleNav(){document.getElementById('burger').classList.toggle('open');document.getElementById('drawer').classList.toggle('open');}
function closeNav(){document.getElementById('burger').classList.remove('open');document.getElementById('drawer').classList.remove('open');}
const observer=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');observer.unobserve(e.target);}})},{threshold:0.07,rootMargin:'0px 0px -36px 0px'});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
function faqToggle(el){const a=el.nextElementSibling,o=a.classList.contains('open');document.querySelectorAll('.faq-a').forEach(x=>x.classList.remove('open'));document.querySelectorAll('.faq-q').forEach(x=>x.classList.remove('open'));if(!o){a.classList.add('open');el.classList.add('open');}}
document.querySelectorAll('.cur-year').forEach(e=>e.textContent=new Date().getFullYear());
// Document readiness checker
function docCheck(){
  const items=document.querySelectorAll('.docheck-item');
  let on=0; items.forEach(i=>{if(i.classList.contains('on'))on++;});
  const pct=Math.round(on/items.length*100);
  document.getElementById('docFill').style.width=pct+'%';
  document.getElementById('docCount').textContent=on+' / '+items.length+' ready';
  const missing=items.length-on;
  const r=document.getElementById('docResult');
  if(missing===0){r.innerHTML='<strong>100% ready.</strong> You have everything needed — let\\'s start your registration today.';}
  else{r.innerHTML='<strong>'+pct+'% ready</strong> — you\\'re missing '+missing+' document'+(missing>1?'s':'')+'. We\\'ll help you prepare the rest. Message us and we\\'ll send templates.';}
}
function docToggle(el){el.classList.toggle('on');docCheck();}
// Timeline calculator
function timeCalc(workingDays){
  const v=document.getElementById('tcDate').value;
  const out=document.getElementById('tcResult');
  if(!v){out.innerHTML='Pick a target launch date to see if you can make it.';return;}
  const target=new Date(v), today=new Date(); today.setHours(0,0,0,0);
  let days=0,cur=new Date(today);
  while(cur<target){cur.setDate(cur.getDate()+1);const d=cur.getDay();if(d!==0&&d!==6)days++;}
  if(days>=workingDays){
    const startBy=new Date(target); let back=workingDays; while(back>0){startBy.setDate(startBy.getDate()-1);const d=startBy.getDay();if(d!==0&&d!==6)back--;}
    out.innerHTML='<strong>Yes — you can make it.</strong> Setup needs ~'+workingDays+' working days. To hit this date, start by <strong>'+startBy.toDateString()+'</strong>.';
  } else {
    out.innerHTML='<strong>That\\'s tight.</strong> Setup needs ~'+workingDays+' working days and only '+days+' remain. Start immediately or ask us about a shelf company for a faster launch.';
  }
}
</script>
</body>
</html>`;
}

// FAQ builder
function faqBlock(intro, items, waMsg) {
  return `
<section class="section" id="faq">
  <div class="wrap">
    <div class="faq-layout">
      <div class="faq-left reveal">
        <span class="eyebrow">Questions</span>
        <h2>${intro}</h2>
        <p>The questions we hear most often about this option. Still unsure? Ask us directly.</p>
        <div class="faq-contact">
          <h4>Still have questions?</h4>
          <p>WhatsApp us for a direct, honest answer — usually within a couple of hours.</p>
          <a href="https://wa.me/gccstartup?text=${encodeURIComponent(waMsg)}" class="btn btn-fill">WhatsApp us now</a>
        </div>
      </div>
      <div class="faq-list reveal" style="transition-delay:.1s">
        ${items.map(f=>`<div class="faq-item"><div class="faq-q" onclick="faqToggle(this)">${f.q} <span class="faq-icon">+</span></div><div class="faq-a">${f.a}</div></div>`).join('\n        ')}
      </div>
    </div>
  </div>
</section>`;
}

// ───────────────────────── COUNTRY DATA ─────────────────────────
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

function countryPage(c){
  const waMsg = `Hi, I'm interested in setting up in ${c.name}.`;
  return head(`${c.name} Company Registration — Cost, Process & Requirements | GCC Startup`,
    `Register your company in ${c.name}: ${c.tax}. Costs, timeline, requirements, process and FAQs. Founder-led, fully compliant setup from ${c.from}.`)
  + nav()
  + `
<section class="subhero">${SKYLINE}
  <div class="subhero-watermark">${c.flag}</div>
  <div class="wrap">
    <div class="crumbs"><a href="index.html">Home</a> &nbsp;/&nbsp; <a href="index.html#jur">Jurisdictions</a> &nbsp;/&nbsp; ${c.name}</div>
    <span class="subhero-flag">${c.flag}</span>
    <h1>${c.headline}</h1>
    <p>${c.intro}</p>
    <div class="subhero-btns">
      <a href="mailto:info@gccstartup.com?subject=${encodeURIComponent(c.name+' company registration')}" class="btn btn-fill btn-arrow">Start my ${c.name} setup</a>
      <a href="https://wa.me/gccstartup?text=${encodeURIComponent(waMsg)}" class="btn btn-stroke">WhatsApp us</a>
    </div>
    <div class="subhero-meta">
      <div><span class="smi-n">${c.tax}</span><span class="smi-l">Tax position</span></div>
      <div><span class="smi-n">${c.timeline}</span><span class="smi-l">Timeline</span></div>
      <div><span class="smi-n">${c.from}</span><span class="smi-l">Starting from</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-header reveal">
      <span class="eyebrow">Why ${c.name}</span>
      <h2>Why founders choose ${c.name}.</h2>
      <p>The real advantages — and exactly who they’re built for.</p>
    </div>
    <div class="benefit-grid reveal">
      ${c.benefits.map((b,i)=>`<div class="benefit-item"><span class="benefit-num">0${i+1}</span><h3>${b[0]}</h3><p>${b[1]}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <div class="section-header reveal">
      <span class="eyebrow">How it works</span>
      <h2>Your ${c.name} setup, step by step.</h2>
    </div>
    <div class="process-grid">
      ${procSteps(c.process)}
    </div>
    <div style="margin-top:36px">
      <div class="midcta reveal">
        <div><h3>Not sure you’ll hit your launch date?</h3><p>Use the timeline calculator below, or message us for an honest answer in minutes.</p></div>
        <a href="https://wa.me/gccstartup?text=${encodeURIComponent(waMsg)}" class="btn btn-fill btn-arrow">Ask about my timeline</a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-header reveal">
      <span class="eyebrow">Free tools</span>
      <h2>Check your readiness &amp; timeline.</h2>
      <p>Two quick tools to see exactly where you stand before you commit.</p>
    </div>
    <div class="tool-2col">
      <div class="docheck reveal">
        <div class="docheck-head"><h4>Document readiness checker</h4><span id="docCount">0 / ${c.docs.length} ready</span></div>
        <div class="docheck-bar"><div class="docheck-fill" id="docFill"></div></div>
        <div class="docheck-body">
          ${c.docs.map(d=>`<div class="docheck-item" onclick="docToggle(this)"><span class="docheck-box">✓</span>${d}</div>`).join('\n          ')}
          <div class="docheck-result" id="docResult">Tick the documents you already have to see your readiness.</div>
        </div>
      </div>
      <div class="timecalc reveal" style="transition-delay:.08s">
        <div class="timecalc-head"><h4>Registration timeline calculator</h4></div>
        <div class="timecalc-body">
          <div class="timecalc-field"><label>Your target launch date</label><input type="date" id="tcDate" onchange="timeCalc(${c.workDays})"></div>
          <div class="timecalc-result" id="tcResult">${c.name} setup needs ~${c.workDays} working days. Pick a date to check if you can make it.</div>
          <a href="mailto:info@gccstartup.com?subject=${encodeURIComponent('Lock in my '+c.name+' start date')}" class="est-cta" style="display:block;text-align:center;text-decoration:none">Lock in my start date →</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <div class="section-header reveal">
      <span class="eyebrow">What you’ll need</span>
      <h2>${c.name} document requirements.</h2>
      <p>Standard requirements — we confirm the exact list for your activity during the consultation.</p>
    </div>
    <ul class="req-list reveal">
      ${c.docs.map(d=>`<li><span class="req-ic">✓</span>${d}</li>`).join('\n      ')}
    </ul>
  </div>
</section>

${faqBlock(`${c.name} questions, answered.`, c.faq, waMsg)}

${footer(waMsg)}`;
}

// ───────────────────────── PRICING DATA ─────────────────────────
const tiers = [
  {
    slug:'self-ubo', file:'pricing-self-ubo.html', tierLabel:'Tier 01', name:'Self as UBO',
    price:'<sup>$</sup>1,500', note:'Company registration + $500 per bank account',
    intro:'You are the registered director and ultimate beneficial owner. Full transparency, the lowest cost, and complete compliance — ideal when privacy isn’t a priority.',
    features:[
      ['Government fees included','Official registration and authority fees are built into the price — no surprises.'],
      ['Bank account setup','A fintech or local bank account arranged for you, at $500 per account.'],
      ['Full KYC support','We prepare and review your KYC pack so applications clear first time.'],
      ['Available everywhere','Offered across all of our 15+ jurisdictions, including UAE, Bahrain, HK & Ireland.'],
      ['WhatsApp & email support','Direct line to the team throughout setup and after handover.'],
      ['Clean ownership trail','Your name is on the register — simplest structure for financing and audits.'],
    ],
    whofor:['Founders comfortable being publicly listed as owner','Anyone wanting the lowest-cost compliant setup','Businesses that will seek bank financing or investment','Operators who value simplicity over privacy'],
    process:[
      ['Consultation','We confirm jurisdiction, activity and a fixed all-in quote.'],
      ['Registration','We file the company with you listed as director and UBO.'],
      ['Banking','We arrange your fintech or local account and complete KYC.'],
      ['Handover','You receive all documents and credentials, ready to operate.'],
    ],
    faq:[
      {q:'What does "Self as UBO" actually mean?',a:'You are recorded as the Ultimate Beneficial Owner and director of the company. There is no nominee — your name appears on the corporate register. It is the most transparent and lowest-cost structure.'},
      {q:'What is included in the $1,500?',a:'Company registration and all government/authority fees for your chosen jurisdiction. Bank accounts are $500 each. Some jurisdictions carry higher official fees — we confirm the exact all-in figure before you pay.'},
      {q:'Can I add a nominee later?',a:'Yes. Many clients start here and upgrade to a Nominee UBO arrangement later for privacy. We can transition you without re-registering the company.'},
      {q:'Which jurisdictions support this tier?',a:'All of them — UAE, Bahrain, Hong Kong, Singapore, Ireland and BVI/Cayman. The base service fee is the same; only government fees differ by country.'},
    ],
  },
  {
    slug:'nominee-ubo', file:'pricing-nominee-ubo.html', tierLabel:'Tier 02', name:'Nominee UBO', featured:true,
    price:'<sup>$</sup>2,250<sup style="font-size:20px">+</sup>', note:'Registration + bank + nominee from $750',
    intro:'GCC Startup provides a nominated UBO so your name stays off the public record. You keep full control and account access; we hold the nominee’s legal liability. Our most requested service.',
    features:[
      ['Full corporate privacy','A professional nominee appears as owner — your identity stays off the public register.'],
      ['We hold nominee liability','GCC Startup assumes the nominee’s legal responsibility, documented in your favour.'],
      ['You retain control','You hold the bank account access and run the business; the nominee is non-executive.'],
      ['Priority support','Faster response times and a dedicated point of contact.'],
      ['Annual renewal from $750','Transparent, fixed nominee renewal — agreed up front, no surprises.'],
      ['Watertight documentation','Declaration of trust and power of attorney protect your beneficial ownership.'],
    ],
    whofor:['Founders who need privacy from public registers','Consultants and investors protecting their identity','Clients consolidating multiple ventures discreetly','Anyone wanting credibility without personal exposure'],
    process:[
      ['Consultation','We confirm the structure and explain the nominee protections in plain terms.'],
      ['Registration + nominee','We register the company with our nominee as UBO and sign your protection deeds.'],
      ['Banking in your control','We open the account with you as the controlling signatory.'],
      ['Handover','You receive all documents, the trust deed and POA, fully in control.'],
    ],
    faq:[
      {q:'Is a Nominee UBO legal?',a:'Yes. Nominee arrangements are a long-established, legal tool for legitimate privacy. The structure is fully disclosed to banks and authorities where required; it is privacy, not concealment. We comply with all KYC, FATF and CRS obligations.'},
      {q:'Do I lose control of my company?',a:'No. You hold a Declaration of Trust and Power of Attorney confirming you as the true owner, and you control the bank account. The nominee acts only on your instruction and cannot transact or transfer ownership.'},
      {q:'What liability does the nominee carry?',a:'GCC Startup assumes the nominee’s formal legal liability as the registered party, while your protection deeds ensure the economic ownership and control remain entirely yours.'},
      {q:'What does the $2,250+ cover?',a:'It bundles company registration, a bank account and the nominee appointment (nominee from $750). The exact figure depends on jurisdiction and number of accounts — confirmed up front.'},
      {q:'How does annual renewal work?',a:'The nominee service renews annually from $750/year, fixed at setup. We remind you ahead of time and handle the filing so there is no deadline risk.'},
    ],
  },
  {
    slug:'shelf-company', file:'pricing-shelf-company.html', tierLabel:'Tier 03', name:'Shelf Company',
    price:'<sup>$</sup>1,500<span style="font-size:22px">–2,500</span>', note:'Varies by account age and transaction history',
    intro:'A ready-made company with an existing bank account and transaction history, transferred to you and operational within 24–48 hours. For when you need an established presence immediately.',
    features:[
      ['Pre-registered entity','The company already exists — no waiting for incorporation.'],
      ['Existing bank account','Comes with an open account, avoiding the slowest part of any setup.'],
      ['Transaction history','An established trading history that signals maturity to partners and platforms.'],
      ['Live in 24–48 hours','Ownership and signatory control transferred to you within two days.'],
      ['Immediate operations','Invoice, contract and transact from day one.'],
      ['Vetted & clean','Every shelf entity is due-diligence checked before we offer it to you.'],
    ],
    whofor:['Founders who need to operate immediately','Businesses bidding for contracts that require company age','Sellers needing an aged entity for platform approval','Anyone wanting to skip the incorporation & banking wait'],
    process:[
      ['Tell us your need','Share the jurisdiction, age and banking you require; we check availability.'],
      ['Select the entity','We present available shelf companies with their age and history.'],
      ['Transfer & KYC','Ownership and bank signatory rights are transferred to you after KYC.'],
      ['Operational','Within 24–48 hours the company is yours and ready to trade.'],
    ],
    faq:[
      {q:'Are shelf companies legitimate?',a:'Yes. A shelf company is simply a previously-registered, dormant entity that has been kept compliant and is now transferred to a new owner. It is a long-standing, legal practice. You complete full KYC before the transfer.'},
      {q:'How old are the companies?',a:'Availability varies. Some are a few months old, others several years, with correspondingly longer banking and transaction history. Price reflects age and history — older, more-established entities cost more.'},
      {q:'How does the bank account transfer work?',a:'The existing account is retained and signatory control is updated to you after the bank completes its KYC on the new owner. We manage the change-of-control process end to end.'},
      {q:'Why choose a shelf company over a new one?',a:'Speed and maturity. You skip incorporation and account-opening delays, and you gain an entity with history — useful for contracts, tenders and platforms that favour established companies.'},
      {q:'What does the price depend on?',a:'Jurisdiction, the age of the company, and the depth of its banking and transaction history. We quote a firm figure once you choose a specific entity.'},
    ],
  },
];

function pricingPage(t){
  const waMsg = `Hi, I'd like to know more about the ${t.name} package.`;
  return head(`${t.name} — Pricing, What’s Included & FAQ | GCC Startup`,
    `${t.name} (${t.tierLabel}) from GCC Startup. Full breakdown of pricing, what’s included, who it’s for, the process and FAQs.`)
  + nav()
  + `
<section class="subhero">${SKYLINE}
  <div class="wrap">
    <div class="crumbs"><a href="index.html">Home</a> &nbsp;/&nbsp; <a href="index.html#tiers">Pricing</a> &nbsp;/&nbsp; ${t.name}</div>
    <span class="eyebrow" style="color:#93B4FF">${t.tierLabel}${t.featured?' · Most popular':''}</span>
    <h1>${t.name}</h1>
    <p>${t.intro}</p>
    <div style="display:flex;align-items:flex-end;gap:28px;flex-wrap:wrap;margin:8px 0 4px">
      <div class="pd-amount" style="color:#fff">${t.price}</div>
    </div>
    <div class="pd-note" style="color:rgba(255,255,255,0.45)">${t.note}</div>
    <div class="subhero-btns">
      <a href="mailto:info@gccstartup.com?subject=${encodeURIComponent(t.name+' enquiry')}" class="btn btn-fill btn-arrow">Get started with ${t.name}</a>
      <a href="https://wa.me/gccstartup?text=${encodeURIComponent(waMsg)}" class="btn btn-stroke">WhatsApp us</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-header reveal">
      <span class="eyebrow">What’s included</span>
      <h2>Everything in the ${t.name} package.</h2>
      <p>Defined up front. Government fees, service charges and renewals — all agreed before you sign.</p>
    </div>
    <div class="pd-feature-grid reveal">
      ${t.features.map(f=>`<div class="pd-feature"><h4><span class="pdf-ic">✓</span>${f[0]}</h4><p>${f[1]}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center" class="reveal">
      <div class="whofor">
        <h3>Who this is for</h3>
        <ul style="list-style:none;padding:0;margin:0">
          ${t.whofor.map(w=>`<li>${w}</li>`).join('\n          ')}
        </ul>
      </div>
      <div>
        <span class="eyebrow">Decide with confidence</span>
        <h2 style="margin-bottom:14px">Not sure this is the right tier?</h2>
        <p style="color:var(--muted);font-size:15px;line-height:1.7;margin-bottom:22px">Take the 60-second jurisdiction quiz, or message the founder directly for a straight recommendation based on your situation.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <a href="index.html#finder" class="btn btn-ghost btn-arrow">Take the quiz</a>
          <a href="https://wa.me/gccstartup?text=${encodeURIComponent(waMsg)}" class="btn btn-fill">Ask the founder</a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-header reveal">
      <span class="eyebrow">How it works</span>
      <h2>From enquiry to operational.</h2>
    </div>
    <div class="process-grid">
      ${procSteps(t.process)}
    </div>
    <div style="margin-top:36px">
      <div class="midcta reveal">
        <div><h3>Ready to move forward with ${t.name}?</h3><p>Get a fixed, all-in quote with no hidden fees — usually within a few hours.</p></div>
        <a href="mailto:info@gccstartup.com?subject=${encodeURIComponent(t.name+' quote')}" class="btn btn-fill btn-arrow">Get my fixed quote</a>
      </div>
    </div>
  </div>
</section>

${faqBlock(`${t.name} questions, answered.`, t.faq, waMsg)}

${footer(waMsg)}`;
}

// ───────────────────────── SERVICES DATA ─────────────────────────
const services = [
  {
    slug:'company-registration', file:'service-company-registration.html', name:'Company Registration',
    headline:'Company <em>registration</em>, end to end.', meta:[['15+','Jurisdictions'],['Gov. fees','Included'],['From $1,500','All-in']],
    intro:'Full company formation in the UAE, Bahrain, Hong Kong, Singapore, Ireland, BVI and more. Government fees included, no hidden charges — your entity registered and ready to bank.',
    features:[
      ['Jurisdiction selection','We match your activity, tax goals and banking needs to the right country and structure.'],
      ['Name & activity approval','We reserve your trade name and secure activity approval with the authority.'],
      ['Government filing','All incorporation paperwork filed for you, with fees built into a fixed quote.'],
      ['Registered address','A compliant registered office / agent provided where the jurisdiction requires it.'],
      ['Corporate documents','Certificate of incorporation, constitution, share certificates — full kit handed over.'],
      ['Fast turnaround','From 2–3 days (Ireland) to ~30 days (Gulf incl. visit), depending on jurisdiction.'],
    ],
    process:[
      ['Consultation','We confirm jurisdiction, structure and a fixed all-in quote.'],
      ['Name & approval','Trade name reserved and activity approved with the authority.'],
      ['Filing','We file your incorporation and pay the government fees.'],
      ['Handover','You receive the full corporate document kit, ready to bank.'],
    ],
    related:'<a href="index.html#jur" class="btn btn-ghost btn-arrow">Choose a jurisdiction</a><a href="index.html#tiers" class="btn btn-fill">See pricing tiers</a>',
    faq:[
      {q:'Which jurisdictions can you register in?',a:'All 15+ in our network, including UAE, Bahrain, Hong Kong, Singapore, Ireland and BVI/Cayman. Each has a dedicated page with its costs, timeline and requirements.'},
      {q:'Are government fees really included?',a:'Yes. We quote a single all-in figure that includes official registration fees for your chosen jurisdiction. Bank accounts and optional add-ons (e.g. nominee) are priced separately and disclosed up front.'},
      {q:'How long does registration take?',a:'It depends on the country — Ireland in 2–3 days, Hong Kong and Singapore in ~17–18 days, and Gulf jurisdictions around 30 days when residency and local banking are included.'},
      {q:'Do I have to travel?',a:'For Hong Kong, Singapore and Ireland, no — setup is fully remote. UAE, Bahrain and Oman require a short visit for biometrics and local banking.'},
    ],
  },
  {
    slug:'bank-account', file:'service-bank-account.html', name:'Bank Account Setup',
    headline:'Credible <em>banking</em>, arranged for you.', meta:[['Local + fintech','Options'],['$500','per account'],['Guided','To approval']],
    intro:'Local credible banking — Emirates NBD, FAB, RAK Bank — or fast fintech accounts via Wise and Airwallex. We prepare your file and guide every step from application to approval.',
    features:[
      ['Local Tier-1 banks','Introductions and application support for Emirates NBD, FAB, RAK Bank, Mashreq and more.'],
      ['Fintech accounts','Fast, remote multi-currency accounts with Wise, Airwallex and Statrys.'],
      ['Application preparation','We build a clean KYC and business-rationale file that banks actually approve.'],
      ['Source-of-funds support','Guidance on documenting funds so applications clear compliance first time.'],
      ['Multi-currency','USD, EUR, GBP, AED and more — set up to receive and hold globally.'],
      ['Realistic guidance','We tell you honestly which banks fit your profile before you apply.'],
    ],
    process:[
      ['Profile review','We assess your nationality, activity and structure to shortlist the right banks.'],
      ['File preparation','We assemble your KYC, source-of-funds and business documentation.'],
      ['Application & intro','We submit and, for local banks, arrange the in-person or remote meeting.'],
      ['Approval & handover','Account opened; you receive credentials and can transact immediately.'],
    ],
    related:'<a href="service-company-registration.html" class="btn btn-ghost btn-arrow">Register a company first</a><a href="https://wa.me/gccstartup" class="btn btn-fill">Ask about my banking</a>',
    faq:[
      {q:'Can I open a bank account remotely?',a:'Yes — fintech accounts (Wise, Airwallex, Statrys) onboard fully online. Local Tier-1 banks usually require one in-person meeting, which we arrange. Many clients use both: a fintech account immediately and a local account in parallel.'},
      {q:'Which banks do you work with?',a:'Local: Emirates NBD, FAB, RAK Bank, Mashreq and regional Gulf banks. Fintech: Wise, Airwallex, Statrys. We recommend based on your nationality, activity and where your customers are.'},
      {q:'What is the success rate?',a:'High, because we pre-qualify you and prepare the file properly. We will tell you up front if a particular bank is unlikely to approve your profile rather than waste an application.'},
      {q:'How much does it cost?',a:'Bank account setup is $500 per account on top of registration. The bank itself may have its own minimum balance or fees, which we disclose before you apply.'},
    ],
  },
  {
    slug:'nominee-ubo', file:'service-nominee-ubo.html', name:'Nominee UBO Service',
    headline:'Privacy with a <em>nominee UBO</em> — you keep control.', meta:[['Full privacy','Off public register'],['From $750','+ renewal'],['Liability','We hold it']],
    intro:'GCC Startup provides a nominated Ultimate Beneficial Owner so your name stays off the public record. You retain complete control and bank access; we assume the nominee’s legal liability. Our most requested service.',
    features:[
      ['Professional nominee','A vetted nominee appears as the registered owner in public filings.'],
      ['Declaration of trust','A signed deed confirms you as the true beneficial owner at all times.'],
      ['Power of attorney','You hold a POA giving you full authority over the company and its affairs.'],
      ['We hold liability','GCC Startup assumes the nominee’s formal legal responsibility.'],
      ['You control banking','You are the controlling signatory on the bank account — the nominee cannot transact.'],
      ['Fixed annual renewal','Transparent nominee renewal from $750/year, agreed at setup.'],
    ],
    process:[
      ['Consultation','We explain the protections in plain terms and confirm the structure.'],
      ['Appointment','The nominee is appointed and your trust deed and POA are executed.'],
      ['Banking','We open the account with you as the controlling signatory.'],
      ['Handover','You receive all documents, fully in control and off the public register.'],
    ],
    related:'<a href="pricing-nominee-ubo.html" class="btn btn-fill btn-arrow">See Nominee UBO pricing</a><a href="https://wa.me/gccstartup" class="btn btn-ghost">Ask a question</a>',
    faq:[
      {q:'Is a nominee UBO legal?',a:'Yes — it is a long-established, legal privacy tool, fully disclosed to banks and authorities where required. It is privacy, not concealment, and we comply with all KYC, FATF and CRS obligations.'},
      {q:'Will I lose control?',a:'No. A Declaration of Trust and Power of Attorney confirm you as the true owner and give you full authority. You control the bank account; the nominee acts only on your instruction.'},
      {q:'What does it cost?',a:'The nominee starts from $750, with renewal from $750/year. See the Nominee UBO pricing page for the full bundled cost including registration and banking.'},
      {q:'In which jurisdictions is it available?',a:'Across our network. It is most popular with Hong Kong and Gulf entities, but can be applied wherever a beneficial-owner register or privacy concern exists.'},
    ],
  },
  {
    slug:'shelf-company', file:'service-shelf-company.html', name:'Shelf Companies',
    headline:'Ready-made <em>shelf companies</em>, live in 48 hours.', meta:[['24–48h','To operational'],['Bank acct','Included'],['Aged','History intact']],
    intro:'Pre-registered entities with an existing bank account and transaction history, transferred to you and operational within 24–48 hours. For when you need an established company presence immediately.',
    features:[
      ['Pre-registered entity','The company already exists — skip incorporation entirely.'],
      ['Existing bank account','Comes with an open account, removing the slowest part of any setup.'],
      ['Transaction history','An established trading record that signals maturity to partners and platforms.'],
      ['Rapid transfer','Ownership and signatory control transferred to you within 24–48 hours.'],
      ['Vetted & clean','Every entity is due-diligence checked before we offer it.'],
      ['Immediate operations','Invoice, contract and transact from day one.'],
    ],
    process:[
      ['Tell us your need','Jurisdiction, age and banking you require; we check availability.'],
      ['Select the entity','We present available shelf companies with their age and history.'],
      ['Transfer & KYC','Ownership and bank signatory rights transferred after KYC.'],
      ['Operational','Within 24–48 hours the company is yours and ready to trade.'],
    ],
    related:'<a href="pricing-shelf-company.html" class="btn btn-fill btn-arrow">See shelf company pricing</a><a href="https://wa.me/gccstartup" class="btn btn-ghost">Check availability</a>',
    faq:[
      {q:'Are shelf companies legitimate?',a:'Yes. A shelf company is a previously-registered, dormant entity kept compliant and transferred to a new owner — a long-standing, legal practice. You complete full KYC before transfer.'},
      {q:'How old are the companies?',a:'It varies — from a few months to several years, with correspondingly deeper banking and transaction history. Price reflects age and history.'},
      {q:'How does the bank account transfer?',a:'The existing account is retained and signatory control updated to you after the bank completes KYC on the new owner. We manage the change-of-control end to end.'},
      {q:'Why choose this over a new company?',a:'Speed and maturity — you skip incorporation and account-opening delays and gain an entity with history, useful for contracts, tenders and platform approvals.'},
    ],
  },
  {
    slug:'tax-residency', file:'service-tax-residency.html', name:'Tax Residency',
    headline:'Personal <em>tax residency</em> in the Gulf.', meta:[['UAE · Bahrain · Oman','Options'],['Emirates ID','Included'],['Family visas','Available']],
    intro:'UAE, Bahrain and Oman offer full personal tax residency with residence visas, Emirates ID and family sponsorship. We handle the entire process — from company to ID to tax-residency certificate.',
    features:[
      ['Residence visa','A renewable residency visa underpinned by your company, for you and your family.'],
      ['Emirates ID','Your official Gulf identity document, required for banking and daily life.'],
      ['Family sponsorship','Sponsor your spouse and children once your residency is issued.'],
      ['Tax residency certificate','We obtain the TRC that evidences your tax residence for treaty purposes.'],
      ['183-day guidance','Practical advice on substance and presence to make your residency robust.'],
      ['End-to-end handling','Medical, biometrics, stamping and ID — managed for you.'],
    ],
    process:[
      ['Consultation','We confirm the best emirate/country and your residency objective.'],
      ['Company & visa file','We register your entity and prepare your establishment card and visa file.'],
      ['Medical & biometrics','You attend a short in-person visit for the medical and Emirates ID biometrics.'],
      ['ID & TRC','Your visa and Emirates ID are issued; we obtain the tax-residency certificate.'],
    ],
    related:'<a href="country-uae.html" class="btn btn-ghost btn-arrow">UAE residency details</a><a href="country-bahrain.html" class="btn btn-fill">Bahrain residency details</a>',
    faq:[
      {q:'Do I need to live in the Gulf full-time?',a:'No, but residency must be genuine. We advise on the presence and substance needed to keep your tax residency robust and treaty-compliant, including the role of the 183-day test in your home country.'},
      {q:'Which country is best for tax residency?',a:'The UAE is the most popular for lifestyle, banking and recognition. Bahrain is more cost-effective with 0% corporate tax. Oman is a quieter alternative. We recommend based on your goals and budget.'},
      {q:'Can my family get residency too?',a:'Yes. Once your residency is issued you can sponsor your spouse and children. We handle the dependant visa applications as part of the service.'},
      {q:'What is a Tax Residency Certificate (TRC)?',a:'A TRC is an official document proving you are tax-resident in that country — essential for claiming double-tax treaty benefits and demonstrating your status to other authorities. We obtain it for you.'},
    ],
  },
  {
    slug:'annual-renewals', file:'service-annual-renewals.html', name:'Annual Renewals',
    headline:'Renewals &amp; <em>compliance</em>, handled.', meta:[['Fixed fees','Set at setup'],['Reminders','Ahead of time'],['Zero','Deadline anxiety']],
    intro:'License renewals, nominee renewals and compliance filings managed on your behalf. Annual fees are fixed when you set up, so there are no surprises and no missed deadlines.',
    features:[
      ['License renewals','We renew your trade license and registrations before they lapse.'],
      ['Nominee renewals','If you use a nominee UBO, we renew it on schedule at the agreed fee.'],
      ['Compliance filings','Annual returns, beneficial-owner updates and economic-substance filings handled.'],
      ['Audit coordination','Where an audit is required (e.g. Hong Kong), we arrange and file it.'],
      ['Fixed, known fees','Renewal costs are set at setup — no year-on-year surprises.'],
      ['Proactive reminders','We track every deadline and remind you well ahead of time.'],
    ],
    process:[
      ['Calendar setup','At onboarding we map every renewal and filing deadline for your structure.'],
      ['Advance reminder','We notify you ahead of each deadline with the fixed fee.'],
      ['We file','You approve; we handle the renewal or filing with the authority.'],
      ['Confirmation','You receive proof of renewal and an updated compliance record.'],
    ],
    related:'<a href="index.html#tiers" class="btn btn-ghost btn-arrow">See pricing</a><a href="https://wa.me/gccstartup" class="btn btn-fill">Ask about my renewals</a>',
    faq:[
      {q:'Are renewal fees fixed?',a:'Yes. We agree your annual renewal costs at setup so you know exactly what to budget each year — including license and, where applicable, nominee renewals.'},
      {q:'What happens if I miss a deadline?',a:'We track every deadline and remind you in advance, so you shouldn’t. If a filing is late, we move quickly to resolve it and minimise any penalty.'},
      {q:'Do you handle audits and substance filings?',a:'Yes. Where a jurisdiction requires an audit (e.g. Hong Kong) or economic-substance reporting (e.g. BVI/Cayman), we coordinate and file it for you.'},
      {q:'Can you take over renewals for a company you didn’t register?',a:'Often yes. Send us your current corporate documents and we’ll review whether we can take over the renewals and ongoing compliance.'},
    ],
  },
];

function servicePage(s){
  const waMsg = `Hi, I'd like to know more about your ${s.name} service.`;
  return head(`${s.name} — GCC Startup`,
    `${s.name} from GCC Startup. What's included, how it works, and FAQs. Founder-led, fully compliant.`)
  + nav()
  + `
<section class="subhero">${SKYLINE}
  <div class="wrap">
    <div class="crumbs"><a href="index.html">Home</a> &nbsp;/&nbsp; <a href="index.html#services">Services</a> &nbsp;/&nbsp; ${s.name}</div>
    <div class="icon-c" style="background:rgba(255,255,255,0.1);border-color:rgba(255,255,255,0.18);color:#fff;width:56px;height:56px;margin-bottom:18px"><span class="ico" style="font-size:26px">${SVC_ICON[s.slug]||SVG.building}</span></div>
    <span class="eyebrow" style="color:#93B4FF">Service</span>
    <h1>${s.headline}</h1>
    <p>${s.intro}</p>
    <div class="subhero-btns">
      <a href="mailto:info@gccstartup.com?subject=${encodeURIComponent(s.name+' enquiry')}" class="btn btn-fill btn-arrow">Enquire about ${s.name}</a>
      <a href="https://wa.me/gccstartup?text=${encodeURIComponent(waMsg)}" class="btn btn-stroke">WhatsApp us</a>
    </div>
    <div class="subhero-meta">
      ${s.meta.map(m=>`<div><span class="smi-n">${m[0]}</span><span class="smi-l">${m[1]}</span></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-header reveal">
      <span class="eyebrow">What’s included</span>
      <h2>Everything in our ${s.name} service.</h2>
      <p>Clear scope, fixed pricing, founder-led delivery.</p>
    </div>
    <div class="pd-feature-grid reveal">
      ${s.features.map(f=>`<div class="pd-feature"><h4><span class="pdf-ic">✓</span>${f[0]}</h4><p>${f[1]}</p></div>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="wrap">
    <div class="section-header reveal">
      <span class="eyebrow">How it works</span>
      <h2>A clear, guided process.</h2>
    </div>
    <div class="process-grid">
      ${procSteps(s.process)}
    </div>
    <div style="margin-top:36px">
      <div class="midcta reveal">
        <div><h3>Want this handled for you?</h3><p>Get a fixed, all-in quote with no hidden fees — usually within a few hours.</p></div>
        <a href="mailto:info@gccstartup.com?subject=${encodeURIComponent(s.name+' quote')}" class="btn btn-fill btn-arrow">Get my fixed quote</a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap" style="text-align:center">
    <div class="section-header center reveal" style="margin-bottom:28px">
      <span class="eyebrow">Next step</span>
      <h2>Related options</h2>
    </div>
    <div class="reveal" style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${s.related}</div>
  </div>
</section>

${faqBlock(`${s.name} questions, answered.`, s.faq, waMsg)}

${footer(waMsg)}`;
}

// ── Export the content data so the CMS seed can reuse it (no duplication) ──
module.exports = { countries, tiers, services };

// ── Write the static pages only when run directly (`node build_pages.js`) ──
if (require.main === module) {
  let written=[];
  countries.forEach(c=>{ fs.writeFileSync(path.join(ROOT,c.file), countryPage(c)); written.push(c.file); });
  tiers.forEach(t=>{ fs.writeFileSync(path.join(ROOT,t.file), pricingPage(t)); written.push(t.file); });
  services.forEach(s=>{ fs.writeFileSync(path.join(ROOT,s.file), servicePage(s)); written.push(s.file); });
  console.log('Generated '+written.length+' pages:\n'+written.join('\n'));
}
