import type { CollectionConfig } from 'payload'

export const LandingPages: CollectionConfig = {
  slug: 'landingPages',
  admin: { group: 'Pages' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'template',
      type: 'select',
      options: ['lead-capture', 'partner-recruitment', 'service-promo', 'custom'],
    },
    { name: 'heroHeadline', type: 'text' },
    { name: 'heroSubhead', type: 'textarea' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'content', type: 'richText' },
    { name: 'rawHtml', type: 'textarea', admin: { description: 'Legacy HTML fallback if richText is not used.' } },
    {
      name: 'formConfig',
      type: 'group',
      fields: [
        { name: 'formType', type: 'select', options: ['contact', 'lead', 'partner'] },
        { name: 'submitButtonText', type: 'text' },
        { name: 'successMessage', type: 'textarea' },
        { name: 'redirectUrl', type: 'text' },
      ],
    },
    {
      name: 'whatsappConfig',
      type: 'group',
      fields: [
        { 
          name: 'adminMessageTemplate', 
          type: 'textarea', 
          admin: { description: 'Use {{name}}, {{phone}}, {{country}} as variables' }
        },
        { 
          name: 'leadMessageTemplate', 
          type: 'textarea' 
        },
      ],
    },
    { name: 'utmSource', type: 'text' },
    { name: 'utmMedium', type: 'text' },
    { name: 'utmCampaign', type: 'text' },
  ],
}
