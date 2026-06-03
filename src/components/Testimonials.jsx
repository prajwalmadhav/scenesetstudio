import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import tierxCard from '../assets/work/case-studies/tierx-dcs.webp'
import fawillBikeCard from '../assets/work/case-studies/fawill-bike-pub.webp'
import fawillCleaningCard from '../assets/work/case-studies/fawill-cleaning.webp'
import sceneSetCard from '../assets/work/case-studies/scene-set-studio.webp'
import comingSoonCard from '../assets/work/case-studies/coming-soon.webp'

/* ─────────────────────────────────────────────────────────────
   FAN TWEAKS
   rotate: degrees · y: px drop · CSS transform-origin in index.css
───────────────────────────────────────────────────────────── */
const FAN = [
  { x: -260, rotate: -10, y: 10, scale: 0.82, z: 1 },
  { x: -130, rotate:  -5, y:  4, scale: 0.90, z: 2 },
  { x:    0, rotate:   0, y:  0, scale: 1.00, z: 7 },
  { x:  130, rotate:   5, y:  4, scale: 0.90, z: 2 },
  { x:  260, rotate:  10, y: 10, scale: 0.82, z: 1 },
]

const POSTS = [
  {
    brand: 'TierX DCS',
    slug: 'tierx-dcs',
    title: 'Brand & Web',
    category: 'Brand Identity / Web Design',
    year: '2026',
    stat: '01',
    art: 'founder',
    image: tierxCard,
    logo: '/assets/images/tierx%20logo.png',
    mark: 'TX',
    outcome: 'North American market entry',
    deliverables: ['Brand', 'Web', '3D'],
    palette: ['#0E9FD8', '#00C48C', '#0A0E1A'],
  },
  {
    brand: 'FaWill Bike Pub',
    slug: 'fawill-bike-pub',
    title: 'Brand Launch',
    category: 'Brand Identity / Web / Social',
    year: '2026',
    stat: '02',
    art: 'hospitality',
    image: fawillBikeCard,
    logo: '/assets/images/bikepub%20logo.png',
    mark: 'FB',
    outcome: 'Zero to booked in 8 weeks',
    deliverables: ['Brand', 'Web', 'Social'],
    palette: ['#35AC8F', '#E9E4D2', '#333433'],
  },
  {
    brand: 'FaWill Cleaning',
    slug: 'fawill-cleaning',
    title: 'B2B Rebrand',
    category: 'Brand Strategy / Video / Ads',
    year: '2025',
    stat: '03',
    art: 'studio',
    image: fawillCleaningCard,
    logo: '/assets/images/fawill%20logo.png',
    mark: 'FC',
    outcome: 'Bilingual market entry',
    deliverables: ['Brand', 'Video', 'Ads'],
    palette: ['#1266B0', '#00B4D8', '#1A2332'],
  },
  {
    brand: 'Scene Set Studio',
    slug: 'sceneset-branding',
    title: 'Website Case Study',
    category: 'Brand System / Web Experience',
    year: '2026',
    stat: '04',
    art: 'sceneset',
    image: sceneSetCard,
    logo: '/sss%20logo2.svg',
    mark: 'SS',
    outcome: 'Full brand & web build',
    deliverables: ['UX', 'Identity', 'Motion'],
    palette: ['#F2F0EB', '#D4001E', '#080808'],
  },
  {
    brand: 'Coming Soon',
    title: '—',
    category: 'New Project',
    year: '2026',
    stat: '05',
    art: 'retail',
    image: comingSoonCard,
    mark: '—',
    outcome: 'In progress',
    deliverables: ['TBD'],
    palette: ['#222222', '#2e2e2e', '#111111'],
  },
]

function CaseStudyCover({ post }) {
  return (
    <article
      className={`scard scard--case scard--case-${post.art}`}
      aria-label={`${post.brand} case study cover`}
      style={{
        '--case-accent': post.palette[0],
        '--case-accent-2': post.palette[1],
        '--case-base': post.palette[2],
      }}
    >
      <div className="case-cover__top">
        <span>{post.stat}</span>
        <span>{post.year}</span>
      </div>
      <div className="case-cover__hero" aria-hidden="true">
        <img className="case-cover__image" src={post.image} alt="" loading="lazy" />
        <div className="case-cover__heroShade" />
        <div className="case-cover__mark">
          {post.logo ? <img src={post.logo} alt="" /> : <span>{post.brand === 'Coming Soon' ? 'CS' : post.mark}</span>}
        </div>
      </div>
      <div className="case-cover__deliverables">
        {post.deliverables.map(item => <span key={item}>{item}</span>)}
      </div>
      <div className="case-cover__footer">
        <div>
          <span className="case-cover__label">Case Study</span>
          <h3>{post.brand}</h3>
          <p>{post.outcome}</p>
        </div>
        <div className="case-cover__palette" aria-hidden="true">
          {post.palette.map(color => <span key={color} style={{ background: color }} />)}
        </div>
      </div>
      <span className="case-cover__category">{post.category}</span>
    </article>
  )
}

function PhotoCard({ post }) {
  return <CaseStudyCover post={post} />
}

/* ── Logo Grid ── */
const LOGOS = [
  {
    id: 'premiere',
    label: 'Adobe Premiere Pro',
    viewBox: '0 0 24 24',
    path: 'M10.15 8.42a2.93 2.93 0 00-1.18-.2 13.9 13.9 0 00-1.09.02v3.36l.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03a1.45 1.45 0 00-.93-1.46zM19.75.3H4.25A4.25 4.25 0 000 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.09 11.65c-.4.56-.96.98-1.61 1.22-.68.25-1.43.34-2.25.34l-.5-.01-.43-.01v3.21a.12.12 0 01-.11.14H5.82c-.08 0-.12-.04-.12-.13V6.42c0-.07.03-.11.1-.11l.56-.01.76-.02.87-.02.91-.01c.82 0 1.5.1 2.06.31.5.17.96.45 1.34.82.32.32.57.71.73 1.14.15.42.23.85.23 1.3 0 .86-.2 1.57-.6 2.13zm6.82-3.15v1.95c0 .08-.05.11-.16.11a4.35 4.35 0 00-1.92.37c-.19.09-.37.21-.51.37v5.1c0 .1-.04.14-.13.14h-1.97a.14.14 0 01-.16-.12v-5.58l-.01-.75-.02-.78c0-.23-.02-.45-.04-.68a.1.1 0 01.07-.11h1.78c.1 0 .18.07.2.16a3.03 3.03 0 01.13.92c.3-.35.67-.64 1.08-.86a3.1 3.1 0 011.52-.39c.07-.01.13.04.14.11v.04z',
  },
  {
    id: 'perplexity',
    label: 'Perplexity',
    viewBox: '0 0 24 24',
    path: 'M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z',
  },
  {
    id: 'illustrator',
    label: 'Adobe Illustrator',
    viewBox: '0 0 24 24',
    path: 'M10.53 10.73c-.1-.31-.19-.61-.29-.92-.1-.31-.19-.6-.27-.89-.08-.28-.15-.54-.22-.78h-.02c-.09.43-.2.86-.34 1.29-.15.48-.3.98-.46 1.48-.14.51-.29.98-.44 1.4h2.54c-.06-.211-.14-.46-.23-.721-.09-.269-.18-.559-.27-.859zM19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zM14.7 16.83h-2.091c-.069.01-.139-.04-.159-.11l-.82-2.38H7.91l-.76 2.35c-.02.09-.1.15-.19.141H5.08c-.11 0-.14-.061-.11-.18L8.19 7.38c.03-.1.06-.21.1-.33.04-.21.06-.43.06-.65-.01-.05.03-.1.08-.11h2.59c.08 0 .12.03.13.08l3.65 10.3c.03.109 0 .16-.1.16zm3.4-.15c0 .11-.039.16-.129.16H16.01c-.1 0-.15-.061-.15-.16v-7.7c0-.1.041-.14.131-.14h1.98c.09 0 .129.05.129.14v7.7zm-.209-9.03c-.231.24-.571.37-.911.35-.33.01-.65-.12-.891-.35-.23-.25-.35-.58-.34-.92-.01-.34.12-.66.359-.89.242-.23.562-.35.892-.35.391 0 .689.12.91.35.22.24.34.56.33.89.01.34-.11.67-.349.92z',
  },
  {
    id: 'aftereffects',
    label: 'Adobe After Effects',
    viewBox: '0 0 24 24',
    path: 'M8.54 10.73c-.1-.31-.19-.61-.29-.92s-.19-.6-.27-.89c-.08-.28-.15-.54-.22-.78h-.02c-.09.43-.2.86-.34 1.29-.15.48-.3.98-.46 1.48-.13.51-.29.98-.44 1.4h2.54c-.06-.21-.14-.46-.23-.72-.09-.27-.18-.56-.27-.86zm8.58-.29c-.55-.03-1.07.26-1.33.76-.12.23-.19.47-.22.72h2.109c.26 0 .45 0 .57-.01.08-.01.16-.03.23-.08v-.1c0-.13-.021-.25-.061-.37-.178-.56-.708-.94-1.298-.92zM19.75.3H4.25C1.9.3 0 2.2 0 4.55v14.9c0 2.35 1.9 4.25 4.25 4.25h15.5c2.35 0 4.25-1.9 4.25-4.25V4.55C24 2.2 22.1.3 19.75.3zm-7.04 16.511h-2.09c-.07.01-.14-.041-.16-.11l-.82-2.4H5.92l-.76 2.36c-.02.09-.1.15-.19.14H3.09c-.11 0-.14-.06-.11-.18L6.2 7.39c.03-.1.06-.19.1-.31.04-.21.06-.43.06-.65-.01-.05.03-.1.08-.11h2.59c.07 0 .12.03.13.08l3.65 10.25c.03.11.001.161-.1.161zm7.851-3.991c-.021.189-.031.33-.041.42-.01.07-.069.13-.14.13-.06 0-.17.01-.33.021-.159.02-.35.029-.579.029-.23 0-.471-.04-.73-.04h-3.17c.039.31.14.62.31.89.181.271.431.48.729.601.4.17.841.26 1.281.25.35-.011.699-.04 1.039-.11.311-.039.61-.119.891-.23.05-.039.08-.02.08.08v1.531c0 .039-.01.08-.021.119-.021.03-.04.051-.069.07-.32.14-.65.24-1 .3-.471.09-.94.13-1.42.12-.761 0-1.4-.12-1.92-.35-.49-.211-.921-.541-1.261-.95-.319-.39-.55-.83-.69-1.31-.14-.471-.209-.961-.209-1.461 0-.539.08-1.07.25-1.59.16-.5.41-.96.75-1.37.33-.4.739-.72 1.209-.95.471-.23 1.03-.31 1.67-.31.531-.01 1.06.09 1.55.31.41.18.77.45 1.05.8.26.34.47.72.601 1.14.129.4.189.81.189 1.22 0 .24-.01.45-.019.64z',
  },
  {
    id: 'dji',
    label: 'DJI',
    viewBox: '0 0 24 24',
    path: 'M19.2 7.8a716.856 716.856 0 0 0-1.232 4.63c-.202.772-.401 1.544-.634 2.308-.226.743-.504 1.535-.91 2.21-.422.703-.969 1.253-1.726 1.604-.3.137-.615.24-.939.306-.46.09-.926.146-1.394.165-1.163.065-3.628.056-4.79.056l.713-2.64c.539 0 1.078.002 1.617-.013.52-.014 1.092-.042 1.605-.163.56-.133.984-.36 1.355-.817.337-.416.564-.935.75-1.424.34-.893.688-2.173.934-3.093.277-1.041.544-2.085.812-3.129zm4.8 0-2.072 7.68h-3.84l2.073-7.68ZM11.339 4.92h3.84c-.403 1.5-.805 2.999-1.212 4.496-.283 1.044-.565 2.088-.872 3.124-.135.452-.269.903-.445 1.342-.141.352-.3.666-.591.93a1.908 1.908 0 0 1-.734.405c-.356.112-.717.154-1.085.184-.53.043-1.06.054-1.591.063-1.991.02-3.983.02-5.974-.001a21.408 21.408 0 0 1-.954-.034 5.319 5.319 0 0 1-.632-.07 1.851 1.851 0 0 1-.412-.119c-.44-.192-.664-.575-.677-1.043 0-.263.032-.525.093-.78.076-.367.171-.728.265-1.09.179-.691.506-1.966.762-2.638.2-.526.464-1.05.966-1.382.28-.186.576-.285.901-.35.241-.05.483-.075.728-.093.41-.03.82-.04 1.23-.047.582-.01 1.165-.013 1.748-.015L8.148 7.8h1.454l-.518 1.92c-.864 0-1.728-.002-2.593.003-.252.001-.504 0-.756.016a.968.968 0 0 0-.264.042c-.113.04-.17.11-.22.213-.073.15-.115.31-.162.468a84.804 84.804 0 0 0-.503 1.857c-.035.14-.07.28-.1.42-.022.099-.04.197-.05.298-.01.11-.014.242.053.345.068.103.182.127.29.143.12.018.241.021.363.025.199.006.398.007.597.008.544.003 1.089.003 1.633 0 .25-.002.501-.004.752-.014.173-.007.343-.013.513-.054.13-.031.23-.08.318-.186.056-.071.1-.15.133-.235.088-.209.15-.425.213-.641.245-.83.466-1.665.692-2.499l.675-2.503.67-2.505h3.84z',
  },
  {
    id: 'sony',
    label: 'Sony',
    viewBox: '0 0 24 24',
    path: 'M8.5505 9.8881c.921 0 1.6574.2303 2.2209.7423.3848.3485.5999.8454.5939 1.3665a1.9081 1.9081 0 0 1-.5939 1.3726c-.5272.4848-1.3483.7423-2.221.7423-.8725 0-1.6785-.2575-2.2148-.7423-.3908-.3485-.609-.8484-.603-1.3726 0-.518.2182-1.015.603-1.3665.5-.4545 1.3847-.7423 2.2149-.7423zm.003 3.6692c.4606 0 .8878-.1606 1.1878-.4575.2999-.2999.4332-.6605.4332-1.1029 0-.4242-.1484-.821-.4333-1.1029-.2938-.2908-.7332-.4545-1.1877-.4545s-.8938.1637-1.1907.4545c-.2848.2818-.4333.6787-.4333 1.103-.006.409.1485.806.4333 1.1029.2969.2939.7332.4575 1.1907.4575zm-4.8418-1.9665c.1605.0424.315.094.4666.1636a1.352 1.352 0 0 1 .3787.2576c.197.206.309.4817.306.7665a.9643.9643 0 0 1-.3787.7788 2.0662 2.0662 0 0 1-.709.3485 3.7231 3.7231 0 0 1-1.1938.1697c-.352 0-.5467-.0406-.8138-.0962l-.077-.016c-.294-.0666-.5817-.1575-.8575-.2787a.0695.0695 0 0 0-.0424-.0121c-.0454 0-.0818.0394-.0818.0848v.203H.1212v-1.4786h.5242a.7559.7559 0 0 0 .1363.418c.2121.2607.4394.3607.6575.4395.3666.1212.7514.1848 1.1362.1969.5526 0 .8756-.134.9455-.163l.009-.0037.0062-.0023c.0616-.0226.3119-.1143.3119-.3916 0-.2743-.2338-.334-.387-.373l-.022-.0058c-.1708-.046-.562-.0872-.9897-.1323l-.1526-.016c-.4848-.0515-.9696-.1273-1.1968-.1758-.4977-.1097-.6942-.2917-.816-.4045l-.0082-.0076A1.0192 1.0192 0 0 1 0 11.1608c0-.497.3394-.797.7575-.9817.4454-.2.9756-.288 1.4392-.288.8211.0031 1.4877.2697 1.727.394.097.0515.1455-.0121.1455-.0606v-.1484h.5272v1.2876h-.4727a.9056.9056 0 0 0-.2939-.4909 1.289 1.289 0 0 0-.297-.1787c-.3968-.1667-.821-.2515-1.2513-.2455-.4423 0-.8665.085-1.0786.2153-.1333.0818-.2.1848-.2.306 0 .1727.1454.2424.2182.2636.1967.0597.6328.103.972.1369.0736.0073.1426.0142.2036.0206.3272.0334 1.012.1243 1.315.2zm18.1673-.9966v-.4787H24v.4696h-.4757c-.1727 0-.2424.0334-.3727.1788l-1.4271 1.63a.098.098 0 0 0-.0182.0698v.7423a1.106 1.106 0 0 0 .0121.103.1496.1496 0 0 0 .1.0909.9368.9368 0 0 0 .1303.009h.4848v.4698h-2.5724v-.4697h.4606a.9343.9343 0 0 0 .1302-.0091.1627.1627 0 0 0 .1031-.091.5626.5626 0 0 0 .009-.1v-.7422c0-.0242 0-.0242-.0333-.0636a606.7592 606.7592 0 0 0-1.4119-1.6028c-.0758-.0788-.2061-.2061-.406-.2061h-.4576v-.4696h2.5876v.4696h-.3121c-.0697 0-.1182.0697-.0576.1455 0 0 .8696 1.0392.8787 1.0513.0091.0122.0152.0122.0273.003.0121-.009.8938-1.0453.8999-1.0543a.0912.0912 0 0 0-.0182-.1273.1095.1095 0 0 0-.0606-.0182zm-6.284-.0031h.4848c.2212 0 .2606.0848.2636.2909l.0273 1.5664-2.5815-2.324H11.944v.4697h.412c.297 0 .3182.1636.3182.309v2.2138c.0004.1285.0009.295-.1818.295h-.506v.4667h2.1634v-.4697h-.5273c-.212 0-.2211-.097-.2242-.303v-1.8816l2.9724 2.6511h.7575l-.0394-2.9966c.003-.218.0182-.2908.2424-.2908h.4726v-.4697H15.595Z',
  },
]

function CornerTicks() {
  const s = 8
  return (
    <svg className="logo-grid__ticks" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path d={`M ${s} 2 L 2 2 L 2 ${s}`}             fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <path d={`M ${100-s} 2 L 98 2 L 98 ${s}`}        fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <path d={`M ${100-s} 98 L 98 98 L 98 ${100-s}`}  fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <path d={`M ${s} 98 L 2 98 L 2 ${100-s}`}        fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
    </svg>
  )
}

function LogoGrid() {
  return (
    <div className="logo-grid">
      <p className="logo-grid__label">Trusted tools &amp; partners</p>
      <div className="logo-grid__cells">
        {LOGOS.map(({ id, label, viewBox, path }) => (
          <div key={id} className="logo-grid__cell">
            <CornerTicks />
            <svg viewBox={viewBox} fill="currentColor" aria-label={label} role="img" className={`logo-grid__svg${id === 'sony' ? ' logo-grid__svg--lg' : ''}`}>
              <path d={path} />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Mobile deck carousel ── */
function MobileCarousel() {
  const [current, setCurrent] = useState(0)
  const touchStart = useRef(null)
  const navigate = useNavigate()
  const n = POSTS.length

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % n), 3000)
    return () => clearInterval(t)
  }, [n])

  function goNext() { setCurrent(c => (c + 1) % n) }
  function goPrev() { setCurrent(c => (c - 1 + n) % n) }

  function onTouchStart(e) { touchStart.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (touchStart.current === null) return
    const dx = e.changedTouches[0].clientX - touchStart.current
    if (dx < -40) goNext()
    else if (dx > 40) goPrev()
    else {
      const post = POSTS[current]
      if (post.slug) navigate(`/work/${post.slug}`)
    }
    touchStart.current = null
  }

  return (
    <div className="mob-deck">
      <div className="mob-deck__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {POSTS.map((post, i) => {
          const offset = (i - current + n) % n
          if (offset > 2) return null
          return (
            <div key={i} className="mob-deck__card" style={{
              zIndex: n - offset,
              transform: `translateY(${offset * 12}px) scale(${1 - offset * 0.06})`,
              opacity: offset === 0 ? 1 : 0.55,
              transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease',
            }}>
              <PhotoCard post={post} />
            </div>
          )
        })}
      </div>
      <div className="mob-deck__nav">
        <button className="mob-deck__btn" onClick={goPrev} aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className="mob-deck__dots">
          {POSTS.map((_, i) => (
            <span key={i} className={`mob-deck__dot${i === current ? ' mob-deck__dot--on' : ''}`} />
          ))}
        </div>
        <button className="mob-deck__btn" onClick={goNext} aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
const CARD_TRANSITION = { type: 'tween', duration: 0.55, ease: [0.33, 1, 0.68, 1] }
const HOVER_TRANSITION = { type: 'tween', duration: 0.28, ease: [0.25, 1, 0.5, 1] }

const HOVER_NUDGE = [-40, -24, 0, 24, 40]

/* Sibling push: cards near a hovered card spread outward */
const PUSH_BY_DIST = [0, 22, 14, 8]
function getSiblingPush(pos, hovPos) {
  if (hovPos === null) return 0
  const dist = Math.abs(pos - hovPos)
  const amount = PUSH_BY_DIST[Math.min(dist, PUSH_BY_DIST.length - 1)]
  return pos < hovPos ? -amount : pos > hovPos ? amount : 0
}

export default function Testimonials() {
  const [offset, setOffset] = useState(0)
  const [busy, setBusy] = useState(false)
  const [hoveredPos, setHoveredPos] = useState(null)
  const navigate = useNavigate()
  const n = POSTS.length
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  function lock() {
    setBusy(true)
    setTimeout(() => setBusy(false), 600)
  }

  function goPrev() {
    if (busy) return
    lock()
    setOffset(o => (o - 1 + n) % n)
  }

  function goNext() {
    if (busy) return
    lock()
    setOffset(o => (o + 1) % n)
  }

  function handleCardClick(clickedIdx) {
    if (busy) return
    const pos = ((clickedIdx - offset) % n + n) % n
    const centerPos = 2
    if (pos === centerPos) {
      const post = POSTS[clickedIdx]
      if (post.slug) navigate(`/work/${post.slug}`)
      return
    }
    lock()
    setOffset(o => ((o + (pos - centerPos)) % n + n) % n)
  }

  return (
    <section className="deck-section" id="testimonials">

      <div className="deck-header">
        <span className="deck-eyebrow">Case Studies</span>
        <h2 className="deck-title">Work that<br />speaks for itself.</h2>
      </div>

      <MobileCarousel />

      <div className="fan-stage">
        {POSTS.map((post, i) => {
          const pos = ((i - offset) % n + n) % n
          const f = FAN[Math.min(pos, FAN.length - 1)]
          const nudge = HOVER_NUDGE[pos] ?? 0
          const push = getSiblingPush(pos, hoveredPos)

          return (
            <Motion.div
              key={i}
              className="fan-card-wrap"
              style={{ zIndex: f.z, cursor: pos === 2 && !post.slug ? 'default' : 'pointer' }}
              animate={{ x: f.x + push, rotate: f.rotate, y: f.y, scale: f.scale, transition: CARD_TRANSITION }}
              whileHover={isTouch ? undefined : { x: f.x + nudge, y: f.y - 8, scale: Math.min(f.scale + 0.05, 1.05), transition: HOVER_TRANSITION }}
              onHoverStart={isTouch ? undefined : () => setHoveredPos(pos)}
              onHoverEnd={isTouch ? undefined : () => setHoveredPos(null)}
              onClick={() => handleCardClick(i)}
            >
              <PhotoCard post={post} />
            </Motion.div>
          )
        })}
        <div className="fan-arrows">
          <button className="fan-arrow" onClick={goPrev} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button className="fan-arrow" onClick={goNext} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </div>

      <LogoGrid />

    </section>
  )
}
