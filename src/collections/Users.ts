import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email', group: 'System' },
  auth: true,
  access: { read: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'role', type: 'select', options: ['admin', 'editor', 'viewer'], defaultValue: 'editor' },
    { name: 'avatar', type: 'upload', relationTo: 'media' }
  ],
}
