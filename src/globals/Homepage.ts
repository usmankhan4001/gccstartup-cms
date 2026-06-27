import type { GlobalConfig } from 'payload'
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
} from '../blocks'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  admin: { group: 'Pages' },
  access: { read: () => true },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
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
