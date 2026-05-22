import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   FAN TWEAKS
   rotate: degrees · y: px drop · CSS transform-origin in index.css
───────────────────────────────────────────────────────────── */
const FAN = [
  { x: -390, rotate: -10, y: 10, scale: 0.82, z: 1 },
  { x: -260, rotate:  -7, y:  6, scale: 0.88, z: 2 },
  { x: -130, rotate:  -4, y:  2, scale: 0.93, z: 3 },
  { x:    0, rotate:   0, y:  0, scale: 1.00, z: 7 },
  { x:  130, rotate:   4, y:  2, scale: 0.93, z: 3 },
  { x:  260, rotate:   7, y:  6, scale: 0.88, z: 2 },
  { x:  390, rotate:  10, y: 10, scale: 0.82, z: 1 },
]

const POSTS = [
  {
    brand: 'SceneSet Studio',
    title: 'Website Case Study',
    category: 'Brand System / Web Experience',
    year: '2026',
    stat: '01',
    art: 'sceneset',
    mark: 'SS',
    outcome: 'Full brand site',
    deliverables: ['UX', 'Identity', 'Motion'],
    palette: ['#F2F0EB', '#D4001E', '#080808'],
  },
  {
    brand: 'Ava Moretti',
    title: 'Launch Identity',
    category: 'Hospitality Brand / Social Campaign',
    year: '2026',
    stat: '02',
    art: 'hospitality',
    mark: 'AM',
    outcome: '+38% launch inquiries',
    deliverables: ['Launch', 'Reels', 'Ads'],
    palette: ['#F7D9C7', '#7A2E2E', '#1B1412'],
  },
  {
    brand: 'Mira Stone',
    title: 'Studio Rebrand',
    category: 'Creative Direction / Content Suite',
    year: '2025',
    stat: '03',
    art: 'studio',
    mark: 'MS',
    outcome: '3-week content system',
    deliverables: ['Brand', 'Social', 'Photo'],
    palette: ['#DDE6EA', '#384B5A', '#C6A56B'],
  },
  {
    brand: 'Rhodes & Co.',
    title: 'Retail Relaunch',
    category: 'Photo / Paid Ads / Landing Page',
    year: '2025',
    stat: '04',
    art: 'retail',
    mark: 'R&',
    outcome: 'Paid campaign refresh',
    deliverables: ['Ecom', 'Ads', 'Shoot'],
    palette: ['#F0E2B6', '#1F3A34', '#0B0B0B'],
  },
  {
    brand: 'Lena Hart',
    title: 'Beauty Campaign',
    category: 'Visual Identity / Reel System',
    year: '2025',
    stat: '05',
    art: 'beauty',
    mark: 'LH',
    outcome: 'Premium feed system',
    deliverables: ['Reels', 'UGC', 'Design'],
    palette: ['#F4C7D8', '#7C2946', '#25141D'],
  },
  {
    brand: 'Kai Mercer',
    title: 'Founder Brand',
    category: 'Personal Brand / Website / Content',
    year: '2026',
    stat: '06',
    art: 'founder',
    mark: 'KM',
    outcome: 'Founder-led funnel',
    deliverables: ['Web', 'Copy', 'Content'],
    palette: ['#C9D7FF', '#27326C', '#101018'],
  },
  {
    brand: 'Sofia Grant',
    title: 'Event Film Kit',
    category: 'Event Branding / Recap Campaign',
    year: '2025',
    stat: '07',
    art: 'events',
    mark: 'SG',
    outcome: 'Event recap suite',
    deliverables: ['Film', 'Photo', 'Social'],
    palette: ['#E9C16E', '#483114', '#111111'],
  },
]

function CaseStudyCover({ post }) {
  return (
    <article className={`scard scard--case scard--case-${post.art}`} aria-label={`${post.brand} case study cover`}>
      <div className="case-cover__top">
        <span>{post.stat}</span>
        <span>{post.year}</span>
      </div>
      <div className="case-cover__art" aria-hidden="true">
        <div className="case-cover__mark">{post.mark}</div>
        <div className="case-cover__device">
          <div className="case-cover__browser">
            <i />
            <i />
            <i />
            <strong>{post.brand.toLowerCase().replaceAll(' ', '')}.com</strong>
          </div>
          <div className="case-cover__screen">
            <span>{post.category.split(' / ')[0]}</span>
            <b>{post.brand}</b>
            <em>{post.title}</em>
            <div className="case-cover__screen-grid">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
        <div className="case-cover__phone">
          <span />
          <b />
          <i />
        </div>
        <div className="case-cover__poster case-cover__poster--one" />
        <div className="case-cover__poster case-cover__poster--two" />
      </div>
      <div className="case-cover__deliverables">
        {post.deliverables.map(item => <span key={item}>{item}</span>)}
      </div>
      <div className="case-cover__footer">
        <div>
          <span className="case-cover__label">Case Study</span>
          <h3>{post.brand}</h3>
          <p>{post.outcome}</p>
        </div>
        <div className="case-cover__palette" aria-hidden="true">
          {post.palette.map(color => <span key={color} style={{ background: color }} />)}
        </div>
      </div>
      <span className="case-cover__category">{post.category}</span>
    </article>
  )
}

function PhotoCard({ post }) {
  return <CaseStudyCover post={post} />
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
const CARD_TRANSITION = { type: 'tween', duration: 0.55, ease: [0.33, 1, 0.68, 1] }
const HOVER_TRANSITION = { type: 'tween', duration: 0.28, ease: [0.25, 1, 0.5, 1] }

const HOVER_NUDGE = [- 60, -45, -28, 0, 28, 45, 60]

/* Sibling push: cards near a hovered card spread outward */
const PUSH_BY_DIST = [0, 22, 14, 8]
function getSiblingPush(pos, hovPos) {
  if (hovPos === null) return 0
  const dist = Math.abs(pos - hovPos)
  const amount = PUSH_BY_DIST[Math.min(dist, PUSH_BY_DIST.length - 1)]
  return pos < hovPos ? -amount : pos > hovPos ? amount : 0
}

export default function Testimonials() {
  const [offset, setOffset] = useState(0)
  const [busy, setBusy] = useState(false)
  const [hoveredPos, setHoveredPos] = useState(null)
  const n = POSTS.length

  function lock() {
    setBusy(true)
    setTimeout(() => setBusy(false), 600)
  }

  function goPrev() {
    if (busy) return
    lock()
    setOffset(o => (o - 1 + n) % n)
  }

  function goNext() {
    if (busy) return
    lock()
    setOffset(o => (o + 1) % n)
  }

  function handleCardClick(clickedIdx) {
    if (busy) return
    const pos = ((clickedIdx - offset) % n + n) % n
    const centerPos = 3
    if (pos === centerPos) return
    lock()
    setOffset(o => ((o + (pos - centerPos)) % n + n) % n)
  }

  return (
    <section className="deck-section" id="testimonials">

      <div className="deck-header">
        <span className="deck-eyebrow">Case Studies</span>
        <h2 className="deck-title">Work that<br />speaks for itself.</h2>
      </div>

      <MobileCarousel />

      <div className="fan-stage">
        {POSTS.map((post, i) => {
          const pos = ((i - offset) % n + n) % n
          const f = FAN[Math.min(pos, FAN.length - 1)]
          const nudge = HOVER_NUDGE[pos] ?? 0
          const push = getSiblingPush(pos, hoveredPos)

          return (
            <motion.div
              key={i}
              className="fan-card-wrap"
              style={{ zIndex: f.z, cursor: 'pointer' }}
              animate={{ x: f.x + push, rotate: f.rotate, y: f.y, scale: f.scale, transition: CARD_TRANSITION }}
              whileHover={{ x: f.x + nudge, y: f.y - 8, scale: Math.min(f.scale + 0.05, 1.05), transition: HOVER_TRANSITION }}
              onHoverStart={() => setHoveredPos(pos)}
              onHoverEnd={() => setHoveredPos(null)}
              onClick={() => handleCardClick(i)}
            >
              <PhotoCard post={post} />
            </motion.div>
          )
        })}
        <div className="fan-arrows">
          <button className="fan-arrow" onClick={goPrev} aria-label="Previous">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button className="fan-arrow" onClick={goNext} aria-label="Next">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>

      <LogoGrid />

    </section>
  )
}
