import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email', group: 'System' },
  auth: true,
  access: { read: ({ req }) => Boolean(req.user) },
  fields: [{ name: 'name', type: 'text' }],
}
