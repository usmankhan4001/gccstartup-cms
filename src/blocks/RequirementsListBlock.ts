import type { Block } from 'payload'

export const RequirementsListBlock: Block = {
  slug: 'requirementsList',
  labels: {
    singular: 'Requirements List',
    plural: 'Requirements Lists',
  },
  fields: [
    {
      name: 'requirements',
      type: 'array',
      fields: [
        { name: 'item', type: 'text', required: true },
      ],
    },
  ],
}
