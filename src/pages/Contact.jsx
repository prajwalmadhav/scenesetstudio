import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const SERVICES   = ['Brand Strategy', 'Content Production', 'Paid Advertising', 'Social Media', 'Web Design', 'Not sure yet']
const BUDGETS    = ['Under $2k', '$2k - $5k', '$5k - $15k', '$15k+', 'Ongoing retainer']
const REVENUES   = ['Under $10k/mo', '$10k – $50k/mo', '$50k – $200k/mo', '$200k+/mo', 'Pre-revenue']
const CHALLENGES = ['Not enough leads', 'Low brand awareness', 'Poor conversion rate', 'No content strategy', 'Scaling paid ads', 'Other']

const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY    = 'b44a455f-02a4-48e4-b5e5-8ec134f81fc3'

const inputStyle = {
  width: '100%',
  background: '#0a0a0a',
  border: '1px solid #1a1a1a',
  color: '#F2F0EB',
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  fontWeight: 300,
  padding: '14px 18px',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}

const labelStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  letterSpacing: '0.14em',
  color: 'rgba(242,240,235,0.35)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '10px',
}

const focusRed  = e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'
const blurReset = e => e.target.style.borderColor = '#1a1a1a'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [services, setServices]     = useState(new Set())
  const [budget, setBudget]         = useState('')
  const [revenue, setRevenue]       = useState('')
  const [challenges, setChallenges] = useState(new Set())
  const [sent, setSent] = useState(false)          // step 1 submitted (lead captured)
  const [detailsSent, setDetailsSent] = useState(false)  // step 2 (qualification) done/skipped

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  // Step 1 — capture the message + contact details
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: ACCESS_KEY, subject: 'New Message — Scene Set Studio', type: 'contact', ...form }),
      })
      if (typeof gtag !== 'undefined') gtag('event', 'generate_lead', { event_category: 'contact', event_label: 'contact_message' })
      if (typeof fbq !== 'undefined') fbq('track', 'Lead')
    } catch {}
    setSent(true)
  }

  // Step 2 — optional qualification details (only fires if they choose to add them)
  async function handleDetails(e) {
    e.preventDefault()
    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: ACCESS_KEY, subject: 'Project Details — Scene Set Studio', type: 'contact-details', name: form.name, email: form.email, phone: form.phone, service: [...services].join(', '), budget, revenue, challenge: [...challenges].join(', ') }),
      })
    } catch {}
    setDetailsSent(true)
  }

  return (
    <>
      <SEO
        title="Contact | Scene Set Studio"
        description="Start a project with Scene Set Studio - brand strategy, content, advertising, and web design."
      />

      <div className="contact-page">

        <div className="contact-hero">
          <p className="contact-eyebrow">Get In Touch</p>
          <h1 className="contact-title">Let's start something.</h1>
        </div>

        <div className="contact-shell">
          <div className="contact-card">

            <div className="contact-info">
              <img src="/sss-logo2.svg" alt="Scene Set Studio" className="contact-info__logo" />
              <span className="contact-info__wordmark">SceneSet<br /><strong>Studio</strong></span>
              <p className="contact-intro">
                Fill in the form and we will get back to you within one business day. Alternatively, drop us an email directly.
              </p>

              <Link
                to="/booking"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em',
                  textTransform: 'uppercase', fontWeight: 500,
                  color: '#F2F0EB', background: '#D4001E',
                  padding: '13px 24px', textDecoration: 'none',
                  alignSelf: 'flex-start', marginBottom: '32px',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Book a Call →
              </Link>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <p style={{ ...labelStyle, marginBottom: '8px' }}>Email</p>
                  <a href="mailto:team@scenesetstudio.com"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, color: '#F2F0EB', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#D4001E'}
                    onMouseLeave={e => e.currentTarget.style.color = '#F2F0EB'}
                  >
                    team@scenesetstudio.com
                  </a>
                </div>
                <div>
                  <p style={{ ...labelStyle, marginBottom: '8px' }}>Response time</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: 'rgba(242,240,235,0.5)', margin: 0 }}>Within 1 business day</p>
                </div>
                <div>
                  <p style={{ ...labelStyle, marginBottom: '8px' }}>Based in</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: 'rgba(242,240,235,0.5)', margin: 0 }}>Ontario, Canada</p>
                </div>
              </div>
            </div>

            {detailsSent ? (
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px', border: '1px solid #1a1a1a', background: '#0a0a0a' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 40px)', color: '#D4001E', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
                  All set.
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, color: 'rgba(242,240,235,0.55)', lineHeight: 1.7, margin: 0 }}>
                  Thanks — we've got everything we need. We'll be in touch within one business day.
                </p>
              </div>
            ) : sent ? (
              /* ── Step 2 — optional qualification ── */
              <form onSubmit={handleDetails} className="contact-form">

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', background: 'rgba(212,0,30,0.06)', border: '1px solid rgba(212,0,30,0.2)' }}>
                  <span style={{ color: '#D4001E', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px' }}>Message received.</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 300, color: 'rgba(242,240,235,0.55)' }}>We'll be in touch within one business day.</span>
                </div>

                <div style={{ paddingTop: '4px' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(18px, 2vw, 24px)', color: '#F2F0EB', letterSpacing: '-0.03em', margin: '0 0 4px' }}>
                    Got 60 seconds? <span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: 'rgba(242,240,235,0.4)' }}>— optional</span>
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 300, color: 'rgba(242,240,235,0.4)', margin: 0 }}>
                    Tell us a bit more so we show up ready. Totally optional.
                  </p>
                </div>

                {/* Service */}
                <div>
                  <p style={labelStyle}>Service</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {SERVICES.map(s => (
                      <button key={s} type="button" onClick={() => setServices(prev => { const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n })}
                        style={{
                          fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.08em',
                          padding: '8px 16px', border: '1px solid',
                          borderColor: services.has(s) ? '#D4001E' : 'rgba(242,240,235,0.22)',
                          background: services.has(s) ? 'rgba(212,0,30,0.08)' : 'transparent',
                          color: services.has(s) ? '#D4001E' : 'rgba(242,240,235,0.5)',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >{s}</button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <p style={labelStyle}>Budget</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {BUDGETS.map(b => (
                      <button key={b} type="button" onClick={() => setBudget(bv => bv === b ? '' : b)}
                        style={{
                          fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.08em',
                          padding: '8px 16px', border: '1px solid',
                          borderColor: budget === b ? '#D4001E' : 'rgba(242,240,235,0.22)',
                          background: budget === b ? 'rgba(212,0,30,0.08)' : 'transparent',
                          color: budget === b ? '#D4001E' : 'rgba(242,240,235,0.5)',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >{b}</button>
                    ))}
                  </div>
                </div>

                {/* Monthly revenue */}
                <div>
                  <p style={labelStyle}>Monthly revenue <span style={{ opacity: 0.4, fontSize: '10px' }}>— optional</span></p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {REVENUES.map(r => (
                      <button key={r} type="button" onClick={() => setRevenue(rv => rv === r ? '' : r)}
                        style={{
                          fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.08em',
                          padding: '8px 16px', border: '1px solid',
                          borderColor: revenue === r ? '#D4001E' : 'rgba(242,240,235,0.22)',
                          background: revenue === r ? 'rgba(212,0,30,0.08)' : 'transparent',
                          color: revenue === r ? '#D4001E' : 'rgba(242,240,235,0.5)',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >{r}</button>
                    ))}
                  </div>
                </div>

                {/* Main challenge */}
                <div>
                  <p style={labelStyle}>Main marketing challenge <span style={{ opacity: 0.4, fontSize: '10px' }}>— optional</span></p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {CHALLENGES.map(c => (
                      <button key={c} type="button" onClick={() => setChallenges(prev => { const n = new Set(prev); n.has(c) ? n.delete(c) : n.add(c); return n })}
                        style={{
                          fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.08em',
                          padding: '8px 16px', border: '1px solid',
                          borderColor: challenges.has(c) ? '#D4001E' : 'rgba(242,240,235,0.22)',
                          background: challenges.has(c) ? 'rgba(212,0,30,0.08)' : 'transparent',
                          color: challenges.has(c) ? '#D4001E' : 'rgba(242,240,235,0.5)',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >{c}</button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <button
                    type="submit"
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: '#F2F0EB', background: '#D4001E',
                      padding: '14px 28px', border: 'none', cursor: 'pointer',
                      fontWeight: 500, transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Send Details →
                  </button>
                  <button
                    type="button"
                    onClick={() => setDetailsSent(true)}
                    style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 300, color: 'rgba(242,240,235,0.4)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                  >
                    No thanks, I'm done
                  </button>
                </div>

              </form>
            ) : (
              /* ── Step 1 — quick message + contact ── */
              <form onSubmit={handleSubmit} className="contact-form">

                {/* Name + Phone */}
                <div className="contact-form-row">
                  <div>
                    <label style={labelStyle} htmlFor="name">Name</label>
                    <input
                      id="name" name="name" type="text" required placeholder="Your name"
                      value={form.name} onChange={handleChange}
                      style={inputStyle} onFocus={focusRed} onBlur={blurReset}
                    />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="phone">Phone</label>
                    <input
                      id="phone" name="phone" type="tel" required placeholder="+1 (613) 000-0000"
                      value={form.phone} onChange={handleChange}
                      style={inputStyle} onFocus={focusRed} onBlur={blurReset}
                    />
                  </div>
                </div>

                {/* Email + Company */}
                <div className="contact-form-row">
                  <div>
                    <label style={labelStyle} htmlFor="email">Email</label>
                    <input
                      id="email" name="email" type="email" required placeholder="your@email.com"
                      value={form.email} onChange={handleChange}
                      style={inputStyle} onFocus={focusRed} onBlur={blurReset}
                    />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="company">Company / Brand <span style={{ opacity: 0.4, fontSize: '10px' }}>— optional</span></label>
                    <input
                      id="company" name="company" type="text" placeholder="Optional"
                      value={form.company} onChange={handleChange}
                      style={inputStyle} onFocus={focusRed} onBlur={blurReset}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={labelStyle} htmlFor="message">Message <span style={{ opacity: 0.4, fontSize: '10px' }}>— optional</span></label>
                  <textarea
                    id="message" name="message" rows={4}
                    placeholder="Tell us about your project..."
                    value={form.message} onChange={handleChange}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '104px' }}
                    onFocus={focusRed} onBlur={blurReset}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: '#F2F0EB', background: '#D4001E',
                    padding: '14px 28px', border: 'none', cursor: 'pointer',
                    fontWeight: 500, alignSelf: 'flex-start', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Send Message →
                </button>

              </form>
            )}

          </div>
        </div>

      </div>
    </>
  )
}
