import React from 'react';
import { CheckIcon } from '../Icons';

export const PricingDetailBlock = ({ price, priceNote, features, whoFor, ctaLabel, ctaUrl }: any) => (
  <section className="section section-alt">
    <div className="wrap">
      <div className="pricing-grid">
        <div className="pricing-card featured reveal">
          <div className="pricing-tier">Overview</div>
          <div className="pricing-amount">{price}</div>
          {priceNote && <div className="pricing-note">{priceNote}</div>}
          <div className="pricing-list">
            {features?.map((f: any, i: number) => (
              <div key={i} className="pricing-check">
                <CheckIcon />
                <div>
                  <strong>{f.title}</strong>
                  <p>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
          <a className="btn btn-fill btn-arrow" href={ctaUrl || '#lead-form'}>{ctaLabel || 'Get started'}</a>
        </div>
        {whoFor?.length > 0 && (
          <div className="pricing-card reveal" style={{ transitionDelay: '.1s' }}>
            <h3>Who is this for?</h3>
            <ul className="req-list" style={{ marginTop: '24px' }}>
              {whoFor.map((w: any, i: number) => (
                <li key={i}><span className="req-ic">✓</span>{w.item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  </section>
);
