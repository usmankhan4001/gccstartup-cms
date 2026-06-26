import type { CollectionConfig } from 'payload'

export const FormSubmissions: CollectionConfig = {
  slug: 'formSubmissions',
  admin: { group: 'Lead Management' },
  fields: [
    { name: 'formName', type: 'text' },
    { name: 'data', type: 'json' },
    { name: 'page', type: 'text' },
    { name: 'attachments', type: 'relationship', relationTo: 'media', hasMany: true },
    {
      name: 'status',
      type: 'select',
      options: ['new', 'processed'],
      defaultValue: 'new',
    },
  ],
}
