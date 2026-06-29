'use client'

import React, { useState } from 'react'
import type { LocaleCode } from '@/i18n/locales'
import { defaultLocale, localeCodes } from '@/i18n/locales'

type NavItem = { label?: string; url?: string }

export function SiteHeader({ settings, locale }: { settings: any; locale: LocaleCode }) {
  const [open, setOpen] = useState(false)
  const contact = settings?.contact || {}
  const navItems: NavItem[] = settings?.navMenu?.length ? settings.navMenu : [
    { label: 'Services', url: '/#services' },
    { label: 'Jurisdictions', url: '/#jur' },
    { label: 'Pricing', url: '/#tiers' },
    { label: 'Free Tools', url: '/#tools' },
    { label: 'FAQ', url: '/#faq' },
  ]
  const whatsappUrl = contact.whatsappNumber ? `https://wa.me/${String(contact.whatsappNumber).replace(/\D/g, '')}` : '#lead-form'
  const localizeUrl = (url?: string) => {
    if (!url || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:') || /^https?:\/\//.test(url)) return url || '#'
    const normalized = url.startsWith('/') ? url : `/${url}`
    return locale === defaultLocale ? normalized : `/${locale}${normalized}`
  }

  const switchLocale = (next: string) => {
    const current = new URL(window.location.href)
    const segments = current.pathname.split('/').filter(Boolean)
    if (segments.length > 0 && localeCodes.includes(segments[0] as LocaleCode)) segments.shift()
    const basePath = segments.length > 0 ? `/${segments.join('/')}` : '/'
    current.pathname = next === defaultLocale ? basePath : `/${next}${basePath === '/' ? '' : basePath}`
    window.location.href = current.toString()
  }

  return (
    <>
      {settings?.announcementBar?.enabled && (
        <div className="topbar">
          <div className="wrap">
            <div className="topbar-left">
              {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
              <a href={whatsappUrl}>WhatsApp Consultation</a>
            </div>
            <div className="topbar-right">
              <a href={settings.announcementBar.link || '#'} className="pill">{settings.announcementBar.text}</a>
            </div>
          </div>
        </div>
      )}
      <nav className="site-nav" id="nav">
        <div className="wrap">
          <div className="nav-inner">
            <a href={locale === defaultLocale ? '/' : `/${locale}`} className="nav-logo">
              {settings?.logo?.url ? <img src={settings.logo.url} alt={settings.brandName || 'GCC Startup'} /> : null}
              <div className="nav-logo-text">{settings?.brandName || 'GCC Startup'}</div>
            </a>
            <div className="nav-menu">
              {navItems.map((item, index) => <a key={index} href={localizeUrl(item.url)}>{item.label}</a>)}
            </div>
            <div className="nav-right">
              <a href={whatsappUrl} className="btn btn-ghost">WhatsApp</a>
              <a href={`mailto:${contact.email || 'info@gccstartup.com'}?subject=Free Consultation`} className="btn btn-fill">Book a Call</a>
              <select aria-label="Language" value={locale} onChange={(event) => {
                switchLocale(event.target.value)
              }}>
                {localeCodes.map((code) => <option key={code} value={code}>{code.toUpperCase()}</option>)}
              </select>
              <button className={`nav-burger ${open ? 'open' : ''}`} onClick={() => setOpen((value) => !value)} aria-label="Menu">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </div>
        <div className={`nav-drawer ${open ? 'open' : ''}`}>
          {navItems.map((item, index) => <a key={index} href={localizeUrl(item.url)} onClick={() => setOpen(false)}>{item.label}</a>)}
          <a href={`mailto:${contact.email || 'info@gccstartup.com'}?subject=Free Consultation`} className="btn btn-fill" onClick={() => setOpen(false)}>Book a Free Consultation</a>
        </div>
      </nav>
    </>
  )
}
