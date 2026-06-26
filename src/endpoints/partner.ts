import type { Endpoint } from 'payload'

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
      if (req.headers.get('content-type')?.includes('multipart/form-data')) {
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

    if (!body.fullName || !body.whatsapp) {
      return Response.json(
        { ok: false, error: 'fullName and whatsapp are required' },
        { status: 422 },
      )
    }

    try {
      await req.payload.create({
        collection: 'partner-applications',
        overrideAccess: true,
        data: {
          fullName:       body.fullName,
          whatsapp:       body.whatsapp,
          city:           body.city,
          hasPassport:    Boolean(body.hasPassport),
          hasBankAccount: Boolean(body.hasBankAccount),
          page:           body.page || req.headers.get('referer') || '',
          email:          body.email,
          attachments:    body.attachments,
        },
      })
    } catch (e) {
      req.payload.logger.error({ msg: 'partner-apply create failed', err: e })
    }

    return Response.json({ ok: true })
  },
}
