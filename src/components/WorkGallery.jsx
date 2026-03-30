import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARD_COLORS = [
  'linear-gradient(135deg, #1a0a12 0%, #2d0d1f 100%)',
  'linear-gradient(135deg, #0a0f1a 0%, #0d1a2d 100%)',
  'linear-gradient(135deg, #0a1a0f 0%, #0d2d18 100%)',
  'linear-gradient(135deg, #1a100a 0%, #2d1a0d 100%)',
  'linear-gradient(135deg, #150a1a 0%, #230d2d 100%)',
  'linear-gradient(135deg, #0a1a18 0%, #0d2d28 100%)',
  'linear-gradient(135deg, #1a1a0a 0%, #2d2d0d 100%)',
  'linear-gradient(135deg, #0f0a1a 0%, #1a0d2d 100%)',
]

const BASE_COLUMNS = [
  [{ h: 240, c: 0 }, { h: 300, c: 1 }, { h: 220, c: 2 }, { h: 280, c: 3 }],
  [{ h: 300, c: 4 }, { h: 220, c: 5 }, { h: 260, c: 6 }, { h: 240, c: 7 }],
  [{ h: 260, c: 2 }, { h: 280, c: 3 }, { h: 300, c: 0 }, { h: 220, c: 1 }],
  [{ h: 220, c: 6 }, { h: 260, c: 7 }, { h: 240, c: 4 }, { h: 300, c: 5 }],
  [{ h: 280, c: 1 }, { h: 240, c: 0 }, { h: 220, c: 3 }, { h: 260, c: 2 }],
]

// Double each column for seamless infinite loop
const COLUMNS = BASE_COLUMNS.map(col => [...col, ...col])

export default function WorkGallery() {
  const sectionRef = useRef(null)
  const stageRef   = useRef(null)
  const colRefs    = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance: fade in
      gsap.fromTo(stageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1,
          duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      )

      // Infinite column scroll — alternating up/down
      colRefs.current.forEach((col, i) => {
        if (!col) return
        const totalH = col.scrollHeight / 2 // half = one set of cards
        const dir = i % 2 === 0 ? -1 : 1    // even cols go up, odd go down
        const speed = 28 + i * 3            // slight speed variation per column

        gsap.set(col, { y: dir === -1 ? 0 : -totalH })
        gsap.to(col, {
          y: dir === -1 ? -totalH : 0,
          duration: speed,
          ease: 'none',
          repeat: -1,
        })
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="work-section" id="work">

      <div className="work-header">
        <span className="work-eyebrow">Selected work</span>
        <h2 className="work-title">Our Work</h2>
        <p className="work-sub">Campaigns, brands & experiences we've built.</p>
      </div>

      <div ref={stageRef} className="work-stage" style={{ opacity: 0 }}>
        {COLUMNS.map((col, ci) => (
          <div key={ci} className="work-col" ref={el => colRefs.current[ci] = el}>
            {col.map((card, idx) => (
              <div key={idx} className="work-card" style={{ height: card.h }}>
                <div className="work-card__placeholder" style={{ background: CARD_COLORS[card.c] }}>
                  <span className="work-card__add">+ Add Image</span>
                </div>
                <div className="work-card__glow" />
              </div>
            ))}
          </div>
        ))}
      </div>

    </section>
  )
}
