import { useEffect, useRef, forwardRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StudioStamp from './StudioStamp'

gsap.registerPlugin(ScrollTrigger)


const TITLE_LINES = ['We build', 'brands', 'that people', 'remember.', 'stories that last.']

const HANDLE_POS = ['tl','tm','tr','mr','br','bm','bl','ml']

const C  = 'rgba(0,0,0,0.25)'         // black main
const CD = 'rgba(0,0,0,0.12)'         // black dim
const W  = 'rgba(255,255,255,0.45)'   // white main
const WD = 'rgba(255,255,255,0.2)'    // white dim

function AboutSVGBg() {
  return (
    <svg
      className="about-svg-bg"
      aria-hidden="true"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Circles ── */}
      <circle cx="600" cy="350" r="290" fill="none" stroke={C}  strokeWidth="1" />
      <circle cx="600" cy="350" r="190" fill="none" stroke={CD} strokeWidth="0.75" strokeDasharray="5 12" />
      <circle cx="600" cy="350" r="90"  fill="none" stroke={CD} strokeWidth="0.75" />
      <circle cx="160" cy="130" r="55"  fill="none" stroke={CD} strokeWidth="1" />
      <circle cx="1060" cy="570" r="70" fill="none" stroke={CD} strokeWidth="1" />
      <circle cx="980"  cy="120" r="28" fill="none" stroke={C}  strokeWidth="1" />
      <circle cx="220"  cy="560" r="18" fill="none" stroke={C}  strokeWidth="1" />

      {/* ── Crosshair at center ── */}
      <line x1="588" y1="350" x2="612" y2="350" stroke={C} strokeWidth="1" />
      <line x1="600" y1="338" x2="600" y2="362" stroke={C} strokeWidth="1" />
      <circle cx="600" cy="350" r="2.5" fill="none" stroke={C} strokeWidth="1" />

      {/* ── Small cross markers ── */}
      {[
        [160,140],[1000,180],[130,530],[1060,490],
        [380,82], [840,610], [290,390],[910,120],
        [480,620],[740,60],  [70,300], [1130,340],
      ].map(([x,y],i) => (
        <g key={i}>
          <line x1={x-5} y1={y}   x2={x+5} y2={y}   stroke={CD} strokeWidth="1" />
          <line x1={x}   y1={y-5} x2={x}   y2={y+5} stroke={CD} strokeWidth="1" />
        </g>
      ))}

      {/* ── Arrows ── */}
      {/* Right-pointing arrow — bottom left */}
      <g stroke={C} strokeWidth="1" fill="none" strokeLinecap="round">
        <line x1="60" y1="580" x2="120" y2="580" />
        <polyline points="108,572 120,580 108,588" />
      </g>
      {/* Up-right diagonal arrow — top right */}
      <g stroke={C} strokeWidth="1" fill="none" strokeLinecap="round">
        <line x1="1080" y1="90" x2="1130" y2="48" />
        <polyline points="1114,48 1130,48 1130,64" />
      </g>
      {/* Down arrow — right side */}
      <g stroke={CD} strokeWidth="1" fill="none" strokeLinecap="round">
        <line x1="1100" y1="380" x2="1100" y2="440" />
        <polyline points="1092,428 1100,440 1108,428" />
      </g>

      {/* ── L-shapes (corner brackets) ── */}
      {/* Top-left */}
      <path d="M 48 120 L 48 60 L 108 60"   fill="none" stroke={C}  strokeWidth="1.5" strokeLinecap="square" />
      {/* Top-right */}
      <path d="M 1152 120 L 1152 60 L 1092 60" fill="none" stroke={C}  strokeWidth="1.5" strokeLinecap="square" />
      {/* Bottom-left */}
      <path d="M 48 580 L 48 640 L 108 640"  fill="none" stroke={C}  strokeWidth="1.5" strokeLinecap="square" />
      {/* Bottom-right */}
      <path d="M 1152 580 L 1152 640 L 1092 640" fill="none" stroke={C} strokeWidth="1.5" strokeLinecap="square" />
      {/* Inner L — mid left */}
      <path d="M 200 290 L 200 340 L 250 340" fill="none" stroke={CD} strokeWidth="1" strokeLinecap="square" />
      {/* Inner L — mid right */}
      <path d="M 1000 360 L 1000 410 L 950 410" fill="none" stroke={CD} strokeWidth="1" strokeLinecap="square" />

      {/* ── Arcs ── */}
      <path d="M 970 72 A 110 110 0 0 1 1098 170"  fill="none" stroke={CD} strokeWidth="1" />
      <path d="M 80 420  A 90  90  0 0 0 160 510"  fill="none" stroke={CD} strokeWidth="1" />
      <path d="M 440 640 A 60  60  0 0 1 540 600"  fill="none" stroke={CD} strokeWidth="1" />

      {/* ── Dimension lines ── */}
      <g stroke={CD} strokeWidth="0.75">
        <line x1="300" y1="30" x2="750" y2="30" />
        <line x1="300" y1="24" x2="300" y2="36" />
        <line x1="750" y1="24" x2="750" y2="36" />
      </g>
      <g stroke={CD} strokeWidth="0.75">
        <line x1="1170" y1="200" x2="1170" y2="500" />
        <line x1="1164" y1="200" x2="1176" y2="200" />
        <line x1="1164" y1="500" x2="1176" y2="500" />
      </g>

      {/* ══ WHITE ELEMENTS ══ */}

      {/* Large arc — top left quarter */}
      <path d="M 0 300 A 340 340 0 0 1 340 0" fill="none" stroke={W} strokeWidth="1" />

      {/* Diagonal rule — bottom center */}
      <line x1="450" y1="700" x2="700" y2="500" stroke={W} strokeWidth="0.8" strokeOpacity="0.35" />

      {/* White circles */}
      <circle cx="350" cy="580" r="42"  fill="none" stroke={W}  strokeWidth="1" />
      <circle cx="350" cy="580" r="22"  fill="none" stroke={WD} strokeWidth="0.6" strokeDasharray="4 6" />
      <circle cx="900" cy="200" r="60"  fill="none" stroke={WD} strokeWidth="0.8" strokeDasharray="2 8" />
      <circle cx="70"  cy="200" r="30"  fill="none" stroke={W}  strokeWidth="0.8" />

      {/* White corner brackets — inner */}
      <path d="M 320 60 L 320 110 L 370 110" fill="none" stroke={W}  strokeWidth="1.2" strokeLinecap="square" />
      <path d="M 880 640 L 880 590 L 830 590" fill="none" stroke={WD} strokeWidth="1"   strokeLinecap="square" />

      {/* White cross markers */}
      {[
        [520, 180],[700,520],[140,420],[1050,280],[820,80],[440,480],
      ].map(([x,y],i) => (
        <g key={'w'+i}>
          <line x1={x-6} y1={y}   x2={x+6} y2={y}   stroke={W} strokeWidth="0.8" />
          <line x1={x}   y1={y-6} x2={x}   y2={y+6} stroke={W} strokeWidth="0.8" />
        </g>
      ))}

      {/* White arrows */}
      <g stroke={W} strokeWidth="1" fill="none" strokeLinecap="round">
        <line x1="200" y1="180" x2="200" y2="240" />
        <polyline points="192,228 200,240 208,228" />
      </g>
      <g stroke={WD} strokeWidth="1" fill="none" strokeLinecap="round">
        <line x1="960" y1="600" x2="1020" y2="560" />
        <polyline points="1008,554 1020,560 1014,572" />
      </g>

      {/* White dimension line — horizontal bottom */}
      <g stroke={WD} strokeWidth="0.7">
        <line x1="80" y1="670" x2="400" y2="670" />
        <line x1="80"  y1="664" x2="80"  y2="676" />
        <line x1="400" y1="664" x2="400" y2="676" />
      </g>

      {/* White dotted arc — right side */}
      <path d="M 1100 400 A 80 80 0 0 1 1180 480" fill="none" stroke={W} strokeWidth="0.8" strokeDasharray="3 6" />
    </svg>
  )
}

const SelectionBox = forwardRef(function SelectionBox(_, ref) {
  return (
    <div ref={ref} className="about-sel" aria-hidden="true">
      <div className="about-sel__fill" />
      {HANDLE_POS.map(p => <span key={p} className={`about-sel__h about-sel__h--${p}`} />)}
    </div>
  )
})

export default function About() {
  const sectionRef = useRef(null)
  const textRef    = useRef(null)
  const selRef     = useRef(null)
  const stampRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = textRef.current?.querySelectorAll('.about-title-line')
      if (!lines?.length) return

      gsap.fromTo(
        lines,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          stagger: 0.13,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 72%' },
        }
      )

      // Selection box: expands from top-left corner like a drag-select
      if (selRef.current) {
        const el = selRef.current
        const finalW = getComputedStyle(el).width
        const finalH = getComputedStyle(el).height
        gsap.fromTo(el,
          { width: 0, height: 0 },
          {
            width: finalW,
            height: finalH,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' },
          }
        )
      }

      // Stamp: drops in after selection animation finishes
      if (stampRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top 55%' },
          delay: 1.4,
        })
        tl.fromTo(stampRef.current,
          { y: -60, scale: 1.15, opacity: 0, rotate: -8 },
          { y: 0, scale: 1, opacity: 1, rotate: -8, duration: 0.22, ease: 'power4.in' }
        )
        .to(stampRef.current, { scaleX: 1.06, scaleY: 0.91, duration: 0.07, ease: 'power2.in' })
        .to(stampRef.current, { scaleX: 1, scaleY: 1, duration: 0.18, ease: 'elastic.out(1.2, 0.5)' })
      }

      gsap.fromTo(
        textRef.current?.querySelectorAll('.about-animate'),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 65%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="about-section" id="about">

      <AboutSVGBg />

      <div ref={textRef} className="about-body">
        <p className="about-eyebrow about-animate">About us</p>

        <h2 className="about-editorial-title">
          {TITLE_LINES.map((line, i) => (
            <span key={i} className={`about-title-line${i === 1 ? ' about-title-line--accent' : ''}`}>{line}</span>
          ))}
        </h2>
      </div>

      <SelectionBox ref={selRef} />

      <div ref={stampRef} className="about-stamp" aria-hidden="true">
        <StudioStamp />
      </div>

    </section>
  )
}
