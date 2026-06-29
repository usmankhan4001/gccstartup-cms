import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { generateHreflang, getBaseUrl, getLocale, localePath } from '@/lib/locale'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'siteSettings', locale: locale as any }).catch(() => null)
  const baseUrl = getBaseUrl((settings as any)?.siteUrl)
  const path = '/blog'

  return {
    title: 'Blog - GCC Startup',
    description: 'Guides and updates on company formation, banking, tax residency, and global expansion.',
    alternates: {
      canonical: `${baseUrl}${localePath(path, locale)}`,
      languages: generateHreflang(path, baseUrl),
    },
  }
}

export default async function BlogPage() {
  let docs: any[] = [];
  const locale = await getLocale()
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'posts', locale: locale as any, limit: 100 })
    docs = res.docs;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Blog</h1>
      {docs.length === 0 ? (
        <ul><li>No blog posts found.</li></ul>
      ) : (
        <ul>
          {docs.map(doc => (
            <li key={doc.id}>
              <Link href={localePath(`/blog/${doc.slug}`, locale)}>{doc.title || doc.slug}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
