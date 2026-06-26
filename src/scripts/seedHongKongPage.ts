import { getPayload } from 'payload'
import config from '../payload.config'
import fs from 'fs'
import path from 'path'

async function seedHongKongPage() {
  const payload = await getPayload({ config })
  
  // Since we are running this inside src/scripts, we need to go up to the root, then to the brain folder.
  // Actually, I can just hardcode the path for the seed script.
  const contentPath = 'C:\\Users\\Usman Khan - PCI\\.gemini\\antigravity\\brain\\bb562db9-8632-45f0-a7c0-eafa933241ba\\.system_generated\\steps\\146\\content.md'
  let rawHtml = ''
  try {
    rawHtml = fs.readFileSync(contentPath, 'utf8')
    const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
    if (bodyMatch) {
      rawHtml = bodyMatch[1]
    }
  } catch (e) {
    console.warn('Could not read scraped HTML file, skipping rawHtml insertion.')
  }

  try {
    await payload.create({
      collection: 'landingPages',
      data: {
        title: 'Company Registration in Hong Kong',
        slug: 'hong-kong-registration',
        template: 'lead-capture',
        heroHeadline: 'Hong Kong Company Registration for {{country}} Entrepreneurs',
        heroSubhead: 'Register a Hong Kong company in 2–3 days. 0% tax on foreign-sourced income. Airwallex or Wise banking. No relocation required from {{country}}.',
        rawHtml: rawHtml,
        whatsappConfig: {
          adminMessageTemplate: 'New lead from {{country}} for Hong Kong Registration!\nName: {{name}}\nPhone: {{phone}}',
          leadMessageTemplate: 'Hi {{name}}, thanks for your interest in Hong Kong company registration from {{country}}! Our specialist will reach out to you shortly.',
        },
      }
    })
    console.log('Successfully seeded the Hong Kong landing page!')
  } catch (e) {
    console.error('Failed to seed Hong Kong page:', e)
  }
}

seedHongKongPage()
