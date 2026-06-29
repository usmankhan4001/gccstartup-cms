import type { Block } from 'payload'

export const JurisdictionQuizBlock: Block = {
  slug: 'jurisdictionQuiz',
  labels: { singular: 'Jurisdiction Quiz', plural: 'Jurisdiction Quizzes' },
  fields: [
    { name: 'eyebrow', type: 'text', localized: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'callout', type: 'textarea', localized: true },
    {
      name: 'questions',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true, localized: true },
        {
          name: 'answers',
          type: 'array',
          minRows: 1,
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'value', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'results',
      type: 'array',
      fields: [
        { name: 'flag', type: 'text' },
        { name: 'name', type: 'text', required: true, localized: true },
        { name: 'rate', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'matchValue', type: 'text', admin: { description: 'Answer value that should trigger this result.' } },
        { name: 'ctaLabel', type: 'text', localized: true },
        { name: 'ctaUrl', type: 'text' },
      ],
    },
  ],
}
