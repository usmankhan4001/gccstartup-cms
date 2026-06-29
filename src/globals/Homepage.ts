import type { GlobalConfig } from 'payload'
import { isAdmin, publicRead } from '../access'
import {
  HeroBlock,
  StatsRowBlock,
  ServicesGridBlock,
  JurisdictionsGridBlock,
  PricingDetailBlock,
  ProcessStepsBlock,
  FaqBlock,
  TestimonialsBlock,
  GlobalCtaBlock,
  LeadMagnetsBlock,
  TickerBlock,
  PricingCardsBlock,
  ComparisonToolBlock,
  JurisdictionQuizBlock,
  LeadFormBlock,
} from '../blocks'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: { group: 'Pages' },
  access: { read: publicRead, update: isAdmin },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      localized: true,
      blocks: [
        HeroBlock,
        TickerBlock,
        StatsRowBlock,
        ServicesGridBlock,
        JurisdictionsGridBlock,
        PricingCardsBlock,
        ComparisonToolBlock,
        JurisdictionQuizBlock,
        LeadFormBlock,
        PricingDetailBlock,
        ProcessStepsBlock,
        FaqBlock,
        TestimonialsBlock,
        GlobalCtaBlock,
        LeadMagnetsBlock,
      ],
    },
    {
      name: 'seo',
      type: 'group',
      localized: true,
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
