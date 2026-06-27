import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

import { HeroBlock } from '@/components/blocks/HeroBlock'
import { SubheroBlock } from '@/components/blocks/SubheroBlock'
import { BenefitGridBlock } from '@/components/blocks/BenefitGridBlock'
import { ProcessStepsBlock } from '@/components/blocks/ProcessStepsBlock'
import { FaqBlock } from '@/components/blocks/FaqBlock'
import { PricingDetailBlock } from '@/components/blocks/PricingDetailBlock'
import { LeadModal } from '@/components/Interactive/LeadModal'

const BLOCK_COMPONENTS: Record<string, React.FC<any>> = {
  hero: HeroBlock,
  subhero: SubheroBlock,
  benefitGrid: BenefitGridBlock,
  processSteps: ProcessStepsBlock,
  faq: FaqBlock,
  pricingDetail: PricingDetailBlock,
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug ? resolvedParams.slug.join('/') : 'home';

  const payload = await getPayload({ config })
  
  // Try to find a LandingPage matching this slug
  const pages = await payload.find({
    collection: 'landingPages',
    where: { slug: { equals: slugPath } },
    depth: 2,
  })

  const page = pages.docs[0]

  if (!page) {
    notFound()
  }

  return (
    <>
      <main>
        {page.layout?.map((block: any, index: number) => {
          const Component = BLOCK_COMPONENTS[block.blockType]
          if (Component) {
            return <Component key={index} {...block} />
          }
          return <div key={index}>Block type "{block.blockType}" not implemented.</div>
        })}
      </main>
      <LeadModal />
    </>
  )
}
