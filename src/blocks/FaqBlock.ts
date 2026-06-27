import type { Block } from 'payload'

export const FaqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ Section',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
      defaultValue: 'Common questions',
    },
    {
      name: 'contactBox',
      type: 'group',
      label: 'Contact Box (Left side)',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Still have questions?' },
        { name: 'description', type: 'textarea', defaultValue: 'WhatsApp us for a direct, honest answer.' },
        { name: 'buttonText', type: 'text', defaultValue: 'WhatsApp us now' },
        { name: 'buttonLink', type: 'text' },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'Questions',
      fields: [
        { name: 'q', type: 'text', required: true, label: 'Question' },
        { name: 'a', type: 'textarea', required: true, label: 'Answer' },
      ],
    },
  ],
}
