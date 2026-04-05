import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import SEO from '../components/SEO'

const SERVICES = [
  {
    index: '01',
    label: 'Brand Strategy',
    bg: 'BRAND',
    tagline: 'Identity that commands attention.',
    description:
      'We build the strategic foundation your brand stands on — from positioning and messaging to visual language that makes you unmistakable in any market.',
    deliverables: ['Brand Positioning', 'Messaging Framework', 'Visual Identity', 'Brand Guidelines', 'Competitive Analysis'],
  },
  {
    index: '02',
    label: 'Content Production',
    bg: 'CONTENT',
    tagline: 'Stories that stop the scroll.',
    description:
      'From concept to final cut, we produce high-impact content built for the platforms your audience lives on — crafted to convert, not just impress.',
    deliverables: ['Campaign Concepts', 'Copywriting', 'Photography Direction', 'Short-Form Content', 'Content Calendar'],
  },
  {
    index: '03',
    label: 'Paid Advertising',
    bg: 'PAID',
    tagline: 'Every rupee working harder.',
    description:
      'Data-driven ad campaigns across Meta, Google, and beyond. We build, test, and scale paid systems that consistently beat your cost-per-acquisition targets.',
    deliverables: ['Media Buying', 'Ad Creative', 'Audience Strategy', 'A/B Testing', 'Performance Reporting'],
  },
  {
    index: '04',
    label: 'Social Media',
    bg: 'SOCIAL',
    tagline: 'Presence that builds equity.',
    description:
      'We manage your social presence end-to-end — turning followers into fans and platforms into revenue channels through consistent, on-brand storytelling.',
    deliverables: ['Channel Strategy', 'Content Creation', 'Community Management', 'Influencer Partnerships', 'Monthly Analytics'],
  },
  {
    index: '05',
    label: 'Web Design',
    bg: 'WEB',
    tagline: 'Interfaces that earn trust.',
    description:
      "Conversion-focused web experiences designed and developed to match your brand's ambition — fast, beautiful, and built to perform.",
    deliverables: ['UX Strategy', 'UI Design', 'Framer / Webflow Dev', 'Motion Design', 'CRO Optimisation'],
  },
  {
    index: '06',
    label: 'Video Production',
    bg: 'VIDEO',
    tagline: 'Cinematic. Commercial. Compelling.',
    description:
      'Full-service video production from pre-production through final delivery — brand films, reels, product videos and everything in between.',
    deliverables: ['Concept Development', 'Scripting & Storyboard', 'On-Location Shoot', 'Edit & Colour Grade', 'Motion Graphics'],
  },
]

export default function Services() {
  const [active, setActive] = useState(0)
  const contentRef = useRef(null)
  const bgTextRef  = useRef(null)
  const sectionRef = useRef(null)

  const goTo = (index) => {
    if (index === active) return
    setActive(index)
  }

  useEffect(() => {
    if (!contentRef.current) return
    gsap.fromTo(
      contentRef.current.querySelectorAll('.svc-animate'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.55, ease: 'power3.out' }
    )
  }, [active])

  useEffect(() => {
    if (!bgTextRef.current) return
    gsap.fromTo(
      bgTextRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
    )
  }, [active])

  const svc = SERVICES[active]

  return (
    <>
      <SEO
        title="Services | Scene Set Studio"
        description="Brand strategy, content production, paid advertising, social media, web design, and video production — Scene Set Studio."
      />

      <div style={{ paddingTop: '80px' }}>
        <section ref={sectionRef} className="svc-section" id="services">

          {/* ── Decorative background text ── */}
          <div className="svc-bg-text-wrap">
            <span ref={bgTextRef} className="svc-bg-text svc-bg-text--h">
              {svc.bg}
            </span>
            <span className="svc-bg-text svc-bg-text--v">
              SERVICES
            </span>
          </div>

          {/* ── Top label row ── */}
          <div className="svc-top-row">
            <span className="svc-eyebrow">What we do</span>
            <span className="svc-counter">{svc.index} <span>/</span> 06</span>
          </div>

          {/* ── Main content ── */}
          <div ref={contentRef} className="svc-body">
            <div className="svc-left">
              <div className="svc-left-vertical">
                <span className="svc-vertical-label svc-animate">{svc.label}</span>
                <span className="svc-vertical-line" />
              </div>
              <div className="svc-left-content">
                <p className="svc-index svc-animate">{svc.index}</p>
                <h2 className="svc-title svc-animate">{svc.label}</h2>
                <p className="svc-tagline svc-animate">{svc.tagline}</p>
                <p className="svc-desc svc-animate">{svc.description}</p>
              </div>
            </div>

            <div className="svc-right">
              <p className="svc-deliverables-label svc-animate">Deliverables</p>
              <ul className="svc-deliverables">
                {svc.deliverables.map((d, i) => (
                  <li key={d} className="svc-deliverable svc-animate" style={{ transitionDelay: `${i * 0.04}s` }}>
                    <span className="svc-deliverable__dot" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Navigation ── */}
          <nav className="svc-nav">
            {SERVICES.map((s, i) => (
              <button
                key={s.index}
                className={`svc-nav-btn${i === active ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={s.label}
              >
                <span className="svc-nav-btn__num">{s.index}</span>
                <span className="svc-nav-btn__label">{s.label}</span>
                <span className="svc-nav-btn__line" />
              </button>
            ))}
          </nav>

        </section>
      </div>
    </>
  )
}
