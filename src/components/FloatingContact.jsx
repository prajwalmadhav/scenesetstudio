import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const WA_NUMBER   = '16138702919'
const WA_MESSAGE  = encodeURIComponent("Hi! I'd like to learn more about Scene Set Studio's services.")
const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY    = 'b44a455f-02a4-48e4-b5e5-8ec134f81fc3'

export default function FloatingContact() {
  const { pathname } = useLocation()
  const [open, setOpen]       = useState(false)
  const [visible, setVisible] = useState(false)
  const [form, setForm]       = useState({ name: '', phone: '', email: '', message: '' })
  const [sent, setSent]       = useState(false)
  const [busy, setBusy]       = useState(false)

  const isHome    = pathname === '/'
  const isHidden  = pathname === '/contact' || pathname.startsWith('/admin')

  // Visibility logic
  useEffect(() => {
    if (isHidden) { setVisible(false); return }

    if (!isHome) { setVisible(true); return }

    // Landing page: show pill once the #process section is about to enter
    setVisible(false)
    const target = document.getElementById('process')
    if (!target) return

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { rootMargin: '0px 0px 900px 0px', threshold: 0 }
    )
    obs.observe(target)
    return () => obs.disconnect()
  }, [pathname, isHome, isHidden])

  if (isHidden) return null

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || (!form.phone && !form.email)) return
    setBusy(true)
    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Quick CTA Callback Request — ${form.name} — Scene Set Studio`,
          from_name: form.name,
          email: form.email || '(not provided)',
          phone: form.phone || '(not provided)',
          message: form.message || '(no message)',
        }),
      })
    } catch {}
    setBusy(false)
    setSent(true)
  }

  function handleClose() {
    setOpen(false)
    setTimeout(() => { setForm({ name: '', phone: '', email: '', message: '' }); setSent(false) }, 300)
  }

  return (
    <>
      {/* ── Floating trigger button ── */}
      <button
        className={`fc-trigger${visible ? ' fc-trigger--visible' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Request a callback"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 13.6 19.79 19.79 0 0 1 1.62 5.08 2 2 0 0 1 3.62 3h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.91 10.9a16 16 0 0 0 6.09 6.09l.96-.96a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span className="fc-trigger__label">Text us</span>
        <span className="fc-trigger__pulse" aria-hidden="true" />
      </button>

      {/* ── Modal overlay ── */}
      {open && (
        <div className="fc-overlay" onClick={handleClose}>
          <div className="fc-modal" onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="fc-modal__head">
              <div className="fc-modal__head-text">
                <span className="fc-modal__eyebrow">Scene Set Studio</span>
                <h3 className="fc-modal__title">Let's talk.</h3>
                <p className="fc-modal__sub">We'll call you back within 24 hrs.</p>
              </div>
              <button className="fc-modal__close" onClick={handleClose} aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* WhatsApp button */}
            <a
              className="fc-wa-btn"
              href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Message on WhatsApp
            </a>

            <div className="fc-divider"><span>or request a callback</span></div>

            {/* Form */}
            {sent ? (
              <div className="fc-thanks">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <p>Got it — we'll call you back soon.</p>
              </div>
            ) : (
              <form className="fc-form" onSubmit={handleSubmit}>
                <div className="fc-form__field">
                  <label className="fc-form__label">Name *</label>
                  <input
                    className="fc-form__input"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="fc-form__row">
                  <div className="fc-form__field">
                    <label className="fc-form__label">Phone</label>
                    <input
                      className="fc-form__input"
                      type="tel"
                      name="phone"
                      placeholder="+1 (___) ___-____"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="fc-form__field">
                    <label className="fc-form__label">Email</label>
                    <input
                      className="fc-form__input"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="fc-form__field">
                  <label className="fc-form__label">Quick note</label>
                  <textarea
                    className="fc-form__input fc-form__textarea"
                    name="message"
                    placeholder="What's on your mind? (optional)"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                <button className="fc-form__submit" type="submit" disabled={busy}>
                  {busy ? 'Sending…' : 'Request Callback →'}
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  )
}
