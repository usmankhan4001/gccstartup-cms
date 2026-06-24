import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: { group: 'Content' },
  access: { read: () => true },
  fields: [
    {
      type: 'group',
      name: 'hero',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'headline', type: 'text', admin: { description: 'Wrap emphasis in <em>…</em>' } },
        { name: 'subhead', type: 'textarea' },
        { name: 'primaryCta', type: 'text' },
        { name: 'secondaryCta', type: 'text' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'number', type: 'text' },
        { name: 'label', type: 'text' },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      labels: { singular: 'Section header', plural: 'Section headers' },
      admin: { description: 'Editable eyebrow/title/intro for each homepage section' },
      fields: [
        { name: 'key', type: 'text', admin: { description: 'services | jurisdictions | pricing | resources | process' } },
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'intro', type: 'textarea' },
      ],
    },
  ],
}
