import type { CollectionConfig } from 'payload'
import { notifyPartner } from '../lib/partnerIntegrations'

export const PartnerApplications: CollectionConfig = {
  slug: 'partner-applications',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'whatsapp', 'city', 'hasPassport', 'hasBankAccount', 'status', 'createdAt'],
    group: 'Lead Management',
  },
  access: {
    create: ({ req }) => Boolean(req.user),
    read:   ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'fullName',       type: 'text',    required: true },
    { name: 'whatsapp',       type: 'text',    required: true },
    { name: 'city',           type: 'text' },
    { name: 'hasPassport',    type: 'checkbox', defaultValue: false },
    { name: 'hasBankAccount', type: 'checkbox', defaultValue: false },
    { name: 'page',           type: 'text' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New',       value: 'new' },
        { label: 'Reviewing', value: 'reviewing' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Approved',  value: 'approved' },
        { label: 'Rejected',  value: 'rejected' },
        { label: 'Matched',   value: 'matched' },
        { label: 'Paid',      value: 'paid' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Internal notes about this applicant' },
    },
    { name: 'attachments', type: 'relationship', relationTo: 'media', hasMany: true },
    { name: 'email', type: 'email' },
    {
      name: 'notesTimeline',
      type: 'array',
      fields: [
        { name: 'date', type: 'date' },
        { name: 'note', type: 'textarea' },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation !== 'create') return
        notifyPartner({
          fullName:       doc.fullName,
          whatsapp:       doc.whatsapp,
          city:           doc.city,
          hasPassport:    doc.hasPassport,
          hasBankAccount: doc.hasBankAccount,
          page:           doc.page,
        }).catch((e) => console.error('[partner] notify error', e))
      },
    ],
  },
}
