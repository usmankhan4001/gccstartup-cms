export function partnerPageHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Join the Global Verification Network | GCCstartup Partners</title>
<meta name="description" content="Earn $100 USD per completed corporate verification. Join GCCstartup as an independent remote director or representative in the Philippines. Secure, 100% remote, and free to join."/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',system-ui,sans-serif;background:#fff;color:#111;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}

/* ── NAV ── */
.nav{background:#fff;border-bottom:1px solid #f0f0f0;padding:0 24px;position:sticky;top:0;z-index:100}
.nav-inner{max-width:1100px;margin:0 auto;height:60px;display:flex;align-items:center;justify-content:space-between}
.nav-logo{font-size:15px;font-weight:800;color:#111;letter-spacing:-.3px}
.nav-logo span{color:#F26522}
.nav-cta{background:#F26522;color:#fff;font-size:13px;font-weight:700;padding:8px 18px;border-radius:4px;transition:background .15s}
.nav-cta:hover{background:#d9561e}

/* ── HERO ── */
.hero{background:#fff;padding:72px 24px 64px;text-align:center}
.hero-inner{max-width:760px;margin:0 auto}
.hero-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:#fff8f5;border:1.5px solid #F26522;
  color:#F26522;font-size:12px;font-weight:700;
  letter-spacing:.08em;text-transform:uppercase;
  padding:7px 16px;border-radius:20px;margin-bottom:28px;
}
.hero-badge::before{content:'';width:8px;height:8px;border-radius:50%;background:#F26522;animation:blink 1.5s infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.hero h1{font-size:clamp(32px,6vw,60px);font-weight:900;line-height:1.06;letter-spacing:-1.5px;color:#111;margin-bottom:20px}
.hero h1 em{font-style:normal;color:#F26522}
.hero-sub{font-size:clamp(15px,2vw,18px);color:#666;line-height:1.7;margin-bottom:36px}
.hero-btn{
  display:inline-flex;align-items:center;gap:10px;
  background:#F26522;color:#fff;
  font-size:17px;font-weight:800;padding:17px 40px;
  border-radius:4px;border:none;cursor:pointer;font-family:inherit;
  box-shadow:0 4px 24px rgba(242,101,34,.4);
  transition:transform .15s,box-shadow .15s;
  text-decoration:none;
}
.hero-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(242,101,34,.5)}
.hero-fine{color:#bbb;font-size:13px;margin-top:14px}

/* ── STATS BAR ── */
.stats{background:#F26522;padding:28px 24px}
.stats-inner{max-width:900px;margin:0 auto;display:flex;justify-content:center;gap:0;flex-wrap:wrap}
.stat{padding:8px 40px;border-right:1px solid rgba(255,255,255,.25);text-align:center}
.stat:last-child{border-right:none}
.stat-n{color:#fff;font-size:32px;font-weight:900;line-height:1;letter-spacing:-1px}
.stat-l{color:rgba(255,255,255,.75);font-size:12px;margin-top:4px;font-weight:600;letter-spacing:.04em}
@media(max-width:600px){.stat{padding:10px 20px;border-right:none;}}

/* ── HOW IT WORKS ── */
.how{background:#fff;padding:72px 24px}
.section-label{display:inline-block;background:#F26522;color:#fff;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:5px 14px;border-radius:2px;margin-bottom:16px}
.section-h{font-size:clamp(26px,4vw,40px);font-weight:900;line-height:1.1;letter-spacing:-.5px;margin-bottom:8px;color:#111}
.section-p{color:#888;font-size:16px;line-height:1.65;margin-bottom:48px}
.how-inner{max-width:960px;margin:0 auto}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
@media(max-width:700px){.steps{grid-template-columns:1fr;gap:20px}}
.step{background:#fff;border:2px solid #f0f0f0;border-radius:8px;padding:32px 28px;position:relative}
.step:hover{border-color:#F26522;transition:border-color .2s}
.step-num{
  width:44px;height:44px;border-radius:50%;
  background:#F26522;color:#fff;
  font-size:18px;font-weight:900;
  display:flex;align-items:center;justify-content:center;
  margin-bottom:20px;
}
.step h3{font-size:17px;font-weight:800;color:#111;margin-bottom:10px}
.step p{font-size:14px;color:#777;line-height:1.65}

/* ── FORM SECTION ── */
.apply{background:#F26522;padding:72px 24px}
.apply-inner{max-width:700px;margin:0 auto}
.apply-label{display:inline-block;background:#fff;color:#F26522;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:5px 14px;border-radius:2px;margin-bottom:16px}
.apply h2{font-size:clamp(26px,4vw,38px);font-weight:900;line-height:1.1;letter-spacing:-.5px;margin-bottom:8px;color:#fff}
.apply-sub{color:rgba(255,255,255,.8);font-size:15px;line-height:1.65;margin-bottom:36px}

.form-card{background:#fff;border-radius:8px;padding:40px 36px}
@media(max-width:540px){.form-card{padding:28px 20px}}
.field{margin-bottom:16px}
.field label{display:block;font-size:11px;font-weight:700;color:#888;margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em}
.field input{
  width:100%;background:#f7f7f7;border:1.5px solid #eee;
  border-radius:6px;color:#111;font-size:15px;
  padding:12px 14px;outline:none;font-family:inherit;
  transition:border-color .15s,background .15s;
}
.field input:focus{border-color:#F26522;background:#fff}
.field input::placeholder{color:#ccc}
.field-help{font-size:12px;color:#aaa;margin-top:5px;line-height:1.5}

/* Checkbox */
.check-field{display:flex;align-items:flex-start;gap:12px;margin-bottom:14px;cursor:pointer}
.check-field input[type=checkbox]{
  width:18px;height:18px;flex-shrink:0;margin-top:2px;
  accent-color:#F26522;cursor:pointer;
}
.check-field-text{}
.check-field-label{font-size:14px;font-weight:600;color:#111;line-height:1.4}
.check-field-help{font-size:12px;color:#aaa;margin-top:3px;line-height:1.5}

.checks-wrap{background:#f7f7f7;border-radius:6px;padding:20px;margin-bottom:20px}
.checks-title{font-size:12px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px}

.submit-btn{
  width:100%;background:#F26522;color:#fff;
  font-size:16px;font-weight:800;padding:16px;
  border:none;border-radius:6px;cursor:pointer;
  font-family:inherit;transition:background .15s,transform .15s;
  display:flex;align-items:center;justify-content:center;gap:8px;
  box-shadow:0 4px 20px rgba(242,101,34,.35);
  position:relative;overflow:hidden;
}
.submit-btn:hover{background:#d9561e;transform:translateY(-1px)}
.submit-btn:disabled{background:#ddd;cursor:not-allowed;transform:none;box-shadow:none}
.form-note{font-size:12px;color:#bbb;text-align:center;margin-top:12px;line-height:1.5}
.form-err{font-size:13px;color:#c0392b;margin-top:10px;text-align:center;display:none}
.form-err.show{display:block}

/* Success */
.success-card{display:none;text-align:center;padding:48px 24px}
.success-card.show{display:block}
.success-icon{width:68px;height:68px;border-radius:50%;background:#F26522;color:#fff;display:flex;align-items:center;justify-content:center;font-size:30px;margin:0 auto 20px}
.success-card h3{font-size:22px;font-weight:900;color:#111;margin-bottom:10px}
.success-card p{font-size:14px;color:#777;line-height:1.7}
.success-steps{background:#fff8f5;border:1.5px solid #ffe8da;border-radius:6px;padding:20px;margin-top:20px;text-align:left}
.success-steps h4{font-size:12px;font-weight:800;color:#F26522;text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px}
.success-steps ul{list-style:none;display:flex;flex-direction:column;gap:10px}
.success-steps li{font-size:13px;color:#555;display:flex;align-items:flex-start;gap:8px;line-height:1.5}
.success-steps li::before{content:'✓';color:#F26522;font-weight:900;flex-shrink:0}

/* ── FAQ ── */
.faq{background:#fff;padding:72px 24px}
.faq-inner{max-width:760px;margin:0 auto}
.faq-list{display:flex;flex-direction:column;gap:0;margin-top:40px}
.faq-item{border-bottom:1px solid #f0f0f0}
.faq-q{
  width:100%;background:none;border:none;
  text-align:left;padding:20px 0;
  font-family:inherit;font-size:16px;font-weight:700;color:#111;
  cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;
}
.faq-q:hover{color:#F26522}
.faq-icon{color:#F26522;font-size:22px;font-weight:300;flex-shrink:0;transition:transform .2s}
.faq-item.open .faq-icon{transform:rotate(45deg)}
.faq-a{font-size:14px;color:#777;line-height:1.75;padding-bottom:20px;display:none}
.faq-item.open .faq-a{display:block}

/* ── FOOTER ── */
.footer{background:#111;padding:36px 24px;text-align:center}
.footer p{color:#555;font-size:13px;line-height:1.7}
.footer a{color:#F26522}

@media(max-width:540px){
  .hero{padding:48px 20px 40px}
  .how,.faq{padding:48px 20px}
  .apply{padding:48px 20px}
}
</style>
</head>
<body>

<!-- NAV -->
<nav class="nav">
  <div class="nav-inner">
    <a class="nav-logo" href="https://gccstartup.com">GCC<span>Startup</span></a>
    <a class="nav-cta" href="#apply">Apply Now →</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-badge">Now Accepting Remote Verification Partners in the Philippines</div>
    <h1>Earn <em>$100 USD</em> per Completed Corporate Verification.</h1>
    <p class="hero-sub">Become an independent remote director or entity representative for international companies entering global markets. 100% remote, zero upfront fees, and guaranteed milestone-based payouts.</p>
    <a class="hero-btn" href="#apply">Check Your Eligibility ↓</a>
    <p class="hero-fine">Takes less than 60 seconds. No identity documents required to apply today.</p>
  </div>
</section>

<!-- STATS -->
<div class="stats">
  <div class="stats-inner">
    <div class="stat"><div class="stat-n">$100</div><div class="stat-l">Per verification</div></div>
    <div class="stat"><div class="stat-n">100%</div><div class="stat-l">Remote work</div></div>
    <div class="stat"><div class="stat-n">0</div><div class="stat-l">Upfront fees</div></div>
    <div class="stat"><div class="stat-n">500+</div><div class="stat-l">Global clients</div></div>
  </div>
</div>

<!-- HOW IT WORKS -->
<section class="how">
  <div class="how-inner">
    <span class="section-label">How It Works</span>
    <h2 class="section-h">3 Simple Steps to Your First Payout</h2>
    <p class="section-p">No experience required. No upfront costs. Just follow the process.</p>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <h3>Submit Eligibility</h3>
        <p>Fill out our quick 1-minute basic registration form below. We only require your contact details and asset readiness to start — no sensitive ID uploads or documents are needed at this stage.</p>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <h3>WhatsApp Orientation</h3>
        <p>When an international corporate client matches your profile, our automation engine will reach out to you directly on WhatsApp. You will receive a short, step-by-step instructional video detailing the specific assignment.</p>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <h3>Verify &amp; Get Paid</h3>
        <p>Complete the secure identity verification (KYC) checkpoint for the assigned entity. Once the milestone is successfully achieved, your $100 USD payout is instantly released to your account.</p>
      </div>
    </div>
  </div>
</section>

<!-- FORM -->
<section class="apply" id="apply">
  <div class="apply-inner">
    <span class="apply-label">Secure Application</span>
    <h2>Apply for the Network</h2>
    <p class="apply-sub">Complete this basic screening form to log your profile into our backend matching database.</p>

    <div class="form-card" id="partnerFormCard">
      <form id="partnerForm" onsubmit="return partnerSubmit(event)">

        <div class="field">
          <label>Full Legal Name *</label>
          <input name="fullName" required placeholder="Enter your first and last name exactly as they appear on your official government documents"/>
          <p class="field-help">This ensures your profile matches corporate registry requirements during client lookup.</p>
        </div>

        <div class="field">
          <label>WhatsApp Number *</label>
          <input name="whatsapp" required placeholder="+63 917 123 4567" value="+63 "/>
          <p class="field-help">Essential for system communication. Our automation engine will use this number to send your instructional videos.</p>
        </div>

        <div class="field">
          <label>Current City / Region</label>
          <input name="city" placeholder="e.g. Metro Manila, Cebu City, Davao City"/>
        </div>

        <div class="checks-wrap">
          <p class="checks-title">Pre-Qualification</p>
          <label class="check-field">
            <input type="checkbox" name="hasPassport" id="chkPassport"/>
            <div class="check-field-text">
              <div class="check-field-label">I possess a valid, unexpired international passport.</div>
              <div class="check-field-help">Many international corporate structures require a passport for standard verification processes.</div>
            </div>
          </label>
          <label class="check-field">
            <input type="checkbox" name="hasBankAccount" id="chkBank"/>
            <div class="check-field-text">
              <div class="check-field-label">I hold an active personal bank account registered in my legal name.</div>
              <div class="check-field-help">Required to successfully process your milestone payouts.</div>
            </div>
          </label>
        </div>

        <input type="hidden" name="page" id="partnerPage"/>

        <button type="submit" class="submit-btn" id="partnerBtn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          Submit Secure Application →
        </button>
        <div class="form-err" id="partnerErr">Something went wrong — please try again or WhatsApp us directly.</div>
        <p class="form-note">🔒 Your data is stored securely. No spam. No fees. Ever.</p>
      </form>

      <div class="success-card" id="partnerSuccess">
        <div style="display:flex;justify-content:center">
          <div class="success-icon">✓</div>
        </div>
        <h3>Application Securely Logged!</h3>
        <p>Thank you. Your profile has been successfully added to the GCCstartup backend database as a Priority Tier Partner.</p>
        <div class="success-steps">
          <h4>Next Steps</h4>
          <ul>
            <li>Keep an eye on your WhatsApp notifications.</li>
            <li>As soon as a corporate client match goes live, our automated engine will send your instructional overview video directly to your phone.</li>
            <li>No further action is needed from you at this stage.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="faq">
  <div class="faq-inner">
    <span class="section-label">FAQ</span>
    <h2 class="section-h">Common Questions</h2>
    <div class="faq-list">

      <div class="faq-item">
        <button class="faq-q" onclick="faqToggle(this)">
          What exactly is a UBO or Nominee Director representative?
          <span class="faq-icon">+</span>
        </button>
        <p class="faq-a">International corporations setting up entities globally often require localized registry representatives or temporary verification partners to complete standardized compliance setups. You act as the remote independent representative strictly for the entity's identity verification (KYC) lifecycle checkpoints.</p>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="faqToggle(this)">
          Do I have to pay any registration fees to join the network?
          <span class="faq-icon">+</span>
        </button>
        <p class="faq-a">Absolutely not. GCCstartup is a premier corporate services provider. We never charge our network partners. Joining the network is 100% free, and we pay you for your verification and compliance services.</p>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="faqToggle(this)">
          Is my personal data safe with GCCstartup?
          <span class="faq-icon">+</span>
        </button>
        <p class="faq-a">Yes. This initial registration page only captures basic contact readiness. Any formal verification data or documents requested in later project stages are stored within encrypted, secure databases that strictly comply with international privacy frameworks.</p>
      </div>

      <div class="faq-item">
        <button class="faq-q" onclick="faqToggle(this)">
          Exactly when and how do I receive the $100 USD?
          <span class="faq-icon">+</span>
        </button>
        <p class="faq-a">Payouts are entirely milestone-based to ensure transparency. The moment your assigned client corporate verification/KYC process passes official registry approval, your $100 USD payment is immediately released to your designated account.</p>
      </div>

    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <p>© ${new Date().getFullYear()} GCC Startup. All rights reserved.<br/>
  <a href="https://gccstartup.com">gccstartup.com</a> · <a href="mailto:info@gccstartup.com">info@gccstartup.com</a></p>
</footer>

<script>
document.getElementById('partnerPage').value = location.href;

function faqToggle(btn) {
  var item = btn.parentElement;
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(i){ i.classList.remove('open'); });
  if (!isOpen) item.classList.add('open');
}

function partnerSubmit(e) {
  e.preventDefault();
  var btn = document.getElementById('partnerBtn');
  btn.disabled = true; btn.textContent = 'Submitting…';
  document.getElementById('partnerErr').classList.remove('show');

  var fd = new FormData(e.target);
  var data = {
    fullName:       fd.get('fullName'),
    whatsapp:       fd.get('whatsapp'),
    city:           fd.get('city'),
    hasPassport:    document.getElementById('chkPassport').checked,
    hasBankAccount: document.getElementById('chkBank').checked,
    page:           location.href,
  };

  fetch('https://cms.gccstartup.com/api/partner-apply', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  })
  .then(function(r){ if(!r.ok) throw new Error(r.status); return r.json(); })
  .then(function(){
    document.getElementById('partnerForm').style.display = 'none';
    document.getElementById('partnerSuccess').classList.add('show');
  })
  .catch(function(){
    document.getElementById('partnerErr').classList.add('show');
    btn.disabled = false;
    btn.textContent = 'Submit Secure Application →';
  });

  return false;
}
</script>
</body>
</html>`
}
