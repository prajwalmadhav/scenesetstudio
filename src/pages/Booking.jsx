import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'

// Cal.com event link (the part after cal.com/)
const CAL_LINK = 'sceneset-studio/book'

const labelStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  letterSpacing: '0.14em',
  color: 'rgba(242,240,235,0.35)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '16px',
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

export default function Booking() {
  const navigate = useNavigate()

  // Mount the standard Cal.com calendar (our branding: dark theme + red accent)
  useEffect(() => {
    const Cal = loadCal()
    Cal('init', { origin: 'https://cal.com' })
    Cal('inline', {
      elementOrSelector: '#cal-inline',
      calLink: CAL_LINK,
      config: { layout: 'month_view', theme: 'dark' },
    })
    Cal('ui', {
      theme: 'dark',
      styles: { branding: { brandColor: '#D4001E' } },
    })
  }, [])

  return (
    <>
      <SEO
        title="Book a Call | Scene Set Studio"
        description="Pick a time and book your call with Scene Set Studio."
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
          <p className="contact-eyebrow">Booking</p>
          <h1 className="contact-title">Book a call.</h1>
        </div>

        <div className="contact-shell">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={labelStyle}>Pick a time</p>
            <div id="cal-inline" style={{ width: '100%', minHeight: '640px', overflow: 'auto', background: '#0a0a0a', border: '1px solid #1a1a1a' }} />
          </div>
        </div>

      </div>
    </>
  )
}
