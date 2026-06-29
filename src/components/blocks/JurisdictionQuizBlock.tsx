'use client'

import { useState } from 'react'

export function JurisdictionQuizBlock({ eyebrow, title, description, callout, questions, results }: any) {
  const qs = questions || []
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const done = step >= qs.length
  const lastAnswer = answers[qs.length - 1]
  const result = (results || []).find((item: any) => item.matchValue === lastAnswer) || results?.[0]

  if (!qs.length) return null

  return (
    <section className="section" id="finder">
      <div className="wrap">
        <div className="quiz-wrap">
          <div className="quiz-intro reveal">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
            {callout && <div className="quiz-callout">{callout}</div>}
          </div>
          <div className="reveal">
            <div className="quiz-panel">
              <div className="quiz-panel-head">
                <h4>Jurisdiction Matcher</h4>
                <span>{done ? 'Your result' : `Step ${step + 1} of ${qs.length}`}</span>
              </div>
              <div className="quiz-progress"><div className="quiz-progress-fill" style={{ width: `${Math.min(((step + 1) / qs.length) * 100, 100)}%` }}></div></div>
              <div className="quiz-body">
                {!done ? (
                  <div className="quiz-step on">
                    <div className="quiz-q">{qs[step].question}</div>
                    <div className="quiz-opts">
                      {qs[step].answers?.map((answer: any) => (
                        <button key={answer.value} type="button" className={`quiz-opt ${answers[step] === answer.value ? 'on' : ''}`} onClick={() => setAnswers((prev) => ({ ...prev, [step]: answer.value }))}>
                          <span className="quiz-opt-icon">→</span> {answer.label}
                        </button>
                      ))}
                    </div>
                    <div className="quiz-nav">
                      <button className="quiz-nav-btn" onClick={() => setStep((value) => Math.max(value - 1, 0))} disabled={step === 0}>← Back</button>
                      <button className="quiz-nav-btn primary" onClick={() => setStep((value) => value + 1)} disabled={!answers[step]}>{step === qs.length - 1 ? 'See my result' : 'Next'}</button>
                    </div>
                  </div>
                ) : (
                  <div className="quiz-result on">
                    <div className="qr-header"><span className="qr-flag">{result?.flag}</span><div><div className="qr-name">{result?.name}</div><div className="qr-rate">{result?.rate}</div></div></div>
                    <div className="qr-body">
                      {result?.description && <p className="qr-why">{result.description}</p>}
                      <div className="qr-actions">
                        {result?.ctaLabel && <a href={result.ctaUrl || '#lead-form'} className="btn btn-fill">{result.ctaLabel}</a>}
                        <button className="btn btn-ghost" onClick={() => { setStep(0); setAnswers({}) }}>Try again</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
