import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const w1 = '/brand identity logo blueprint.png'
const w2 = '/2d image.png'
import w3 from '../assets/work/w3.jpg'
import w4 from '../assets/work/w4.jpg'
import w5 from '../assets/work/w5.jpg'

gsap.registerPlugin(ScrollTrigger)

const CANVAS_VW = 162

// w/h can be px numbers or vw strings e.g. '35vw'
const ITEMS = [
  // Large square — top left
  { type: 'img', id: 'i1', index: 1, src: w1,
    w: '35vw', h: '35vw', top: '18%', left: '8%', rotate: -1.5, z: 2 },

  // Text — below i1
  { type: 'text', id: 't1',
    lines: [
      { text: 'Brand',       accent: false },
      { text: 'Strategy',    accent: false },
      { text: '& Identity',  accent: true  },
    ],
    top: '60%', left: '4%', rotate: 0, z: 4, size: 'lg', glow: true },

  // Text — right of i1
  { type: 'text', id: 't2',
    lines: [
      { text: 'We craft',    accent: true  },
      { text: 'stories that',accent: false },
      { text: 'Move people.',accent: true  },
    ],
    top: '14%', left: '29%', rotate: -1, z: 3, size: 'md', align: 'right' },

  // Small square — bottom, right of i1
  { type: 'img', id: 'i2', index: 2, src: w2,
    w: '14vw', h: '14vw', top: '68%', left: '24%', rotate: 2, z: 2 },

  // Taller image — centre
  { type: 'img', id: 'i3', index: 3, src: w3,
    w: '20vw', h: '44vh', top: '13%', left: '42%', rotate: 1, z: 2 },

  // Text title — on i3
  { type: 'text', id: 't3a',
    lines: [
      { text: 'Content',    accent: false },
      { text: 'Production', accent: true  },
    ],
    top: '15%', left: '48%', rotate: 1, z: 5, size: 'md' },

  // Text — bottom right of i3
  { type: 'text', id: 't3',
    lines: [
      { text: 'Frames that feel real.',          accent: false },
      { text: 'Stories that outlast',            accent: true  },
      { text: 'the moment they were made.',      accent: false },
      { text: 'Built to move people',            accent: true  },
      { text: '— and product.',                  accent: false },
    ],
    top: '62%', left: '43%', rotate: 1.5, z: 3, size: 'sm' },

  // Text — right of i3, big title
  { type: 'text', id: 't4',
    lines: [
      { text: 'Reach',    accent: false },
      { text: 'the right',accent: true  },
      { text: 'people.',  accent: false },
      { text: 'Always.',  accent: true  },
    ],
    top: '17%', left: '64%', rotate: -1.5, z: 3, size: 'lg', align: 'right' },

  // Small square — below-right
  { type: 'img', id: 'i4', index: 4, src: w4,
    w: '13vw', h: '13vw', top: '58%', left: '67%', rotate: 2.5, z: 2 },

  // Text title — over i4
  { type: 'text', id: 't4b',
    lines: [
      { text: 'Social',  accent: true  },
      { text: 'Media &', accent: false },
      { text: 'Growth',  accent: true  },
    ],
    top: '60%', left: '68%', rotate: 2.5, z: 5, size: 'sm', bold: true },

  // Big tall rectangle — further right
  { type: 'img', id: 'i5', index: 5, src: w5,
    w: '26vw', h: '26vw', top: '10%', left: '80%', rotate: -1.5, z: 2 },

  // Text — below last image
  { type: 'text', id: 't5',
    lines: [
      { text: 'Video',      accent: false },
      { text: 'Production', accent: true  },
      { text: '& Creative', accent: true  },
      { text: 'Direction',  accent: false },
    ],
    top: '68%', left: '83%', rotate: 1, z: 3, size: 'md', align: 'right' },

]

// Kick off image downloads immediately — before any scroll
const IMG_SRCS = ITEMS.filter(i => i.type === 'img').map(i => i.src)
IMG_SRCS.forEach(src => { const img = new Image(); img.src = src })

export default function Features() {
  const sectionRef  = useRef(null)
  const canvasRef   = useRef(null)
  const overlayRef  = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth <= 768

    const ctx = gsap.context(() => {
      const canvas  = canvasRef.current
      const section = sectionRef.current
      if (!canvas || !section) return

      if (isMobile) {
        // Simple fade-up reveal on mobile, no horizontal scroll
        canvas.querySelectorAll('.scrap-item').forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 32 },
            {
              opacity: 1, y: 0,
              duration: 0.7, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
            }
          )
        })

        // Mobile: darken overlay as section scrolls past vertically
        gsap.fromTo(overlayRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        )
        return
      }

      const getDistance = () => window.innerWidth * (CANVAS_VW / 100 - 1)

      const hTween = gsap.to(canvas, {
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
        },
      })

      // Desktop: darken overlay as horizontal scroll progresses
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 1.2,
          },
        }
      )

      // No per-item reveal on desktop — items are visible from the start
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="feat-section scrap-section" id="features">
      <div className="feat-header">
        <span className="feat-header__label">Selected Work</span>
        <span className="feat-header__hint">Scroll →</span>
      </div>

      <div ref={overlayRef} className="scrap-overlay" aria-hidden="true" />

      <div ref={canvasRef} className="scrap-canvas" style={{ width: `${CANVAS_VW}vw` }}>
        {ITEMS.map((item) =>
          item.type === 'img' ? (
            <div
              key={item.id}
              className="scrap-item scrap-img-wrap"
              data-rot={item.rotate}
              style={{
                top: item.top,
                left: item.left,
                width: item.w,
                height: item.h,
                transform: `rotate(${item.rotate}deg)`,
                zIndex: item.z,
              }}
            >
              <img src={item.src} alt="" draggable="false" className="scrap-img" loading="eager" fetchPriority="high" />
              {item.index && (
                <span className="scrap-img__index">{String(item.index).padStart(2, '0')}</span>
              )}
            </div>
          ) : (
            <div
              key={item.id}
              className={`scrap-item scrap-text scrap-text--${item.size}${item.dark ? ' scrap-text--dark' : ''}${item.bold ? ' scrap-text--bold' : ''}${item.glow ? ' scrap-text--glow' : ''}${item.align === 'right' ? ' scrap-text--right' : ''}`}
              data-rot={item.rotate}
              style={{
                top: item.top,
                left: item.left,
                transform: `rotate(${item.rotate}deg)`,
                zIndex: item.z,
              }}
            >
              {item.lines.map((line, i) => (
                <span key={i} className={`scrap-text__line${line.accent ? ' scrap-text__line--accent' : ''}`}>
                  {line.text}
                </span>
              ))}
            </div>
          )
        )}
      </div>
    </section>
  )
}
