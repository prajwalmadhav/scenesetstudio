import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line 1 slides in from left
      gsap.fromTo('.cta-line--left',
        { x: -120, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
      // Line 2 slides in from right
      gsap.fromTo('.cta-line--right',
        { x: 120, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.1, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
      // Button fades up
      gsap.fromTo('.cta-action',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="cta-section">

      <div className="cta-text">
        <div className="cta-line cta-line--left">Let's build something</div>
        <div className="cta-line cta-line--right cta-line--accent">extraordinary.</div>
      </div>

      <div className="cta-action">
        <button className="cta-btn">
          <span>Start Your Project</span>
          <span className="cta-btn__arrow">→</span>
        </button>
        <p className="cta-sub">Free discovery call · No commitment</p>
      </div>

    </section>
  )
}
