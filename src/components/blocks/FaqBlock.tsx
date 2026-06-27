import React from 'react';
import { FaqClient } from '../Interactive/FaqClient';

export const FaqBlock = ({ title, contactBox, faqs }: any) => (
  <section className="section" id="faq">
    <div className="wrap">
      <div className="faq-layout">
        <div className="faq-left reveal">
          {title && <h2>{title}</h2>}
          {contactBox && (
            <div className="faq-contact">
              {contactBox.title && <h4>{contactBox.title}</h4>}
              {contactBox.description && <p>{contactBox.description}</p>}
              {contactBox.buttonText && <a href={contactBox.buttonLink || '#'} className="btn btn-fill">{contactBox.buttonText}</a>}
            </div>
          )}
        </div>
        {faqs?.length > 0 && <FaqClient items={faqs} />}
      </div>
    </div>
  </section>
);
