import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// 60 cards scattered across a 5000×4000 canvas
// Sizes and positions mimic the reference: large cluster near center,
// medium mid-ring, tiny scattered at edges. No rotation — clean like reference.
const CARDS = [
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

// Muted placeholder fills — warm grays, no bright color
const FILLS = [
  '#e8e5e0', '#dddad5', '#d5d2cc', '#e2ddd8',
  '#cecac4', '#d8d5cf', '#e5e2dc', '#ccc9c3',
]

export default function OurWork() {
  const sectionRef = useRef(null)
  const canvasRef  = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const CANVAS_W = 5000
    const CANVAS_H = 4000
    const vw = window.innerWidth
    const vh = window.innerHeight

    // Start centered, slightly zoomed in so large images fill viewport
    const cx = -(CANVAS_W / 2 - vw / 2)
    const cy = -(CANVAS_H / 2 - vh / 2)

    gsap.set(canvas, { x: cx, y: cy, scale: 1.7, transformOrigin: '50% 50%' })

    // Zoom out + slow pan — mirrors the reference video
    gsap.to(canvas, {
      scale: 0.38,
      x: cx + 80,
      y: cy + 60,
      duration: 36,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    return () => gsap.killTweensOf(canvas)
  }, [])

  return (
    <section ref={sectionRef} className="ourwork-section" id="ourwork">

      {/* Label */}
      <div className="ourwork-label">
        <span className="ourwork-label__eyebrow">Portfolio</span>
        <h2 className="ourwork-label__title">Our Work</h2>
        <p className="ourwork-label__sub">Scroll to explore</p>
      </div>

      {/* Galaxy canvas */}
      <div ref={canvasRef} className="ourwork-canvas">
        {CARDS.map((card, i) => (
          <div
            key={i}
            className="ourwork-img"
            style={{
              width:  card.w,
              height: card.h,
              left:   card.x,
              top:    card.y,
              background: FILLS[i % FILLS.length],
            }}
          />
        ))}
      </div>

    </section>
  )
}
