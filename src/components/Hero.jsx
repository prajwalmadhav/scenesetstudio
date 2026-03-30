import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LiquidBackground from './LiquidBackground'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const badgeRef = useRef(null)
  const headlineRef = useRef(null)
  const subtextRef = useRef(null)
  const buttonsRef = useRef(null)
  const visualWrapperRef = useRef(null)
  const visualRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance animations ──
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })

      tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.2)

      const words = headlineRef.current.querySelectorAll('.hero-word')
      tl.fromTo(words, { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.08 }, 0.4)

      tl.fromTo(subtextRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.7)

      const btns = buttonsRef.current.querySelectorAll('button')
      tl.fromTo(btns, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1 }, 0.8)

      tl.fromTo(visualWrapperRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 1.0)

      // ── Scroll zoom — pin hero, expand image to fullscreen ──
      gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      })
      .to(visualWrapperRef.current, {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        yPercent: 0,
        borderRadius: 0,
        padding: 0,
        ease: 'none',
      }, 0)
      .to(visualRef.current, {
        height: '100vh',
        borderRadius: 0,
        ease: 'none',
      }, 0)
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero-section">
      <LiquidBackground
        color1="#050505"
        color2="#C42087"
        color3="#050505"
        speed={0.039}
        scale={0.48}
        swirl={1.3}
        distortion={0.08}
        swirlIterations={5}
        proportion={0.33}
        softness={1.0}
        shapeSize={0.48}
        shape={2}
        rotation={0}
      />

      {/* Text + CTA */}
      <div className="hero-content">
        <div ref={badgeRef} className="hero-badge" style={{ opacity: 0 }}>
          <span className="hero-badge__dot" />
          <span className="hero-badge__text">Now accepting new clients</span>
        </div>

        <h1 ref={headlineRef} className="hero-headline">
          <span className="hero-word">Marketing</span>{' '}
          <span className="hero-word">that</span>
          <br />
          <span className="hero-word hero-word--italic">actually</span>{' '}
          <span className="hero-word">works.</span>
        </h1>

        <p ref={subtextRef} className="hero-subtext" style={{ opacity: 0 }}>
          Cinematic storytelling meets performance marketing.
          <br />
          We build brands that convert.
        </p>

        <div ref={buttonsRef} className="hero-buttons">
          <button className="hero-btn hero-btn--primary" style={{ opacity: 0 }}>
            Start Your Project →
          </button>
          <button className="hero-btn hero-btn--ghost" style={{ opacity: 0 }}>
            See Our Work
          </button>
        </div>
      </div>

      {/* Visual — peeks 30px below buttons, zooms to fullscreen on scroll */}
      <div ref={visualWrapperRef} className="hero-visual-wrapper" style={{ opacity: 0 }}>
        <div ref={visualRef} className="hero-visual">
          <img src="/assets/images/trialimg1.png" alt="Visual" className="hero-visual__img" />
        </div>
      </div>
    </section>
  )
}
