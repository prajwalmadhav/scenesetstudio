import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  {
    id: 'brand-strategy',
    num: '01',
    service: 'Brand Strategy',
    tagline: 'Identity that commands attention.',
    body: 'We build the foundation — visual language, positioning, and story — so every touchpoint earns trust.',
    images: [
      { w: 440, h: 320, top: '12%', left: '48%', label: 'Brand Identity, 2024' },
      { w: 220, h: 160, top: '58%', left: '62%', label: 'Visual System' },
    ],
  },
  {
    id: 'content-production',
    num: '02',
    service: 'Content Production',
    tagline: 'Stories that stop the scroll.',
    body: 'From concept to final cut — photo, video, and motion that makes your audience feel something real.',
    images: [
      { w: 520, h: 380, top: '8%',  left: '38%', label: 'Campaign Shoot, 2024' },
      { w: 180, h: 240, top: '62%', left: '22%', label: 'Behind the Lens' },
    ],
  },
  {
    id: 'paid-advertising',
    num: '03',
    service: 'Paid Advertising',
    tagline: 'Every rupee working harder.',
    body: 'Data-driven creative meets precision targeting. We run campaigns that scale profitably.',
    images: [
      { w: 360, h: 260, top: '18%', left: '55%', label: 'Performance Campaign' },
      { w: 260, h: 180, top: '55%', left: '40%', label: 'Meta Ads, 2024' },
    ],
  },
  {
    id: 'social-media',
    num: '04',
    service: 'Social Media',
    tagline: 'Presence that builds equity.',
    body: 'Followers become fans, platforms become revenue. We manage and grow your brand voice daily.',
    images: [
      { w: 300, h: 420, top: '10%', left: '50%', label: 'Social Content' },
      { w: 200, h: 140, top: '68%', left: '65%', label: 'Engagement Campaign' },
    ],
  },
  {
    id: 'web-design',
    num: '05',
    service: 'Web Design',
    tagline: 'Interfaces that earn trust.',
    body: 'Premium digital experiences that convert visitors into customers and customers into advocates.',
    images: [
      { w: 480, h: 300, top: '15%', left: '42%', label: 'Web Project, 2024' },
      { w: 160, h: 200, top: '60%', left: '28%', label: 'UI Detail' },
    ],
  },
  {
    id: 'video-production',
    num: '06',
    service: 'Video Production',
    tagline: 'Cinematic. Commercial. Compelling.',
    body: 'From brand films to product reels — we produce video that moves people and moves product.',
    images: [
      { w: 560, h: 360, top: '8%',  left: '36%', label: 'Brand Film, 2024' },
      { w: 200, h: 140, top: '65%', left: '62%', label: 'Reel Cut' },
    ],
  },
]

function blendColor(hex1, hex2, t) {
  const parse = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)]
  const [r1,g1,b1] = parse(hex1)
  const [r2,g2,b2] = parse(hex2)
  return `rgb(${Math.round(r1+(r2-r1)*t)},${Math.round(g1+(g2-g1)*t)},${Math.round(b1+(b2-b1)*t)})`
}

export default function Features() {
  const sectionRef = useRef(null)
  const bgRef      = useRef(null)
  const panelRefs  = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = panelRefs.current.filter(Boolean)

      panels.forEach((panel, i) => {
        const progress = i / (PANELS.length - 1)

        // Background color transition dark → light
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 55%',
          onEnter: () => {
            gsap.to(bgRef.current, {
              backgroundColor: blendColor('#080808', '#F0EDE8', progress),
              duration: 1.4, ease: 'power2.out',
            })
          },
          onEnterBack: () => {
            const p = Math.max(0, (i - 1) / (PANELS.length - 1))
            gsap.to(bgRef.current, {
              backgroundColor: blendColor('#080808', '#F0EDE8', p),
              duration: 1.4, ease: 'power2.out',
            })
          },
        })

        // Text reveal
        gsap.fromTo(
          panel.querySelectorAll('.feat-reveal'),
          { opacity: 0, y: 44 },
          {
            opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: panel, start: 'top 65%' },
          }
        )

        // Image entrances + parallax
        panel.querySelectorAll('.feat-img-block').forEach((img, ii) => {
          gsap.fromTo(img,
            { opacity: 0, y: ii % 2 === 0 ? 80 : -50, scale: 0.93 },
            {
              opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out',
              delay: ii * 0.18,
              scrollTrigger: { trigger: panel, start: 'top 68%' },
            }
          )
          gsap.to(img, {
            y: ii % 2 === 0 ? -70 : 50,
            ease: 'none',
            scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 1.8 },
          })
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="feat-section" id="features">
      <div ref={bgRef} className="feat-bg" />

      <div className="feat-sticky-label">
        <span className="feat-sticky-eyebrow">Our Services</span>
        <span className="feat-sticky-hint">Scroll ↓</span>
      </div>

      {PANELS.map((panel, i) => (
        <div key={panel.id} ref={el => panelRefs.current[i] = el} className="feat-panel">

          {/* Text — left side, vertically centered */}
          <div className="feat-text-col" style={{ color: i < 3 ? 'rgba(242,240,235,0.92)' : 'rgba(15,15,15,0.9)' }}>
            <span className="feat-reveal feat-num">{panel.num} /</span>
            <h2 className="feat-reveal feat-service-name">{panel.service}</h2>
            <p className="feat-reveal feat-tagline">{panel.tagline}</p>
            <p className="feat-reveal feat-body">{panel.body}</p>
          </div>

          {/* Images — scattered right side */}
          <div className="feat-img-zone">
            {panel.images.map((img, ii) => (
              <div
                key={ii}
                className="feat-img-block"
                style={{ width: img.w, height: img.h, top: img.top, left: img.left }}
              >
                <div className="feat-img-fill" />
                <span className="feat-img-label">{img.label}</span>
              </div>
            ))}
          </div>

        </div>
      ))}
    </section>
  )
}
