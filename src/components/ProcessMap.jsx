import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   SVG coordinate system
   ───────────────────────────────────────── */
const VW = 1000
const VH = 480
const NR = 36   // node radius

const NODES = [
  {
    id: '01', label: 'Discovery',
    cx: 100, cy: 216,
    tooltip: 'We learn your brand, market, and competitors.',
    services: [
      { label: 'Brand Audit',          bx: 30,  by: 80  },
      { label: 'Competitor Research',  bx: 130, by: 58  },
      { label: 'Discovery Call',       bx: 30,  by: 340 },
    ],
  },
  {
    id: '02', label: 'Strategy',
    cx: 288, cy: 134,
    tooltip: 'We define your positioning and content strategy.',
    services: [
      { label: 'Content Pillars', bx: 196, by: 50  },
      { label: 'SEO Strategy',    bx: 310, by: 36  },
      { label: 'Positioning',     bx: 218, by: 358 },
    ],
  },
  {
    id: '03', label: 'Creative',
    cx: 500, cy: 240,
    tooltip: 'We design your visual identity and digital presence.',
    services: [
      { label: 'Branding',     bx: 400, by: 80  },
      { label: 'Web Design',   bx: 530, by: 62  },
      { label: 'App Dev',      bx: 408, by: 374 },
    ],
  },
  {
    id: '04', label: 'Production',
    cx: 712, cy: 142,
    tooltip: 'We create content, run ads, and build your pipeline.',
    services: [
      { label: 'Social Media',    bx: 618, by: 52  },
      { label: 'Paid Ads',        bx: 750, by: 38  },
      { label: 'Video & Content', bx: 628, by: 368 },
    ],
  },
  {
    id: '05', label: 'Launch',
    cx: 900, cy: 230,
    tooltip: 'We launch, track, and iterate for real results.',
    services: [
      { label: 'Analytics',  bx: 820, by: 80  },
      { label: 'Reporting',  bx: 928, by: 62  },
      { label: 'Iteration',  bx: 820, by: 364 },
    ],
  },
]

// Pill dimensions
const PW = 118, PH = 24, PR = 12

// Cubic bezier connecting main nodes
const SPINE = [
  `M ${100+NR},216  C 190,216 200,134 ${288-NR},134`,
  `M ${288+NR},134  C 390,134 400,240 ${500-NR},240`,
  `M ${500+NR},240  C 600,240 610,142 ${712-NR},142`,
  `M ${712+NR},142  C 800,142 808,230 ${900-NR},230`,
]

// Branch lines: node cx/cy → pill centre
function branchPath(node, pill) {
  const px = pill.bx + PW / 2
  const py = pill.by + PH / 2
  return `M ${node.cx},${node.cy} L ${px},${py}`
}

/* Mobile fallback */
const MOBILE_STEPS = NODES.map(n => ({
  id:       n.id,
  label:    n.label,
  tooltip:  n.tooltip,
  services: n.services.map(s => s.label),
}))

export default function ProcessMap() {
  const sectionRef  = useRef(null)
  const nodeRefs    = useRef([])
  const spineRefs   = useRef([])
  const branchRefs  = useRef([])   // flat array [nodeIdx * 3 + branchIdx]
  const pillRefs    = useRef([])
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Initialise spine dash-offsets
      spineRefs.current.forEach(el => {
        if (!el) return
        const len = el.getTotalLength()
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
      })

      // Set transform-origin per node
      nodeRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, { transformOrigin: `${NODES[i].cx}px ${NODES[i].cy}px` })
      })
      // Pill groups
      pillRefs.current.forEach(el => {
        if (el) gsap.set(el, { opacity: 0, y: 8 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      NODES.forEach((node, i) => {
        // Node in
        tl.fromTo(
          nodeRefs.current[i],
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' },
          i === 0 ? 0 : '-=0.1',
        )
        // Spine draws
        if (spineRefs.current[i]) {
          tl.to(
            spineRefs.current[i],
            { strokeDashoffset: 0, duration: 0.4, ease: 'power2.inOut' },
            '-=0.15',
          )
        }
        // Service pills fade in
        const pills = [
          pillRefs.current[i * 3],
          pillRefs.current[i * 3 + 1],
          pillRefs.current[i * 3 + 2],
        ].filter(Boolean)
        if (pills.length) {
          tl.to(
            pills,
            { opacity: 1, y: 0, stagger: 0.06, duration: 0.35, ease: 'power2.out' },
            '-=0.1',
          )
        }
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const isActive = (i) => hovered === i

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ background: '#080808', padding: '120px 48px 160px' }}
    >
      {/* Heading */}
      <div style={{ marginBottom: '48px' }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#555550',
          display: 'block',
          marginBottom: '16px',
        }}>
          How We Work
        </span>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(36px, 5vw, 72px)',
          letterSpacing: '-3px',
          lineHeight: 1,
          color: '#F2F0EB',
          margin: 0,
        }}>
          Everything we do,<br />and how we do it.
        </h2>
      </div>

      {/* ── DESKTOP DIAGRAM ── */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        background: '#090909',
        border: '1px solid #1a1a1a',
        borderRadius: 0,
        padding: '80px 64px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
        className="proc-map-desktop"
      >
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block', width: '100%', overflow: 'visible', position: 'relative', zIndex: 1 }}
        >
          <defs>
            <marker id="pm-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <path d="M 0,0 L 8,3 L 0,6 Z" fill="#2a2a2a" />
            </marker>
          </defs>

          {/* ── Spine connections ── */}
          {SPINE.map((d, i) => (
            <path
              key={i}
              ref={el => spineRefs.current[i] = el}
              d={d}
              fill="none"
              stroke="#1e1e1e"
              strokeWidth="1"
              strokeDasharray="5 5"
              markerEnd="url(#pm-arrow)"
            />
          ))}

          {/* ── Service branch lines + pills ── */}
          {NODES.map((node, ni) => (
            node.services.map((svc, si) => {
              const idx     = ni * 3 + si
              const active  = isActive(ni)
              const px      = svc.bx
              const py      = svc.by
              const pcx     = px + PW / 2
              const pcy     = py + PH / 2

              return (
                <g key={idx}>
                  {/* Branch line */}
                  <line
                    ref={el => branchRefs.current[idx] = el}
                    x1={node.cx} y1={node.cy}
                    x2={pcx}     y2={pcy}
                    stroke={active ? 'rgba(200,245,53,0.2)' : '#161616'}
                    strokeWidth="1"
                    strokeDasharray="3 4"
                    style={{ transition: 'stroke 0.3s' }}
                  />

                  {/* Pill group */}
                  <g ref={el => pillRefs.current[idx] = el}>
                    <rect
                      x={px} y={py}
                      width={PW} height={PH}
                      rx={PR}
                      fill="transparent"
                      stroke={active ? 'rgba(200,245,53,0.4)' : '#1e1e1e'}
                      strokeWidth="1"
                      style={{ transition: 'stroke 0.3s' }}
                    />
                    <text
                      x={pcx} y={py + PH / 2 + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontFamily="'DM Sans', sans-serif"
                      fontSize="10"
                      fontWeight="400"
                      letterSpacing="0.8"
                      fill={active ? '#F2F0EB' : '#555550'}
                      style={{ transition: 'fill 0.3s', userSelect: 'none' }}
                    >
                      {svc.label}
                    </text>
                  </g>
                </g>
              )
            })
          ))}

          {/* ── Main nodes (rendered last so they sit on top) ── */}
          {NODES.map((node, i) => (
            <g
              key={i}
              ref={el => nodeRefs.current[i] = el}
              style={{ opacity: 0, cursor: 'default' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Glow ring */}
              <circle
                cx={node.cx} cy={node.cy} r={NR + 14}
                fill="none"
                stroke="rgba(200,245,53,0.08)"
                strokeWidth="1"
                style={{ opacity: isActive(i) ? 1 : 0, transition: 'opacity 0.3s' }}
              />

              {/* Main circle */}
              <circle
                cx={node.cx} cy={node.cy} r={NR}
                fill="#0f0f0f"
                stroke={isActive(i) ? '#C8F535' : '#2a2a2a'}
                strokeWidth="1.5"
                style={{ transition: 'stroke 0.3s' }}
              />

              {/* Number */}
              <text
                x={node.cx} y={node.cy - 4}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="'Syne', sans-serif"
                fontSize="10"
                fontWeight="800"
                letterSpacing="1"
                fill={isActive(i) ? '#C8F535' : '#555550'}
                style={{ transition: 'fill 0.3s', userSelect: 'none' }}
              >
                {node.id}
              </text>

              {/* Divider */}
              <line
                x1={node.cx - 10} y1={node.cy + 8}
                x2={node.cx + 10} y2={node.cy + 8}
                stroke={isActive(i) ? 'rgba(200,245,53,0.35)' : 'rgba(255,255,255,0.07)'}
                strokeWidth="0.8"
                style={{ transition: 'stroke 0.3s' }}
              />

              {/* Label below */}
              <text
                x={node.cx} y={node.cy + NR + 18}
                textAnchor="middle"
                fontFamily="'Syne', sans-serif"
                fontSize="12"
                fontWeight="700"
                fill={isActive(i) ? '#F2F0EB' : 'rgba(242,240,235,0.75)'}
                style={{ transition: 'fill 0.3s', userSelect: 'none' }}
              >
                {node.label}
              </text>

              {/* ── Tooltip ── */}
              {isActive(i) && (() => {
                const TW = 230
                const TH = 36
                const rawX = node.cx - TW / 2
                const tx = Math.max(4, Math.min(rawX, VW - TW - 4))
                const ty = node.cy - NR - TH - 18
                const tcx = tx + TW / 2
                return (
                  <g style={{ pointerEvents: 'none' }}>
                    <rect x={tx + 2} y={ty + 3} width={TW} height={TH} rx={5} fill="rgba(0,0,0,0.5)" />
                    <rect x={tx} y={ty} width={TW} height={TH} rx={5}
                      fill="#0f0f0f" stroke="#1a1a1a" strokeWidth={1} />
                    {/* pointer */}
                    <polygon
                      points={`${tcx - 6},${ty + TH} ${tcx + 6},${ty + TH} ${tcx},${ty + TH + 10}`}
                      fill="#0f0f0f"
                    />
                    <polyline
                      points={`${tcx - 6},${ty + TH} ${tcx},${ty + TH + 10} ${tcx + 6},${ty + TH}`}
                      fill="none" stroke="#1a1a1a" strokeWidth={1} strokeLinejoin="round"
                    />
                    <line
                      x1={tcx - 6} y1={ty + TH} x2={tcx + 6} y2={ty + TH}
                      stroke="#0f0f0f" strokeWidth={2}
                    />
                    <text
                      x={tx + TW / 2} y={ty + TH / 2 + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontFamily="'DM Sans', sans-serif"
                      fontSize="11"
                      fontWeight="300"
                      fill="rgba(242,240,235,0.65)"
                      style={{ userSelect: 'none' }}
                    >
                      {node.tooltip}
                    </text>
                  </g>
                )
              })()}
            </g>
          ))}

        </svg>
      </div>

      {/* ── MOBILE fallback ── */}
      <div className="proc-map-mobile" style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {MOBILE_STEPS.map((step, i) => (
          <div key={i} style={{
            padding: '28px 24px',
            border: '1px solid #1a1a1a',
            background: '#0a0a0a',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '10px', letterSpacing: '1px', color: '#555550' }}>
                {step.id}
              </span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '15px', color: '#F2F0EB' }}>
                {step.label}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '13px', color: 'rgba(242,240,235,0.45)', lineHeight: 1.6, marginBottom: '14px' }}>
              {step.tooltip}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {step.services.map((s, si) => (
                <span key={si} style={{
                  fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.5px',
                  color: '#555550', border: '1px solid #1e1e1e', padding: '4px 12px',
                  borderRadius: '20px',
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
