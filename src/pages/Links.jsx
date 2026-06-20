import SEO from '../components/SEO'
import Footer from '../components/Footer'
import './links.css'

const LINKS = [
  {
    label: 'Book a Call',
    note: 'Free 20-min discovery call',
    href: 'https://links.scenesetstudio.com/f/book-a-call',
    primary: true,
  },
  {
    label: 'Pilot Program',
    note: 'Apply for the founding-client pilot',
    href: 'https://links.scenesetstudio.com/f/pilotprogram',
    primary: false,
  },
]

export default function Links() {
  return (
    <>
      <SEO
        title="Links | Scene Set Studio"
        description="Book a call or apply for the Scene Set Studio pilot program."
      />

      <div className="links-page">
        <section className="links-hub">
          <div className="links-logo">
            <img src="/sss-logo2.svg" alt="" className="links-logo__icon" aria-hidden="true" />
            <span className="links-logo__text">SceneSet<strong>Studio</strong></span>
          </div>

          <h1 className="links-title">Start here.</h1>
          <p className="links-sub">Two ways to work with us. Pick the one that fits.</p>

          <div className="links-list">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`links-btn${l.primary ? ' links-btn--primary' : ''}`}
              >
                <span className="links-btn__main">
                  <span className="links-btn__label">{l.label}</span>
                  <span className="links-btn__note">{l.note}</span>
                </span>
                <span className="links-btn__arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
