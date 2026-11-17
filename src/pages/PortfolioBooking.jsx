import { useEffect } from 'react'
import { loadCal, CAL_LINK } from '../lib/cal'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import tierxImg from '../assets/work/case-studies/tierx-dcs.webp'
import fawillBikeImg from '../assets/work/case-studies/fawill-bike-pub.webp'
import fawillCleanImg from '../assets/work/case-studies/fawill-cleaning.webp'
import sceneSetImg from '../assets/work/case-studies/scene-set-studio.webp'
import './links.css'
import './qrcode.css'
import './portfolio-booking.css'

// Cal.com config for the "Book Now" popup — same event as /booking.
// Elements with data-cal-link are auto-bound by the embed script on click.
const CAL_CONFIG = JSON.stringify({ layout: 'month_view', theme: 'dark' })

/* ── Video production portfolio — one-off project work, kept separate
   from photo/portrait portfolios (those get their own page later) ── */
const VIDEOS = [
  { slug: 'tierx-dcs', brand: 'TierX DCS', tag: 'Brand & Web', img: tierxImg },
  { slug: 'fawill-bike-pub', brand: 'FaWill Bike Pub', tag: 'Brand Launch', img: fawillBikeImg },
  { slug: 'fawill-cleaning', brand: 'FaWill Cleaning', tag: 'B2B Rebrand', img: fawillCleanImg },
  { slug: 'sceneset-branding', brand: 'Scene Set Studio', tag: 'Website Case Study', img: sceneSetImg },
]

const PHOTOS = [
  { slug: 'sceneset-branding', brand: 'Scene Set Studio', tag: 'Website Case Study', img: sceneSetImg },
  { slug: 'fawill-cleaning', brand: 'FaWill Cleaning', tag: 'B2B Rebrand', img: fawillCleanImg },
  { slug: 'tierx-dcs', brand: 'TierX DCS', tag: 'Brand & Web', img: tierxImg },
  { slug: 'fawill-bike-pub', brand: 'FaWill Bike Pub', tag: 'Brand Launch', img: fawillBikeImg },
]

const PlayIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
)

/* ── Standalone nav for this page — same visual language as the main
   Navbar, trimmed to just Portfolio + Book Now ── */
function PortfolioBookingNav() {
  return (
    <header className="pb-nav">
      <div className="pb-nav__inner">
        <a href="#pb-videos" className="pb-nav__logo">
          <img src="/sss-logo2.svg" alt="" className="pb-nav__logo-icon" aria-hidden="true" />
          <span className="pb-nav__logo-text">SceneSet<strong>Studio</strong></span>
        </a>
        <nav className="pb-nav__links" aria-label="Primary navigation">
          <a href="#pb-videos" className="pb-nav__link">Portfolio</a>
        </nav>
        <button type="button" className="pb-nav__cta" data-cal-link={CAL_LINK} data-cal-config={CAL_CONFIG}>
          Book Now
        </button>
      </div>
    </header>
  )
}

export default function PortfolioBooking() {
  useEffect(() => {
    const Cal = loadCal()
    Cal('init', { origin: 'https://cal.com' })
    Cal('ui', {
      theme: 'dark',
      styles: { branding: { brandColor: '#D4001E' } },
    })
  }, [])

  return (
    <>
      <SEO
        title="Book Your Video Production | Scene Set Studio"
        description="See recent video production work, then pick a date and time to book your project."
      />

      <div className="links-page">
        <PortfolioBookingNav />

        {/* ── Videos — seen first ── */}
        <section className="qr-section pb-section--first" id="pb-videos">
          <div className="qr-wrap" style={{ maxWidth: 960 }}>
            <div className="qr-section-head">
              <p className="qr-eyebrow">Video Production · One-Off Projects</p>
              <h1 className="qr-section-title">Recent productions.</h1>
              <p className="qr-section-sub">Tap any project for the full case study.</p>
            </div>

            <div className="pb-portfolio-grid">
              {VIDEOS.map((r) => (
                <a key={r.slug} href={`/work/${r.slug}`} className="pb-portfolio-card">
                  <img src={r.img} alt={r.brand} className="pb-portfolio-card__img" loading="lazy" />
                  <div className="pb-portfolio-card__shade" />
                  <span className="pb-portfolio-card__play" aria-hidden="true"><PlayIcon /></span>
                  <span className="pb-portfolio-card__label">
                    {r.brand}
                    <small>{r.tag}</small>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Photos — all images, next ── */}
        <section className="qr-section">
          <div className="qr-wrap" style={{ maxWidth: 960 }}>
            <div className="qr-section-head">
              <p className="qr-eyebrow">Stills</p>
              <h2 className="qr-section-title">From the shoots.</h2>
              <p className="qr-section-sub">A look at finished frames from recent projects.</p>
            </div>

            <div className="pb-photo-grid">
              {PHOTOS.map((p, i) => (
                <a key={p.slug + i} href={`/work/${p.slug}`} className="pb-photo-card">
                  <img src={p.img} alt={p.brand} className="pb-photo-card__img" loading="lazy" />
                  <span className="pb-photo-card__label">
                    {p.brand}
                    <small>{p.tag}</small>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Booking CTA — opens the Cal.com popup to pick date + time ── */}
        <section className="qr-section">
          <div className="qr-wrap" style={{ maxWidth: 640, textAlign: 'center' }}>
            <p className="qr-eyebrow">Ready?</p>
            <h2 className="qr-section-title">Lock in your date.</h2>
            <p className="qr-section-sub">Pick a date and time, then confirm your booking.</p>
            <button type="button" className="qr-btn qr-btn--solid pb-hero-cta" style={{ marginTop: 28 }} data-cal-link={CAL_LINK} data-cal-config={CAL_CONFIG}>
              Book Now →
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
