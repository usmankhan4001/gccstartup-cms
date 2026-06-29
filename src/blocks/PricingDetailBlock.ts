import type { Block } from 'payload'

export const PricingDetailBlock: Block = {
  slug: 'pricingDetail',
  labels: {
    singular: 'Pricing Detail',
    plural: 'Pricing Details',
  },
  fields: [
    {
      name: 'price',
      type: 'text',
      label: 'Main Price (e.g. $1,500)',
      required: true,
    },
    {
      name: 'priceNote',
      type: 'text',
      label: 'Price Note (e.g. + 5% VAT)',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features Grid',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'whoFor',
      type: 'array',
      label: 'Who is this for?',
      fields: [
        { name: 'item', type: 'text', required: true },
      ],
    },
  ],
}
