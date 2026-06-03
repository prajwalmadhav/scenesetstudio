import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import tierxImg       from '../assets/work/case-studies/tierx-dcs.webp'
import fawillBikeImg  from '../assets/work/case-studies/fawill-bike-pub.webp'
import fawillCleanImg from '../assets/work/case-studies/fawill-cleaning.webp'
import sceneSetImg    from '../assets/work/case-studies/scene-set-studio.webp'

const CASES = [
  { slug: 'tierx-dcs',        name: 'TierX DCS',               category: 'Brand Identity / Web Design', year: '2025' },
  { slug: 'fawill-bike-pub',  name: 'Fawill Bike & Pub',        category: 'Brand Identity / Web / Social', year: '2026' },
  { slug: 'fawill-cleaning',  name: 'Fawill Cleaning Company',  category: 'Brand Strategy / Content',    year: '2024' },
  { slug: 'sceneset-branding',name: 'Scene Set Studio',         category: 'Brand Identity / Design',     year: '2024' },
]

/* ── Color palette — Notion-like dark document ── */
const C = {
  pageBg:   '#0a0a0a',
  docBg:    '#1e1e1e',
  surface:  '#252525',
  border:   '#303030',
  divider:  '#2a2a2a',
  tagBg:    '#2c2c2c',
  text:     '#C9C6C0',        /* primary — warm off-white, not harsh */
  textSub:  'rgba(201,198,192,0.6)',
  textMute: 'rgba(201,198,192,0.36)',
  textFade: 'rgba(201,198,192,0.28)',
  accent:   '#D4001E',
}

const BD  = `1px solid ${C.border}`   /* standard border */
const BDD = `1px solid ${C.divider}`  /* subtle divider */

/* ── Shared style tokens ── */
const S = {
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    letterSpacing: '0.15em',
    color: C.textMute,
    textTransform: 'uppercase',
    marginBottom: '14px',
    display: 'block',
  },
  h2: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: 'clamp(22px, 3vw, 34px)',
    color: C.text,
    letterSpacing: '-0.03em',
    marginBottom: '16px',
    lineHeight: 1.1,
  },
  h3: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: 'clamp(16px, 2vw, 20px)',
    color: C.text,
    letterSpacing: '-0.02em',
    marginBottom: '12px',
    lineHeight: 1.2,
  },
  para: {
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    fontWeight: 300,
    color: C.textSub,
    lineHeight: 1.85,
    margin: '0 0 16px',
  },
  rule: {
    border: 'none',
    borderTop: `1px solid ${C.border}`,
    margin: '0 0 48px',
  },
  imgPlaceholder: {
    width: '100%',
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    letterSpacing: '0.12em',
    color: C.textFade,
    textTransform: 'uppercase',
  },
}

/* ── Hero image with logo overlay ── */
function HeroImg({ src, logo, alt }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '16/9',
      borderRadius: '8px',
      overflow: 'hidden',
      border: BD,
    }}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.52))',
      }} />
      {logo && (
        <img src={logo} alt="" aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 'clamp(220px, 40%, 380px)', maxHeight: 'clamp(96px, 14%, 160px)',
          width: 'auto', height: 'auto',
          objectFit: 'contain',
          filter: 'brightness(0) invert(1) drop-shadow(0 6px 16px rgba(0,0,0,0.8))',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  )
}

/* ── Pill badge ── */
function Badge({ children }) {
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: 'var(--font-body)',
      fontSize: '10px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: C.textMute,
      border: BD,
      borderRadius: '999px',
      padding: '4px 12px',
      marginRight: '8px',
    }}>
      {children}
    </span>
  )
}

/* ── Section header ── */
function SectionHead({ num, title }) {
  return (
    <>
      <hr style={S.rule} />
      <span style={S.eyebrow}>{num}</span>
      <h2 style={S.h2}>{title}</h2>
    </>
  )
}

/* ── Image placeholder ── */
function ImgBox({ label, aspect = '16/9' }) {
  return (
    <div style={{ ...S.imgPlaceholder, aspectRatio: aspect, flexDirection: 'column', gap: '8px' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="rgba(242,240,235,0.15)" strokeWidth="1.2"/>
        <circle cx="8.5" cy="9.5" r="1.5" stroke="rgba(242,240,235,0.15)" strokeWidth="1.2"/>
        <path d="M2 17L7 12L11 16L15 11L22 17" stroke="rgba(242,240,235,0.15)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={S.imgLabel}>{label}</span>
    </div>
  )
}

/* ── Brand kit: colour swatches + typography cards ── */
function BrandKit() {
  const swatches = [
    { hex: '#0E9FD8', name: 'TierX Blue',   role: 'Trust & Technology' },
    { hex: '#00C48C', name: 'TierX Green',  role: 'Growth & OCP' },
    { hex: '#0A0E1A', name: 'Void Black',   role: 'Depth & Stability' },
    { hex: '#F4F6F8', name: 'Cloud White',  role: 'Clarity & Space' },
  ]

  const fonts = [
    {
      name: 'Space Grotesk', role: 'Headlines',
      weights: ['Regular 400', 'Medium 500', 'Bold 700'],
      family: "'Space Grotesk', system-ui, sans-serif",
    },
    {
      name: 'Inter', role: 'Body Copy',
      weights: ['Light 300', 'Regular 400', 'Medium 500'],
      family: "'Inter', system-ui, sans-serif",
    },
    {
      name: 'JetBrains Mono', role: 'Code & Specs',
      weights: ['Regular 400', 'Bold 700'],
      family: "'JetBrains Mono', monospace",
    },
  ]

  return (
    <div style={{ marginBottom: '20px' }}>

      {/* Colour swatches */}
      <div style={{
        background: C.surface,
        border: BD,
        borderRadius: '10px',
        padding: '32px 28px 28px',
        marginBottom: '10px',
      }}>
        <span style={{ ...S.eyebrow, marginBottom: '28px' }}>Colour Palette</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(68px, 1fr))', gap: '8px' }}>
          {swatches.map(sw => (
            <div key={sw.hex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.06em',
                color: C.textMute,
              }}>
                {sw.hex}
              </span>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: sw.hex,
                border: `2px solid ${C.border}`,
                flexShrink: 0,
              }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: C.text, margin: '0 0 3px' }}>{sw.name}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: C.textFade, margin: 0, letterSpacing: '0.06em' }}>{sw.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {fonts.map(f => (
          <div key={f.name} style={{
            background: C.surface,
            border: BD,
            borderRadius: '10px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: C.text, margin: '0 0 2px' }}>{f.name}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: C.textFade, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.role}</p>
            </div>
            <p style={{
              fontFamily: f.family,
              fontSize: '56px',
              fontWeight: 700,
              color: C.text,
              lineHeight: 1,
              margin: '0 0 16px',
              letterSpacing: '-0.02em',
            }}>
              Aa
            </p>
            <div style={{ borderTop: BDD, paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {f.weights.map(w => (
                <p key={w} style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: C.textFade, margin: 0, letterSpacing: '0.06em' }}>{w}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

/* ── TierX full case study ── */
function TierXContent() {
  return (
    <div>

      {/* Hero */}
      <section style={{ marginBottom: '72px' }}>
        <span style={{ ...S.eyebrow, marginBottom: '20px' }}>North American Market Entry</span>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          fontSize: 'clamp(48px, 8vw, 96px)',
          color: C.text,
          lineHeight: 0.92,
          letterSpacing: '-0.04em',
          margin: '0 0 24px',
        }}>
          TierX DCS
        </h1>
        <span style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.textMute, border: `1px solid ${C.border}`, borderRadius: '999px', padding: '4px 14px', marginBottom: '24px' }}>
          Infrastructure Technology
        </span>
        <p style={{ ...S.para, fontSize: '17px', color: C.textSub, maxWidth: '600px', margin: '0 0 32px' }}>
          Building a trusted, differentiated brand for a prefabricated data center startup entering the North American market.
        </p>
        <div style={{ marginBottom: '40px' }}>
          <Badge>Brand Identity</Badge>
          <Badge>Web Design</Badge>
          <Badge>3D Visualization</Badge>
          <Badge>2025</Badge>
        </div>
        <HeroImg src={tierxImg} logo="/assets/images/tierx%20logo.png" alt="TierX DCS" />
      </section>

      {/* At a Glance */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="01 — Client" title="TierX at a Glance" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          border: BD,
          borderRadius: '6px',
          overflow: 'hidden',
          marginBottom: '40px',
        }}>
          {[
            { label: 'What They Do', value: 'Prefabricated, modular data center solutions — POWERiQ i32 & OCP-compliant Edge Pod' },
            { label: 'Market', value: 'Infrastructure-as-a-service; North American mid-market enterprises, neoclouds, and colo operators' },
            { label: 'Stage', value: 'Bangalore-based, Series A-funded startup. Zero prior North American presence' },
            { label: 'Team Size', value: '~15 people. Co-founder Nithin (Director) led the engagement' },
          ].map(item => (
            <div key={item.label} style={{ background: C.surface, padding: '28px 24px' }}>
              <span style={{ ...S.eyebrow, marginBottom: '8px' }}>{item.label}</span>
              <p style={{ ...S.para, margin: 0, fontSize: '14px' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Problem */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="02 — Challenge" title="The problem they faced." />
        <p style={S.para}>
          TierX had a foundational positioning problem. They'd built world-class hardware and had traction in Asia, but entering North America required a complete brand reboot. The challenge wasn't just visibility — it was trust and clarity.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: BD, borderRadius: '6px', overflow: 'hidden' }}>
          {[
            { label: 'No brand presence', desc: 'Zero recognition in North America. Competing against Vertiv, Schneider, and HPE — vendors with decades of enterprise trust.' },
            { label: 'Positioning confusion', desc: 'Prospects couldn\'t see beyond "another prefab data center company." The narrative was product-focused, not ecosystem-focused.' },
            { label: 'Technical skepticism', desc: 'CTOs and infrastructure directors needed to understand OCP alignment and strategic advantage — not just specs.' },
            { label: 'Visual identity gap', desc: 'No cohesive brand look. Messaging scattered across channels without conveying the engineering rigor needed to win enterprise deals.' },
          ].map((item, i) => (
            <div key={item.label} style={{
              padding: '24px',
              borderBottom: i < 3 ? BD : 'none',
              background: 'transparent',
            }}>
              <p style={{ ...S.para, margin: '0 0 4px', color: C.text, fontWeight: 500, fontSize: '14px' }}>{item.label}</p>
              <p style={{ ...S.para, margin: 0, fontSize: '14px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Approach */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="03 — Strategy" title="Our strategic approach." />

        <div style={{ marginBottom: '40px' }}>
          <h3 style={S.h3}>Discovery & Market Research</h3>
          <p style={S.para}>
            Before designing a single pixel, we dug into the competitive landscape and ideal customer profile. Competitive analysis mapped Vertiv, Schneider Electric, and HPE's positioning — they all led with "reliability" and "scale." TierX's advantage was speed to deployment and OCP democratization, but it wasn't being communicated.
          </p>
          <p style={S.para}>
            ICP research identified that buying decisions flow through infrastructure directors and CTOs at mid-market enterprises. They care about deployment time, OpEx vs. CapEx models, OCP standardization, and vendor credibility. TierX was talking product features. The market wanted to hear transformation.
          </p>
        </div>

        <div style={{
          background: C.surface,
          border: BD,
          borderRadius: '6px',
          padding: '28px 28px 24px',
          marginBottom: '40px',
          borderLeft: '3px solid #D4001E',
        }}>
          <span style={{ ...S.eyebrow, marginBottom: '12px' }}>Our Recommendation</span>
          <p style={{ ...S.para, margin: 0, fontSize: '15px', color: C.textSub }}>
            <strong style={{ color: C.text, fontWeight: 600 }}>Position TierX as an ecosystem, not a product company.</strong> Instead of leading with "POWERiQ i32," lead with the entire ecosystem: brand trust, engineering excellence, OCP alignment, and modular scalability. The product is the hero, but the brand is the foundation.
          </p>
        </div>

        <h3 style={S.h3}>Strategic Pillars</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {[
            { num: '01', title: 'Brand Trust & Credibility', desc: 'A cohesive visual system that conveys engineering rigor, stability, and forward-thinking innovation.' },
            { num: '02', title: 'Product Clarity Through 3D', desc: 'Complex hardware is confusing in 2D. 3D renders let prospects see the engineering elegance and modularity.' },
            { num: '03', title: 'Educational User Journey', desc: 'Website guides prospects from "what is prefab?" → "why OCP?" → "why TierX?" → "let\'s talk."' },
          ].map(p => (
            <div key={p.num} style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '24px' }}>
              <span style={{ ...S.eyebrow, color: '#D4001E', marginBottom: '12px' }}>{p.num}</span>
              <p style={{ ...S.para, margin: '0 0 8px', color: C.text, fontWeight: 500, fontSize: '14px' }}>{p.title}</p>
              <p style={{ ...S.para, margin: 0, fontSize: '13px' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Built */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="04 — Deliverables" title="What we built." />

        {/* Brand Identity */}
        <div style={{ marginBottom: '52px' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>1. Complete Brand Identity System</h3>
          <p style={S.para}>
            A cohesive visual language built from the ground up, designed to stand shoulder-to-shoulder with enterprise infrastructure vendors while maintaining a modern, approachable edge.
          </p>
          <BrandKit />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '20px' }}>
            {[
              { label: 'Logo variations & usage guidelines' },
              { label: 'Brand guidelines spread' },
            ].map(item => (
              <ImgBox key={item.label} label={item.label} aspect="4/3" />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: BD, borderRadius: '6px', overflow: 'hidden' }}>
            {[
              { label: 'Color', detail: 'TierX Blue (#0E9FD8) — trust & technology. TierX Green (#00C48C) — growth & OCP alignment. Void Black (#0A0E1A) — stability & depth.' },
              { label: 'Typography', detail: 'Space Grotesk (headlines — geometric, technical), Inter (body — clean, legible), JetBrains Mono (code/specs — engineering authenticity).' },
              { label: 'Visual Language', detail: 'Clean lines, generous whitespace, geometric shapes echoing modularity. Hardware-in-context imagery paired with real team portraits.' },
            ].map((item, i) => (
              <div key={item.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(80px, 110px) 1fr', borderBottom: i < 2 ? BD : 'none' }}>
                <div style={{ padding: '16px 20px', borderRight: BD, background: C.surface }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: C.textMute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.label}</span>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <p style={{ ...S.para, margin: 0, fontSize: '13px' }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Website */}
        <div style={{ marginBottom: '52px' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>2. Website Redesign & Information Architecture</h3>
          <p style={S.para}>
            The website is the centerpiece of the rebrand. A full-stack experience: educational, visually compelling, and conversion-optimized. Built with GSAP + ScrollTrigger animations throughout.
          </p>
          <div style={{ marginBottom: '20px' }}>
            <ImgBox label="Homepage hero — value prop + exploded view 3D animation" aspect="16/9" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '20px' }}>
            {[
              { label: 'Products page — POWERiQ i32 + Edge Pod' },
              { label: 'Mobile responsive views' },
              { label: 'Contact / demo lead form' },
            ].map(item => (
              <ImgBox key={item.label} label={item.label} aspect="3/4" />
            ))}
          </div>
          <div style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '20px 24px' }}>
            <span style={{ ...S.eyebrow, marginBottom: '12px' }}>Page Architecture</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Home — value prop + 3D hero', 'Products — i32 & Edge Pod specs', 'OCP & Philosophy — thought leadership', 'Solutions — use cases by industry', 'Why TierX — differentiation & trust', 'Contact / Demo — low-friction lead forms'].map(page => (
                <span key={page} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: C.textSub,
                  background: C.surface,
                  border: BD,
                  borderRadius: '4px',
                  padding: '5px 10px',
                }}>
                  {page}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Visualization */}
        <div style={{ marginBottom: '52px' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>3. 3D Product Visualization & Animations</h3>
          <p style={S.para}>
            The most technically sophisticated deliverable. High-fidelity 3D renders that bring TierX's hardware to life. The POWERiQ i32 exploded view is a scroll-driven animation — as users scroll, the unit explodes into component layers (power distribution, cooling, modular racks, OCP networking), then reconstructs. It teaches product architecture through sight.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
            {[
              { label: 'POWERiQ i32 exploded view — scroll animation still frames', aspect: '16/9' },
              { label: 'OCP Edge Pod — real-world deployment render', aspect: '16/9' },
              { label: 'i32 3D renders — multiple angles', aspect: '4/3' },
              { label: 'Animation sequence stills', aspect: '4/3' },
            ].map(item => (
              <ImgBox key={item.label} label={item.label} aspect={item.aspect} />
            ))}
          </div>
        </div>

        {/* Lead Gen */}
        <div style={{ marginBottom: '0' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>4. Lead Generation & Analytics Infrastructure</h3>
          <p style={S.para}>
            Design without conversion is just art. Multi-step lead forms (progressive profiling) capture role, company, use case, and intent without overwhelming prospects. Copy differs by page context — "Request a POWERiQ demo" vs. "Explore OCP solutions." Full event tracking, conversion funnel dashboard, and comprehensive SEO audit with 40+ identified keywords.
          </p>
        </div>
      </section>

      {/* How We Worked */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="05 — Process" title="How we worked together." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            {
              week: 'Week 1',
              title: 'Discovery & Strategy',
              desc: 'Competitive research, ICP mapping, positioning workshops with Nithin and the core team. Outcome: Aligned on "ecosystem over product" positioning.',
            },
            {
              week: 'Weeks 2–3',
              title: 'Design & Build',
              desc: 'Rapid iteration on brand system, website wireframes, and 3D asset specs. Bi-weekly design reviews with TierX leadership; async feedback via Figma. Scope expanded to invest extra time in 3D product visualization once it became the clear hero differentiator.',
            },
            {
              week: 'Early June',
              title: 'Launch',
              desc: 'Website live with full brand implementation, 3D assets, and lead tracking in place. 3-week turnaround from kickoff to launch.',
            },
          ].map((step, i) => (
            <div key={step.week} style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(80px, 110px) 1fr',
              borderBottom: i < 2 ? BDD : 'none',
              paddingBottom: '28px',
              marginBottom: '28px',
              gap: '24px',
            }}>
              <div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#D4001E', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{step.week}</span>
              </div>
              <div>
                <h3 style={{ ...S.h3, marginBottom: '8px', fontSize: '16px' }}>{step.title}</h3>
                <p style={{ ...S.para, margin: 0, fontSize: '14px' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '20px 24px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {[
            { label: 'Timeline', value: 'May 1 – June 2025 (3 weeks)' },
            { label: 'Collaboration', value: 'Weekly calls · Figma reviews · Slack' },
            { label: 'Cadence', value: 'Bi-weekly design reviews' },
          ].map(item => (
            <div key={item.label}>
              <span style={{ ...S.eyebrow, marginBottom: '6px' }}>{item.label}</span>
              <p style={{ ...S.para, margin: 0, fontSize: '13px', color: C.textSub }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="06 — Results" title="Early impact." />
        <p style={{ ...S.para, marginBottom: '32px' }}>
          Fresh launch — we're tracking the foundational metrics that matter for a B2B company entering a new market. Qualitative wins are already visible.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '40px' }}>
          {[
            { title: 'Brand Cohesiveness', desc: 'One unified visual identity across website, pitch deck, and collateral. No more scattered messaging.' },
            { title: 'Sales Enablement', desc: 'The website answers the top 10 questions prospects ask. Sales can confidently send a single link instead of hunting for materials.' },
            { title: 'Positioning Power', desc: 'Nithin and the team now have a 3-minute brand story for enterprise CTOs and investors. The website does 80% of the credibility lift before the call.' },
            { title: 'Market Readiness', desc: 'TierX is now positioned to scale outbound (ABM, thought leadership) and inbound (organic search) without rebuilding brand assets.' },
          ].map(item => (
            <div key={item.title} style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '24px' }}>
              <p style={{ ...S.para, margin: '0 0 8px', color: C.text, fontWeight: 500, fontSize: '14px' }}>{item.title}</p>
              <p style={{ ...S.para, margin: 0, fontSize: '13px' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* North Star Metrics */}
        <div style={{ border: BD, borderRadius: '6px', overflow: 'hidden', marginBottom: '40px' }}>
          <div style={{ padding: '16px 24px', borderBottom: BD, background: C.surface }}>
            <span style={{ ...S.eyebrow, margin: 0 }}>90-Day Targets</span>
          </div>
          {[
            { metric: 'Organic traffic', target: '300+ qualified sessions/month by September' },
            { metric: 'Lead conversion', target: '2%+ of site visitors → leads' },
            { metric: 'Enterprise pipeline', target: '5–10 qualified conversations/month from digital channel' },
            { metric: 'Brand sentiment', target: 'Prospects naming TierX as a modern alternative in competitive analysis' },
          ].map((row, i) => (
            <div key={row.metric} style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(100px, 140px) 1fr',
              borderBottom: i < 3 ? BDD : 'none',
            }}>
              <div style={{ padding: '14px 20px', borderRight: BD }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: C.textMute, letterSpacing: '0.04em' }}>{row.metric}</span>
              </div>
              <div style={{ padding: '14px 20px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: C.textSub }}>{row.target}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial placeholder */}
        <div style={{ border: BD, borderRadius: '6px', padding: '28px', background: C.surface }}>
          <span style={{ ...S.eyebrow, marginBottom: '16px', color: '#D4001E' }}>Client Testimonial</span>
          <blockquote style={{
            fontFamily: 'var(--font-heading)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(17px, 2.2vw, 22px)',
            color: C.textMute,
            lineHeight: 1.55,
            margin: '0 0 20px',
            letterSpacing: '-0.01em',
          }}>
            "[ Nithin's quote on the rebrand's impact and how it's positioning TierX in North American conversations — pending ]"
          </blockquote>
          <p style={{ ...S.para, margin: 0, fontSize: '13px', color: C.textFade }}>
            — Nithin, Co-founder &amp; Director, TierX DCS
          </p>
        </div>
        <a
          href="#"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.textMute, textDecoration: 'none', marginTop: '24px', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = C.text}
          onMouseLeave={e => e.currentTarget.style.color = C.textMute}
        >
          View live project
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </section>

      {/* CTA */}
      <section style={{ marginBottom: '0' }}>
        <hr style={S.rule} />
        <p style={{ ...S.para, fontSize: '13px', marginBottom: '24px' }}>
          Whether you're a startup entering a new market, a technical company struggling to communicate complexity, or an established player needing a refresh — we approach every rebrand the same way: strategy first, design second.
        </p>
        <Link
          to="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: C.text,
            background: 'transparent',
            border: BD,
            borderRadius: '6px',
            padding: '14px 24px',
            textDecoration: 'none',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.textMute; e.currentTarget.style.background = 'rgba(201,198,192,0.06)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.textFade; e.currentTarget.style.background = 'transparent' }}
        >
          Schedule a free positioning session
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
            <path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </section>

    </div>
  )
}

/* ── FaWill brand kit ── */
function FaWillBrandKit() {
  const swatches = [
    { hex: '#35AC8F', name: 'Bike Green',  role: 'Energy & Ottawa Outdoors' },
    { hex: '#E9E4D2', name: 'Warm Cream',  role: 'Approachable & Welcoming' },
    { hex: '#333433', name: 'Charcoal',    role: 'Sophistication & Contrast' },
    { hex: '#E99B2D', name: 'Amber Gold',  role: 'Fun, Warmth & Energy' },
  ]
  const fonts = [
    { name: 'Montra',      role: 'Display',   weights: ['Bold 700'],              family: 'Georgia, serif' },
    { name: 'Montserrat',  role: 'Body Copy', weights: ['Normal 400', 'Medium 500', 'Bold 700'], family: "'Montserrat', system-ui, sans-serif" },
    { name: 'Birch CTT',   role: 'Accent',    weights: ['Regular 400'],           family: 'cursive' },
  ]
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ background: C.surface, border: BD, borderRadius: '10px', padding: '32px 28px 28px', marginBottom: '10px' }}>
        <span style={{ ...S.eyebrow, marginBottom: '28px' }}>Colour Palette</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(68px, 1fr))', gap: '8px' }}>
          {swatches.map(sw => (
            <div key={sw.hex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.06em', color: C.textMute }}>{sw.hex}</span>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: sw.hex, border: `2px solid ${C.border}`, flexShrink: 0 }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: C.text, margin: '0 0 3px' }}>{sw.name}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: C.textFade, margin: 0, letterSpacing: '0.06em' }}>{sw.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {fonts.map(f => (
          <div key={f.name} style={{ background: C.surface, border: BD, borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: C.text, margin: '0 0 2px' }}>{f.name}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: C.textFade, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.role}</p>
            </div>
            <p style={{ fontFamily: f.family, fontSize: '56px', fontWeight: 700, color: C.text, lineHeight: 1, margin: '0 0 16px', letterSpacing: '-0.02em' }}>Aa</p>
            <div style={{ borderTop: BDD, paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {f.weights.map(w => (
                <p key={w} style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: C.textFade, margin: 0, letterSpacing: '0.06em' }}>{w}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── FaWill Bike Pub case study ── */
function FaWillBikePubContent() {
  const CtaLink = ({ children }) => (
    <Link
      to="/contact"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.text, background: 'transparent', border: BD, borderRadius: '6px', padding: '14px 24px', textDecoration: 'none', transition: 'border-color 0.2s, background 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = C.textMute; e.currentTarget.style.background = 'rgba(201,198,192,0.06)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = 'transparent' }}
    >
      {children}
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
        <path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  )

  return (
    <div>

      {/* Hero */}
      <section style={{ marginBottom: '72px' }}>
        <span style={{ ...S.eyebrow, marginBottom: '20px' }}>From Zero to Recognized Local Brand</span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(44px, 8vw, 88px)', color: C.text, lineHeight: 0.92, letterSpacing: '-0.04em', margin: '0 0 24px' }}>
          FaWill Bike Pub
        </h1>
        <span style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.textMute, border: `1px solid ${C.border}`, borderRadius: '999px', padding: '4px 14px', marginBottom: '24px' }}>
          Hospitality & Entertainment
        </span>
        <p style={{ ...S.para, fontSize: '17px', color: C.textSub, maxWidth: '600px', margin: '0 0 32px' }}>
          Building a cohesive brand identity, booking system, and social presence for Ottawa's first party bike pub — from concept to thriving community gathering spot in 8 weeks.
        </p>
        <div style={{ marginBottom: '40px' }}>
          {['Brand Identity', 'Web Design', 'Social Media', 'Paid Ads', '2026'].map(t => (
            <span key={t} style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: C.textMute, border: BD, borderRadius: '999px', padding: '4px 12px', marginRight: '8px', marginBottom: '8px' }}>{t}</span>
          ))}
        </div>
        <HeroImg src={fawillBikeImg} logo="/assets/images/bikepub%20logo.png" alt="FaWill Bike Pub" />
      </section>

      {/* At a Glance */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="01 — Client" title="FaWill at a Glance" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', border: BD, borderRadius: '6px', overflow: 'hidden', marginBottom: '40px' }}>
          {[
            { label: 'What They Do', value: 'Party bike pub experience in Ottawa — group social cycling combined with food, drinks, and atmosphere.' },
            { label: 'Market', value: 'Local hospitality & entertainment; targeting Ottawa millennials and groups seeking unique experiences.' },
            { label: 'Stage', value: 'Brand new at engagement start (January 2026). Zero brand, zero social, zero bookings.' },
            { label: 'Audience', value: 'Bachelorette parties, corporate teams, birthday groups, locals seeking Instagram-worthy experiences.' },
          ].map(item => (
            <div key={item.label} style={{ background: C.surface, padding: '28px 24px' }}>
              <span style={{ ...S.eyebrow, marginBottom: '8px' }}>{item.label}</span>
              <p style={{ ...S.para, margin: 0, fontSize: '14px' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Problem */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="02 — Challenge" title="Starting from absolute zero." />
        <p style={S.para}>FaWill had a great concept but no brand foundation whatsoever — no logo, no website, no social presence, no bookings. Every piece had to be built.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: BD, borderRadius: '6px', overflow: 'hidden' }}>
          {[
            { label: 'No brand identity',     desc: 'No logo, no visual language, no guidelines. Every touchpoint felt scattered and untrustworthy.' },
            { label: 'No brand positioning',  desc: 'What makes a party bike pub different from a regular pub? That story didn\'t exist yet.' },
            { label: 'Zero social presence',  desc: 'No Instagram, no TikTok — no way for customers to discover them or visualize the experience.' },
            { label: 'No trust signals',      desc: 'New business = instant skepticism. No testimonials, no social proof, no reason to book.' },
            { label: 'No booking system',     desc: 'How do customers even reserve? No system, no email capture, no follow-up flow.' },
            { label: 'No audience strategy',  desc: 'They knew their target (bachelorettes, corporates) but had no strategy to reach them at scale.' },
          ].map((item, i) => (
            <div key={item.label} style={{ padding: '22px 24px', borderBottom: i < 5 ? BD : 'none', background: 'transparent' }}>
              <p style={{ ...S.para, margin: '0 0 4px', color: C.text, fontWeight: 500, fontSize: '14px' }}>{item.label}</p>
              <p style={{ ...S.para, margin: 0, fontSize: '14px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Approach */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="03 — Strategy" title="Our strategic approach." />
        <div style={{ marginBottom: '40px' }}>
          <h3 style={S.h3}>Discovery & Audience Research</h3>
          <p style={S.para}>We dug into what makes a party experience brand win in Ottawa's competitive entertainment market. Interviews with bachelorette party planners and corporate event organizers revealed what drives decisions: Instagram-worthy moments, group vibe, ease of booking, and perceived safety of the experience.</p>
          <p style={S.para}>Competitive analysis mapped escape rooms, bar crawls, and outdoor activities. FaWill's unique angle: the party bike concept was entirely novel in Ottawa. They just needed to own it visually and culturally before anyone else did.</p>
        </div>
        <div style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '28px', marginBottom: '40px', borderLeft: `3px solid #35AC8F` }}>
          <span style={{ ...S.eyebrow, marginBottom: '12px' }}>Our Recommendation</span>
          <p style={{ ...S.para, margin: 0, fontSize: '15px', color: C.textSub }}>
            <strong style={{ color: C.text, fontWeight: 600 }}>Position FaWill as Ottawa's go-to experience for groups who want to create memories together.</strong> Not a bike rental. Not a bar. The <em>feeling</em> of a unique, high-energy group story — approachable, trustworthy, and impossible not to share.
          </p>
        </div>
        <h3 style={{ ...S.h3, marginBottom: '16px' }}>Strategic Pillars</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {[
            { num: '01', title: 'Visual Identity & Brand Trust',      desc: 'Bold, playful brand that says "we\'re legitimate, we\'re fun, you\'ll have an amazing time." Instant recognition and trust.' },
            { num: '02', title: 'Frictionless Booking Experience',     desc: 'Remove all friction between interest and booking. One-click system handling group sizes, dates, special requests, and payment.' },
            { num: '03', title: 'Social Proof & Community Building',   desc: 'Showcase real customers having real fun. UGC, testimonials, and behind-the-scenes content that builds FOMO and trust.' },
            { num: '04', title: 'Targeted Audience Outreach',         desc: 'Reach bachelorette planners and corporate teams where they hang out with messaging that speaks to their specific needs.' },
          ].map(p => (
            <div key={p.num} style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '24px' }}>
              <span style={{ ...S.eyebrow, color: '#35AC8F', marginBottom: '12px' }}>{p.num}</span>
              <p style={{ ...S.para, margin: '0 0 8px', color: C.text, fontWeight: 500, fontSize: '14px' }}>{p.title}</p>
              <p style={{ ...S.para, margin: 0, fontSize: '13px' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Built */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="04 — Deliverables" title="What we built." />

        {/* Brand Identity */}
        <div style={{ marginBottom: '52px' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>1. Complete Brand Identity System</h3>
          <p style={S.para}>From zero to a cohesive brand that works across every touchpoint — website, social, email, signage, and merchandise. Built to feel fun and approachable while signalling legitimate, professional operations.</p>
          <FaWillBrandKit />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '20px' }}>
            {[
              { label: 'Logo — primary mark, variations & favicon', aspect: '4/3' },
              { label: 'Brand guidelines spread', aspect: '4/3' },
            ].map(item => (
              <ImgBox key={item.label} label={item.label} aspect={item.aspect} />
            ))}
          </div>
        </div>

        {/* Website */}
        <div style={{ marginBottom: '52px' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>2. Website & Conversion Funnel</h3>
          <p style={S.para}>The website answers three questions instantly: What is this? Why should I book it? How do I book? Mobile-first (70% of bookings happen on mobile), SEO-optimized for "party bike Ottawa" and local search terms.</p>
          <div style={{ marginBottom: '12px' }}>
            <ImgBox label="Homepage hero — group experience + CTA to book" aspect="16/9" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '20px' }}>
            {['Occasions page — bachelorette / corporate / birthday', 'Pricing & group sizes table', 'Mobile booking view'].map(l => (
              <ImgBox key={l} label={l} aspect="3/4" />
            ))}
          </div>
          <div style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '20px 24px' }}>
            <span style={{ ...S.eyebrow, marginBottom: '12px' }}>Page Architecture</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Home — hero + social proof + CTA', 'The Experience — arrival to departure journey', 'Occasions — bachelorette / corporate / birthday', 'Pricing & Group Sizes — transparent tables', 'Testimonials — real photos + quotes', 'FAQ — weather, age, comfort, cancellations', 'Booking — simple step-by-step form'].map(page => (
                <span key={page} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: C.textSub, background: C.docBg, border: BD, borderRadius: '4px', padding: '5px 10px' }}>{page}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Booking System */}
        <div style={{ marginBottom: '52px' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>3. Custom Booking & Lead Management System</h3>
          <p style={S.para}>Off-the-shelf calendars don't work for group experience businesses. We built a custom system: group size, occasion, special requests, Stripe payment, automated confirmation and reminder emails, real-time calendar to prevent double-bookings, and post-experience follow-up for testimonials and repeat bookings.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
            {['Booking system workflow & form steps', 'Admin dashboard — calendar + booking management', 'Confirmation email template', 'Post-experience follow-up sequence'].map(l => (
              <ImgBox key={l} label={l} aspect="4/3" />
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div style={{ marginBottom: '52px' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>4. Social Media Strategy & Content System</h3>
          <p style={S.para}>Instagram and TikTok are where party experiences are discovered. We built the profiles, content pillars, posting cadence, and Reels strategy from scratch.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '16px' }}>
            {['Instagram profile & highlight stories', 'Sample content grid — 9-post layout', 'Reels / TikTok clip examples', 'Content calendar — first 30 days'].map(l => (
              <ImgBox key={l} label={l} aspect="4/3" />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: BD, borderRadius: '6px', overflow: 'hidden' }}>
            {[
              { label: 'Showcase',         detail: 'Real groups having fun — UGC + professional photos. The most persuasive content.' },
              { label: 'Behind-the-scenes', detail: 'Pre-ride setup, team preparation, route planning. Builds authenticity.' },
              { label: 'Testimonials',      detail: 'Customer quotes paired with their group photos. Trust-building gold.' },
              { label: 'Promotional',       detail: 'Special offers, seasonal campaigns, referral incentives.' },
            ].map((item, i) => (
              <div key={item.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(90px, 130px) 1fr', borderBottom: i < 3 ? BD : 'none' }}>
                <div style={{ padding: '14px 20px', borderRight: BD, background: C.surface }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: C.textMute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.label}</span>
                </div>
                <div style={{ padding: '14px 20px' }}>
                  <p style={{ ...S.para, margin: 0, fontSize: '13px' }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email & Ads */}
        <div style={{ marginBottom: '0' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>5. Email Automation & Paid Advertising</h3>
          <p style={S.para}>Welcome sequences, pre-experience reminders, post-experience follow-ups, and seasonal re-engagement campaigns. Paired with Facebook/Instagram ads targeted at bachelorette planners (women 25–40) and corporate event organizers (30–50), plus Google Local Services Ads for high-intent Ottawa searches.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
            {['Email automation workflow diagram', 'Ad creative samples — bachelorette + corporate'].map(l => (
              <ImgBox key={l} label={l} aspect="16/9" />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="05 — Process" title="How we worked together." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { week: 'Weeks 1–2',  title: 'Discovery & Brand Direction',  desc: 'Brand workshops with founder. Positioning, brand personality, logo direction. Competitor mapping across local entertainment.' },
            { week: 'Weeks 3–4',  title: 'Brand System & Wireframes',     desc: 'Logo lockup, colour palette, typography finalized. Website wireframes and user journey mapping.' },
            { week: 'Weeks 5–6',  title: 'Build',                         desc: 'Website build, booking system development, social media profiles setup and optimized.' },
            { week: 'Weeks 7–8',  title: 'Content & Ads',                 desc: 'Photography/videography of early trial runs. Email templates, ad creative production, content calendar built.' },
            { week: 'Early March', title: 'Launch',                       desc: 'Website live, booking system live, social content calendar running, first paid ads active.' },
          ].map((step, i) => (
            <div key={step.week} style={{ display: 'grid', gridTemplateColumns: 'minmax(80px, 110px) 1fr', borderBottom: i < 4 ? BDD : 'none', paddingBottom: '24px', marginBottom: '24px', gap: '24px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: '#35AC8F', letterSpacing: '0.08em', textTransform: 'uppercase', paddingTop: '2px' }}>{step.week}</span>
              <div>
                <h3 style={{ ...S.h3, marginBottom: '6px', fontSize: '15px' }}>{step.title}</h3>
                <p style={{ ...S.para, margin: 0, fontSize: '14px' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '20px 24px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {[
            { label: 'Timeline',    value: 'January – March 2026 (8 weeks)' },
            { label: 'Collaboration', value: 'Weekly calls · Figma reviews · Slack' },
            { label: 'Approach',   value: 'Rapid iteration; doubled down on what worked' },
          ].map(item => (
            <div key={item.label}>
              <span style={{ ...S.eyebrow, marginBottom: '6px' }}>{item.label}</span>
              <p style={{ ...S.para, margin: 0, fontSize: '13px', color: C.textSub }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="06 — Results" title="Early impact." />
        <p style={{ ...S.para, marginBottom: '32px' }}>Within the first month of launch, FaWill saw measurable traction across every channel. Metrics are being tracked and will be updated.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '40px' }}>
          {[
            { title: 'Brand Legitimacy',    desc: 'Zero to full brand system in 8 weeks. New visitors immediately see a professional, trustworthy business — not a startup idea.' },
            { title: 'Frictionless Booking', desc: 'Replaced manual email back-and-forth with a one-click booking flow. Immediate lift in inquiry-to-booking conversion.' },
            { title: 'Social Discovery',    desc: 'Instagram and TikTok presence built from scratch. Real customer content now feeds a growing discovery engine.' },
            { title: 'Word of Mouth',       desc: '"Party bike pub" positioning took hold. Friends seeing friends\' stories drove organic referrals within weeks.' },
          ].map(item => (
            <div key={item.title} style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '24px' }}>
              <p style={{ ...S.para, margin: '0 0 8px', color: C.text, fontWeight: 500, fontSize: '14px' }}>{item.title}</p>
              <p style={{ ...S.para, margin: 0, fontSize: '13px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ border: BD, borderRadius: '6px', overflow: 'hidden', marginBottom: '40px' }}>
          <div style={{ padding: '16px 24px', borderBottom: BD, background: C.surface }}>
            <span style={{ ...S.eyebrow, margin: 0 }}>90-Day Targets</span>
          </div>
          {[
            { metric: 'Booking volume',   target: '[ X ] bookings/month by month 6 — TBD' },
            { metric: 'Email list',       target: '[ X ] subscribers enabling ongoing marketing — TBD' },
            { metric: 'Social engagement', target: '[ X ]% engagement rate + viral content reach — TBD' },
            { metric: 'Referral rate',    target: '% of new customers from existing customer referrals — TBD' },
          ].map((row, i) => (
            <div key={row.metric} style={{ display: 'grid', gridTemplateColumns: 'minmax(100px, 140px) 1fr', borderBottom: i < 3 ? BDD : 'none' }}>
              <div style={{ padding: '14px 20px', borderRight: BD }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: C.textMute, letterSpacing: '0.04em' }}>{row.metric}</span>
              </div>
              <div style={{ padding: '14px 20px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: C.textSub }}>{row.target}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ border: BD, borderRadius: '6px', padding: '28px', background: C.surface }}>
          <span style={{ ...S.eyebrow, marginBottom: '16px', color: '#35AC8F' }}>Client Testimonial</span>
          <blockquote style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(17px, 2.2vw, 22px)', color: C.textMute, lineHeight: 1.55, margin: '0 0 20px', letterSpacing: '-0.01em' }}>
            "[ Founder quote on the transformation — from zero brand to a fully operational, recognized business in Ottawa — pending ]"
          </blockquote>
          <p style={{ ...S.para, margin: 0, fontSize: '13px', color: C.textFade }}>— Founder, FaWill Bike Pub</p>
        </div>
        <a
          href="#"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.textMute, textDecoration: 'none', marginTop: '24px', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = C.text}
          onMouseLeave={e => e.currentTarget.style.color = C.textMute}
        >
          View live project
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </section>

      {/* CTA */}
      <section style={{ marginBottom: '0' }}>
        <hr style={S.rule} />
        <p style={{ ...S.para, fontSize: '13px', marginBottom: '24px' }}>
          Whether you're launching a new experience, a service business, or a local brand — the playbook is the same: start with positioning, build a cohesive brand, make it easy to convert, and let social proof compound.
        </p>
        <CtaLink>Schedule a free brand strategy session</CtaLink>
      </section>

    </div>
  )
}

/* ── FaWill Cleaning brand kit ── */
function FaWillCleaningBrandKit() {
  const swatches = [
    { hex: '#1266B0', name: 'Trust Blue',   role: 'Reliability & Professionalism' },
    { hex: '#00B4D8', name: 'Fresh Aqua',   role: 'Cleanliness & Freshness' },
    { hex: '#1A2332', name: 'Deep Charcoal', role: 'Authority & Sophistication' },
    { hex: '#F0F4F8', name: 'Clean White',  role: 'Clarity & Precision' },
  ]
  const fonts = [
    { name: 'Raleway',          role: 'Headlines',    weights: ['Medium 500', 'Bold 700', 'ExtraBold 800'], family: "'Raleway', system-ui, sans-serif" },
    { name: 'Source Sans Pro',  role: 'Body Copy',    weights: ['Regular 400', 'Semi-Bold 600'],            family: "'Source Sans Pro', system-ui, sans-serif" },
    { name: 'Lato',             role: 'UI & Captions', weights: ['Light 300', 'Regular 400'],               family: "'Lato', system-ui, sans-serif" },
  ]
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ background: C.surface, border: BD, borderRadius: '10px', padding: '32px 28px 28px', marginBottom: '10px' }}>
        <span style={{ ...S.eyebrow, marginBottom: '28px' }}>Colour Palette</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(68px, 1fr))', gap: '8px' }}>
          {swatches.map(sw => (
            <div key={sw.hex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.06em', color: C.textMute }}>{sw.hex}</span>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: sw.hex, border: `2px solid ${C.border}`, flexShrink: 0 }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: C.text, margin: '0 0 3px' }}>{sw.name}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: C.textFade, margin: 0, letterSpacing: '0.06em' }}>{sw.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {fonts.map(f => (
          <div key={f.name} style={{ background: C.surface, border: BD, borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: C.text, margin: '0 0 2px' }}>{f.name}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: C.textFade, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.role}</p>
            </div>
            <p style={{ fontFamily: f.family, fontSize: '56px', fontWeight: 700, color: C.text, lineHeight: 1, margin: '0 0 16px', letterSpacing: '-0.02em' }}>Aa</p>
            <div style={{ borderTop: BDD, paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {f.weights.map(w => (
                <p key={w} style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: C.textFade, margin: 0, letterSpacing: '0.06em' }}>{w}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── FaWill Cleaning case study ── */
function FaWillCleaningContent() {
  const ACCENT = '#1266B0'

  const CtaLink = ({ children }) => (
    <Link
      to="/contact"
      style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.text, background: 'transparent', border: BD, borderRadius: '6px', padding: '14px 24px', textDecoration: 'none', transition: 'border-color 0.2s, background 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = C.textMute; e.currentTarget.style.background = 'rgba(201,198,192,0.06)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = 'transparent' }}
    >
      {children}
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
        <path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  )

  return (
    <div>

      {/* Hero */}
      <section style={{ marginBottom: '72px' }}>
        <span style={{ ...S.eyebrow, marginBottom: '20px' }}>From Invisible to Industry Standard</span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(38px, 7vw, 80px)', color: C.text, lineHeight: 0.92, letterSpacing: '-0.04em', margin: '0 0 24px' }}>
          FaWill<br />Cleaning<br />Company
        </h1>
        <span style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.textMute, border: `1px solid ${C.border}`, borderRadius: '999px', padding: '4px 14px', marginBottom: '24px' }}>
          Commercial Services / B2B
        </span>
        <p style={{ ...S.para, fontSize: '17px', color: C.textSub, maxWidth: '600px', margin: '0 0 32px' }}>
          Building trust and brand authority for a commercial cleaning company — positioning as the premium professional choice through branding, video, and targeted bilingual marketing in Quebec's competitive cleaning market.
        </p>
        <div style={{ marginBottom: '40px' }}>
          {['Brand Identity', 'Web Design', 'Video Content', 'Paid Ads', 'Bilingual Strategy', '2024'].map(t => (
            <span key={t} style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: C.textMute, border: BD, borderRadius: '999px', padding: '4px 12px', marginRight: '8px', marginBottom: '8px' }}>{t}</span>
          ))}
        </div>
        <HeroImg src={fawillCleanImg} logo="/assets/images/fawill%20logo.png" alt="FaWill Cleaning Company" />
      </section>

      {/* At a Glance */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="01 — Client" title="FaWill Cleaning at a Glance" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', border: BD, borderRadius: '6px', overflow: 'hidden', marginBottom: '40px' }}>
          {[
            { label: 'What They Do', value: 'Commercial and corporate cleaning services — offices, retail spaces, and facilities management across Quebec.' },
            { label: 'Market', value: 'B2B services; targeting mid-market companies, corporate offices, retail chains, and property management firms.' },
            { label: 'Stage', value: 'Established local operator with years of operational excellence — scaling against national chains (Jani-King, ServiceMaster).' },
            { label: 'Audience', value: 'Facility managers, office managers, and business owners across English and French Quebec markets.' },
          ].map(item => (
            <div key={item.label} style={{ background: C.surface, padding: '28px 24px' }}>
              <span style={{ ...S.eyebrow, marginBottom: '8px' }}>{item.label}</span>
              <p style={{ ...S.para, margin: 0, fontSize: '14px' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Problem */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="02 — Challenge" title="Invisible in a crowded market." />
        <p style={S.para}>
          FaWill had years of operational excellence and loyal client relationships — but they were completely invisible in the market. Growth was limited to word-of-mouth while national chains dominated search, social, and corporate decision-maker attention.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: BD, borderRadius: '6px', overflow: 'hidden' }}>
          {[
            { label: 'No brand presence',       desc: 'Competing against national brands with zero differentiation. No clear answer to "why choose FaWill over Jani-King?"' },
            { label: 'No social proof',          desc: 'No website showcase, no testimonials, no evidence of quality. Corporate buyers need proof before committing.' },
            { label: 'No trust signals',         desc: 'New prospects had no visibility into certifications, safety protocols, or quality guarantees. Every lead meant starting from scratch.' },
            { label: 'Limited reach',            desc: 'Marketing was word-of-mouth only. No ads, no social media, no way to reach decision-makers at scale.' },
            { label: 'No bilingual strategy',    desc: 'Quebec demands French/English presence. Not having both meant missing half the addressable market — and appearing unprofessional to francophone clients.' },
            { label: 'No content showing expertise', desc: 'No before/after videos, no testimonials, no case studies. How do prospects know they\'re professional?' },
          ].map((item, i) => (
            <div key={item.label} style={{ padding: '22px 24px', borderBottom: i < 5 ? BD : 'none', background: 'transparent' }}>
              <p style={{ ...S.para, margin: '0 0 4px', color: C.text, fontWeight: 500, fontSize: '14px' }}>{item.label}</p>
              <p style={{ ...S.para, margin: 0, fontSize: '14px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Approach */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="03 — Strategy" title="Our strategic approach." />

        <div style={{ marginBottom: '40px' }}>
          <h3 style={S.h3}>Discovery & Market Research</h3>
          <p style={S.para}>
            We mapped the commercial cleaning competitive landscape: Jani-King, ServiceMaster, local franchises, and independents all competed on price and availability. None had strong positioning around quality, safety, or professionalism. That gap was the opportunity.
          </p>
          <p style={S.para}>
            Interviews with facility managers and office managers at target companies revealed the real decision factors: reliability, quality standards, safety protocols, responsiveness, and accountability. They want a long-term partner — not the cheapest vendor available this week.
          </p>
        </div>

        <div style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '28px', marginBottom: '40px', borderLeft: `3px solid ${ACCENT}` }}>
          <span style={{ ...S.eyebrow, marginBottom: '12px' }}>Our Recommendation</span>
          <p style={{ ...S.para, margin: 0, fontSize: '15px', color: C.textSub }}>
            <strong style={{ color: C.text, fontWeight: 600 }}>Position FaWill as the professional choice for corporations who value quality, safety, and reliability over just low cost.</strong> Build a brand that says "we're thorough, certified, and trustworthy." Then prove it through video case studies, bilingual content, and targeted ads reaching decision-makers directly.
          </p>
        </div>

        <h3 style={{ ...S.h3, marginBottom: '16px' }}>Strategic Pillars</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {[
            { num: '01', title: 'Premium Professional Brand',       desc: 'A clean, modern visual identity that competes visually with larger corporations — the brand says "reliable choice," not "cheapest option."' },
            { num: '02', title: 'Proof-Based Marketing',            desc: 'Video case studies, before/after galleries, client testimonials, safety certifications — content as the primary sales tool.' },
            { num: '03', title: 'Bilingual Market Dominance',       desc: 'Native English and French presence — not just translated content. Bilingual excellence doubles the addressable market.' },
            { num: '04', title: 'Targeted Lead Generation',         desc: 'Reach facility managers and business owners with LinkedIn, Google, and Facebook ads speaking to their specific operational pain points.' },
          ].map(p => (
            <div key={p.num} style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '24px' }}>
              <span style={{ ...S.eyebrow, color: ACCENT, marginBottom: '12px' }}>{p.num}</span>
              <p style={{ ...S.para, margin: '0 0 8px', color: C.text, fontWeight: 500, fontSize: '14px' }}>{p.title}</p>
              <p style={{ ...S.para, margin: 0, fontSize: '13px' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Built */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="04 — Deliverables" title="What we built." />

        {/* Brand Identity */}
        <div style={{ marginBottom: '52px' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>1. Complete Brand Identity System</h3>
          <p style={S.para}>A professional, modern brand that competes with larger corporations at every touchpoint — digital, print, signage, uniforms, and marketing collateral. Every choice reinforces "trustworthy and precise."</p>
          <FaWillCleaningBrandKit />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '20px' }}>
            {['Logo variations — EN/FR lockups & usage', 'Brand guidelines spread — bilingual edition'].map(l => (
              <ImgBox key={l} label={l} aspect="4/3" />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: BD, borderRadius: '6px', overflow: 'hidden' }}>
            {[
              { label: 'Color',       detail: 'Trust Blue (#1266B0) — reliability & corporate trust. Fresh Aqua (#00B4D8) — cleanliness & precision. Deep Charcoal (#1A2332) — authority & sophistication.' },
              { label: 'Typography',  detail: 'Raleway (headlines — clean, modern, professional), Source Sans Pro (body — highly legible for long-form), Lato (UI, captions, bilingual content).' },
              { label: 'Visual Language', detail: 'Professional photography of pristine commercial spaces. Uniformed team portraits. Safety badges and certification seals. Clean layouts with corporate but approachable tone.' },
              { label: 'Bilingual',   detail: 'Brand voice guide for both English and French — not translation, but native tone. Separate messaging frameworks ensuring proper French voice across all touchpoints.' },
            ].map((item, i) => (
              <div key={item.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(80px, 110px) 1fr', borderBottom: i < 3 ? BD : 'none' }}>
                <div style={{ padding: '16px 20px', borderRight: BD, background: C.surface }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: C.textMute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.label}</span>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <p style={{ ...S.para, margin: 0, fontSize: '13px' }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Website */}
        <div style={{ marginBottom: '52px' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>2. Website & Bilingual Lead Generation Hub</h3>
          <p style={S.para}>The website is the credibility hub — converting facility managers and business owners into quote requests. Built for SEO in both English and French, with local landing pages for Quebec markets.</p>
          <div style={{ marginBottom: '12px' }}>
            <ImgBox label="Homepage hero — pristine commercial space + quote CTA" aspect="16/9" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '20px' }}>
            {['Services breakdown — office / retail / facility', 'Case studies — before/after with metrics', 'Mobile bilingual view (EN/FR)'].map(l => (
              <ImgBox key={l} label={l} aspect="3/4" />
            ))}
          </div>
          <div style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '20px 24px' }}>
            <span style={{ ...S.eyebrow, marginBottom: '12px' }}>Page Architecture</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Home — trust signals + CTA', 'Services — office / retail / facility mgmt', 'Why FaWill — certifications & differentiators', 'Case Studies — before/after with metrics', 'Testimonials — real client quotes + photos', 'Certifications & Safety — trust page', 'Quote Request — fast bilingual form'].map(page => (
                <span key={page} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: C.textSub, background: C.docBg, border: BD, borderRadius: '4px', padding: '5px 10px' }}>{page}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Video Content */}
        <div style={{ marginBottom: '52px' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>3. Cinematic Video Content</h3>
          <p style={S.para}>Video is the most persuasive format for a service business. Seeing a space transform from neglected to pristine builds emotional trust far faster than any written description — especially for corporate buyers making long-term decisions.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '16px' }}>
            {['Hero transformation reel — dirty to pristine (bilingual)', 'Case study video — client testimonial + before/after B-roll', 'Process video — team in action, safety protocols, quality checks', 'Social media reels — 15-30 sec transformation clips'].map(l => (
              <ImgBox key={l} label={l} aspect="16/9" />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: BD, borderRadius: '6px', overflow: 'hidden' }}>
            {[
              { label: 'Hero Video',      detail: '10-second cinematic transformation reel. Subtitled EN/FR. Used across website, social, and ads.' },
              { label: 'Case Studies',    detail: '30-60 second videos with real client testimonials and before/after B-roll of transformed spaces.' },
              { label: 'Process Videos',  detail: 'Behind-the-scenes clips showing safety gear, team professionalism, quality control. Builds service confidence.' },
              { label: 'Social Reels',    detail: 'Short-form 15-30 sec clips optimized for Instagram and TikTok for ongoing discovery.' },
            ].map((item, i) => (
              <div key={item.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(80px, 110px) 1fr', borderBottom: i < 3 ? BD : 'none' }}>
                <div style={{ padding: '14px 20px', borderRight: BD, background: C.surface }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: C.textMute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.label}</span>
                </div>
                <div style={{ padding: '14px 20px' }}>
                  <p style={{ ...S.para, margin: 0, fontSize: '13px' }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paid Ads */}
        <div style={{ marginBottom: '52px' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>4. Targeted Ad Strategy & Lead Generation</h3>
          <p style={S.para}>Content exists — now it reaches the right people. Separate bilingual ad structures for English corporate and French Quebec markets, each with culturally appropriate messaging rather than translated copy.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '16px' }}>
            {['LinkedIn ad creative — facility manager targeting', 'Facebook/Instagram — before/after video ads', 'Google Local Services — search placement', 'Bilingual campaign structure — EN/FR ad sets'].map(l => (
              <ImgBox key={l} label={l} aspect="4/3" />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: BD, borderRadius: '6px', overflow: 'hidden' }}>
            {[
              { label: 'LinkedIn',    detail: 'Facility managers and business owners at mid-market companies. Case studies and testimonials as lead gen forms.' },
              { label: 'Facebook/IG', detail: 'Before/after video content targeting business decision-makers. Retargeting for website visitors who didn\'t convert.' },
              { label: 'Google LSA',  detail: 'Top-of-results presence for "commercial cleaning Quebec," "office cleaning [city]" high-intent searches.' },
              { label: 'Bilingual',   detail: 'Separate EN/FR ad sets — native French voice, not translation. Culturally appropriate creative for each segment.' },
            ].map((item, i) => (
              <div key={item.label} style={{ display: 'grid', gridTemplateColumns: 'minmax(70px, 90px) 1fr', borderBottom: i < 3 ? BD : 'none' }}>
                <div style={{ padding: '14px 20px', borderRight: BD, background: C.surface }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: C.textMute, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.label}</span>
                </div>
                <div style={{ padding: '14px 20px' }}>
                  <p style={{ ...S.para, margin: 0, fontSize: '13px' }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social & Email */}
        <div style={{ marginBottom: '0' }}>
          <h3 style={{ ...S.h3, marginBottom: '16px' }}>5. Social Presence & Email Automation</h3>
          <p style={S.para}>LinkedIn for B2B thought leadership and direct decision-maker outreach. Facebook for community engagement and reviews. Email sequences for lead nurturing, onboarding, renewal reminders, and win-back campaigns — all bilingual.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
            {['LinkedIn page — thought leadership + company authority', 'Email automation workflow — onboarding to renewal'].map(l => (
              <ImgBox key={l} label={l} aspect="16/9" />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="05 — Process" title="How we worked together." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { week: 'Weeks 1–2',   title: 'Discovery & Positioning',    desc: 'Brand strategy with CEO. Competitive mapping, ICP research, bilingual market analysis. Outcome: "premium professional" positioning.' },
            { week: 'Weeks 3–4',   title: 'Brand System & Architecture', desc: 'Logo, colour palette, typography, bilingual brand voice guide. Website architecture and content outline.' },
            { week: 'Weeks 5–6',   title: 'Website Build',              desc: 'Full website development, SEO implementation, bilingual page structure, lead capture forms, and analytics setup.' },
            { week: 'Weeks 7–8',   title: 'Video Production',           desc: 'On-site filming of team in action and space transformations. Case study selection and client interviews.' },
            { week: 'Week 9+',     title: 'Launch & Ongoing',           desc: 'Content calendar execution, ad campaign launch and optimization, email automation setup, bi-weekly performance reviews.' },
          ].map((step, i) => (
            <div key={step.week} style={{ display: 'grid', gridTemplateColumns: 'minmax(80px, 110px) 1fr', borderBottom: i < 4 ? BDD : 'none', paddingBottom: '24px', marginBottom: '24px', gap: '24px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: ACCENT, letterSpacing: '0.08em', textTransform: 'uppercase', paddingTop: '2px' }}>{step.week}</span>
              <div>
                <h3 style={{ ...S.h3, marginBottom: '6px', fontSize: '15px' }}>{step.title}</h3>
                <p style={{ ...S.para, margin: 0, fontSize: '14px' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '20px 24px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {[
            { label: 'Timeline',      value: 'February 2024 – Present (ongoing)' },
            { label: 'Collaboration', value: 'Bi-weekly calls · Figma reviews · Slack' },
            { label: 'Approach',      value: 'Video-led; expanded bilingual content as French market showed strong response' },
          ].map(item => (
            <div key={item.label}>
              <span style={{ ...S.eyebrow, marginBottom: '6px' }}>{item.label}</span>
              <p style={{ ...S.para, margin: 0, fontSize: '13px', color: C.textSub }}>{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section style={{ marginBottom: '72px' }}>
        <SectionHead num="06 — Results" title="Early impact." />
        <p style={{ ...S.para, marginBottom: '32px' }}>
          Early metrics show meaningful traction across lead volume, brand perception, and bilingual reach. Full results are being tracked and updated as campaigns mature.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '40px' }}>
          {[
            { title: 'Brand Authority',        desc: 'FaWill now presents on par with national chains. Corporate buyers immediately see professional signals — certifications, case studies, safety standards.' },
            { title: 'Bilingual Penetration',  desc: 'French-language leads now represent a significant portion of inbound. Native-voice bilingual content opened a market segment that was previously unreachable.' },
            { title: 'Proof-Driven Pipeline',  desc: 'Before/after video content consistently outperforms static ads. Case study videos convert to quote requests at measurable rates.' },
            { title: 'Premium Client Quality', desc: 'Positioning shift attracted longer-term recurring contracts instead of one-off clients. Better contracts, better retention, less price-shopping.' },
          ].map(item => (
            <div key={item.title} style={{ background: C.surface, border: BD, borderRadius: '6px', padding: '24px' }}>
              <p style={{ ...S.para, margin: '0 0 8px', color: C.text, fontWeight: 500, fontSize: '14px' }}>{item.title}</p>
              <p style={{ ...S.para, margin: 0, fontSize: '13px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ border: BD, borderRadius: '6px', overflow: 'hidden', marginBottom: '40px' }}>
          <div style={{ padding: '16px 24px', borderBottom: BD, background: C.surface }}>
            <span style={{ ...S.eyebrow, margin: 0 }}>Ongoing Targets</span>
          </div>
          {[
            { metric: 'Lead volume',    target: '[ X ] qualified leads/month through organic + paid — TBD' },
            { metric: 'Cost per lead',  target: '[ X ] CAD CPL after optimization — TBD' },
            { metric: 'New contracts',  target: '[ X ] new recurring contracts attributed to digital — TBD' },
            { metric: 'Bilingual split', target: 'Target: 40%+ of inbound from French Quebec market' },
          ].map((row, i) => (
            <div key={row.metric} style={{ display: 'grid', gridTemplateColumns: 'minmax(100px, 140px) 1fr', borderBottom: i < 3 ? BDD : 'none' }}>
              <div style={{ padding: '14px 20px', borderRight: BD }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: C.textMute, letterSpacing: '0.04em' }}>{row.metric}</span>
              </div>
              <div style={{ padding: '14px 20px' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: C.textSub }}>{row.target}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ border: BD, borderRadius: '6px', padding: '28px', background: C.surface }}>
          <span style={{ ...S.eyebrow, marginBottom: '16px', color: ACCENT }}>Client Testimonial</span>
          <blockquote style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(17px, 2.2vw, 22px)', color: C.textMute, lineHeight: 1.55, margin: '0 0 20px', letterSpacing: '-0.01em' }}>
            "[ CEO quote on the brand relaunch's impact — lead quality improvement and competing against larger chains — pending ]"
          </blockquote>
          <p style={{ ...S.para, margin: 0, fontSize: '13px', color: C.textFade }}>— CEO &amp; Founder, FaWill Cleaning Company</p>
        </div>
        <a
          href="#"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.textMute, textDecoration: 'none', marginTop: '24px', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = C.text}
          onMouseLeave={e => e.currentTarget.style.color = C.textMute}
        >
          View live project
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      </section>

      {/* CTA */}
      <section style={{ marginBottom: '0' }}>
        <hr style={S.rule} />
        <p style={{ ...S.para, fontSize: '13px', marginBottom: '24px' }}>
          Whether you're in cleaning, landscaping, HVAC, or any service business competing against larger chains — the playbook is the same: build professional brand trust, showcase proof through video and case studies, and reach decision-makers with targeted bilingual messaging.
        </p>
        <CtaLink>Schedule a free service business strategy session</CtaLink>
      </section>

    </div>
  )
}

/* ── Scene Set Studio case study ── */
function SceneSetContent() {
  const ACCENT = '#D4001E'

  const swatches = [
    { hex: '#080808', name: 'Void'      },
    { hex: '#D4001E', name: 'Scene Red' },
    { hex: '#F2F0EB', name: 'Cream'     },
    { hex: '#141414', name: 'Surface'   },
  ]

  const fonts = [
    { name: 'Playfair Display', role: 'Headlines', family: "'Playfair Display', Georgia, serif" },
    { name: 'DM Sans',          role: 'Body & UI', family: "'DM Sans', system-ui, sans-serif"   },
  ]

  return (
    <div>

      {/* Hero */}
      <section style={{ marginBottom: '80px' }}>
        {/* Logo mark — two overlapping rotated rectangles */}
        <svg width="56" height="56" viewBox="0 0 68 68" fill="none" aria-hidden="true"
          style={{ display: 'block', marginBottom: '28px' }}>
          <rect x="8" y="6" width="26" height="42" rx="4"
            transform="rotate(-12 21 27)"
            fill="rgba(212,0,30,0.1)" stroke="#D4001E" strokeWidth="1.5"/>
          <rect x="34" y="20" width="26" height="42" rx="4"
            transform="rotate(12 47 41)"
            fill="rgba(242,240,235,0.03)" stroke="rgba(242,240,235,0.22)" strokeWidth="1.5"/>
        </svg>

        <span style={{ ...S.eyebrow, marginBottom: '20px' }}>In-House · 2024</span>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          fontSize: 'clamp(56px, 10vw, 112px)',
          color: C.text,
          lineHeight: 0.88,
          letterSpacing: '-0.04em',
          margin: '0 0 40px',
        }}>
          Building<br />Our Own<br />Brand
        </h1>

        <HeroImg src={sceneSetImg} logo="/sss%20logo2.svg" alt="Scene Set Studio" />
      </section>

      {/* The challenge — one paragraph */}
      <section style={{ marginBottom: '72px' }}>
        <p style={{ ...S.para, fontSize: '17px', lineHeight: 1.9, color: C.textSub, maxWidth: '580px' }}>
          We had the vision and the skill — but the brand didn't match either. We couldn't help clients build distinctive identities while ours looked like everyone else's. So we built it ourselves, held to the same standard we'd hold any client.
        </p>
        <p style={{ ...S.para, fontSize: '15px', color: C.textMute, maxWidth: '500px', margin: 0 }}>
          No brief. No client approval to hide behind. Just taste, capability, and philosophy on the page.
        </p>
      </section>

      {/* Brand identity — visual only, minimal copy */}
      <section style={{ marginBottom: '72px' }}>
        <hr style={S.rule} />
        <span style={{ ...S.eyebrow, marginBottom: '32px', display: 'block' }}>Creative Direction</span>

        {/* Colour swatches */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(68px, 1fr))',
          gap: '1px',
          border: BD,
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '10px',
        }}>
          {swatches.map(sw => (
            <div key={sw.hex} style={{
              background: sw.hex,
              aspectRatio: '1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '14px',
              position: 'relative',
            }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, color: sw.hex === '#F2F0EB' ? 'rgba(0,0,0,0.5)' : 'rgba(242,240,235,0.55)', margin: '0 0 2px' }}>{sw.name}</p>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: sw.hex === '#F2F0EB' ? 'rgba(0,0,0,0.35)' : 'rgba(242,240,235,0.3)', margin: 0, letterSpacing: '0.04em' }}>{sw.hex}</p>
            </div>
          ))}
        </div>

        {/* Typography — two side-by-side cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {fonts.map(f => (
            <div key={f.name} style={{ background: C.surface, border: BD, borderRadius: '8px', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: ACCENT, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{f.role}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: C.text, margin: 0 }}>{f.name}</p>
              </div>
              <p style={{ fontFamily: f.family, fontSize: '72px', fontWeight: 700, color: C.text, lineHeight: 1, margin: 0, letterSpacing: '-0.03em' }}>Aa</p>
            </div>
          ))}
        </div>
      </section>

      {/* The website — brief, punchy */}
      <section style={{ marginBottom: '72px' }}>
        <hr style={S.rule} />
        <span style={{ ...S.eyebrow, marginBottom: '32px', display: 'block' }}>The Website</span>
        <p style={{ ...S.para, fontSize: '16px', lineHeight: 1.9, maxWidth: '560px', marginBottom: '28px' }}>
          Built for one constraint: fast, fluid, and feel like nothing else. Every interaction was deliberate — scroll-driven 3D sequences, frame animations, smooth Lenis scrolling, GSAP-powered motion throughout.
        </p>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: C.textMute,
          letterSpacing: '0.04em',
          lineHeight: 2,
          margin: 0,
          borderTop: BDD,
          paddingTop: '20px',
        }}>
          React + Vite · GSAP + ScrollTrigger · Lenis · Tailwind CSS · Netlify
        </p>
      </section>

      {/* The statement — the whole point */}
      <section style={{ marginBottom: '72px' }}>
        <div style={{
          borderTop: `2px solid ${ACCENT}`,
          paddingTop: '36px',
        }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(22px, 3.5vw, 34px)',
            color: C.text,
            lineHeight: 1.45,
            letterSpacing: '-0.02em',
            margin: '0 0 28px',
            maxWidth: '620px',
          }}>
            "Most portfolios describe the work. Ours is the work. Every animation you scrolled past is a sample. Every motion choice was deliberate — not decoration."
          </p>
          <p style={{ ...S.para, margin: 0, fontSize: '13px', color: C.textMute }}>
            If scrolling this site gave you a feeling — that's exactly the point.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ marginBottom: '0' }}>
        <hr style={S.rule} />
        <Link
          to="/contact"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.text, background: 'transparent', border: BD, borderRadius: '6px', padding: '14px 24px', textDecoration: 'none', transition: 'border-color 0.2s, background 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.background = 'rgba(212,0,30,0.06)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = 'transparent' }}
        >
          Let's build yours
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
            <path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </section>

    </div>
  )
}

/* ── Generic placeholder content (for other case studies) ── */
function GenericContent({ project }) {
  const STATS = [
    { label: 'Increase in leads',    value: '—'  },
    { label: 'Organic reach growth', value: '—'  },
    { label: 'ROAS improvement',     value: '—'  },
  ]

  return (
    <>
      <section style={{ marginBottom: '80px', textAlign: 'center' }}>
        <span style={{ ...S.eyebrow, textAlign: 'center' }}>{project.category}</span>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          fontSize: 'clamp(44px, 8vw, 96px)',
          color: C.text,
          lineHeight: 0.92,
          letterSpacing: '-0.04em',
          margin: '0 0 48px',
        }}>
          {project.name}
        </h1>
        <div style={{
          width: '100%',
          aspectRatio: '16/9',
          background: C.surface,
          borderRadius: '8px',
          border: BD,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(40px, 7vw, 80px)',
            color: 'rgba(201,198,192,0.04)',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}>
            {project.name}
          </span>
        </div>
      </section>

      <section style={{ marginBottom: '80px', textAlign: 'center' }}>
        <hr style={S.rule} />
        <span style={S.eyebrow}>01 — The Challenge</span>
        <h2 style={{ ...S.h2, textAlign: 'center' }}>What needed solving.</h2>
        <p style={{ ...S.para, maxWidth: '640px', margin: '0 auto' }}>
          Coming soon — this section will describe the core business problem the client faced before working with Scene Set Studio.
        </p>
      </section>

      <section style={{ marginBottom: '80px' }}>
        <hr style={S.rule} />
        <span style={S.eyebrow}>02 — What We Built</span>
        <h2 style={{ ...S.h2, textAlign: 'center' }}>The work.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {['Creative Direction', 'Campaign Build', 'Final Delivery'].map(t => (
            <div key={t} style={{ aspectRatio: '4/3', background: C.surface, border: BD, borderRadius: '6px', display: 'flex', alignItems: 'flex-end', padding: '16px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.1em', color: C.textFade, textTransform: 'uppercase' }}>{t}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '80px' }}>
        <hr style={S.rule} />
        <span style={S.eyebrow}>03 — The Result</span>
        <h2 style={{ ...S.h2, textAlign: 'center' }}>What moved.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', border: BD, borderRadius: '6px', overflow: 'hidden' }}>
          {STATS.map(stat => (
            <div key={stat.label} style={{ padding: '40px 28px', background: C.surface, textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(40px, 5vw, 68px)', color: '#D4001E', letterSpacing: '-0.04em', margin: '0 0 10px', lineHeight: 1 }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: C.textMute, margin: 0, letterSpacing: '0.06em' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default function CaseStudy() {
  const { client } = useParams()
  const index   = CASES.findIndex(c => c.slug === client)
  const project = CASES[index] ?? { name: client, category: 'Case Study', year: '' }

  return (
    <>
      <SEO
        title={`${project.name} | Scene Set Studio`}
        description={`Case study: ${project.name} — ${project.category}`}
      />

      <div style={{ minHeight: '100dvh', background: C.pageBg, paddingTop: '80px', paddingBottom: '0' }}>

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          <div style={{
            background: C.docBg,
            border: `1px solid ${C.border}`,
            borderRadius: '12px',
            padding: 'clamp(28px, 5vw, 56px)',
            marginBottom: '0',
            position: 'relative',
            zIndex: 1,
          }}>

          {/* Back button */}
          <Link
            to="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: C.textMute,
              textDecoration: 'none',
              marginBottom: '52px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = C.text}
            onMouseLeave={e => e.currentTarget.style.color = C.textMute}
          >
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M5 1L1 5M1 5L5 9M1 5H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Work
          </Link>

          {/* Render content based on slug */}
          {client === 'tierx-dcs'          ? <TierXContent />
         : client === 'fawill-bike-pub'  ? <FaWillBikePubContent />
         : client === 'fawill-cleaning'  ? <FaWillCleaningContent />
         : client === 'sceneset-branding'? <SceneSetContent />
         : <GenericContent project={project} />}

          </div>{/* end card */}
        </div>{/* end content column */}

        {/* All Projects — full bleed footer list */}
        <div style={{ borderTop: BDD, marginTop: '40px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px clamp(16px, 4vw, 32px) 100px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
              <span style={{ ...S.eyebrow, margin: 0 }}>All Projects</span>
              <Link
                to="/work"
                style={{ fontFamily: 'var(--font-body)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.textMute, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#D4001E'}
                onMouseLeave={e => e.currentTarget.style.color = C.textMute}
              >
                View all &rarr;
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {CASES.map((c, i) => {
                const isCurrent = c.slug === client
                return isCurrent ? (
                  <div
                    key={c.slug}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: BDD, opacity: 0.35, cursor: 'default' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: C.textFade, letterSpacing: '0.1em' }}>0{i + 1}</span>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'clamp(16px, 2vw, 22px)', color: C.text, letterSpacing: '-0.02em' }}>{c.name}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.1em', color: C.textFade, textTransform: 'uppercase' }}>Current</span>
                  </div>
                ) : (
                  <Link
                    key={c.slug}
                    to={`/work/${c.slug}`}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: BDD, textDecoration: 'none', transition: 'padding 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.paddingLeft = '8px' }}
                    onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: C.textFade, letterSpacing: '0.1em' }}>0{i + 1}</span>
                      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'clamp(16px, 2vw, 22px)', color: C.text, letterSpacing: '-0.02em' }}>{c.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', letterSpacing: '0.1em', color: C.textFade, textTransform: 'uppercase' }}>{c.category}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#D4001E' }}>&rarr;</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
