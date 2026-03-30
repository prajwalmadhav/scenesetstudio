import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BASE_ITEMS = [
  'Brand Strategy', '✦', 'Content Production', '✦',
  'Paid Advertising', '✦', 'Social Media', '✦',
  'Web Design', '✦', 'Video Production', '✦',
]

// Doubled for seamless CSS marquee loop — static, defined once outside component
const STRIP_ITEMS = [...BASE_ITEMS, ...BASE_ITEMS]

function MarqueeStrip({ reverse }) {
  return (
    <div className="about-strip">
      <div className={`about-strip__track${reverse ? ' about-strip__track--reverse' : ''}`}>
        {STRIP_ITEMS.map((item, i) => (
          <span key={`${item}-${i}`} className="about-strip__item">{item}</span>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = textRef.current?.querySelectorAll('.about-animate')
      if (!targets?.length) return
      gsap.fromTo(
        targets,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="about-section" id="about">

      <MarqueeStrip reverse={false} />

      <div ref={textRef} className="about-body">
        <p className="about-eyebrow about-animate">About us</p>
        <h2 className="about-headline">
          <span className="about-animate">We build brands</span>
          <br />
          <span className="about-animate about-headline--light">people remember.</span>
        </h2>
        <p className="about-sub about-animate">
          From strategy to screen — we craft campaigns that move people.
        </p>
      </div>

    </section>
  )
}
