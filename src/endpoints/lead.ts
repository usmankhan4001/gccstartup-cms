import type { Endpoint } from 'payload'

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
      body = (await req.json?.()) ?? {}
    } catch {
      body = {}
    }

    if (!body.email && !body.phone) {
      return Response.json({ ok: false, error: 'email or phone required' }, { status: 422 })
    }

    try {
      await req.payload.create({
        collection: 'leads',
        overrideAccess: true,
        data: {
          name:      body.name,
          email:     body.email,
          phone:     body.phone,
          country:   body.country,
          interest:  body.interest,
          message:   body.message,
          source:    body.source,
          page:      body.page,
          // Meta CAPI enrichment — passed from the browser alongside the form data
          fbclid:    body.fbclid,
          clientIp:  req.headers.get('x-forwarded-for')?.split(',')[0].trim()
                     || req.headers.get('cf-connecting-ip')
                     || '',
          userAgent: req.headers.get('user-agent') || '',
          eventId:   body.eventId,
        },
      })
    } catch (e) {
      req.payload.logger.error({ msg: 'lead create failed', err: e })
      // Still return ok so the visitor isn't shown an error; we logged it.
    }

    return Response.json({ ok: true })
  },
}
