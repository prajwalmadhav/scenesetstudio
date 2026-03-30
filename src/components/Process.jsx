import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Each column: array of cards. img: null = placeholder, img: '/assets/...' = your illustration
const COLUMNS = [
  [
    { num: '01', title: 'Discovery',  color: '#1a0a12' },
    { num: '04', title: 'Launch',     color: '#0a0a1a' },
    { num: '02', title: 'Strategy',   color: '#0f1a0a' },
    { num: '05', title: 'Optimise',   color: '#1a1a0a' },
  ],
  [
    { num: '02', title: 'Strategy',   color: '#0a0f1a' },
    { num: '05', title: 'Optimise',   color: '#1a0a0a' },
    { num: '03', title: 'Production', color: '#0a1a18' },
    { num: '06', title: 'Report',     color: '#150a1a' },
  ],
  [
    { num: '03', title: 'Production', color: '#0a1a0f' },
    { num: '06', title: 'Report',     color: '#1a100a' },
    { num: '01', title: 'Discovery',  color: '#0a0a1a' },
    { num: '04', title: 'Launch',     color: '#1a0a18' },
  ],
  [
    { num: '04', title: 'Launch',     color: '#1a0a0a' },
    { num: '01', title: 'Discovery',  color: '#0a1a1a' },
    { num: '05', title: 'Optimise',   color: '#1a1a10' },
    { num: '02', title: 'Strategy',   color: '#0f0a1a' },
  ],
  [
    { num: '05', title: 'Optimise',   color: '#0a1a10' },
    { num: '02', title: 'Strategy',   color: '#1a0f0a' },
    { num: '06', title: 'Report',     color: '#0a0a18' },
    { num: '03', title: 'Production', color: '#1a0a10' },
  ],
]

// Alternating card heights per column for masonry feel
const CARD_HEIGHTS = [
  [220, 280, 240, 260],
  [260, 220, 280, 220],
  [240, 260, 220, 280],
  [280, 240, 260, 220],
  [220, 280, 240, 260],
]

// Scroll speed per column (px/sec) — alternating fast/slow for depth
const SPEEDS = [55, 38, 48, 32, 52]

export default function Process() {
  const sectionRef = useRef(null)
  const stageRef   = useRef(null)
  const colRefs    = useRef([])
  const tweenRefs  = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Infinite upward scroll per column ──
      colRefs.current.forEach((col, i) => {
        if (!col) return
        const half = col.scrollHeight / 2

        tweenRefs.current[i] = gsap.to(col, {
          y: -half,
          duration: half / SPEEDS[i],
          ease: 'none',
          repeat: -1,
          modifiers: {
            y: gsap.utils.unitize(y => parseFloat(y) % half),
          },
        })
      })

      // ── Scroll drives 3D tilt → flat ──
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 2,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Speed up columns as tilt flattens
            tweenRefs.current.forEach((t, i) => {
              if (t) t.timeScale(1 + self.progress * 1.5)
            })
          },
        },
      })
      .fromTo(stageRef.current,
        { rotateX: 32, scale: 0.78, transformPerspective: 1200, transformOrigin: '50% 65%' },
        { rotateX: 0,  scale: 1,    transformPerspective: 1200, transformOrigin: '50% 50%', ease: 'none' }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="proc-section" id="process">

      <div className="proc-header">
        <span className="proc-eyebrow">How we work</span>
        <h2 className="proc-title">Our Process</h2>
      </div>

      <div ref={stageRef} className="proc-stage">
        {COLUMNS.map((cards, ci) => (
          <div
            key={ci}
            ref={el => colRefs.current[ci] = el}
            className="proc-col"
          >
            {/* Doubled for seamless infinite loop */}
            {[...cards, ...cards].map((card, idx) => (
              <div
                key={idx}
                className="proc-card"
                style={{ height: CARD_HEIGHTS[ci][idx % cards.length], background: card.color }}
              >
                <div className="proc-card__inner">
                  <span className="proc-card__num">{card.num}</span>
                  <span className="proc-card__title">{card.title}</span>
                </div>
                <div className="proc-card__glow" />
              </div>
            ))}
          </div>
        ))}
      </div>

    </section>
  )
}
