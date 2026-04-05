import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Navbar({ onServicesClick, onHomeClick, activePage }) {
  const navRef = useRef(null)
  const overlayRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  const handleServicesClick = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    onServicesClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleHomeClick = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    onHomeClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header ref={navRef} className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} style={{ opacity: 0 }}>
        <div className="navbar__inner">
          <a href="/" className="navbar__logo" aria-label="Scene Set Studio home" onClick={handleHomeClick}>
            <span className="navbar__logo-main">Scene</span>
            <span className="navbar__logo-accent"> Set</span>
            <span className="navbar__logo-main"> Studio</span>
          </a>

          <nav className="navbar__links" aria-label="Primary navigation">
            <a href="#work"    className={`navbar__link${activePage === 'home' ? '' : ''}`} onClick={handleHomeClick}>Work</a>
            <a href="#services" className={`navbar__link${activePage === 'services' ? ' navbar__link--active' : ''}`} onClick={handleServicesClick}>Services</a>
            <a href="#about"   className="navbar__link" onClick={handleHomeClick}>About</a>
            <a href="#process" className="navbar__link" onClick={handleHomeClick}>Process</a>
            <a href="#contact" className="navbar__link">Contact</a>
          </nav>

          <div className="navbar__actions">
            <a href="#contact" className="navbar__cta">Start a Project</a>
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

      <div ref={overlayRef} className="mobile-menu" aria-hidden={!menuOpen} style={{ opacity: 0, pointerEvents: 'none' }}>
        <nav className="mobile-menu__links" aria-label="Mobile navigation">
          <a href="#work"     className="mobile-link" onClick={handleHomeClick}>Work</a>
          <a href="#services" className="mobile-link" onClick={handleServicesClick}>Services</a>
          <a href="#about"    className="mobile-link" onClick={handleHomeClick}>About</a>
          <a href="#process"  className="mobile-link" onClick={handleHomeClick}>Process</a>
          <a href="#contact"  className="mobile-link" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="#contact"  className="mobile-link mobile-link--cta" onClick={() => setMenuOpen(false)}>Start a Project</a>
        </nav>
      </div>
    </>
  )
}
