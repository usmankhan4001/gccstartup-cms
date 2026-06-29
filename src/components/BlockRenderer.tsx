import React from 'react'
import { HeroBlock } from './blocks/HeroBlock'
import { SubheroBlock } from './blocks/SubheroBlock'
import { BenefitGridBlock } from './blocks/BenefitGridBlock'
import { ProcessStepsBlock } from './blocks/ProcessStepsBlock'
import { FaqBlock } from './blocks/FaqBlock'
import { PricingDetailBlock } from './blocks/PricingDetailBlock'
import { TickerBlock } from './blocks/TickerBlock'
import { PricingCardsBlock } from './blocks/PricingCardsBlock'
import { ComparisonToolBlock } from './blocks/ComparisonToolBlock'
import { JurisdictionQuizBlock } from './blocks/JurisdictionQuizBlock'
import { LeadFormBlock } from './blocks/LeadFormBlock'

const StatsRowBlock = ({ stats }: any) => {
  const items = stats || []
  if (!items.length) return null
  return (
    <div className="stats-row">
      {items.map((item: any, index: number) => (
        <div key={index} className="stat-cell reveal">
          <span className="stat-n">{item.value || item.number}</span>
          <div className="stat-l">{item.label}</div>
        </div>
      ))}
    </div>
  )
}

const CardGridBlock = ({ eyebrow, title, description, items, services, jurisdictions, magnets, testimonials, blockType }: any) => {
  const list = items || services || jurisdictions || magnets || testimonials || []
  if (!list.length && !title) return null
  return (
    <section className={blockType === 'leadMagnets' ? 'section section-blue' : 'section'}>
      <div className="wrap">
        <div className="section-header reveal">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
        {list.length > 0 && (
          <div className={blockType === 'leadMagnets' ? 'magnets-grid' : 'services-grid'}>
            {list.map((item: any, index: number) => (
              <article key={index} className={blockType === 'leadMagnets' ? 'magnet-item reveal' : 'service-item reveal'}>
                {(item.label || item.number) && <span className={blockType === 'leadMagnets' ? 'magnet-label' : 'svc-num'}>{item.label || item.number}</span>}
                <h3>{item.title || item.name}</h3>
                {item.description && <p>{item.description}</p>}
                {item.timeline || item.price ? <div className="jur-meta"><span>{item.timeline}</span><strong>{item.price}</strong></div> : null}
                {item.url && <a href={item.url} className={blockType === 'leadMagnets' ? 'magnet-link' : 'svc-link'}>{item.linkLabel || item.linkText || 'Learn more'} →</a>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

const RequirementsBlock = ({ eyebrow, title, description, requirements }: any) => {
  const items = requirements || []
  if (!items.length) return null
  return (
    <section className="section section-alt">
      <div className="wrap">
        <div className="section-header reveal">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
        <ul className="req-list reveal">
          {items.map((item: any, index: number) => <li key={index}><span className="req-ic">✓</span>{item.item}</li>)}
        </ul>
      </div>
    </section>
  )
}

const GlobalCtaBlock = ({ title, headline, description, subhead, primaryCta, primaryCtaLink, primaryBtn, primaryLink, secondaryCta, secondaryCtaLink, secondaryBtn, secondaryLink }: any) => (
  <section className="cta-block">
    <div className="wrap">
      <div className="cta-inner">
        <div>
          {(title || headline) && <h2>{title || headline}</h2>}
          {(description || subhead) && <p>{description || subhead}</p>}
        </div>
        <div className="cta-actions">
          {(primaryCta || primaryBtn) && <a href={primaryCtaLink || primaryLink || '#'} className="btn btn-fill btn-arrow">{primaryCta || primaryBtn}</a>}
          {(secondaryCta || secondaryBtn) && <a href={secondaryCtaLink || secondaryLink || '#'} className="btn btn-stroke">{secondaryCta || secondaryBtn}</a>}
        </div>
      </div>
    </div>
  </section>
)

const components: Record<string, React.ComponentType<any>> = {
  hero: HeroBlock,
  ticker: TickerBlock,
  subhero: SubheroBlock,
  benefitGrid: BenefitGridBlock,
  processSteps: ProcessStepsBlock,
  faq: FaqBlock,
  pricingDetail: PricingDetailBlock,
  pricingCards: PricingCardsBlock,
  comparisonTool: ComparisonToolBlock,
  jurisdictionQuiz: JurisdictionQuizBlock,
  leadForm: LeadFormBlock,
  requirementsList: RequirementsBlock,
  statsRow: StatsRowBlock,
  servicesGrid: CardGridBlock,
  jurisdictionsGrid: CardGridBlock,
  testimonials: CardGridBlock,
  leadMagnets: CardGridBlock,
  globalCta: GlobalCtaBlock,
}

export function BlockRenderer({ blocks }: { blocks?: any[] | null }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Component = components[block.blockType]
        if (!Component) return null
        return <Component key={block.id || index} {...block} />
      })}
    </>
  )
}
