import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['extraordinary', 'cinematic', 'unforgettable', 'iconic', 'legendary', 'immersive']

export default function CTA() {
  const sectionRef = useRef(null)
  const [wordIndex, setWordIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)

  // Rotate words with glitch flash
  useEffect(() => {
    const cycle = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => {
        setWordIndex(i => (i + 1) % WORDS.length)
        setTimeout(() => setIsGlitching(false), 180)
      }, 320)
    }, 3200)
    return () => clearInterval(cycle)
  }, [])

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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="cta-section">

      <div className="cta-text">

        {/* ── Line 1: Let's build something ── */}
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

          {/* Rough circle scribble — floats top-left */}
          <svg className="cta-doodle-svg cta-circle-svg" viewBox="0 0 130 110"
            fill="none" aria-hidden="true">
            <path
              d="M65 90 C25 88, 2 65, 4 40 C6 15, 32 2, 62 4 C92 6, 118 22, 120 48 C122 74, 100 92, 72 94 C48 96, 30 84, 26 68 C22 52, 36 40, 54 40 C72 40, 84 52, 82 64"
              stroke="rgba(200,245,53,0.45)" strokeWidth="2" strokeLinecap="round"
              pathLength="100"
            />
          </svg>
        </div>

        {/* ── Line 2: rotating glitch word ── */}
        <div className="cta-line cta-line--right cta-line--accent">
          <span
            className={`cta-glitch-word${isGlitching ? ' is-glitching' : ''}`}
            data-text={WORDS[wordIndex]}
          >
            {WORDS[wordIndex]}
          </span>
          .

          {/* Wavy underline beneath the line */}
          <svg className="cta-doodle-svg cta-wavy-svg" viewBox="0 0 600 26"
            fill="none" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0 13 C18 3, 36 23, 54 13 C72 3, 90 23, 108 13 C126 3, 144 23, 162 13 C180 3, 198 23, 216 13 C234 3, 252 23, 270 13 C288 3, 306 23, 324 13 C342 3, 360 23, 378 13 C396 3, 414 23, 432 13 C450 3, 468 23, 486 13 C504 3, 522 23, 540 13 C558 3, 576 22, 600 13"
              stroke="#C42087" strokeWidth="0.85" strokeLinecap="round"
              pathLength="100"
            />
          </svg>

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
        <button className="cta-btn">
          <span>Start Your Project</span>
          <span className="cta-btn__arrow">→</span>
        </button>
        <p className="cta-sub">Free discovery call · No commitment</p>
      </div>

    </section>
  )
}
