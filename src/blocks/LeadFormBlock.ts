import type { Block } from 'payload'

export const LeadFormBlock: Block = {
  slug: 'leadForm',
  labels: { singular: 'Lead Form', plural: 'Lead Forms' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'formType',
      type: 'select',
      defaultValue: 'lead',
      options: [
        { label: 'Lead', value: 'lead' },
        { label: 'Partner', value: 'partner' },
        { label: 'Contact', value: 'contact' },
      ],
    },
    { name: 'submitButtonText', type: 'text', localized: true },
    { name: 'successMessage', type: 'textarea', localized: true },
    { name: 'redirectUrl', type: 'text' },
  ],
}
