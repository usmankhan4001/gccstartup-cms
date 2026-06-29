import { getPayload } from 'payload';
import config from '@payload-config';
import { BlockRenderer } from '@/components/BlockRenderer';
import { getLocale, getBaseUrl, generateHreflang, localePath } from '@/lib/locale';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  let baseUrl = getBaseUrl();

  try {
    const payload = await getPayload({ config });
    const [homepage, settings] = await Promise.all([
      payload.findGlobal({ slug: 'homepage', locale: locale as any }),
      payload.findGlobal({ slug: 'siteSettings', locale: locale as any }),
    ]);
    baseUrl = getBaseUrl((settings as any)?.siteUrl);
    const seo: any = homepage?.seo || settings?.defaultSeo;
    return {
      title: seo?.metaTitle || seo?.title || 'GCC Startup',
      description: seo?.metaDescription || seo?.description || undefined,
      alternates: {
        canonical: `${baseUrl}${localePath('/', locale)}`,
        languages: generateHreflang('/', baseUrl),
      },
    };
  } catch {
    return {
      title: 'GCC Startup',
      description: 'Company Registration & Tax Optimization',
      alternates: {
        canonical: `${baseUrl}${localePath('/', locale)}`,
        languages: generateHreflang('/', baseUrl),
      },
    };
  }
}

export default async function HomePage() {
  let blocks: any[] = [];
  const locale = await getLocale();

  try {
    const payload = await getPayload({ config });
    const fetched = await payload.findGlobal({ slug: 'homepage', locale: locale as any });
    blocks = fetched?.layout || [];
  } catch (error) {
    console.error('Error fetching homepage global data:', error);
  }

  if (blocks.length > 0) return <BlockRenderer blocks={blocks} />

  return (
    <div className="homepage">
      <div className="wrap">
        <div style={{ padding: '64px 0' }}>
          <h1>GCC Startup CMS is ready.</h1>
          <p>Add blocks to the Homepage global in Payload to publish the homepage.</p>
        </div>
      </div>
    </div>
  );
}
