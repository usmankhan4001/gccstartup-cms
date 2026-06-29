'use client'

import { useState } from 'react'

export function ComparisonToolBlock({ eyebrow, title, description, options, ctaLabel, ctaUrl }: any) {
  const list = options || []
  const [left, setLeft] = useState(list[0]?.key || '')
  const [right, setRight] = useState(list[1]?.key || list[0]?.key || '')
  const a = list.find((item: any) => item.key === left) || list[0]
  const b = list.find((item: any) => item.key === right) || list[1] || list[0]

  if (!list.length) return null

  const rows = [
    ['Tax', a?.tax, b?.tax],
    ['Timeline', a?.timeline, b?.timeline],
    ['Banking', a?.banking, b?.banking],
    ['Ownership', a?.ownership, b?.ownership],
    ['Price', a?.price, b?.price],
  ]

  return (
    <section className="section section-alt" id="tools">
      <div className="wrap">
        <div className="section-header center reveal">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
        <div className="compare-wrap reveal" style={{ maxWidth: 860, margin: '0 auto' }}>
          <div className="compare-controls">
            <div className="compare-ctrl">
              <label>Country A</label>
              <select value={left} onChange={(event) => setLeft(event.target.value)}>
                {list.map((item: any) => <option key={item.key} value={item.key}>{item.label}</option>)}
              </select>
            </div>
            <div className="compare-ctrl">
              <label>Country B</label>
              <select value={right} onChange={(event) => setRight(event.target.value)}>
                {list.map((item: any) => <option key={item.key} value={item.key}>{item.label}</option>)}
              </select>
            </div>
          </div>
          <div className="compare-table">
            {rows.map(([label, av, bv]) => (
              <div key={label} className="compare-row">
                <strong>{label}</strong><span>{av || '—'}</span><span>{bv || '—'}</span>
              </div>
            ))}
          </div>
          {ctaLabel && <div className="compare-cta"><a href={ctaUrl || '#lead-form'} className="btn btn-fill btn-arrow">{ctaLabel}</a></div>}
        </div>
      </div>
    </section>
  )
}
