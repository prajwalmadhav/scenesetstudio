import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const COLUMNS = [
  [{ h: 240 }, { h: 300 }, { h: 220 }, { h: 280 }],
  [{ h: 300 }, { h: 220 }, { h: 260 }, { h: 240 }],
  [{ h: 260 }, { h: 280 }, { h: 300 }, { h: 220 }],
  [{ h: 220 }, { h: 260 }, { h: 240 }, { h: 300 }],
  [{ h: 280 }, { h: 240 }, { h: 220 }, { h: 260 }],
]

export default function WorkGallery() {
  const sectionRef = useRef(null)
  const stageRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(stageRef.current,
        { rotateX: 30, scale: 0.82, opacity: 0, transformPerspective: 1200, transformOrigin: '50% 65%' },
        {
          rotateX: 30, scale: 0.82, opacity: 1, transformPerspective: 1200,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
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
          <div key={ci} className="work-col">
            {col.map((card, idx) => (
              <div key={idx} className="work-card" style={{ height: card.h }}>
                <div className="work-card__placeholder">
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
