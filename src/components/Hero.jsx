import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const badgeRef = useRef(null)
  const headlineRef = useRef(null)
  const subtextRef = useRef(null)
  const buttonsRef = useRef(null)
  const visualRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })

      // Badge
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        0.2
      )

      // Headline words
      const words = headlineRef.current.querySelectorAll('.hero-word')
      tl.fromTo(
        words,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.08 },
        0.4
      )

      // Subtext
      tl.fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        0.7
      )

      // Buttons
      const btns = buttonsRef.current.querySelectorAll('button')
      tl.fromTo(
        btns,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1 },
        0.8
      )

      // Visual placeholder
      tl.fromTo(
        visualRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0 },
        1.0
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero-section">
      {/* Badge */}
      <div ref={badgeRef} className="hero-badge" style={{ opacity: 0 }}>
        <span className="hero-badge__dot" />
        <span className="hero-badge__text">Now accepting new clients</span>
      </div>

      {/* Headline */}
      <h1 ref={headlineRef} className="hero-headline">
        <span className="hero-word">Marketing</span>{' '}
        <span className="hero-word">that</span>
        <br />
        <span className="hero-word hero-word--italic">actually</span>{' '}
        <span className="hero-word">works.</span>
      </h1>

      {/* Subtext */}
      <p ref={subtextRef} className="hero-subtext" style={{ opacity: 0 }}>
        Cinematic storytelling meets performance marketing.
        <br />
        We build brands that convert.
      </p>

      {/* Buttons */}
      <div ref={buttonsRef} className="hero-buttons">
        <button className="hero-btn hero-btn--primary" style={{ opacity: 0 }}>
          Start Your Project →
        </button>
        <button className="hero-btn hero-btn--ghost" style={{ opacity: 0 }}>
          See Our Work
        </button>
      </div>

      {/* Visual Placeholder */}
      <div ref={visualRef} className="hero-visual" style={{ opacity: 0 }}>
        <span className="hero-visual__label">[ Visual ]</span>
      </div>
    </section>
  )
}
