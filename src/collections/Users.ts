import type { CollectionConfig } from 'payload'
import { isAdmin, isAuthenticated } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email', group: 'System' },
  auth: true,
  access: { create: isAdmin, read: isAuthenticated, update: isAdmin, delete: isAdmin },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'role', type: 'select', options: ['admin', 'editor', 'viewer'], defaultValue: 'editor' },
    { name: 'avatar', type: 'upload', relationTo: 'media' }
  ],
}
