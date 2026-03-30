import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Center the camera on the first card (2100, 1560)
const CARDS = [
  // ── PORTAL (The one we zoom into, 720px x 480px centered) ──
  { w: 720, h: 480, x: 2140, y: 1760, portal: true }, 

  // ── LARGE (hero, 300–520px) — center cluster ──
  { w: 520, h: 360, x: 2100, y: 1560 },
  { w: 440, h: 300, x: 2700, y: 1480 },
  { w: 380, h: 260, x: 1700, y: 1700 },
  { w: 460, h: 320, x: 2400, y: 1900 },
  { w: 340, h: 240, x: 3000, y: 1700 },
  { w: 390, h: 270, x: 1860, y: 1360 },
  { w: 420, h: 290, x: 2560, y: 1260 },
  { w: 310, h: 220, x: 3180, y: 1940 },
  { w: 360, h: 250, x: 1540, y: 1940 },

  // ── MEDIUM (120–280px) — mid ring ──
  { w: 260, h: 180, x: 1200, y: 1400 },
  { w: 220, h: 155, x: 1300, y: 1180 },
  { w: 280, h: 195, x: 3380, y: 1380 },
  { w: 240, h: 168, x: 3460, y: 1620 },
  { w: 195, h: 136, x: 2100, y: 1180 },
  { w: 230, h: 160, x: 2800, y: 1220 },
  { w: 200, h: 140, x: 1640, y: 2180 },
  { w: 250, h: 175, x: 2940, y: 2100 },
  { w: 175, h: 122, x: 1140, y: 1720 },
  { w: 210, h: 147, x: 3540, y: 1860 },
  { w: 185, h: 130, x: 2300, y: 2180 },
  { w: 165, h: 115, x: 1960, y: 2280 },
  { w: 245, h: 172, x: 2720, y: 2200 },
  { w: 155, h: 108, x: 1380, y: 2060 },
  { w: 190, h: 133, x: 3200, y: 2220 },

  // ── SMALL (55–130px) — outer scatter ──
  { w: 128, h: 90,  x: 900,  y: 1200 },
  { w: 110, h: 77,  x: 1020, y: 1540 },
  { w: 95,  h: 67,  x: 1100, y: 1920 },
  { w: 118, h: 83,  x: 3640, y: 1240 },
  { w: 105, h: 74,  x: 3700, y: 1500 },
  { w: 88,  h: 62,  x: 3660, y: 1760 },
  { w: 122, h: 86,  x: 2000, y: 1020 },
  { w: 100, h: 70,  x: 2400, y: 980  },
  { w: 115, h: 81,  x: 2800, y: 1040 },
  { w: 90,  h: 63,  x: 1680, y: 1120 },
  { w: 130, h: 91,  x: 3100, y: 1100 },
  { w: 108, h: 76,  x: 1800, y: 2440 },
  { w: 95,  h: 67,  x: 2200, y: 2480 },
  { w: 118, h: 83,  x: 2620, y: 2440 },
  { w: 85,  h: 60,  x: 3000, y: 2380 },

  // ── TINY (20–55px) — far edges ──
  { w: 54,  h: 38,  x: 620,  y: 1080 },
  { w: 46,  h: 32,  x: 740,  y: 1340 },
  { w: 60,  h: 42,  x: 660,  y: 1640 },
  { w: 42,  h: 30,  x: 700,  y: 1900 },
  { w: 52,  h: 36,  x: 780,  y: 2100 },
  { w: 48,  h: 34,  x: 3840, y: 1120 },
  { w: 58,  h: 41,  x: 3900, y: 1380 },
  { w: 44,  h: 31,  x: 3860, y: 1640 },
  { w: 50,  h: 35,  x: 3920, y: 1900 },
  { w: 40,  h: 28,  x: 3800, y: 2080 },
  { w: 55,  h: 39,  x: 1600, y: 860  },
  { w: 38,  h: 27,  x: 2100, y: 800  },
  { w: 48,  h: 34,  x: 2700, y: 820  },
  { w: 45,  h: 32,  x: 3200, y: 900  },
  { w: 52,  h: 36,  x: 1500, y: 2620 },
  { w: 42,  h: 30,  x: 2100, y: 2680 },
  { w: 50,  h: 35,  x: 2700, y: 2660 },
  { w: 44,  h: 31,  x: 3100, y: 2560 },
]

export default function OurWork() {
  const sectionRef = useRef(null)
  const canvasRef  = useRef(null)
  const brandingRef = useRef(null)
  const portalRef  = useRef(null)
  const labelRef   = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas  = canvasRef.current
    const label   = labelRef.current
    const branding = brandingRef.current
    const portal   = portalRef.current
    if (!section || !canvas || !label || !branding || !portal) return

    const CANVAS_W = 5000
    const CANVAS_H = 4000
    const vw = window.innerWidth
    const vh = window.innerHeight

    // Center view exactly on the portal card cluster start
    const targetCard = CARDS[0]
    const cx = -(targetCard.x + targetCard.w / 2 - vw / 2)
    const cy = -(targetCard.y + targetCard.h / 2 - vh / 2)

    // Initial state: Zoomed in view of translucent cards
    gsap.set(canvas, { 
      x: cx, 
      y: cy, 
      scale: 1, // Start zoomed in
      opacity: 1,
      transformOrigin: '50% 50%'
    })
    
    gsap.set('.ourwork-item', { 
      backgroundColor: 'rgba(5, 5, 5, 0.65)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    })
    
    gsap.set(branding, { 
      '-webkit-text-stroke': '1px rgba(0,0,0,0.06)', 
      color: 'transparent' 
    })
    gsap.set(portal, { opacity: 0, scale: 0.5 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=4500', 
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      }
    })

    // Straight infinite zoom
    tl.to(canvas, {
      scale: 25, 
      x: cx - 800, 
      y: cy - 200,
      duration: 5,
      ease: 'power3.inOut'
    }, 'start')

    // Fade out label as we go deep
    tl.to(label, {
      opacity: 0,
      y: -40,
      duration: 1.5
    }, 'start+=1')

    // Phase 2: Final Portal Border Reveal
    tl.to(portal, {
      opacity: 1,
      scale: 4, // expansive glowing border reveal
      duration: 2,
      ease: 'power4.out'
    }, 'start+=3.5')

    // Dissolve everything except the portal logic for reveal
    tl.to(canvas, {
      opacity: 0,
      duration: 1,
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="ourwork-section" id="ourwork">

      {/* Subtle background branding watermark */}
      <div ref={brandingRef} className="ourwork-bg-branding">
        <div className="branding-line">SCENE SET</div>
        <div className="branding-line">STUDIO</div>
      </div>

      {/* Expanding Glowing Border Reveal */}
      <div ref={portalRef} className="ourwork-portal-reveal" />

      {/* Galaxy canvas */}
      <div ref={canvasRef} className="ourwork-canvas">
        {CARDS.map((card, i) => (
          <div
            key={i}
            className={`ourwork-item ${card.portal ? 'portal' : ''}`}
            style={{
              width:  card.w,
              height: card.h,
              left:   card.x,
              top:    card.y,
              border: card.portal ? 'none' : '1px solid rgba(0,0,0,0.1)',
            }}
          >
            {card.portal && (
              <div className="ourwork-portal-content">
                <span className="portal-eyebrow">Discover</span>
                <h3 className="portal-title">Client Success</h3>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating label */}
      <div ref={labelRef} className="ourwork-label">
        <span className="ourwork-label__eyebrow">Portfolio</span>
        <h2 className="ourwork-label__title">Our Work</h2>
        <p className="ourwork-label__sub">Endless creativity, distilled.</p>
      </div>

    </section>
  )
}
