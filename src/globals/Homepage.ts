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
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'headline', type: 'text', localized: true, admin: { description: 'Wrap emphasis in <em>…</em>' } },
        { name: 'subhead', type: 'textarea', localized: true },
        { name: 'primaryCta', type: 'text', localized: true },
        { name: 'secondaryCta', type: 'text', localized: true },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      localized: true,
      maxRows: 4,
      fields: [
        { name: 'number', type: 'text' },
        { name: 'label', type: 'text' },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      localized: true,
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
