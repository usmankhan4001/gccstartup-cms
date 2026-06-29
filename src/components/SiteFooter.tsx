import React from 'react'

export function SiteFooter({ settings }: { settings: any }) {
  const contact = settings?.contact || {}
  const footer = settings?.footer || {}
  const social = settings?.social || []
  const year = new Date().getFullYear()
  const whatsappUrl = contact.whatsappNumber ? `https://wa.me/${String(contact.whatsappNumber).replace(/\D/g, '')}` : '#lead-form'

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-name">{settings?.brandName || 'GCC Startup'}</div>
            {footer.about && <p>{footer.about}</p>}
            {social.length > 0 && (
              <div className="footer-social">
                {social.map((item: any, index: number) => <a key={index} href={item.url || '#'} title={item.platform}>{item.platform}</a>)}
              </div>
            )}
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul className="footer-links">
              <li><a href="/services/company-registration">Company Registration</a></li>
              <li><a href="/services/bank-account">Bank Account Setup</a></li>
              <li><a href="/services/nominee-ubo">Nominee UBO Service</a></li>
              <li><a href="/services/shelf-company">Shelf Companies</a></li>
              <li><a href="/services/tax-residency">Tax Residency</a></li>
              <li><a href="/services/annual-renewals">Annual Renewals</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Jurisdictions</h5>
            <ul className="footer-links">
              <li><a href="/uae">UAE</a></li>
              <li><a href="/bahrain">Bahrain</a></li>
              <li><a href="/hongkong">Hong Kong</a></li>
              <li><a href="/singapore">Singapore</a></li>
              <li><a href="/ireland">Ireland</a></li>
              <li><a href="/bvi-cayman">BVI & Cayman</a></li>
            </ul>
          </div>
          <div className="footer-nl">
            <h5>Contact</h5>
            {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
            <a href={whatsappUrl}>WhatsApp consultation</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© {year} GCCStartup.com — All rights reserved.</span>
          {footer.legal && <span className="footer-legal">{footer.legal}</span>}
        </div>
      </div>
    </footer>
  )
}
