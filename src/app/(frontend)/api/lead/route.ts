import { NextResponse } from 'next/server'
import { notifyLead } from '@/lib/leadIntegrations'
import { cleanString, digits, getClientIp, isEmail, rateLimit } from '@/lib/requestGuards'

export async function POST(req: Request) {
  const ip = getClientIp(req)
  if (!rateLimit(`lead:${ip}`, 8, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const lead = {
    name: cleanString(body.name, 120),
    email: cleanString(body.email, 160).toLowerCase(),
    phone: cleanString(body.phone || body.whatsapp, 80),
    country: cleanString(body.country, 120),
    interest: cleanString(body.interest || body.service || body.stage, 180),
    message: cleanString(body.message || body.business || body.biz, 1000),
    source: cleanString(body.source, 180) || 'Static website',
    page: cleanString(body.page || req.headers.get('referer'), 500),
    fbclid: cleanString(body.fbclid, 200),
    eventId: cleanString(body.eventId, 120),
    clientIp: ip,
    userAgent: cleanString(req.headers.get('user-agent'), 500),
  }

  if (!lead.email && !digits(lead.phone)) {
    return NextResponse.json({ error: 'Email or phone is required' }, { status: 400 })
  }
  if (lead.email && !isEmail(lead.email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const integrations = await notifyLead(lead)
  return NextResponse.json({ ok: true, integrations })
}
