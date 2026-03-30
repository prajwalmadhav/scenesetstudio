import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const overlayRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  // Scroll-aware background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile overlay open/close animation
  useEffect(() => {
    const overlay = overlayRef.current
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(
        overlay,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', pointerEvents: 'all' }
      )
      // Stagger mobile links
      gsap.fromTo(
        overlay.querySelectorAll('.mobile-link'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(overlay, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => { overlay.style.pointerEvents = 'none' },
      })
    }
  }, [menuOpen])

  return (
    <>
      {/* ── Main Nav Bar ── */}
      <header ref={navRef} className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} style={{ opacity: 0 }}>
        <div className="navbar__inner">
          {/* Logo */}
          <a href="/" className="navbar__logo" aria-label="Scene Set Studio home">
            <span className="navbar__logo-main">Scene</span>
            <span className="navbar__logo-accent"> Set</span>
            <span className="navbar__logo-main"> Studio</span>
          </a>

          {/* Desktop Links */}
          <nav className="navbar__links" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="navbar__link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="navbar__actions">
            <a href="#contact" className="navbar__cta">
              Start a Project
            </a>
            <button
              className={`navbar__hamburger${menuOpen ? ' is-open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className="navbar__burger-line" />
              <span className="navbar__burger-line" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Full-Screen Overlay ── */}
      <div
        ref={overlayRef}
        className="mobile-menu"
        aria-hidden={!menuOpen}
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        <nav className="mobile-menu__links" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mobile-link mobile-link--cta"
            onClick={() => setMenuOpen(false)}
          >
            Start a Project
          </a>
        </nav>
      </div>
    </>
  )
}
