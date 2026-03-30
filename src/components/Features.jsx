import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    id: 'brand-strategy',
    type: 'img',
    num: '01',
    label: 'Brand Strategy',
    tagline: 'Identity that commands attention.',
    width: 320,
    height: 480,
    yOffset: 0,
  },
  {
    id: 'content-production',
    type: 'text',
    num: '02',
    label: 'Content Production',
    tagline: 'Stories that stop the scroll.',
    width: 380,
    height: 420,
    yOffset: 60,
  },
  {
    id: 'paid-advertising',
    type: 'img',
    num: '03',
    label: 'Paid Advertising',
    tagline: 'Every rupee working harder.',
    width: 280,
    height: 400,
    yOffset: -40,
  },
  {
    id: 'social-media',
    type: 'quote',
    num: '04',
    label: 'Social Media',
    tagline: '"Presence that builds equity — followers become fans, platforms become revenue."',
    width: 360,
    height: 440,
    yOffset: 80,
  },
  {
    id: 'web-design',
    type: 'img',
    num: '05',
    label: 'Web Design',
    tagline: 'Interfaces that earn trust.',
    width: 300,
    height: 460,
    yOffset: 20,
  },
  {
    id: 'video-production',
    type: 'text',
    num: '06',
    label: 'Video Production',
    tagline: 'Cinematic. Commercial. Compelling.',
    width: 340,
    height: 400,
    yOffset: -20,
  },
]

export default function Features() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const section = sectionRef.current

      const getScrollAmount = () =>
        track.scrollWidth - window.innerWidth + 200

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(track, {
            x: -(self.progress * getScrollAmount()),
          })

          // Individual card parallax — each card moves at a slightly different rate
          cardRefs.current.forEach((card, i) => {
            if (!card) return
            const offset = (i % 3 === 0 ? 0.04 : i % 3 === 1 ? -0.03 : 0.02)
            gsap.set(card, {
              x: -(self.progress * getScrollAmount() * offset),
            })
          })
        },
      })

      // Text reveal per card
      cardRefs.current.forEach((card) => {
        if (!card) return
        const targets = card.querySelectorAll('.feat-animate')
        if (!targets.length) return
        gsap.fromTo(
          targets,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.07,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: st,
              start: 'left 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="feat-section" id="features">

      {/* Header row */}
      <div className="feat-header">
        <span className="feat-eyebrow">Our Services</span>
        <span className="feat-drag-hint">
          <span className="feat-drag-hint__icon">↔</span>
          Scroll to explore
        </span>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="feat-track">
        {CARDS.map((card, i) => {
          const style = {
            width: card.width,
            height: card.height,
            marginTop: card.yOffset,
          }

          if (card.type === 'img') {
            return (
              <div
                key={card.id}
                ref={(el) => (cardRefs.current[i] = el)}
                className="feat-card feat-card--img"
                style={style}
              >
                <img
                  src="/assets/images/trialimg1.png"
                  alt={card.label}
                  className="feat-card__img"
                />
                <div className="feat-card__overlay">
                  <span className="feat-card__num feat-animate">{card.num}</span>
                  <span className="feat-card__label feat-animate">{card.label}</span>
                </div>
              </div>
            )
          }

          if (card.type === 'quote') {
            return (
              <div
                key={card.id}
                ref={(el) => (cardRefs.current[i] = el)}
                className="feat-card feat-card--quote"
                style={style}
              >
                <span className="feat-card__num feat-animate">{card.num}</span>
                <p className="feat-card__quote-mark feat-animate">"</p>
                <p className="feat-card__quote-text feat-animate">{card.tagline}</p>
                <span className="feat-card__label feat-animate">{card.label}</span>
              </div>
            )
          }

          // text card
          return (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className="feat-card feat-card--text"
              style={style}
            >
              <span className="feat-card__big-num feat-animate">{card.num}</span>
              <div className="feat-card__text-body">
                <h3 className="feat-card__service-name feat-animate">{card.label}</h3>
                <p className="feat-card__tagline feat-animate">{card.tagline}</p>
              </div>
              <div className="feat-card__accent-line" />
            </div>
          )
        })}
      </div>

    </section>
  )
}
