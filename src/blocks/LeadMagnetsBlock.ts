import type { Block } from 'payload'

export const LeadMagnetsBlock: Block = {
  slug: 'leadMagnets',
  labels: {
    singular: 'Lead Magnets Block',
    plural: 'Lead Magnets Blocks',
  },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'magnets',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}
