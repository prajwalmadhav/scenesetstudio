import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scattered cards — mix of sizes like the reference gallery
const CARDS = [
  // Large anchors
  { w: 480, h: 320, x: 1900, y: 1600 },
  { w: 420, h: 560, x: 2480, y: 1500 },
  { w: 560, h: 380, x: 1380, y: 1820 },
  { w: 380, h: 260, x: 2960, y: 1680 },
  { w: 320, h: 430, x: 2200, y: 1900 },
  { w: 440, h: 300, x: 1680, y: 1400 },
  { w: 500, h: 340, x: 2700, y: 1360 },

  // Medium
  { w: 260, h: 180, x: 1200, y: 1480 },
  { w: 220, h: 300, x: 3200, y: 1520 },
  { w: 300, h: 200, x: 2060, y: 1340 },
  { w: 240, h: 160, x: 2360, y: 2120 },
  { w: 200, h: 270, x: 1560, y: 2080 },
  { w: 280, h: 190, x: 3060, y: 1880 },
  { w: 190, h: 130, x: 1080, y: 1760 },
  { w: 240, h: 170, x: 3380, y: 1760 },
  { w: 210, h: 140, x: 2560, y: 2200 },
  { w: 170, h: 230, x: 1760, y: 2260 },
  { w: 230, h: 155, x: 2900, y: 2100 },

  // Small
  { w: 140, h: 95,  x: 960,  y: 1360 },
  { w: 120, h: 160, x: 1080, y: 1960 },
  { w: 155, h: 105, x: 3480, y: 1400 },
  { w: 110, h: 150, x: 3540, y: 1940 },
  { w: 130, h: 88,  x: 2160, y: 1220 },
  { w: 145, h: 98,  x: 2620, y: 1180 },
  { w: 115, h: 155, x: 1640, y: 2340 },
  { w: 160, h: 108, x: 3100, y: 2260 },
  { w: 105, h: 70,  x: 2040, y: 2460 },
  { w: 135, h: 90,  x: 2780, y: 2380 },

  // Tiny scatter
  { w: 72,  h: 48,  x: 780,  y: 1260 },
  { w: 60,  h: 40,  x: 860,  y: 1540 },
  { w: 80,  h: 54,  x: 820,  y: 1820 },
  { w: 64,  h: 43,  x: 740,  y: 2060 },
  { w: 76,  h: 51,  x: 3680, y: 1280 },
  { w: 58,  h: 39,  x: 3760, y: 1560 },
  { w: 70,  h: 47,  x: 3720, y: 1820 },
  { w: 62,  h: 42,  x: 3640, y: 2060 },
  { w: 84,  h: 57,  x: 1860, y: 1060 },
  { w: 68,  h: 46,  x: 2240, y: 1020 },
  { w: 78,  h: 52,  x: 2740, y: 1060 },
  { w: 66,  h: 44,  x: 3260, y: 1140 },
  { w: 74,  h: 50,  x: 1480, y: 2540 },
  { w: 56,  h: 38,  x: 2100, y: 2580 },
  { w: 70,  h: 47,  x: 2820, y: 2560 },
  { w: 60,  h: 40,  x: 3160, y: 2480 },
]

// Center of the galaxy
const CX = 2500
const CY = 1900

export default function OurWork() {
  const sectionRef  = useRef(null)
  const canvasRef   = useRef(null)
  const labelRef    = useRef(null)
  const portalRef   = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas  = canvasRef.current
    const label   = labelRef.current
    const portal  = portalRef.current
    if (!section || !canvas || !label || !portal) return

    const vw = window.innerWidth
    const vh = window.innerHeight

    // Offset so galaxy center is at viewport center
    const ox = -(CX - vw / 2)
    const oy = -(CY - vh / 2)

    // Start zoomed IN (scale 2.8), pull back to reveal full galaxy
    gsap.set(canvas, { x: ox, y: oy, scale: 2.8, transformOrigin: '50% 50%' })
    gsap.set(portal, { opacity: 0, scale: 0.06, xPercent: -50, yPercent: -50, transformOrigin: '50% 50%' })
    gsap.set(label,  { opacity: 0, y: 20 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=5000',
        pin: true,
        scrub: 1.4,
        anticipatePin: 1,
      },
    })

    // Phase 1 (0→60%): label fades in, galaxy zooms out
    tl.to(label, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0)
    tl.to(canvas, {
      scale: 0.42,
      duration: 3,
      ease: 'power2.inOut',
    }, 0)

    // Phase 2 (60→80%): label fades out
    tl.to(label, { opacity: 0, y: -20, duration: 0.6 }, 2)

    // Phase 3 (80→100%): portal card zooms from center to fullscreen
    tl.to(portal, {
      opacity: 1,
      scale: 1,
      duration: 1.6,
      ease: 'power3.inOut',
    }, 2.4)

    // Fade canvas as portal takes over
    tl.to(canvas, {
      opacity: 0,
      duration: 0.6,
    }, 3.0)

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section ref={sectionRef} className="ourwork-section" id="ourwork">

      {/* Background branding watermark */}
      <div className="ourwork-bg-branding">
        <div className="branding-line">SCENE SET</div>
        <div className="branding-line">STUDIO</div>
      </div>

      {/* Galaxy canvas */}
      <div ref={canvasRef} className="ourwork-canvas">
        {CARDS.map((card, i) => (
          <div
            key={i}
            className="ourwork-item"
            style={{ width: card.w, height: card.h, left: card.x, top: card.y }}
          />
        ))}
      </div>

      {/* Floating label */}
      <div ref={labelRef} className="ourwork-label">
        <span className="ourwork-label__eyebrow">Portfolio</span>
        <h2 className="ourwork-label__title">Our Work</h2>
        <p className="ourwork-label__sub">Endless creativity, distilled.</p>
      </div>

      {/* Portal — center card that expands to fullscreen → reveals Testimonials */}
      <div ref={portalRef} className="ourwork-portal" />

    </section>
  )
}
