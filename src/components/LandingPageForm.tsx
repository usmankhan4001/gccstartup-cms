'use client';

import React, { useState } from 'react';

interface FormConfig {
  formType?: 'contact' | 'lead' | 'partner' | null;
  submitButtonText?: string | null;
  successMessage?: string | null;
  redirectUrl?: string | null;
}

interface LandingPageFormProps {
  formConfig?: FormConfig;
  utmData?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  };
}

export default function LandingPageForm({ formConfig, utmData }: LandingPageFormProps) {
  const formType = formConfig?.formType || 'lead';
  const submitText = formConfig?.submitButtonText || (formType === 'partner' ? 'Submit Application' : 'Request Consultation');
  const successMsg = formConfig?.successMessage || 'Thank you! Your submission has been received successfully.';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    interest: '',
    message: '',
    city: '',
    hasPassport: false,
    hasBankAccount: false,
  });

  const [files, setFiles] = useState<{ id: string; name: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        const data = new FormData();
        data.append('file', file);
        data.append('alt', `Attachment: ${file.name}`);
        data.append('category', 'document');

        const res = await fetch('/api/media', {
          method: 'POST',
          body: data,
        });

        if (!res.ok) {
          throw new Error(`Failed to upload file: ${file.name}`);
        }

        const resData = await res.json();
        const mediaId = resData.id || resData.doc?.id;
        if (mediaId) {
          uploadedList.push({ id: mediaId, name: file.name });
        }
      }
      setFiles(uploadedList);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error uploading files.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const attachments = files.map((f) => f.id);

    try {
      let endpoint = '/api/lead';
      let payload: any = {};

      if (formType === 'partner') {
        endpoint = '/api/partner-apply';
        payload = {
          fullName: formData.name,
          email: formData.email,
          whatsapp: formData.phone,
          city: formData.city,
          hasPassport: formData.hasPassport,
          hasBankAccount: formData.hasBankAccount,
          page: pageUrl,
          attachments,
        };
      } else {
        payload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          interest: formData.interest || 'General Enquiry',
          message: formData.message,
          source: 'landing-page',
          page: pageUrl,
          attachments,
          utmSource: utmData?.utmSource,
          utmMedium: utmData?.utmMedium,
          utmCampaign: utmData?.utmCampaign,
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to submit form.');
      }

      setSubmitStatus('success');

      if (formConfig?.redirectUrl) {
        setTimeout(() => {
          window.location.href = formConfig.redirectUrl as string;
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div 
        style={{ 
          padding: '40px 24px', 
          textAlign: 'center', 
          background: 'var(--blue-lt)', 
          border: '1.5px solid var(--blue)',
          borderRadius: '12px'
        }}
      >
        <div style={{ fontSize: '32px', color: 'var(--blue)', marginBottom: '16px' }}>✓</div>
        <h3 style={{ color: 'var(--ink)', marginBottom: '12px' }}>Submitted!</h3>
        <p style={{ color: 'var(--body)', whiteSpace: 'pre-line' }}>{successMsg}</p>
        {formConfig?.redirectUrl && (
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '12px' }}>
            Redirecting you now...
          </p>
        )}
      </div>
    );
  }

  return (
    <div 
      style={{ 
        background: 'var(--white)', 
        border: '1.5px solid var(--line)', 
        borderRadius: '12px', 
        padding: '32px',
        boxShadow: '0 10px 30px rgba(17, 24, 39, 0.04)'
      }}
    >
      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: 'var(--ink)' }}>
        {formType === 'partner' ? 'Partner Application Form' : 'Request Consultation'}
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600' }}>Full Name *</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="Juan Dela Cruz"
            style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600' }}>Email Address *</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="you@example.com"
            style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600' }}>
            {formType === 'partner' ? 'WhatsApp Number *' : 'Phone / WhatsApp *'}
          </label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
            placeholder="+63 917 123 4567"
            style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
          />
        </div>

        {formType === 'partner' ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>City of Residence</label>
              <input 
                type="text" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                placeholder="e.g. Quezon City"
                style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--bg)', padding: '12px', borderRadius: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                <input 
                  type="checkbox" 
                  name="hasPassport" 
                  checked={formData.hasPassport} 
                  onChange={handleChange}
                />
                I have a valid Passport
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                <input 
                  type="checkbox" 
                  name="hasBankAccount" 
                  checked={formData.hasBankAccount} 
                  onChange={handleChange}
                />
                I have an active Bank Account
              </label>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Country of Interest</label>
              <select 
                name="country" 
                value={formData.country} 
                onChange={handleChange}
                style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px', background: 'var(--white)' }}
              >
                <option value="">Select country...</option>
                <option value="UAE">UAE</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Singapore">Singapore</option>
                <option value="Ireland">Ireland</option>
                <option value="BVI & Cayman">BVI & Cayman</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>What service do you need?</label>
              <select 
                name="interest" 
                value={formData.interest} 
                onChange={handleChange}
                style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px', background: 'var(--white)' }}
              >
                <option value="">Select service...</option>
                <option value="Company Registration">Company Registration</option>
                <option value="Bank Account Setup">Bank Account Setup</option>
                <option value="Nominee UBO">Nominee UBO</option>
                <option value="Shelf Company">Shelf Company</option>
                <option value="Tax Residency">Tax Residency</option>
                <option value="Annual Renewals">Annual Renewals</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Message (Optional)</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Tell us about your requirements..."
                style={{ padding: '10px 14px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '14px', height: '80px', fontFamily: 'inherit', resize: 'vertical' }}
              />
            </div>
          </>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '13px', fontWeight: '600' }}>Attachments (Optional)</label>
          <input 
            type="file" 
            multiple 
            onChange={handleFileUpload}
            disabled={isUploading}
            style={{ fontSize: '13px' }}
          />
          {isUploading && <span style={{ fontSize: '12px', color: 'var(--blue)' }}>Uploading...</span>}
          {files.map((file, idx) => (
            <div key={file.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', background: 'var(--bg)', padding: '4px 8px', borderRadius: '4px' }}>
              <span>📄 {file.name}</span>
              <button type="button" onClick={() => handleRemoveFile(idx)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Remove</button>
            </div>
          ))}
        </div>

        {errorMessage && <span style={{ color: 'red', fontSize: '13px' }}>⚠️ {errorMessage}</span>}

        <button 
          type="submit" 
          disabled={isSubmitting || isUploading}
          className="btn btn-fill btn-arrow" 
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {isSubmitting ? 'Submitting...' : submitText}
        </button>
      </form>
    </div>
  );
}
