import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug'], group: 'Content' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL: /services/<slug>' } },
    { name: 'icon', type: 'select', options: ['building', 'bank', 'shield', 'box', 'id', 'refresh'], admin: { description: 'Icon key' } },
    { name: 'headline', type: 'text', admin: { description: 'Hero headline. Wrap emphasis in <em>…</em>' } },
    { name: 'intro', type: 'textarea' },
    {
      name: 'statChips',
      type: 'array',
      labels: { singular: 'Stat chip', plural: 'Stat chips' },
      maxRows: 3,
      fields: [
        { name: 'value', type: 'text' },
        { name: 'label', type: 'text' },
      ],
    },
    {
      name: 'features',
      type: 'array',
      labels: { singular: 'Feature', plural: "What's included" },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea' },
      ],
    },
    {
      name: 'process',
      type: 'array',
      labels: { singular: 'Step', plural: 'Process steps' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea' },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      labels: { singular: 'FAQ', plural: 'FAQs' },
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
      ],
    },
    {
      name: 'relatedLinks',
      type: 'array',
      labels: { singular: 'Related link', plural: 'Related links (bottom CTA row)' },
      maxRows: 3,
      admin: { description: 'Up to 3 buttons shown in the "Related options" row at the bottom of the page' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true, admin: { description: 'Relative path e.g. /pricing/nominee-ubo or absolute URL' } },
      ],
    },
  ],
}
