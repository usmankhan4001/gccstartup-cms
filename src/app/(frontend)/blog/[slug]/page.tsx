import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { notFound } from 'next/navigation'
import { generateHreflang, getBaseUrl, getLocale, localePath } from '@/lib/locale'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const locale = await getLocale()
  const path = `/blog/${slug}`
  const payload = await getPayload({ config })
  const [res, settings] = await Promise.all([
    payload.find({ collection: 'posts', where: { slug: { equals: slug } }, locale: locale as any, limit: 1 }),
    payload.findGlobal({ slug: 'siteSettings', locale: locale as any }).catch(() => null),
  ])
  const baseUrl = getBaseUrl((settings as any)?.siteUrl)
  const doc: any = res.docs[0]

  return {
    title: doc ? `${doc.title} - GCC Startup` : 'Blog - GCC Startup',
    description: doc?.excerpt || undefined,
    alternates: {
      canonical: `${baseUrl}${localePath(path, locale)}`,
      languages: generateHreflang(path, baseUrl),
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const locale = await getLocale()
  let doc: any = null

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, locale: locale as any, limit: 1 })
    doc = res.docs[0] || null
  } catch (error) {
    console.error(`Error fetching blog post [slug: ${slug}]:`, error);
  }

  if (!doc) notFound()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{doc.title || doc.slug}</h1>
      <p><Link href={localePath('/blog', locale)}>&larr; Back to blog</Link></p>
      <hr style={{ margin: '1.5rem 0' }}/>
      
      {doc.content && (
        <div style={{ marginBottom: '2.5rem' }}>
          <RichText content={doc.content} />
        </div>
      )}
    </div>
  )
}
