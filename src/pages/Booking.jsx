import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'

const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY    = 'b44a455f-02a4-48e4-b5e5-8ec134f81fc3'

// Cal.com event link (the part after cal.com/)
const CAL_LINK = 'sceneset-studio/15min'

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

// Loads the Cal.com embed runtime once (official snippet).
function loadCal() {
  ;(function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar) }
    let d = C.document
    C.Cal = C.Cal || function () {
      let cal = C.Cal
      let ar = arguments
      if (!cal.loaded) {
        cal.ns = {}
        cal.q = cal.q || []
        d.head.appendChild(d.createElement('script')).src = A
        cal.loaded = true
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments) }
        const namespace = ar[1]
        api.q = api.q || []
        if (typeof namespace === 'string') {
          cal.ns[namespace] = cal.ns[namespace] || api
          p(cal.ns[namespace], ar)
          p(cal, ['initNamespace', namespace])
        } else p(cal, ar)
        return
      }
      p(cal, ar)
    }
  })(window, 'https://app.cal.com/embed/embed.js', 'init')
  return window.Cal
}

const navBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: 'var(--font-body)',
  fontSize: '12px',
  letterSpacing: '0.08em',
  color: 'rgba(242,240,235,0.6)',
  background: 'transparent',
  border: '1px solid #2a2a2a',
  padding: '9px 16px',
  cursor: 'pointer',
  transition: 'border-color 0.2s, color 0.2s',
}

export default function QuickContact() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' })
  const [booking, setBooking] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    // Fire the lead capture so we have their details even if they don't finish booking
    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: ACCESS_KEY, subject: 'Quick Booking Request — Scene Set Studio', type: 'quick-contact', ...form }),
      })
      if (typeof gtag !== 'undefined') gtag('event', 'generate_lead', { event_category: 'contact', event_label: 'quick_contact' })
      if (typeof fbq !== 'undefined') fbq('track', 'Lead')
    } catch {}
    setBooking(true)
  }

  // Mount the Cal.com calendar (always visible, side-by-side with the form)
  useEffect(() => {
    const Cal = loadCal()
    Cal('init', { origin: 'https://cal.com' })
    Cal('inline', {
      elementOrSelector: '#cal-inline',
      calLink: CAL_LINK,
      config: { theme: 'dark' },
    })
    Cal('ui', {
      theme: 'dark',
      hideEventTypeDetails: false,
      styles: { branding: { brandColor: '#D4001E' } },
    })
  }, [])

  return (
    <>
      <SEO
        title="Book a Call | Scene Set Studio"
        description="Leave your details and book a quick discovery call with Scene Set Studio."
      />

      <div className="contact-page">

        {/* Standalone nav — Back + Home */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '0 clamp(18px, 5vw, 64px) 28px' }}>
          <button
            onClick={() => navigate(-1)}
            style={navBtnStyle}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#F2F0EB'; e.currentTarget.style.color = '#F2F0EB' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = 'rgba(242,240,235,0.6)' }}
          >
            ← Back
          </button>
          <button
            onClick={() => navigate('/')}
            style={navBtnStyle}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#F2F0EB'; e.currentTarget.style.color = '#F2F0EB' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = 'rgba(242,240,235,0.6)' }}
          >
            ⌂ Home
          </button>
        </div>

        <div className="contact-hero" style={{ textAlign: 'center' }}>
          <p className="contact-eyebrow">Quick Contact</p>
          <h1 className="contact-title">Book a quick call.</h1>
        </div>

        <div className="contact-shell">
          <div className="qc-grid">

            {/* Details */}
            <div style={{ background: '#161618', border: '1px solid #2a2a2a', boxShadow: '0 8px 40px rgba(0,0,0,0.5)', padding: 'clamp(24px, 4vw, 44px)', alignSelf: 'start' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 300, color: 'rgba(242,240,235,0.45)', margin: '0 0 24px', lineHeight: 1.6 }}>
                Leave your details so we know who's booking — then grab a time on the calendar.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="contact-form-row">
                  <div>
                    <label style={labelStyle} htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" required placeholder="Your name"
                      value={form.name} onChange={handleChange} style={inputStyle} onFocus={focusRed} onBlur={blurReset} />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required placeholder="your@email.com"
                      value={form.email} onChange={handleChange} style={inputStyle} onFocus={focusRed} onBlur={blurReset} />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div>
                    <label style={labelStyle} htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" required placeholder="+1 (613) 000-0000"
                      value={form.phone} onChange={handleChange} style={inputStyle} onFocus={focusRed} onBlur={blurReset} />
                  </div>
                  <div>
                    <label style={labelStyle} htmlFor="company">Company / Brand <span style={{ opacity: 0.4, fontSize: '10px' }}>— optional</span></label>
                    <input id="company" name="company" type="text" placeholder="Optional"
                      value={form.company} onChange={handleChange} style={inputStyle} onFocus={focusRed} onBlur={blurReset} />
                  </div>
                </div>

                {booking ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', background: 'rgba(212,0,30,0.06)', border: '1px solid rgba(212,0,30,0.2)' }}>
                    <span style={{ color: '#D4001E', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px' }}>Got it.</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 300, color: 'rgba(242,240,235,0.55)' }}>Now pick a time on the calendar to lock in your call.</span>
                  </div>
                ) : (
                  <button type="submit"
                    style={{ fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#F2F0EB', background: '#D4001E', padding: '14px 28px', border: 'none', cursor: 'pointer', fontWeight: 500, alignSelf: 'flex-start', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Send Details →
                  </button>
                )}
              </form>
            </div>

            {/* Cal.com calendar — always visible on the side */}
            <div>
              <p style={{ ...labelStyle, marginBottom: '16px' }}>Pick a time</p>
              <div id="cal-inline" style={{ width: '100%', minHeight: '640px', overflow: 'auto', background: '#0a0a0a', border: '1px solid #1a1a1a' }} />
            </div>

          </div>
        </div>

      </div>
    </>
  )
}
