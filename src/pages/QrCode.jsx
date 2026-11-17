import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import { getQrLinks } from '../lib/qrcode'
import tierxImg from '../assets/work/case-studies/tierx-dcs.webp'
import fawillBikeImg from '../assets/work/case-studies/fawill-bike-pub.webp'
import fawillCleanImg from '../assets/work/case-studies/fawill-cleaning.webp'
import sceneSetImg from '../assets/work/case-studies/scene-set-studio.webp'
import './links.css'
import './qrcode.css'

/* ── Services — condensed from /offers, kept in sync manually ── */
const SERVICES = [
  { name: 'Video Editing', desc: 'You shoot it, we edit it — every month.', price: '$75', per: 'per video', featured: false },
  { name: 'Videography + Editing', desc: '1 shoot day, 6 videos, 6 posts.', price: '$850', per: '/ month', featured: false },
  { name: 'Video Production', desc: 'Shoots + edits + monthly content strategy.', price: '$1,500', per: '/ month', featured: true },
  { name: 'Full-Funnel Marketing', desc: 'Content, ads, SEO & email — end to end.', price: '$2,500', per: '/ month +', featured: false },
]

/* ── Mini portfolio — real project stills, styled as vertical reels ── */
const REELS = [
  { slug: 'tierx-dcs', brand: 'TierX DCS', tag: 'Brand & Web', img: tierxImg },
  { slug: 'fawill-bike-pub', brand: 'FaWill Bike Pub', tag: 'Brand Launch', img: fawillBikeImg },
  { slug: 'fawill-cleaning', brand: 'FaWill Cleaning', tag: 'B2B Rebrand', img: fawillCleanImg },
  { slug: 'sceneset-branding', brand: 'Scene Set Studio', tag: 'Website Case Study', img: sceneSetImg },
]

/* ── Instagram-style post grid — real project stills, styled like IG ── */
const IG_POSTS = [
  { img: tierxImg, href: '/work/tierx-dcs' },
  { img: fawillBikeImg, href: '/work/fawill-bike-pub' },
  { img: fawillCleanImg, href: '/work/fawill-cleaning' },
  { img: sceneSetImg, href: '/work/sceneset-branding' },
  { img: tierxImg, href: '/work/tierx-dcs' },
  { img: fawillBikeImg, href: '/work/fawill-bike-pub' },
]

const PlayIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
)

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" /></svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export default function QrCode() {
  const [links] = useState(getQrLinks)

  return (
    <>
      <SEO
        title="Scan | Scene Set Studio"
        description="You scanned our QR code — services, portfolio, and how to book."
      />

      <div className="links-page">

        {/* ── Hero + quick actions ── */}
        <section className="links-hub" style={{ paddingBottom: 60 }}>
          <div className="links-logo">
            <img src="/sss-logo2.svg" alt="" className="links-logo__icon" aria-hidden="true" />
            <span className="links-logo__text">SceneSet<strong>Studio</strong></span>
          </div>

          <h1 className="links-title">Welcome.</h1>
          <p className="links-sub">You scanned our QR code — here's where to go next.</p>

          <div className="links-list">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`links-btn${l.primary ? ' links-btn--primary' : ''}`}
              >
                <span className="links-btn__main">
                  <span className="links-btn__label">{l.label}</span>
                  {l.note && <span className="links-btn__note">{l.note}</span>}
                </span>
                <span className="links-btn__arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Services ── */}
        <section className="qr-section">
          <div className="qr-wrap">
            <div className="qr-section-head">
              <p className="qr-eyebrow">What We Offer</p>
              <h2 className="qr-section-title">Pick your package.</h2>
              <p className="qr-section-sub">Every package includes add-ons like motion graphics, extra shoot days & more.</p>
            </div>

            <div className="qr-services">
              {SERVICES.map((s) => (
                <Link key={s.name} to="/offers" className={`qr-service-card${s.featured ? ' qr-service-card--featured' : ''}`}>
                  <div className="qr-service-card__main">
                    <div className="qr-service-card__name">
                      {s.name}
                      {s.featured && <span className="qr-service-card__badge">Popular</span>}
                    </div>
                    <p className="qr-service-card__desc">{s.desc}</p>
                  </div>
                  <div className="qr-service-card__price">
                    {s.price}
                    <span>{s.per}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="qr-services-cta">
              <Link to="/offers" className="qr-btn qr-btn--solid">See full pricing & add-ons →</Link>
            </div>
          </div>
        </section>

        {/* ── Mini portfolio — reels ── */}
        <section className="qr-section">
          <div className="qr-wrap">
            <div className="qr-section-head">
              <p className="qr-eyebrow">Portfolio</p>
              <h2 className="qr-section-title">Recent work.</h2>
              <p className="qr-section-sub">Swipe through — tap any project for the full case study.</p>
            </div>
          </div>

          <div className="qr-reels-row">
            {REELS.map((r) => (
              <Link key={r.slug} to={`/work/${r.slug}`} className="qr-reel-card">
                <img src={r.img} alt={r.brand} className="qr-reel-card__img" loading="lazy" />
                <div className="qr-reel-card__shade" />
                <span className="qr-reel-card__play" aria-hidden="true"><PlayIcon /></span>
                <span className="qr-reel-card__label">
                  {r.brand}
                  <small>{r.tag}</small>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Instagram-style posts ── */}
        <section className="qr-section">
          <div className="qr-wrap">
            <div className="qr-section-head">
              <p className="qr-eyebrow">Follow Along</p>
              <h2 className="qr-section-title">@scenesetstudio</h2>
              <p className="qr-section-sub">Behind-the-scenes and finished work, posted regularly.</p>
            </div>

            <div className="qr-ig-grid">
              {IG_POSTS.map((p, i) => (
                <a key={i} href="https://instagram.com/scenesetstudio" target="_blank" rel="noopener noreferrer" className="qr-ig-card">
                  <img src={p.img} alt="" className="qr-ig-card__img" loading="lazy" />
                  <span className="qr-ig-card__overlay" aria-hidden="true"><HeartIcon /></span>
                </a>
              ))}
            </div>

            <a href="https://instagram.com/scenesetstudio" target="_blank" rel="noopener noreferrer" className="qr-ig-follow">
              <InstagramIcon /> Follow us on Instagram
            </a>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="qr-section">
          <div className="qr-wrap">
            <div className="qr-section-head">
              <p className="qr-eyebrow">Client Words</p>
              <h2 className="qr-section-title">What clients say.</h2>
            </div>

            <div className="qr-testimonial-empty">
              <div className="qr-testimonial-empty__icon">★ ★ ★ ★ ★</div>
              <p className="qr-testimonial-empty__text">
                Client testimonials are being added here soon. In the meantime, book a call
                and we'll happily connect you with a recent client for a reference.
              </p>
              <Link to="/booking" className="qr-btn qr-btn--solid">Book a Call</Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
