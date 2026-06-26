import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  let docs: any[] = [];
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'posts', limit: 100 })
    docs = res.docs;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  if (docs.length === 0) {
    docs = [
      { id: 'fb-1', slug: 'how-to-register-company-uae', title: 'How to Register a Company in the UAE: The Complete 2026 Guide' },
      { id: 'fb-2', slug: 'singapore-tax-optimization', title: 'Singapore Corporate Tax Optimization Strategies for Tech Startups' },
      { id: 'fb-3', slug: 'nominee-services-explained', title: 'What is a Nominee Director Service and Do You Need One?' }
    ];
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
              <Link href={`/blog/${doc.slug}`}>{doc.title || doc.slug}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
