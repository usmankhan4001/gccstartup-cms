import type { Block } from 'payload'

export const GlobalCtaBlock: Block = {
  slug: 'globalCta',
  labels: {
    singular: 'Global CTA Block',
    plural: 'Global CTA Blocks',
  },
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'subhead', type: 'textarea' },
    { name: 'primaryBtn', type: 'text' },
    { name: 'primaryLink', type: 'text' },
    { name: 'secondaryBtn', type: 'text' },
    { name: 'secondaryLink', type: 'text' },
  ],
}
