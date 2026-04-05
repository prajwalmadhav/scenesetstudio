import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 | Scene Set Studio"
        description="Page not found — Scene Set Studio"
      />

      <div style={{ minHeight: '100vh', background: '#080808', paddingTop: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 64px' }}>

        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(120px, 20vw, 240px)', color: 'rgba(242,240,235,0.04)', letterSpacing: '-0.05em', lineHeight: 1, margin: '0 0 -20px', userSelect: 'none' }}>
          404
        </p>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 64px)', color: '#F2F0EB', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1 }}>
          Nothing to see here.
        </h1>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 300, color: 'rgba(242,240,235,0.45)', margin: '0 0 48px', maxWidth: '360px', lineHeight: 1.7 }}>
          That page does not exist. You might have followed a broken link or mistyped the URL.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            to="/"
            style={{ fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0a0a0a', background: '#C8F535', padding: '14px 28px', textDecoration: 'none', fontWeight: 500, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Go Home
          </Link>
          <Link
            to="/work"
            style={{ fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(242,240,235,0.6)', background: 'transparent', padding: '14px 28px', textDecoration: 'none', fontWeight: 500, border: '1px solid #1a1a1a', transition: 'border-color 0.2s, color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,245,53,0.4)'; e.currentTarget.style.color = '#F2F0EB' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a1a1a'; e.currentTarget.style.color = 'rgba(242,240,235,0.6)' }}
          >
            View Work
          </Link>
        </div>

      </div>
    </>
  )
}
