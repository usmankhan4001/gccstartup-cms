import React from 'react';
import { ChatIcon, TargetIcon, FileCheckIcon, CheckIcon } from '../Icons';

const PROC_ICONS = [ChatIcon, TargetIcon, FileCheckIcon, CheckIcon];

export const ProcessStepsBlock = ({ eyebrow, title, description, steps }: any) => (
  <section className="section section-alt">
    <div className="wrap">
      <div className="section-header reveal">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
      </div>
      {steps?.length > 0 && (
        <div className="process-grid">
          {steps.map((p: any, i: number) => {
            const Icon = PROC_ICONS[i % 4];
            return (
              <div key={i} className="process-step reveal" style={{ transitionDelay: i ? `.0${i * 8}s` : '0s' }}>
                <div className="step-ic"><span className="ico"><Icon /></span></div>
                <span className="step-n">0{i + 1}</span>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </section>
);
