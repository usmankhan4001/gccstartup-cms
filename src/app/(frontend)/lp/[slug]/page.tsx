import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound } from 'next/navigation';
import RichText from '@/components/RichText';
import LandingPageForm from '@/components/LandingPageForm';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface LandingPageDoc {
  title: string;
  slug: string;
  template?: 'lead-capture' | 'partner-recruitment' | 'service-promo' | 'custom' | null;
  heroHeadline?: string | null;
  heroSubhead?: string | null;
  heroImage?: any;
  content?: any;
  rawHtml?: string | null;
  formConfig?: {
    formType?: 'contact' | 'lead' | 'partner' | null;
    submitButtonText?: string | null;
    successMessage?: string | null;
    redirectUrl?: string | null;
  } | null;
  whatsappConfig?: {
    adminMessageTemplate?: string | null;
    leadMessageTemplate?: string | null;
  } | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
}

// Fallback document in case database is offline or page not found
const getFallbackDoc = (slug: string): LandingPageDoc => ({
  title: "GCC Startup — Global Expansion",
  slug: slug,
  template: "lead-capture",
  heroHeadline: "Register & Scale Your Business Globally",
  heroSubhead: "Get end-to-end corporate support. We assist with company formation, corporate bank accounts, nominee services, and tax residency setup.",
  rawHtml: `
    <div style="margin-top: 32px;">
      <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 12px; color: var(--ink);">Why Choose GCC Startup?</h3>
      <ul style="list-style: none; padding: 0; display: flex; flexDirection: column; gap: 12px;">
        <li style="display: flex; gap: 8px; align-items: flex-start;">
          <span style="color: var(--orange); font-weight: bold;">✓</span>
          <span><strong>Fast Setup:</strong> Incorporate in as little as 48 hours depending on the jurisdiction.</span>
        </li>
        <li style="display: flex; gap: 8px; align-items: flex-start;">
          <span style="color: var(--orange); font-weight: bold;">✓</span>
          <span><strong>Banking Assistance:</strong> Direct introductions to top digital and brick-and-mortar business banks.</span>
        </li>
        <li style="display: flex; gap: 8px; align-items: flex-start;">
          <span style="color: var(--orange); font-weight: bold;">✓</span>
          <span><strong>Tax Compliance:</strong> Structures designed by corporate tax professionals to ensure compliance.</span>
        </li>
      </ul>
    </div>
  `,
  formConfig: {
    formType: "lead",
    submitButtonText: "Request Free Consultation",
    successMessage: "Thank you for reaching out. An expert consultant will contact you on WhatsApp or Email within 24 hours.",
  }
});

async function fetchLandingPage(slug: string): Promise<{ doc: LandingPageDoc; isFallback: boolean }> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: 'landingPages',
      where: { slug: { equals: slug } },
      limit: 1,
    });
    
    if (res.docs.length > 0) {
      return { doc: res.docs[0] as any, isFallback: false };
    }
    return { doc: getFallbackDoc(slug), isFallback: true };
  } catch (error) {
    console.error(`Error fetching landing page [slug: ${slug}]:`, error);
    return { doc: getFallbackDoc(slug), isFallback: true };
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { doc } = await fetchLandingPage(slug);
  const title = `${doc.heroHeadline || doc.title} — GCC Startup`;
  const description = doc.heroSubhead || "Discover premium global corporate solutions with GCC Startup.";
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    }
  };
}

export default async function LandingPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { doc, isFallback } = await fetchLandingPage(slug);

  const heroImageUrl = doc.heroImage && typeof doc.heroImage === 'object' ? doc.heroImage.url : null;
  const utmData = {
    utmSource: doc.utmSource || undefined,
    utmMedium: doc.utmMedium || undefined,
    utmCampaign: doc.utmCampaign || undefined,
  };

  return (
    <div className="landing-page" style={{ background: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--font)' }}>
      {isFallback && (
        <div style={{ background: 'var(--orange-lt)', color: 'var(--orange-dk)', padding: '10px', textAlign: 'center', fontSize: '13px', fontWeight: '500' }}>
          ⚠️ Notice: Showing default placeholder landing page (database connection offline or page not found).
        </div>
      )}

      {/* Main Landing Page Header/Hero */}
      <section 
        style={{ 
          background: 'linear-gradient(135deg, var(--blue-dkr) 0%, #06112C 100%)',
          color: 'var(--white)',
          padding: '80px 0 100px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '50vw',
            height: '50vw',
            background: 'radial-gradient(circle, rgba(27, 79, 216, 0.12) 0%, transparent 60%)',
            pointerEvents: 'none'
          }}
        />

        <div className="wrap">
          <div className="crumbs" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px', fontSize: '13px' }}>
            <a href="/" style={{ color: 'inherit' }}>Home</a> &nbsp;/&nbsp; LP &nbsp;/&nbsp; {doc.title}
          </div>

          <div style={{ maxWidth: '800px' }}>
            <h1 style={{ color: 'var(--white)', marginBottom: '16px', fontSize: 'clamp(32px, 5vw, 52px)' }}>
              {doc.heroHeadline || doc.title}
            </h1>
            {doc.heroSubhead && (
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', lineHeight: '1.6', margin: 0 }}>
                {doc.heroSubhead}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Landing Page Content Grid */}
      <section style={{ padding: '64px 0' }}>
        <div className="wrap">
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1.2fr 0.8fr', 
              gap: '48px',
              alignItems: 'start'
            }}
            className="lp-content-layout"
          >
            {/* Left Column: Text Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {heroImageUrl && (
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line)', marginBottom: '16px' }}>
                  <img src={heroImageUrl} alt={doc.title} style={{ width: '100%', objectFit: 'cover' }} />
                </div>
              )}

              {doc.content && (
                <RichText content={doc.content} />
              )}

              {doc.rawHtml && (
                <div dangerouslySetInnerHTML={{ __html: doc.rawHtml }} />
              )}
            </div>

            {/* Right Column: Form */}
            <div>
              {doc.formConfig && (
                <LandingPageForm formConfig={doc.formConfig} utmData={utmData} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Custom styles for landing pages */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .lp-content-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}} />
    </div>
  );
}
