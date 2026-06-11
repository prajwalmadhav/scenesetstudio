import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/SEO'
import TrustedPartners from '../components/TrustedPartners'
import tierxImg        from '../assets/work/case-studies/tierx-dcs.webp'
import fawillBikeImg   from '../assets/work/case-studies/fawill-bike-pub.webp'
import fawillCleanImg  from '../assets/work/case-studies/fawill-cleaning.webp'
import sceneSetImg     from '../assets/work/case-studies/scene-set-studio.webp'

gsap.registerPlugin(ScrollTrigger)

const CASES = [
  {
    slug: 'tierx-dcs',
    name: 'TierX DCS',
    category: 'Brand Identity / Web Design',
    year: '2025',
    img: tierxImg,
    logo: '/assets/images/tierx%20logo.webp',
    imgPosition: 'center top',
  },
  {
    slug: 'sceneset-branding',
    name: 'Scene Set Studio',
    category: 'Brand Identity / Design',
    year: '2024',
    img: sceneSetImg,
    logo: '/sss-logo2.svg',
  },
  {
    slug: 'fawill-bike-pub',
    name: 'Fawill Bike & Pub',
    category: 'Brand Identity / Web / Social',
    year: '2024',
    img: fawillBikeImg,
    logo: '/assets/images/bikepub%20logo.webp',
  },
  {
    slug: 'fawill-cleaning',
    name: 'Fawill Cleaning Company',
    category: 'Brand Strategy / Content',
    year: '2024',
    img: fawillCleanImg,
    logo: '/assets/images/fawill%20logo.webp',
  },
]

export default function Work() {
  const listRef = useRef(null)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [activeIdx, setActiveIdx] = useState(-1)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Mobile: highlight the item whose centre is closest to viewport centre
  useEffect(() => {
    if (!isMobile || !listRef.current) return

    const items = listRef.current.querySelectorAll('.work-list-item')

    const handleScroll = () => {
      const mid = window.innerHeight / 2
      let best = -1, bestDist = Infinity
      items.forEach((el, i) => {
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - mid)
        if (dist < bestDist) { bestDist = dist; best = i }
      })
      setActiveIdx(best)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  useEffect(() => {
    if (!listRef.current) return

    const ctx = gsap.context(() => {
      listRef.current.querySelectorAll('.work-list-item').forEach(item => {
        const dot = item.querySelector('.wl-dot')
        const ring = item.querySelector('.wl-ring')
        const line = item.querySelector('.wl-line')

        gsap.set(dot, { scale: 0 })
        gsap.set(ring, { scale: 0, opacity: 0 })
        gsap.set(line, { scaleY: 0, transformOrigin: 'top center' })

        gsap.timeline({
          scrollTrigger: { trigger: item, start: 'top 85%', once: true },
        })
          .to(dot, { scale: 1, duration: 0.45, ease: 'back.out(2.5)' }, 0)
          .to(ring, { scale: 2.6, opacity: 0, duration: 0.7, ease: 'power2.out' }, 0.1)
          .to(line, { scaleY: 1, backgroundColor: '#D4001E', duration: 0.85, ease: 'power3.out' }, 0.12)
          .to(line, { backgroundColor: 'rgba(242,240,235,0.09)', duration: 1.1, ease: 'power2.out' }, 0.72)
      })
    }, listRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <SEO
        title="Selected Work | Scene Set Studio"
        description="Case studies from Scene Set Studio — brand strategy, content production, paid advertising, and brand identity."
      />

      <div className="work-page">

        <h1 className="work-page-headline">
          Every project<br />is a story<br />worth telling.
        </h1>

        <div className="work-why">
          <span className="work-why__eyebrow">Why work with us</span>
          <div className="work-why__grid">
            {[
              { num: '01', title: 'Strategy first', body: 'Every project starts with positioning, not pixels. We solve the business problem before we open a design tool.' },
              { num: '02', title: 'Cinematic standard', body: 'High-end visuals, motion, and brand identity that look like they belong to a company ten times your size.' },
              { num: '03', title: 'One team, full delivery', body: 'Brand, web, content, and ads — all under one roof. No handoffs. No gaps. No excuses.' },
            ].map(item => (
              <div key={item.num} className="work-why__item">
                <span className="work-why__num">{item.num}</span>
                <h3 className="work-why__title">{item.title}</h3>
                <p className="work-why__body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="work-list" ref={listRef}>
          {CASES.map((c, i) => (
            <Link
              key={c.slug}
              to={`/work/${c.slug}`}
              className={`work-list-item${isMobile && i === activeIdx ? ' is-active' : ''}`}
            >
              {/* Timeline track */}
              <div className="wl-track">
                <div className="wl-dot-wrap">
                  <div className="wl-ring" />
                  <div className="wl-dot" />
                </div>
                <div className="wl-line" />
              </div>

              <span className="work-list-item__num">0{i + 1}</span>

              <div className="work-list-item__img">
                <img
                  src={c.img}
                  alt={c.name}
                  className="work-list-item__photo"
                  style={c.imgPosition ? { objectPosition: c.imgPosition } : undefined}
                />
                {c.logo && (
                  <img
                    src={c.logo}
                    alt=""
                    aria-hidden="true"
                    className="work-list-item__logo"
                  />
                )}
              </div>

              <div className="work-list-item__meta">
                <div>
                  <p className="work-list-item__cat">{c.category}</p>
                  <h2 className="work-list-item__name">{c.name}</h2>
                </div>
                <div className="work-list-item__right">
                  <span className="work-list-item__arrow">View case study &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      <TrustedPartners />
    </>
  )
}
