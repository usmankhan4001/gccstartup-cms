import { GlobalConfig } from 'payload'
import { adminField, isAdmin } from '../access'

export const WahaSettings: GlobalConfig = {
  slug: 'wahaSettings',
  admin: {
    group: 'System',
  },
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    { name: 'wahaBaseUrl', type: 'text' },
    { name: 'wahaSession', type: 'text', defaultValue: 'default' },
    { name: 'wahaApiKey', type: 'text', access: { read: adminField, update: adminField } },
    { name: 'adminWhatsappNumber', type: 'text' },
    { name: 'notifyLead', type: 'checkbox', defaultValue: true },
    { name: 'n8nWebhookUrl', type: 'text', access: { read: adminField, update: adminField } },
  ],
}
