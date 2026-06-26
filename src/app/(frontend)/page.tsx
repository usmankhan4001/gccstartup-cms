import { getPayload } from 'payload';
import config from '@payload-config';
import Hero from '@/components/blocks/Hero';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const payload = await getPayload({ config });
  const hp = await payload.findGlobal({ slug: 'homepage' });
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
