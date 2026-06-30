const fs = require('fs');

const indexHtml = fs.readFileSync('./Pages/index.html', 'utf8');

const headNavEnd = indexHtml.indexOf('<main');
const headNav = indexHtml.substring(0, headNavEnd);

const footerStart = indexHtml.indexOf('<footer');
const footer = indexHtml.substring(footerStart);

const pageContent = `
<main class="partner-landing-page" style="background: var(--bg); min-height: 100vh;">
  <div style="background: var(--orange-lt); color: var(--orange-dk); border-bottom: 1px solid var(--orange); padding: 12px 24px; text-align: center; font-size: 14px; font-weight: 600;">
    Urgent Notice: Currently recruiting partners in Manila, Cebu, Davao and Calabarzon. Join today.
  </div>

  <section style="background: linear-gradient(135deg, var(--blue-dkr) 0%, #06112C 100%); color: var(--white); padding: 100px 0 140px; overflow: hidden;">
    <div class="wrap">
      <div style="color: rgba(255,255,255,0.6); margin-bottom: 32px;"><a href="/" style="color:inherit;">Home</a> / Philippines Partners</div>
      <span class="eyebrow" style="color: var(--orange);">Verification Network Recruitment</span>
      <h1 style="color: var(--white); margin-bottom: 24px; font-size: clamp(36px, 5.5vw, 62px);">Become a Verified Partner in the Philippines</h1>
      <p style="color: rgba(255,255,255,0.8); font-size: 18px; line-height: 1.6; max-width: 720px; margin-bottom: 40px;">
        Earn premium commissions by verifying local entities and assisting entrepreneurs to set up and scale their businesses globally.
      </p>
      <a href="#partner-form-section" class="btn btn-fill btn-arrow" style="padding: 16px 36px; font-size: 15px; background:var(--orange); color:var(--white); border-radius:8px; text-decoration:none; display:inline-block;">Apply to Join Network</a>
      <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin-top: 12px;">Process takes under 2 minutes. No upfront fees required.</p>
    </div>
  </section>

  <section style="margin-top: -60px; position: relative; z-index: 5; padding: 0 16px;">
    <div class="wrap" style="background: var(--white); border: 1.5px solid var(--line); border-radius: 16px; padding: 40px 32px; box-shadow: 0 20px 40px rgba(17,24,39,0.08); display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 24px;">
      <div style="text-align: center;"><div style="font-size: 36px; font-weight: 800; color: var(--blue);">P150,000+</div><div style="font-size: 14px; font-weight: 600; color: var(--muted);">Average Monthly Earnings</div></div>
      <div style="text-align: center;"><div style="font-size: 36px; font-weight: 800; color: var(--blue);">48 Hours</div><div style="font-size: 14px; font-weight: 600; color: var(--muted);">Fast Application Response</div></div>
      <div style="text-align: center;"><div style="font-size: 36px; font-weight: 800; color: var(--blue);">100%</div><div style="font-size: 14px; font-weight: 600; color: var(--muted);">Remote & Flexible Schedule</div></div>
      <div style="text-align: center;"><div style="font-size: 36px; font-weight: 800; color: var(--blue);">250+</div><div style="font-size: 14px; font-weight: 600; color: var(--muted);">Active Partners Regionwide</div></div>
    </div>
  </section>

  <section style="padding: 96px 0 64px;">
    <div class="wrap">
      <div style="text-align: center; margin: 0 auto 56px; max-width: 680px;">
        <span class="eyebrow">How It Works</span>
        <h2>Earn in Three Simple Steps</h2>
        <p>Our system is streamlined, transparent and rewarding from day one.</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px;">
        <div style="background: var(--white); border: 1px solid var(--line); border-radius: 14px; padding: 28px;"><strong style="color: var(--orange);">Step 1</strong><h3 style="margin: 10px 0;">Apply Online</h3><p>Submit your details using our secure application form in under 2 minutes.</p></div>
        <div style="background: var(--white); border: 1px solid var(--line); border-radius: 14px; padding: 28px;"><strong style="color: var(--orange);">Step 2</strong><h3 style="margin: 10px 0;">Onboarding Call</h3><p>Complete a quick WhatsApp interview with our recruitment team.</p></div>
        <div style="background: var(--white); border: 1px solid var(--line); border-radius: 14px; padding: 28px;"><strong style="color: var(--orange);">Step 3</strong><h3 style="margin: 10px 0;">Start Verifying</h3><p>Process verifications and receive partner payouts.</p></div>
      </div>
    </div>
  </section>

  <section id="partner-form-section" style="padding: 64px 0; background: var(--white); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);">
    <div class="wrap" style="max-width: 600px; margin: 0 auto;">
      <div style="text-align:center; margin-bottom: 32px;">
        <h2 style="font-size:32px;">Submit Your Application</h2>
        <p style="color:var(--muted);">Fill out the form below carefully. Make sure your WhatsApp number is correct so our team can reach you.</p>
      </div>
      <form id="partnerForm" onsubmit="return submitPartnerLead(event)">
        <div style="margin-bottom:16px;">
          <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Full Name *</label>
          <input type="text" name="name" required style="width:100%; padding:12px; border:1px solid #ddd; border-radius:6px;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Email Address *</label>
          <input type="email" name="email" required style="width:100%; padding:12px; border:1px solid #ddd; border-radius:6px;">
        </div>
        <div style="margin-bottom:16px;">
          <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">WhatsApp Number *</label>
          <input type="text" name="phone" required placeholder="+63 912 345 6789" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:6px;">
        </div>
        <div style="margin-bottom:24px;">
          <label style="display:block; margin-bottom:6px; font-weight:600; font-size:14px;">Why are you a good fit? (Optional)</label>
          <textarea name="message" rows="3" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:6px;"></textarea>
        </div>
        <input type="hidden" name="country" value="Philippines">
        <input type="hidden" name="interest" value="Philippines Partner Application">
        <input type="hidden" name="source" value="Philippines Partner Application">
        <button type="submit" id="partnerSubmitBtn" style="width:100%; padding:14px; background:var(--orange); color:var(--white); border:none; border-radius:6px; font-size:16px; font-weight:700; cursor:pointer;">Submit Application</button>
      </form>
      <div id="partnerSuccess" style="display:none; text-align:center; padding: 40px 0;">
        <div style="font-size:48px; color:var(--orange); margin-bottom:16px;">✓</div>
        <h3 style="font-size:24px; margin-bottom:12px;">Application Submitted Successfully</h3>
        <p style="color:var(--muted);">Thank you for applying. Our regional team will contact you via WhatsApp within 24-48 hours.</p>
      </div>
    </div>
  </section>
  <script>
    function submitPartnerLead(e) {
      e.preventDefault();
      var btn = document.getElementById('partnerSubmitBtn');
      btn.disabled = true;
      btn.textContent = 'Submitting...';
      
      var data = {};
      new FormData(e.target).forEach(function(v,k) { data[k]=v; });
      data.page = location.href;
      
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(function() {
        document.getElementById('partnerForm').style.display = 'none';
        document.getElementById('partnerSuccess').style.display = 'block';
      })
      .catch(function(err) {
        btn.disabled = false;
        btn.textContent = 'Try Again';
        alert('There was an error submitting your application. Please try again.');
      });
      return false;
    }
  </script>

</main>
`;

// Combine and write
let finalHtml = headNav + pageContent + footer;
finalHtml = finalHtml.replace(/<title>.*?<\/title>/, '<title>Philippines Partner Program - GCC Startup</title>');

fs.writeFileSync('./Pages/philippines-partners.html', finalHtml, 'utf8');
console.log('Created Pages/philippines-partners.html');
