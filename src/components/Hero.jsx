import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LiquidBackground from './LiquidBackground'
import PosterPlaceholderIcon from './PosterPlaceholderIcon'

gsap.registerPlugin(ScrollTrigger)

const BASE_COLS = [
  [{ h: 320, c: 0 }, { h: 380, c: 1 }, { h: 300, c: 2 }, { h: 360, c: 3 }, { h: 340, c: 4 }, { h: 290, c: 5 }],
  [{ h: 360, c: 6 }, { h: 300, c: 7 }, { h: 380, c: 0 }, { h: 320, c: 1 }, { h: 290, c: 2 }, { h: 350, c: 3 }],
  [{ h: 300, c: 4 }, { h: 350, c: 5 }, { h: 320, c: 6 }, { h: 380, c: 7 }, { h: 340, c: 0 }, { h: 310, c: 1 }],
  [{ h: 380, c: 2 }, { h: 310, c: 3 }, { h: 360, c: 4 }, { h: 300, c: 5 }, { h: 350, c: 6 }, { h: 320, c: 7 }],
  [{ h: 340, c: 1 }, { h: 290, c: 0 }, { h: 350, c: 3 }, { h: 320, c: 2 }, { h: 380, c: 5 }, { h: 300, c: 4 }],
]

const TABLE_COLS = BASE_COLS.map(col => [...col, ...col])

const HERO_POSTER_SLOTS = {
  // Replace these src values later with files in /public, for example:
  // src: `${import.meta.env.BASE_URL}assets/hero-posters/brand-campaign-01.jpg`
  'hero-0-0': { label: 'Column 1 / Card 1', src: '' },
  'hero-0-1': { label: 'Column 1 / Card 2', src: '' },
  'hero-0-2': { label: 'Column 1 / Card 3', src: '' },
  'hero-0-3': { label: 'Column 1 / Card 4', src: '' },
  'hero-1-0': { label: 'Column 2 / Card 1', src: '' },
  'hero-1-1': { label: 'Column 2 / Card 2', src: '' },
  'hero-1-2': { label: 'Column 2 / Card 3', src: '' },
  'hero-1-3': { label: 'Column 2 / Card 4', src: '' },
  'hero-2-0': { label: 'Column 3 / Card 1', src: '' },
  'hero-2-1': { label: 'Column 3 / Card 2', src: '' },
  'hero-2-2': { label: 'Column 3 / Card 3', src: '' },
  'hero-2-3': { label: 'Column 3 / Card 4', src: '' },
}

export default function Hero() {
  const badgeRef        = useRef(null)
  const headlineRef     = useRef(null)
  const subtextRef      = useRef(null)
  const buttonsRef      = useRef(null)
  const visualWrapperRef = useRef(null)
  const visualRef       = useRef(null)
  const tableRef        = useRef(null)
  const colRefs         = useRef([])

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

      // ── Infinite column scroll ──
      colRefs.current.forEach((col, i) => {
        if (!col) return
        const totalH = col.scrollHeight / 2
        const dir    = i % 2 === 0 ? -1 : 1
        const speed  = 22 + i * 4

        gsap.set(col, { y: dir === -1 ? 0 : -totalH })
        gsap.to(col, {
          y: dir === -1 ? -totalH : 0,
          duration: speed,
          ease: 'none',
          repeat: -1,
        })
      })

      // ── Scroll zoom — pin hero, expand to fullscreen ──
      gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: '+=190%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })
      .to(visualWrapperRef.current, {
        top: 0, left: 0, right: 0, bottom: 0,
        yPercent: 0, borderRadius: 0, padding: 0,
        ease: 'none',
      }, 0)
      .to(visualRef.current, {
        height: '100vh',
        borderRadius: 0,
        ease: 'none',
      }, 0)
      .fromTo(tableRef.current,
        { rotateX: 15 },
        { rotateX: 62, ease: 'none' },
      0)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero-section">
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
          We build brands that convert.
        </p>

        <div ref={buttonsRef} className="hero-buttons">
          <button className="hero-btn hero-btn--primary" style={{ opacity: 0 }}>
            Start Your Project →
          </button>
          <button className="hero-btn hero-btn--ghost" style={{ opacity: 0 }}>
            See Our Work
          </button>
        </div>
      </div>

      {/* Visual — 3D table carousel, zooms to fullscreen on scroll */}
      <div ref={visualWrapperRef} className="hero-visual-wrapper" style={{ opacity: 0 }}>
        <div ref={visualRef} className="hero-visual">

          {/* 3D tilt stage */}
          <div ref={tableRef} className="hero-table">
            {TABLE_COLS.map((col, ci) => (
              <div
                key={ci}
                className="hero-table-col"
                ref={el => colRefs.current[ci] = el}
              >
                {col.map((card, idx) => (
                  (() => {
                    const slotId = `hero-${ci}-${idx}`
                    const poster = HERO_POSTER_SLOTS[slotId]
                    const hasPoster = Boolean(poster?.src)

                    return (
                      <div
                        key={idx}
                        className={`hero-table-card${hasPoster ? ' hero-table-card--has-media' : ''}`}
                        style={{ height: card.h }}
                        data-slot={poster ? slotId : undefined}
                      >
                        {hasPoster ? (
                          <img
                            className="hero-table-card__media"
                            src={poster.src}
                            alt={poster.label}
                          />
                        ) : (
                          <PosterPlaceholderIcon variant={card.c + ci + idx} />
                        )}
                      </div>
                    )
                  })()
                ))}
              </div>
            ))}
          </div>

          {/* Fade masks top + bottom */}
          <div className="hero-visual__fade-top" />
          <div className="hero-visual__fade-bottom" />

        </div>
      </div>
    </section>
  )
}
