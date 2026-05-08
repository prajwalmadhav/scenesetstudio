import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  {
    num: '01', service: 'Brand Strategy',
    body: 'Visual language, positioning, and story.',
    tag: 'Identity / Positioning',
    imgs: [
      { role: 'hero',  top: '8%',  left: '32%', w: '58%', h: '72%', rotate: 0,  src: 'https://picsum.photos/seed/brand-hero/700/900',
        overlay: { eyebrow: 'Campaign — 2024', headline: 'The\nArt of\nDistinction.' } },
      { role: 'small', top: '68%', left: '22%', w: '22%', h: '28%', rotate: -2, src: 'https://picsum.photos/seed/brand-sm/400/520'    },
    ],
  },
  {
    num: '02', service: 'Content Production',
    body: 'Photo, video, motion — content people feel.',
    tag: 'Photo / Video / Motion',
    imgs: [
      { role: 'hero',  top: '5%',  left: '28%', w: '44%', h: '62%', rotate: 1,  src: 'https://picsum.photos/seed/content-hero/600/800' },
      { role: 'mid',   top: '52%', left: '60%', w: '32%', h: '42%', rotate: -1, src: 'https://picsum.photos/seed/content-mid/500/640'  },
      { role: 'small', top: '70%', left: '18%', w: '20%', h: '24%', rotate: 2,  src: 'https://picsum.photos/seed/content-sm/360/440'   },
    ],
  },
  {
    num: '03', service: 'Paid Advertising',
    body: 'Precision targeting. Campaigns that scale.',
    tag: 'Meta / Google / Performance',
    imgs: [
      { role: 'hero',  top: '6%',  left: '36%', w: '52%', h: '58%', rotate: -1, src: 'https://picsum.photos/seed/ads-hero/660/760'   },
      { role: 'mid',   top: '55%', left: '20%', w: '36%', h: '38%', rotate: 1,  src: 'https://picsum.photos/seed/ads-mid/520/580'    },
    ],
  },
  /* Social Media, Web Design, Video Production hidden for now
  {
    num: '04', service: 'Social Media',
    body: 'Followers become fans. Platforms become revenue.',
    tag: 'Management / Growth',
    imgs: [
      { role: 'hero',  top: '4%',  left: '24%', w: '48%', h: '68%', rotate: 0   },
      { role: 'small', top: '62%', left: '64%', w: '26%', h: '32%', rotate: -2  },
      { role: 'small', top: '72%', left: '14%', w: '18%', h: '22%', rotate: 1   },
    ],
  },
  {
    num: '05', service: 'Web Design',
    body: 'Interfaces that convert and advocate.',
    tag: 'UI / UX / Conversion',
    imgs: [
      { role: 'hero',  top: '8%',  left: '30%', w: '62%', h: '60%', rotate: 1   },
      { role: 'mid',   top: '58%', left: '18%', w: '40%', h: '36%', rotate: -1  },
    ],
  },
  {
    num: '06', service: 'Video Production',
    body: 'Films and reels that move people and product.',
    tag: 'Film / Reels / Commercial',
    imgs: [
      { role: 'hero',  top: '5%',  left: '22%', w: '54%', h: '74%', rotate: -1  },
      { role: 'small', top: '65%', left: '68%', w: '22%', h: '28%', rotate: 2   },
    ],
  },
  */
]

function lerp(a, b, t) { return a + (b - a) * t }

export default function Features() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const bgRef      = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track   = trackRef.current
      const section = sectionRef.current
      const bg      = bgRef.current
      if (!track || !section || !bg) return

      const getDistance = () => track.scrollWidth - window.innerWidth

      const hTween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            bg.style.backgroundColor = `rgba(8,8,8,${self.progress})`
          },
        },
      })

      // Per-panel staggered reveals
      track.querySelectorAll('.feat-panel--service').forEach((panel) => {
        panel.querySelectorAll('.feat-img-abs').forEach((img, ii) => {
          gsap.fromTo(img,
            { opacity: 0, y: ii % 2 === 0 ? 32 : -24, scale: 0.94, rotate: parseFloat(img.dataset.rot || 0) - 2 },
            {
              opacity: 1, y: 0, scale: 1, rotate: parseFloat(img.dataset.rot || 0),
              duration: 1.0, ease: 'power3.out', delay: ii * 0.12,
              scrollTrigger: { trigger: panel, containerAnimation: hTween, start: 'left 82%', toggleActions: 'play none none reverse' },
            }
          )
        })
        gsap.fromTo(
          panel.querySelectorAll('.feat-text-reveal'),
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: panel, containerAnimation: hTween, start: 'left 78%', toggleActions: 'play none none reverse' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="feat-section" id="features">
      <div ref={bgRef} className="feat-bg" />

      <div className="feat-header">
        <span className="feat-header__label">Selected Work</span>
        <span className="feat-header__hint">Scroll →</span>
      </div>

      <div ref={trackRef} className="feat-track">

        {/* Intro — heading overlaid on large image */}
        <div className="feat-panel feat-panel--intro">
          <div className="feat-intro-bg">
            <img
              className="feat-intro-bg__img"
              src="https://picsum.photos/seed/editorial-intro/800/1000"
              alt=""
              draggable="false"
            />
            <div className="feat-intro-bg__editorial">
              <span className="feat-intro-bg__editorial-label">Editorial</span>
              <div className="feat-intro-bg__editorial-body">
                <p className="feat-intro-bg__editorial-text">
                  Where craft<br />meets intent.
                </p>
                <p className="feat-intro-bg__editorial-para">
                  Every frame is a decision. Every campaign a deliberate act of storytelling — built to move people, shift perception, and leave something behind.
                </p>
              </div>
            </div>
          </div>
          <div className="feat-intro-overlay">
            <p className="feat-text-reveal feat-intro__eyebrow">Our Work</p>
            <h2 className="feat-text-reveal feat-intro__title">Selected<br />Work.</h2>
            <p className="feat-text-reveal feat-intro__sub">A curated look at what we've built.</p>
          </div>
        </div>

        {/* Services — abstract mixed layout */}
        {PANELS.map((p) => (
          <div key={p.num} className="feat-panel feat-panel--service">

            {/* Scattered images */}
            {p.imgs.map((img, ii) => (
              <div
                key={ii}
                className={`feat-img-abs feat-img-abs--${img.role}`}
                data-rot={img.rotate}
                style={{
                  top: img.top, left: img.left,
                  width: img.w, height: img.h,
                  transform: `rotate(${img.rotate}deg)`,
                }}
              >
                {img.src
                  ? <img className="feat-img-fill feat-img-fill--photo" src={img.src} alt="" draggable="false" />
                  : <div className="feat-img-fill" />
                }
                {img.overlay && (
                  <div className="feat-img-editorial">
                    <span className="feat-img-editorial__eyebrow">{img.overlay.eyebrow}</span>
                    <p className="feat-img-editorial__headline">
                      {img.overlay.headline.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </p>
                  </div>
                )}
                {img.role === 'hero' && (
                  <div className="feat-img-tag">{p.tag}</div>
                )}
              </div>
            ))}

            {/* Text — bottom-left, overlaid */}
            <div className="feat-text-block">
              <span className="feat-text-reveal feat-svc-num">{p.num} /</span>
              <h3 className="feat-text-reveal feat-svc-name">{p.service}</h3>
              <p className="feat-text-reveal feat-svc-body">{p.body}</p>
            </div>

          </div>
        ))}

        <div className="feat-panel feat-panel--spacer" />
      </div>
    </section>
  )
}
