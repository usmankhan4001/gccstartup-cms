import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const payload = await getPayload({ config })
  const res = await payload.find({ collection: 'posts', limit: 100 })

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Blog</h1>
      {res.docs.length === 0 ? (
        <ul><li>No blog posts found.</li></ul>
      ) : (
        <ul>
          {res.docs.map(doc => (
            <li key={doc.id}>
              <Link href={`/blog/${doc.slug}`}>{doc.title || doc.slug}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
