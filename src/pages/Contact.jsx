import { useState } from 'react'
import SEO from '../components/SEO'

const SERVICES = ['Brand Strategy', 'Content Production', 'Paid Advertising', 'Social Media', 'Web Design', 'Not sure yet']
const BUDGETS  = ['Under $2k', '$2k - $5k', '$5k - $15k', '$15k+', 'Ongoing retainer']

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

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', company: '', message: '' })
  const [service, setService] = useState('')
  const [budget, setBudget]   = useState('')
  const [sent, setSent]       = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <SEO
        title="Contact | Scene Set Studio"
        description="Start a project with Scene Set Studio - brand strategy, content, advertising, and web design."
      />

      <div className="contact-page">

        {/* Header */}
        <div className="contact-hero">
          <p className="contact-eyebrow">
            Get In Touch
          </p>
          <h1 className="contact-title">
            Let's start something.
          </h1>
        </div>

        <div className="contact-shell">
          <div className="contact-card">

          {/* Left "" info */}
          <div className="contact-info">
            <p className="contact-intro">
              Fill in the form and we will get back to you within one business day. Alternatively, drop us an email directly.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <p style={{ ...labelStyle, marginBottom: '8px' }}>Email</p>
                <a href="mailto:hello@scenesetstudio.com" style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, color: '#F2F0EB', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#D4001E'}
                  onMouseLeave={e => e.currentTarget.style.color = '#F2F0EB'}
                >
                  hello@scenesetstudio.com
                </a>
              </div>
              <div>
                <p style={{ ...labelStyle, marginBottom: '8px' }}>Response time</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: 'rgba(242,240,235,0.5)', margin: 0 }}>Within 1 business day</p>
              </div>
              <div>
                <p style={{ ...labelStyle, marginBottom: '8px' }}>Based in</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: 'rgba(242,240,235,0.5)', margin: 0 }}>London, UK &mdash; working globally</p>
              </div>
            </div>
          </div>

          {/* Right "" form */}
          {sent ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px', border: '1px solid #1a1a1a', background: '#0a0a0a' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 40px)', color: '#D4001E', letterSpacing: '-0.03em', margin: '0 0 16px' }}>
                Message sent.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, color: 'rgba(242,240,235,0.55)', lineHeight: 1.7, margin: 0 }}>
                Thanks for reaching out. We will be in touch within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">

              <div className="contact-form-row">
                <div>
                  <label style={labelStyle} htmlFor="name">Name</label>
                  <input
                    id="name" name="name" type="text" required placeholder="Your name"
                    value={form.name} onChange={handleChange}
                    style={{ ...inputStyle, '--ph-color': 'rgba(242,240,235,0.2)' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'}
                    onBlur={e => e.target.style.borderColor = '#1a1a1a'}
                  />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="email">Email</label>
                  <input
                    id="email" name="email" type="email" required placeholder="your@email.com"
                    value={form.email} onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'}
                    onBlur={e => e.target.style.borderColor = '#1a1a1a'}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle} htmlFor="company">Company / Brand</label>
                <input
                  id="company" name="company" type="text" placeholder="Optional"
                  value={form.company} onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'}
                  onBlur={e => e.target.style.borderColor = '#1a1a1a'}
                />
              </div>

              {/* Service selector */}
              <div>
                <p style={labelStyle}>Service</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {SERVICES.map(s => (
                    <button
                      key={s} type="button"
                      onClick={() => setService(sv => sv === s ? '' : s)}
                      style={{
                        fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.08em',
                        padding: '8px 16px', border: '1px solid',
                        borderColor: service === s ? '#D4001E' : '#1a1a1a',
                        background: service === s ? 'rgba(212,0,30,0.08)' : 'transparent',
                        color: service === s ? '#D4001E' : 'rgba(242,240,235,0.5)',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget selector */}
              <div>
                <p style={labelStyle}>Budget</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {BUDGETS.map(b => (
                    <button
                      key={b} type="button"
                      onClick={() => setBudget(bv => bv === b ? '' : b)}
                      style={{
                        fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.08em',
                        padding: '8px 16px', border: '1px solid',
                        borderColor: budget === b ? '#D4001E' : '#1a1a1a',
                        background: budget === b ? 'rgba(212,0,30,0.08)' : 'transparent',
                        color: budget === b ? '#D4001E' : 'rgba(242,240,235,0.5)',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle} htmlFor="message">Message</label>
                <textarea
                  id="message" name="message" rows={4} required
                  placeholder="Tell us about your project..."
                  value={form.message} onChange={handleChange}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '104px' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'}
                  onBlur={e => e.target.style.borderColor = '#1a1a1a'}
                />
              </div>

              <button
                type="submit"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#0a0a0a', background: '#D4001E',
                  padding: '14px 28px', border: 'none', cursor: 'pointer',
                  fontWeight: 500, alignSelf: 'flex-start', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Send Message
              </button>

            </form>
          )}

          </div>
        </div>

      </div>
    </>
  )
}
