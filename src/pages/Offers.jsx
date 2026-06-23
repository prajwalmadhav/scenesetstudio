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

/* ── Section 1 data ── */
const SERVICE_PILLS = [
  'Creative Strategy', 'Videography', 'Video Editing', 'Graphic Design',
  'Social Management', 'Meta Ads', 'Ad Creatives', 'Funnels',
]

const PACKAGES = [
  {
    name: 'Standard',
    tagline: 'Consistent content, handled.',
    ideal: 'Ideal for restaurants, cafés, salons & local service businesses.',
    amount: '$1,500',
    featured: false,
    groups: [
      { label: 'Creative Strategy', items: ['1 strategy call / month'] },
      { label: 'Videography', items: ['1 shoot day / month'] },
      { label: 'Video Editing', items: ['8 short-form videos', 'Full edit — cuts, captions, colour, music', '2 revisions'] },
      { label: 'Graphics & Design', items: ['4 branded static posts', 'Stories graphics'] },
      { label: 'Social Media Management', items: ['Posting & scheduling on IG + FB', 'Monthly performance report'] },
      { label: 'Meta Ads', items: ['No ads included'], none: true },
    ],
  },
  {
    name: 'Growth',
    tagline: 'A content + ads engine.',
    ideal: 'Ideal for businesses ready for a content + ads engine.',
    amount: '$2,500',
    featured: true,
    groups: [
      { label: 'Creative Strategy', items: ['2 strategy calls / month'] },
      { label: 'Videography', items: ['2 shoot days'] },
      { label: 'Video Editing', items: ['16 videos', '3 revisions'] },
      { label: 'Motion Graphics', items: ['Basic motion graphics'] },
      { label: 'Graphics & Design', items: ['8 posts', 'Daily stories'] },
      { label: 'Social Media Management', items: ['Full scheduling on IG + FB + TikTok', 'Community management', 'Bi-weekly reports'] },
      { label: 'Meta Ads', items: ['Up to 3 campaigns', 'Audience targeting', 'A/B testing', 'Optimization + reporting'] },
      { label: 'Ad Creatives', items: ['6 ad creatives'] },
    ],
  },
  {
    name: 'Premium',
    tagline: 'Full-funnel brand growth.',
    ideal: 'Ideal for professional services & established brands.',
    amount: '$4,500',
    featured: false,
    groups: [
      { label: 'Creative Strategy', items: ['Weekly strategy calls'] },
      { label: 'Videography', items: ['4 shoot days', 'Quarterly in-person shoot day'] },
      { label: 'Video Editing', items: ['24+ videos', 'Unlimited revisions'] },
      { label: 'Motion Graphics', items: ['Full motion graphics'] },
      { label: 'Graphics & Design', items: ['16+ posts'] },
      { label: 'Social Media Management', items: ['All platforms', 'Daily community management', 'Weekly reports'] },
      { label: 'Meta Ads', items: ['Full Meta funnel — unlimited campaigns', 'Awareness → conversion → retargeting'] },
      { label: 'Ad Creatives', items: ['Full ad creative suite (10+ creatives)'] },
      { label: 'Funnels', items: ['1 landing page / funnel per quarter'] },
    ],
  },
]

const COMPARE_ROWS = [
  { feature: 'Shoot days / month', values: ['1', '2', '4'] },
  { feature: 'Short-form videos', values: ['8', '16', '24+'] },
  { feature: 'Revisions', values: ['2', '3', 'Unlimited'] },
  { feature: 'Motion graphics', values: ['—', 'Basic', 'Full'] },
  { feature: 'Branded static posts', values: ['4', '8', '16+'] },
  { feature: 'Stories', values: ['Graphics', 'Daily', 'Daily'] },
  { feature: 'Platforms', values: ['IG + FB', 'IG + FB + TikTok', 'All platforms'] },
  { feature: 'Community management', values: ['—', '✓', 'Daily'] },
  { feature: 'Reporting', values: ['Monthly', 'Bi-weekly', 'Weekly'] },
  { feature: 'Meta Ads', values: ['—', 'Up to 3 campaigns', 'Unlimited'] },
  { feature: 'Ad creatives', values: ['—', '6', '10+'] },
  { feature: 'Funnel / landing page', values: ['—', '—', '1 / quarter'] },
  { feature: 'Strategy calls', values: ['1 / mo', '2 / mo', 'Weekly'] },
  { feature: 'In-person shoot', values: ['—', '—', 'Quarterly'] },
]

const STANDALONE = [
  { name: 'Website', price: 'From $1,500' },
  { name: 'AI Services & Automation', price: 'Custom' },
  { name: 'Funnel Build', price: 'From $1,200' },
  { name: 'Brand Photography', price: 'From $600' },
  { name: 'Brand Identity', price: 'From $800' },
  { name: 'Social Media Audit', price: '$250 one-time' },
]

export default function Offers() {
  return (
    <>
      <SEO
        title="Packages & Pricing | Scene Set Studio"
        description="Video-first social media packages and standalone video editing for local business. All prices in CAD."
      />

      <div className="off-page">

        {/* ───────────── SECTION 1 — Agency Packages ───────────── */}
        <section className="off-section">
          <div className="off-wrap">

            <header className="off-head">
              <p className="off-eyebrow">Packages</p>
              <h1 className="off-title">Video-First Social Media<br /><em>Packages for Business</em></h1>
              <p className="off-sub">
                One team for the whole pipeline — creative strategy, shooting, editing, graphics,
                social management, and ads. You run the business; we run the content engine.
              </p>
              <div className="off-pills">
                {SERVICE_PILLS.map((p) => <span key={p} className="off-pill">{p}</span>)}
              </div>
            </header>

            <div className="off-pkg-grid">
              {PACKAGES.map((pkg) => (
                <article key={pkg.name} className={`off-card${pkg.featured ? ' off-card--featured' : ''}`}>
                  {pkg.featured && <span className="off-badge">Most Popular</span>}
                  <h2 className="off-card__name">{pkg.name}</h2>
                  <p className="off-card__tagline">{pkg.tagline}</p>
                  <p className="off-card__ideal">{pkg.ideal}</p>
                  <div className="off-card__price">
                    <span className="off-card__amount">{pkg.amount}</span>
                    <span className="off-card__per">/ month</span>
                  </div>
                  <span className="off-card__cad">CAD</span>

                  <Link to="/booking" className={`off-btn off-btn--sm off-card__cta-top${pkg.featured ? ' off-btn--solid' : ''}`}>
                    Get started
                  </Link>

                  <div className="off-divider" />

                  <div className="off-groups">
                    {pkg.groups.map((g) => (
                      <div key={g.label} className="off-group">
                        <div className="off-group__label">{g.label}</div>
                        <ul className="off-group__items">
                          {g.items.map((item) => (
                            <li key={item} className={`off-group__item${g.none ? ' off-group__item--none' : ''}`}>
                              <Check none={g.none} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <p className="off-card__addons">Add-ons available</p>
                  <Link to="/booking" className={`off-btn off-card__cta${pkg.featured ? ' off-btn--solid' : ''}`}>
                    Get started
                  </Link>
                </article>
              ))}
            </div>

            {/* Comparison table */}
            <div className="off-compare">
              <h3 className="off-compare__title">Compare what's included</h3>
              <table className="off-table">
                <thead>
                  <tr>
                    <th />
                    <th>Standard</th>
                    <th className="off-table__feat">Growth</th>
                    <th>Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row.feature}>
                      <th scope="row">{row.feature}</th>
                      {row.values.map((v, i) => (
                        <td key={i} className={i === 1 ? 'off-cell--feat' : undefined}>
                          {v === '—'
                            ? <span className="off-cell-dash">—</span>
                            : v === '✓'
                              ? <span className="off-cell-check">✓</span>
                              : v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add-ons & standalone */}
            <div className="off-addons-block">
              <h3 className="off-block-title">Add-ons & standalone services</h3>
              <p className="off-block-sub">Bolt onto any package or book on their own. All prices CAD.</p>
              <div className="off-addons-grid">
                {STANDALONE.map((a) => (
                  <div key={a.name} className="off-addon">
                    <div className="off-addon__name">{a.name}</div>
                    <div className="off-addon__price">{a.price} <span className="off-addon__cad">CAD</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark CTA */}
            <div className="off-cta">
              <h3 className="off-cta__head">Not sure which package fits?</h3>
              <p className="off-cta__sub">Book a free 20-min discovery call and we'll map it to your goals.</p>
              <div className="off-cta__actions">
                <Link to="/booking" className="off-btn off-btn--solid">Book a discovery call</Link>
              </div>
            </div>

          </div>
        </section>

        {/* ───────────── Standalone editing — link out ───────────── */}
        <div className="off-section-divider"><span>Or just need edits?</span></div>
        <div className="off-wrap">
          <div className="off-cta">
            <h3 className="off-cta__head">Video Editing — Only</h3>
            <p className="off-cta__sub">You shoot it, we edit it. Short-form & long-form editing, no strategy or management.</p>
            <div className="off-cta__actions">
              <Link to="/offers/videoediting" className="off-btn off-btn--solid">View editing rates →</Link>
            </div>
          </div>
        </div>

      </div>

      <div style={{ position: 'relative', zIndex: 5 }}>
        <Footer />
      </div>
    </>
  )
}
