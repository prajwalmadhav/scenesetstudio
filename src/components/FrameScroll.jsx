import { useEffect, useRef, useState } from 'react'

const VIDEO_SRC = `${import.meta.env.BASE_URL}video/ourwork.mp4`
const LERP_FACTOR = 0.07
const MOBILE_BREAKPOINT = 640

export default function FrameScroll() {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const videoRef = useRef(null)
  const targetRef = useRef(0)   // raw scroll-mapped time
  const currentRef = useRef(0)   // lerped time actually applied
  const rafRef = useRef(null)
  const [hideIndicator, setHideIndicator] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BREAKPOINT)

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    }

    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    const sticky = stickyRef.current
    if (!video || !container || !sticky) return

    // ── Scroll → update target time ──────────────────────────────────────
    function onScroll() {
      if (!video.duration) return
      const rect = container.getBoundingClientRect()
      const total = container.offsetHeight - sticky.offsetHeight
      if (total <= 0) return
      const progress = Math.max(0, Math.min(1, -rect.top / total))
      targetRef.current = progress * video.duration
      if (progress > 0.02) setHideIndicator(true)
    }

    // ── RAF loop — lerps currentTime toward target ────────────────────────
    function loop() {
      const diff = targetRef.current - currentRef.current
      if (Math.abs(diff) > 0.001) {
        currentRef.current += diff * LERP_FACTOR
        video.currentTime = currentRef.current
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    // ── Prime video so seeking is unlocked ────────────────────────────────
    const prime = () => {
      video.play()
        .catch(() => { })
        .finally(() => {
          video.pause()
          video.currentTime = 0.001
          currentRef.current = 0.001
        })
    }

    if (video.readyState >= 1) prime()
    else video.addEventListener('loadedmetadata', prime, { once: true })

    rafRef.current = requestAnimationFrame(loop)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
    }
  }, [isMobile])

  const sectionHeight = isMobile ? '160dvh' : '180dvh'
  const stickyTop = isMobile ? '6dvh' : 0
  const stickyHeight = isMobile ? '88dvh' : '100dvh'

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: sectionHeight }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: stickyTop,
          width: '100%',
          height: stickyHeight,
          overflow: 'hidden',
          background: '#E8E6E1',
          borderRadius: isMobile ? '20px' : 0,
          margin: isMobile ? '0 10px' : 0,
        }}
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          preload="auto"
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: isMobile ? '140%' : '100%',
            height: isMobile ? '140%' : '100%',
            left: isMobile ? '-20%' : 0,
            top: isMobile ? '-20%' : 0,
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Background brand text — sits over video via blend mode */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 1,
            mixBlendMode: 'multiply',
          }}
        >
          {['SCENE', 'SET', 'STUDIO'].map((word) => (
            <span
              key={word}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                fontSize: isMobile ? 'clamp(54px, 13vw, 92px)' : 'clamp(80px, 14vw, 180px)',
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                color: 'transparent',
                WebkitTextStroke: '2px rgba(0,0,0,0.25)',
                lineHeight: 0.9,
                userSelect: 'none',
              }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '20px' : '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(0,0,0,0.35)',
            fontSize: isMobile ? '11px' : '12px',
            letterSpacing: '0.14em',
            fontFamily: 'monospace',
            opacity: hideIndicator ? 0 : 1,
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 2,
          }}
        >
          scroll to explore ↓
        </div>
      </div>
    </div>
  )
}
