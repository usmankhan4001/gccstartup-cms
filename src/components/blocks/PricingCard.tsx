import React from 'react';

interface PricingFeature {
  title: string;
  desc: string;
}

interface PricingCardProps {
  features: PricingFeature[];
}

export default function PricingCard({ features }: PricingCardProps) {
  return (
    <div className="pd-feature-grid reveal">
      {features.map((feature, i) => (
        <div className="pd-feature" key={i}>
          <h4>
            <span className="pdf-ic">✓</span>
            {feature.title}
          </h4>
          <p>{feature.desc}</p>
        </div>
      ))}
    </div>
  );
}
