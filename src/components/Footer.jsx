import { useRef, useState } from 'react'

const DOCK_ITEMS = [
  {
    label: 'Instagram',
    platform: 'instagram',
    href: '#',
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
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'Behance',
    platform: 'behance',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h7.5a3 3 0 010 6H3V6z"/>
        <path d="M3 12h8a3.5 3.5 0 010 7H3v-7z"/>
        <path d="M14.5 10h6M14 14.5c0-2.5 1.5-4 3.5-4s3.5 1.5 3.5 4H14z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    platform: 'youtube',
    href: '#',
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
          <div className="footer-logo">
            {/* SS mark */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="34" height="34" rx="4" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4"/>
              <path d="M10 13c0-1.657 1.343-3 3-3h4.5c1.657 0 3 1.343 3 3s-1.343 3-3 3H13c-1.657 0-3 1.343-3 3s1.343 3 3 3h4.5c1.657 0 3-1.343 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M19 13c0-1.657 1.343-3 3-3h.5c1.657 0 3 1.343 3 3s-1.343 3-3 3H19c-1.657 0-3 1.343-3 3s1.343 3 3 3h.5c1.657 0 3-1.343 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span className="footer-logo__text">SceneSet<strong>Studio</strong></span>
          </div>
          <p className="footer-tagline">Cinematic storytelling meets performance marketing.</p>
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
            <a href="#services">Paid Advertising</a>
            <a href="#services">Social Media</a>
            <a href="#services">Web Design</a>
            <a href="#services">Video Production</a>
          </div>
          <div className="footer-nav__col">
            <span className="footer-nav__heading">Company</span>
            <a href="#about">About</a>
            <a href="#process">Process</a>
            <a href="#ourwork">Our Work</a>
            <a href="#testimonials">Testimonials</a>
          </div>
          <div className="footer-nav__col">
            <span className="footer-nav__heading">Contact</span>
            <a href="mailto:hello@sceneset.studio">hello@sceneset.studio</a>
            <a href="#">Book a Call</a>
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
          </div>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} SceneSet Studio. All rights reserved.</span>
        <span>Made with precision.</span>
      </div>

    </footer>
  )
}
