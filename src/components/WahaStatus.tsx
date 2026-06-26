import React from 'react'
import { getPayload } from 'payload'
import config from '../payload.config'

export default async function WahaStatus() {
  try {
    const payload = await getPayload({ config })
    const wahaConfig = await payload.findGlobal({ slug: 'wahaSettings' })
    
    if (!wahaConfig || !wahaConfig.wahaBaseUrl) {
      return <div style={{ padding: '1rem', background: '#ffebee', color: '#c62828', marginBottom: '1rem' }}>WAHA Not Configured. Please save base URL.</div>
    }

    let url = wahaConfig.wahaBaseUrl
    if (url.endsWith('/')) url = url.slice(0, -1)
    
    // Attempt to ping WAHA
    const res = await fetch(`${url}/api/sessions?session=${wahaConfig.wahaSession}`, {
      headers: {
        'Accept': 'application/json',
        ...(wahaConfig.wahaApiKey ? { 'X-Api-Key': wahaConfig.wahaApiKey } : {})
      },
      next: { revalidate: 0 } // Never cache this request
    })
    
    if (res.ok) {
      const data = await res.json()
      // WAHA returns an array of sessions for GET /api/sessions?session=xxx
      const sessionData = Array.isArray(data) ? data.find((s: any) => s.name === wahaConfig.wahaSession) : data
      const status = sessionData?.status || 'UNKNOWN'
      
      return (
        <div style={{ padding: '1rem', background: '#e8f5e9', color: '#2e7d32', border: '1px solid #c8e6c9', borderRadius: '4px', marginBottom: '1rem' }}>
          <strong>WAHA Connection:</strong> SUCCESS — Session Status: {status}
        </div>
      )
    } else {
      return (
        <div style={{ padding: '1rem', background: '#fff3e0', color: '#ef6c00', border: '1px solid #ffe0b2', borderRadius: '4px', marginBottom: '1rem' }}>
          <strong>WAHA Connection:</strong> FAILED (HTTP {res.status}) - Check URL and API Key
        </div>
      )
    }
  } catch (err: any) {
    return (
      <div style={{ padding: '1rem', background: '#ffebee', color: '#c62828', border: '1px solid #ffcdd2', borderRadius: '4px', marginBottom: '1rem' }}>
        <strong>WAHA Connection:</strong> ERROR ({err.message})
      </div>
    )
  }
}
