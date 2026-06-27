'use client';
import React, { useState } from 'react';

export const FaqClient = ({ items }: { items: { q: string; a: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list reveal" style={{ transitionDelay: '.1s' }}>
      {items.map((f, i) => (
        <div key={i} className="faq-item">
          <div className={`faq-q ${openIndex === i ? 'open' : ''}`} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            {f.q} <span className="faq-icon">+</span>
          </div>
          <div className={`faq-a ${openIndex === i ? 'open' : ''}`}>
            <div dangerouslySetInnerHTML={{ __html: f.a }} />
          </div>
        </div>
      ))}
    </div>
  );
};
