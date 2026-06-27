import type { CollectionConfig } from 'payload'
import {
  HeroBlock,
  SubheroBlock,
  BenefitGridBlock,
  ProcessStepsBlock,
  FaqBlock,
  PricingDetailBlock,
  InteractiveToolsBlock,
  RequirementsListBlock
} from '../blocks'

export const LandingPages: CollectionConfig = {
  slug: 'landingPages',
  admin: { group: 'Pages' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        SubheroBlock,
        BenefitGridBlock,
        ProcessStepsBlock,
        FaqBlock,
        PricingDetailBlock,
        InteractiveToolsBlock,
        RequirementsListBlock
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
