import { getPayload } from 'payload';
import config from '@payload-config';
import Hero from '@/components/blocks/Hero';
import BenefitGrid from '@/components/blocks/BenefitGrid';
import RequirementList from '@/components/blocks/RequirementList';

export const dynamic = 'force-dynamic';

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let doc: any = null;

  try {
    const payload = await getPayload({ config });
    const res = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 });
    doc = res.docs[0] || null;
  } catch (error) {
    console.error(`Error fetching service [slug: ${slug}]:`, error);
  }

  if (!doc) {
    const fallbackServices: Record<string, any> = {
      'company-registration': {
        name: 'Company Registration',
        headline: 'Global Company Registration Services',
        intro: 'Incorporate your business in top-tier jurisdictions globally with ease and compliance.',
        features: [
          { title: 'Full Incorporation', desc: 'End-to-end registration of your legal corporate entity.' },
          { title: 'Registered Address', desc: 'Provision of a registered local office address.' },
          { title: 'Compliance Check', desc: 'Verification of name availability and registry guidelines.' }
        ],
        process: [
          { title: 'Jurisdiction Select', desc: 'Choose the best country for your business model.' },
          { title: 'Document Prep', desc: 'Submit passport copies, proof of address, and application details.' },
          { title: 'Registration', desc: 'We submit details to local registry authorities.' }
        ]
      },
      'bank-account-setup': {
        name: 'Bank Account Setup',
        headline: 'Corporate Bank Account Opening',
        intro: 'Get assistance in opening corporate accounts with top-tier international banks.',
        features: [
          { title: 'Bank Selection', desc: 'Matching you with the right bank for your activity.' },
          { title: 'Document Pack', desc: 'Preparing necessary files for compliance departments.' },
          { title: 'Interview prep', desc: 'Assistance during banker call and validation.' }
        ],
        process: [
          { title: 'Profile Review', desc: 'Review your business profile and transactions flow.' },
          { title: 'Submission', desc: 'Formally submit dossiers to partner banks.' },
          { title: 'Onboarding', desc: 'Complete face-to-face or video verification.' }
        ]
      }
    };

    doc = fallbackServices[slug] || {
      name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      headline: `${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} Services`,
      intro: 'Corporate services to launch and grow your business globally.',
      features: [
        { title: 'Professional Setup', desc: 'Get guidance on local regulations and setup requirements.' },
        { title: 'On-Going Support', desc: 'We keep your entities active and compliant year-round.' }
      ],
      process: [
        { title: 'Apply', desc: 'Contact us with your business details.' },
        { title: 'Verify', desc: 'Review corporate compliance documents.' },
        { title: 'Launch', desc: 'Complete setup and receive credentials.' }
      ]
    };
  }

  const features = (doc.features || []).map((f: any) => ({ title: f.title, desc: f.desc }));
  const process = (doc.process || []).map((p: any) => ({ title: p.title, desc: p.desc }));

  return (
    <div className="service-page">
      <Hero headline={doc.headline || doc.name} intro={doc.intro || ''} />
      <div className="wrap" style={{ padding: '64px 32px' }}>
        {features.length > 0 && (
          <div style={{ marginBottom: '64px' }}>
            <h2>Features</h2>
            <BenefitGrid benefits={features} />
          </div>
        )}
        {process.length > 0 && (
          <div>
            <h2>Process</h2>
            <RequirementList items={process.map(p => `${p.title}: ${p.desc}`)} />
          </div>
        )}
      </div>
    </div>
  );
}
