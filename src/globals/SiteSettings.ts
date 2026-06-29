import type { GlobalConfig } from 'payload'
import { isAdmin, publicRead } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  admin: { group: 'System' },
  access: { read: publicRead, update: isAdmin },
  fields: [
    { name: 'brandName', type: 'text', defaultValue: 'GCC Startup', localized: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'siteUrl', type: 'text', admin: { description: 'Production URL e.g. https://cms.gccstartup.com — used for canonical tags' } },
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
    {
      name: 'navMenu',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', localized: true },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'announcementBar',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox' },
        { name: 'text', type: 'text', localized: true },
        { name: 'link', type: 'text' },
      ],
    },
    {
      name: 'defaultSeo',
      type: 'group',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
