import type { Endpoint } from 'payload'
import { attachmentIds, cleanString, digits, getClientIp, isEmail, maxAttachmentCount, rateLimit } from '../lib/requestGuards'

/**
 * Public partner application intake: POST /api/partner-apply
 * Philippines verification network recruitment page posts here.
 * Creates a PartnerApplications doc → afterChange hook → WAHA admin + applicant.
 */
export const partnerEndpoint: Endpoint = {
  path: '/partner-apply',
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
    if (!rateLimit(`partner:${clientIp}`, 5, 60_000)) {
      return Response.json({ ok: false, error: 'too many requests' }, { status: 429 })
    }

    const fullName = cleanString(body.fullName, 120)
    const whatsapp = cleanString(body.whatsapp, 40)
    const email = cleanString(body.email, 254).toLowerCase()

    if (!fullName || !digits(whatsapp)) {
      return Response.json(
        { ok: false, error: 'fullName and whatsapp are required' },
        { status: 422 },
      )
    }
    if (email && !isEmail(email)) {
      return Response.json({ ok: false, error: 'valid email required' }, { status: 422 })
    }

    const attachments = attachmentIds(body.attachments)
    if (attachments.length > maxAttachmentCount) {
      return Response.json({ ok: false, error: `maximum ${maxAttachmentCount} attachments allowed` }, { status: 422 })
    }

    try {
      await req.payload.create({
        collection: 'partner-applications',
        overrideAccess: true,
        data: {
          fullName,
          whatsapp,
          city:           cleanString(body.city, 120),
          hasPassport:    Boolean(body.hasPassport),
          hasBankAccount: Boolean(body.hasBankAccount),
          page:           cleanString(body.page || req.headers.get('referer') || '', 500),
          email,
          attachments,
        },
      })
    } catch (e) {
      req.payload.logger.error({ msg: 'partner-apply create failed', err: e })
      return Response.json({ ok: false, error: 'failed to save application' }, { status: 500 })
    }

    return Response.json({ ok: true })
  },
}
