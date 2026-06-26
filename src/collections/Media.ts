import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'System' },
  access: { read: () => true },
  upload: {
    // Stored on disk by default. For Dokploy, mount a volume at this path (see docker-compose).
    staticDir: process.env.MEDIA_DIR || 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'hero', width: 1600 },
    ],
  },
  fields: [
    { name: 'alt', type: 'text' },
    { name: 'caption', type: 'text' },
    { name: 'credit', type: 'text' },
    {
      name: 'category',
      type: 'select',
      options: ['image', 'video', 'document', 'other'],
    },
  ],
}
