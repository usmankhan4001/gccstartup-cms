import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const formatCountry = (c: string) => {
  return c.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export default async function LandingPage({ params }: { params: Promise<{ country: string, slug: string }> }) {
  const { country, slug } = await params
  const countryName = formatCountry(country)
  
  const payload = await getPayload({ config })
  const res = await payload.find({ collection: 'landingPages', where: { slug: { equals: slug } }, limit: 1 })
  
  const doc = res.docs[0]
  if (!doc) {
    notFound()
  }
  
  const headline = doc.heroHeadline 
    ? doc.heroHeadline.replace(/{{country}}/gi, countryName) 
    : 'Landing Page'
    
  const subhead = doc.heroSubhead 
    ? doc.heroSubhead.replace(/{{country}}/gi, countryName) 
    : ''
    
  const chatBubblePath = path.join(process.cwd(), 'embeds', '4-whatsapp-chat-bubble.html')
  const promoBannerPath = path.join(process.cwd(), 'embeds', '3-promo-banner.html')
  
  const chatBubble = fs.existsSync(chatBubblePath) ? fs.readFileSync(chatBubblePath, 'utf8') : ''
  const promoBanner = fs.existsSync(promoBannerPath) ? fs.readFileSync(promoBannerPath, 'utf8') : ''

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{headline}</h1>
      <p>{subhead}</p>
      <hr/>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
        {JSON.stringify(doc, null, 2)}
      </pre>
      
      {/* CTAs */}
      {promoBanner && <div dangerouslySetInnerHTML={{ __html: promoBanner }} />}
      {chatBubble && <div dangerouslySetInnerHTML={{ __html: chatBubble }} />}
    </div>
  )
}
