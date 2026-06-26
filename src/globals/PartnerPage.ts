import type { GlobalConfig } from 'payload'

export const PartnerPage: GlobalConfig = {
  slug: 'partnerPage',
  label: 'Philippines Partner Page',
  admin: { group: 'Pages' },
  access: { read: () => true },
  fields: [
    // SEO
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', admin: { description: 'Page <title> tag' } },
        { name: 'metaDesc', type: 'textarea', admin: { description: 'Meta description (150–160 chars)' } },
        { name: 'metaImage', type: 'upload', relationTo: 'media', admin: { description: 'OG / social share image' } },
      ],
    },
    // Urgency bar
    { name: 'urgencyBar', type: 'text', admin: { description: 'Top urgency strip — HTML allowed (wrap key text in <strong>)' } },
    // Hero
    {
      type: 'group',
      name: 'hero',
      fields: [
        { name: 'badge', type: 'text', admin: { description: 'Small badge above headline' } },
        { name: 'heroHeadline', type: 'text', admin: { description: 'Hero H1 — wrap emphasis in <em>…</em>' } },
        { name: 'heroSubhead', type: 'textarea' },
        { name: 'heroCta', type: 'text', admin: { description: 'CTA button label' } },
        { name: 'heroFine', type: 'text', admin: { description: 'Small reassurance text below CTA' } },
      ],
    },
    // Stats bar
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        { name: 'number', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    // How it works
    {
      type: 'group',
      name: 'howItWorks',
      fields: [
        { name: 'howLabel', type: 'text', defaultValue: 'How It Works' },
        { name: 'howHeadline', type: 'text' },
        { name: 'howIntro', type: 'textarea' },
        {
          name: 'steps',
          type: 'array',
          maxRows: 5,
          labels: { singular: 'Step', plural: 'Steps' },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'desc', type: 'textarea', required: true },
          ],
        },
      ],
    },
    // Application form labels
    {
      type: 'group',
      name: 'applySection',
      label: 'Application Form Section',
      fields: [
        { name: 'applyLabel', type: 'text', defaultValue: 'Secure Application' },
        { name: 'applyHeadline', type: 'text', defaultValue: 'Apply for the Network' },
        { name: 'applySubhead', type: 'textarea' },
      ],
    },
    // FAQ
    {
      type: 'group',
      name: 'faqSection',
      label: 'FAQ Section',
      fields: [
        { name: 'faqLabel', type: 'text', defaultValue: 'Common Questions' },
        { name: 'faqHeadline', type: 'text', defaultValue: 'Everything You Need to Know' },
        { name: 'faqIntro', type: 'textarea' },
        {
          name: 'faq',
          type: 'array',
          labels: { singular: 'FAQ', plural: 'FAQs' },
          fields: [
            { name: 'q', type: 'text', required: true },
            { name: 'a', type: 'textarea', required: true },
          ],
        },
      ],
    },
    // Success state
    {
      type: 'group',
      name: 'successState',
      label: 'Success Message (after form submit)',
      fields: [
        { name: 'successTitle', type: 'text', defaultValue: 'Application Received!' },
        { name: 'successBody', type: 'textarea' },
      ],
    },
  ],
}
