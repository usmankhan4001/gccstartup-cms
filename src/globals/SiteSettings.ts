import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  admin: { group: 'System' },
  access: { read: () => true },
  fields: [
    { name: 'brandName', type: 'text', defaultValue: 'GCC Startup' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      type: 'group',
      name: 'contact',
      fields: [
        { name: 'email', type: 'email', defaultValue: 'info@gccstartup.com' },
        { name: 'whatsappNumber', type: 'text', admin: { description: 'Digits incl. country code (used for wa.me + WAHA)' } },
      ],
    },
    {
      type: 'group',
      name: 'footer',
      fields: [
        { name: 'about', type: 'textarea', localized: true },
        { name: 'legal', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'social',
      type: 'array',
      fields: [
        { name: 'platform', type: 'select', options: ['linkedin', 'x', 'whatsapp', 'telegram'] },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}
