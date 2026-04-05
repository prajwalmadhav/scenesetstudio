import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'

export default function Navbar() {
  const navRef     = useRef(null)
  const overlayRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const overlay = overlayRef.current
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(overlay, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', pointerEvents: 'all' })
      gsap.fromTo(overlay.querySelectorAll('.mobile-link'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.1 })
    } else {
      document.body.style.overflow = ''
      gsap.to(overlay, { opacity: 0, y: -10, duration: 0.3, ease: 'power3.in', onComplete: () => { overlay.style.pointerEvents = 'none' } })
    }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <header ref={navRef} className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} style={{ opacity: 0 }}>
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo" aria-label="Scene Set Studio home" onClick={close}>
            <span className="navbar__logo-main">Scene</span>
            <span className="navbar__logo-accent"> Set</span>
            <span className="navbar__logo-main"> Studio</span>
          </Link>

          <nav className="navbar__links" aria-label="Primary navigation">
            <Link to="/work"     className={`navbar__link${pathname === '/work'     ? ' navbar__link--active' : ''}`}>Work</Link>
            <Link to="/services" className={`navbar__link${pathname === '/services' ? ' navbar__link--active' : ''}`}>Services</Link>
            <Link to="/about"    className={`navbar__link${pathname === '/about'    ? ' navbar__link--active' : ''}`}>About</Link>
            <Link to="/#process" className="navbar__link">Process</Link>
            <Link to="/contact"  className={`navbar__link${pathname === '/contact'  ? ' navbar__link--active' : ''}`}>Contact</Link>
          </nav>

          <div className="navbar__actions">
            <Link to="/contact" className="navbar__cta">Start a Project</Link>
            <button
              className={`navbar__hamburger${menuOpen ? ' is-open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className="navbar__burger-line" />
              <span className="navbar__burger-line" />
            </button>
          </div>
        </div>
      </header>

      <div ref={overlayRef} className="mobile-menu" aria-hidden={!menuOpen} style={{ opacity: 0, pointerEvents: 'none' }}>
        <nav className="mobile-menu__links" aria-label="Mobile navigation">
          <Link to="/work"     className="mobile-link" onClick={close}>Work</Link>
          <Link to="/services" className="mobile-link" onClick={close}>Services</Link>
          <Link to="/about"    className="mobile-link" onClick={close}>About</Link>
          <Link to="/"         className="mobile-link" onClick={close}>Process</Link>
          <Link to="/contact"  className="mobile-link" onClick={close}>Contact</Link>
          <Link to="/contact"  className="mobile-link mobile-link--cta" onClick={close}>Start a Project</Link>
        </nav>
      </div>
    </>
  )
}
