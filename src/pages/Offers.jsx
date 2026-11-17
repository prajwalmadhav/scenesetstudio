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
  'Social Management', 'Ads Management', 'SEO', 'Email Marketing',
]

const PACKAGES = [
  {
    name: 'Video Editing',
    tagline: 'You shoot it, we edit it.',
    ideal: 'Ideal for creators & businesses who film their own content and just need it edited — every month.',
    amount: '$75',
    per: 'per video',
    featured: false,
    groups: [
      { label: 'Videography', items: ['Not included — you shoot, we edit'], none: true },
      { label: 'Video Editing', items: ['Full edit — cuts, captions, colour, music', 'Matched to your brand\'s editing style', '1 revision round', 'Lower rate at higher monthly volume'] },
      { label: 'Content Strategy', items: ['Not included'], none: true },
      { label: 'Social Media Management', items: ['Not included'], none: true },
      { label: 'Ads Management', items: ['Not included'], none: true },
    ],
  },
  {
    name: 'Videography + Editing',
    tagline: 'One shoot day, fully edited.',
    ideal: 'Ideal for local businesses starting consistent content — restaurants, cafés, salons.',
    amount: '$850',
    per: '/ month',
    featured: false,
    groups: [
      { label: 'Videography', items: ['1 full shoot day / month'] },
      { label: 'Video Editing', items: ['6 short-form videos', 'Full edit — cuts, captions, colour, music', '1 revision round'] },
      { label: 'Graphics & Design', items: ['6 branded posts from shoot content'] },
      { label: 'Content Strategy', items: ['Not included'], none: true },
      { label: 'Ads Management', items: ['Not included'], none: true },
    ],
  },
  {
    name: 'Video Production',
    tagline: 'Content + strategy, planned monthly.',
    ideal: 'Ideal for businesses ready to stop guessing what to post.',
    amount: '$1,500',
    per: '/ month',
    featured: true,
    groups: [
      { label: 'Videography', items: ['1–2 shoot days / month'] },
      { label: 'Video Editing', items: ['10 videos', '2 revisions'] },
      { label: 'Content Strategy', items: ['Monthly strategy call', 'Content plan built on performance analysis', 'We tell you what to post & when'] },
      { label: 'Graphics & Design', items: ['6 branded posts'] },
      { label: 'Ads Management', items: ['Not included'], none: true },
    ],
  },
  {
    name: 'Full-Funnel Marketing',
    tagline: 'Full-funnel brand growth, end to end.',
    ideal: 'Ideal for brands ready to hand off content, ads, SEO & email — completely.',
    amount: '$2,500',
    per: '/ month',
    note: '+ custom, based on scope & ad spend',
    featured: false,
    groups: [
      { label: 'Videography', items: ['1–2+ shoot days / month'] },
      { label: 'Video Editing', items: ['10+ videos', 'Unlimited revisions'] },
      { label: 'Content Strategy', items: ['Monthly strategy call', 'Full content plan & performance analysis'] },
      { label: 'Social Media Management', items: ['Full account handling — posting, scheduling, community management'] },
      { label: 'Ads Management', items: ['Google, Meta & TikTok ads', 'Campaign setup, optimization & reporting'] },
      { label: 'SEO', items: ['Social, Google Business & website SEO'] },
      { label: 'Email Marketing', items: ['Campaigns & automated flows'] },
    ],
  },
]

const COMPARE_ROWS = [
  { feature: 'Shoot days / month', values: ['—', '1', '1–2', '1–2+'] },
  { feature: 'Videos / month', values: ['Volume-based', '6', '10', '10+'] },
  { feature: 'Revisions', values: ['1', '1', '2', 'Unlimited'] },
  { feature: 'Branded posts', values: ['—', '6', '6', '✓'] },
  { feature: 'Content strategy', values: ['—', '—', 'Monthly call', 'Monthly call'] },
  { feature: 'Social media management', values: ['—', '—', '—', 'Full handling'] },
  { feature: 'Ads management', values: ['—', '—', '—', 'Google + Meta + TikTok'] },
  { feature: 'SEO', values: ['—', '—', '—', 'Social + Google + Website'] },
  { feature: 'Email marketing', values: ['—', '—', '—', 'Campaigns + flows'] },
]

const ADDONS = [
  { name: 'Motion Graphics', price: '$40 / video' },
  { name: 'Bilingual Subtitles EN/FR', price: '$20 / video' },
  { name: 'Rush Delivery 48h', price: '$30 / video' },
  { name: 'Additional Shoot Day', price: '$400 flat' },
  { name: 'Drone Footage', price: '$150 / shoot' },
  { name: 'Branded Posters & Print', price: 'From $80 each' },
  { name: 'Single Ad Campaign', price: 'From $350 / month' },
  { name: 'Email Flow Setup', price: 'From $400' },
  { name: 'Social Media Audit', price: '$250 one-time' },
  { name: 'SEO Audit', price: '$300 one-time' },
  { name: 'Landing Page / Funnel Build', price: 'From $1,200' },
  { name: 'Brand Photography', price: 'From $600' },
  { name: 'Brand Identity', price: 'From $800' },
  { name: 'Website', price: 'From $1,500' },
  { name: 'AI Services & Automation', price: 'Custom' },
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
              <h1 className="off-title">Video-First Marketing<br /><em>Packages for Business</em></h1>
              <p className="off-sub">
                From editing-only to full-funnel growth — pick the level of hands-on help you need.
                You run the business; we run as much of the content + growth engine as you want.
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
                    <span className="off-card__per">{pkg.per}</span>
                  </div>
                  <span className="off-card__cad">CAD</span>
                  {pkg.note && <div className="off-card__price-note">{pkg.note}</div>}

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
                    {PACKAGES.map((pkg) => (
                      <th key={pkg.name} className={pkg.featured ? 'off-table__feat' : undefined}>{pkg.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row.feature}>
                      <th scope="row">{row.feature}</th>
                      {row.values.map((v, i) => (
                        <td key={i} className={PACKAGES[i].featured ? 'off-cell--feat' : undefined}>
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
              <h3 className="off-block-title">Add-ons for any package</h3>
              <p className="off-block-sub">Bolt onto any of the 4 packages above, or book standalone. All prices CAD.</p>
              <div className="off-addons-grid">
                {ADDONS.map((a) => (
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

        {/* ───────────── Standalone editing & production — link out ───────────── */}
        <div className="off-section-divider"><span>Want the full rate card?</span></div>
        <div className="off-wrap">
          <div className="off-standalone-grid">
            <div className="off-cta off-cta--flush">
              <h3 className="off-cta__head">Video Editing — Only</h3>
              <p className="off-cta__sub">You shoot it, we edit it. Short-form & long-form editing, no strategy or management.</p>
              <div className="off-cta__actions">
                <Link to="/offers/videoediting" className="off-btn off-btn--solid">View editing rates →</Link>
              </div>
            </div>
            <div className="off-cta off-cta--flush">
              <h3 className="off-cta__head">Video Production</h3>
              <p className="off-cta__sub">We shoot it, we edit it. Full production, strategy included.</p>
              <div className="off-cta__actions">
                <Link to="/offers/videoproduction" className="off-btn off-btn--solid">View production rates →</Link>
              </div>
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
