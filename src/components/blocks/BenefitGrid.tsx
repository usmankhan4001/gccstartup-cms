import React from 'react';

interface Benefit {
  title: string;
  desc: string;
}

interface BenefitGridProps {
  benefits: Benefit[];
}

export default function BenefitGrid({ benefits }: BenefitGridProps) {
  return (
    <div className="benefit-grid reveal">
      {benefits.map((benefit, i) => (
        <div className="benefit-item" key={i}>
          <span className="benefit-num">
            0{i + 1}
          </span>
          <h3>{benefit.title}</h3>
          <p>{benefit.desc}</p>
        </div>
      ))}
    </div>
  );
}
