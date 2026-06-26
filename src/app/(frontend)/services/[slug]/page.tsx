import { getPayload } from 'payload';
import config from '@payload-config';
import Hero from '@/components/blocks/Hero';
import BenefitGrid from '@/components/blocks/BenefitGrid';
import RequirementList from '@/components/blocks/RequirementList';

export const dynamic = 'force-dynamic';

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const res = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1 });
  const doc = res.docs[0];

  if (!doc) {
    return (
      <div style={{ padding: '48px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h1>Service not found</h1>
      </div>
    );
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
