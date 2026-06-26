import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const res = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
  
  const doc = res.docs[0]
  if (!doc) {
    notFound()
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{doc.title || doc.slug}</h1>
      <p><Link href="/blog">&larr; Back to blog</Link></p>
      <hr/>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
        {JSON.stringify(doc, null, 2)}
      </pre>
    </div>
  )
}
