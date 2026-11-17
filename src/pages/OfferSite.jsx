import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { loadCal, CAL_LINK } from '../lib/cal'
import {
  CONTACT, AREAS, VIDEOS, PACKAGES, TABS, EDITING, TERMS, STEPS,
  TESTIMONIALS, MAIN_PAGE, AUDIENCES,
} from '../lib/offerData'
import './offer-site.css'

const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = 'b44a455f-02a4-48e4-b5e5-8ec134f81fc3'
const CAL_CONFIG = JSON.stringify({ layout: 'month_view', theme: 'dark' })

const money = (n) => '$' + n.toLocaleString('en-CA')

function priceText(p) {
  const prefix = p.prefix === undefined ? 'From ' : p.prefix
  const range = p.priceMax ? `${money(p.price)} to ${money(p.priceMax)}` : money(p.price)
  return `${prefix}${range}${p.per ? ' ' + p.per : ''}`
}

const Tick = () => (
  <svg className="os-tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

/* ── Video tile (placeholder until a src exists) ── */
function VideoTile({ v, hero }) {
  return (
    <figure className={`os-video${hero ? ' os-video--hero' : ''}`}>
      <div className="os-video__frame">
        {v.src ? (
          <video src={v.src} poster={v.poster} controls playsInline preload="metadata" muted={hero} loop={hero} autoPlay={hero} />
        ) : (
          <div className="os-video__ph">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            <span>Video coming soon</span>
          </div>
        )}
      </div>
      <figcaption>
        <strong>{v.title}</strong>
        <span>{v.caption}</span>
      </figcaption>
    </figure>
  )
}

/* ── One package card ── */
function PackageCard({ id, onRequest }) {
  const p = PACKAGES[id]
  return (
    <article className={`os-card${p.badge ? ' os-card--feat' : ''}`}>
      {p.badge && <span className="os-badge">{p.badge}</span>}
      <h4 className="os-card__name">{p.name}</h4>
      <div className="os-card__price">{priceText(p)}</div>
      <ul className="os-card__list">
        {p.includes.map((i) => <li key={i}><Tick />{i}</li>)}
      </ul>
      {p.goodFor && <p className="os-card__good"><span>Good for</span>{p.goodFor}</p>}
      <button type="button" className="os-btn os-btn--ghost" onClick={() => onRequest(p.name)}>
        {p.cta || 'Request this package'}
      </button>
    </article>
  )
}

/* ── Editing: slider + rate table ── */
function EditingPanel({ onRequest }) {
  const [count, setCount] = useState(12)
  const [grade, setGrade] = useState('basic')
  const base = EDITING.tiers[0]
  const tier = EDITING.tiers.find((t) => t.count === count)
  const rate = tier[grade]
  const saved = Math.round((1 - rate / base[grade]) * 100)
  const label = grade === 'basic' ? 'Basic cuts' : 'Polished'

  return (
    <div className="os-edit">
      <div className="os-seg" role="group" aria-label="Editing level">
        {['basic', 'polished'].map((g) => (
          <button key={g} type="button" className={grade === g ? 'is-on' : ''} onClick={() => setGrade(g)}>
            {g === 'basic' ? 'Basic cuts' : 'Polished'}
            <small>{g === 'basic' ? EDITING.basicDesc : EDITING.polishedDesc}</small>
          </button>
        ))}
      </div>

      <div className="os-edit__panel">
        <div className="os-edit__count">
          <b>{count}</b> videos
          {tier.popular && <span className="os-badge os-badge--inline">Most popular, best rate</span>}
        </div>
        <input
          type="range"
          className="os-range"
          min={EDITING.sliderMin}
          max={EDITING.sliderMax}
          step={EDITING.sliderStep}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          aria-label="Number of videos"
        />
        <div className="os-range__ticks">
          {[8, 10, 12].map((n) => <span key={n}>{n}{n === 12 ? ' ★' : ''}</span>)}
        </div>
        <div className="os-edit__result">
          <div>
            <div className="os-edit__rate">{money(rate)}<small> / video</small></div>
            <div className="os-edit__total">{money(rate * count)} total · {label.toLowerCase()}</div>
          </div>
          {saved > 0 && <div className="os-edit__save">Save {saved}% vs. the {base.count}-video rate ({money(base[grade])})</div>}
        </div>
        <button type="button" className="os-btn" onClick={() => onRequest(`Editing: ${count} videos, ${label}`)}>
          Request this package
        </button>
      </div>

      <div className="os-table" role="table" aria-label="Editing rates per video">
        <div className="os-table__row os-table__row--head" role="row">
          <span>Package</span><span>Basic cuts</span><span>Polished</span>
        </div>
        {EDITING.tiers.map((t) => (
          <div key={t.count} className={`os-table__row${t.popular ? ' is-pop' : ''}`} role="row">
            <span>{t.count} videos{t.popular ? ' (most popular, best rate)' : ''}</span>
            <span>{money(t.basic)}</span>
            <span>{money(t.polished)}</span>
          </div>
        ))}
        <div className="os-table__row" role="row"><span>25 or more on a contract</span><span className="os-span2">Contact us</span></div>
      </div>
      <p className="os-note">{EDITING.longForm}</p>
      <button type="button" className="os-btn os-btn--ghost" onClick={() => onRequest('Editing: 25+ videos on contract')}>
        Ask about a contract
      </button>
    </div>
  )
}

/* ── Packages (tabs) ── */
function Packages({ tabs, onRequest }) {
  const resolved = useMemo(
    () => tabs.map((t) => (typeof t === 'string' ? { id: t } : t)),
    [tabs],
  )
  const [active, setActive] = useState(resolved[0].id)
  const cur = resolved.find((t) => t.id === active) || resolved[0]
  const tab = TABS[cur.id]
  const ids = (tab.pkgs || []).filter((id) => !cur.only || cur.only.includes(id))

  const main = ids.filter((id) => !PACKAGES[id].group)
  const grouped = {}
  ids.forEach((id) => { const g = PACKAGES[id].group; if (g) (grouped[g] = grouped[g] || []).push(id) })

  const grid = (list) => (
    <div className={`os-grid os-grid--${Math.min(list.length, 4)}`}>
      {list.map((id) => <PackageCard key={id} id={id} onRequest={onRequest} />)}
    </div>
  )

  return (
    <section className="os-section" id="packages">
      <div className="os-wrap">
        <p className="os-eyebrow">Packages</p>
        <h2 className="os-h2">Pick a package.</h2>
        <p className="os-lead">Starter prices in CAD while the portfolio is being built.</p>

        {resolved.length > 1 && (
          <div className="os-tabs" role="tablist" aria-label="Package categories">
            {resolved.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={t.id === cur.id}
                className={t.id === cur.id ? 'is-on' : ''}
                onClick={() => setActive(t.id)}
              >
                {TABS[t.id].label}
              </button>
            ))}
          </div>
        )}

        <div role="tabpanel" key={cur.id} className="os-panel">
          {resolved.length === 1 && <h3 className="os-h3">{tab.label}</h3>}
          <p className="os-note os-note--top">{tab.intro}</p>
          {tab.editing ? (
            <EditingPanel onRequest={onRequest} />
          ) : (
            <>
              {main.length > 0 && grid(main)}
              {Object.entries(grouped).map(([g, list]) => (
                <div key={g}>
                  <h3 className="os-h3 os-h3--sub">{tab.groups?.[g] || g}</h3>
                  {grid(list)}
                </div>
              ))}
              {tab.addons && (
                <div className="os-addons">
                  <h4>Add-ons</h4>
                  <ul>{tab.addons.map((a) => <li key={a}>{a}</li>)}</ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/* ── Contact form ── */
function ContactForm({ options, selected, setSelected }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [state, setState] = useState('idle')

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    setState('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Offer page request: ${selected || 'General'}`,
          type: 'offer-request',
          page: window.location.pathname,
          package: selected,
          ...form,
        }),
      })
      if (!res.ok) throw new Error('bad')
      if (typeof gtag !== 'undefined') gtag('event', 'generate_lead', { event_label: 'offer_page' })
      if (typeof fbq !== 'undefined') fbq('track', 'Lead')
      setState('sent')
    } catch {
      setState('error')
    }
  }

  return (
    <section className="os-section os-section--alt" id="contact">
      <div className="os-wrap os-wrap--narrow">
        <p className="os-eyebrow">Contact</p>
        <h2 className="os-h2">Tell us what you need.</h2>
        <p className="os-lead">
          Or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>

        {state === 'sent' ? (
          <div className="os-sent">Got it. We will reply within one business day.</div>
        ) : (
          <form className="os-form" onSubmit={submit}>
            <label>Package
              <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                <option value="">Not sure yet</option>
                {options.map((o) => <option key={o} value={o}>{o}</option>)}
                {selected && !options.includes(selected) && <option value={selected}>{selected}</option>}
              </select>
            </label>
            <label>Name<input name="name" required autoComplete="name" value={form.name} onChange={set} /></label>
            <label>Email<input name="email" type="email" required autoComplete="email" value={form.email} onChange={set} /></label>
            <label>Phone <em>(optional)</em><input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set} /></label>
            <label>What are you planning?<textarea name="message" rows="4" value={form.message} onChange={set} /></label>
            <button className="os-btn os-btn--solid" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : 'Send request'}
            </button>
            {state === 'error' && <p className="os-err">Something went wrong. Email {CONTACT.email} instead.</p>}
          </form>
        )}

        <div className="os-social">
          {CONTACT.instagram.map((i) => (
            <a key={i.href} href={i.href} target="_blank" rel="noopener noreferrer">Instagram {i.label}</a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Page ── */
export default function OfferSite({ audience }) {
  const cfg = audience ? AUDIENCES[audience] : MAIN_PAGE
  const [selected, setSelected] = useState('')

  useEffect(() => {
    const Cal = loadCal()
    Cal('init', { origin: 'https://cal.com' })
    Cal('ui', { theme: 'dark', styles: { branding: { brandColor: '#D4001E' } } })
  }, [])

  // Keep native/Lenis scroll working for in-page jumps
  const jump = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -12 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  const request = (name) => { setSelected(name); jump('contact') }

  const options = useMemo(() => {
    const out = []
    cfg.tabs.forEach((t) => {
      const id = typeof t === 'string' ? t : t.id
      const tab = TABS[id]
      if (tab.editing) { out.push('Editing: 4 videos', 'Editing: 8 videos', 'Editing: 10 videos', 'Editing: 12 videos'); return }
      tab.pkgs.filter((p) => typeof t === 'string' || !t.only || t.only.includes(p))
        .forEach((p) => out.push(PACKAGES[p].name))
    })
    return [...new Set(out)]
  }, [cfg])

  const vids = cfg.videos.map((k) => VIDEOS[k])
  const [heroVid, ...rest] = vids
  const headline = audience ? cfg.headline : 'Video production and editing for brands, agencies, and people with a story'

  return (
    <>
      <SEO
        title="Scene Set Production | Video production and editing"
        description="Video production and editing packages from Scene Set Studio. Starting prices in CAD. Ottawa, Gatineau, Toronto, Montreal and across Canada."
      />
      <div className="os-page">
        <header className="os-top">
          <Link to="/" className="os-logo">
            <img src="/sss-logo2.svg" alt="" aria-hidden="true" />
            <span>SceneSet<strong>Studio</strong></span>
          </Link>
          <button type="button" className="os-top__cta" data-cal-link={CAL_LINK} data-cal-config={CAL_CONFIG}>
            Book a shoot
          </button>
        </header>

        <section className="os-hero">
          <div className="os-wrap">
            <p className="os-eyebrow">Scene Set Production</p>
            <h1 className="os-h1">{headline}</h1>
            <p className="os-lead">{AREAS}</p>
            <div className="os-hero__actions">
              <button type="button" className="os-btn os-btn--solid" data-cal-link={CAL_LINK} data-cal-config={CAL_CONFIG}>
                Book a shoot
              </button>
              <button type="button" className="os-btn os-btn--ghost" onClick={() => jump('packages')}>
                See packages
              </button>
            </div>
            <VideoTile v={heroVid} hero />
          </div>
        </section>

        {rest.length > 0 && (
          <section className="os-section" id="work">
            <div className="os-wrap">
              <p className="os-eyebrow">Work</p>
              <h2 className="os-h2">Recent work.</h2>
              <div className={`os-work os-work--${rest.length}`}>
                {rest.map((v, i) => <VideoTile key={i} v={v} />)}
              </div>
            </div>
          </section>
        )}

        <Packages tabs={cfg.tabs} onRequest={request} />

        <section className="os-section os-section--alt">
          <div className="os-wrap">
            <p className="os-eyebrow">Booking terms</p>
            <dl className="os-terms">
              {TERMS.map((t) => (
                <div key={t.k}><dt>{t.k}</dt><dd>{t.v}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section className="os-section">
          <div className="os-wrap">
            <p className="os-eyebrow">How it works</p>
            <h2 className="os-h2">Five simple steps.</h2>
            <ol className="os-steps">
              {STEPS.map((s, i) => (
                <li key={s.t}><span>{i + 1}</span><strong>{s.t}</strong><em>{s.d}</em></li>
              ))}
            </ol>
          </div>
        </section>

        {TESTIMONIALS.length > 0 && (
          <section className="os-section os-section--alt">
            <div className="os-wrap">
              <p className="os-eyebrow">Clients</p>
              <div className="os-quotes">
                {TESTIMONIALS.map((t) => (
                  <blockquote key={t.name}>“{t.quote}”<cite>{t.name}</cite></blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactForm options={options} selected={selected} setSelected={setSelected} />

        {audience && (
          <div className="os-all">
            <Link to="/offers">See everything we do →</Link>
          </div>
        )}
        <footer className="os-foot">© Scene Set Studio · {AREAS}</footer>
      </div>
    </>
  )
}
