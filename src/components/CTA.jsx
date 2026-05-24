import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['legendary']

/* â"€â"€ Animated SVG underline on hover â"€â"€ */
function AnimatedUnderline({ children, color = '#D4001E', wave = false }) {
  const pathRef = useRef(null)

  function onEnter() {
    gsap.fromTo(pathRef.current,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' }
    )
  }
  function onLeave() {
    gsap.to(pathRef.current, { strokeDashoffset: -1, duration: 0.4, ease: 'power2.in' })
  }

  const d = wave
    ? 'M 0 0.6 C 0.08 0.2, 0.18 1, 0.3 0.6 C 0.42 0.2, 0.52 1, 0.64 0.6 C 0.76 0.2, 0.88 1, 1 0.6'
    : 'M 0.01 0.5 C 0.25 0.2, 0.5 0.85, 0.75 0.3 C 0.88 0.05, 0.96 0.6, 1 0.5'

  return (
    <span className="svg-underlink" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {children}
      <svg className="svg-underlink__svg" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true">
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="0.07"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
        />
      </svg>
    </span>
  )
}

export default function CTA() {
  const sectionRef = useRef(null)
  const wordRef = useRef(null)
  const [contact, setContact] = useState('')
  const [sent, setSent] = useState(false)

  async function handleQuickSubmit(e) {
    e.preventDefault()
    if (!contact.trim()) return
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'b44a455f-02a4-48e4-b5e5-8ec134f81fc3',
          subject: 'Quick Consult Request — Scene Set Studio',
          contact,
        }),
      })
    } catch {}
    setSent(true)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-line--left',
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )
      gsap.fromTo('.cta-line--right',
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )

      // Draw-on for all doodle paths using pathLength="100" normalisation
      gsap.set('.cta-doodle-svg path', { strokeDasharray: 100, strokeDashoffset: 100 })
      gsap.to('.cta-doodle-svg path', {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })

      gsap.fromTo('.cta-action',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.35,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )

      gsap.fromTo('.cta-desktop-trust',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.55,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )

      gsap.fromTo('.cta-mobile-trust',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.6,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )

      gsap.fromTo('.cta-trust-pill',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out', stagger: 0.1, delay: 0.75,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="cta-section">

      {/* Mobile-only brand stamp blended into CTA bg */}
      <div className="mobile-brand-stamp" aria-hidden="true">
        <div className="mobile-brand-stamp__verts">
          <span className="mobile-brand-stamp__vert mobile-brand-stamp__vert--neon">SCENE</span>
          <span className="mobile-brand-stamp__vert mobile-brand-stamp__vert--neon mobile-brand-stamp__vert--delay1">SET</span>
        </div>
        <span className="mobile-brand-stamp__horiz mobile-brand-stamp__horiz--neon">STUDIO</span>
      </div>

      <div className="cta-text">

        {/* â"€â"€ Line 1: Let's build something â"€â"€ */}
        <div className="cta-line cta-line--left">
          Let's build something

          {/* Thick marker highlight (behind text via z-index) */}
          <svg className="cta-doodle-svg cta-marker-svg" viewBox="0 0 600 32"
            fill="none" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M3 17 C70 12, 190 20, 330 16 C430 12, 540 18, 597 16"
              stroke="#C8F535" strokeWidth="28" strokeLinecap="round" opacity="0.2"
              pathLength="100"
            />
            <path
              d="M6 10 C90 6, 220 13, 370 9 C460 6, 548 12, 594 10"
              stroke="#C8F535" strokeWidth="9" strokeLinecap="round" opacity="0.08"
              pathLength="100"
            />
          </svg>

          {/* Rough circle scribble - floats top-left */}
          <svg className="cta-doodle-svg cta-circle-svg" viewBox="0 0 130 110"
            fill="none" aria-hidden="true">
            <path
              d="M65 90 C25 88, 2 65, 4 40 C6 15, 32 2, 62 4 C92 6, 118 22, 120 48 C122 74, 100 92, 72 94 C48 96, 30 84, 26 68 C22 52, 36 40, 54 40 C72 40, 84 52, 82 64"
              stroke="rgba(212,0,30,0.45)" strokeWidth="2" strokeLinecap="round"
              pathLength="100"
            />
          </svg>
        </div>

        {/* â"€â"€ Line 2: rotating glitch word â"€â"€ */}
        <div className="cta-line cta-line--right cta-line--accent">
          <span ref={wordRef} className="cta-slide-word" data-text="legendary">
            {WORDS[0]}
          </span>

{/* Asterisk / starburst doodle */}
          <svg className="cta-doodle-svg cta-asterisk-svg" viewBox="0 0 36 36"
            fill="none" aria-hidden="true">
            <path d="M18 3 L18 33" stroke="#C8F535" strokeWidth="2.8" strokeLinecap="round" pathLength="100"/>
            <path d="M3 18 L33 18" stroke="#C8F535" strokeWidth="2.8" strokeLinecap="round" pathLength="100"/>
            <path d="M7 7 L29 29"  stroke="#C8F535" strokeWidth="2.8" strokeLinecap="round" pathLength="100"/>
            <path d="M29 7 L7 29"  stroke="#C8F535" strokeWidth="2.8" strokeLinecap="round" pathLength="100"/>
          </svg>
        </div>

      </div>

      <div className="cta-action">
        <button className="cta-btn" onClick={() => window.location.href = '/contact'}>
          <span className="cta-btn__main">Start Your Project &rarr;</span>
          <span className="cta-btn__sub cta-btn__sub--hide-mobile">Free discovery call &middot; No commitment</span>
        </button>

        {/* Desktop trust strip */}
        <div className="cta-desktop-trust">
          <div className="cta-desktop-trust__stat">
            <span className="cta-desktop-trust__num">48h</span>
            <span className="cta-desktop-trust__label">average response time</span>
          </div>
          <span className="cta-desktop-trust__sep" aria-hidden="true" />
          <div className="cta-desktop-trust__stat">
            <span className="cta-desktop-trust__num">100%</span>
            <span className="cta-desktop-trust__label">Canada-wide &amp; remote</span>
          </div>
          <span className="cta-desktop-trust__sep" aria-hidden="true" />
          <div className="cta-desktop-trust__stat">
            <span className="cta-desktop-trust__num">No contracts</span>
            <span className="cta-desktop-trust__label">start &amp; stop anytime</span>
          </div>
        </div>

        {/* Quick consult mini-form */}
        <hr className="cta-quick-consult-divider" aria-hidden="true" />
        <div className="cta-quick-consult">
          <span className="cta-quick-consult__headline">
            Not ready yet?&nbsp;<span className="cta-quick-consult__accent">Drop your contact — we'll reach out.</span>
          </span>
          {sent ? (
            <span className="cta-quick-consult__thanks">Got it. We'll be in touch shortly.</span>
          ) : (
            <form className="cta-quick-consult__form" onSubmit={handleQuickSubmit}>
              <input
                className="cta-quick-consult__input"
                type="text"
                placeholder="Email or phone number"
                value={contact}
                onChange={e => setContact(e.target.value)}
                aria-label="Email or phone number"
              />
              <button className="cta-quick-consult__btn" type="submit">Send</button>
            </form>
          )}
        </div>

      </div>

    </section>
  )
}
