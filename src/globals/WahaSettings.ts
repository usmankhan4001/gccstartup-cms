import { GlobalConfig } from 'payload'

export const WahaSettings: GlobalConfig = {
  slug: 'wahaSettings',
  admin: {
    group: 'System',
  },
  fields: [
    { name: 'wahaBaseUrl', type: 'text' },
    { name: 'wahaSession', type: 'text', defaultValue: 'default' },
    { name: 'wahaApiKey', type: 'text' },
    { name: 'adminWhatsappNumber', type: 'text' },
    { name: 'notifyLead', type: 'checkbox', defaultValue: true },
    { name: 'n8nWebhookUrl', type: 'text' },
  ],
}
