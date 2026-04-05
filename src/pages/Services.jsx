import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const SERVICES = [
  {
    number: '01',
    name: 'Brand Strategy',
    description: 'We build the strategic foundation your brand needs to cut through noise. Market positioning, audience mapping, messaging architecture, and a creative direction that holds across every channel.',
    deliverables: ['Brand positioning deck', 'Audience personas', 'Messaging framework', 'Visual identity guidelines'],
  },
  {
    number: '02',
    name: 'Content Production',
    description: 'High-output creative production — from concept to final cut. Video, photography, motion graphics, and editorial content built for the platforms where your audience actually lives.',
    deliverables: ['Video & reels production', 'Photography direction', 'Motion graphics', 'Platform-native content'],
  },
  {
    number: '03',
    name: 'Paid Advertising',
    description: 'Performance campaigns that convert. We handle creative strategy, media buying, and ongoing optimisation across Meta, Google, TikTok, and beyond — with a focus on ROAS that moves.',
    deliverables: ['Creative strategy & testing', 'Media buying & management', 'Audience segmentation', 'Performance reporting'],
  },
  {
    number: '04',
    name: 'Social Media',
    description: 'Content calendars, community management, and growth strategy that builds real audiences. We handle the day-to-day so your brand stays consistent, relevant, and impossible to ignore.',
    deliverables: ['Content calendar & scheduling', 'Community management', 'Growth strategy', 'Monthly analytics reports'],
  },
  {
    number: '05',
    name: 'Web Design',
    description: 'Conversion-focused design with editorial craft. From landing pages to full-site builds — every pixel is intentional, every interaction earns its place.',
    deliverables: ['UI/UX design', 'Development & launch', 'Copywriting', 'CRO audits'],
  },
]

const label = { fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.14em', color: 'rgba(242,240,235,0.35)', textTransform: 'uppercase', margin: 0 }

export default function Services() {
  return (
    <>
      <SEO
        title="Services | Scene Set Studio"
        description="Brand strategy, content production, paid advertising, social media, and web design — Scene Set Studio."
      />

      <div style={{ minHeight: '100vh', background: '#080808', paddingTop: '120px' }}>

        {/* Header */}
        <div style={{ padding: '0 64px 80px', borderBottom: '1px solid #1a1a1a' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(242,240,235,0.4)', textTransform: 'uppercase', marginBottom: '24px' }}>
            What We Do
          </p>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(48px, 7vw, 96px)', color: '#F2F0EB', lineHeight: 0.92, letterSpacing: '-0.03em', margin: '0 0 32px' }}>
            Creative work that<br />moves the needle.
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 300, color: 'rgba(242,240,235,0.55)', lineHeight: 1.7, maxWidth: '520px', margin: 0 }}>
            We are a full-service creative studio. Every engagement is built around the specific outcome you need.
          </p>
        </div>

        {/* Services list */}
        <div style={{ padding: '0 64px 120px' }}>
          {SERVICES.map((s, i) => (
            <div
              key={s.number}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 1fr',
                gap: '48px',
                padding: '64px 0',
                borderBottom: '1px solid #1a1a1a',
                alignItems: 'start',
              }}
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(242,240,235,0.25)', paddingTop: '6px' }}>{s.number}</span>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 48px)', color: '#F2F0EB', letterSpacing: '-0.03em', margin: '0 0 20px', lineHeight: 1 }}>
                  {s.name}
                </h2>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, color: 'rgba(242,240,235,0.6)', lineHeight: 1.8, margin: 0, maxWidth: '480px' }}>
                  {s.description}
                </p>
              </div>
              <div>
                <p style={{ ...label, marginBottom: '20px' }}>Deliverables</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {s.deliverables.map(d => (
                    <li key={d} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 300, color: 'rgba(242,240,235,0.5)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#C8F535', flexShrink: 0 }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div style={{ borderTop: '1px solid #1a1a1a', padding: '80px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0a0a' }}>
          <div>
            <p style={{ ...label, marginBottom: '16px' }}>Ready to start?</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 40px)', color: '#F2F0EB', letterSpacing: '-0.03em', margin: 0 }}>
              Let's talk about your project.
            </p>
          </div>
          <Link
            to="/contact"
            style={{ fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0a0a0a', background: '#C8F535', padding: '14px 28px', textDecoration: 'none', fontWeight: 500, display: 'inline-block', transition: 'opacity 0.2s' }}
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
