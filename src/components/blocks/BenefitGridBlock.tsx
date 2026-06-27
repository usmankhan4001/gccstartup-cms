import React from 'react';

export const BenefitGridBlock = ({ eyebrow, title, description, benefits }: any) => (
  <section className="section">
    <div className="wrap">
      <div className="section-header reveal">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </div>
      {benefits?.length > 0 && (
        <div className="benefit-grid">
          {benefits.map((b: any, i: number) => (
            <div key={i} className="benefit-item reveal" style={{ transitionDelay: i ? `.0${i * 5}s` : '0s' }}>
              {b.number && <span className="benefit-num">{b.number}</span>}
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);
