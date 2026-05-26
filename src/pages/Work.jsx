import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SEO from '../components/SEO'
import sceneSetImg from '../assets/about/scene-set-brand-package.jpg'

gsap.registerPlugin(ScrollTrigger)

const CASES = [
  {
    slug: 'tierx-dcs',
    name: 'TierX DCS',
    category: 'Content Production / Ads',
    year: '2025',
    seed: 'sss-tx1-case',
  },
  {
    slug: 'sceneset-branding',
    name: 'Scene Set Studio',
    category: 'Brand Identity / Design',
    year: '2024',
    img: sceneSetImg,
  },
  {
    slug: 'fawill-bike-pub',
    name: 'Fawill Bike & Pub',
    category: 'Paid Advertising / Social',
    year: '2024',
    seed: 'sss-fw2-case',
  },
  {
    slug: 'fawill-cleaning',
    name: 'Fawill Cleaning Company',
    category: 'Brand Strategy / Content',
    year: '2024',
    seed: 'sss-fw1-case',
  },
]

export default function Work() {
  const listRef = useRef(null)

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
          Every project is a<br />story worth telling.
        </h1>

        <div className="work-list" ref={listRef}>
          {CASES.map((c, i) => (
            <Link
              key={c.slug}
              to={`/work/${c.slug}`}
              className="work-list-item"
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
                  src={c.img ?? `https://picsum.photos/seed/${c.seed}/1200/675`}
                  alt={c.name}
                  className="work-list-item__photo"
                />
              </div>

              <div className="work-list-item__meta">
                <div>
                  <p className="work-list-item__cat">{c.category}</p>
                  <h2 className="work-list-item__name">{c.name}</h2>
                </div>
                <div className="work-list-item__right">
                  <span className="work-list-item__year">{c.year}</span>
                  <span className="work-list-item__arrow">View case study &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </>
  )
}
