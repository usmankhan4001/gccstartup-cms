import type { CollectionConfig } from 'payload'
import { authenticatedOnly } from '../access'

export const FormSubmissions: CollectionConfig = {
  slug: 'formSubmissions',
  admin: { group: 'Lead Management' },
  access: authenticatedOnly,
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
