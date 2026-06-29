import type { Block } from 'payload'

export const InteractiveToolsBlock: Block = {
  slug: 'interactiveTools',
  labels: {
    singular: 'Interactive Tools (Doc Checker & Timeline)',
    plural: 'Interactive Tools',
  },
  fields: [
    {
      name: 'showDocChecker',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showTimelineCalculator',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'workingDays',
      type: 'number',
      label: 'Working Days for setup',
      defaultValue: 18,
    },
  ],
}
