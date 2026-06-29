import LandingPageForm from '../LandingPageForm'

export function LeadFormBlock({ eyebrow, title, description, formType, submitButtonText, successMessage, redirectUrl }: any) {
  return (
    <section className="section" id="lead-form">
      <div className="wrap">
        <div className="section-header center reveal">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <LandingPageForm formConfig={{ formType, submitButtonText, successMessage, redirectUrl }} />
        </div>
      </div>
    </section>
  )
}
