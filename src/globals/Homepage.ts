import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: { group: 'Pages' },
  access: { read: () => true },
  fields: [
    // ── Hero ──
    {
      type: 'group',
      name: 'hero',
      fields: [
        { name: 'eyebrow', type: 'text', admin: { description: 'Small tag above headline e.g. "Company Formation · Global Banking · Tax Residency"' } },
        { name: 'headline', type: 'text', admin: { description: 'Hero H1 — wrap emphasis in <em>…</em>' } },
        { name: 'subhead', type: 'textarea' },
        { name: 'primaryCta', type: 'text', admin: { description: 'Primary button label' } },
        { name: 'secondaryCta', type: 'text', admin: { description: 'Secondary button label' } },
      ],
    },
    // ── Stats bar ──
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Stat', plural: 'Stats bar' },
      fields: [
        { name: 'number', type: 'text', admin: { description: 'e.g. 500+' } },
        { name: 'label', type: 'text', admin: { description: 'e.g. Entrepreneurs served' } },
      ],
    },
    // ── Section headers (eyebrow / title / intro for each homepage section) ──
    {
      name: 'sections',
      type: 'array',
      labels: { singular: 'Section header', plural: 'Section headers' },
      admin: { description: 'Editable eyebrow / title / intro for each homepage section' },
      fields: [
        {
          name: 'key',
          type: 'select',
          options: [
            { label: 'Services', value: 'services' },
            { label: 'Jurisdictions', value: 'jurisdictions' },
            { label: 'Pricing / Tiers', value: 'pricing' },
            { label: 'Resources / Guides', value: 'resources' },
            { label: 'Process', value: 'process' },
            { label: 'FAQ', value: 'faq' },
            { label: 'Jurisdiction finder quiz', value: 'finder' },
          ],
          admin: { description: 'Which section this overrides' },
        },
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'intro', type: 'textarea' },
      ],
    },
    // ── Process steps ──
    {
      name: 'process',
      type: 'array',
      labels: { singular: 'Step', plural: 'Process steps' },
      admin: { description: 'The "How it works" steps shown on the homepage' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea' },
      ],
    },
    // ── Footer CTA override ──
    {
      type: 'group',
      name: 'footerCta',
      label: 'Footer CTA section',
      fields: [
        { name: 'headline', type: 'text' },
        { name: 'subhead', type: 'textarea' },
        { name: 'primaryCta', type: 'text' },
        { name: 'secondaryCta', type: 'text' },
      ],
    },
    // ── FAQ ──
    {
      name: 'faq',
      type: 'array',
      fields: [
        { name: 'q', type: 'text' },
        { name: 'a', type: 'textarea' },
      ],
    },
    // ── Testimonials ──
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        { name: 'quote', type: 'textarea' },
        { name: 'author', type: 'text' },
        { name: 'role', type: 'text' },
        { name: 'company', type: 'text' },
      ],
    },
  ],
}
