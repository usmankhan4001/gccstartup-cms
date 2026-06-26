import { getPayload } from 'payload';
import config from '@payload-config';
import PricingCard from '@/components/blocks/PricingCard';
import RequirementList from '@/components/blocks/RequirementList';

export const dynamic = 'force-dynamic';

export default async function PricingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let doc: any = null;

  try {
    const payload = await getPayload({ config });
    const res = await payload.find({ collection: 'pricingTiers', where: { slug: { equals: slug } }, limit: 1 });
    doc = res.docs[0] || null;
  } catch (error) {
    console.error(`Error fetching pricing tier [slug: ${slug}]:`, error);
  }

  if (!doc) {
    const fallbackPricing: Record<string, any> = {
      'self-ubo': {
        name: 'Self as UBO Setup',
        intro: 'Best for founders registering the company under their own name. Fully transparent and compliant.',
        features: [
          { title: 'Corporate Registration', desc: 'Full incorporation under your own name as ultimate beneficial owner.' },
          { title: 'Standard Resolution', desc: 'Standard board resolution and share certificates.' },
          { title: 'Local Registry Filings', desc: 'Direct filing with the relevant national registry.' }
        ],
        process: [
          { title: 'Profile Setup', desc: 'Provide identity proof and proposed names.' },
          { title: 'Registration Filing', desc: 'We prepare and file the registration dossier.' },
          { title: 'Corporate Kit', desc: 'Receive your official corporate registration certificate.' }
        ]
      },
      'nominee-ubo': {
        name: 'Nominee UBO Setup',
        intro: 'Maximize your privacy with a professional third-party nominee shareholder/director structure.',
        features: [
          { title: 'Fiduciary Director', desc: 'Professional local resident nominee director.' },
          { title: 'Nominee Shareholder', desc: 'Registered nominee shareholder to hold equity.' },
          { title: 'Trust Deed & Indemnity', desc: 'Signed declaration of trust to protect your ownership.' }
        ],
        process: [
          { title: 'KYC Verification', desc: 'Verify the identity of the true beneficial owner.' },
          { title: 'Deed Signing', desc: 'Execute nominee agreements and declaration of trust.' },
          { title: 'Company Setup', desc: 'Incorporate company with nominee officers on public record.' }
        ]
      }
    };

    doc = fallbackPricing[slug] || {
      name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      intro: 'Premium global corporate setup tier tailored to your specific expansion strategy.',
      features: [
        { title: 'Corporate Incorporation', desc: 'Official setup of legal corporate body in chosen jurisdiction.' },
        { title: 'First Year Compliance', desc: 'Registered office address and local compliance agent setup.' }
      ],
      process: [
        { title: 'Select Jurisdiction', desc: 'Align on country and corporate options.' },
        { title: 'Filing & Processing', desc: 'Submit setup to local registrar.' }
      ]
    };
  }

  const features = (doc.features || []).map((f: any) => ({ title: f.title, desc: f.desc }));
  const process = (doc.process || []).map((p: any) => ({ title: p.title, desc: p.desc }));

  return (
    <div className="pricing-page">
      <div className="wrap" style={{ paddingTop: '100px' }}>
        <h1>{doc.name}</h1>
        <p className="intro">{doc.intro || ''}</p>
        <div style={{ padding: '64px 0' }}>
          {features.length > 0 && <PricingCard features={features} />}
        </div>
        {process.length > 0 && (
          <div style={{ paddingBottom: '64px' }}>
            <h2>Process</h2>
            <RequirementList items={process.map(p => `${p.title}: ${p.desc}`)} />
          </div>
        )}
      </div>
    </div>
  );
}
