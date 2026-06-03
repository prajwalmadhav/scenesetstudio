import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// 4 quadrants — TL → BL → BR → TR
const QUADS = [
  { clip: 'inset(0 50% 50% 0)',    origin: '100% 100%' }, // top-left
  { clip: 'inset(50% 50% 0 0)',    origin: '100% 0%'   }, // bottom-left
  { clip: 'inset(50% 0 0 50%)',    origin: '0% 0%'     }, // bottom-right
  { clip: 'inset(0 0 50% 50%)',    origin: '0% 100%'   }, // top-right
]

export default function Preloader({ onDone }) {
  const rootRef  = useRef(null)
  const quadRefs = useRef([])
  const textRef  = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    gsap.set(quadRefs.current, { scale: 0, opacity: 0 })
    gsap.set(textRef.current,  { opacity: 0, y: 24 })

    const tl = gsap.timeline({
      delay: 0,
      onComplete: () => {
        document.body.style.overflow = ''
        onDone?.()
      },
    })

    // 1. Each quadrant pops in one by one, circular order
    tl.to(quadRefs.current, {
      scale: 1,
      opacity: 1,
      duration: 0.55,
      ease: 'back.out(1.4)',
      stagger: 0.28,
    })

    // 2. Wordmark slides up immediately after logo
    .fromTo(textRef.current,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    )

    // 3. Page swipes up 0.2s after font lands
    .to(rootRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power3.inOut',
    }, '+=0.2')

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div ref={rootRef} className="preloader" aria-hidden="true">
      <div className="preloader__inner">

        {/* Logo split into 4 quadrants */}
        <div className="preloader__logo-wrap">
          {QUADS.map((q, i) => (
            <div
              key={i}
              ref={el => quadRefs.current[i] = el}
              className="preloader__quad"
              style={{
                clipPath: q.clip,
                transformOrigin: q.origin,
                opacity: 0,
              }}
            >
              <img src="/sss-logo2.svg" alt="" draggable="false" className="preloader__logo-img" />
            </div>
          ))}
        </div>

        {/* Wordmark */}
        <div ref={textRef} className="preloader__wordmark" style={{ opacity: 0, transform: 'translateY(24px)' }}>
          <span className="preloader__name">SceneSet</span>
          <strong className="preloader__name preloader__name--bold">Studio</strong>
        </div>

      </div>
    </div>
  )
}
