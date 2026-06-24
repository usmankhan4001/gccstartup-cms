import type { CollectionConfig } from 'payload'

export const PricingTiers: CollectionConfig = {
  slug: 'pricingTiers',
  labels: { singular: 'Pricing tier', plural: 'Pricing tiers' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug', 'price'], group: 'Content' },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL: /pricing/<slug>' } },
    { name: 'tierLabel', type: 'text', admin: { description: 'e.g. Tier 01' } },
    { name: 'featured', type: 'checkbox', admin: { description: 'Highlight as “Most popular”' } },
    { name: 'price', type: 'text', admin: { description: 'May include HTML, e.g. <sup>$</sup>2,250+' } },
    { name: 'priceNote', type: 'text' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'features',
      type: 'array',
      labels: { singular: 'Feature', plural: "What's included" },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea' },
      ],
    },
    { name: 'whoFor', type: 'array', labels: { singular: 'Who-for', plural: 'Who this is for' }, fields: [{ name: 'item', type: 'text' }] },
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
  ],
}
