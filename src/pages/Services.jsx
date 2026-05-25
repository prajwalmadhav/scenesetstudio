import { useState, useRef, useEffect } from 'react'
import SEO from '../components/SEO'
import StandardServicesSection from '../components/StandardServicesSection'

const S = 22, R = 1.8 // square size & radius shorthand

const PIXEL_PATTERNS = [
  // 0 — PLAN: balanced top/bottom/left
  <>
    <rect x="6"  y="-7" width={S} height={S} rx={R} fill="#000" />
    <rect x="62" y="-7" width={S} height={S} rx={R} fill="#000" />
    <rect x="18" y="93" width={S} height={S} rx={R} fill="#000" />
    <rect x="68" y="93" width={S} height={S} rx={R} fill="#000" />
    <rect x="-7" y="18" width={S} height={S} rx={R} fill="#000" />
    <rect x="-7" y="64" width={S} height={S} rx={R} fill="#000" />
  </>,
  // 1 — STORY: top + left heavy
  <>
    <rect x="10" y="-7" width={S} height={S} rx={R} fill="#000" />
    <rect x="42" y="-7" width={S} height={S} rx={R} fill="#000" />
    <rect x="72" y="-7" width={S} height={S} rx={R} fill="#000" />
    <rect x="-7" y="10" width={S} height={S} rx={R} fill="#000" />
    <rect x="-7" y="44" width={S} height={S} rx={R} fill="#000" />
    <rect x="-7" y="72" width={S} height={S} rx={R} fill="#000" />
    <rect x="50" y="93" width={S} height={S} rx={R} fill="#000" />
  </>,
  // 2 — REACH: corners + center edges, no right
  <>
    <rect x="-7" y="-7" width={S} height={S} rx={R} fill="#000" />
    <rect x="70" y="-7" width={S} height={S} rx={R} fill="#000" />
    <rect x="-7" y="78" width={S} height={S} rx={R} fill="#000" />
    <rect x="35" y="-7" width={S} height={S} rx={R} fill="#000" />
    <rect x="35" y="93" width={S} height={S} rx={R} fill="#000" />
    <rect x="-7" y="40" width={S} height={S} rx={R} fill="#000" />
  </>,
  // 3 — CLOSE: bottom + left heavy
  <>
    <rect x="8"  y="93" width={S} height={S} rx={R} fill="#000" />
    <rect x="42" y="93" width={S} height={S} rx={R} fill="#000" />
    <rect x="72" y="93" width={S} height={S} rx={R} fill="#000" />
    <rect x="20" y="-7" width={S} height={S} rx={R} fill="#000" />
    <rect x="-7" y="20" width={S} height={S} rx={R} fill="#000" />
    <rect x="-7" y="55" width={S} height={S} rx={R} fill="#000" />
  </>,
  // 4 — BUILD: top + bottom diagonal, no right
  <>
    <rect x="50" y="-7" width={S} height={S} rx={R} fill="#000" />
    <rect x="78" y="-7" width={S} height={S} rx={R} fill="#000" />
    <rect x="-7" y="25" width={S} height={S} rx={R} fill="#000" />
    <rect x="-7" y="65" width={S} height={S} rx={R} fill="#000" />
    <rect x="8"  y="93" width={S} height={S} rx={R} fill="#000" />
    <rect x="40" y="93" width={S} height={S} rx={R} fill="#000" />
  </>,
]

const SERVICES = [
  {
    label: 'Strategy that sets the direction.',
    sub: 'Creative strategy and direction.',
    sticker: 'PLAN',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&auto=format&fit=crop&q=80',
  },
  {
    label: 'Content that holds attention.',
    sub: 'Content marketing and video production.',
    sticker: 'STORY',
    img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&auto=format&fit=crop&q=80',
  },
  {
    label: 'Execution that compounds.',
    sub: 'Social media and performance marketing.',
    sticker: 'REACH',
    img: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=900&auto=format&fit=crop&q=80',
  },
  {
    label: 'Narrative that closes.',
    sub: 'Brand identity and storytelling.',
    sticker: 'CLOSE',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
  },
  {
    label: 'Experience that converts.',
    sub: 'Web design, UI & UX.',
    sticker: 'BUILD',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&auto=format&fit=crop&q=80',
  },
]

export default function Services() {
  const [active, setActive]       = useState(null)
  const [sticker, setSticker]     = useState(null)
  const [visible, setVisible]     = useState(false)
  const stickerRef                = useRef(null)
  const rafRef                    = useRef(null)
  const posRef                    = useRef({ x: 0, y: 0 })

  // Smooth cursor follow via rAF
  useEffect(() => {
    const tick = () => {
      if (stickerRef.current) {
        stickerRef.current.style.transform =
          `translate(${posRef.current.x}px, ${posRef.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const onMouseMove = (e) => {
    posRef.current = { x: e.clientX, y: e.clientY }
  }

  const onEnter = (i) => {
    setActive(i)
    setSticker(SERVICES[i].sticker)
    setVisible(true)
  }

  const onLeave = () => {
    setVisible(false)
    setActive(null)
  }

  return (
    <>
      <SEO
        title="Services | Scene Set Studio"
        description="Brand strategy, content production, paid advertising, social media, web design, and video production — Scene Set Studio."
      />

      {/* Custom cursor — arrow + label */}
      <div
        ref={stickerRef}
        className={`svc-sticker${visible ? ' is-visible' : ''}`}
        aria-hidden="true"
      >
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" className="svc-sticker-arrow">
          <path d="M1 1L1 14L4.5 10.5L7 16.5L9 15.5L6.5 9.5L11 9.5Z" fill="#000" stroke="#000" strokeWidth="0.5" strokeLinejoin="round"/>
        </svg>
        <span>{sticker}</span>
      </div>

      <section className="svc-section" id="services" onMouseMove={onMouseMove}>

        {/* Background watermarks */}
        <div className="svc-bg-text-wrap">
          <span className="svc-bg-text svc-bg-text--h">BRAND</span>
          <span className="svc-bg-text svc-bg-text--v">IDENTITY</span>
        </div>

        {/* Section headline */}
        <div className="svc-headline">
<h2 className="svc-headline__title"><span className="svc-headline__accent">W</span>e build brands that<br /><span style={{ display: 'block', paddingLeft: '6ch' }}>move people to act.</span></h2>
        </div>

        {/* Main content over watermarks */}
        <div className="svc-hover-layout">

          {/* Square image */}
          <div className="svc-hover-img">
            {SERVICES.map((svc, i) => (
              <img
                key={i}
                src={svc.img}
                alt={svc.label}
                className="svc-hover-photo"
                style={{ opacity: active === i || (active === null && i === 0) ? 1 : 0 }}
              />
            ))}

            {/* Pixel squares overlay — pattern per active image (hidden) */}
            <svg
              className="svc-pixel-overlay"
              style={{ display: 'none' }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {PIXEL_PATTERNS[active]}
            </svg>
          </div>

          {/* Service text list */}
          <nav className="svc-hover-list">
            {SERVICES.map((svc, i) => (
              <button
                key={i}
                className="svc-hover-item"
                onMouseEnter={() => onEnter(i)}
                onMouseLeave={onLeave}
              >
                <span className="svc-text-roll">
                  <span className="svc-text-roll__a">{svc.label}</span>
                  <span className="svc-text-roll__b" aria-hidden="true">{svc.label}</span>
                </span>
                <span className="svc-item-sub">{svc.sub}</span>
              </button>
            ))}
          </nav>

        </div>
      </section>

      <StandardServicesSection showBg={false} />
    </>
  )
}
