import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const lerp = (a, b, t) => a + (b - a) * t

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [smoothProgress, setSmoothProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false)
  const [touchStartY, setTouchStartY] = useState(0)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  )

  const sectionRef     = useRef(null)
  const rawProgressRef = useRef(0)
  const rafRef         = useRef(null)

  // Pause / resume Lenis — desktop only
  useEffect(() => {
    if (isMobile) return
    window.dispatchEvent(new Event('sss:lenis-pause'))
    return () => window.dispatchEvent(new Event('sss:lenis-resume'))
  }, [isMobile])

  // Smooth lerp loop — desktop only
  useEffect(() => {
    if (isMobile) return
    let current = 0
    const tick = () => {
      current = lerp(current, rawProgressRef.current, 0.06)
      setSmoothProgress(current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isMobile])

  // Mobile: show content immediately
  useEffect(() => {
    if (!isMobile) return
    setShowContent(true)
    setMediaFullyExpanded(true)
  }, [isMobile])

  useEffect(() => {
    setScrollProgress(0)
    if (!isMobile) {
      setShowContent(false)
      setMediaFullyExpanded(false)
    }
  }, [mediaType])

  // Scroll / touch hijack — desktop only
  useEffect(() => {
    if (isMobile) return

    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        rawProgressRef.current = 0
        window.dispatchEvent(new Event('sss:lenis-pause'))
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const scrollDelta = e.deltaY * 0.0009
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1)
        rawProgressRef.current = newProgress
        setScrollProgress(newProgress)
        if (newProgress >= 1) {
          setMediaFullyExpanded(true)
          setShowContent(true)
          window.dispatchEvent(new Event('sss:lenis-resume'))
        } else if (newProgress < 0.75) {
          setShowContent(false)
        }
      }
    }

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY)
    }

    const handleTouchMove = (e) => {
      if (!touchStartY) return
      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false)
        rawProgressRef.current = 0
        window.dispatchEvent(new Event('sss:lenis-pause'))
        e.preventDefault()
      } else if (!mediaFullyExpanded) {
        e.preventDefault()
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005
        const scrollDelta = deltaY * scrollFactor
        const newProgress = Math.min(Math.max(scrollProgress + scrollDelta, 0), 1)
        rawProgressRef.current = newProgress
        setScrollProgress(newProgress)
        if (newProgress >= 1) {
          setMediaFullyExpanded(true)
          setShowContent(true)
          window.dispatchEvent(new Event('sss:lenis-resume'))
        } else if (newProgress < 0.75) {
          setShowContent(false)
        }
        setTouchStartY(touchY)
      }
    }

    const handleTouchEnd = () => setTouchStartY(0)

    if (!mediaFullyExpanded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      document.body.style.overflow = ''
    }
  }, [scrollProgress, mediaFullyExpanded, touchStartY, isMobile])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Desktop-only computed values
  const mediaWidth  = 300 + smoothProgress * 1250
  const mediaHeight = 400 + smoothProgress * 400

  const firstWord   = title ? title.split(' ')[0] : ''
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : ''

  return (
    <div ref={sectionRef} className="overflow-x-hidden">
      <section className={`relative flex flex-col items-center justify-start ${isMobile ? 'min-h-[65dvh]' : 'min-h-[100dvh]'}`}>
        <div className={`relative w-full flex flex-col items-center ${isMobile ? 'min-h-[65dvh]' : 'min-h-[100dvh]'}`}>

          {/* Background image — static on mobile */}
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt=""
              className={`w-screen object-cover object-center ${isMobile ? 'h-[65dvh]' : 'h-screen'}`}
              style={{ filter: 'brightness(1.35)' }}
            />
          </motion.div>

          <div className="mx-auto flex flex-col items-center justify-start relative z-10 w-full">
            <div className={`flex flex-col items-center justify-center w-full ${isMobile ? 'min-h-[65dvh]' : 'min-h-[100dvh]'} relative`}>

              {/* Expanding media — desktop only */}
              {!isMobile && (
                <div
                  className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden"
                  style={{
                    width: `${mediaWidth}px`,
                    height: `${mediaHeight}px`,
                    maxWidth: '95vw',
                    maxHeight: '85vh',
                    boxShadow: '0 8px 40px 8px rgba(0,0,0,0.7)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    transition: 'none',
                  }}
                >
                  {mediaType === 'video' ? (
                    <div className="relative w-full h-full pointer-events-none">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/30"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={mediaSrc}
                        alt={title || ''}
                        className="w-full h-full object-cover"
                        style={{ filter: 'brightness(1.35)' }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Title + date block */}
              <div className={`flex flex-col items-center relative z-10 w-full ${isMobile ? 'mt-20' : 'mt-40'}`} style={{ transition: 'none' }}>

                {/* Title */}
                <div className="flex items-center justify-center text-center gap-4 w-full flex-col">
                  <h1
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none"
                    style={{
                      transform: isMobile ? 'none' : `translateX(-${smoothProgress * 150}vw)`,
                      textShadow: '0 2px 24px rgba(0,0,0,0.7)',
                    }}
                  >
                    {firstWord}
                  </h1>
                  {isMobile && (
                    <img
                      src="/sss logo2.svg"
                      alt=""
                      style={{ width: '56px', height: '56px', objectFit: 'contain', flexShrink: 0, filter: 'brightness(0) invert(1)' }}
                    />
                  )}
                  <h1
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none"
                    style={{
                      transform: isMobile ? 'none' : `translateX(${smoothProgress * 150}vw)`,
                      textShadow: '0 2px 24px rgba(0,0,0,0.7)',
                    }}
                  >
                    {restOfTitle}
                  </h1>
                </div>

                {/* Date / scroll hint */}
                <div className="flex flex-col items-center text-center mt-20" style={{ transition: 'none' }}>
                  {date && (
                    <p
                      className="text-sm tracking-widest uppercase text-white font-light"
                      style={{
                        transform: isMobile ? 'none' : `translateX(-${smoothProgress * 150}vw)`,
                        textShadow: '0 2px 16px rgba(0,0,0,0.7)',
                      }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && !isMobile && (
                    <p
                      className="text-white text-sm font-medium text-center mt-1"
                      style={{ transform: `translateX(${smoothProgress * 150}vw)`, textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* Children revealed after full expansion */}
            <motion.div
              className="w-full"
              style={{ pointerEvents: showContent ? 'auto' : 'none' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 24 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default ScrollExpandMedia
