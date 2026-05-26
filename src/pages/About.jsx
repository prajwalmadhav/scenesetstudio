import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import ScrollExpandMedia from '../components/ui/ScrollExpandMedia'
import aboutBrandPackage from '../assets/about/scene-set-brand-package.jpg'

const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY    = 'b44a455f-02a4-48e4-b5e5-8ec134f81fc3'

const TEAM = [
  { initials: 'P',  name: 'Prajwal',   role: 'Founder / Creative Director'      },
  { initials: 'A',  name: 'Avik',      role: 'Head of Sales & Marketing'        },
  { initials: 'Pr', name: 'Prarthana', role: 'Head of Operations & Strategy'    },
  { initials: 'S',  name: 'Sam',       role: 'Motion Graphics / Video Editor'   },
  { initials: 'D',  name: 'Dan',       role: 'Application / Web Developer'      },
  { initials: 'Mv', name: 'Madhav',    role: 'Video Producer'                   },
  { initials: 'Se', name: 'Sethu',     role: 'Graphics Designer'                },
]

const VALUES = [
  { label: 'Craft over output',    body: 'We would rather produce one piece that genuinely lands than ten that scroll past.' },
  { label: 'Outcomes, not optics', body: 'Beautiful work that does not convert is just decoration. Every brief starts with the result.' },
  { label: 'No black boxes',       body: 'You see the thinking, the data, the reasoning. No agency mystique — just transparent collaboration.' },
  { label: 'Built to scale',       body: 'The systems we build for you keep working after the engagement ends. We hand over the playbook.' },
]

const ROLE_TYPES = [
  'Creative Director',
  'Video Editor',
  'Motion Designer',
  'Paid Media Specialist',
  'Copywriter / Strategist',
  'Social Media Manager',
  'Web Designer / Developer',
  'Other',
]

export default function AboutPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email) return
    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Hiring Inquiry — ${form.role || 'General'} — Scene Set Studio`,
          ...form,
        }),
      })
    } catch {}
    setSent(true)
  }

  return (
    <>
      <SEO
        title="About | Scene Set Studio"
        description="Scene Set Studio is a full-service creative agency. We build brands, produce content, and run campaigns that move the needle."
      />

      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={aboutBrandPackage}
        bgImageSrc={aboutBrandPackage}
        title="Scene Set Studio"
        date="Ottawa · Canada"
        scrollToExpand="Scroll to explore"
        textBlend
      >
        <div className="about-pg">

        {/* ── Hero ── */}
        <div className="about-pg__hero">
          <div className="about-pg__hero-content">
            <div className="about-pg__hero-text">
              <span className="about-pg__eyebrow">Our Story</span>
              <h1 className="about-pg__title">
                We make brands<br />impossible to ignore.
              </h1>
              <p className="about-pg__hero-sub">
                Full-service creative agency. Ottawa · Montreal · Toronto &amp; across Canada.
              </p>
            </div>
            <div className="about-pg__hero-icon">
              <img src="/sss logo2.svg" alt="" className="about-pg__hero-logo" />
              <span className="about-pg__hero-wordmark">SceneSet<br /><strong>Studio</strong></span>
            </div>
          </div>
          <div className="about-pg__hero-stat-row">
            <div className="about-pg__hero-stat">
              <span className="about-pg__hero-stat-num">6</span>
              <span className="about-pg__hero-stat-label">Brands served</span>
            </div>
            <div className="about-pg__hero-stat">
              <span className="about-pg__hero-stat-num">3×</span>
              <span className="about-pg__hero-stat-label">Avg. ROAS improvement</span>
            </div>
            <div className="about-pg__hero-stat">
              <span className="about-pg__hero-stat-num">4 yrs</span>
              <span className="about-pg__hero-stat-label">Operating</span>
            </div>
          </div>
        </div>

        {/* ── Mission ── */}
        <div className="about-pg__mission">
          <div className="about-pg__mission-left">
            <span className="about-pg__label">Who We Are</span>
            <p className="about-pg__mission-lead">
              Scene Set Studio is a full-service creative agency founded on a simple conviction: the best-looking work and the best-performing work should be the same work.
            </p>
          </div>
          <div className="about-pg__mission-right">
            {[
              'We partner with ambitious brands at every stage — from early-stage startups finding their voice to established businesses ready to scale.',
              'Strategy, creative production, and performance marketing under one roof.',
              'Nothing gets lost in translation between the brief and the result.',
              'Canada-wide reach. Ottawa-Gatineau based. Remote-first.',
            ].map((point, i) => (
              <div key={i} className="about-pg__mission-point">
                <span className="about-pg__mission-point-num">0{i + 1}</span>
                <p className="about-pg__mission-point-text">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Values ── */}
        <div className="about-pg__values">
          <span className="about-pg__label">What We Stand For</span>
          <div className="about-pg__values-grid">
            {VALUES.map((v, i) => (
              <div key={v.label} className="about-pg__value-card">
                <span className="about-pg__value-index">0{i + 1}</span>
                <h3 className="about-pg__value-title">{v.label}</h3>
                <p className="about-pg__value-body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Team ── */}
        <div className="about-pg__team">
          <span className="about-pg__label">The Team</span>
          <div className="about-pg__team-grid">
            {TEAM.map(member => (
              <div key={member.name} className="about-pg__team-card">
                <div className="about-pg__team-avatar">
                  <span>{member.initials}</span>
                </div>
                <p className="about-pg__team-name">{member.name}</p>
                <p className="about-pg__team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="about-pg__cta">
          <div>
            <span className="about-pg__label">Start a Project</span>
            <p className="about-pg__cta-title">Ready to grow your brand?</p>
          </div>
          <Link to="/contact" className="about-pg__cta-btn">Get in Touch</Link>
        </div>

        {/* ── Hiring Form ── */}
        <div className="about-pg__hire">
          <div className="about-pg__hire-top">
            <div className="about-pg__hire-header">
              <span className="about-pg__label">Careers</span>
              <h2 className="about-pg__hire-title">Join the team.</h2>
              <p className="about-pg__hire-sub">
                We're always looking for sharp, passionate people. Drop your details and we'll be in touch.
              </p>
            </div>
            <div className="about-pg__hire-logo" aria-hidden="true">
              <img src="/sss logo2.svg" alt="" className="about-pg__hire-logo-img" />
              <span className="about-pg__hire-wordmark">
                <span className="about-pg__hire-wordmark-main">SceneSet</span>
                <strong className="about-pg__hire-wordmark-bold">Studio</strong>
              </span>
            </div>
          </div>

          {sent ? (
            <div className="about-pg__hire-thanks">
              <span className="about-pg__hire-thanks-mark">✓</span>
              <p>Got it. We'll review your info and reach out if there's a fit.</p>
            </div>
          ) : (
            <form className="about-pg__hire-form" onSubmit={handleSubmit}>
              <div className="about-pg__hire-row">
                <div className="about-pg__hire-field">
                  <label className="about-pg__hire-label" htmlFor="hire-name">Full Name *</label>
                  <input
                    id="hire-name"
                    className="about-pg__hire-input"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="about-pg__hire-field">
                  <label className="about-pg__hire-label" htmlFor="hire-email">Email *</label>
                  <input
                    id="hire-email"
                    className="about-pg__hire-input"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="about-pg__hire-row">
                <div className="about-pg__hire-field">
                  <label className="about-pg__hire-label" htmlFor="hire-phone">Phone Number</label>
                  <input
                    id="hire-phone"
                    className="about-pg__hire-input"
                    type="tel"
                    name="phone"
                    placeholder="+1 (___) ___-____"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="about-pg__hire-field">
                  <label className="about-pg__hire-label" htmlFor="hire-role">Type of Role</label>
                  <select
                    id="hire-role"
                    className="about-pg__hire-input about-pg__hire-select"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select a role…</option>
                    {ROLE_TYPES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div className="about-pg__hire-field about-pg__hire-field--full">
                <label className="about-pg__hire-label" htmlFor="hire-message">Tell us about yourself</label>
                <textarea
                  id="hire-message"
                  className="about-pg__hire-input about-pg__hire-textarea"
                  name="message"
                  placeholder="Your background, what you bring to the table, links to work…"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                />
              </div>

              <button className="about-pg__hire-btn" type="submit">
                Send Application →
              </button>
            </form>
          )}
        </div>

        </div>
      </ScrollExpandMedia>
    </>
  )
}
