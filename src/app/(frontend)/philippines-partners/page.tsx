import { getPayload } from 'payload';
import config from '@payload-config';
import PartnerApplicationForm from '@/components/PartnerApplicationForm';
import PartnerFaqAccordion from '@/components/PartnerFaqAccordion';
import BenefitGrid from '@/components/blocks/BenefitGrid';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

// Define the structure of partner global data
interface PartnerPageData {
  urgencyBar?: string;
  hero?: {
    badge?: string;
    heroHeadline?: string;
    heroSubhead?: string;
    heroCta?: string;
    heroFine?: string;
  };
  stats?: Array<{
    number: string;
    label: string;
    id?: string;
  }>;
  howItWorks?: {
    howLabel?: string;
    howHeadline?: string;
    howIntro?: string;
    steps?: Array<{
      title: string;
      desc: string;
      id?: string;
    }>;
  };
  applySection?: {
    applyLabel?: string;
    applyHeadline?: string;
    applySubhead?: string;
  };
  faqSection?: {
    faqLabel?: string;
    faqHeadline?: string;
    faqIntro?: string;
    faq?: Array<{
      q: string;
      a: string;
      id?: string;
    }>;
  };
  successState?: {
    successTitle?: string;
    successBody?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDesc?: string;
    metaImage?: any;
  };
}

// Fallback values in case the database is offline or empty
const fallbackData: PartnerPageData = {
  urgencyBar: "⚡ Urgent Notice: Currently recruiting partners in <strong>Manila, Cebu, Davao & Calabarzon</strong>. Join today!",
  hero: {
    badge: "Verification Network Recruitment",
    heroHeadline: "Become a <em>Verified Partner</em> in the Philippines",
    heroSubhead: "Earn premium commissions by verifying local entities and assisting local entrepreneurs to setup and scale their businesses globally. Join the GCC Startup Network today.",
    heroCta: "Apply to Join Network",
    heroFine: "Process takes under 2 minutes • No upfront fees required"
  },
  stats: [
    { number: "₱150,000+", label: "Average Monthly Earnings" },
    { number: "48 Hours", label: "Fast Application Response" },
    { number: "100%", label: "Remote & Flexible Schedule" },
    { number: "250+", label: "Active Partners Regionwide" }
  ],
  howItWorks: {
    howLabel: "How It Works",
    howHeadline: "Earn in Three Simple Steps",
    howIntro: "Our system is designed to be streamlined, transparent, and rewarding from day one.",
    steps: [
      { title: "Apply Online", desc: "Submit your details using our secure online application form in under 2 minutes." },
      { title: "Onboarding Call", desc: "Complete a quick video/phone interview on WhatsApp with our recruitment team." },
      { title: "Start Verifying", desc: "Access the partner portal, begin processing verifications, and receive payouts." }
    ]
  },
  applySection: {
    applyLabel: "Secure Application",
    applyHeadline: "Submit Your Application",
    applySubhead: "Please fill out the form below carefully. Ensure your WhatsApp number is correct so our team can reach out to you."
  },
  faqSection: {
    faqLabel: "Frequently Asked Questions",
    faqHeadline: "Recruitment FAQ",
    faqIntro: "Here are answers to the most common questions about the partner verification program.",
    faq: [
      { q: "What are the core responsibilities of a Verification Partner?", a: "As a partner, you will review local entity registrations, verify entrepreneur identity documents, and ensure compliance before they onboard onto the GCC Startup global network." },
      { q: "How are commission payouts handled?", a: "Commissions are calculated monthly and paid directly to your Philippine bank account or via standard remittance channels like GCash/remit within the first 5 business days of each month." },
      { q: "Is there any cost to join?", a: "No. GCC Startup does not charge any application, registration, or training fees. The network is completely free to join for qualified individuals." },
      { q: "What qualifications do I need to be accepted?", a: "You must reside in the Philippines, have a valid government-issued ID/passport, and have an active Philippine bank account for payouts. Prior experience in legal, corporate, or financial services is a plus but not mandatory." }
    ]
  },
  successState: {
    successTitle: "Application Submitted Successfully!",
    successBody: "Thank you for applying to the GCC Startup Verification Network. Our regional team is reviewing your application. We will contact you via WhatsApp (+63) within 24-48 hours to schedule your brief onboarding interview."
  }
};

async function getPartnerPageData(): Promise<PartnerPageData> {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({ slug: 'partnerPage' }) as any;
    if (!data) return fallbackData;
    return {
      ...fallbackData,
      ...data,
      hero: { ...fallbackData.hero, ...data.hero },
      howItWorks: { ...fallbackData.howItWorks, ...data.howItWorks },
      applySection: { ...fallbackData.applySection, ...data.applySection },
      faqSection: { ...fallbackData.faqSection, ...data.faqSection },
      successState: { ...fallbackData.successState, ...data.successState },
    };
  } catch (error) {
    console.error('Error fetching partnerPage global:', error);
    return fallbackData;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPartnerPageData();
  const title = data.seo?.metaTitle || "Philippines Partner Program — GCC Startup";
  const description = data.seo?.metaDesc || "Become a verified partner in the Philippines and earn premium commissions assisting entrepreneurs.";
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    }
  };
}

export default async function PhilippinesPartnersPage() {
  const data = await getPartnerPageData();

  // Helper to format headline HTML
  const formatHeadline = (text: string) => {
    return text.replace(/<em>(.*?)<\/em>/g, '<span style="color: var(--orange); font-style: normal;">$1</span>');
  };

  return (
    <div className="partner-landing-page" style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--font)' }}>
      {/* Urgency Bar */}
      {data.urgencyBar && (
        <div 
          style={{ 
            background: 'var(--orange-lt)', 
            color: 'var(--orange-dk)', 
            borderBottom: '1px solid var(--orange)',
            padding: '12px 24px', 
            textAlign: 'center', 
            fontSize: '14px', 
            fontWeight: '600',
            position: 'relative',
            zIndex: 10
          }}
          dangerouslySetInnerHTML={{ __html: data.urgencyBar }}
        />
      )}

      {/* Hero Section */}
      <section 
        className="subhero" 
        style={{ 
          background: 'linear-gradient(135deg, var(--blue-dkr) 0%, #06112C 100%)',
          color: 'var(--white)',
          position: 'relative',
          padding: '100px 0 140px 0',
          overflow: 'hidden'
        }}
      >
        {/* Decorative elements */}
        <div 
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '40vw',
            height: '40vw',
            background: 'radial-gradient(circle, rgba(27, 79, 216, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="wrap">
          <div className="crumbs" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
            <a href="/" style={{ color: 'inherit' }}>Home</a> &nbsp;/&nbsp; Philippines Partners
          </div>

          {data.hero?.badge && (
            <span 
              className="eyebrow" 
              style={{ 
                color: 'var(--orange)', 
                background: 'rgba(242, 101, 34, 0.1)', 
                border: '1px solid rgba(242, 101, 34, 0.3)',
                padding: '6px 14px',
                borderRadius: '50px',
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.1em',
                marginBottom: '24px'
              }}
            >
              {data.hero.badge}
            </span>
          )}

          <h1 
            style={{ 
              color: 'var(--white)', 
              marginBottom: '24px',
              fontSize: 'clamp(36px, 5.5vw, 62px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}
            dangerouslySetInnerHTML={{ __html: formatHeadline(data.hero?.heroHeadline || '') }}
          />

          <p 
            style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: '18px', 
              lineHeight: '1.6', 
              maxWidth: '720px',
              marginBottom: '40px'
            }}
          >
            {data.hero?.heroSubhead}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
            <a href="#partner-form-section" className="btn btn-fill btn-arrow" style={{ padding: '16px 36px', fontSize: '15px' }}>
              {data.hero?.heroCta || 'Apply to Join'}
            </a>
            {data.hero?.heroFine && (
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginLeft: '4px' }}>
                {data.hero.heroFine}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      {data.stats && data.stats.length > 0 && (
        <section 
          style={{ 
            marginTop: '-60px', 
            position: 'relative', 
            zIndex: 5,
            padding: '0 16px'
          }}
        >
          <div 
            className="wrap stats-grid-responsive" 
            style={{ 
              background: 'var(--white)', 
              border: '1.5px solid var(--line)',
              borderRadius: '16px',
              padding: '40px 32px',
              boxShadow: '0 20px 40px rgba(17, 24, 39, 0.08)',
              display: 'grid',
              gridTemplateColumns: `repeat(${data.stats.length}, 1fr)`,
              gap: '24px'
            }}
          >
            {data.stats.map((stat, i) => (
              <div 
                key={stat.id || i} 
                style={{ 
                  textAlign: 'center',
                  borderRight: i < (data.stats?.length || 0) - 1 ? '1px solid var(--line)' : 'none',
                  paddingRight: '12px'
                }}
                className="stat-item-responsive"
              >
                <div style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', color: 'var(--blue)', lineHeight: '1.1', marginBottom: '8px' }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* How it Works Section */}
      {data.howItWorks && (
        <section style={{ padding: '96px 0 64px 0' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '680px', margin: '0 auto 64px auto' }}>
              <span className="eyebrow">{data.howItWorks.howLabel}</span>
              <h2 style={{ fontSize: '36px', marginBottom: '16px' }}>{data.howItWorks.howHeadline}</h2>
              <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.7' }}>{data.howItWorks.howIntro}</p>
            </div>

            {data.howItWorks.steps && data.howItWorks.steps.length > 0 && (
              <BenefitGrid 
                benefits={data.howItWorks.steps.map((step) => ({
                  title: step.title,
                  desc: step.desc
                }))}
              />
            )}
          </div>
        </section>
      )}

      {/* Application Form Section */}
      <section style={{ padding: '64px 0', background: 'var(--white)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <PartnerApplicationForm 
            applyLabel={data.applySection?.applyLabel}
            applyHeadline={data.applySection?.applyHeadline}
            applySubhead={data.applySection?.applySubhead}
            successTitle={data.successState?.successTitle}
            successBody={data.successState?.successBody}
          />
        </div>
      </section>

      {/* FAQ Section */}
      {data.faqSection && data.faqSection.faq && data.faqSection.faq.length > 0 && (
        <section style={{ padding: '96px 0' }} id="faq">
          <div className="wrap">
            <div className="faq-layout">
              <div className="faq-left">
                <span className="eyebrow">{data.faqSection.faqLabel}</span>
                <h2 style={{ fontSize: '32px' }}>{data.faqSection.faqHeadline}</h2>
                <p>{data.faqSection.faqIntro}</p>
                <div 
                  className="faq-contact"
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--line)',
                    padding: '24px',
                    borderRadius: '12px'
                  }}
                >
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--ink)', marginBottom: '8px' }}>Need more help?</h4>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '16px' }}>
                    If you have custom inquiries about our verification network, feel free to speak to our team.
                  </p>
                  <a href="https://wa.me/gccstartup" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
              <div className="faq-right">
                <PartnerFaqAccordion faq={data.faqSection.faq} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Custom responsive styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .stats-grid-responsive {
            grid-template-columns: 1fr 1fr !important;
            padding: 32px 20px !important;
          }
          .stat-item-responsive {
            border-right: none !important;
            padding-right: 0 !important;
          }
          .stat-item-responsive:nth-child(odd) {
            border-right: 1px solid var(--line) !important;
          }
        }
        @media (max-width: 480px) {
          .stats-grid-responsive {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .stat-item-responsive {
            border-right: none !important;
            border-bottom: 1px solid var(--line) !important;
            padding-bottom: 16px !important;
          }
          .stat-item-responsive:last-child {
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
        }
      `}} />
    </div>
  );
}
