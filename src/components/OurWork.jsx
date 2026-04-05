import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Testimonials from './Testimonials'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Canvas centre — where cards cluster around
   ───────────────────────────────────────── */
const CX = 2400
const CY = 1900

/* ─────────────────────────────────────────
   Editorial colour palette
   Matches the reference: dark, red, green,
   cream, deep-blue, brown, warm-grey.
   ───────────────────────────────────────── */
const DARK = '#1a1814'
const PALETTE = [
  '#C43A1E', // editorial red
  '#2B4A3A', // forest green
  '#BFC8A8', // sage / parchment
  '#1E2840', // dark blue-navy
  '#4A3828', // warm dark brown
  '#9A8B72', // warm taupe
  '#3A2E48', // dark purple
  '#8B6050', // warm terracotta muted
]

/**
 * Assign a background colour to a card.
 * Large cards always get editorial tones.
 * Medium cards get editorial every 2nd.
 * Small / tiny cards stay near-black.
 */
function cardBg(card, idx) {
  const { w } = card
  if (w >= 400)  return PALETTE[idx % PALETTE.length]
  if (w >= 200)  return idx % 2 === 0 ? PALETTE[(idx * 3) % PALETTE.length] : DARK
  if (w >= 100)  return idx % 4 === 0 ? PALETTE[(idx * 2) % PALETTE.length] : DARK
  return DARK
}

/* ─────────────────────────────────────────
   Wave 1 — starts at MEDIUM ZOOM (~0.55)
   Already visible when section pins.
   Flies past camera over first ~55% of scroll.
   ───────────────────────────────────────── */
const WAVE1_CARDS = [
  { w: 500, h: 340, x: 1880, y: 1560 },
  { w: 460, h: 560, x: 2520, y: 1420 },
  { w: 260, h: 180, x: 1340, y: 1780 },
  { w: 240, h: 330, x: 3020, y: 1640 },
  { w: 280, h: 195, x: 2040, y: 1300 },
  { w: 225, h: 160, x: 2360, y: 2120 },
  { w: 195, h: 270, x: 1560, y: 2060 },
  { w: 270, h: 185, x: 3080, y: 1840 },
  { w: 230, h: 160, x: 1100, y: 1720 },
  { w: 250, h: 170, x: 3380, y: 1720 },
  { w: 200, h: 140, x: 2600, y: 2200 },
  { w: 215, h: 300, x: 1740, y: 2260 },
  { w: 255, h: 175, x: 2900, y: 2100 },
  { w: 235, h: 165, x: 1660, y: 1360 },
  { w: 135, h: 92,  x: 940,  y: 1320 },
  { w: 118, h: 162, x: 1060, y: 1940 },
  { w: 148, h: 100, x: 3500, y: 1360 },
  { w: 110, h: 152, x: 3560, y: 1920 },
  { w: 128, h: 86,  x: 2150, y: 1180 },
  { w: 140, h: 96,  x: 2660, y: 1140 },
  { w: 152, h: 104, x: 3100, y: 2260 },
  { w: 130, h: 88,  x: 2820, y: 2380 },
  { w: 70,  h: 48,  x: 780,  y: 1220 },
  { w: 58,  h: 40,  x: 856,  y: 1520 },
  { w: 78,  h: 54,  x: 818,  y: 1800 },
  { w: 62,  h: 44,  x: 738,  y: 2060 },
  { w: 74,  h: 50,  x: 680,  y: 1440 },
  { w: 54,  h: 38,  x: 700,  y: 1700 },
  { w: 66,  h: 46,  x: 660,  y: 1960 },
  { w: 74,  h: 50,  x: 3700, y: 1240 },
  { w: 56,  h: 38,  x: 3790, y: 1520 },
  { w: 68,  h: 46,  x: 3750, y: 1780 },
  { w: 60,  h: 42,  x: 3680, y: 2040 },
  { w: 82,  h: 56,  x: 3820, y: 1300 },
  { w: 64,  h: 44,  x: 3840, y: 1680 },
  { w: 72,  h: 50,  x: 3760, y: 2000 },
  { w: 82,  h: 56,  x: 1880, y: 1020 },
  { w: 66,  h: 46,  x: 2260, y:  980 },
  { w: 76,  h: 52,  x: 2760, y: 1020 },
  { w: 64,  h: 44,  x: 3260, y: 1100 },
  { w: 72,  h: 50,  x: 1480, y: 2540 },
  { w: 54,  h: 38,  x: 2100, y: 2580 },
  { w: 68,  h: 46,  x: 2840, y: 2560 },
  { w: 58,  h: 40,  x: 3180, y: 2480 },
  { w: 76,  h: 52,  x: 1220, y: 2340 },
  { w: 62,  h: 42,  x: 1360, y: 2580 },
  { w: 70,  h: 48,  x: 3340, y: 2380 },
  { w: 56,  h: 38,  x: 3460, y: 2120 },
]

/* ─────────────────────────────────────────
   Wave 2 — emerges from deep background
   (~0.18 scale) at progress 0.42 and
   flies past camera over rest of scroll.
   ───────────────────────────────────────── */
const WAVE2_CARDS = [
  { w: 520, h: 360, x: 1760, y: 1640 },
  { w: 440, h: 580, x: 2600, y: 1460 },
  { w: 255, h: 178, x: 1440, y: 1820 },
  { w: 238, h: 326, x: 2960, y: 1620 },
  { w: 268, h: 188, x: 2100, y: 1280 },
  { w: 220, h: 154, x: 2420, y: 2140 },
  { w: 190, h: 265, x: 1600, y: 2020 },
  { w: 264, h: 182, x: 3120, y: 1860 },
  { w: 232, h: 162, x: 1080, y: 1760 },
  { w: 248, h: 174, x: 3440, y: 1760 },
  { w: 202, h: 142, x: 2560, y: 2220 },
  { w: 218, h: 304, x: 1800, y: 2280 },
  { w: 254, h: 174, x: 2940, y: 2120 },
  { w: 234, h: 164, x: 1700, y: 1380 },
  { w: 132, h: 90,  x: 980,  y: 1360 },
  { w: 116, h: 160, x: 1040, y: 1980 },
  { w: 146, h: 98,  x: 3480, y: 1340 },
  { w: 112, h: 154, x: 3540, y: 1940 },
  { w: 126, h: 84,  x: 2180, y: 1200 },
  { w: 142, h: 98,  x: 2700, y: 1160 },
  { w: 150, h: 102, x: 3060, y: 2240 },
  { w: 132, h: 90,  x: 2780, y: 2340 },
  { w: 68,  h: 46,  x: 800,  y: 1240 },
  { w: 56,  h: 38,  x: 876,  y: 1540 },
  { w: 76,  h: 52,  x: 836,  y: 1820 },
  { w: 60,  h: 42,  x: 756,  y: 2080 },
  { w: 72,  h: 50,  x: 700,  y: 1460 },
  { w: 52,  h: 36,  x: 720,  y: 1720 },
  { w: 64,  h: 44,  x: 676,  y: 1980 },
  { w: 72,  h: 50,  x: 3720, y: 1260 },
  { w: 54,  h: 38,  x: 3810, y: 1540 },
  { w: 66,  h: 44,  x: 3770, y: 1800 },
  { w: 58,  h: 40,  x: 3700, y: 2060 },
  { w: 80,  h: 54,  x: 3800, y: 1280 },
  { w: 62,  h: 42,  x: 3860, y: 1700 },
  { w: 70,  h: 48,  x: 3780, y: 2020 },
  { w: 80,  h: 54,  x: 1900, y: 1040 },
  { w: 64,  h: 44,  x: 2280, y: 1000 },
  { w: 74,  h: 50,  x: 2740, y: 1000 },
  { w: 62,  h: 42,  x: 3240, y: 1080 },
  { w: 70,  h: 48,  x: 1500, y: 2560 },
  { w: 52,  h: 36,  x: 2140, y: 2600 },
  { w: 66,  h: 44,  x: 2860, y: 2580 },
  { w: 56,  h: 38,  x: 3200, y: 2500 },
  { w: 74,  h: 50,  x: 1240, y: 2360 },
  { w: 60,  h: 42,  x: 1380, y: 2600 },
  { w: 68,  h: 46,  x: 3360, y: 2400 },
  { w: 54,  h: 38,  x: 3480, y: 2140 },
]

const MAX_DIST = 1600
function lerp(a, b, t) { return a + (b - a) * t }
function clamp01(v) { return Math.max(0, Math.min(1, v)) }

/* Wave 1 — fades in fast (already at medium zoom), flies past ~p=0.35–0.55 */
function buildW1Configs(cards) {
  return cards.map((c) => {
    const dist  = Math.sqrt((c.x + c.w / 2 - CX) ** 2 + (c.y + c.h / 2 - CY) ** 2)
    const dNorm = clamp01(dist / MAX_DIST)
    return {
      fadeInStart:  0.00,
      fadeInEnd:    lerp(0.06, 0.02, dNorm),   // quick reveal
      flyPastStart: lerp(0.38, 0.24, dNorm),
      flyPastEnd:   lerp(0.52, 0.36, dNorm),
    }
  })
}

/* Wave 2 — originates from deep bg at p=0.42, flies past p=0.72–0.88 */
function buildW2Configs(cards) {
  return cards.map((c) => {
    const dist  = Math.sqrt((c.x + c.w / 2 - CX) ** 2 + (c.y + c.h / 2 - CY) ** 2)
    const dNorm = clamp01(dist / MAX_DIST)
    return {
      fadeInStart:  0.42,
      fadeInEnd:    lerp(0.52, 0.48, dNorm),
      flyPastStart: lerp(0.76, 0.62, dNorm),
      flyPastEnd:   lerp(0.88, 0.74, dNorm),
    }
  })
}

const WAVE1_CONFIGS = buildW1Configs(WAVE1_CARDS)
const WAVE2_CONFIGS = buildW2Configs(WAVE2_CARDS)

export default function OurWork() {
  const sectionRef = useRef(null)
  const canvas1Ref = useRef(null)
  const canvas2Ref = useRef(null)
  const labelRef   = useRef(null)
  const portalRef  = useRef(null)
  const wave1Refs  = useRef([])
  const wave2Refs  = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const canvas1 = canvas1Ref.current
    const canvas2 = canvas2Ref.current
    const label   = labelRef.current
    const portal  = portalRef.current
    if (!section || !canvas1 || !canvas2 || !label || !portal) return

    const vw = window.innerWidth
    const vh = window.innerHeight
    const ox = -(CX - vw / 2)
    const oy = -(CY - vh / 2)

    /* ── Initial state: wave1 at MEDIUM ZOOM so imagery is immediately visible ── */
    gsap.set(canvas1, { x: ox, y: oy, scale: 0.55, opacity: 1, transformOrigin: '50% 50%' })
    gsap.set(canvas2, { x: ox, y: oy, scale: 0.18, opacity: 0,  transformOrigin: '50% 50%' })
    gsap.set(label,   { opacity: 1, y: 0 })
    gsap.set(portal,  { opacity: 0, scaleX: 0, scaleY: 0, xPercent: -50, yPercent: -50, transformOrigin: '50% 50%' })

    wave1Refs.current.forEach(el => { if (el) el.style.opacity = '0' })
    wave2Refs.current.forEach(el => { if (el) el.style.opacity = '0' })

    let portalUnlocked = false

    function onUpdate(self) {
      const p = self.progress

      /* ── Wave 1: medium zoom (0.55) → fly past (9.0), fades at p>0.50 ── */
      const c1scale   = lerp(0.55, 9.0, clamp01(p / 0.55))
      const c1opacity = p < 0.50 ? 1 : clamp01(1 - (p - 0.50) / 0.10)
      gsap.set(canvas1, { scale: c1scale, opacity: c1opacity })

      /* ── Wave 2: deep background (0.18) → fly past (9.0), originates at p=0.42 ── */
      const c2opacityIn  = clamp01((p - 0.42) / 0.08)
      const c2opacityOut = p < 0.82 ? 1 : clamp01(1 - (p - 0.82) / 0.08)
      const c2scale      = lerp(0.18, 9.0, clamp01((p - 0.42) / 0.53))
      gsap.set(canvas2, { scale: c2scale, opacity: Math.min(c2opacityIn, c2opacityOut) })

      /* ── Label fades quickly after scroll starts ── */
      label.style.opacity = p < 0.04 ? 1 : Math.max(0, 1 - (p - 0.04) / 0.06)

      /* ── Portal expands from centre at end ── */
      const portalP = clamp01((p - 0.92) / 0.08)
      gsap.set(portal, { opacity: portalP, scaleX: portalP, scaleY: portalP })
      if (portalP >= 1 && !portalUnlocked) {
        portal.style.pointerEvents = 'all'
        portalUnlocked = true
      } else if (portalP < 1) {
        portal.style.pointerEvents = 'none'
        portalUnlocked = false
      }

      /* ── Wave 1 card opacities ── */
      wave1Refs.current.forEach((el, i) => {
        if (!el) return
        const { fadeInStart: a, fadeInEnd: b, flyPastStart: c, flyPastEnd: d } = WAVE1_CONFIGS[i]
        let o
        if (p <= a)      o = 0
        else if (p <= b) o = clamp01((p - a) / (b - a))
        else if (p <= c) o = 1
        else if (p <= d) o = clamp01(1 - (p - c) / (d - c))
        else             o = 0
        el.style.opacity = o
      })

      /* ── Wave 2 card opacities ── */
      wave2Refs.current.forEach((el, i) => {
        if (!el) return
        const { fadeInStart: a, fadeInEnd: b, flyPastStart: c, flyPastEnd: d } = WAVE2_CONFIGS[i]
        let o
        if (p <= a)      o = 0
        else if (p <= b) o = clamp01((p - a) / (b - a))
        else if (p <= c) o = 1
        else if (p <= d) o = clamp01(1 - (p - c) / (d - c))
        else             o = 0
        el.style.opacity = o
      })
    }

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=14000',
      pin: true,
      scrub: 1.5,
      anticipatePin: 1,
      onUpdate,
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section ref={sectionRef} className="ourwork-section" id="ourwork">

      {/* Background watermark */}
      <div className="ourwork-bg-branding" aria-hidden="true">
        <div className="branding-line">SCENE SET</div>
        <div className="branding-line">STUDIO</div>
      </div>

      {/* "Our Work" label — fades out as soon as scrolling begins */}
      <div ref={labelRef} className="ourwork-label">
        <span className="ourwork-label__eyebrow">Portfolio</span>
        <h2 className="ourwork-label__title">Our Work</h2>
        <p className="ourwork-label__sub">Scroll to explore</p>
      </div>

      {/* ── Wave 1 canvas — medium zoom on entry ── */}
      <div ref={canvas1Ref} className="ourwork-canvas">
        {WAVE1_CARDS.map((c, i) => (
          <div
            key={i}
            ref={el => wave1Refs.current[i] = el}
            className="ourwork-item"
            style={{
              width: c.w, height: c.h, left: c.x, top: c.y,
              opacity: 0,
              background: cardBg(c, i),
            }}
          />
        ))}
      </div>

      {/* ── Wave 2 canvas — emerges from deep background ── */}
      <div ref={canvas2Ref} className="ourwork-canvas">
        {WAVE2_CARDS.map((c, i) => (
          <div
            key={i}
            ref={el => wave2Refs.current[i] = el}
            className="ourwork-item"
            style={{
              width: c.w, height: c.h, left: c.x, top: c.y,
              opacity: 0,
              background: cardBg(c, i + 7), // offset palette so wave2 differs from wave1
            }}
          />
        ))}
      </div>

      {/* ── Portal — expands from centre, reveals Testimonials ── */}
      <div ref={portalRef} className="ourwork-portal">
        <Testimonials />
      </div>

    </section>
  )
}
