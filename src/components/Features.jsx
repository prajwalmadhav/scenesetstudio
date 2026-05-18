import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CANVAS_VW = 150

// w/h can be px numbers or vw strings e.g. '35vw'
const ITEMS = [
  // Large square — top left
  { type: 'img', id: 'i1', src: 'https://picsum.photos/seed/scrap-a/800/800',
    w: '35vw', h: '35vw', top: '18%', left: '8%', rotate: -1.5, z: 2 },

  // Text — below i1
  { type: 'text', id: 't1',
    lines: [
      { text: 'Brand',       accent: false },
      { text: 'Strategy',    accent: false },
      { text: '& Identity',  accent: true  },
      { text: '— 2024',      accent: true  },
    ],
    top: '48%', left: '4%', rotate: 0, z: 4, size: 'lg' },

  // Text — right of i1
  { type: 'text', id: 't2',
    lines: [
      { text: 'We craft',    accent: true  },
      { text: 'stories that',accent: false },
      { text: 'move',        accent: false },
      { text: 'people.',     accent: true  },
    ],
    top: '14%', left: '28%', rotate: -1, z: 3, size: 'sm' },

  // Small square — bottom, right of i1
  { type: 'img', id: 'i2', src: 'https://picsum.photos/seed/scrap-b/500/500',
    w: '14vw', h: '14vw', top: '52%', left: '24%', rotate: 2, z: 2 },

  // Taller image — centre
  { type: 'img', id: 'i3', src: 'https://picsum.photos/seed/scrap-c/600/900',
    w: '20vw', h: '44vh', top: '13%', left: '42%', rotate: 1, z: 2 },

  // Text title — on i3
  { type: 'text', id: 't3a',
    lines: [
      { text: 'Content',    accent: false },
      { text: 'Production', accent: true  },
    ],
    top: '15%', left: '43%', rotate: 1, z: 5, size: 'sm', dark: true },

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
  { type: 'img', id: 'i4', src: 'https://picsum.photos/seed/scrap-d/500/500',
    w: '13vw', h: '13vw', top: '58%', left: '67%', rotate: 2.5, z: 2 },

  // Text title — over i4
  { type: 'text', id: 't4b',
    lines: [
      { text: 'Social',  accent: true  },
      { text: 'Media &', accent: false },
      { text: 'Growth',  accent: true  },
    ],
    top: '60%', left: '68%', rotate: 2.5, z: 5, size: 'sm', dark: true },

  // Big tall rectangle — further right
  { type: 'img', id: 'i5', src: 'https://picsum.photos/seed/scrap-e/600/960',
    w: '18vw', h: '52vh', top: '10%', left: '82%', rotate: -1.5, z: 2 },

  // Text — below last image
  { type: 'text', id: 't5',
    lines: [
      { text: 'Video',      accent: false },
      { text: 'Production', accent: true  },
      { text: '& Creative', accent: true  },
      { text: 'Direction',  accent: false },
    ],
    top: '68%', left: '83%', rotate: 1, z: 3, size: 'sm', align: 'right' },

]

// Kick off image downloads immediately — before any scroll
const IMG_SRCS = ITEMS.filter(i => i.type === 'img').map(i => i.src)
IMG_SRCS.forEach(src => { const img = new Image(); img.src = src })

export default function Features() {
  const sectionRef = useRef(null)
  const canvasRef  = useRef(null)

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
        return
      }

      const getDistance = () => canvas.scrollWidth - window.innerWidth

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

      canvas.querySelectorAll('.scrap-item').forEach((el) => {
        const rot = parseFloat(el.dataset.rot || 0)
        gsap.fromTo(el,
          { opacity: 0, scale: 0.88, rotate: rot - 4, y: 24 },
          {
            opacity: 1, scale: 1, rotate: rot, y: 0,
            duration: 0.85, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              containerAnimation: hTween,
              start: 'left 92%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="feat-section scrap-section" id="features">
      <div className="feat-header">
        <span className="feat-header__label">Selected Work</span>
        <span className="feat-header__hint">Scroll →</span>
      </div>

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
            </div>
          ) : (
            <div
              key={item.id}
              className={`scrap-item scrap-text scrap-text--${item.size}${item.dark ? ' scrap-text--dark' : ''}${item.align === 'right' ? ' scrap-text--right' : ''}`}
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
