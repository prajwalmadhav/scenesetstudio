import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TESTIMONIALS = [
  {
    quote: "SceneSet transformed our brand identity completely. The campaigns they produced drove a 3x increase in qualified leads within 90 days.",
    name: "Alex Morgan",
    role: "CMO, Apex Ventures",
    initials: "AM",
    color: "#1a0a12",
  },
  {
    quote: "The video production quality is unmatched. Our product launch video hit 2M views organically — we've never seen results like that.",
    name: "Jamie Chen",
    role: "Founder, Luminary Tech",
    initials: "JC",
    color: "#0a0f1a",
  },
  {
    quote: "Working with SceneSet felt like having an in-house creative team. Their strategy is sharp and execution is flawless.",
    name: "Sara Williams",
    role: "Head of Growth, Ember Studio",
    initials: "SW",
    color: "#0a1a0f",
  },
  {
    quote: "Our social engagement went up 400% in the first month. The content they create just stops the scroll every single time.",
    name: "Marcus Reid",
    role: "Brand Director, Northfield Co.",
    initials: "MR",
    color: "#150a1a",
  },
  {
    quote: "SceneSet doesn't just deliver work — they deliver results. ROI on our ad campaigns was 6x within the first quarter.",
    name: "Priya Nair",
    role: "CEO, Solaris Media",
    initials: "PN",
    color: "#1a100a",
  },
  {
    quote: "Every touchpoint they designed felt premium. Our conversion rate doubled and customers keep complimenting the brand aesthetic.",
    name: "Tom Okafor",
    role: "Co-Founder, Vanta Labs",
    initials: "TO",
    color: "#0a1a18",
  },
]

// Duplicate 3× for seamless looping with drag room
const ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const xPos       = useRef(0)
  const velocity   = useRef(0)
  const isDragging = useRef(false)
  const lastX      = useRef(0)
  const lastTime   = useRef(0)
  const isHovered  = useRef(false)

  const AUTO_SPEED = 1.0 // px per frame
  const CARD_W     = 560 + 24 // card width + gap

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const singleSetW = TESTIMONIALS.length * CARD_W

    // Start position at second set so we can drag left/right
    xPos.current = -singleSetW

    const tick = () => {
      if (!isDragging.current) {
        // Auto scroll
        const speed = isHovered.current ? AUTO_SPEED * 0.25 : AUTO_SPEED
        velocity.current += (-speed - velocity.current) * 0.08
        xPos.current += velocity.current

        // Wrap seamlessly
        if (xPos.current < -singleSetW * 2) xPos.current += singleSetW
        if (xPos.current > -singleSetW + 100) xPos.current -= singleSetW
      } else {
        // Friction while dragging
        if (Math.abs(velocity.current) > 0.01) {
          velocity.current *= 0.85
        }
      }

      gsap.set(track, { x: xPos.current })
    }

    gsap.ticker.add(tick)

    // Drag handlers
    const onPointerDown = (e) => {
      isDragging.current = true
      lastX.current = e.clientX
      lastTime.current = performance.now()
      velocity.current = 0
      track.style.cursor = 'grabbing'
    }

    const onPointerMove = (e) => {
      if (!isDragging.current) return
      const now = performance.now()
      const dx  = e.clientX - lastX.current
      const dt  = now - lastTime.current || 1

      xPos.current += dx
      velocity.current = dx / dt * 16 // normalise to ~60fps

      // Wrap
      if (xPos.current < -singleSetW * 2) xPos.current += singleSetW
      if (xPos.current > -singleSetW + 100) xPos.current -= singleSetW

      lastX.current = e.clientX
      lastTime.current = now
    }

    const onPointerUp = () => {
      isDragging.current = false
      track.style.cursor = 'grab'
    }

    track.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    const section = sectionRef.current
    section.addEventListener('mouseenter', () => { isHovered.current = true })
    section.addEventListener('mouseleave', () => { isHovered.current = false })

    return () => {
      gsap.ticker.remove(tick)
      track.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  return (
    <section ref={sectionRef} className="testi-section" id="testimonials">

      <div className="testi-header">
        <span className="testi-eyebrow">What clients say</span>
        <h2 className="testi-title">Testimonials</h2>
      </div>

      <div className="testi-viewport">
        <div ref={trackRef} className="testi-track">
          {ITEMS.map((t, i) => (
            <div key={i} className="testi-card" style={{ background: t.color }}>
              <div className="testi-card__quote">"{t.quote}"</div>
              <div className="testi-card__footer">
                <div className="testi-card__avatar" style={{ background: `${t.color}cc`, border: '1px solid rgba(196,32,135,0.4)' }}>
                  {t.initials}
                </div>
                <div className="testi-card__info">
                  <span className="testi-card__name">{t.name}</span>
                  <span className="testi-card__role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edge fade masks */}
        <div className="testi-fade testi-fade--left" />
        <div className="testi-fade testi-fade--right" />
      </div>

    </section>
  )
}
