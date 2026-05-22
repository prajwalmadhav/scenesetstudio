import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const ADMIN_PASSWORD = 'sss2026'

const STATUSES = ['Lead', 'Pitched', 'Follow-up', 'Won', 'Lost']

const STATUS_COLORS = {
  Lead:       { bg: 'rgba(245,200,66,0.12)',  border: 'rgba(245,200,66,0.4)',  text: '#F5C842' },
  Pitched:    { bg: 'rgba(99,130,255,0.12)',  border: 'rgba(99,130,255,0.4)',  text: '#6382FF' },
  'Follow-up':{ bg: 'rgba(255,160,50,0.12)',  border: 'rgba(255,160,50,0.4)',  text: '#FFA032' },
  Won:        { bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.4)',   text: '#22C55E' },
  Lost:       { bg: 'rgba(212,0,30,0.12)',    border: 'rgba(212,0,30,0.35)',   text: '#D4001E' },
}

const empty = () => ({ id: Date.now(), client: '', company: '', service: '', budget: '', status: 'Lead', notes: '', date: new Date().toISOString().split('T')[0] })

const inputCls = {
  background: '#0f0f0f',
  border: '1px solid #1e1e1e',
  color: '#F2F0EB',
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  fontWeight: 300,
  padding: '10px 14px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
}

const labelCls = {
  fontFamily: 'var(--font-body)',
  fontSize: '10px',
  letterSpacing: '0.14em',
  color: 'rgba(242,240,235,0.3)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '6px',
}

/* ── Password Gate ── */
function PasswordGate({ onUnlock }) {
  const [pw, setPw]     = useState('')
  const [err, setErr]   = useState(false)
  const [show, setShow] = useState(false)

  function attempt(e) {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('sss_admin', '1')
      onUnlock()
    } else {
      setErr(true)
      setPw('')
      setTimeout(() => setErr(false), 1800)
    }
  }

  return (
    <div style={{ minHeight: '100dvh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '32px' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(242,240,235,0.3)', marginBottom: '12px' }}>Scene Set Studio</p>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, color: '#F2F0EB', letterSpacing: '-0.03em', margin: 0 }}>Admin</h1>
      </div>

      <form onSubmit={attempt} style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', maxWidth: '320px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type={show ? 'text' : 'password'}
            placeholder="Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            autoFocus
            style={{
              ...inputCls,
              border: `1px solid ${err ? '#D4001E' : '#1e1e1e'}`,
              paddingRight: '44px',
              letterSpacing: show ? 0 : '0.15em',
            }}
            onFocus={e => e.target.style.borderColor = err ? '#D4001E' : 'rgba(242,240,235,0.25)'}
            onBlur={e => e.target.style.borderColor = err ? '#D4001E' : '#1e1e1e'}
          />
          <button type="button" onClick={() => setShow(s => !s)}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(242,240,235,0.3)', padding: 0 }}>
            {show ? '○' : '●'}
          </button>
        </div>
        {err && <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#D4001E', margin: 0, textAlign: 'center' }}>Incorrect password</p>}
        <button type="submit" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0a0a0a', background: '#F2F0EB', border: 'none', padding: '12px', cursor: 'pointer', transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >Enter →</button>
      </form>
    </div>
  )
}

/* ── Pitch Form Modal ── */
function PitchModal({ pitch, onSave, onClose }) {
  const [form, setForm] = useState(pitch)

  function change(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })) }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '24px' }}>
      <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '36px', width: '100%', maxWidth: '560px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '90dvh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: '#F2F0EB', margin: 0 }}>{pitch.id === form.id && !pitch.client ? 'New Pitch' : 'Edit Pitch'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(242,240,235,0.4)', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}>×</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={labelCls}>Client Name</label>
            <input name="client" value={form.client} onChange={change} placeholder="Jane Doe" style={inputCls} onFocus={e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'} onBlur={e => e.target.style.borderColor = '#1e1e1e'} />
          </div>
          <div>
            <label style={labelCls}>Company</label>
            <input name="company" value={form.company} onChange={change} placeholder="Acme Inc." style={inputCls} onFocus={e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'} onBlur={e => e.target.style.borderColor = '#1e1e1e'} />
          </div>
          <div>
            <label style={labelCls}>Service</label>
            <input name="service" value={form.service} onChange={change} placeholder="Brand Strategy" style={inputCls} onFocus={e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'} onBlur={e => e.target.style.borderColor = '#1e1e1e'} />
          </div>
          <div>
            <label style={labelCls}>Budget</label>
            <input name="budget" value={form.budget} onChange={change} placeholder="$5k – $15k" style={inputCls} onFocus={e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'} onBlur={e => e.target.style.borderColor = '#1e1e1e'} />
          </div>
          <div>
            <label style={labelCls}>Status</label>
            <select name="status" value={form.status} onChange={change} style={{ ...inputCls, cursor: 'pointer' }}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelCls}>Date</label>
            <input name="date" type="date" value={form.date} onChange={change} style={{ ...inputCls, colorScheme: 'dark' }} onFocus={e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'} onBlur={e => e.target.style.borderColor = '#1e1e1e'} />
          </div>
        </div>

        <div>
          <label style={labelCls}>Notes</label>
          <textarea name="notes" value={form.notes} onChange={change} rows={3} placeholder="Key talking points, follow-up actions..." style={{ ...inputCls, resize: 'vertical', minHeight: '80px' }} onFocus={e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'} onBlur={e => e.target.style.borderColor = '#1e1e1e'} />
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(242,240,235,0.4)', background: 'transparent', border: '1px solid #1e1e1e', padding: '10px 20px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => onSave(form)} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0a0a0a', background: '#F2F0EB', border: 'none', padding: '10px 24px', cursor: 'pointer' }}>Save Pitch</button>
        </div>
      </div>
    </div>
  )
}

/* ── Pitches Page ── */
function PitchesPage() {
  const [pitches, setPitches] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sss_pitches') || '[]') } catch { return [] }
  })
  const [modal, setModal]   = useState(null)
  const [filter, setFilter] = useState('All')

  function save(list) {
    setPitches(list)
    localStorage.setItem('sss_pitches', JSON.stringify(list))
  }

  function savePitch(form) {
    const exists = pitches.find(p => p.id === form.id)
    save(exists ? pitches.map(p => p.id === form.id ? form : p) : [form, ...pitches])
    setModal(null)
  }

  function deletePitch(id) {
    if (confirm('Delete this pitch?')) save(pitches.filter(p => p.id !== id))
  }

  const filtered = filter === 'All' ? pitches : pitches.filter(p => p.status === filter)

  const counts = STATUSES.reduce((acc, s) => ({ ...acc, [s]: pitches.filter(p => p.status === s).length }), {})

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', color: '#F2F0EB', letterSpacing: '-0.03em', margin: '0 0 6px' }}>Client Pitches</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 300, color: 'rgba(242,240,235,0.4)', margin: 0 }}>{pitches.length} total · {counts.Won || 0} won</p>
        </div>
        <button onClick={() => setModal(empty())} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0a0a0a', background: '#F2F0EB', border: 'none', padding: '10px 22px', cursor: 'pointer' }}>
          + New Pitch
        </button>
      </div>

      {/* Status filter */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['All', ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '6px 14px', border: '1px solid',
            borderColor: filter === s ? 'rgba(242,240,235,0.5)' : '#1e1e1e',
            background: filter === s ? 'rgba(242,240,235,0.06)' : 'transparent',
            color: filter === s ? '#F2F0EB' : 'rgba(242,240,235,0.35)',
            cursor: 'pointer', transition: 'all 0.15s',
          }}>
            {s} {s !== 'All' && counts[s] ? `(${counts[s]})` : s === 'All' ? `(${pitches.length})` : ''}
          </button>
        ))}
      </div>

      {/* Pitch list */}
      {filtered.length === 0 ? (
        <div style={{ padding: '64px', textAlign: 'center', border: '1px dashed #1e1e1e', color: 'rgba(242,240,235,0.2)', fontFamily: 'var(--font-body)', fontSize: '13px' }}>
          No pitches yet — add your first one
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {filtered.map(p => {
            const sc = STATUS_COLORS[p.status]
            return (
              <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto auto auto', alignItems: 'center', gap: '16px', padding: '16px 20px', background: '#0d0d0d', border: '1px solid #161616', transition: 'border-color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#2a2a2a'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#161616'}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: '#F2F0EB', margin: '0 0 2px' }}>{p.client || '—'}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '12px', color: 'rgba(242,240,235,0.35)', margin: 0 }}>{p.company}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '12px', color: 'rgba(242,240,235,0.5)', margin: '0 0 2px' }}>{p.service}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '12px', color: 'rgba(242,240,235,0.3)', margin: 0 }}>{p.budget}</p>
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text, whiteSpace: 'nowrap' }}>
                  {p.status}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(242,240,235,0.25)', whiteSpace: 'nowrap' }}>{p.date}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => setModal(p)} style={{ background: 'none', border: '1px solid #1e1e1e', color: 'rgba(242,240,235,0.4)', padding: '5px 10px', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-body)', transition: 'color 0.15s, border-color 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#F2F0EB'; e.currentTarget.style.borderColor = '#333' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,240,235,0.4)'; e.currentTarget.style.borderColor = '#1e1e1e' }}
                  >Edit</button>
                  <button onClick={() => deletePitch(p.id)} style={{ background: 'none', border: '1px solid #1e1e1e', color: 'rgba(212,0,30,0.5)', padding: '5px 10px', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-body)', transition: 'color 0.15s, border-color 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#D4001E'; e.currentTarget.style.borderColor = 'rgba(212,0,30,0.3)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(212,0,30,0.5)'; e.currentTarget.style.borderColor = '#1e1e1e' }}
                  >Del</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {modal && <PitchModal pitch={modal} onSave={savePitch} onClose={() => setModal(null)} />}
    </div>
  )
}

/* ── Coming Soon placeholder ── */
function ComingSoon({ label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '12px', border: '1px dashed #1e1e1e', color: 'rgba(242,240,235,0.2)' }}>
      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Coming soon</span>
    </div>
  )
}

const SERVICES = [
  { index: '01', label: 'Brand Strategy',    bg: 'BRAND',   tagline: 'Identity that commands attention.', description: 'We build the strategic foundation your brand stands on — from positioning and messaging to visual language that makes you unmistakable in any market.', deliverables: ['Brand Positioning', 'Messaging Framework', 'Visual Identity', 'Brand Guidelines', 'Competitive Analysis'] },
  { index: '02', label: 'Content Production',bg: 'CONTENT', tagline: 'Stories that stop the scroll.',     description: 'From concept to final cut, we produce high-impact content built for the platforms your audience lives on — crafted to convert, not just impress.',     deliverables: ['Campaign Concepts', 'Copywriting', 'Photography Direction', 'Short-Form Content', 'Content Calendar'] },
  { index: '03', label: 'Paid Advertising',  bg: 'PAID',    tagline: 'Every dollar working harder.',     description: 'Data-driven ad campaigns across Meta, Google, and beyond. We build, test, and scale paid systems that consistently beat your cost-per-acquisition targets.', deliverables: ['Media Buying', 'Ad Creative', 'Audience Strategy', 'A/B Testing', 'Performance Reporting'] },
  { index: '04', label: 'Social Media',      bg: 'SOCIAL',  tagline: 'Presence that builds equity.',     description: 'We manage your social presence end-to-end — turning followers into fans and platforms into revenue channels through consistent, on-brand storytelling.',  deliverables: ['Channel Strategy', 'Content Creation', 'Community Management', 'Influencer Partnerships', 'Monthly Analytics'] },
  { index: '05', label: 'Web Design',        bg: 'WEB',     tagline: 'Interfaces that earn trust.',      description: "Conversion-focused web experiences designed and developed to match your brand's ambition — fast, beautiful, and built to perform.",                     deliverables: ['UX Strategy', 'UI Design', 'Framer / Webflow Dev', 'Motion Design', 'CRO Optimisation'] },
  { index: '06', label: 'Video Production',  bg: 'VIDEO',   tagline: 'Cinematic. Commercial. Compelling.', description: 'Full-service video production from pre-production through final delivery — brand films, reels, product videos and everything in between.',           deliverables: ['Concept Development', 'Scripting & Storyboard', 'On-Location Shoot', 'Edit & Colour Grade', 'Motion Graphics'] },
]

function ServicesPitch() {
  const [active, setActive] = useState(0)
  const contentRef = useRef(null)
  const bgTextRef  = useRef(null)
  const svc = SERVICES[active]

  function goTo(index) {
    if (index === active) return
    setActive(index)
  }

  useEffect(() => {
    if (!contentRef.current) return
    gsap.fromTo(
      contentRef.current.querySelectorAll('.svc-animate'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.55, ease: 'power3.out' }
    )
  }, [active])

  useEffect(() => {
    if (!bgTextRef.current) return
    gsap.fromTo(
      bgTextRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
    )
  }, [active])

  return (
    <div style={{ paddingTop: 0 }}>
      <section className="svc-section" id="services-pitch">

        <div className="svc-bg-text-wrap">
          <span ref={bgTextRef} className="svc-bg-text svc-bg-text--h">{svc.bg}</span>
          <span className="svc-bg-text svc-bg-text--v">SERVICES</span>
        </div>

        <div className="svc-top-row">
          <span className="svc-eyebrow">What we do</span>
          <span className="svc-counter">{svc.index} <span>/</span> 06</span>
        </div>

        <div ref={contentRef} className="svc-body">
          <div className="svc-left">
            <div className="svc-left-vertical">
              <span className="svc-vertical-label svc-animate">{svc.label}</span>
              <span className="svc-vertical-line" />
            </div>
            <div className="svc-left-content">
              <p className="svc-index svc-animate">{svc.index}</p>
              <h2 className="svc-title svc-animate">{svc.label}</h2>
              <p className="svc-tagline svc-animate">{svc.tagline}</p>
              <p className="svc-desc svc-animate">{svc.description}</p>
            </div>
          </div>

          <div className="svc-right">
            <p className="svc-deliverables-label svc-animate">Deliverables</p>
            <ul className="svc-deliverables">
              {svc.deliverables.map((d, i) => (
                <li key={d} className="svc-deliverable svc-animate" style={{ transitionDelay: `${i * 0.04}s` }}>
                  <span className="svc-deliverable__dot" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav className="svc-nav">
          {SERVICES.map((s, i) => (
            <button
              key={s.index}
              className={`svc-nav-btn${i === active ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={s.label}
            >
              <span className="svc-nav-btn__num">{s.index}</span>
              <span className="svc-nav-btn__label">{s.label}</span>
              <span className="svc-nav-btn__line" />
            </button>
          ))}
        </nav>

      </section>
    </div>
  )
}

const NAV_ITEMS = [
  { id: 'pitches',  label: 'Client Pitches',  icon: '◈' },
  { id: 'services', label: 'Services Pitch',  icon: '◇' },
  { id: 'invoices', label: 'Invoices',         icon: '◉', soon: true },
  { id: 'assets',   label: 'Assets',           icon: '◻', soon: true },
  { id: 'tasks',    label: 'Tasks',            icon: '▣', soon: true },
]

/* ── Dashboard shell ── */
function Dashboard({ onLogout }) {
  const [page, setPage] = useState('pitches')

  return (
    <div style={{ minHeight: '100dvh', background: '#080808', display: 'flex', fontFamily: 'var(--font-body)' }}>

      {/* Sidebar */}
      <aside style={{ width: '220px', flexShrink: 0, background: '#0a0a0a', borderRight: '1px solid #161616', display: 'flex', flexDirection: 'column', padding: '32px 0' }}>
        <div style={{ padding: '0 24px 28px', borderBottom: '1px solid #161616', marginBottom: '16px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(242,240,235,0.25)', margin: '0 0 4px' }}>Scene Set Studio</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, color: '#F2F0EB', margin: 0, letterSpacing: '-0.02em' }}>Admin</p>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 12px' }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => !item.soon && setPage(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 12px', background: page === item.id ? 'rgba(242,240,235,0.06)' : 'transparent',
                border: page === item.id ? '1px solid rgba(242,240,235,0.1)' : '1px solid transparent',
                color: item.soon ? 'rgba(242,240,235,0.2)' : page === item.id ? '#F2F0EB' : 'rgba(242,240,235,0.45)',
                cursor: item.soon ? 'default' : 'pointer', textAlign: 'left', width: '100%',
                fontSize: '12px', fontFamily: 'var(--font-body)', fontWeight: page === item.id ? 500 : 400,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!item.soon && page !== item.id) e.currentTarget.style.color = '#F2F0EB' }}
              onMouseLeave={e => { if (!item.soon && page !== item.id) e.currentTarget.style.color = 'rgba(242,240,235,0.45)' }}
            >
              <span style={{ fontSize: '14px', opacity: 0.7 }}>{item.icon}</span>
              {item.label}
              {item.soon && <span style={{ marginLeft: 'auto', fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(242,240,235,0.2)' }}>soon</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding: '16px 12px 0', borderTop: '1px solid #161616', marginTop: '16px' }}>
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', background: 'none', border: 'none', color: 'rgba(242,240,235,0.25)', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-body)', padding: '8px 12px', letterSpacing: '0.08em', transition: 'color 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#D4001E'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(242,240,235,0.25)'}
          >
            ← Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '48px', overflowY: 'auto', maxWidth: '1100px' }}>
        {page === 'pitches'  && <PitchesPage />}
        {page === 'services' && <ServicesPitch />}
        {page === 'invoices' && <ComingSoon label="Invoices" />}
        {page === 'assets'   && <ComingSoon label="Assets" />}
        {page === 'tasks'    && <ComingSoon label="Tasks" />}
      </main>
    </div>
  )
}

/* ── Root ── */
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('sss_admin') === '1')

  function logout() {
    sessionStorage.removeItem('sss_admin')
    setAuthed(false)
  }

  if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />
  return <Dashboard onLogout={logout} />
}
