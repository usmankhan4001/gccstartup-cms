import type { Block } from 'payload'

export const BenefitGridBlock: Block = {
  slug: 'benefitGrid',
  labels: {
    singular: 'Benefit Grid',
    plural: 'Benefit Grids',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      fields: [
        { name: 'number', type: 'text', label: 'Number / Label (e.g. 01, 100%)' },
        { name: 'title', type: 'text', required: true, label: 'Benefit Title' },
        { name: 'description', type: 'textarea', required: true, label: 'Benefit Description' },
      ],
    },
  ],
}
