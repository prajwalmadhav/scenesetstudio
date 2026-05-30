import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const DOCK_ITEMS = [
  {
    label: 'Instagram',
    platform: 'instagram',
    href: 'https://instagram.com/scenesetstudio',
    target: '_blank',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    platform: 'linkedin',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    platform: 'x',
    href: 'https://x.com/scenesetstudio',
    target: '_blank',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    platform: 'whatsapp',
    href: 'https://wa.me/16138702919',
    target: '_blank',
    icon: (
      <svg viewBox="0 0 24 24" fill="#25D366" stroke="none">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    platform: 'youtube',
    href: 'https://www.youtube.com/@SceneSetStudio',
    target: '_blank',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="4"/>
        <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
]

function Dock() {
  const itemsRef = useRef([])
  const [tooltip, setTooltip] = useState({ visible: false, label: '', x: 0 })

  const handleMouseMove = (e) => {
    itemsRef.current.forEach((item) => {
      if (!item) return
      const rect  = item.getBoundingClientRect()
      const cx    = rect.left + rect.width / 2
      const dist  = Math.abs(e.clientX - cx)
      const max   = 90
      const scale = dist < max ? 1 + (1 - dist / max) * 0.6 : 1
      const lift  = dist < max ? -(scale - 1) * 18 : 0
      item.style.transform = `scale(${scale}) translateY(${lift}px)`
    })
  }

  const handleMouseLeave = () => {
    itemsRef.current.forEach(item => {
      if (item) item.style.transform = 'scale(1) translateY(0)'
    })
    setTooltip(t => ({ ...t, visible: false }))
  }

  return (
    <div className="dock" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {tooltip.visible && (
        <div className="dock-tooltip" style={{ left: tooltip.x }}>{tooltip.label}</div>
      )}
      {DOCK_ITEMS.map((item, i) => (
        <a
          key={item.label}
          href={item.href}
          target={item.target}
          rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
          className="dock-item"
          data-platform={item.platform}
          ref={el => itemsRef.current[i] = el}
          aria-label={item.label}
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const dockRect = e.currentTarget.closest('.dock').getBoundingClientRect()
            setTooltip({ visible: true, label: item.label, x: rect.left - dockRect.left + rect.width / 2 })
          }}
          onMouseLeave={() => setTooltip(t => ({ ...t, visible: false }))}
        >
          <div className="dock-item__icon">{item.icon}</div>
        </a>
      ))}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-brand__info">
            <div className="footer-logo">
              <img src="/sss logo2.svg" alt="" className="footer-logo__icon" aria-hidden="true" />
              <span className="footer-logo__text">SceneSet<strong>Studio</strong></span>
            </div>
            <p className="footer-tagline">Cinematic storytelling meets<br />performance marketing.</p>
          </div>
          <div className="footer-socials">
            <p className="footer-dock-label">Follow our work</p>
            <Dock />
          </div>
        </div>

        <nav className="footer-nav">
          <div className="footer-nav__col">
            <span className="footer-nav__heading">Services</span>
            <a href="#services">Brand Strategy</a>
            <a href="#services">Content Production</a>
            <a href="#services">Advertising</a>
            <a href="#services">Social Media</a>
            <a href="#services">Web Design</a>
            <a href="#services">Video Production</a>
          </div>
          <div className="footer-nav__col">
            <span className="footer-nav__heading">Company</span>
            <a href="#about">About</a>
            <a href="#process">Process</a>
            <a href="#testimonials">Testimonials</a>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className="footer-nav__col">
            <span className="footer-nav__heading">Contact</span>
            <a href="mailto:team@scenesetstudio.com">team@scenesetstudio.com</a>
            <a href="tel:+16138702919">+1 613 870 2919</a>
            <a
              href="https://g.page/r/review"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-review-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}>
                <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"/>
              </svg>
              Leave a Google Review
            </a>
            <button
              className="footer-back-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 13V3M3 8l5-5 5 5"/>
              </svg>
              <span style={{ fontSize: '11px', letterSpacing: '0.08em', fontFamily: 'var(--font-body)', fontWeight: 400 }}>Back to top</span>
            </button>
          </div>
        </nav>
      </div>

      <div className="footer-bottom">
        <span className="footer-bottom__copy">
          © {new Date().getFullYear()} SceneSet Studio. All rights reserved.
          <span className="footer-bottom__sep">·</span>
          <a href="/card.html" target="_blank" rel="noopener noreferrer" className="footer-bottom__link">
            Digital Business Card ↗
          </a>
        </span>
      </div>

    </footer>
  )
}
