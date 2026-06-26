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
            <a href="service-company-registration.html">Company Registration</a>
            <a href="service-bank-account.html">Bank Account Setup</a>
            <a href="service-nominee-ubo.html">Nominee UBO Service</a>
            <a href="service-shelf-company.html">Shelf Companies</a>
            <a href="service-tax-residency.html">Tax Residency</a>
            <a href="service-annual-renewals.html">Annual Renewals</a>
          </div>
        </div>
        <div class="nav-item">
          <a href="#jur">Jurisdictions <span class="nav-caret">▼</span></a>
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
          <a href="#tiers">Pricing <span class="nav-caret">▼</span></a>
          <div class="nav-dd">
            <a href="pricing-self-ubo.html">Self as UBO</a>
            <a href="pricing-nominee-ubo.html">Nominee UBO</a>
            <a href="pricing-shelf-company.html">Shelf Company</a>
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
      <a href="service-company-registration.html" onclick="closeNav()">Company Registration</a>
      <a href="service-bank-account.html" onclick="closeNav()">Bank Account Setup</a>
      <a href="service-nominee-ubo.html" onclick="closeNav()">Nominee UBO Service</a>
      <a href="service-shelf-company.html" onclick="closeNav()">Shelf Companies</a>
      <a href="service-tax-residency.html" onclick="closeNav()">Tax Residency</a>
      <a href="service-annual-renewals.html" onclick="closeNav()">Annual Renewals</a>
    </div>
    <button class="drawer-group" onclick="toggleGroup(this)">Jurisdictions <span class="dg-ic">+</span></button>
    <div class="drawer-sub">
      <a href="country-uae.html" onclick="closeNav()">🇦🇪 UAE</a>
      <a href="country-bahrain.html" onclick="closeNav()">🇧🇭 Bahrain</a>
      <a href="country-hongkong.html" onclick="closeNav()">🇭🇰 Hong Kong</a>
      <a href="country-singapore.html" onclick="closeNav()">🇸🇬 Singapore</a>
      <a href="country-ireland.html" onclick="closeNav()">🇮🇪 Ireland</a>
      <a href="country-bvi-cayman.html" onclick="closeNav()">🌴 BVI &amp; Cayman</a>
    </div>
    <button class="drawer-group" onclick="toggleGroup(this)">Pricing <span class="dg-ic">+</span></button>
    <div class="drawer-sub">
      <a href="pricing-self-ubo.html" onclick="closeNav()">Self as UBO</a>
      <a href="pricing-nominee-ubo.html" onclick="closeNav()">Nominee UBO</a>
      <a href="pricing-shelf-company.html" onclick="closeNav()">Shelf Company</a>
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
      </body>
    </html>
  );
}
