import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog post', plural: 'Blog' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'publishedAt', '_status'], group: 'Content' },
  versions: { drafts: true },
  access: {
    create: isAdmin,
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL: /blog/<slug>' } },
    { name: 'excerpt', type: 'textarea', localized: true, admin: { description: 'Short summary for listing + meta description fallback' } },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'publishedAt', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'content', type: 'richText', localized: true },
    { name: 'category', type: 'select', options: ['news', 'guide', 'update'] },
    { name: 'readingTime', type: 'number' },
  ],
}
