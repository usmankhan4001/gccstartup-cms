import type { CollectionConfig } from 'payload'
import { notifyLead } from '../lib/leadIntegrations'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'country', 'interest', 'createdAt'],
    group: 'Lead Management',
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
    { name: 'phoneDigits', type: 'text', admin: { position: 'sidebar', readOnly: true } },
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
    { name: 'utmSource', type: 'text' },
    { name: 'utmMedium', type: 'text' },
    { name: 'utmCampaign', type: 'text' },
    { name: 'utmContent', type: 'text' },
    { name: 'utmTerm', type: 'text' },
    { name: 'attachments', type: 'relationship', relationTo: 'media', hasMany: true },
    { name: 'referrer', type: 'text' },
    { name: 'assignedTo', type: 'relationship', relationTo: 'users' },
    { name: 'isDuplicate', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', readOnly: true } },
    { name: 'duplicateOf', type: 'relationship', relationTo: 'leads', admin: { position: 'sidebar', readOnly: true } },
    { name: 'duplicateReason', type: 'text', admin: { position: 'sidebar', readOnly: true } },
    {
      name: 'integrationStatus',
      type: 'group',
      admin: { position: 'sidebar', readOnly: true },
      fields: [
        { name: 'twenty', type: 'select', options: ['pending', 'success', 'skipped', 'failed'], defaultValue: 'pending' },
        { name: 'twentyId', type: 'text' },
        { name: 'metaCapi', type: 'select', options: ['pending', 'success', 'skipped', 'failed'], defaultValue: 'pending' },
        { name: 'n8n', type: 'select', options: ['pending', 'success', 'skipped', 'failed'], defaultValue: 'pending' },
        { name: 'waha', type: 'select', options: ['pending', 'success', 'skipped', 'failed'], defaultValue: 'pending' },
        { name: 'lastError', type: 'textarea' },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
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
        }, req.payload)
          .then((integrationStatus) => req.payload.update({
            collection: 'leads',
            id: doc.id,
            overrideAccess: true,
            data: { integrationStatus } as any,
          }))
          .catch((e) => console.error('[leads] notify error', e))
      },
    ],
  },
}
