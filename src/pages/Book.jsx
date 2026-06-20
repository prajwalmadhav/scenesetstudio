import { useEffect } from 'react'
import SEO from '../components/SEO'
import Footer from '../components/Footer'

// Cal.com direct-booking event link (the part after cal.com/)
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

export default function Book() {
  useEffect(() => {
    const Cal = loadCal()
    Cal('init', { origin: 'https://cal.com' })
    Cal('inline', {
      elementOrSelector: '#cal-book',
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
        title="Book an Appointment | Scene Set Studio"
        description="Pick a time and book your appointment with Scene Set Studio."
      />

      <div className="contact-page">

        <div className="contact-hero">
          <p className="contact-eyebrow">Booking</p>
          <h1 className="contact-title">Book your spot.</h1>
        </div>

        <div className="contact-shell">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={labelStyle}>Pick a time</p>
            <div id="cal-book" style={{ width: '100%', minHeight: '640px', overflow: 'auto', background: '#0a0a0a', border: '1px solid #1a1a1a' }} />
          </div>
        </div>

      </div>

      <div style={{ position: 'relative', zIndex: 5 }}>
        <Footer />
      </div>
    </>
  )
}
