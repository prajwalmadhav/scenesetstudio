import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01', title: 'Discovery',
    points: ['Discovery call', 'Brand audit', 'Competitor research'],
    accent: '#C42087', color: '#150810',
    icon: (color, size = 14) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
      </svg>
    ),
    anim: 'proc-icon-pulse',
    rotate: -8,
  },
  {
    num: '02', title: 'Strategy',
    points: ['Positioning & messaging', 'Content pillars', 'Creative brief'],
    accent: '#1A6FD4', color: '#080e18',
    icon: (color, size = 14) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/>
      </svg>
    ),
    anim: 'proc-icon-spin-slow',
    rotate: 6,
  },
  {
    num: '03', title: 'Creative',
    points: ['Brand identity', 'Visual language', 'Content systems'],
    accent: '#2A8A3A', color: '#081208',
    icon: (color, size = 14) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/>
        <circle cx="11" cy="11" r="2"/>
      </svg>
    ),
    anim: 'proc-icon-twinkle',
    rotate: -4,
  },
  {
    num: '04', title: 'Production',
    points: ['Video & web', 'Copy & ad creatives', 'Fast execution'],
    accent: '#E03030', color: '#160c02',
    icon: null, anim: null, rotate: 0,
  },
  {
    num: '05', title: 'Optimise',
    points: ['A/B testing', 'Performance data', 'Iteration cycles'],
    accent: '#7B2FBE', color: '#100818',
    icon: (color, size = 14) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
        <polyline points="23 4 23 10 17 10"/><path d="M20.5 15a9 9 0 1 1-2.5-8.4L23 10"/>
      </svg>
    ),
    anim: 'proc-icon-spin',
    rotate: 10,
  },
  {
    num: '06', title: 'Report',
    points: ['Monthly reporting', 'ROI breakdowns', 'Growth strategy'],
    accent: '#1A9A8A', color: '#081412',
    icon: (color, size = 14) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    anim: 'proc-icon-bar',
    rotate: -6,
  },
]

// Arrow connections — linear process flow
const ARROW_SEGS = [
  { from: 0, to: 1 },  // Discovery → Strategy
  { from: 1, to: 2 },  // Strategy → Creative
  { from: 2, to: 3 },  // Creative → Production
  { from: 3, to: 4 },  // Production → Optimise
  { from: 4, to: 5 },  // Optimise → Report
]

// Scattered random layout
const CARD_POS = [
  { left: '2%',  top: '8%'  },  // 01 Discovery   — top-left
  { left: '52%', top: '4%'  },  // 02 Strategy    — top-right
  { left: '68%', top: '28%' },  // 03 Creative    — mid-right
  { left: '22%', top: '36%' },  // 04 Production  — center-left
  { left: '18%', top: '66%' },  // 05 Optimise    — lower-left
  { left: '68%', top: '62%' },  // 06 Report      — below Creative
]

const CARD_ROTATE = [-2, 1.5, -1, 2, -1.5, 1]

export default function Process() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const arrowRefs = useRef([])
  const canvasRef = useRef(null)
  const svgRef = useRef(null)
  const cursorElRef = useRef(null)
  const [cursorVisible, setCursorVisible] = useState(false)

  // Compute arrow paths after layout renders
  const [arrows, setArrows] = useState([])

  useEffect(() => {
    const computeArrows = () => {
      if (!svgRef.current || cardRefs.current.some(r => !r)) return
      const svgRect = svgRef.current.getBoundingClientRect()
      const rects = cardRefs.current.map(r => r.getBoundingClientRect())

      const GAP = 10 // px gap between arrowhead and card edge

      const paths = ARROW_SEGS.map(seg => {
        const a = rects[seg.from]
        const b = rects[seg.to]
        const acx = (a.left + a.right) / 2 - svgRect.left
        const acy = (a.top  + a.bottom) / 2 - svgRect.top
        const bcx = (b.left + b.right) / 2 - svgRect.left
        const bcy = (b.top  + b.bottom) / 2 - svgRect.top

        const angle = Math.atan2(bcy - acy, bcx - acx)
        const ca = Math.cos(angle), sa = Math.sin(angle)

        // Exact bounding-box edge intersection for each card
        const tA = Math.min((a.width / 2) / (Math.abs(ca) || 1e-9), (a.height / 2) / (Math.abs(sa) || 1e-9)) + GAP
        const x1 = acx + tA * ca, y1 = acy + tA * sa
        const tB = Math.min((b.width / 2) / (Math.abs(ca) || 1e-9), (b.height / 2) / (Math.abs(sa) || 1e-9)) + GAP
        const x2 = bcx - tB * ca, y2 = bcy - tB * sa

        // Gentle perpendicular curve
        const cpx = (x1 + x2) / 2 + 20 * Math.cos(angle + Math.PI / 2)
        const cpy = (y1 + y2) / 2 + 20 * Math.sin(angle + Math.PI / 2)
        return `M ${x1},${y1} Q ${cpx},${cpy} ${x2},${y2}`
      })
      setArrows(paths)
    }

    // Compute after GSAP has initialised (scale transforms settle)
    const t = setTimeout(computeArrows, 120)
    window.addEventListener('resize', computeArrows)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', computeArrows)
    }
  }, [])

  useEffect(() => {
    const isMobile = window.innerWidth <= 640

    const ctx = gsap.context(() => {
      if (isMobile) {
        // All cards visible immediately on mobile grid
        gsap.set(cardRefs.current, { opacity: 1, scale: 1, y: 0 })
        return
      }

      // Card 0 always visible
      gsap.set(cardRefs.current[0], { opacity: 1, y: 0, scale: 1 })

      // Cards 1–5: hidden initially, quick fade+scale in on scroll
      const rest = cardRefs.current.slice(1)
      gsap.set(rest, { opacity: 0, scale: 1, y: 0 })

      gsap.to(rest, {
        opacity: 1,
        stagger: 0.12,
        duration: 0.45,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
      })
    }, sectionRef)

    // Custom cursor — desktop only
    const canvas = canvasRef.current
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      if (cursorElRef.current) {
        cursorElRef.current.style.transform =
          `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px)`
      }
    }
    const onEnter = () => setCursorVisible(true)
    const onLeave = () => setCursorVisible(false)
    if (!isMobile) {
      canvas.addEventListener('mousemove', onMove)
      canvas.addEventListener('mouseenter', onEnter)
      canvas.addEventListener('mouseleave', onLeave)
    }

    return () => {
      ctx.revert()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseenter', onEnter)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])


  return (
    <section ref={sectionRef} className="proc-section" id="process">

      <div className="proc-label">
        <span className="proc-eyebrow">How we work</span>
        <h2 className="proc-title">Our Process</h2>
      </div>

      <div className="proc-chrome">

        {/* ── Toolbar ── */}
        <div className="proc-toolbar">
          <div className="proc-toolbar__left">
            <div className="proc-toolbar__logo">✦</div>
            <div className="proc-toolbar__file">SceneSet — Process Map</div>
          </div>
          <div className="proc-toolbar__tools">
            {['↖', '✋', '⬜', '◯', '✏', 'T', '🔗'].map((t, i) => (
              <button key={i} className={`proc-tool-btn${i === 0 ? ' is-active' : ''}`}>{t}</button>
            ))}
          </div>
          <div className="proc-toolbar__right">
            <span className="proc-toolbar__zoom">100%</span>
            <button className="proc-toolbar__share">Share</button>
          </div>
        </div>

        {/* ── Left panel ── */}
        <div className="proc-left-panel">
          <div className="proc-panel-section">
            <p className="proc-panel-label">Layers</p>
            {STEPS.map((s, i) => (
              <div key={i} className="proc-layer-item">
                <span className="proc-layer-icon" style={{ color: s.accent }}>⬛</span>
                <span className="proc-layer-name">{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="proc-right-panel">
          <p className="proc-panel-label">Properties</p>
          <div className="proc-prop-row"><span>Cols</span><span>3</span></div>
          <div className="proc-prop-row"><span>Rows</span><span>2</span></div>
          <div className="proc-prop-row"><span>Gap</span><span>16</span></div>
          <div className="proc-prop-divider" />
          <p className="proc-panel-label">Phases</p>
          {STEPS.map((s, i) => (
            <div key={i} className="proc-prop-row">
              <span className="proc-prop-swatch" style={{ background: s.accent }} />
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>{s.tag}</span>
            </div>
          ))}
        </div>

        {/* ── Canvas ── */}
        <div ref={canvasRef} className="proc-canvas" style={{ cursor: 'none' }}>
          <div className="proc-grid" />

          {/* ── SVG arrow overlay ── */}
          <svg
            ref={svgRef}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              pointerEvents: 'none', zIndex: 2,
              overflow: 'visible',
            }}
          >
            <defs>
              <marker id="arrowhead" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
                <polygon points="0 0, 7 3, 0 6" fill="rgba(80,80,80,0.7)" />
              </marker>
            </defs>
            {arrows.map((d, i) => (
              <path
                key={i}
                ref={el => arrowRefs.current[i] = el}
                d={d}
                fill="none"
                stroke="rgba(80,80,80,0.35)"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                markerEnd="url(#arrowhead)"
              />
            ))}
          </svg>

          {/* ── Mobile grid layout ── */}
          <div className="proc-mobile-canvas">
            {/* Snake SVG arrows */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2, overflow: 'visible' }}
            >
              <defs>
                <marker id="m-arrow" markerWidth="4" markerHeight="3.5" refX="3.5" refY="1.75" orient="auto">
                  <polygon points="0 0, 4 1.75, 0 3.5" fill="rgba(80,80,80,0.8)" />
                </marker>
              </defs>
              {/* Card centers (viewBox 0–100):
                  01:(25,17)  02:(75,17)
                  03:(25,50)  04:(75,50)
                  05:(25,83)  06:(75,83)  */}
              {/* 01→02: right across row 1 */}
              <path d="M 44,17 Q 50,12 56,17" fill="none" stroke="rgba(80,80,80,0.4)" strokeWidth="0.7" strokeDasharray="2.5 2" markerEnd="url(#m-arrow)" />
              {/* 02→03: diagonal down-left */}
              <path d="M 75,29 Q 58,37 25,38" fill="none" stroke="rgba(80,80,80,0.4)" strokeWidth="0.7" strokeDasharray="2.5 2" markerEnd="url(#m-arrow)" />
              {/* 03→04: right across row 2 */}
              <path d="M 44,50 Q 50,45 56,50" fill="none" stroke="rgba(80,80,80,0.4)" strokeWidth="0.7" strokeDasharray="2.5 2" markerEnd="url(#m-arrow)" />
              {/* 04→05: diagonal down-left */}
              <path d="M 75,62 Q 58,70 25,71" fill="none" stroke="rgba(80,80,80,0.4)" strokeWidth="0.7" strokeDasharray="2.5 2" markerEnd="url(#m-arrow)" />
              {/* 05→06: right across row 3 */}
              <path d="M 44,83 Q 50,78 56,83" fill="none" stroke="rgba(80,80,80,0.4)" strokeWidth="0.7" strokeDasharray="2.5 2" markerEnd="url(#m-arrow)" />
            </svg>

            {/* 2-col grid of title cards */}
            <div className="proc-mobile-grid">
              {STEPS.map((s) => (
                <div
                  key={s.num}
                  className="proc-mobile-card"
                  style={{ '--card-accent': s.accent }}
                >
                  <span className="proc-mobile-card__num" style={{ color: s.title === 'Creative' ? '#7a6e00' : s.accent }}>{s.num}</span>
                  {s.title === 'Production' ? (
                    <div style={{
                      position: 'relative', background: '#fafafa',
                      border: '1.5px dashed #222',
                      padding: '16px 14px 8px', display: 'flex',
                      flexDirection: 'column', alignItems: 'center', gap: 0,
                    }}>
                      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                        <line x1="5" y1="5" x2="95" y2="95" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
                        <line x1="95" y1="5" x2="5" y2="95" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
                        <circle cx="50" cy="50" r="5" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
                      </svg>
                      {/* REC top-right */}
                      <div style={{ position: 'absolute', top: 4, right: 5, display: 'flex', alignItems: 'center', gap: 3, zIndex: 2 }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ff3b3b', animation: 'proc-pulse 1.2s ease-in-out infinite' }} />
                        <span style={{ fontFamily: 'monospace', fontSize: '6px', color: '#333', letterSpacing: '0.4px' }}>REC</span>
                      </div>
                      <h3 className="proc-mobile-card__title" style={{ color: '#0a0a0a', border: 'none', padding: 0, position: 'relative', zIndex: 1, marginTop: 10, marginBottom: 6 }}>{s.title}</h3>
                      <div style={{ display: 'flex', gap: 5, position: 'relative', zIndex: 1, borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 4, width: '100%', justifyContent: 'center' }}>
                        {['ISO 800', 'f/2.8', '1/250s'].map(v => (
                          <span key={v} style={{ fontFamily: 'monospace', fontSize: '5px', color: 'rgba(0,0,0,0.45)' }}>{v}</span>
                        ))}
                      </div>
                      <span style={{ fontFamily: 'monospace', fontSize: '5px', color: '#333', position: 'relative', zIndex: 1, marginTop: 2 }}>00:01:42:08</span>
                    </div>
                  ) : s.title === 'Creative' ? (
                    <div style={{
                      position: 'relative',
                      background: 'linear-gradient(180deg, #f5e03a 0%, #f0d82e 100%)',
                      border: 'none', borderRadius: 2, overflow: 'hidden',
                      padding: '22px 12px 10px', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', gap: 5,
                      boxShadow: '2px 3px 8px rgba(0,0,0,0.25)', transform: 'rotate(-2.5deg)',
                      minWidth: 72,
                    }}>
                      {/* Tape */}
                      <div style={{
                        position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)',
                        width: 32, height: 12, background: 'rgba(255,255,255,0.5)', borderRadius: 2,
                      }} />
                      {/* Ruled lines */}
                      {[0,1].map(n => (
                        <div key={n} style={{
                          position: 'absolute', left: 0, right: 0,
                          top: `${36 + n * 12}px`, height: 1, background: 'rgba(0,0,0,0.07)',
                        }} />
                      ))}
                      {/* Folded corner */}
                      <div style={{
                        position: 'absolute', bottom: 0, right: 0,
                        width: 0, height: 0, borderStyle: 'solid',
                        borderWidth: '0 0 10px 10px',
                        borderColor: 'transparent transparent rgba(0,0,0,0.18) transparent',
                      }} />
                      {s.icon && <span className={s.anim} style={{ display: 'flex', position: 'relative', zIndex: 1 }}>{s.icon('#1a6e00', 16)}</span>}
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '12px', margin: 0, color: '#1a1600', position: 'relative', zIndex: 1 }}>{s.title}</h3>
                    </div>
                  ) : (
                    <div className="proc-mobile-card__title" style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                    }}>
                      {s.icon && <span className={s.anim} style={{ display: 'flex' }}>{s.icon(s.accent, 16)}</span>}
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '12px', margin: 0, color: '#0a0a0a' }}>{s.title}</h3>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Floating label cards ── */}
          <div className="proc-cards-wrap" style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
            {STEPS.map((s, i) => (
              <div
                key={i}
                ref={el => cardRefs.current[i] = el}
                style={{
                  position: 'absolute',
                  left: CARD_POS[i].left,
                  top: CARD_POS[i].top,
                  transform: `rotate(${CARD_ROTATE[i]}deg)`,
                  opacity: i === 0 ? 1 : 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 6,
                }}
              >
                {/* Number tag */}
                <span style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '9px',
                  letterSpacing: '2.5px',
                  color: s.accent,
                  border: `1px dashed ${s.accent}`,
                  borderRadius: 4,
                  padding: '2px 6px',
                  opacity: 0.85,
                }}>{s.num}</span>

                {/* Title — sticky note for Creative, dashed label for rest */}
                {s.title === 'Creative' ? (
                  <div style={{
                    position: 'relative',
                    background: 'linear-gradient(180deg, #f5e03a 0%, #f0d82e 100%)',
                    border: 'none', borderRadius: '2px',
                    padding: '32px 24px 18px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 10, minWidth: 150,
                    boxShadow: '2px 4px 12px rgba(0,0,0,0.28), 0 1px 2px rgba(0,0,0,0.15)',
                    transform: 'rotate(-1deg)', whiteSpace: 'nowrap', overflow: 'hidden',
                  }}>
                    {/* Tape strip */}
                    <div style={{
                      position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
                      width: 48, height: 18, background: 'rgba(255,255,255,0.5)',
                      borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }} />
                    {/* Ruled lines */}
                    {[0,1,2,3].map(n => (
                      <div key={n} style={{
                        position: 'absolute', left: 0, right: 0,
                        top: `${54 + n * 18}px`, height: 1,
                        background: 'rgba(0,0,0,0.07)',
                      }} />
                    ))}
                    {/* Folded corner */}
                    <div style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 0, height: 0, borderStyle: 'solid',
                      borderWidth: '0 0 18px 18px',
                      borderColor: 'transparent transparent rgba(0,0,0,0.18) transparent',
                    }} />
                    {s.icon && <span className={s.anim} style={{ display: 'flex', transform: `rotate(${s.rotate}deg)`, position: 'relative', zIndex: 1 }}>{s.icon('#1a6e00', 28)}</span>}
                    <h3 style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 700,
                      fontSize: 'clamp(16px, 1.4vw, 22px)', color: '#1a1600', margin: 0,
                      position: 'relative', zIndex: 1,
                    }}>{s.title}</h3>
                  </div>
                ) : i === 3 ? (
                  /* ── Production: DSLR camera viewfinder ── */
                  <div style={{
                    position: 'relative', background: '#fafafa',
                    padding: '36px 44px 20px', minWidth: 260, width: 260,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
                    border: '2px dashed #222',
                  }}>
                    {/* X crosshair */}
                    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="6" y1="6" x2="94" y2="94" stroke="rgba(0,0,0,0.14)" strokeWidth="0.8" />
                      <line x1="94" y1="6" x2="6" y2="94" stroke="rgba(0,0,0,0.14)" strokeWidth="0.8" />
                      <line x1="50" y1="40" x2="50" y2="60" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
                      <line x1="40" y1="50" x2="60" y2="50" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
                      <circle cx="50" cy="50" r="5" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.7" />
                    </svg>
                    {/* Top-left: scene label */}
                    <div style={{ position: 'absolute', top: 8, left: 10, zIndex: 2 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '8px', color: 'rgba(0,0,0,0.4)', letterSpacing: '0.5px' }}>SCN 04 · TAKE 1</span>
                    </div>
                    {/* REC — top right */}
                    <div style={{ position: 'absolute', top: 8, right: 10, display: 'flex', alignItems: 'center', gap: 4, zIndex: 2 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff3b3b', animation: 'proc-pulse 1.2s ease-in-out infinite' }} />
                      <span style={{ fontFamily: 'monospace', fontSize: '8px', color: '#222', letterSpacing: '1px', fontWeight: 700 }}>REC</span>
                    </div>
                    {/* Title */}
                    <h3 style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 700,
                      fontSize: 'clamp(18px, 1.6vw, 24px)', color: '#0a0a0a',
                      margin: '8px 0 12px', position: 'relative', zIndex: 1, letterSpacing: '0.02em',
                    }}>{s.title}</h3>
                    {/* DSLR HUD bottom */}
                    <div style={{ display: 'flex', gap: 10, position: 'relative', zIndex: 1, borderTop: '1px solid rgba(0,0,0,0.12)', paddingTop: 8, width: '100%', justifyContent: 'center' }}>
                      {['ISO 800', 'f / 2.8', '1/250s', 'AWB'].map(v => (
                        <span key={v} style={{ fontFamily: 'monospace', fontSize: '8px', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.4px' }}>{v}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative', zIndex: 1, marginTop: 5 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '7px', color: '#333', letterSpacing: '0.5px' }}>00:01:42:08</span>
                      <span style={{ fontFamily: 'monospace', fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.4px' }}>4K · 24fps</span>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    border: `2px dashed ${s.accent}`, borderRadius: 10,
                    padding: '22px 28px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 12, whiteSpace: 'nowrap',
                    minWidth: 140,
                  }}>
                    {s.icon && <span className={s.anim} style={{ display: 'flex', transform: `rotate(${s.rotate}deg)` }}>{s.icon(s.accent, 28)}</span>}
                    <h3 style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 700,
                      fontSize: 'clamp(16px, 1.4vw, 22px)', color: '#0a0a0a', margin: 0,
                    }}>{s.title}</h3>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Custom pixel cursor ── */}
          <div
            ref={cursorElRef}
            style={{
              position: 'absolute', top: 0, left: 0,
              pointerEvents: 'none',
              opacity: cursorVisible ? 1 : 0,
              transition: 'opacity 0.15s',
              zIndex: 20,
              willChange: 'transform',
            }}
          >
            <div style={{ transform: 'translate(-2px, -2px)' }}>
              {/* Clean arrow pointer — tip only, no stem */}
              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" style={{ display: 'block', filter: 'drop-shadow(1px 2px 3px rgba(0,0,0,0.5))' }}>
                <path
                  d="M3 3 L3 17 L7 12 L14 12 Z"
                  fill="#C42087"
                  stroke="#111"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <div style={{
                position: 'absolute', top: '18px', left: '10px',
                background: '#C42087', color: 'white',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '10px', fontWeight: 600,
                padding: '2px 8px', borderRadius: '3px',
                whiteSpace: 'nowrap', letterSpacing: '0.3px',
                boxShadow: '0 2px 8px rgba(196,32,135,0.4)',
              }}>
                Guest
              </div>
            </div>
          </div>

        </div>

        {/* ── Status bar ── */}
        <div className="proc-statusbar">
          <span>Ready</span>
          <span>6 layers · hover to reveal</span>
          <span>Process Map v1</span>
        </div>

      </div>

    </section>
  )
}
