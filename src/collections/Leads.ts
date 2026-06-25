import type { CollectionConfig } from 'payload'
import { notifyLead } from '../lib/leadIntegrations'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'country', 'interest', 'createdAt'],
    group: 'Sales',
  },
  access: {
    // Creates come through the /api/lead endpoint (overrideAccess), not directly.
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'country', type: 'text' },
    { name: 'interest', type: 'text' },
    { name: 'message', type: 'textarea' },
    { name: 'source', type: 'text', admin: { description: 'Which CTA/context produced this lead' } },
    { name: 'page', type: 'text' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: ['new', 'contacted', 'qualified', 'won', 'lost'],
    },
    { name: 'fbclid', type: 'text', admin: { position: 'sidebar' } },
    { name: 'clientIp', type: 'text', admin: { position: 'sidebar' } },
    { name: 'userAgent', type: 'text', admin: { position: 'sidebar' } },
    { name: 'eventId', type: 'text', admin: { position: 'sidebar' } },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return
        // Fire-and-forget: never block the response or fail the save.
        notifyLead({
          name: doc.name,
          email: doc.email,
          phone: doc.phone,
          country: doc.country,
          interest: doc.interest,
          message: doc.message,
          source: doc.source,
          page: doc.page,
          fbclid: doc.fbclid,
          clientIp: doc.clientIp,
          userAgent: doc.userAgent,
          eventId: doc.eventId,
        }).catch((e) => console.error('[leads] notify error', e))
      },
    ],
  },
}
