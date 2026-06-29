import type { Block } from 'payload'

export const SubheroBlock: Block = {
  slug: 'subhero',
  labels: {
    singular: 'Subhero Section',
    plural: 'Subhero Sections',
  },
  fields: [
    {
      name: 'watermark',
      type: 'text',
      label: 'Background Watermark / Emoji',
    },
    {
      name: 'breadcrumbs',
      type: 'array',
      label: 'Breadcrumbs',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'flag',
      type: 'text',
      label: 'Flag Emoji',
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
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'style', type: 'select', options: ['primary', 'outline'] },
      ],
    },
    {
      name: 'metaPoints',
      type: 'array',
      label: 'Bottom Meta Points (e.g. Tax Rate, Timeline)',
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Value (e.g. 0% or ~30 days)' },
        { name: 'label', type: 'text', required: true, label: 'Label' },
      ],
    },
  ],
}
