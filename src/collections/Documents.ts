import type { CollectionConfig } from 'payload'
import { publicReadAdminWrite } from '../access'
import { allowedAttachmentMimeTypes, maxAttachmentBytes } from '../lib/requestGuards'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: { group: 'Content' },
  access: publicReadAdminWrite,
  upload: {
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
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'category',
      type: 'select',
      options: ['guide', 'contract', 'legal', 'brochure'],
    },
  ],
}
