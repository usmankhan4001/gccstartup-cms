import type { CollectionConfig } from 'payload'
import { publicReadAdminWrite } from '../access'
import { allowedAttachmentMimeTypes, maxAttachmentBytes } from '../lib/requestGuards'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'System' },
  access: publicReadAdminWrite,
  upload: {
    // Stored on disk by default. For Dokploy, mount a volume at this path (see docker-compose).
    staticDir: process.env.MEDIA_DIR || 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'hero', width: 1600 },
    ],
    mimeTypes: allowedAttachmentMimeTypes,
  },
  hooks: {
    beforeValidate: [
      ({ req }) => {
        const file = (req as any).file
        if (file?.size > maxAttachmentBytes || file?.filesize > maxAttachmentBytes) {
          throw new Error('Maximum upload size is 10 MB')
        }
      },
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
