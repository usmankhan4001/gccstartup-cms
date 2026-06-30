import { NextResponse } from 'next/server'
import { notifyPartner } from '@/lib/partnerIntegrations'
import { pushToTwenty } from '@/lib/leadIntegrations'
import { cleanString, digits, getClientIp, isEmail, rateLimit } from '@/lib/requestGuards'

export async function POST(req: Request) {
  const ip = getClientIp(req)
  if (!rateLimit(`partner:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const application = {
    fullName: cleanString(body.fullName || body.name, 140),
    email: cleanString(body.email, 160).toLowerCase(),
    whatsapp: cleanString(body.whatsapp || body.phone, 80),
    city: cleanString(body.city, 120),
    hasPassport: Boolean(body.hasPassport),
    hasBankAccount: Boolean(body.hasBankAccount),
    page: cleanString(body.page || req.headers.get('referer'), 500),
  }

  if (!application.fullName || !digits(application.whatsapp)) {
    return NextResponse.json({ error: 'Full name and WhatsApp are required' }, { status: 400 })
  }
  if (application.email && !isEmail(application.email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const [twenty] = await Promise.all([
    pushToTwenty({
      name: application.fullName,
      email: application.email,
      phone: application.whatsapp,
      country: 'Philippines',
      interest: 'Philippines Partner Application',
      message: [
        `City/Region: ${application.city || '-'}`,
        `Has passport: ${application.hasPassport ? 'Yes' : 'No'}`,
        `Has bank account: ${application.hasBankAccount ? 'Yes' : 'No'}`,
      ].join('\n'),
      source: 'Philippines Partner Application',
      page: application.page,
      clientIp: ip,
      userAgent: cleanString(req.headers.get('user-agent'), 500),
    }),
    notifyPartner(application),
  ])

  return NextResponse.json({ ok: true, integrations: { twenty } })
}
