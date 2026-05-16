import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/* ─────────────────────────────────────────────────────────────
   FAN TWEAKS
   rotate: degrees · y: px drop · CSS transform-origin in index.css
───────────────────────────────────────────────────────────── */
const FAN = [
  { rotate: -22, y:  2, scale: 0.88, z: 1 },
  { rotate: -14, y:  1, scale: 0.93, z: 2 },
  { rotate:  -6, y:  0, scale: 0.97, z: 3 },
  { rotate:   0, y:  0, scale: 1.00, z: 7 },
  { rotate:   6, y:  0, scale: 0.97, z: 3 },
  { rotate:  14, y:  1, scale: 0.93, z: 2 },
  { rotate:  22, y:  2, scale: 0.88, z: 1 },
]

const POSTS = [
  { img: 'https://picsum.photos/seed/sss-card1/400/530' },
  { img: 'https://picsum.photos/seed/sss-card2/400/530' },
  { img: 'https://picsum.photos/seed/sss-card3/400/530' },
  { img: 'https://picsum.photos/seed/sss-card4/400/530' },
  { img: 'https://picsum.photos/seed/sss-card5/400/530' },
  { img: 'https://picsum.photos/seed/sss-card6/400/530' },
  { img: 'https://picsum.photos/seed/sss-card7/400/530' },
]

function PhotoCard({ post }) {
  return (
    <div className="scard scard--photo">
      <img src={post.img} alt="" loading="lazy" draggable="false" />
    </div>
  )
}

/* ── Logo Grid ── */
const LogoPremierePro = () => (
  <svg viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 110, height: 34 }}>
    <text x="2" y="26" fontFamily="-apple-system, sans-serif" fontSize="17" fontWeight="400" fill="white" letterSpacing="-0.3">Premiere</text>
  </svg>
)

const LogoPerplexity = () => (
  <svg viewBox="0 0 170 36" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ width: 150, height: 34 }}>
    <g transform="translate(11,18)">
      {[0, 30, 60, 90, 120, 150].map((a, i) => (
        <line key={i}
          x1={Math.cos(a * Math.PI / 180) * -9} y1={Math.sin(a * Math.PI / 180) * -9}
          x2={Math.cos(a * Math.PI / 180) * 9}  y2={Math.sin(a * Math.PI / 180) * 9}
          stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      ))}
    </g>
    <text x="28" y="26" fontFamily="-apple-system, sans-serif" fontSize="19" fontWeight="400" fill="white" letterSpacing="-0.3">perplexity</text>
  </svg>
)

const LogoIllustrator = () => (
  <svg viewBox="0 0 110 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 110, height: 34 }}>
    <text x="2" y="26" fontFamily="-apple-system, sans-serif" fontSize="17" fontWeight="400" fill="white" letterSpacing="-0.3">Illustrator</text>
  </svg>
)

const LogoAfterEffects = () => (
  <svg viewBox="0 0 125 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 120, height: 34 }}>
    <text x="2" y="26" fontFamily="-apple-system, sans-serif" fontSize="17" fontWeight="400" fill="white" letterSpacing="-0.3">After Effects</text>
  </svg>
)

const LogoDJI = () => (
  <svg viewBox="0 0 72 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 64, height: 34 }}>
    <text x="2" y="27" fontFamily="-apple-system, sans-serif" fontSize="26" fontWeight="800" letterSpacing="1" fill="white">DJI</text>
  </svg>
)

const LogoSony = () => (
  <svg viewBox="0 0 88 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 80, height: 34 }}>
    <text x="2" y="27" fontFamily="-apple-system, sans-serif" fontSize="22" fontWeight="600" letterSpacing="3" fill="white">SONY</text>
  </svg>
)

const LOGOS = [
  { id: 'premiere',     El: LogoPremierePro,   label: 'Adobe Premiere Pro' },
  { id: 'perplexity',   El: LogoPerplexity,    label: 'Perplexity' },
  { id: 'illustrator',  El: LogoIllustrator,   label: 'Adobe Illustrator' },
  { id: 'aftereffects', El: LogoAfterEffects,  label: 'After Effects' },
  { id: 'dji',          El: LogoDJI,           label: 'DJI' },
  { id: 'sony',         El: LogoSony,          label: 'Sony' },
]

function CornerTicks() {
  const s = 8
  return (
    <svg className="logo-grid__ticks" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d={`M ${s} 2 L 2 2 L 2 ${s}`}             fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <path d={`M ${100-s} 2 L 98 2 L 98 ${s}`}        fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <path d={`M ${100-s} 98 L 98 98 L 98 ${100-s}`}  fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <path d={`M ${s} 98 L 2 98 L 2 ${100-s}`}        fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
    </svg>
  )
}

function LogoGrid() {
  return (
    <div className="logo-grid">
      <p className="logo-grid__label">Trusted tools &amp; partners</p>
      <div className="logo-grid__cells">
        {LOGOS.map(({ id, El, label }) => (
          <div key={id} className="logo-grid__cell">
            <CornerTicks />
            <El aria-label={label} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Mobile deck carousel ── */
function MobileCarousel() {
  const [current, setCurrent] = useState(0)
  const touchStart = useRef(null)
  const n = POSTS.length

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % n), 3000)
    return () => clearInterval(t)
  }, [n])

  function goNext() { setCurrent(c => (c + 1) % n) }
  function goPrev() { setCurrent(c => (c - 1 + n) % n) }

  function onTouchStart(e) { touchStart.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (touchStart.current === null) return
    const dx = e.changedTouches[0].clientX - touchStart.current
    if (dx < -40) goNext()
    else if (dx > 40) goPrev()
    touchStart.current = null
  }

  return (
    <div className="mob-deck">
      <div className="mob-deck__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {POSTS.map((post, i) => {
          const offset = (i - current + n) % n
          if (offset > 2) return null
          return (
            <div key={i} className="mob-deck__card" style={{
              zIndex: n - offset,
              transform: `translateY(${offset * 12}px) scale(${1 - offset * 0.06})`,
              opacity: offset === 0 ? 1 : 0.55,
              transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease',
            }}>
              <PhotoCard post={post} />
            </div>
          )
        })}
      </div>
      <div className="mob-deck__nav">
        <button className="mob-deck__btn" onClick={goPrev} aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className="mob-deck__dots">
          {POSTS.map((_, i) => (
            <span key={i} className={`mob-deck__dot${i === current ? ' mob-deck__dot--on' : ''}`} />
          ))}
        </div>
        <button className="mob-deck__btn" onClick={goNext} aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Testimonials() {
  const cardEls  = useRef([])
  const offsetRef = useRef(0)
  const animating = useRef(false)

  function applyFan(animated = false) {
    const n = POSTS.length
    POSTS.forEach((_, i) => {
      const el = cardEls.current[i]
      if (!el) return
      const pos = ((i - offsetRef.current) % n + n) % n
      const f = FAN[Math.min(pos, FAN.length - 1)]
      el.style.zIndex = f.z
      const props = { rotate: f.rotate, y: f.y, scale: f.scale }
      animated ? gsap.to(el, { ...props, duration: 0.55, ease: 'power3.out' })
               : gsap.set(el, props)
    })
  }

  function handleCardClick(clickedIdx) {
    if (animating.current) return
    const n = POSTS.length
    const currentPos = ((clickedIdx - offsetRef.current) % n + n) % n
    const centerPos = 3
    if (currentPos === centerPos) return
    animating.current = true
    offsetRef.current = ((offsetRef.current + (currentPos - centerPos)) % n + n) % n
    applyFan(true)
    setTimeout(() => { animating.current = false }, 600)
  }

  function handleHoverEnter(i) {
    const el = cardEls.current[i]
    if (!el) return
    const pos = ((i - offsetRef.current) % POSTS.length + POSTS.length) % POSTS.length
    const xShift = pos < 3 ? -100 : pos > 3 ? 100 : 0
    gsap.to(el, { x: xShift, y: '-=0', scale: 1.03, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
  }

  function handleHoverLeave(i) {
    const el = cardEls.current[i]
    if (!el) return
    const pos = ((i - offsetRef.current) % POSTS.length + POSTS.length) % POSTS.length
    const f = FAN[Math.min(pos, FAN.length - 1)]
    gsap.to(el, { y: f.y, x: 0, scale: f.scale, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
  }

  useEffect(() => { applyFan(false) }, [])

  return (
    <section className="deck-section" id="testimonials">

      <div className="deck-header">
        <span className="deck-eyebrow">What clients say</span>
        <h2 className="deck-title">Real results.<br />Real people.</h2>
      </div>

      <MobileCarousel />

      <div className="fan-stage">
        {POSTS.map((post, i) => (
          <div
            key={i}
            ref={el => cardEls.current[i] = el}
            className="fan-card-wrap"
            onClick={() => handleCardClick(i)}
            onMouseEnter={() => handleHoverEnter(i)}
            onMouseLeave={() => handleHoverLeave(i)}
            style={{ cursor: 'pointer' }}
          >
            <PhotoCard post={post} />
          </div>
        ))}
        <p className="fan-hint">tap any card to bring it forward</p>
      </div>

      <LogoGrid />

    </section>
  )
}
