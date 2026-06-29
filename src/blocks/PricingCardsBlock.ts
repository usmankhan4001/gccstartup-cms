import type { Block } from 'payload'

export const PricingCardsBlock: Block = {
  slug: 'pricingCards',
  labels: { singular: 'Pricing Cards', plural: 'Pricing Cards' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'tiers',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'name', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'price', type: 'text' },
        { name: 'priceNote', type: 'text', localized: true },
        { name: 'featured', type: 'checkbox', defaultValue: false },
        { name: 'badge', type: 'text', localized: true },
        { name: 'url', type: 'text' },
        {
          name: 'features',
          type: 'array',
          localized: true,
          fields: [{ name: 'item', type: 'text', required: true }],
        },
      ],
    },
  ],
}
