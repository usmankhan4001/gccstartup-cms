/**
 * Twenty CRM + WAHA WhatsApp + Meta CAPI integrations.
 * Used by the Leads collection afterChange hook. Framework-agnostic (Node 18+ fetch).
 */
import crypto from 'crypto'

export type LeadData = {
  name?: string
  email?: string
  phone?: string
  country?: string
  interest?: string
  message?: string
  source?: string
  page?: string
  // Meta click tracking (passed from UTM/fbclid on the landing page)
  fbclid?: string
  clientIp?: string
  userAgent?: string
  eventId?: string
}

const TWENTY_BASE_URL = (process.env.TWENTY_BASE_URL || '').replace(/\/$/, '')
const TWENTY_API_KEY = process.env.TWENTY_API_KEY || ''
// Meta Conversions API
const META_PIXEL_ID    = process.env.META_PIXEL_ID || ''
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN || ''
const META_TEST_CODE   = process.env.META_TEST_EVENT_CODE || '' // remove after testing

const digits = (s?: string) => String(s || '').replace(/[^\d]/g, '')

async function twentyCreate(path: string, payload: Record<string, unknown>) {
  if (!TWENTY_BASE_URL || !TWENTY_API_KEY) return null
  try {
    const res = await fetch(`${TWENTY_BASE_URL}/rest/${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TWENTY_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) {
      console.error(`[twenty] ${path} ${res.status}`, (await res.text()).slice(0, 300))
      return null
    }
    return await res.json()
  } catch (e) {
    console.error('[twenty] error', (e as Error).message)
    return null
  }
}

export async function pushToTwenty(d: LeadData) {
  const [firstName, ...rest] = String(d.name || '').trim().split(' ')
  const person = await twentyCreate('people', {
    name: { firstName: firstName || d.name || 'Website', lastName: rest.join(' ') || 'Lead' },
    emails: { primaryEmail: d.email || '' },
    phones: d.phone ? { primaryPhoneNumber: digits(d.phone) } : undefined,
    jobTitle: d.interest || '',
    city: d.country || '',
  })
  const personId = person?.data?.createPerson?.id || person?.data?.id || person?.id || null

  const body = [
    `Interest: ${d.interest || '—'}`,
    `Country: ${d.country || '—'}`,
    `Phone: ${d.phone || '—'}`,
    `Email: ${d.email || '—'}`,
    `Source: ${d.source || '—'}`,
    `Page: ${d.page || '—'}`,
    '',
    d.message || '(no message)',
  ].join('\n')
  const note = await twentyCreate('notes', { title: `Website enquiry — ${d.name || 'Lead'}`, body })
  const noteId = note?.data?.id || note?.id
  if (noteId && personId) await twentyCreate('noteTargets', { noteId, personId })
  return personId
}

async function wahaSend(numberDigits: string, text: string, config: any) {
  if (!config.wahaBaseUrl || !numberDigits) return
  try {
    const res = await fetch(`${config.wahaBaseUrl}/api/sendText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(config.wahaApiKey ? { 'X-Api-Key': config.wahaApiKey } : {}) },
      body: JSON.stringify({ session: config.wahaSession, chatId: `${numberDigits}@c.us`, text }),
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) console.error('[waha] send', res.status, (await res.text()).slice(0, 200))
  } catch (e) {
    console.error('[waha] error', (e as Error).message)
  }
}

const adminMessage = (d: LeadData) =>
  [
    '🟠 *New GCC Startup lead*',
    `*Name:* ${d.name || '—'}`,
    `*Email:* ${d.email || '—'}`,
    `*Phone:* ${d.phone || '—'}`,
    `*Country:* ${d.country || '—'}`,
    `*Needs:* ${d.interest || '—'}`,
    `*Message:* ${d.message || '—'}`,
    `*Source:* ${d.source || '—'}`,
  ].join('\n')

const leadMessage = (d: LeadData) => {
  const first = String(d.name || '').trim().split(' ')[0] || 'there'
  return [
    `Hi ${first}, thanks for reaching out to *GCC Startup*! 👋`,
    '',
    `We’ve received your enquiry${d.country ? ` about *${d.country}*` : ''} and a specialist will reply within 24 hours.`,
    '',
    'If it’s urgent, just reply here on WhatsApp.',
  ].join('\n')
}

/** Forward the lead to n8n, which runs the human-like WhatsApp sequence. */
async function forwardToN8n(d: LeadData, config: any): Promise<boolean> {
  if (!config.n8nWebhookUrl) return false
  const payload = {
    // composed messages — n8n only adds the typing/wait/send behavior
    leadChatId: d.phone ? `${digits(d.phone)}@c.us` : '',
    leadText: leadMessage(d),
    adminChatId: config.adminWhatsapp ? `${config.adminWhatsapp}@c.us` : '',
    adminText: adminMessage(d),
    notifyLead: config.notifyLead && Boolean(d.phone),
    lead: {
      name: d.name, email: d.email, phone: d.phone, country: d.country,
      interest: d.interest, message: d.message, source: d.source, page: d.page,
    },
  }
  try {
    const res = await fetch(config.n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    })
    if (!res.ok) {
      console.error('[n8n] forward failed', res.status)
      return false
    }
    return true
  } catch (e) {
    console.error('[n8n] error', (e as Error).message)
    return false
  }
}

// SHA-256 hash helper — Meta requires PII to be hashed
const sha256 = (s: string) => crypto.createHash('sha256').update(s.trim().toLowerCase()).digest('hex')

/** Send a Lead event to Meta Conversions API. Silently no-ops if not configured. */
async function sendMetaCapi(d: LeadData) {
  if (!META_PIXEL_ID || !META_ACCESS_TOKEN) return
  try {
    const userData: Record<string, string> = {}
    if (d.email) userData['em'] = sha256(d.email)
    if (d.phone) userData['ph'] = sha256(digits(d.phone))
    if (d.name) {
      const [first, ...rest] = d.name.trim().split(' ')
      if (first) userData['fn'] = sha256(first)
      if (rest.length) userData['ln'] = sha256(rest.join(' '))
    }
    if (d.clientIp)  userData['client_ip_address'] = d.clientIp
    if (d.userAgent) userData['client_user_agent']  = d.userAgent
    if (d.fbclid)    userData['fbc'] = `fb.1.${Date.now()}.${d.fbclid}`

    const event: Record<string, unknown> = {
      event_name:  'Lead',
      event_time:  Math.floor(Date.now() / 1000),
      event_id:    d.eventId || crypto.randomUUID(),
      action_source: 'website',
      event_source_url: d.page || '',
      user_data:   userData,
      custom_data: {
        content_name:     'Tax Guide Download',
        content_category: d.source || 'Website Lead',
        currency:         'USD',
        value:            0,
      },
    }

    const body: Record<string, unknown> = { data: [event] }
    if (META_TEST_CODE) body['test_event_code'] = META_TEST_CODE

    const res = await fetch(
      `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(4000) }
    )
    if (!res.ok) console.error('[meta-capi] failed', res.status, (await res.text()).slice(0, 300))
    else console.log('[meta-capi] Lead event sent')
  } catch (e) {
    console.error('[meta-capi] error', (e as Error).message)
  }
}

/** Fire all notifications. Failures are logged, never thrown. */
export async function notifyLead(d: LeadData, payload?: any) {
  await Promise.all([
    pushToTwenty(d).catch((e) => console.error('[leads] Twenty CRM push failed:', e)),
    sendMetaCapi(d).catch((e) => console.error('[leads] Meta CAPI send failed:', e)),
  ])

  let config = {
    wahaBaseUrl: (process.env.WAHA_BASE_URL || '').replace(/\/$/, ''),
    wahaSession: process.env.WAHA_SESSION || 'default',
    wahaApiKey: process.env.WAHA_API_KEY || '',
    adminWhatsapp: (process.env.ADMIN_WHATSAPP || '').replace(/[^\d]/g, ''),
    notifyLead: String(process.env.NOTIFY_LEAD || 'true') === 'true',
    n8nWebhookUrl: process.env.N8N_WEBHOOK_URL || ''
  }

  if (payload) {
    try {
      const settings = await payload.findGlobal({ slug: 'wahaSettings' })
      if (settings) {
        if (settings.wahaBaseUrl) config.wahaBaseUrl = settings.wahaBaseUrl.replace(/\/$/, '')
        if (settings.wahaSession) config.wahaSession = settings.wahaSession
        if (settings.wahaApiKey) config.wahaApiKey = settings.wahaApiKey
        if (settings.adminWhatsappNumber) config.adminWhatsapp = settings.adminWhatsappNumber.replace(/[^\d]/g, '')
        if (settings.notifyLead !== undefined && settings.notifyLead !== null) config.notifyLead = settings.notifyLead
        if (settings.n8nWebhookUrl) config.n8nWebhookUrl = settings.n8nWebhookUrl
      }
    } catch (e) {
      console.error('[leads] failed to load wahaSettings from payload', e)
    }
  }

  try {
    // Prefer n8n (human-like typing). Only fall back to direct WAHA if n8n isn't configured.
    const forwarded = await forwardToN8n(d, config)
    if (!forwarded) {
      if (config.adminWhatsapp) {
        await wahaSend(config.adminWhatsapp, adminMessage(d), config).catch((e) =>
          console.error('[leads] WAHA admin send failed:', e)
        )
      }
      if (config.notifyLead && d.phone) {
        await wahaSend(digits(d.phone), leadMessage(d), config).catch((e) =>
          console.error('[leads] WAHA lead send failed:', e)
        )
      }
    }
  } catch (e) {
    console.error('[leads] WhatsApp routing failed:', e)
  }
}
