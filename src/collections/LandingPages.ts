import type { CollectionConfig } from 'payload'
import { isAdmin, publishedOrAuthenticated } from '../access'
import {
  HeroBlock,
  SubheroBlock,
  BenefitGridBlock,
  ProcessStepsBlock,
  FaqBlock,
  PricingDetailBlock,
  InteractiveToolsBlock,
  RequirementsListBlock,
  TickerBlock,
  PricingCardsBlock,
  ComparisonToolBlock,
  JurisdictionQuizBlock,
  LeadFormBlock
} from '../blocks'

export const LandingPages: CollectionConfig = {
  slug: 'landingPages',
  admin: { group: 'Pages' },
  access: {
    create: isAdmin,
    read: publishedOrAuthenticated,
    update: isAdmin,
    delete: isAdmin,
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        TickerBlock,
        SubheroBlock,
        BenefitGridBlock,
        ProcessStepsBlock,
        FaqBlock,
        PricingDetailBlock,
        PricingCardsBlock,
        ComparisonToolBlock,
        JurisdictionQuizBlock,
        LeadFormBlock,
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
