'use client';

import React, { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface PartnerFaqAccordionProps {
  faq: FaqItem[];
}

export default function PartnerFaqAccordion({ faq }: PartnerFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-list">
      {faq.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div className="faq-item" key={i}>
            <div 
              className={`faq-q ${isOpen ? 'open' : ''}`} 
              onClick={() => toggleIndex(i)}
            >
              <span>{item.q}</span>
              <span className="faq-icon">+</span>
            </div>
            <div 
              className={`faq-a ${isOpen ? 'open' : ''}`}
              style={{
                maxHeight: isOpen ? '500px' : '0',
                paddingBottom: isOpen ? '22px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.35s ease, padding 0.25s'
              }}
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
