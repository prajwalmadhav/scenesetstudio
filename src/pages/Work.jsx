import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const CASES = [
  { slug: 'fawill-cleaning',  name: 'Fawill Cleaning',   category: 'Brand Strategy / Content', year: '2024' },
  { slug: 'fawill-bike-pub',  name: 'Fawill Bike & Pub', category: 'Paid Advertising / Social', year: '2024' },
  { slug: 'bhumis-couture',   name: "Bhumi's Couture",   category: 'Identity / Web Design',     year: '2024' },
  { slug: 'tierx-dcs',        name: 'TierX DCS',         category: 'Content Production / Ads',  year: '2025' },
]

export default function Work() {
  return (
    <>
      <SEO
        title="Selected Work | Scene Set Studio"
        description="Case studies and project work from Scene Set Studio — brand strategy, content production, and paid advertising."
      />

      <div style={{ minHeight: '100vh', background: '#080808', paddingTop: '120px' }}>

        {/* Header */}
        <div style={{ padding: '0 64px 80px', borderBottom: '1px solid #1a1a1a' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(242,240,235,0.4)', textTransform: 'uppercase', marginBottom: '24px' }}>
            Selected Work
          </p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(48px, 7vw, 96px)', color: '#F2F0EB', lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0 }}>
            Every project is a<br />story worth telling.
          </h1>
        </div>

        {/* Grid */}
        <div style={{ padding: '64px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px' }}>
          {CASES.map((c, i) => (
            <Link
              key={c.slug}
              to={`/work/${c.slug}`}
              style={{ textDecoration: 'none', display: 'block', background: i % 2 === 0 ? '#0a0a0a' : '#080808', padding: '48px', border: '1px solid #1a1a1a', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,245,53,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1a1a1a'}
            >
              {/* Placeholder image */}
              <div style={{ width: '100%', aspectRatio: '16/9', background: '#111', borderRadius: '4px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '48px', color: 'rgba(242,240,235,0.04)', letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
                  {c.name.split(' ')[0]}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(242,240,235,0.35)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {c.category}
                  </p>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 30px)', color: '#F2F0EB', margin: 0, letterSpacing: '-0.02em' }}>
                    {c.name}
                  </h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C8F535', fontSize: '13px', fontFamily: 'var(--font-body)' }}>
                  View  →
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </>
  )
}
