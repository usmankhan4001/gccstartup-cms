import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
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
      required: true,
      label: 'Main Headline (Supports HTML for <em>)',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description Text',
    },
    {
      name: 'primaryCta',
      type: 'text',
      label: 'Primary Button Text',
    },
    {
      name: 'primaryCtaLink',
      type: 'text',
      label: 'Primary Button Link (e.g. mailto:...)',
    },
    {
      name: 'proofPoints',
      type: 'array',
      label: 'Proof Points (e.g. 500+ Clients)',
      fields: [
        { name: 'num', type: 'text', required: true, label: 'Number / Highlight' },
        { name: 'label', type: 'text', required: true, label: 'Label' },
      ],
    },
  ],
}
