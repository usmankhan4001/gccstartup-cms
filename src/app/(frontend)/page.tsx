import React from 'react'

export const dynamic = 'force-static'

export default function Home() {
  return (
    <div className="wrap">
      <div className="brand">
        GCC <span>Startup</span> — CMS
      </div>
      <h1>Content, leads & blog control panel</h1>
      <p>
        This is the Payload CMS that powers GCC Startup. Edit countries, services, pricing, the
        homepage copy, SEO meta and the blog from the admin. Lead submissions land here and are
        pushed to Twenty CRM + WhatsApp (via WAHA).
      </p>
      <div className="btns">
        <a className="btn btn-fill" href="/admin">
          Open the admin →
        </a>
        <a className="btn btn-ghost" href="/admin/collections/leads">
          View leads
        </a>
      </div>

      <div className="card">
        <h3>Lead endpoint</h3>
        <p>
          The website posts to <code>POST /api/lead</code>. Point the static site&apos;s{' '}
          <code>LEAD_ENDPOINT</code> at <code>https://cms.gccstartup.com/api/lead</code>.
        </p>
      </div>
    </div>
  )
}
