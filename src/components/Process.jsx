import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01', title: 'Discovery',
    points: ['Discovery call', 'Brand audit', 'Competitor research'],
    accent: '#C42087', color: '#150810',
  },
  {
    num: '02', title: 'Strategy',
    points: ['Positioning & messaging', 'Content pillars', 'Creative brief'],
    accent: '#1A6FD4', color: '#080e18',
  },
  {
    num: '03', title: 'Creative',
    points: ['Brand identity', 'Visual language', 'Content systems'],
    accent: '#2A8A3A', color: '#081208',
  },
  {
    num: '04', title: 'Production',
    points: ['Video & web', 'Copy & ad creatives', 'Fast execution'],
    accent: '#D4780A', color: '#160c02',
  },
  {
    num: '05', title: 'Optimise',
    points: ['A/B testing', 'Performance data', 'Iteration cycles'],
    accent: '#7B2FBE', color: '#100818',
  },
  {
    num: '06', title: 'Report',
    points: ['Monthly reporting', 'ROI breakdowns', 'Growth strategy'],
    accent: '#1A9A8A', color: '#081412',
  },
]

// Arrow connections — hexagonal cycle (closes back to card 0)
const ARROW_SEGS = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 0 },
]

// Hexagonal layout — 6 cards in an oval/hex ring
const CARD_POS = [
  { left: '4%',  top: '22%' },  // 01 Discovery   — left, upper
  { left: '39%', top: '8%'  },  // 02 Strategy    — center, top
  { left: '74%', top: '22%' },  // 03 Creative    — right, upper
  { left: '74%', top: '55%' },  // 04 Production  — right, lower
  { left: '39%', top: '69%' },  // 05 Optimise    — center, bottom
  { left: '4%',  top: '55%' },  // 06 Report      — left, lower
]

export default function Process() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const arrowRefs = useRef([])
  const canvasRef = useRef(null)
  const svgRef = useRef(null)
  const cursorElRef = useRef(null)
  const [cursorVisible, setCursorVisible] = useState(false)
  const [flipped, setFlipped] = useState(Array(6).fill(false))

  // Compute arrow paths after layout renders
  const [arrows, setArrows] = useState([])

  useEffect(() => {
    const computeArrows = () => {
      if (!svgRef.current || cardRefs.current.some(r => !r)) return
      const svgRect = svgRef.current.getBoundingClientRect()
      const rects = cardRefs.current.map(r => r.getBoundingClientRect())

      const paths = ARROW_SEGS.map(seg => {
        const a = rects[seg.from]
        const b = rects[seg.to]
        // All coords relative to SVG
        const ax = a.left - svgRect.left
        const ay = a.top - svgRect.top
        const aw = a.width, ah = a.height
        const bx = b.left - svgRect.left
        const by = b.top - svgRect.top

        const bw = b.width, bh = b.height
        const acx = ax + aw / 2, acy = ay + ah / 2
        const bcx = bx + bw / 2, bcy = by + bh / 2
        const angle = Math.atan2(bcy - acy, bcx - acx)
        const ca = Math.cos(angle), sa = Math.sin(angle)
        const tA = Math.min((aw / 2) / (Math.abs(ca) || 1e-9), (ah / 2) / (Math.abs(sa) || 1e-9))
        const x1 = acx + tA * ca, y1 = acy + tA * sa
        const tB = Math.min((bw / 2) / (Math.abs(ca) || 1e-9), (bh / 2) / (Math.abs(sa) || 1e-9))
        const x2 = bcx - tB * ca, y2 = bcy - tB * sa
        const cpx = (x1 + x2) / 2 + 22 * Math.cos(angle + Math.PI / 2)
        const cpy = (y1 + y2) / 2 + 22 * Math.sin(angle + Math.PI / 2)
        return `M ${x1},${y1} Q ${cpx},${cpy} ${x2},${y2}`
      })
      setArrows(paths)
    }

    // Compute after paint
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(computeArrows)
    })
    window.addEventListener('resize', computeArrows)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', computeArrows)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      cardRefs.current.forEach(el => {
        if (el) gsap.set(el, { opacity: 0, y: 16 })
      })

      gsap.to(cardRefs.current, {
        opacity: 1, y: 0,
        stagger: 0.1,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
      })
    }, sectionRef)

    // Custom cursor
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
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseenter', onEnter)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      ctx.revert()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseenter', onEnter)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const setFlip = (i, val) => setFlipped(f => { const n = [...f]; n[i] = val; return n })

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
                <polygon points="0 0, 7 3, 0 6" fill="rgba(196,32,135,0.55)" />
              </marker>
            </defs>
            {arrows.map((d, i) => (
              <path
                key={i}
                ref={el => arrowRefs.current[i] = el}
                d={d}
                fill="none"
                stroke="rgba(196,32,135,0.3)"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                markerEnd="url(#arrowhead)"
              />
            ))}
          </svg>

          {/* ── Card staircase ── */}
          <div style={{
            position: 'absolute', inset: 0,
            zIndex: 3,
          }}>
            {STEPS.map((s, i) => (
              <div
                key={i}
                ref={el => cardRefs.current[i] = el}
                className="proc-flip-card"
                onMouseEnter={() => setFlip(i, true)}
                onMouseLeave={() => setFlip(i, false)}
                style={{
                  position: 'absolute',
                  left: CARD_POS[i].left,
                  top: CARD_POS[i].top,
                  width: '22%',
                  height: '15%',
                  opacity: 0,
                }}
              >
                <div
                  className="proc-flip-inner"
                  style={{ transform: flipped[i] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >

                  {/* ── FRONT ── */}
                  <div
                    className="proc-flip-face proc-flip-front"
                    style={{ background: s.color, borderColor: `${s.accent}55` }}
                  >
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0,
                      height: '3px', background: s.accent, borderRadius: '8px 8px 0 0',
                    }} />
                    <span style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: '10px',
                      letterSpacing: '2.5px',
                      color: s.accent,
                    }}>
                      {s.num}
                    </span>
                    <h3 style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 600,
                      fontSize: 'clamp(12px, 1.1vw, 16px)',
                      color: '#FFFFFF',
                      textShadow: `0 0 14px ${s.accent}99`,
                      margin: '8px 0 0',
                      lineHeight: 1.2,
                    }}>
                      {s.title}
                    </h3>
                  </div>

                  {/* ── BACK ── */}
                  <div
                    className="proc-flip-face proc-flip-back"
                    style={{ background: s.color, borderColor: s.accent }}
                  >
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0,
                      height: '3px', background: s.accent, borderRadius: '8px 8px 0 0',
                    }} />
                    <span style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: '9px',
                      letterSpacing: '2px',
                      color: s.accent,
                    }}>
                      {s.title}
                    </span>
                    <ul style={{
                      margin: '8px 0 0',
                      padding: 0,
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}>
                      {s.points.map((pt, pi) => (
                        <li key={pi} style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 400,
                          fontSize: 'clamp(10px, 0.9vw, 12px)',
                          color: 'rgba(242,240,235,0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}>
                          <span style={{ color: s.accent, fontSize: '8px' }}>◆</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
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
