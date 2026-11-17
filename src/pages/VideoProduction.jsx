import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import './offers.css'

/* ── icons ── */
const Check = ({ none }) => (
  <svg className={`off-tick${none ? ' off-tick--none' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {none ? <path d="M5 12h14" /> : <path d="M20 6 9 17l-5-5" />}
  </svg>
)

const EVERY_ORDER = [
  'On-location filming', 'Pro lighting & audio', 'Jump cuts & pacing', 'Licensed background music',
  'Captions & subtitles', 'Colour grading', 'Platform formatting (9:16 / 16:9 / 1:1)', '1 strategy call included',
]

const SHORT_FORM = [
  {
    tier: 'Starter', count: '10', rate: '$140', total: '$1,400', shootDays: '1', revisions: '1 / video', turnaround: '10 business days', featured: false,
  },
  {
    tier: 'Growth', count: '20', rate: '$130', total: '$2,600', shootDays: '2', revisions: '2 / video', turnaround: '14 business days', featured: true,
  },
  {
    tier: 'Scale', count: '40', rate: '$120', total: '$4,800', shootDays: '4', revisions: '2 / video', turnaround: '21 business days', featured: false,
  },
]

const LONG_FORM = [
  { count: '2', rate: '$450', len: 'Up to 10 min' },
  { count: '4', rate: '$400', len: 'Up to 20 min' },
  { count: '8', rate: '$350', len: 'Up to 30 min' },
]

const PRODUCTION_ADDONS = [
  { label: 'Additional shoot day', price: '+$400 flat' },
  { label: 'Drone footage', price: '+$150 / shoot' },
  { label: 'Motion graphics', price: '+$40 / video' },
  { label: 'Bilingual subtitles EN/FR', price: '+$20 / video' },
  { label: 'Rush delivery 48h', price: '+$30 / video' },
]

export default function VideoProduction() {
  return (
    <>
      <SEO
        title="Video Production | Scene Set Studio"
        description="Full-service video production — filming and editing bundled, strategy included. All prices in CAD."
      />

      <div className="off-page">
        <section className="off-section off-section--alt">
          <div className="off-wrap">

            <header className="off-head">
              <p className="off-eyebrow"><Link to="/offers" className="off-back-link">← Packages</Link> · Standalone</p>
              <h1 className="off-title">Video <em>Production</em></h1>
              <p className="off-sub">
                We shoot it. We edit it. Full production — filming through final cut, strategy included.
              </p>
            </header>

            {/* Every order includes */}
            <div className="off-includes">
              <div className="off-includes__label">Every order includes</div>
              <div className="off-includes__grid">
                {EVERY_ORDER.map((item) => (
                  <div key={item} className="off-includes__item">
                    <Check />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Short-form */}
            <h3 className="off-sf-label">Short-Form</h3>
            <p className="off-sf-note">Reels · TikToks · YouTube Shorts</p>
            <div className="off-sf-grid">
              {SHORT_FORM.map((c) => (
                <article key={c.tier} className={`off-edit-card${c.featured ? ' off-edit-card--featured' : ''}`}>
                  {c.featured && <span className="off-badge">Most Popular</span>}
                  <div className="off-edit-card__tier">{c.tier}</div>
                  <div className="off-edit-card__count">{c.count}</div>
                  <div className="off-edit-card__count-label">Videos</div>
                  <div className="off-edit-card__rate">{c.rate} <span>CAD / video</span></div>
                  <div className="off-edit-card__total">{c.total} total</div>
                  <div className="off-edit-card__meta">
                    <div className="off-edit-card__meta-row"><span>Shoot days</span><span>{c.shootDays}</span></div>
                    <div className="off-edit-card__meta-row"><span>Turnaround</span><span>{c.turnaround}</span></div>
                    <div className="off-edit-card__meta-row"><span>Revisions</span><span>{c.revisions}</span></div>
                  </div>
                  <Link to="/booking" className={`off-btn off-edit-card__cta${c.featured ? ' off-btn--solid' : ''}`}>
                    Get Plan
                  </Link>
                </article>
              ))}
            </div>

            {/* Long-form */}
            <div className="off-lf-block">
              <h3 className="off-sf-label">Long-Form</h3>
              <p className="off-sf-note">YouTube · Podcasts · Brand Videos</p>
              <div className="off-lf-grid">
                {LONG_FORM.map((t) => (
                  <div key={t.count} className="off-lf-tile">
                    <div className="off-lf-tile__count">{t.count}<small>Videos</small></div>
                    <div className="off-lf-tile__right">
                      <div className="off-lf-tile__rate">{t.rate} <span>/ video</span></div>
                      <div className="off-lf-tile__len">{t.len}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Production add-ons */}
            <div className="off-edit-addons">
              {PRODUCTION_ADDONS.map((a) => (
                <div key={a.label} className="off-edit-addon">
                  {a.label} <strong>{a.price}</strong>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="off-cta">
              <h3 className="off-cta__head">Ready for full production, handled?</h3>
              <p className="off-cta__sub">Start with 1 shoot day.</p>
              <div className="off-cta__actions">
                <Link to="/booking" className="off-btn off-btn--solid">Get Plan</Link>
                <Link to="/work" className="off-btn">See Sample Work</Link>
              </div>
            </div>

          </div>
        </section>
      </div>

      <div style={{ position: 'relative', zIndex: 5 }}>
        <Footer />
      </div>
    </>
  )
}
