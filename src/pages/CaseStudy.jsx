import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'

const CASES = [
  { slug: 'fawill-cleaning',  name: 'Fawill Cleaning',   category: 'Brand Strategy / Content' },
  { slug: 'fawill-bike-pub',  name: 'Fawill Bike & Pub', category: 'Paid Advertising / Social' },
  { slug: 'bhumis-couture',   name: "Bhumi's Couture",   category: 'Identity / Web Design'     },
  { slug: 'tierx-dcs',        name: 'TierX DCS',         category: 'Content Production / Ads'  },
]

const STATS = [
  { label: 'Increase in leads',    value: '0%'  },
  { label: 'Organic reach growth', value: '000' },
  { label: 'ROAS improvement',     value: '0x'  },
]

const label = { fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.14em', color: 'rgba(242,240,235,0.35)', textTransform: 'uppercase', marginBottom: '16px' }
const h2    = { fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#F2F0EB', letterSpacing: '-0.03em', marginBottom: '24px' }
const para  = { fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, color: 'rgba(242,240,235,0.65)', lineHeight: 1.8, maxWidth: '620px' }
const rule  = { border: 'none', borderTop: '1px solid #1a1a1a', margin: '0 0 80px' }

export default function CaseStudy() {
  const { client } = useParams()
  const index   = CASES.findIndex(c => c.slug === client)
  const project = CASES[index] ?? { name: client, category: 'Case Study' }
  const next    = CASES[(index + 1) % CASES.length]

  return (
    <>
      <SEO
        title={`${project.name} | Scene Set Studio`}
        description={`Case study: ${project.name} — ${project.category}`}
      />

      <div style={{ minHeight: '100vh', background: '#080808', paddingTop: '120px' }}>

        {/* ── Hero ── */}
        <section style={{ padding: '0 64px 80px', borderBottom: '1px solid #1a1a1a' }}>
          <p style={label}>{project.category}</p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(52px, 9vw, 120px)', color: '#F2F0EB', lineHeight: 0.9, letterSpacing: '-0.04em', margin: '0 0 40px' }}>
            {project.name}
          </h1>
          <div style={{ width: '100%', aspectRatio: '21/9', background: '#0f0f0f', borderRadius: '6px', border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '80px', color: 'rgba(242,240,235,0.03)', letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
              {project.name}
            </span>
          </div>
        </section>

        <div style={{ padding: '80px 64px 0' }}>

          {/* ── Challenge ── */}
          <section style={{ marginBottom: '80px' }}>
            <hr style={rule} />
            <p style={label}>01 — The Challenge</p>
            <h2 style={h2}>What needed solving.</h2>
            <p style={para}>
              Placeholder — this section will describe the core business problem the client faced before working with Scene Set Studio. It covers market context, existing gaps, and the strategic brief we were given.
            </p>
          </section>

          {/* ── What We Built ── */}
          <section style={{ marginBottom: '80px' }}>
            <hr style={rule} />
            <p style={label}>02 — What We Built</p>
            <h2 style={h2}>The work.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {['Creative Direction', 'Campaign Build', 'Final Delivery'].map(t => (
                <div key={t} style={{ aspectRatio: '4/3', background: '#0f0f0f', border: '1px solid #1a1a1a', borderRadius: '4px', display: 'flex', alignItems: 'flex-end', padding: '20px' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(242,240,235,0.25)', textTransform: 'uppercase' }}>{t}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Results ── */}
          <section style={{ marginBottom: '80px' }}>
            <hr style={rule} />
            <p style={label}>03 — The Result</p>
            <h2 style={h2}>What moved.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', border: '1px solid #1a1a1a' }}>
              {STATS.map(s => (
                <div key={s.label} style={{ padding: '48px 40px', background: '#0a0a0a' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(48px, 6vw, 80px)', color: '#C8F535', letterSpacing: '-0.04em', margin: '0 0 12px', lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(242,240,235,0.45)', margin: 0 }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Next Project ── */}
          <section style={{ borderTop: '1px solid #1a1a1a', paddingTop: '64px', paddingBottom: '120px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ ...label, margin: 0 }}>Next project</p>
            <Link
              to={`/work/${next.slug}`}
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 48px)', color: '#F2F0EB', textDecoration: 'none', letterSpacing: '-0.03em', display: 'flex', alignItems: 'center', gap: '16px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#C8F535'}
              onMouseLeave={e => e.currentTarget.style.color = '#F2F0EB'}
            >
              {next.name} →
            </Link>
          </section>

        </div>
      </div>
    </>
  )
}
