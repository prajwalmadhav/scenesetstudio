import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────
   FAN TWEAKS — edit these numbers to reshape the arc
   FAN_ANGLE   : rotation of outermost card in degrees (higher = wider spread)
   FAN_Y_DROP  : how far the outermost cards fall in px  (lower = more horizontal)
   FAN_SCALE   : [center, mid, outer] card size multipliers
   CSS transform-origin Y% is set in index.css (.fan-card-wrap)
   — raise that % to push the pivot further below → flatter arc
───────────────────────────────────────────────────────────── */
/* 7-card fan matching reference — rotate: degrees, y: px drop from center top */
const FAN = [
  { rotate: -22, y:  2, scale: 0.88, z: 1 },
  { rotate: -14, y:  1, scale: 0.93, z: 2 },
  { rotate:  -6, y:  0, scale: 0.97, z: 3 },
  { rotate:   0, y:  0, scale: 1.00, z: 7 },
  { rotate:   6, y:  0, scale: 0.97, z: 3 },
  { rotate:  14, y:  1, scale: 0.93, z: 2 },
  { rotate:  22, y:  2, scale: 0.88, z: 1 },
]


/* ── 7 image cards ── */
const POSTS = [
  { img: 'https://picsum.photos/seed/sss-card1/400/530' },
  { img: 'https://picsum.photos/seed/sss-card2/400/530' },
  { img: 'https://picsum.photos/seed/sss-card3/400/530' },
  { img: 'https://picsum.photos/seed/sss-card4/400/530' },
  { img: 'https://picsum.photos/seed/sss-card5/400/530' },
  { img: 'https://picsum.photos/seed/sss-card6/400/530' },
  { img: 'https://picsum.photos/seed/sss-card7/400/530' },
]

/* ── Pure photo card ── */
function PhotoCard({ post }) {
  return (
    <div className="scard scard--photo">
      <img src={post.img} alt="" loading="lazy" draggable="false" />
    </div>
  )
}

/* ── Icon components ── */
const IgGradientDef = () => (
  <defs>
    <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#f09433" />
      <stop offset="25%" stopColor="#e6683c" />
      <stop offset="50%" stopColor="#dc2743" />
      <stop offset="75%" stopColor="#cc2366" />
      <stop offset="100%" stopColor="#bc1888" />
    </linearGradient>
  </defs>
)

const IconIG = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <IgGradientDef />
    <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)" />
    <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.6" />
    <circle cx="17.5" cy="6.5" r="1.1" fill="white" />
  </svg>
)

const IconX = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const IconVerified = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#1d9bf0">
    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91-1.01-1.01-2.52-1.27-3.91-.81C14.67 2.88 13.43 2 12 2s-2.67.88-3.34 2.19c-1.39-.46-2.9-.2-3.91.81-1.01 1.01-1.27 2.52-.81 3.91C2.88 9.33 2 10.57 2 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.9.81 3.91 1.01 1.01 2.52 1.27 3.91.81C9.33 21.12 10.57 22 12 22s2.67-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81 1.01-1.01 1.27-2.52.81-3.91C21.12 14.67 22 13.43 22 12zm-6.16-2.52-4.5 6a.75.75 0 01-1.15.07l-2.5-2.5a.75.75 0 011.06-1.06l1.89 1.89 3.96-5.28a.75.75 0 011.24.88z" />
  </svg>
)

const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconComment = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconShare = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.5">
    <line x1="22" y1="2" x2="11" y2="13" strokeLinecap="round" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconBookmark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.5">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ── Tweet screenshot card ── */
function TweetCard({ post }) {
  return (
    <div className="scard scard--tweet">
      {/* Status bar */}
      <div className="scard__statusbar">
        <span>9:41</span>
        <div className="scard__statusbar-icons">
          <svg width="15" height="11" viewBox="0 0 15 11" fill="#0f0f0f">
            <rect x="0" y="4" width="3" height="7" rx="0.5" />
            <rect x="4" y="2.5" width="3" height="8.5" rx="0.5" />
            <rect x="8" y="1" width="3" height="10" rx="0.5" />
            <rect x="12" y="0" width="3" height="11" rx="0.5" />
          </svg>
          <svg width="15" height="11" viewBox="0 0 16 12" fill="#0f0f0f">
            <path d="M8 2.4C10.9 2.4 13.5 3.6 15.3 5.6L16 4.8C14 2.6 11.2 1.2 8 1.2S2 2.6 0 4.8l.7.8C2.5 3.6 5.1 2.4 8 2.4z" />
            <path d="M8 5.2C10 5.2 11.8 6 13.2 7.4L14 6.6C12.3 4.9 10.3 4 8 4S3.7 4.9 2 6.6l.8.8C4.2 6 6 5.2 8 5.2z" />
            <circle cx="8" cy="10" r="2" />
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#0f0f0f" strokeOpacity="0.35" />
            <rect x="1.5" y="1.5" width="16" height="9" rx="2.5" fill="#0f0f0f" />
            <path d="M23 4v4a2 2 0 000-4z" fill="#0f0f0f" fillOpacity="0.4" />
          </svg>
        </div>
      </div>

      {/* X header */}
      <div className="scard__xheader">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#0f0f0f">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Profile */}
      <div className="scard__profile">
        <div className="scard__avatar" style={{ background: post.user.avatarColor }}>
          {post.user.avatar}
        </div>
        <div className="scard__userinfo">
          <span className="scard__name">
            {post.user.name}
            {post.user.verified && <IconVerified />}
          </span>
          <span className="scard__handle">{post.user.handle}</span>
        </div>
        <button className="scard__follow">Follow</button>
      </div>

      {/* Tweet text */}
      <p className="scard__text">{post.text}</p>
      <span className="scard__time tweet-time">{post.time}</span>

      <div className="scard__divider" />

      {/* Metrics */}
      <div className="scard__metrics">
        <span><b>{post.reposts}</b> Reposts</span>
        <span><b>{post.likes}</b> Likes</span>
        <span><b>{post.views}</b> Views</span>
      </div>

      <div className="scard__divider" />

      {/* Actions */}
      <div className="scard__actions tweet-actions">
        <button aria-label="Reply">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.8">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button aria-label="Repost">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.8">
            <polyline points="17 1 21 5 17 9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 11V9a4 4 0 014-4h14" strokeLinecap="round" />
            <polyline points="7 23 3 19 7 15" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 13v2a4 4 0 01-4 4H3" strokeLinecap="round" />
          </svg>
        </button>
        <button aria-label="Like">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button aria-label="Share">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" strokeWidth="1.8">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="16 6 12 2 8 6" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="2" x2="12" y2="15" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ── Instagram screenshot card ── */
function IGCard({ post }) {
  return (
    <div className="scard scard--ig">
      {/* Status bar */}
      <div className="scard__statusbar">
        <span>9:41</span>
        <div className="scard__statusbar-icons">
          <svg width="15" height="11" viewBox="0 0 15 11" fill="#0f0f0f">
            <rect x="0" y="4" width="3" height="7" rx="0.5" />
            <rect x="4" y="2.5" width="3" height="8.5" rx="0.5" />
            <rect x="8" y="1" width="3" height="10" rx="0.5" />
            <rect x="12" y="0" width="3" height="11" rx="0.5" />
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#0f0f0f" strokeOpacity="0.35" />
            <rect x="1.5" y="1.5" width="16" height="9" rx="2.5" fill="#0f0f0f" />
          </svg>
        </div>
      </div>

      {/* IG header bar */}
      <div className="scard__igheader">
        <svg width="88" height="30" viewBox="0 0 88 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text y="22" fontFamily="'Billabong', 'Dancing Script', cursive" fontSize="26" fill="#0f0f0f" letterSpacing="-0.5">Instagram</text>
        </svg>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" />
          </svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth="2">
            <path d="M22 2L11 13" strokeLinecap="round" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Post header */}
      <div className="scard__postheader">
        <div className="scard__avatar scard__avatar--ig" style={{ background: post.user.avatarColor }}>
          {post.user.avatar}
        </div>
        <div className="scard__userinfo">
          <span className="scard__name ig-name">{post.user.name}</span>
          <span className="scard__handle">Sponsored</span>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0f0f0f">
          <circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" />
        </svg>
      </div>

      {/* Photo */}
      <div className="scard__photo">
        <img src={post.img} alt="" loading="lazy" />
      </div>

      {/* Actions */}
      <div className="scard__actions ig-actions">
        <div style={{ display: 'flex', gap: 14 }}>
          <button aria-label="Like"><IconHeart /></button>
          <button aria-label="Comment"><IconComment /></button>
          <button aria-label="Share"><IconShare /></button>
        </div>
        <button aria-label="Save"><IconBookmark /></button>
      </div>

      {/* Likes */}
      <div className="scard__likes">
        <b>{post.likes} likes</b>
      </div>

      {/* Caption */}
      <p className="scard__caption">
        <b>{post.user.name}</b> {post.caption}
      </p>
      <span className="scard__time ig-time">{post.time}</span>
    </div>
  )
}

/* ── Logo Grid ── */
const LogoBrson = () => (
  <svg viewBox="0 0 120 36" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ width: 110, height: 34 }}>
    <text x="0" y="28" fontFamily="Georgia, serif" fontSize="30" fontWeight="700" letterSpacing="-1">br</text>
    <text x="44" y="28" fontFamily="Georgia, serif" fontSize="22" fontWeight="400">&amp;</text>
    <text x="60" y="28" fontFamily="Georgia, serif" fontSize="30" fontWeight="700" letterSpacing="-1">son</text>
  </svg>
)

const LogoOpenAI = () => (
  <svg viewBox="0 0 160 36" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ width: 148, height: 34 }}>
    <g transform="translate(11,18)">
      <circle r="8" fill="none" stroke="white" strokeWidth="1.2" />
      <line x1="-8" y1="0" x2="8" y2="0" stroke="white" strokeWidth="1" />
      <line x1="0" y1="-8" x2="0" y2="8" stroke="white" strokeWidth="1" />
      <line x1="-5.6" y1="-5.6" x2="5.6" y2="5.6" stroke="white" strokeWidth="1" />
      <line x1="5.6" y1="-5.6" x2="-5.6" y2="5.6" stroke="white" strokeWidth="1" />
    </g>
    <text x="26" y="26" fontFamily="-apple-system, sans-serif" fontSize="22" fontWeight="600" letterSpacing="-0.5">OpenAI</text>
  </svg>
)

const LogoPerplexity = () => (
  <svg viewBox="0 0 190 36" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ width: 160, height: 34 }}>
    <g transform="translate(11,18)">
      {[0, 30, 60, 90, 120, 150].map((a, i) => (
        <line key={i}
          x1={Math.cos(a * Math.PI / 180) * -9} y1={Math.sin(a * Math.PI / 180) * -9}
          x2={Math.cos(a * Math.PI / 180) * 9} y2={Math.sin(a * Math.PI / 180) * 9}
          stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      ))}
    </g>
    <text x="28" y="26" fontFamily="-apple-system, sans-serif" fontSize="21" fontWeight="500" letterSpacing="-0.3">perplexity</text>
  </svg>
)

const LogoMike = () => (
  <svg viewBox="0 0 90 42" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ width: 88, height: 40 }}>
    <text x="4" y="33" fontFamily="Palatino Linotype, Palatino, Georgia, serif" fontSize="34" fontStyle="italic" fontWeight="700" letterSpacing="-1">mike</text>
  </svg>
)

const LogoClaude = () => (
  <svg viewBox="0 0 170 36" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ width: 148, height: 34 }}>
    <g transform="translate(11,18)">
      {[0, 45, 90, 135].map((a, i) => (
        <line key={i}
          x1={Math.cos(a * Math.PI / 180) * -9} y1={Math.sin(a * Math.PI / 180) * -9}
          x2={Math.cos(a * Math.PI / 180) * 9} y2={Math.sin(a * Math.PI / 180) * 9}
          stroke="white" strokeWidth="2" strokeLinecap="round" />
      ))}
    </g>
    <text x="28" y="26" fontFamily="-apple-system, sans-serif" fontSize="22" fontWeight="600" letterSpacing="-0.5">Claude</text>
  </svg>
)

const LogoGrok = () => (
  <svg viewBox="0 0 140 36" fill="white" xmlns="http://www.w3.org/2000/svg" style={{ width: 120, height: 34 }}>
    <g transform="translate(11,18)">
      <circle r="9" fill="none" stroke="white" strokeWidth="1.8" />
      <line x1="-5.5" y1="7" x2="5.5" y2="-7" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </g>
    <text x="28" y="26" fontFamily="-apple-system, sans-serif" fontSize="22" fontWeight="600" letterSpacing="-0.5">Grok</text>
  </svg>
)

const LOGOS = [
  { id: 'brson', El: LogoBrson, label: 'br&son' },
  { id: 'openai', El: LogoOpenAI, label: 'OpenAI', highlight: true },
  { id: 'perplexity', El: LogoPerplexity, label: 'Perplexity' },
  { id: 'mike', El: LogoMike, label: 'mike' },
  { id: 'claude', El: LogoClaude, label: 'Claude' },
  { id: 'grok', El: LogoGrok, label: 'Grok' },
]

function CornerTicks() {
  const size = 8
  return (
    <svg className="logo-grid__ticks" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d={`M ${size} 2 L 2 2 L 2 ${size}`} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <path d={`M ${100 - size} 2 L 98 2 L 98 ${size}`} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <path d={`M ${100 - size} 98 L 98 98 L 98 ${100 - size}`} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <path d={`M ${size} 98 L 2 98 L 2 ${100 - size}`} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
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

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function Testimonials() {
  const containerRef = useRef(null)
  const panelRef = useRef(null)
  const cardEls = useRef([])
  const carouselRef = useRef(null)
  const offsetRef = useRef(0)
  const animating = useRef(false)

  /* Apply fan positions to all cards */
  function applyFan(animated = false) {
    const n = POSTS.length
    POSTS.forEach((_, i) => {
      const el = cardEls.current[i]
      if (!el) return
      // visual position 0=leftmost, 2=center, 4=rightmost
      const pos = ((i - offsetRef.current) % n + n) % n
      // Map pos to FAN index — center the array around pos 2
      const fanIdx = pos < n ? pos : n - 1
      const f = FAN[Math.min(fanIdx, FAN.length - 1)]
      el.style.zIndex = f.z
      const props = { rotate: f.rotate, y: f.y, scale: f.scale }
      if (animated) {
        gsap.to(el, { ...props, duration: 0.55, ease: 'power3.out' })
      } else {
        gsap.set(el, props)
      }
    })
  }

  /* Click a card → rotate fan so that card becomes center */
  function handleCardClick(clickedIdx) {
    if (animating.current) return
    const n = POSTS.length
    const currentPos = ((clickedIdx - offsetRef.current) % n + n) % n
    const centerPos = 3  // FAN center = index 3 (7-card fan)
    if (currentPos === centerPos) return

    animating.current = true
    // Shift offset so clicked card moves to center
    const delta = currentPos - centerPos
    offsetRef.current = ((offsetRef.current + delta) % n + n) % n
    applyFan(true)
    setTimeout(() => { animating.current = false }, 600)
  }

  /* Scroll-expand animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { scale: 0.08, borderRadius: '16px' },
        {
          scale: 1,
          borderRadius: '0px',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'center top',
            scrub: 2,
          },
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  /* Hover: lift + slide toward outside edge based on fan position */
  function handleHoverEnter(i) {
    const el = cardEls.current[i]
    if (!el) return
    const n = POSTS.length
    const pos = ((i - offsetRef.current) % n + n) % n
    const xShift = pos < 3 ? -100 : pos > 3 ? 100 : 0
    gsap.to(el, { x: xShift, y: '-=5', scale: 1.08, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
  }

  function handleHoverLeave(i) {
    const el = cardEls.current[i]
    if (!el) return
    const n = POSTS.length
    const pos = ((i - offsetRef.current) % n + n) % n
    const f = FAN[Math.min(pos, FAN.length - 1)]
    gsap.to(el, { y: f.y, x: 0, scale: f.scale, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
  }

  /* Mobile carousel auto-scroll */
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return
    const interval = setInterval(() => {
      const maxScroll = el.scrollWidth - el.clientWidth
      if (el.scrollLeft >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 240, behavior: 'smooth' })
      }
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  /* Initial positions */
  useEffect(() => {
    applyFan(false)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '220vh', marginTop: '-140vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', zIndex: 2 }}>
        <div
          ref={panelRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: '#0c0c0b',
            transformOrigin: 'center center',
            willChange: 'transform',
            overflow: 'hidden',
          }}
        >
          <section className="deck-section" id="testimonials">

            {/* Header */}
            <div className="deck-header">
              <span className="deck-eyebrow">What clients say</span>
              <h2 className="deck-title">Real results.<br />Real people.</h2>
            </div>

            {/* Mobile carousel */}
            <div className="fan-carousel" ref={carouselRef}>
              {POSTS.map((post, i) => (
                <div key={i} className="fan-carousel__card">
                  <PhotoCard post={post} />
                </div>
              ))}
            </div>

            {/* Fan stage — desktop only */}
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

            {/* Logo grid */}
            <LogoGrid />

          </section>
        </div>
      </div>
    </div>
  )
}
