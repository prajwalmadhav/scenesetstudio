import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'

const CASES = [
  { slug: 'tierx-dcs',        name: 'TierX DCS',               category: 'Content Production / Ads',   year: '2025' },
  { slug: 'fawill-bike-pub',  name: 'Fawill Bike & Pub',        category: 'Paid Advertising / Social',  year: '2024' },
  { slug: 'fawill-cleaning',  name: 'Fawill Cleaning Company',  category: 'Brand Strategy / Content',   year: '2024' },
  { slug: 'sceneset-branding',name: 'Scene Set Studio',         category: 'Brand Identity / Design',    year: '2024' },
]

const STATS = [
  { label: 'Increase in leads',    value: '0%'  },
  { label: 'Organic reach growth', value: '000' },
  { label: 'ROAS improvement',     value: '0x'  },
]

/* ── Shared style tokens ── */
const S = {
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    letterSpacing: '0.15em',
    color: 'rgba(242,240,235,0.38)',
    textTransform: 'uppercase',
    marginBottom: '14px',
    display: 'block',
  },
  h2: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: 'clamp(26px, 3.5vw, 42px)',
    color: '#F2F0EB',
    letterSpacing: '-0.03em',
    marginBottom: '20px',
    lineHeight: 1.05,
  },
  para: {
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    fontWeight: 300,
    color: 'rgba(242,240,235,0.62)',
    lineHeight: 1.85,
    maxWidth: '640px',
    margin: '0 auto',
  },
  rule: {
    border: 'none',
    borderTop: '1px solid #222',
    margin: '0 0 56px',
  },
}

export default function CaseStudy() {
  const { client } = useParams()
  const index   = CASES.findIndex(c => c.slug === client)
  const project = CASES[index] ?? { name: client, category: 'Case Study', year: '' }

  return (
    <>
      <SEO
        title={`${project.name} | Scene Set Studio`}
        description={`Case study: ${project.name} — ${project.category}`}
      />

      {/* Page shell */}
      <div style={{ minHeight: '100dvh', background: '#0e0e0e', paddingTop: '100px', paddingBottom: '0' }}>

        {/* Centered content column */}
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px)' }}>

          {/* ── Back button ── */}
          <Link
            to="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(242,240,235,0.4)',
              textDecoration: 'none',
              marginBottom: '52px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#F2F0EB'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,240,235,0.4)'}
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M5 1L1 5M1 5L5 9M1 5H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Work
          </Link>

          {/* ── Hero ── */}
          <section style={{ marginBottom: '72px', textAlign: 'center' }}>
            <span style={{ ...S.eyebrow, textAlign: 'center' }}>{project.category}</span>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: 'clamp(44px, 8vw, 96px)',
              color: '#F2F0EB',
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              margin: '0 0 48px',
            }}>
              {project.name}
            </h1>
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              background: '#141414',
              borderRadius: '8px',
              border: '1px solid #222',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: 'clamp(40px, 7vw, 80px)',
                color: 'rgba(242,240,235,0.03)',
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}>
                {project.name}
              </span>
            </div>
          </section>

          {/* ── Challenge ── */}
          <section style={{ marginBottom: '80px', textAlign: 'center' }}>
            <hr style={S.rule} />
            <span style={S.eyebrow}>01 — The Challenge</span>
            <h2 style={{ ...S.h2, textAlign: 'center' }}>What needed solving.</h2>
            <p style={S.para}>
              Placeholder — this section will describe the core business problem the client faced before working with Scene Set Studio. It covers market context, existing gaps, and the strategic brief we were given.
            </p>
          </section>

          {/* ── What We Built ── */}
          <section style={{ marginBottom: '80px' }}>
            <hr style={S.rule} />
            <span style={S.eyebrow}>02 — What We Built</span>
            <h2 style={{ ...S.h2, textAlign: 'center' }}>The work.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {['Creative Direction', 'Campaign Build', 'Final Delivery'].map(t => (
                <div
                  key={t}
                  style={{
                    aspectRatio: '4/3',
                    background: '#141414',
                    border: '1px solid #222',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '16px',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(242,240,235,0.22)', textTransform: 'uppercase' }}>{t}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Results ── */}
          <section style={{ marginBottom: '80px' }}>
            <hr style={S.rule} />
            <span style={S.eyebrow}>03 — The Result</span>
            <h2 style={{ ...S.h2, textAlign: 'center' }}>What moved.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', border: '1px solid #222', borderRadius: '6px', overflow: 'hidden' }}>
              {STATS.map(s => (
                <div key={s.label} style={{ padding: '40px 28px', background: '#141414', textAlign: 'center' }}>
                  <p style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    fontSize: 'clamp(40px, 5vw, 68px)',
                    color: '#D4001E',
                    letterSpacing: '-0.04em',
                    margin: '0 0 10px',
                    lineHeight: 1,
                  }}>
                    {s.value}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(242,240,235,0.4)', margin: 0, letterSpacing: '0.06em' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ── All Projects ── full bleed section ── */}
        <div style={{ borderTop: '1px solid #1e1e1e', marginTop: '40px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '64px clamp(20px, 4vw, 40px) 100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
              <span style={{ ...S.eyebrow, margin: 0 }}>All Projects</span>
              <Link
                to="/work"
                style={{ fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(242,240,235,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#D4001E'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,240,235,0.35)'}
              >
                View all &rarr;
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {CASES.map((c, i) => {
                const isCurrent = c.slug === client
                return isCurrent ? (
                  <div
                    key={c.slug}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px 0',
                      borderBottom: '1px solid #1e1e1e',
                      opacity: 0.35,
                      cursor: 'default',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(242,240,235,0.3)', letterSpacing: '0.1em' }}>0{i + 1}</span>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'clamp(16px, 2vw, 22px)', color: '#F2F0EB', letterSpacing: '-0.02em' }}>{c.name}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(242,240,235,0.25)', textTransform: 'uppercase' }}>Current</span>
                  </div>
                ) : (
                  <Link
                    key={c.slug}
                    to={`/work/${c.slug}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px 0',
                      borderBottom: '1px solid #1e1e1e',
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.paddingLeft = '8px' ; e.currentTarget.style.transition = 'padding 0.2s ease' }}
                    onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(242,240,235,0.3)', letterSpacing: '0.1em' }}>0{i + 1}</span>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'clamp(16px, 2vw, 22px)', color: '#F2F0EB', letterSpacing: '-0.02em' }}>{c.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(242,240,235,0.3)', textTransform: 'uppercase' }}>{c.category}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#D4001E' }}>&rarr;</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
