import React from 'react';
import { SkylineIcon } from '../Icons';

export const HeroBlock = ({ eyebrow, title, description, primaryCta, primaryCtaLink, proofPoints }: any) => (
  <section className="hero">
    <div className="wrap">
      <div className="hero-inner">
        <div className="hero-copy">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
          <div className="hero-btns">
            {primaryCta && <a href={primaryCtaLink} className="btn btn-fill btn-arrow">{primaryCta}</a>}
          </div>
          {proofPoints?.length > 0 && (
            <div className="hero-proof">
              {proofPoints.map((s: any, i: number) => (
                <div key={i} className="hero-proof-item">
                  <span className="hero-proof-num">{s.num}</span>
                  <span className="hero-proof-label">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>{/* Space for Cost Estimator or Form */}</div>
      </div>
    </div>
    <SkylineIcon />
  </section>
);
