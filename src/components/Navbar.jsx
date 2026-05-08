import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'

export default function Navbar() {
  const navRef     = useRef(null)
  const overlayRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

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
      gsap.fromTo(overlay.querySelectorAll('.mobile-link, .mobile-link--cta'), { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.1 })
    } else {
      document.body.style.overflow = ''
      gsap.to(overlay, { opacity: 0, y: -10, duration: 0.3, ease: 'power3.in', onComplete: () => { overlay.style.pointerEvents = 'none' } })
    }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  const handleLogo = () => {
    close()
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  const active = (path) => pathname === path ? ' mobile-link--active' : ''
  const isHome = pathname === '/'

  const HomeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  )

  return (
    <>
      <header ref={navRef} className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} style={{ opacity: 0 }}>
        <div className="navbar__inner">
          <button className="navbar__logo" aria-label="Scene Set Studio home" onClick={handleLogo}>
            <span className="navbar__logo-main">Scene</span>
            <span className="navbar__logo-accent"> Set</span>
            <span className="navbar__logo-main"> Studio</span>
          </button>

          {!isHome && (
            <button className="navbar__home-btn" onClick={() => navigate('/')} aria-label="Go to home">
              <HomeIcon />
            </button>
          )}

          <nav className="navbar__links" aria-label="Primary navigation">
            <Link to="/work"     className={`navbar__link${pathname === '/work'     ? ' navbar__link--active' : ''}`}>Work</Link>
            <Link to="/services" className={`navbar__link${pathname === '/services' ? ' navbar__link--active' : ''}`}>Services</Link>
            <Link to="/about"    className={`navbar__link${pathname === '/about'    ? ' navbar__link--active' : ''}`}>About</Link>
            <Link to="/process"  className={`navbar__link${pathname === '/process'  ? ' navbar__link--active' : ''}`}>Process</Link>
            <Link to="/contact"  className={`navbar__link${pathname === '/contact'  ? ' navbar__link--active' : ''}`}>Contact</Link>
          </nav>

          <div className="navbar__actions">
            <Link to="/contact" className="navbar__cta">Start a Project</Link>
            {!isHome && (
              <button className="navbar__home-btn navbar__home-btn--mobile" onClick={() => navigate('/')} aria-label="Go to home">
                <HomeIcon />
              </button>
            )}
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
          <Link to="/work"     className={`mobile-link${active('/work')}`}     onClick={close}>Work</Link>
          <Link to="/services" className={`mobile-link${active('/services')}`} onClick={close}>Services</Link>
          <Link to="/about"    className={`mobile-link${active('/about')}`}    onClick={close}>About</Link>
          <Link to="/process"  className={`mobile-link${active('/process')}`}  onClick={close}>Process</Link>
          <Link to="/contact"  className={`mobile-link${active('/contact')}`}  onClick={close}>Contact</Link>
          <Link to="/contact"  className="hero-btn hero-btn--primary mobile-link--cta" onClick={close}>Start a Project →</Link>
        </nav>
      </div>
    </>
  )
}
