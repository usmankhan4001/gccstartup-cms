import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let counts = { countries: 0, services: 0, pricingTiers: 0, posts: 0, leads: 0 }
  try {
    const payload = await getPayload({ config })
    const [c, s, t, p, l] = await Promise.all([
      payload.count({ collection: 'countries' }),
      payload.count({ collection: 'services' }),
      payload.count({ collection: 'pricingTiers' }),
      payload.count({ collection: 'posts' }),
      payload.count({ collection: 'leads' }),
    ])
    counts = {
      countries: c.totalDocs,
      services: s.totalDocs,
      pricingTiers: t.totalDocs,
      posts: p.totalDocs,
      leads: l.totalDocs,
    }
  } catch {
    // DB not reachable yet — page still renders.
  }

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
        <h3>Content in the database</h3>
        <ul>
          <li>Countries: {counts.countries}</li>
          <li>Services: {counts.services}</li>
          <li>Pricing tiers: {counts.pricingTiers}</li>
          <li>Blog posts: {counts.posts}</li>
          <li>Leads: {counts.leads}</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          Empty? Run <code>pnpm seed</code> to import the existing site content.
        </p>
      </div>

      <div className="card">
        <h3>Lead endpoint</h3>
        <p>
          The website posts to <code>POST /api/lead</code>. Point the static site&apos;s{' '}
          <code>LEAD_ENDPOINT</code> at <code>https://this-domain/api/lead</code>.
        </p>
      </div>
    </div>
  )
}
