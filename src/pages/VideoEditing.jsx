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
  'Jump cuts & pacing', 'Licensed background music', 'Captions & subtitles', 'Colour grading',
  'Audio cleanup', 'Platform formatting (9:16 / 16:9 / 1:1)', 'Text overlays & lower thirds', 'Transitions & B-roll sync',
]

const SHORT_FORM = [
  {
    tier: 'Starter', count: '10', rate: '$75', total: '$750', revisions: '1 / video', turnaround: '7 business days', featured: false,
  },
  {
    tier: 'Growth', count: '15–20', rate: '$70', total: '$1,050–$1,400', revisions: '2 / video', turnaround: '10 business days', featured: true,
  },
  {
    tier: 'Scale', count: '40', rate: '$60', total: '$2,400', revisions: '2 / video', turnaround: '14 business days', featured: false,
  },
]

const LONG_FORM = [
  { count: '4', rate: '$175', len: 'Up to 10 min' },
  { count: '8', rate: '$155', len: 'Up to 20 min' },
  { count: '16', rate: '$135', len: 'Up to 30 min' },
]

const EDIT_ADDONS = [
  { label: 'Motion graphics', price: '+$40 / video' },
  { label: 'Bilingual subtitles EN/FR', price: '+$20 / video' },
  { label: 'Rush delivery 48h', price: '+$30 / video' },
  { label: 'Voiceover sync', price: '+$25 / video' },
  { label: 'Custom branded template', price: '$150 flat (one-time)' },
]

export default function VideoEditing() {
  return (
    <>
      <SEO
        title="Video Editing Only | Scene Set Studio"
        description="Standalone video editing for short-form and long-form. You shoot it, we edit it. All prices in CAD."
      />

      <div className="off-page">
        <section className="off-section off-section--alt">
          <div className="off-wrap">

            <header className="off-head">
              <p className="off-eyebrow"><Link to="/offers" className="off-back-link">← Packages</Link> · Standalone</p>
              <h1 className="off-title">Video Editing <em>Only</em></h1>
              <p className="off-sub">
                You shoot it. We edit it. No strategy, no ads, no management. Just clean edits.
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
                    <div className="off-edit-card__meta-row"><span>Turnaround</span><span>{c.turnaround}</span></div>
                    <div className="off-edit-card__meta-row"><span>Revisions</span><span>{c.revisions}</span></div>
                  </div>
                  <Link to="/quick-contact" className={`off-btn off-edit-card__cta${c.featured ? ' off-btn--solid' : ''}`}>
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

            {/* Editing add-ons */}
            <div className="off-edit-addons">
              {EDIT_ADDONS.map((a) => (
                <div key={a.label} className="off-edit-addon">
                  {a.label} <strong>{a.price}</strong>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="off-cta">
              <h3 className="off-cta__head">Ready to clear your content backlog?</h3>
              <p className="off-cta__sub">Start with 10 videos.</p>
              <div className="off-cta__actions">
                <Link to="/quick-contact" className="off-btn off-btn--solid">Get Plan</Link>
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
