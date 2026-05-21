import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LiquidBackground from './LiquidBackground'
import PosterPlaceholderIcon from './PosterPlaceholderIcon'

const HERO_WORDS = ['convert', 'captivate', 'perform', 'resonate', 'scale']

gsap.registerPlugin(ScrollTrigger)

const BASE_COLS = [
  [{ h: 320, c: 0 }, { h: 380, c: 1 }, { h: 300, c: 2 }, { h: 360, c: 3 }, { h: 340, c: 4 }],
  [{ h: 360, c: 5 }, { h: 300, c: 6 }, { h: 380, c: 7 }, { h: 320, c: 0 }, { h: 290, c: 1 }],
  [{ h: 300, c: 2 }, { h: 350, c: 3 }, { h: 320, c: 4 }, { h: 380, c: 5 }, { h: 340, c: 6 }],
]

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setWordIdx(i => (i + 1) % HERO_WORDS.length)
        setFading(false)
      }, 300)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  const badgeRef        = useRef(null)
  const headlineRef     = useRef(null)
  const subtextRef      = useRef(null)
  const buttonsRef      = useRef(null)
  const visualWrapperRef = useRef(null)
  const visualRef       = useRef(null)
  const tableRef        = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance animations ──
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })

      tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.2)

      const words = headlineRef.current.querySelectorAll('.hero-word')
      tl.fromTo(words, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.08 }, 0.4)

      tl.fromTo(subtextRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.7)

      const btns = buttonsRef.current.querySelectorAll('button')
      tl.fromTo(btns, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1 }, 0.8)

      tl.fromTo(visualWrapperRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 1.0)

      // ── Scroll zoom — pin hero, expand to fullscreen ──
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      const vh = window.innerHeight

      gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: `+=${isMobile ? '50%' : '70%'}`,
          pin: true,
          scrub: isMobile ? 1 : 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // prevent browser chrome show/hide from triggering refresh on mobile
          ...(isMobile && { refreshPriority: -1 }),
        },
      })
      .to(visualWrapperRef.current, {
        top: 0, left: 0, right: 0, bottom: 0,
        yPercent: 0, borderRadius: 0, padding: 0,
        ease: 'none',
      }, 0)
      .to(visualRef.current, {
        // use px snapshot instead of dvh to avoid mobile chrome resize glitch
        height: vh,
        borderRadius: 0,
        ease: 'none',
      }, 0)
      .fromTo(tableRef.current,
        { rotateX: isMobile ? 18 : 15 },
        { rotateX: isMobile ? 55 : 62, ease: 'none' },
      0)
      .to(headlineRef.current, { opacity: 0, ease: 'none' }, 0)
      .to(buttonsRef.current,  { opacity: 0, ease: 'none' }, 0)
    })

    return () => ctx.revert()
  }, [])

  const sectionRef = useRef(null)

  return (
    <section className="hero-section" ref={sectionRef}>
      <LiquidBackground />

      {/* Text + CTA */}
      <div className="hero-content">
        <div ref={badgeRef} className="hero-badge" style={{ opacity: 0 }}>
          <span className="hero-badge__dot" />
          <span className="hero-badge__text">Now accepting new clients</span>
        </div>

        <h1 ref={headlineRef} className="hero-headline">
          <span className="hero-word">Marketing</span>{' '}
          <span className="hero-word">that</span>
          <br />
          <span className="hero-word hero-word--italic">actually</span>{' '}
          <span className="hero-word">works.</span>
        </h1>

        <p ref={subtextRef} className="hero-subtext" style={{ opacity: 0 }}>
          Cinematic storytelling meets performance marketing.
          <br />
          We build brands that resonate.
        </p>

        <div ref={buttonsRef} className="hero-buttons">
          <button className="hero-btn hero-btn--primary" style={{ opacity: 0 }} onClick={() => window.location.href = '/contact'}>
            Get Started →
          </button>
          <button className="hero-btn hero-btn--ghost" style={{ opacity: 0 }} onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}>
            See Our Work <span className="hero-btn__arrow">↓</span>
          </button>
        </div>
      </div>

      {/* Visual — 3D table carousel, zooms to fullscreen on scroll */}
      <div ref={visualWrapperRef} className="hero-visual-wrapper" style={{ opacity: 0 }}>
        <div ref={visualRef} className="hero-visual">

          {/* 3D tilt stage */}
          <div ref={tableRef} className="hero-table">
            {/* Desktop: 3 static columns */}
            <div className="hero-table-cols">
              {BASE_COLS.map((col, ci) => (
                <div key={ci} className="hero-table-col">
                  {col.map((card, idx) => (
                    <div key={idx} className="hero-table-card" style={{ height: card.h }}>
                      <PosterPlaceholderIcon variant={card.c + ci + idx} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Mobile: single centered card */}
            <div className="hero-single-card">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-single-card__icon">
                <rect x="1" y="1" width="78" height="78" rx="16" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
                <path d="M24 30c0-3.314 2.686-6 6-6h9c3.314 0 6 2.686 6 6s-2.686 6-6 6H30c-3.314 0-6 2.686-6 6s2.686 6 6 6h9c3.314 0 6-2.686 6-6" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round"/>
                <path d="M38 30c0-3.314 2.686-6 6-6h1c3.314 0 6 2.686 6 6s-2.686 6-6 6H38c-3.314 0-6 2.686-6 6s2.686 6 6 6h1c3.314 0 6-2.686 6-6" stroke="rgba(255,255,255,0.35)" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              <span className="hero-single-card__label">SceneSet Studio</span>
            </div>
          </div>

          {/* Fade masks top + bottom */}
          <div className="hero-visual__fade-top" />
          <div className="hero-visual__fade-bottom" />

        </div>
      </div>
    </section>
  )
}
