'use client';
import React, { useState, useEffect } from 'react';

export const LeadModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [context, setContext] = useState('');

  useEffect(() => {
    (window as any).openLeadModal = (ctx?: string) => {
      setContext(ctx || '');
      setIsOpen(true);
      setIsSuccess(false);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.page = window.location.pathname;
    data.ts = new Date().toISOString();

    try {
      await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      setIsSuccess(true);
    } catch (err) { console.error(err); }
  };

  if (!isOpen) return null;

  return (
    <div className="lead-overlay show" onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}>
      <div className="lead-modal">
        <button className="lead-close" onClick={() => setIsOpen(false)}>✕</button>
        <div className="lead-head">
          <span className="eyebrow">Get started</span>
          <h3>Request a free consultation</h3>
          <p>{context ? `${context} — a specialist replies within 24 hours.` : 'A specialist replies within 24 hours. No obligation.'}</p>
        </div>
        {!isSuccess ? (
          <form className="lead-body" onSubmit={handleSubmit}>
            <div className="lead-row">
              <div className="lead-field"><label>Full name *</label><input name="name" required /></div>
              <div className="lead-field"><label>Email *</label><input type="email" name="email" required /></div>
            </div>
            <div className="lead-row">
              <div className="lead-field"><label>Phone number *</label><input type="tel" name="phone" required /></div>
              <div className="lead-field">
                <label>Country of residence *</label>
                <select name="country" required>
                  <option value="">Select country...</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="UK">United Kingdom</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
            <div className="lead-field">
              <label>How can we help? (Optional)</label>
              <textarea name="message" rows={3}></textarea>
            </div>
            <input type="hidden" name="source" value={context || window.location.pathname} />
            <button type="submit" className="btn btn-fill btn-arrow" style={{ width: '100%', justifyContent: 'center' }}>Send my enquiry</button>
          </form>
        ) : (
          <div className="lead-success on"><div className="ls-ic">✓</div><strong>Thank you!</strong><br />We’ll reply within 24 hours.</div>
        )}
      </div>
    </div>
  );
};
