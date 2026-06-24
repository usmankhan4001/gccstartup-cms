import type { CollectionConfig } from 'payload'

export const Countries: CollectionConfig = {
  slug: 'countries',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug', 'tax', 'fromPrice'], group: 'Content' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL: /<slug>  e.g. uae, hongkong' } },
    { name: 'flag', type: 'text', admin: { description: 'Emoji flag, e.g. 🇦🇪' } },
    { name: 'region', type: 'select', options: ['gulf', 'asia', 'europe', 'offshore'] },
    {
      type: 'row',
      fields: [
        { name: 'tax', type: 'text', localized: true, admin: { width: '33%', description: 'e.g. 0% corporate tax' } },
        { name: 'timeline', type: 'text', localized: true, admin: { width: '33%', description: 'e.g. ~30 days incl. visit' } },
        { name: 'fromPrice', type: 'text', admin: { width: '34%', description: 'e.g. $1,500' } },
      ],
    },
    { name: 'workDays', type: 'number', admin: { description: 'Working days needed (timeline calculator)' } },
    { name: 'headline', type: 'text', localized: true, admin: { description: 'Hero headline. Wrap emphasis in <em>…</em>' } },
    { name: 'intro', type: 'textarea', localized: true },
    {
      name: 'benefits',
      type: 'array',
      localized: true,
      labels: { singular: 'Benefit', plural: 'Benefits' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea' },
      ],
    },
    { name: 'documents', type: 'array', localized: true, labels: { singular: 'Document', plural: 'Documents' }, fields: [{ name: 'item', type: 'text' }] },
    {
      name: 'process',
      type: 'array',
      localized: true,
      labels: { singular: 'Step', plural: 'Process steps' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea' },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      localized: true,
      labels: { singular: 'FAQ', plural: 'FAQs' },
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
      ],
    },
  ],
}
