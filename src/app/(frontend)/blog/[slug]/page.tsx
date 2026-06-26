import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import RichText from '@/components/RichText'

export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let doc: any = null

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1 })
    doc = res.docs[0] || null
  } catch (error) {
    console.error(`Error fetching blog post [slug: ${slug}]:`, error);
  }
  
  if (!doc) {
    const fallbackPosts: Record<string, any> = {
      'how-to-register-company-uae': {
        title: 'How to Register a Company in the UAE: The Complete 2026 Guide',
        slug: 'how-to-register-company-uae',
        excerpt: 'Learn the exact steps, costs, and timeline required to incorporate a free zone or mainland company in the UAE.',
        content: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [
                  { type: 'text', text: 'Registering a company in the UAE has become one of the most popular strategies for global entrepreneurs seeking tax optimization and access to international markets.' }
                ]
              },
              {
                type: 'heading',
                tag: 'h2',
                children: [{ type: 'text', text: 'Steps to Register' }]
              },
              {
                type: 'list',
                tag: 'ul',
                children: [
                  { type: 'listitem', children: [{ type: 'text', text: 'Choose Free Zone vs Mainland' }] },
                  { type: 'listitem', children: [{ type: 'text', text: 'Submit Name Reservation & Legal Documents' }] },
                  { type: 'listitem', children: [{ type: 'text', text: 'Apply for Establishment Card & Visas' }] }
                ]
              }
            ]
          }
        }
      },
      'singapore-tax-optimization': {
        title: 'Singapore Corporate Tax Optimization Strategies for Tech Startups',
        slug: 'singapore-tax-optimization',
        excerpt: 'An overview of Singapores tax exemptions, startup schemes, and corporate benefits.',
        content: {
          root: {
            children: [
              {
                type: 'paragraph',
                children: [
                  { type: 'text', text: 'Singapore is renowned for its business-friendly tax regime, boasting a low flat corporate tax rate of 17% along with generous startup tax exemption schemes.' }
                ]
              }
            ]
          }
        }
      }
    };

    doc = fallbackPosts[slug] || {
      title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      slug: slug,
      excerpt: 'Learn how to expand your business globally and establish tax-optimized corporate structures.',
      content: {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'This guide covers corporate setup, banking requirements, and local regulations to successfully establish your presence in this jurisdiction.' }
              ]
            }
          ]
        }
      }
    };
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{doc.title || doc.slug}</h1>
      <p><Link href="/blog">&larr; Back to blog</Link></p>
      <hr style={{ margin: '1.5rem 0' }}/>
      
      {doc.content && (
        <div style={{ marginBottom: '2.5rem' }}>
          <RichText content={doc.content} />
        </div>
      )}

      <details>
        <summary style={{ cursor: 'pointer', color: 'var(--blue)', fontWeight: 500 }}>View Post JSON Data</summary>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#f4f4f4', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
          {JSON.stringify(doc, null, 2)}
        </pre>
      </details>
    </div>
  )
}
