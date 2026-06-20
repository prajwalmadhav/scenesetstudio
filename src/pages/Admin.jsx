import { useState } from 'react'
import { getLinks, saveLinks, emptyLink } from '../lib/links'

const ADMIN_PASSWORD = 'sss2026'

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

/* ── Link Form Modal ── */
function LinkModal({ link, onSave, onClose }) {
  const [form, setForm] = useState(link)

  function change(e) {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  function submit() {
    if (!form.label.trim() || !form.href.trim()) return
    onSave({ ...form, label: form.label.trim(), note: form.note.trim(), href: form.href.trim() })
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '24px' }}>
      <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '36px', width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: '#F2F0EB', margin: 0 }}>{link.label ? 'Edit Link' : 'New Link'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(242,240,235,0.4)', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}>×</button>
        </div>

        <div>
          <label style={labelCls}>Button Label</label>
          <input name="label" value={form.label} onChange={change} placeholder="Book a Call" style={inputCls} onFocus={e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'} onBlur={e => e.target.style.borderColor = '#1e1e1e'} />
        </div>
        <div>
          <label style={labelCls}>Subtitle <span style={{ textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
          <input name="note" value={form.note} onChange={change} placeholder="Free 20-min discovery call" style={inputCls} onFocus={e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'} onBlur={e => e.target.style.borderColor = '#1e1e1e'} />
        </div>
        <div>
          <label style={labelCls}>URL</label>
          <input name="href" value={form.href} onChange={change} placeholder="https://links.scenesetstudio.com/f/..." style={inputCls} onFocus={e => e.target.style.borderColor = 'rgba(212,0,30,0.4)'} onBlur={e => e.target.style.borderColor = '#1e1e1e'} />
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(242,240,235,0.6)' }}>
          <input name="primary" type="checkbox" checked={form.primary} onChange={change} style={{ accentColor: '#D4001E', width: '16px', height: '16px', cursor: 'pointer' }} />
          Highlight as primary (red) button
        </label>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '4px' }}>
          <button onClick={onClose} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(242,240,235,0.4)', background: 'transparent', border: '1px solid #1e1e1e', padding: '10px 20px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={submit} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0a0a0a', background: '#F2F0EB', border: 'none', padding: '10px 24px', cursor: 'pointer' }}>Save Link</button>
        </div>
      </div>
    </div>
  )
}

/* ── Links Manager ── */
function LinksManager() {
  const [links, setLinks] = useState(getLinks)
  const [modal, setModal] = useState(null)

  function persist(list) {
    setLinks(list)
    saveLinks(list)
  }

  function save(form) {
    const exists = links.find(l => l.id === form.id)
    persist(exists ? links.map(l => l.id === form.id ? form : l) : [...links, form])
    setModal(null)
  }

  function remove(id) {
    if (confirm('Remove this link button?')) persist(links.filter(l => l.id !== id))
  }

  function move(index, dir) {
    const next = index + dir
    if (next < 0 || next >= links.length) return
    const list = [...links]
    ;[list[index], list[next]] = [list[next], list[index]]
    persist(list)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', color: '#F2F0EB', letterSpacing: '-0.03em', margin: '0 0 6px' }}>Links Page</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 300, color: 'rgba(242,240,235,0.4)', margin: 0 }}>
            {links.length} button{links.length === 1 ? '' : 's'} · live at <a href="/links" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(242,240,235,0.6)' }}>/links ↗</a>
          </p>
        </div>
        <button onClick={() => setModal(emptyLink())} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0a0a0a', background: '#F2F0EB', border: 'none', padding: '10px 22px', cursor: 'pointer' }}>
          + New Link
        </button>
      </div>

      {links.length === 0 ? (
        <div style={{ padding: '64px', textAlign: 'center', border: '1px dashed #1e1e1e', color: 'rgba(242,240,235,0.2)', fontFamily: 'var(--font-body)', fontSize: '13px' }}>
          No links yet — add your first button
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {links.map((l, i) => (
            <div key={l.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', alignItems: 'center', gap: '16px', padding: '16px 20px', background: '#0d0d0d', border: '1px solid #161616', transition: 'border-color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#2a2a2a'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#161616'}
            >
              {/* reorder */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <button onClick={() => move(i, -1)} disabled={i === 0} style={{ background: 'none', border: 'none', color: i === 0 ? 'rgba(242,240,235,0.12)' : 'rgba(242,240,235,0.4)', cursor: i === 0 ? 'default' : 'pointer', fontSize: '11px', lineHeight: 1, padding: 0 }}>▲</button>
                <button onClick={() => move(i, 1)} disabled={i === links.length - 1} style={{ background: 'none', border: 'none', color: i === links.length - 1 ? 'rgba(242,240,235,0.12)' : 'rgba(242,240,235,0.4)', cursor: i === links.length - 1 ? 'default' : 'pointer', fontSize: '11px', lineHeight: 1, padding: 0 }}>▼</button>
              </div>

              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '14px', color: '#F2F0EB', margin: '0 0 2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {l.label || '—'}
                  {l.primary && <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 7px', background: 'rgba(212,0,30,0.12)', border: '1px solid rgba(212,0,30,0.4)', color: '#D4001E' }}>Primary</span>}
                </p>
                <a href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '12px', color: 'rgba(242,240,235,0.35)', margin: 0, textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{l.href}</a>
              </div>

              <button onClick={() => setModal(l)} style={{ background: 'none', border: '1px solid #1e1e1e', color: 'rgba(242,240,235,0.4)', padding: '5px 12px', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-body)', transition: 'color 0.15s, border-color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F2F0EB'; e.currentTarget.style.borderColor = '#333' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,240,235,0.4)'; e.currentTarget.style.borderColor = '#1e1e1e' }}
              >Edit</button>
              <button onClick={() => remove(l.id)} style={{ background: 'none', border: '1px solid #1e1e1e', color: 'rgba(212,0,30,0.5)', padding: '5px 12px', cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--font-body)', transition: 'color 0.15s, border-color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#D4001E'; e.currentTarget.style.borderColor = 'rgba(212,0,30,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(212,0,30,0.5)'; e.currentTarget.style.borderColor = '#1e1e1e' }}
              >Del</button>
            </div>
          ))}
        </div>
      )}

      {modal && <LinkModal link={modal} onSave={save} onClose={() => setModal(null)} />}
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

const NAV_ITEMS = [
  { id: 'links',        label: 'Links Page',    icon: '◈' },
  { id: 'testimonials', label: 'Testimonials',  icon: '◇', soon: true },
  { id: 'casestudies',  label: 'Case Studies',  icon: '◉', soon: true },
]

/* ── Dashboard shell ── */
function Dashboard({ onLogout }) {
  const [page, setPage] = useState('links')

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
        {page === 'links'        && <LinksManager />}
        {page === 'testimonials' && <ComingSoon label="Testimonials" />}
        {page === 'casestudies'  && <ComingSoon label="Case Studies" />}
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
