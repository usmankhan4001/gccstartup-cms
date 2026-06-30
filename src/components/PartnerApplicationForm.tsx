'use client';

import React, { useState } from 'react';

interface PartnerApplicationFormProps {
  applyLabel?: string;
  applyHeadline?: string;
  applySubhead?: string;
  successTitle?: string;
  successBody?: string;
}

export default function PartnerApplicationForm({
  applyLabel = 'Secure Application',
  applyHeadline = 'Apply for the Network',
  applySubhead = 'Join the GCC Startup Verification Network as a local partner. Fill out the application form below.',
  successTitle = 'Application Received!',
  successBody = 'Thank you for applying. A representative will contact you on WhatsApp within 24 hours to schedule your onboarding call.',
}: PartnerApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    city: '',
    hasPassport: false,
    hasBankAccount: false,
  });

  const [files, setFiles] = useState<{ id: string; name: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    setIsUploading(true);
    setErrorMessage('');

    try {
      const uploadedList: { id: string; name: string }[] = [...files];
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        uploadedList.push({ id: `${Date.now()}-${i}-${file.name}`, name: file.name });
      }
      setFiles(uploadedList);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error uploading files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.whatsapp) {
      setErrorMessage('Full name and WhatsApp number are required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        whatsapp: formData.whatsapp,
        city: formData.city,
        hasPassport: formData.hasPassport,
        hasBankAccount: formData.hasBankAccount,
        page: typeof window !== 'undefined' ? window.location.href : '',
        attachments: files.map((f) => f.name),
      };

      const res = await fetch('/api/partner-apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to submit application.');
      }

      setSubmitStatus('success');
    } catch (err: any) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div 
        id="partner-form-section"
        className="estimator" 
        style={{ 
          padding: '48px 32px', 
          maxWidth: '640px', 
          margin: '0 auto', 
          textAlign: 'center', 
          background: 'var(--blue-lt)', 
          border: '1px solid var(--blue)',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(27, 79, 216, 0.08)'
        }}
      >
        <div 
          style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'var(--blue)', 
            color: 'var(--white)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '32px', 
            margin: '0 auto 24px auto',
            fontWeight: 'bold'
          }}
        >
          ✓
        </div>
        <h3 style={{ fontSize: '24px', color: 'var(--ink)', marginBottom: '16px' }}>{successTitle}</h3>
        <p style={{ color: 'var(--body)', fontSize: '16px', lineHeight: '1.7', whiteSpace: 'pre-line' }}>{successBody}</p>
      </div>
    );
  }

  return (
    <div 
      id="partner-form-section"
      className="estimator reveal" 
      style={{ 
        maxWidth: '680px', 
        margin: '0 auto', 
        background: 'var(--white)', 
        border: '1px solid var(--line)',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(17, 24, 39, 0.05)',
        overflow: 'hidden'
      }}
    >
      <div style={{ background: 'var(--blue-dkr)', padding: '32px', color: 'var(--white)' }}>
        <span className="eyebrow" style={{ color: 'var(--orange)', marginBottom: '8px' }}>{applyLabel}</span>
        <h3 style={{ color: 'var(--white)', fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>{applyHeadline}</h3>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', lineHeight: '1.5' }}>{applySubhead}</p>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-mobile">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink)' }}>Full Name *</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              required 
              placeholder="Juan Dela Cruz"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1.5px solid var(--line)',
                fontSize: '14px',
                fontFamily: 'inherit',
                width: '100%',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink)' }}>Email Address *</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required
              placeholder="juan@gmail.com"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1.5px solid var(--line)',
                fontSize: '14px',
                fontFamily: 'inherit',
                width: '100%',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="form-grid-mobile">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink)' }}>WhatsApp Number *</label>
            <input 
              type="tel" 
              name="whatsapp" 
              value={formData.whatsapp} 
              onChange={handleChange} 
              required
              placeholder="+63 917 123 4567"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1.5px solid var(--line)',
                fontSize: '14px',
                fontFamily: 'inherit',
                width: '100%',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink)' }}>City of Residence</label>
            <input 
              type="text" 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              placeholder="e.g., Metro Manila"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1.5px solid var(--line)',
                fontSize: '14px',
                fontFamily: 'inherit',
                width: '100%',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg)', padding: '16px', borderRadius: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink)' }}>Qualifications Check</span>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', color: 'var(--body)' }}>
            <input 
              type="checkbox" 
              name="hasPassport" 
              checked={formData.hasPassport} 
              onChange={handleChange}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            I have a valid Passport (for international compliance verification)
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', color: 'var(--body)' }}>
            <input 
              type="checkbox" 
              name="hasBankAccount" 
              checked={formData.hasBankAccount} 
              onChange={handleChange}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            I have an active Philippine Bank Account (for commission payouts)
          </label>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink)' }}>Attachments / Supporting Documents (Optional)</label>
          <div 
            style={{ 
              border: '2px dashed var(--line)', 
              borderRadius: '8px', 
              padding: '20px', 
              textAlign: 'center',
              cursor: 'pointer',
              background: 'var(--bg)',
              position: 'relative'
            }}
          >
            <input 
              type="file" 
              multiple 
              onChange={handleFileUpload} 
              disabled={isUploading}
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                opacity: 0, 
                cursor: 'pointer' 
              }}
            />
            <span style={{ fontSize: '14px', color: 'var(--muted)' }}>
              {isUploading ? 'Uploading file(s)...' : 'Click or drag files here to upload (e.g. CV, ID)'}
            </span>
          </div>

          {files.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
              {files.map((file, i) => (
                <div 
                  key={file.id} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '8px 12px', 
                    background: 'var(--white)', 
                    border: '1px solid var(--line)', 
                    borderRadius: '6px',
                    fontSize: '13px'
                  }}
                >
                  <span style={{ color: 'var(--body)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                    📄 {file.name}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => handleRemoveFile(i)}
                    style={{ border: 'none', background: 'transparent', color: 'red', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {errorMessage && (
          <div style={{ color: 'red', fontSize: '13px', fontWeight: '500', marginTop: '5px' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting || isUploading} 
          className="btn btn-fill btn-arrow" 
          style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
        >
          {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted)', marginTop: '5px' }}>
          🔒 Your information is completely confidential and only used for network recruitment.
        </p>
      </form>
    </div>
  );
}
