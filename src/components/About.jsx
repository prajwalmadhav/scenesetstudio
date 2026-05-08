import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


const TITLE_LINES = ['We build', 'brands', 'that people', 'remember.', 'stories that last.']

function AboutSVGBg() {
  return (
    <svg
      className="about-svg-bg"
      aria-hidden="true"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="600" cy="350" r="290" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <circle cx="600" cy="350" r="190" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.75" strokeDasharray="5 12" />
      <line x1="588" y1="350" x2="612" y2="350" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="600" y1="338" x2="600" y2="362" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <circle cx="600" cy="350" r="2.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {[
        [160, 140], [1000, 180], [130, 530], [1060, 490],
        [380, 82],  [840, 610],  [290, 390], [910, 120],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1={x-5} y1={y}   x2={x+5} y2={y}   stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1={x}   y1={y-5} x2={x}   y2={y+5} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </g>
      ))}
      <path d="M 970 72 A 110 110 0 0 1 1098 170" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
    </svg>
  )
}

const HANDLE_POS = ['tl','tm','tr','mr','br','bm','bl','ml']

function SelectionBox() {
  return (
    <div className="about-sel" aria-hidden="true">
      {HANDLE_POS.map(p => <span key={p} className={`about-sel__h about-sel__h--${p}`} />)}
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const textRef    = useRef(null)

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
      <SelectionBox />

      <div ref={textRef} className="about-body">
        <p className="about-eyebrow about-animate">About us</p>

        <h2 className="about-editorial-title">
          {TITLE_LINES.map((line, i) => (
            <span key={i} className={`about-title-line${i === 1 ? ' about-title-line--accent' : ''}`}>{line}</span>
          ))}
        </h2>
      </div>


    </section>
  )
}
