/**
 * Partner application notifications — WAHA WhatsApp to admin.
 * Fired by PartnerApplications afterChange hook on create.
 */

export type PartnerData = {
  fullName:       string
  whatsapp:       string
  city?:          string
  hasPassport?:   boolean
  hasBankAccount?: boolean
  page?:          string
}

const WAHA_BASE_URL  = (process.env.WAHA_BASE_URL  || '').replace(/\/$/, '')
const WAHA_SESSION   = process.env.WAHA_SESSION   || 'default'
const WAHA_API_KEY   = process.env.WAHA_API_KEY   || ''
const ADMIN_WHATSAPP = (process.env.ADMIN_WHATSAPP || '').replace(/[^\d]/g, '')
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || ''

const digits = (s?: string) => String(s || '').replace(/[^\d]/g, '')

async function wahaSend(numberDigits: string, text: string) {
  if (!WAHA_BASE_URL || !numberDigits) return
  try {
    const res = await fetch(`${WAHA_BASE_URL}/api/sendText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(WAHA_API_KEY ? { 'X-Api-Key': WAHA_API_KEY } : {}),
      },
      body: JSON.stringify({ session: WAHA_SESSION, chatId: `${numberDigits}@c.us`, text }),
    })
    if (!res.ok) console.error('[waha-partner] send', res.status, (await res.text()).slice(0, 200))
  } catch (e) {
    console.error('[waha-partner] error', (e as Error).message)
  }
}

const adminMessage = (d: PartnerData) =>
  [
    '🟠 *New Philippines Partner Application*',
    '',
    `*Name:*        ${d.fullName}`,
    `*WhatsApp:*    +${digits(d.whatsapp) || d.whatsapp}`,
    `*City/Region:* ${d.city || '—'}`,
    `*Has Passport:*     ${d.hasPassport    ? '✅ Yes' : '❌ No'}`,
    `*Has Bank Account:* ${d.hasBankAccount ? '✅ Yes' : '❌ No'}`,
    '',
    `*Eligibility:* ${d.hasPassport && d.hasBankAccount ? '✅ Fully eligible' : '⚠️ Partially eligible — review required'}`,
    '',
    `*Source page:* ${d.page || '—'}`,
    '',
    '_Review in CMS → Partners → Partner Applications_',
  ].join('\n')

const applicantMessage = (d: PartnerData) => {
  const first = d.fullName.trim().split(' ')[0] || 'there'
  return [
    `Hi ${first}! 👋 Thank you for applying to the *GCC Startup Verification Network*.`,
    '',
    'Your profile has been successfully logged as a *Priority Tier Partner* in our backend database.',
    '',
    '📋 *What happens next:*',
    'As soon as a corporate client matches your profile, our system will send you a short instructional video directly on WhatsApp with all the details you need.',
    '',
    '✅ No action needed from your side — just keep an eye on your WhatsApp notifications.',
    '',
    'If you have any questions in the meantime, just reply to this message.',
    '',
    '— GCC Startup Partner Team',
  ].join('\n')
}

/** Forward to n8n for human-like WhatsApp typing flow */
async function forwardToN8n(d: PartnerData): Promise<boolean> {
  if (!N8N_WEBHOOK_URL) return false
  const applicantDigits = digits(d.whatsapp)
  const payload = {
    leadChatId:  applicantDigits ? `${applicantDigits}@c.us` : '',
    leadText:    applicantMessage(d),
    adminChatId: ADMIN_WHATSAPP ? `${ADMIN_WHATSAPP}@c.us` : '',
    adminText:   adminMessage(d),
    notifyLead:  Boolean(applicantDigits),
    lead: {
      name:    d.fullName,
      phone:   d.whatsapp,
      city:    d.city,
      source:  'Philippines Partner Application',
    },
  }
  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) console.error('[n8n-partner] forward failed', res.status)
    return true
  } catch (e) {
    console.error('[n8n-partner] error', (e as Error).message)
    return false
  }
}

export async function notifyPartner(d: PartnerData) {
  try {
    const forwarded = await forwardToN8n(d)
    if (!forwarded) {
      // Fallback: direct WAHA
      if (ADMIN_WHATSAPP) {
        await wahaSend(ADMIN_WHATSAPP, adminMessage(d)).catch((e) =>
          console.error('[partner] Fallback WAHA admin send failed:', e)
        )
      }
      const applicantDigits = digits(d.whatsapp)
      if (applicantDigits) {
        await wahaSend(applicantDigits, applicantMessage(d)).catch((e) =>
          console.error('[partner] Fallback WAHA applicant send failed:', e)
        )
      }
    }
  } catch (e) {
    console.error('[partner] Notification routing failed:', e)
  }
}
