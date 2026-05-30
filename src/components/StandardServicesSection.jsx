import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import brandDesignArt from '../assets/standard-services/brand-design.jpg'
import socialMediaArt from '../assets/standard-services/social-media.jpg'
import metaAdvertisingArt from '../assets/standard-services/meta-advertising.jpg'
import videoProductionArt from '../assets/standard-services/video-production.jpg'
import webDesignArt from '../assets/standard-services/web-design.jpg'
import contentProductionArt from '../assets/standard-services/content-production.jpg'
gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    index: '01', label: 'Brand Design', bg: 'BRAND',
    tagline: 'Identity that commands attention.',
    description: 'We build the strategic foundation your brand stands on — from positioning and messaging to visual language that makes you unmistakable in any market.',
    deliverables: ['Brand Positioning', 'Messaging Framework', 'Visual Identity', 'Brand Guidelines', 'Competitive Analysis'],
    frame: '#7A1515', corner: '#3D0808', img: '#4A0D0D', art: brandDesignArt,
  },
  {
    index: '02', label: 'Social Media', bg: 'SOCIAL',
    tagline: 'Presence that builds equity.',
    description: 'We manage your social presence end-to-end — turning followers into fans and platforms into revenue channels through consistent, on-brand storytelling.',
    deliverables: ['Channel Strategy', 'Content Creation', 'Community Management', 'Influencer Partnerships', 'Monthly Analytics'],
    frame: '#601080', corner: '#350848', img: '#480C60', art: socialMediaArt,
  },
  {
    index: '03', label: 'Meta Advertising', bg: 'META',
    tagline: 'Every dollar working harder.',
    description: 'Data-driven ad campaigns across Meta, Google, and beyond. We build, test, and scale paid systems that consistently beat your cost-per-acquisition targets.',
    deliverables: ['Media Buying', 'Ad Creative', 'Audience Strategy', 'A/B Testing', 'Performance Reporting'],
    frame: '#10285A', corner: '#071540', img: '#0D1E48', art: metaAdvertisingArt,
  },
  {
    index: '04', label: 'Video Production', bg: 'VIDEO',
    tagline: 'Cinematic. Commercial. Compelling.',
    description: 'Full-service video production from pre-production through final delivery — brand films, reels, product videos and everything in between.',
    deliverables: ['Concept Development', 'Scripting & Storyboard', 'On-Location Shoot', 'Edit & Colour Grade', 'Motion Graphics'],
    frame: '#6A2808', corner: '#3A1404', img: '#501E06', art: videoProductionArt,
  },
  {
    index: '05', label: 'Web Design', bg: 'WEB',
    tagline: 'Interfaces that earn trust.',
    description: "Conversion-focused web experiences designed and developed to match your brand's ambition — fast, beautiful, and built to perform.",
    deliverables: ['UX Strategy', 'UI Design', 'Framer / Webflow Dev', 'Motion Design', 'CRO Optimisation'],
    frame: '#0A6040', corner: '#053828', img: '#084830', art: webDesignArt,
  },
  {
    index: '06', label: 'Content Production', bg: 'CONTENT',
    tagline: 'Stories that stop the scroll.',
    description: 'From concept to final cut, we produce high-impact content built for the platforms your audience lives on — crafted to convert, not just impress.',
    deliverables: ['Campaign Concepts', 'Copywriting', 'Photography Direction', 'Short-Form Content', 'Content Calendar'],
    frame: '#6B5010', corner: '#3A2C08', img: '#4A3810', art: contentProductionArt,
  },
]

export { SERVICES }

export default function StandardServicesSection({ paddingTop = '0px', showBg = true }) {
  const [active, setActive] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(0)
  const cardRef         = useRef(null)
  const deliverablesRef = useRef(null)
  const sectionRef      = useRef(null)
  const pausedRef       = useRef(false)
  const activeRef       = useRef(0)

  const goTo = (i) => { if (i !== activeRef.current) { activeRef.current = i; setActive(i) } }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pausedRef.current) {
        const next = (activeRef.current + 1) % SERVICES.length
        activeRef.current = next
        setActive(next)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Scroll-triggered entrance — slides up and fades in
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    )
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  useEffect(() => {
    const targets = [cardRef.current, deliverablesRef.current].filter(Boolean)
    gsap.killTweensOf(targets)
    gsap.fromTo(targets,
      { opacity: 0, scale: 0.94, z: -60 },
      { opacity: 1, scale: 1,    z: 0, duration: 0.55, ease: 'power3.out', stagger: 0.07, force3D: true }
    )
  }, [active])

  const svc = SERVICES[active]

  return (
    <div
      ref={sectionRef}
      id="standard-services"
      style={{
        position: 'relative',
        zIndex: 4,
        background: 'transparent',
        display: 'flex',
        justifyContent: 'flex-start',
        paddingTop,
        paddingBottom: '80px',
        paddingLeft: '200px',
      }}
    >

      {/* Background watermarks — standalone /standard-services page only */}
      {showBg && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <span style={{
            position: 'absolute',
            top: '-0.1em',
            left: '-0.02em',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(160px, 24vw, 300px)',
            letterSpacing: '-0.03em',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255,255,255,0.18)',
            whiteSpace: 'nowrap',
            lineHeight: 1,
            userSelect: 'none',
          }}>BRAND</span>
          <span style={{
            position: 'absolute',
            right: '2.5%',
            top: '40%',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(48px, 6vw, 80px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.18)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            letterSpacing: '0.08em',
            userSelect: 'none',
          }}>IDENTITY</span>
        </div>
      )}

      {/* Right-aligned content — as far right as the padding allows */}
      <div className="svc-desktop-content" style={{
        position: 'relative',
        zIndex: 1,
        width: '65vw',
        minWidth: '600px',
        perspective: '1200px',
        perspectiveOrigin: '50% 40%',
        transformStyle: 'preserve-3d',
      }}>

        <div className="svc-top-row">
          <span className="svc-eyebrow">Standard Packages</span>
          <span className="svc-counter">{svc.index} <span>/</span> 06</span>
        </div>

        <div className="svc-body svc-body--std">

          {/* Tab nav */}
          <nav
            className="svc-nav svc-nav--top"
            onMouseEnter={() => { pausedRef.current = true }}
            onMouseLeave={() => { pausedRef.current = false }}
          >
            {SERVICES.map((s, i) => (
              <button
                key={s.index}
                className={`svc-nav-btn${i === active ? ' is-active' : ''}`}
                onMouseEnter={() => goTo(i)}
                onClick={() => goTo(i)}
                aria-label={s.label}
              >
                <span className="svc-nav-btn__num">{s.index}</span>
                <span className="svc-nav-btn__label">{s.label}</span>
                <span className="svc-nav-btn__line" />
              </button>
            ))}
          </nav>

          {/* Card */}
          <div
            ref={cardRef}
            className="svc-left svc-left--sq"
            style={{ '--fc': svc.frame, '--fco': svc.corner, '--fi': svc.img }}
          >
            <div className="svc-img-placeholder">
              {svc.art && <img src={svc.art} alt="" className="svc-img-art" draggable="false" />}
              {!svc.art && <span className="svc-img-bg-label">{svc.bg}</span>}
            </div>
            <div className="svc-img-overlay">
              <p className="svc-index">{svc.index}</p>
              <h2 className="svc-title">{svc.label}</h2>
              <p className="svc-tagline">{svc.tagline}</p>
              <p className="svc-desc">{svc.description}</p>
            </div>
          </div>

          {/* Deliverables */}
          <div ref={deliverablesRef} className="svc-right">
            <p className="svc-deliverables-label">Deliverables</p>
            <ul className="svc-deliverables">
              {svc.deliverables.map((d) => (
                <li key={d} className="svc-deliverable">
                  <span className="svc-deliverable__dot" />{d}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Mobile accordion — hidden on desktop */}
      <div className="svc-mobile-list">
        <div className="svc-top-row">
          <span className="svc-eyebrow">Standard Packages</span>
        </div>
        {SERVICES.map((s, i) => (
          <div key={s.index} className={`svc-mobile-item${mobileOpen === i ? ' is-open' : ''}`}>
            <button
              className="svc-mobile-btn"
              onClick={() => setMobileOpen(mobileOpen === i ? null : i)}
            >
              <span className="svc-mobile-btn__num">{s.index}</span>
              <span className="svc-mobile-btn__label">{s.label}</span>
              <span className="svc-mobile-btn__chevron">{mobileOpen === i ? '−' : '+'}</span>
            </button>
            {mobileOpen === i && (
              <div className="svc-mobile-body">
                <img src={s.art} alt={s.label} className="svc-mobile-img" />
                <div className="svc-mobile-overlay">
                  <p className="svc-mobile-tagline">{s.tagline}</p>
                  <ul className="svc-deliverables">
                    {s.deliverables.map((d) => (
                      <li key={d} className="svc-deliverable">
                        <span className="svc-deliverable__dot" />{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}
