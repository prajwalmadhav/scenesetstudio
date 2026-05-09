import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CARDS = [
  { id: 0, label: 'Brand Identity',      category: 'Branding',   seed: 'sss-f1' },
  { id: 1, label: 'Presentation Slides', category: 'Design',     seed: 'sss-f2' },
  { id: 2, label: 'Web Design',          category: 'Digital',    seed: 'sss-f3' },
  { id: 3, label: 'Campaign Assets',     category: 'Marketing',  seed: 'sss-f4' },
  { id: 4, label: 'Video Production',    category: 'Video',      seed: 'sss-f5' },
  { id: 5, label: 'Social Content',      category: 'Social',     seed: 'sss-f6' },
  { id: 6, label: 'Promo Graphics',      category: 'Design',     seed: 'sss-f7' },
  { id: 7, label: 'Digital Promotions',  category: 'Digital',    seed: 'sss-f8' },
]

export default function WorkHero() {
  const cardRefs = useRef([])
  const infoRefs = useRef([])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean)

    gsap.set(cards, { opacity: 0, y: 28 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.72,
      ease: 'power3.out',
      stagger: 0.065,
      delay: 0.2,
    })

    return () => gsap.killTweensOf(cards)
  }, [])

  function onEnter(e) {
    const card = e.currentTarget
    const info = card.querySelector('.fan-card__info')
    gsap.to(card, { scale: 1.04, y: -6, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
    gsap.to(info, { opacity: 1, duration: 0.25, ease: 'power2.out' })
  }

  function onLeave(e) {
    const card = e.currentTarget
    const info = card.querySelector('.fan-card__info')
    gsap.to(card, { scale: 1, y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
    gsap.to(info, { opacity: 0, duration: 0.25, ease: 'power2.out' })
  }

  return (
    <section className="work-hero">

      <div className="work-hero__eyebrow">
        <span className="work-hero__tag">Selected Work</span>
        <span className="work-hero__count">2024 — 2025</span>
      </div>

      <div className="work-hero__intro">
        <p className="work-hero__services">
          Digital Promotions, Portfolio Design, Presentation Slides,{' '}
          Marketing Campaign Assets, Promo Graphics,{' '}
          Branding Assets <strong>And More.</strong>
        </p>
      </div>

      <div className="work-hero__stage">
        <div className="work-hero__fan">
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              className="fan-wrap"
              style={{ '--i': i }}
            >
              <div
                ref={el => cardRefs.current[i] = el}
                className="fan-card"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                <img
                  src={`https://picsum.photos/seed/${card.seed}/520/350`}
                  alt={card.label}
                  className="fan-card__img"
                  draggable="false"
                />
                <div className="fan-card__info">
                  <span className="fan-card__label">{card.label}</span>
                  <span className="fan-card__cat">{card.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1 className="work-hero__title">
        Every project is a<br />story worth telling.
      </h1>

    </section>
  )
}
