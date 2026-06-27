import type { Block } from 'payload'

export const JurisdictionsGridBlock: Block = {
  slug: 'jurisdictionsGrid',
  labels: {
    singular: 'Jurisdictions Grid',
    plural: 'Jurisdictions Grids',
  },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'jurisdictions',
      type: 'array',
      fields: [
        { name: 'region', type: 'text', label: 'Region Filter Tab (e.g. Middle East)' },
        { name: 'flag', type: 'text' },
        { name: 'name', type: 'text', required: true },
        { name: 'rate', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'timeline', type: 'text' },
        { name: 'price', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}
