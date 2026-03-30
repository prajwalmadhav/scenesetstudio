import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { num: '01', title: 'Discovery',   desc: 'Brand audit & goals',   x: 80,  y: 160, color: '#1a0a12' },
  { num: '02', title: 'Strategy',    desc: 'Roadmap & brief',       x: 290, y: 100, color: '#0a0f1a' },
  { num: '03', title: 'Production',  desc: 'Create & design',       x: 500, y: 160, color: '#0a1a0f' },
  { num: '04', title: 'Launch',      desc: 'Publish & distribute',  x: 500, y: 320, color: '#1a100a' },
  { num: '05', title: 'Optimise',    desc: 'Test & iterate',        x: 290, y: 380, color: '#150a1a' },
  { num: '06', title: 'Report',      desc: 'Data & insights',       x: 80,  y: 320, color: '#0a1a18' },
]

// Arrows: [from index, to index]
const ARROWS = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0]]

const NODE_W = 160
const NODE_H = 72

function cx(step) { return step.x + NODE_W / 2 }
function cy(step) { return step.y + NODE_H / 2 }

export default function Process() {
  const sectionRef = useRef(null)
  const canvasRef  = useRef(null)
  const cursorRef  = useRef(null)
  const nodesRef   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Nodes animate in on scroll
      gsap.fromTo(nodesRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1,
          stagger: 0.12,
          duration: 0.6,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        }
      )

      // Mouse cursor wanders between nodes
      const path = [
        { x: cx(STEPS[0]) + 20, y: cy(STEPS[0]) + 10 },
        { x: cx(STEPS[1]) - 10, y: cy(STEPS[1]) + 20 },
        { x: cx(STEPS[2]) + 15, y: cy(STEPS[2]) - 10 },
        { x: cx(STEPS[3]) - 20, y: cy(STEPS[3]) + 15 },
        { x: cx(STEPS[4]) + 10, y: cy(STEPS[4]) - 20 },
        { x: cx(STEPS[5]) - 15, y: cy(STEPS[5]) + 10 },
      ]

      const moveCursor = (i) => {
        const next = path[i % path.length]
        gsap.to(cursorRef.current, {
          x: next.x,
          y: next.y,
          duration: 1.8 + Math.random() * 0.8,
          ease: 'power2.inOut',
          onComplete: () => moveCursor(i + 1),
        })
      }
      moveCursor(0)

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="proc-section" id="process">

      {/* ── Section label outside canvas ── */}
      <div className="proc-label">
        <span className="proc-eyebrow">How we work</span>
        <h2 className="proc-title">Our Process</h2>
      </div>

      {/* ── Figma/Framer-style canvas chrome ── */}
      <div className="proc-chrome">

        {/* Top toolbar */}
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

        {/* Left panel */}
        <div className="proc-left-panel">
          <div className="proc-panel-section">
            <p className="proc-panel-label">Layers</p>
            {STEPS.map(s => (
              <div key={s.num} className="proc-layer-item">
                <span className="proc-layer-icon">⬜</span>
                <span className="proc-layer-name">{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="proc-right-panel">
          <p className="proc-panel-label">Properties</p>
          <div className="proc-prop-row"><span>W</span><span>160</span></div>
          <div className="proc-prop-row"><span>H</span><span>72</span></div>
          <div className="proc-prop-row"><span>R</span><span>12</span></div>
          <div className="proc-prop-divider" />
          <p className="proc-panel-label">Fill</p>
          <div className="proc-prop-row">
            <span className="proc-prop-swatch" />
            <span>#C42087</span>
          </div>
        </div>

        {/* Canvas */}
        <div ref={canvasRef} className="proc-canvas">

          {/* Dot grid via CSS background */}
          <div className="proc-grid" />

          {/* SVG arrows */}
          <svg className="proc-arrows" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="rgba(196,32,135,0.5)" />
              </marker>
            </defs>
            {ARROWS.map(([a, b], i) => (
              <line
                key={i}
                x1={cx(STEPS[a])} y1={cy(STEPS[a])}
                x2={cx(STEPS[b])} y2={cy(STEPS[b])}
                stroke="rgba(196,32,135,0.35)"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                markerEnd="url(#arrowhead)"
              />
            ))}
          </svg>

          {/* Nodes */}
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              ref={el => nodesRef.current[i] = el}
              className="proc-node"
              style={{ left: step.x, top: step.y, width: NODE_W, height: NODE_H, background: step.color }}
            >
              <span className="proc-node__num">{step.num}</span>
              <div className="proc-node__text">
                <span className="proc-node__title">{step.title}</span>
                <span className="proc-node__desc">{step.desc}</span>
              </div>
            </div>
          ))}

          {/* Animated cursor */}
          <div ref={cursorRef} className="proc-cursor" style={{ x: cx(STEPS[0]), y: cy(STEPS[0]) }}>
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
              <path d="M0 0L0 18L5 13L8 20L11 19L8 12L14 12Z" fill="white" stroke="#333" strokeWidth="1"/>
            </svg>
            <span className="proc-cursor__label">SceneSet</span>
          </div>

        </div>

        {/* Bottom status bar */}
        <div className="proc-statusbar">
          <span>Ready</span>
          <span>6 layers</span>
          <span>Process Map v1</span>
        </div>

      </div>

    </section>
  )
}
