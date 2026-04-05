import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const TEAM = [
  { initials: 'PS', name: 'Prajwal S.', role: 'Founder / Creative Director' },
  { initials: 'RK', name: 'Rohan K.',   role: 'Head of Strategy'             },
  { initials: 'AM', name: 'Anya M.',    role: 'Lead Producer'                },
  { initials: 'TD', name: 'Tej D.',     role: 'Paid Media Lead'              },
]

const VALUES = [
  { label: 'Craft over output',   body: 'We would rather produce one piece that genuinely lands than ten that scroll past.' },
  { label: 'Outcomes, not optics', body: 'Beautiful work that does not convert is just decoration. Every brief starts with the result.' },
  { label: 'No black boxes',      body: 'You see the thinking, the data, the reasoning. No agency mystique — just transparent collaboration.' },
  { label: 'Built to scale',      body: 'The systems we build for you keep working after the engagement ends. We hand over the playbook.' },
]

const label = { fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.14em', color: 'rgba(242,240,235,0.35)', textTransform: 'uppercase', margin: 0 }

export default function About() {
  return (
    <>
      <SEO
        title="About | Scene Set Studio"
        description="Scene Set Studio is a full-service creative agency. We build brands, produce content, and run campaigns that move the needle."
      />

      <div style={{ minHeight: '100vh', background: '#080808', paddingTop: '120px' }}>

        {/* Hero */}
        <div style={{ padding: '0 64px 80px', borderBottom: '1px solid #1a1a1a' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(242,240,235,0.4)', textTransform: 'uppercase', marginBottom: '24px' }}>
            Our Story
          </p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(48px, 7vw, 96px)', color: '#F2F0EB', lineHeight: 0.92, letterSpacing: '-0.03em', margin: 0 }}>
            We make brands<br />impossible to ignore.
          </h1>
        </div>

        {/* Mission */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '80px 64px', borderBottom: '1px solid #1a1a1a', gap: '80px' }}>
          <div>
            <p style={{ ...label, marginBottom: '24px' }}>Who We Are</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 300, color: 'rgba(242,240,235,0.65)', lineHeight: 1.8, margin: 0 }}>
              Scene Set Studio is a full-service creative agency founded on a simple conviction: the best-looking work and the best-performing work should be the same work.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, color: 'rgba(242,240,235,0.5)', lineHeight: 1.8, margin: 0 }}>
              We partner with ambitious brands at every stage — from early-stage startups finding their voice to established businesses ready to scale. Our team brings together strategy, creative production, and performance marketing under one roof, so nothing gets lost in translation between the brief and the result.
            </p>
          </div>
        </div>

        {/* Values */}
        <div style={{ padding: '80px 64px', borderBottom: '1px solid #1a1a1a' }}>
          <p style={{ ...label, marginBottom: '48px' }}>What We Stand For</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px' }}>
            {VALUES.map((v, i) => (
              <div key={v.label} style={{ padding: '48px', background: i % 2 === 0 ? '#0a0a0a' : '#080808', border: '1px solid #1a1a1a' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(20px, 2vw, 28px)', color: '#F2F0EB', letterSpacing: '-0.02em', margin: '0 0 16px' }}>
                  {v.label}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 300, color: 'rgba(242,240,235,0.5)', lineHeight: 1.75, margin: 0 }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ padding: '80px 64px', borderBottom: '1px solid #1a1a1a' }}>
          <p style={{ ...label, marginBottom: '48px' }}>The Team</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
            {TEAM.map(member => (
              <div key={member.name} style={{ padding: '40px 32px', border: '1px solid #1a1a1a', background: '#0a0a0a' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#C8F535', letterSpacing: '-0.02em' }}>{member.initials}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '17px', color: '#F2F0EB', margin: '0 0 6px', letterSpacing: '-0.01em' }}>{member.name}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(242,240,235,0.4)', margin: 0, letterSpacing: '0.05em' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', border: '1px solid #1a1a1a', margin: '0 64px 0' }}>
          {[
            { value: '40+', label: 'Brands served' },
            { value: '3×',  label: 'Average ROAS improvement' },
            { value: '2yrs', label: 'Operating' },
          ].map(s => (
            <div key={s.label} style={{ padding: '48px 40px', background: '#0a0a0a' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(48px, 6vw, 72px)', color: '#C8F535', letterSpacing: '-0.04em', margin: '0 0 12px', lineHeight: 1 }}>
                {s.value}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(242,240,235,0.45)', margin: 0 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ padding: '80px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ ...label, marginBottom: '16px' }}>Work With Us</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 40px)', color: '#F2F0EB', letterSpacing: '-0.03em', margin: 0 }}>
              Ready to build something real?
            </p>
          </div>
          <Link
            to="/contact"
            style={{ fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0a0a0a', background: '#C8F535', padding: '14px 28px', textDecoration: 'none', fontWeight: 500, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Start a Project
          </Link>
        </div>

      </div>
    </>
  )
}
