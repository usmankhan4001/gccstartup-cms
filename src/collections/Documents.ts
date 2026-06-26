import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: { group: 'Content' },
  access: { read: () => true },
  upload: true,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'category',
      type: 'select',
      options: ['guide', 'contract', 'legal', 'brochure'],
    },
  ],
}
