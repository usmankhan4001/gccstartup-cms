import './globals.css';
import { LivePreviewListener } from '@/components/LivePreviewListener';

export const metadata = { title: 'GCC Startup', description: 'Company Registration & Tax Optimization' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LivePreviewListener />
        <div dangerouslySetInnerHTML={{ __html: `<div class="topbar">
  <div class="wrap">
    <div class="topbar-left">
      <a href="mailto:info@gccstartup.com">info@gccstartup.com</a>
      <a href="https://wa.me/gccstartup">WhatsApp Consultation</a>
    </div>
    <div class="topbar-right">
      <a href="#resources">Free Guides</a>
      <a href="#jur">Jurisdictions</a>
      <a href="#tiers" class="pill">Get Started</a>
    </div>
  </div>
</div>` }} />
        <div dangerouslySetInnerHTML={{ __html: `<nav class="site-nav" id="nav">
  <div class="wrap">
    <div class="nav-inner">
      <a href="#" class="nav-logo">
        <img src="GCC_Startup_Logo.png" alt="GCC Startup"
          onerror="this.style.display='none';document.getElementById('logoText').style.display='block'">
        <div id="logoText" class="nav-logo-text" style="display:none">GCC <span>Startup</span></div>
      </a>
      <nav class="nav-menu">
        <div class="nav-item">
          <a href="#services">Services <span class="nav-caret">▼</span></a>
          <div class="nav-dd">
            <a href="/services/company-registration">Company Registration</a>
            <a href="/services/bank-account">Bank Account Setup</a>
            <a href="/services/nominee-ubo">Nominee UBO Service</a>
            <a href="/services/shelf-company">Shelf Companies</a>
            <a href="/services/tax-residency">Tax Residency</a>
            <a href="/services/annual-renewals">Annual Renewals</a>
          </div>
        </div>
        <div class="nav-item">
          <a href="#jur">Jurisdictions <span class="nav-caret">▼</span></a>
          <div class="nav-dd">
            <a href="/uae"><span class="dd-flag">🇦🇪</span> UAE</a>
            <a href="/bahrain"><span class="dd-flag">🇧🇭</span> Bahrain</a>
            <a href="/hongkong"><span class="dd-flag">🇭🇰</span> Hong Kong</a>
            <a href="/singapore"><span class="dd-flag">🇸🇬</span> Singapore</a>
            <a href="/ireland"><span class="dd-flag">🇮🇪</span> Ireland</a>
            <a href="/bvi-cayman"><span class="dd-flag">🌴</span> BVI &amp; Cayman</a>
          </div>
        </div>
        <div class="nav-item">
          <a href="#tiers">Pricing <span class="nav-caret">▼</span></a>
          <div class="nav-dd">
            <a href="/pricing/self-ubo">Self as UBO</a>
            <a href="/pricing/nominee-ubo">Nominee UBO</a>
            <a href="/pricing/shelf-company">Shelf Company</a>
          </div>
        </div>
        <a href="#tools">Free Tools</a>
        <a href="#resources">Free Guides</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div class="nav-right">
        <a href="https://wa.me/gccstartup" class="btn btn-ghost">WhatsApp</a>
        <a href="mailto:info@gccstartup.com?subject=Free Consultation" class="btn btn-fill">Book a Call</a>
        <button class="nav-burger" id="burger" onclick="toggleNav()" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </div>
  <div class="nav-drawer" id="drawer">
    <button class="drawer-group" onclick="toggleGroup(this)">Services <span class="dg-ic">+</span></button>
    <div class="drawer-sub">
      <a href="/services/company-registration" onclick="closeNav()">Company Registration</a>
      <a href="/services/bank-account" onclick="closeNav()">Bank Account Setup</a>
      <a href="/services/nominee-ubo" onclick="closeNav()">Nominee UBO Service</a>
      <a href="/services/shelf-company" onclick="closeNav()">Shelf Companies</a>
      <a href="/services/tax-residency" onclick="closeNav()">Tax Residency</a>
      <a href="/services/annual-renewals" onclick="closeNav()">Annual Renewals</a>
    </div>
    <button class="drawer-group" onclick="toggleGroup(this)">Jurisdictions <span class="dg-ic">+</span></button>
    <div class="drawer-sub">
      <a href="/uae" onclick="closeNav()">🇦🇪 UAE</a>
      <a href="/bahrain" onclick="closeNav()">🇧🇭 Bahrain</a>
      <a href="/hongkong" onclick="closeNav()">🇭🇰 Hong Kong</a>
      <a href="/singapore" onclick="closeNav()">🇸🇬 Singapore</a>
      <a href="/ireland" onclick="closeNav()">🇮🇪 Ireland</a>
      <a href="/bvi-cayman" onclick="closeNav()">🌴 BVI &amp; Cayman</a>
    </div>
    <button class="drawer-group" onclick="toggleGroup(this)">Pricing <span class="dg-ic">+</span></button>
    <div class="drawer-sub">
      <a href="/pricing/self-ubo" onclick="closeNav()">Self as UBO</a>
      <a href="/pricing/nominee-ubo" onclick="closeNav()">Nominee UBO</a>
      <a href="/pricing/shelf-company" onclick="closeNav()">Shelf Company</a>
    </div>
    <a href="#tools" onclick="closeNav()" class="drawer-link">Free Tools</a>
    <a href="#resources" onclick="closeNav()" class="drawer-link">Free Guides</a>
    <a href="#faq" onclick="closeNav()" class="drawer-link">FAQ</a>
    <a href="mailto:info@gccstartup.com?subject=Free Consultation" class="btn btn-fill" onclick="closeNav()">Book a Free Consultation</a>
  </div>
</nav>` }} />
        <main>{children}</main>
        <div dangerouslySetInnerHTML={{ __html: `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="GCC_Startup_Logo.png" alt="GCC Startup"
          onerror="this.style.display='none';document.getElementById('ftLogo').style.display='block'">
        <div id="ftLogo" class="footer-brand-name" style="display:none">GCC <span>Startup</span></div>
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
          <li><a href="/services/company-registration">Company Registration</a></li>
          <li><a href="/services/bank-account">Bank Account Setup</a></li>
          <li><a href="/services/nominee-ubo">Nominee UBO Service</a></li>
          <li><a href="/services/shelf-company">Shelf Companies</a></li>
          <li><a href="/services/tax-residency">Tax Residency</a></li>
          <li><a href="/services/annual-renewals">Annual Renewals</a></li>
        </ul>
        <h5 style="margin-top:22px">Pricing</h5>
        <ul class="footer-links">
          <li><a href="/pricing/self-ubo">Self as UBO</a></li>
          <li><a href="/pricing/nominee-ubo">Nominee UBO</a></li>
          <li><a href="/pricing/shelf-company">Shelf Company</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Jurisdictions</h5>
        <ul class="footer-links">
          <li><a href="/uae">UAE</a></li>
          <li><a href="/bahrain">Bahrain</a></li>
          <li><a href="/hongkong">Hong Kong</a></li>
          <li><a href="/singapore">Singapore</a></li>
          <li><a href="/ireland">Ireland</a></li>
          <li><a href="/bvi-cayman">BVI &amp; Cayman</a></li>
        </ul>
      </div>
      <div class="footer-nl">
        <h5>Free Tax Guide</h5>
        <p>47-page guide on legal tax optimization across 15+ jurisdictions.</p>
        <div class="nl-row">
          <input type="email" placeholder="Your email address">
          <button type="button" onclick="openForm('Free 2026 tax guide')">Get guide</button>
        </div>
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

<!-- ─── EXIT-INTENT POPUP ─── -->
<div class="exit-overlay" id="exitOverlay">
  <div class="exit-modal">
    <button class="exit-close" onclick="closeExit()" aria-label="Close">✕</button>
    <div class="exit-modal-head">
      <span class="eyebrow">Before you go</span>
      <h3>Get the free 2026 GCC Business Setup Playbook</h3>
    </div>
    <div class="exit-modal-body">
      <p>18 pages, country by country: cost, timeline, visa benefits, tax rules, and who each jurisdiction is best for. Free — no obligation.</p>
      <input type="email" id="exitEmail" placeholder="Your email address">
      <a href="mailto:info@gccstartup.com?subject=Send me the 2026 GCC Playbook" class="btn btn-fill btn-arrow" onclick="closeExit()">Email me the free guide</a>
    </div>
  </div>
</div>` }} />
        <script dangerouslySetInnerHTML={{ __html: `
// NAV
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('shadow', scrollY > 50));
}
function toggleNav() {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  if (burger) burger.classList.toggle('open');
  if (drawer) drawer.classList.toggle('open');
}
function closeNav() {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  if (burger) burger.classList.remove('open');
  if (drawer) drawer.classList.remove('open');
}
function toggleGroup(btn) {
  const sub = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  // accordion: close others
  document.querySelectorAll('.drawer-group').forEach(g => g.classList.remove('open'));
  document.querySelectorAll('.drawer-sub').forEach(s => s.classList.remove('open'));
  if (!isOpen && sub) { btn.classList.add('open'); sub.classList.add('open'); }
}

// REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
}, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// FAQ
function faqToggle(el) {
  const ans = el.nextElementSibling, open = ans.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));
  if (!open && ans) { ans.classList.add('open'); el.classList.add('open'); }
}

// JURISDICTION TABS
function jurFilter(region, tab) {
  document.querySelectorAll('.jur-tab').forEach(t => t.classList.remove('on'));
  tab.classList.add('on');
  document.querySelectorAll('.jur-card').forEach(c => {
    c.style.display = (region === 'all' || c.dataset.r === region) ? '' : 'none';
  });
}

// QUIZ
const qData = {};
function qPick(el, val, step) {
  el.closest('.quiz-opts').querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('on'));
  el.classList.add('on');
  qData[step] = val;
  const nb = document.getElementById('qn' + step.replace('qs',''));
  if (nb) nb.style.display = 'inline-flex';
}
function qGo(n) {
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('on'));
  const s = document.getElementById('qs' + n);
  if (s) s.classList.add('on');
  const qProg = document.getElementById('qProg');
  const qStep = document.getElementById('qStep');
  if (qProg) qProg.style.width = (n / 4 * 100) + '%';
  if (qStep) qStep.textContent = 'Step ' + n + ' of 4';
}
function qShow() {
  document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('on'));
  const qProg = document.getElementById('qProg');
  const qStep = document.getElementById('qStep');
  const qResult = document.getElementById('qResult');
  if (qProg) qProg.style.width = '100%';
  if (qStep) qStep.textContent = 'Your result';
  if (qResult) qResult.classList.add('on');
  const g = qData['qs1'], i = qData['qs2'], t = qData['qs3'];
  let flag = '🇭🇰', name = 'Hong Kong', rate = '0% tax on foreign income';
  let why = 'The ideal structure for digital income earners who want fast, fully remote setup with fintech banking and full corporate privacy through a Nominee UBO.';
  let tags = ['Remote setup', '17–18 days', 'Fintech banking', 'Nominee UBO available'];
  if (g === 'relocate' || t === 'visit') {
    flag = '🇦🇪'; name = 'UAE Free Zone'; rate = '9% tax / 0% on foreign income';
    why = 'Full personal tax residency, Emirates ID, family visas, and top-tier local banking. The complete package for entrepreneurs relocating to the Gulf.';
    tags = ['Tax residency', 'Emirates ID', 'Local banking', '~30 days'];
  } else if (g === 'privacy') {
    flag = '🇭🇰'; name = 'Hong Kong + Nominee UBO'; rate = '0% + full privacy';
    why = 'Maximum privacy via our Nominee UBO service combined with a Hong Kong entity. You retain complete operational control while remaining entirely off the public record.';
    tags = ['Full privacy', 'Nominee UBO', 'Remote setup', '0% tax'];
  } else if (i === 'biz') {
    flag = '🇸🇬'; name = 'Singapore'; rate = '5% corporate tax';
    why = 'Strong ASEAN credibility with nominee director included. The preferred structure for established businesses targeting Asian markets.';
    tags = ['ASEAN hub', 'Nominee director', 'Remote setup'];
  } else if (g === 'tax' && (i === 'ecom' || i === 'invest')) {
    flag = '🇧🇭'; name = 'Bahrain'; rate = '0% corporate income tax';
    why = 'The most tax-efficient jurisdiction in the Gulf. 0% corporate income tax with credible local banking and personal tax residency options.';
    tags = ['0% tax', 'Gulf banking', 'Tax residency'];
  }
  const qrFlag = document.getElementById('qrFlag');
  const qrName = document.getElementById('qrName');
  const qrRate = document.getElementById('qrRate');
  const qrWhy = document.getElementById('qrWhy');
  const qrTags = document.getElementById('qrTags');
  if (qrFlag) qrFlag.textContent = flag;
  if (qrName) qrName.textContent = name;
  if (qrRate) qrRate.textContent = rate;
  if (qrWhy) qrWhy.textContent = why;
  if (qrTags) qrTags.innerHTML = tags.map(t => '<span class="qr-tag">' + t + '</span>').join('');
}
function qRestart() {
  const qResult = document.getElementById('qResult');
  if (qResult) qResult.classList.remove('on');
  document.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('on'));
  document.querySelectorAll('[id^="qn"]').forEach(b => b.style.display = 'none');
  Object.keys(qData).forEach(k => delete qData[k]);
  qGo(1);
}

// DYNAMIC YEAR
document.querySelectorAll('.cur-year').forEach(e => e.textContent = new Date().getFullYear());

// ─── LEAD FORM MODAL — all CTAs open this ───
const LEAD_ENDPOINT = '/api/lead'; // e.g. 'https://cms.gccstartup.com/api/lead' — your Payload lead endpoint (Twenty + WAHA fire server-side)
function openForm(ctx){
  var o=document.getElementById('leadOverlay');
  if (!o) return;
  document.getElementById('leadForm').style.display='';
  document.getElementById('leadSuccess').classList.remove('on');
  var c=document.getElementById('leadCtx');
  if(ctx){ document.getElementById('leadSource').value=ctx; if (c) c.textContent=ctx+' — a specialist replies within 24 hours.'; mapInterest(ctx); }
  else { document.getElementById('leadSource').value=location.pathname; if (c) c.textContent='A specialist replies within 24 hours. No obligation.'; }
  o.classList.add('show'); document.body.style.overflow='hidden';
}
function closeForm(){ 
  var o = document.getElementById('leadOverlay');
  if (o) o.classList.remove('show'); 
  document.body.style.overflow=''; 
}
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
    if(s) return decodeURIComponent(s[1].replace(/\+/g,' '));
    if(t) return decodeURIComponent(t[1].replace(/\+/g,' '));
    return ''; }
  document.querySelectorAll('a[href^="mailto:"], a[href*="wa.me"], a[href*="whatsapp"]').forEach(function(a){
    a.addEventListener('click',function(e){ e.preventDefault(); openForm(ctxOf(a.getAttribute('href')||'')); });
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeForm(); });
})();

// STICKY BAR
let barDismissed = false;
const bar = document.getElementById('stickyBar');
window.addEventListener('scroll', () => {
  if (!bar || barDismissed) return;
  bar.classList.toggle('show', scrollY / (document.body.scrollHeight - innerHeight) > 0.2);
});
function dismissBar() {
  barDismissed = true;
  if (bar) {
    bar.classList.remove('show');
    bar.style.display = 'none';
  }
}

// ─── COST ESTIMATOR ───
const estData = {
  uae:       { name:'UAE',          base:[1500,2200], time:'~30 days incl. visit' },
  bahrain:   { name:'Bahrain',      base:[1500,2000], time:'~30 days incl. visit' },
  hongkong:  { name:'Hong Kong',    base:[2000,2600], time:'17–18 days, remote'   },
  singapore: { name:'Singapore',    base:[2000,2800], time:'17–18 days, remote'   },
  ireland:   { name:'Ireland',      base:[1500,2200], time:'2–3 days, remote'      },
  bvi:       { name:'BVI & Cayman', base:[2500,4000], time:'Varies by structure'  },
};
const tierAdd = { self:[0,0], nominee:[750,1100], shelf:[0,300] };
const tierName = { self:'Self as UBO', nominee:'Nominee UBO', shelf:'Shelf company' };
function estCalc() {
  const estCountry = document.getElementById('estCountry');
  if (!estCountry) return;
  const c = estData[estCountry.value];
  const t = tierAdd[document.getElementById('estTier').value];
  const tierKey = document.getElementById('estTier').value;
  const banks = parseInt(document.getElementById('estBank').value, 10);
  const res = document.getElementById('estRes').value === 'yes' ? 1000 : 0;
  let lo = c.base[0] + t[0] + banks * 500 + res;
  let hi = c.base[1] + t[1] + banks * 500 + res;
  const estCost = document.getElementById('estCost');
  const estMeta = document.getElementById('estMeta');
  if (estCost) estCost.textContent = '$' + lo.toLocaleString() + ' – $' + hi.toLocaleString();
  if (estMeta) estMeta.textContent = c.name + ' · ' + tierName[tierKey] + ' · Timeline ' + c.time;
}
if (document.getElementById('estCountry')) {
  estCalc();
}

// ─── COUNTRY COMPARISON ───
const cmpData = {
  uae:       { flag:'🇦🇪', name:'UAE',          tax:'9% / 0% foreign', time:'~30 days', bank:'Local + fintech', own:'100% foreign', res:'Yes — Emirates ID', from:'$1,500' },
  bahrain:   { flag:'🇧🇭', name:'Bahrain',      tax:'0% corporate',    time:'~30 days', bank:'Credible local',  own:'100% foreign', res:'Yes',             from:'$1,500' },
  hongkong:  { flag:'🇭🇰', name:'Hong Kong',    tax:'0% on foreign',   time:'17–18 days', bank:'Fintech (remote)', own:'100% foreign', res:'No',            from:'$2,000' },
  singapore: { flag:'🇸🇬', name:'Singapore',    tax:'5% corporate',    time:'17–18 days', bank:'Strong local',  own:'Nominee dir. inc.', res:'No',          from:'$2,000' },
  ireland:   { flag:'🇮🇪', name:'Ireland',      tax:'12.5% corporate', time:'2–3 days', bank:'EU banking',     own:'100% foreign', res:'No',              from:'$1,500' },
  bvi:       { flag:'🌴', name:'BVI & Cayman',  tax:'0% · private',    time:'Varies',   bank:'Offshore',       own:'100% foreign', res:'No',              from:'Custom' },
};
const cmpRows = [['Corporate tax','tax'],['Setup timeline','time'],['Banking','bank'],['Ownership','own'],['Tax residency','res'],['Starting from','from']];
function cmpRender() {
  const cmpA = document.getElementById('cmpA');
  if (!cmpA) return;
  const a = cmpData[cmpA.value];
  const b = cmpData[document.getElementById('cmpB').value];
  let html = '<div class="ct-rowlabel" style="background:var(--white)"></div>';
  html += '<div class="ct-head">' + a.flag + ' ' + a.name + '</div>';
  html += '<div class="ct-head">' + b.flag + ' ' + b.name + '</div>';
  cmpRows.forEach(([label,key]) => {
    html += '<div class="ct-rowlabel">' + label + '</div>';
    html += '<div class="ct-val">' + a[key] + '</div>';
    html += '<div class="ct-val">' + b[key] + '</div>';
  });
  const cmpTable = document.getElementById('cmpTable');
  if (cmpTable) cmpTable.innerHTML = html;
}
if (document.getElementById('cmpA')) {
  cmpRender();
}

// ─── EXIT-INTENT POPUP ───
let exitShown = false;
function closeExit() { 
  const exitOverlay = document.getElementById('exitOverlay');
  if (exitOverlay) exitOverlay.classList.remove('show'); 
}
if (!sessionStorage.getItem('exitSeen')) {
  document.addEventListener('mouseout', e => {
    if (exitShown) return;
    if (e.clientY <= 0 && !e.relatedTarget) {
      exitShown = true;
      sessionStorage.setItem('exitSeen', '1');
      const exitOverlay = document.getElementById('exitOverlay');
      if (exitOverlay) exitOverlay.classList.add('show');
    }
  });
}
const exitOverlay = document.getElementById('exitOverlay');
if (exitOverlay) {
  exitOverlay.addEventListener('click', e => {
    if (e.target.id === 'exitOverlay') closeExit();
  });
}

// Global binds for inline event handlers
window.toggleNav = toggleNav;
window.closeNav = closeNav;
window.toggleGroup = toggleGroup;
window.faqToggle = faqToggle;
window.jurFilter = jurFilter;
window.qPick = qPick;
window.qGo = qGo;
window.qShow = qShow;
window.qRestart = qRestart;
window.openForm = openForm;
window.closeForm = closeForm;
window.submitLead = submitLead;
window.dismissBar = dismissBar;
window.estCalc = estCalc;
window.cmpRender = cmpRender;
window.closeExit = closeExit;
` }} />
      </body>
    </html>
  );
}
