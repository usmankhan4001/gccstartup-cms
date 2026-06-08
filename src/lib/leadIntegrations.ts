/**
 * Twenty CRM + WAHA WhatsApp integrations (folded in from the standalone endpoint).
 * Used by the Leads collection afterChange hook. Framework-agnostic (Node 18+ fetch).
 */

export type LeadData = {
  name?: string
  email?: string
  phone?: string
  country?: string
  interest?: string
  message?: string
  source?: string
  page?: string
}

const TWENTY_BASE_URL = (process.env.TWENTY_BASE_URL || '').replace(/\/$/, '')
const TWENTY_API_KEY = process.env.TWENTY_API_KEY || ''
const WAHA_BASE_URL = (process.env.WAHA_BASE_URL || '').replace(/\/$/, '')
const WAHA_SESSION = process.env.WAHA_SESSION || 'default'
const WAHA_API_KEY = process.env.WAHA_API_KEY || ''
const ADMIN_WHATSAPP = (process.env.ADMIN_WHATSAPP || '').replace(/[^\d]/g, '')
const NOTIFY_LEAD = String(process.env.NOTIFY_LEAD || 'true') === 'true'

const digits = (s?: string) => String(s || '').replace(/[^\d]/g, '')

async function twentyCreate(path: string, payload: Record<string, unknown>) {
  if (!TWENTY_BASE_URL || !TWENTY_API_KEY) return null
  try {
    const res = await fetch(`${TWENTY_BASE_URL}/rest/${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TWENTY_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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

async function wahaSend(numberDigits: string, text: string) {
  if (!WAHA_BASE_URL || !numberDigits) return
  try {
    const res = await fetch(`${WAHA_BASE_URL}/api/sendText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(WAHA_API_KEY ? { 'X-Api-Key': WAHA_API_KEY } : {}) },
      body: JSON.stringify({ session: WAHA_SESSION, chatId: `${numberDigits}@c.us`, text }),
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

/** Fire all notifications. Failures are logged, never thrown. */
export async function notifyLead(d: LeadData) {
  await pushToTwenty(d)
  if (ADMIN_WHATSAPP) await wahaSend(ADMIN_WHATSAPP, adminMessage(d))
  if (NOTIFY_LEAD && d.phone) await wahaSend(digits(d.phone), leadMessage(d))
}
