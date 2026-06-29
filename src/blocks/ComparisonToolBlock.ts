import type { Block } from 'payload'

export const ComparisonToolBlock: Block = {
  slug: 'comparisonTool',
  labels: { singular: 'Comparison Tool', plural: 'Comparison Tools' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'options',
      type: 'array',
      fields: [
        { name: 'key', type: 'text', required: true },
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'tax', type: 'text', localized: true },
        { name: 'timeline', type: 'text', localized: true },
        { name: 'banking', type: 'text', localized: true },
        { name: 'ownership', type: 'text', localized: true },
        { name: 'price', type: 'text' },
      ],
    },
    { name: 'ctaLabel', type: 'text', localized: true },
    { name: 'ctaUrl', type: 'text' },
  ],
}
