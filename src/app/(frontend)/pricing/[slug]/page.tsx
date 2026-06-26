import { getPayload } from 'payload';
import config from '@payload-config';
import PricingCard from '@/components/blocks/PricingCard';
import RequirementList from '@/components/blocks/RequirementList';

export const dynamic = 'force-dynamic';

export default async function PricingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const res = await payload.find({ collection: 'pricingTiers', where: { slug: { equals: slug } }, limit: 1 });
  const doc = res.docs[0];

  if (!doc) {
    return (
      <div style={{ padding: '48px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h1>Pricing not found</h1>
      </div>
    );
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
