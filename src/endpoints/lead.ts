import type { Endpoint } from 'payload'
import { attachmentIds, cleanString, digits, getClientIp, isEmail, maxAttachmentCount, rateLimit } from '../lib/requestGuards'

/**
 * Public lead intake: POST /api/lead
 * The website's lead form posts here. We create a Leads doc with elevated access
 * (the collection itself is admin-only for create), which fires the afterChange
 * hook → Twenty CRM + WAHA WhatsApp. Responds {ok:true} immediately.
 */
export const leadEndpoint: Endpoint = {
  path: '/lead',
  method: 'post',
  handler: async (req) => {
    let body: Record<string, any> = {}
    try {
      if (req.headers.get('content-type')?.includes('multipart/form-data') && req.formData) {
        const formData = await req.formData()
        for (const [key, value] of formData.entries()) {
          if (body[key]) {
            if (Array.isArray(body[key])) body[key].push(value)
            else body[key] = [body[key], value]
          } else {
            body[key] = value
          }
        }
        if (typeof body.attachments === 'string' && body.attachments.startsWith('[')) {
          try { body.attachments = JSON.parse(body.attachments) } catch {}
        }
      } else {
        body = (await req.json?.()) ?? {}
      }
    } catch {
      body = {}
    }

    const clientIp = getClientIp(req)
    if (!rateLimit(`lead:${clientIp}`, 8, 60_000)) {
      return Response.json({ ok: false, error: 'too many requests' }, { status: 429 })
    }

    const email = cleanString(body.email, 254).toLowerCase()
    const phone = cleanString(body.phone, 40)
    const phoneDigits = digits(phone)

    if (!email && !phoneDigits) {
      return Response.json({ ok: false, error: 'email or phone required' }, { status: 422 })
    }
    if (email && !isEmail(email)) {
      return Response.json({ ok: false, error: 'valid email required' }, { status: 422 })
    }
    if (phone && phoneDigits.length < 7) {
      return Response.json({ ok: false, error: 'valid phone required' }, { status: 422 })
    }

    const attachments = attachmentIds(body.attachments)
    if (attachments.length > maxAttachmentCount) {
      return Response.json({ ok: false, error: `maximum ${maxAttachmentCount} attachments allowed` }, { status: 422 })
    }

    const duplicateClauses = [
      email ? { email: { equals: email } } : null,
      phoneDigits ? { phoneDigits: { equals: phoneDigits } } : null,
    ].filter(Boolean)
    let duplicate: any = null

    if (duplicateClauses.length > 0) {
      try {
        const existing = await req.payload.find({
          collection: 'leads',
          overrideAccess: true,
          where: duplicateClauses.length === 1 ? duplicateClauses[0] as any : { or: duplicateClauses as any[] },
          limit: 1,
          sort: '-createdAt',
        })
        duplicate = existing.docs[0] || null
      } catch (e) {
        req.payload.logger.error({ msg: 'lead duplicate lookup failed', err: e })
      }
    }

    try {
      await req.payload.create({
        collection: 'leads',
        overrideAccess: true,
        data: {
          name:      cleanString(body.name, 120),
          email,
          phone,
          phoneDigits,
          country:   cleanString(body.country, 120),
          interest:  cleanString(body.interest, 160),
          message:   cleanString(body.message, 2000),
          source:    cleanString(body.source, 160),
          page:      cleanString(body.page, 500),
          // Meta CAPI enrichment — passed from the browser alongside the form data
          fbclid:    cleanString(body.fbclid, 500),
          clientIp,
          userAgent: req.headers.get('user-agent') || '',
          eventId:   cleanString(body.eventId, 120),
          attachments,
          utmSource: cleanString(body.utmSource, 120),
          utmMedium: cleanString(body.utmMedium, 120),
          utmCampaign: cleanString(body.utmCampaign, 160),
          utmContent: cleanString(body.utmContent, 160),
          utmTerm:   cleanString(body.utmTerm, 160),
          referrer:  cleanString(body.referrer, 500),
          isDuplicate: Boolean(duplicate),
          duplicateOf: duplicate?.id,
          duplicateReason: duplicate ? (duplicate.email === email ? 'email' : 'phone') : undefined,
        } as any,
      })
    } catch (e) {
      req.payload.logger.error({ msg: 'lead create failed', err: e })
      return Response.json({ ok: false, error: 'failed to save lead' }, { status: 500 })
    }

    return Response.json({ ok: true })
  },
}
