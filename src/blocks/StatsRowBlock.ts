import type { Block } from 'payload'

export const StatsRowBlock: Block = {
  slug: 'statsRow',
  labels: {
    singular: 'Stats Row',
    plural: 'Stats Rows',
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'unit', type: 'text' },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}
