import type { Block } from 'payload'

export const TickerBlock: Block = {
  slug: 'ticker',
  labels: { singular: 'Ticker Strip', plural: 'Ticker Strips' },
  fields: [
    {
      name: 'items',
      type: 'array',
      localized: true,
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
