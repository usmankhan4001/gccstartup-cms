import { getPayload } from 'payload';
import config from '@payload-config';
import Hero from '@/components/blocks/Hero';
import BenefitGrid from '@/components/blocks/BenefitGrid';
import RequirementList from '@/components/blocks/RequirementList';
import { BlockRenderer } from '@/components/BlockRenderer';
import { notFound } from 'next/navigation';
import { getLocale, getBaseUrl, generateHreflang, localePath } from '@/lib/locale';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  let baseUrl = getBaseUrl();
  const path = `/services/${slug}`;
  const payload = await getPayload({ config });
  const [pageRes, settings] = await Promise.all([
    payload.find({ collection: 'pages' as any, where: { slug: { equals: `services/${slug}` } }, locale: locale as any, limit: 1 }),
    payload.findGlobal({ slug: 'siteSettings', locale: locale as any }).catch(() => null),
  ]);
  baseUrl = getBaseUrl((settings as any)?.siteUrl);
  const page: any = pageRes.docs[0];
  if (page?.seo) return { title: page.seo.metaTitle || page.title, description: page.seo.metaDescription || undefined, alternates: { canonical: page.seo.canonicalUrl || `${baseUrl}${localePath(path, locale)}`, languages: generateHreflang(path, baseUrl) } };

  const serviceRes = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, locale: locale as any, limit: 1 });
  const service: any = serviceRes.docs[0];
  return { title: service ? `${service.name} - GCC Startup` : 'Service - GCC Startup', description: service?.intro || undefined, alternates: { canonical: `${baseUrl}${localePath(path, locale)}`, languages: generateHreflang(path, baseUrl) } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  let doc: any = null;

  try {
    const payload = await getPayload({ config });
    const pages = await payload.find({ collection: 'pages' as any, where: { slug: { equals: `services/${slug}` } }, locale: locale as any, depth: 2, limit: 1 });
    const page: any = pages.docs[0];
    if (page) return <BlockRenderer blocks={page.layout} />;

    const res = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, locale: locale as any, limit: 1 });
    doc = res.docs[0] || null;
  } catch (error) {
    console.error(`Error fetching service [slug: ${slug}]:`, error);
  }

  if (!doc) notFound();

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
