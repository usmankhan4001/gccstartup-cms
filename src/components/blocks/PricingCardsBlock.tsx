export function PricingCardsBlock({ eyebrow, title, description, tiers }: any) {
  return (
    <section className="section section-alt" id="tiers">
      <div className="wrap">
        <div className="section-header center reveal">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
        {tiers?.length > 0 && (
          <div className="pricing-grid reveal">
            {tiers.map((tier: any, index: number) => (
              <article key={index} className={`pricing-card ${tier.featured ? 'featured' : ''}`}>
                {tier.badge && <span className="pricing-popular">{tier.badge}</span>}
                {tier.label && <span className="pricing-tier">{tier.label}</span>}
                <div className="pricing-name">{tier.name}</div>
                {tier.description && <p className="pricing-desc">{tier.description}</p>}
                {tier.price && (
                  <div className="pricing-amount">
                    <div className="pricing-price">{tier.price}</div>
                    {tier.priceNote && <div className="pricing-note">{tier.priceNote}</div>}
                  </div>
                )}
                {tier.features?.length > 0 && (
                  <ul className="pricing-list">
                    {tier.features.map((feature: any, featureIndex: number) => (
                      <li key={featureIndex}><span className="pricing-check">✓</span>{feature.item}</li>
                    ))}
                  </ul>
                )}
                {tier.url && <a href={tier.url} className={`pricing-btn ${tier.featured ? 'orange' : 'outline'}`}>View full breakdown →</a>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
