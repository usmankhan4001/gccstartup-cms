import { getPayload } from 'payload';
import config from '@payload-config';
import Hero from '@/components/blocks/Hero';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let hp: any = {
    hero: {
      headline: 'Global Company Registration & Tax Optimization',
      subhead: 'Founded by a Finance Director with deep UAE corporate finance expertise. Trusted by 500+ entrepreneurs worldwide.',
    }
  };

  try {
    const payload = await getPayload({ config });
    const fetched = await payload.findGlobal({ slug: 'homepage' });
    if (fetched) {
      hp = fetched;
    }
  } catch (error) {
    console.error('Error fetching homepage global data:', error);
  }

  return (
    <div className="homepage">
      <Hero headline={hp.hero?.headline || 'Global Company Registration'} intro={hp.hero?.subhead || ''} />
      <div className="wrap">
        <div style={{ padding: '64px 0' }}>
          <h2>Welcome to GCC Startup</h2>
          <p>Please browse our services and jurisdictions from the navigation above.</p>
        </div>
      </div>
    </div>
  );
}
