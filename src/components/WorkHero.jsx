import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TILES = [
  { id: 0, col: '1 / 3', row: '1 / 3', label: 'Brand Strategy',      year: '2024', seed: 'sss-w1' },
  { id: 1, col: '3 / 4', row: '1 / 2', label: 'Content Production',  year: '2024', seed: 'sss-w2' },
  { id: 2, col: '4 / 5', row: '1 / 2', label: 'Web Design',          year: '2025', seed: 'sss-w3' },
  { id: 3, col: '3 / 5', row: '2 / 3', label: 'Paid Advertising',    year: '2024', seed: 'sss-w4' },
  { id: 4, col: '1 / 2', row: '3 / 4', label: 'Social Media',        year: '2025', seed: 'sss-w5' },
  { id: 5, col: '2 / 4', row: '3 / 4', label: 'Video Production',    year: '2025', seed: 'sss-w6' },
  { id: 6, col: '4 / 5', row: '3 / 4', label: 'Identity Design',     year: '2024', seed: 'sss-w7' },
]

export default function WorkHero() {
  const gridRef = useRef(null)
  const tileRefs = useRef([])

  useEffect(() => {
    const tiles = tileRefs.current.filter(Boolean)

    gsap.set(tiles, { opacity: 0, scale: 0.88, y: 24 })
    gsap.to(tiles, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.72,
      ease: 'power3.out',
      stagger: { amount: 0.55, from: 'random' },
      delay: 0.1,
    })
  }, [])

  function onEnter(e) {
    gsap.to(e.currentTarget, { scale: 1.03, y: -6, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
  }
  function onLeave(e) {
    gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
  }

  return (
    <section className="work-hero">

      <div className="work-hero__eyebrow">
        <span className="work-hero__tag">Selected Work</span>
        <span className="work-hero__count">{TILES.length} Projects</span>
      </div>

      <div ref={gridRef} className="work-hero__grid">
        {TILES.map((tile, i) => (
          <div
            key={tile.id}
            ref={el => tileRefs.current[i] = el}
            className="work-tile"
            style={{ gridColumn: tile.col, gridRow: tile.row }}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            <img
              src={`https://picsum.photos/seed/${tile.seed}/800/600`}
              alt={tile.label}
              className="work-tile__img"
              draggable="false"
            />
            <div className="work-tile__overlay">
              <span className="work-tile__label">{tile.label}</span>
              <span className="work-tile__year">{tile.year}</span>
            </div>
          </div>
        ))}
      </div>

      <h1 className="work-hero__title">
        Every project is a<br />story worth telling.
      </h1>

    </section>
  )
}
