import PartnerApplicationForm from '@/components/PartnerApplicationForm'
import PartnerFaqAccordion from '@/components/PartnerFaqAccordion'

export const metadata = {
  title: 'Philippines Partner Program - GCC Startup',
  description: 'Become a verified partner in the Philippines and earn commissions assisting entrepreneurs.',
}

const stats = [
  { number: 'P150,000+', label: 'Average Monthly Earnings' },
  { number: '48 Hours', label: 'Fast Application Response' },
  { number: '100%', label: 'Remote & Flexible Schedule' },
  { number: '250+', label: 'Active Partners Regionwide' },
]

const steps = [
  { title: 'Apply Online', desc: 'Submit your details using our secure application form in under 2 minutes.' },
  { title: 'Onboarding Call', desc: 'Complete a quick WhatsApp interview with our recruitment team.' },
  { title: 'Start Verifying', desc: 'Process verifications and receive partner payouts.' },
]

const faq = [
  { q: 'What are the core responsibilities?', a: 'You review local registrations, verify identity documents, and support compliance before entrepreneurs onboard to GCC Startup.' },
  { q: 'How are commissions paid?', a: 'Commissions are calculated monthly and paid to your Philippine bank account or standard remittance channels.' },
  { q: 'Is there any cost to join?', a: 'No. GCC Startup does not charge application, registration, or training fees.' },
  { q: 'What qualifications do I need?', a: 'You should reside in the Philippines, have valid ID or passport, and have an active Philippine bank account. Corporate, legal, or financial experience is helpful but not mandatory.' },
]

export default function PhilippinesPartnersPage() {
  return (
    <main className="partner-landing-page" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--orange-lt)', color: 'var(--orange-dk)', borderBottom: '1px solid var(--orange)', padding: '12px 24px', textAlign: 'center', fontSize: 14, fontWeight: 600 }}>
        Urgent Notice: Currently recruiting partners in Manila, Cebu, Davao and Calabarzon. Join today.
      </div>

      <section style={{ background: 'linear-gradient(135deg, var(--blue-dkr) 0%, #06112C 100%)', color: 'var(--white)', padding: '100px 0 140px', overflow: 'hidden' }}>
        <div className="wrap">
          <div style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 32 }}><a href="/">Home</a> / Philippines Partners</div>
          <span className="eyebrow" style={{ color: 'var(--orange)' }}>Verification Network Recruitment</span>
          <h1 style={{ color: 'var(--white)', marginBottom: 24, fontSize: 'clamp(36px, 5.5vw, 62px)' }}>Become a Verified Partner in the Philippines</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, lineHeight: 1.6, maxWidth: 720, marginBottom: 40 }}>
            Earn premium commissions by verifying local entities and assisting entrepreneurs to set up and scale their businesses globally.
          </p>
          <a href="#partner-form-section" className="btn btn-fill btn-arrow" style={{ padding: '16px 36px', fontSize: 15 }}>Apply to Join Network</a>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 12 }}>Process takes under 2 minutes. No upfront fees required.</p>
        </div>
      </section>

      <section style={{ marginTop: -60, position: 'relative', zIndex: 5, padding: '0 16px' }}>
        <div className="wrap" style={{ background: 'var(--white)', border: '1.5px solid var(--line)', borderRadius: 16, padding: '40px 32px', boxShadow: '0 20px 40px rgba(17,24,39,0.08)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
          {stats.map((stat) => <div key={stat.label} style={{ textAlign: 'center' }}><div style={{ fontSize: 36, fontWeight: 800, color: 'var(--blue)' }}>{stat.number}</div><div style={{ fontSize: 14, fontWeight: 600, color: 'var(--muted)' }}>{stat.label}</div></div>)}
        </div>
      </section>

      <section style={{ padding: '96px 0 64px' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', margin: '0 auto 56px', maxWidth: 680 }}>
            <span className="eyebrow">How It Works</span>
            <h2>Earn in Three Simple Steps</h2>
            <p>Our system is streamlined, transparent and rewarding from day one.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {steps.map((step, index) => <div key={step.title} style={{ background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 14, padding: 28 }}><strong style={{ color: 'var(--orange)' }}>Step {index + 1}</strong><h3 style={{ margin: '10px 0' }}>{step.title}</h3><p>{step.desc}</p></div>)}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 0', background: 'var(--white)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <PartnerApplicationForm applyHeadline="Submit Your Application" applySubhead="Fill out the form below carefully. Make sure your WhatsApp number is correct so our team can reach you." successTitle="Application Submitted Successfully" successBody="Thank you for applying. Our regional team will contact you via WhatsApp within 24-48 hours." />
        </div>
      </section>

      <section style={{ padding: '96px 0' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 0.8fr) minmax(280px, 1.2fr)', gap: 40 }}>
          <div><span className="eyebrow">FAQ</span><h2>Recruitment FAQ</h2><p>Answers to common questions about the partner program.</p></div>
          <PartnerFaqAccordion faq={faq} />
        </div>
      </section>
    </main>
  )
}
