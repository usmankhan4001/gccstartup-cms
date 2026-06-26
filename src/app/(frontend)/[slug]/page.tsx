import { getPayload } from 'payload'
import config from '@payload-config'
import Hero from '@/components/blocks/Hero'
import BenefitGrid from '@/components/blocks/BenefitGrid'
import RequirementList from '@/components/blocks/RequirementList'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CountryPage({ params }: PageProps) {
  const { slug } = await params
  let doc: any = null

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'countries',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    doc = res.docs[0] || null
  } catch (error) {
    console.error(`[CountryPage] Database error fetching country "${slug}":`, error)
  }

  if (!doc) {
    notFound()
  }

  const benefits = (doc.benefits || []).map((b: any) => ({ title: b.title, desc: b.desc }))
  const process = (doc.process || []).map((p: any) => ({ title: p.title, desc: p.desc }))
  const docs = (doc.documents || []).map((d: any) => d.item).filter(Boolean)

  return (
    <div className="country-page">
      <Hero 
        headline={doc.headline || `${doc.flag || ''} Company Registration in ${doc.name}`} 
        intro={doc.intro || `Incorporate your business in ${doc.name} legally and optimize your taxes.`} 
      />
      
      <div className="wrap" style={{ padding: '64px 32px' }}>
        {/* Quick Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '64px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div>
            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', display: 'block', textTransform: 'uppercase' }}>Tax Regime</span>
            <strong style={{ fontSize: '18px', color: '#fff' }}>{doc.tax || 'N/A'}</strong>
          </div>
          <div>
            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', display: 'block', textTransform: 'uppercase' }}>Timeline</span>
            <strong style={{ fontSize: '18px', color: '#fff' }}>{doc.timeline || 'N/A'}</strong>
          </div>
          <div>
            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', display: 'block', textTransform: 'uppercase' }}>Starting Cost</span>
            <strong style={{ fontSize: '18px', color: '#fff' }}>{doc.fromPrice || 'N/A'}</strong>
          </div>
          {doc.region && (
            <div>
              <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', display: 'block', textTransform: 'uppercase' }}>Jurisdiction Region</span>
              <strong style={{ fontSize: '18px', color: '#fff', textTransform: 'capitalize' }}>{doc.region}</strong>
            </div>
          )}
        </div>

        {/* Benefits Grid */}
        {benefits.length > 0 && (
          <div style={{ marginBottom: '64px' }}>
            <h2 style={{ marginBottom: '24px', fontSize: '28px' }}>Key Benefits</h2>
            <BenefitGrid benefits={benefits} />
          </div>
        )}

        {/* Requirements and Process */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', marginBottom: '64px' }}>
          {docs.length > 0 && (
            <div>
              <h2 style={{ marginBottom: '24px', fontSize: '28px' }}>Required Documents</h2>
              <RequirementList items={docs} />
            </div>
          )}
          {process.length > 0 && (
            <div>
              <h2 style={{ marginBottom: '24px', fontSize: '28px' }}>Incorporation Process</h2>
              <RequirementList items={process.map(p => `${p.title}: ${p.desc}`)} />
            </div>
          )}
        </div>

        {/* FAQs */}
        {doc.faq && doc.faq.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '64px' }}>
            <h2 style={{ marginBottom: '32px', fontSize: '28px', textAlign: 'center' }}>Frequently Asked Questions</h2>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {doc.faq.map((item: any, idx: number) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '24px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#fff' }}>{item.q}</h4>
                  <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
