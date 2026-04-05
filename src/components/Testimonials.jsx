const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const IconIG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const ROW1 = [
  { platform: 'x',  handle: '@alexmorgan_co', name: 'Alex Morgan',    verified: true,  date: 'Mar 14', likes: '2.4k', quote: 'SceneSet transformed our brand identity. Campaigns drove a 3x increase in qualified leads within 90 days. The creative team just gets it.' },
  { platform: 'ig', handle: '@luminary.tech', name: 'Jamie Chen',     verified: false, date: 'Feb 28', likes: '8.7k', quote: 'The video production quality is unmatched. Our product launch hit 2M organic views. We have never seen results like that from any agency.' },
  { platform: 'x',  handle: '@sara_wlms',     name: 'Sara Williams',  verified: true,  date: 'Jan 5',  likes: '1.1k', quote: 'Working with SceneSet felt like having an in-house creative team. Strategy is sharp, execution is flawless. Genuinely the best.' },
  { platform: 'ig', handle: '@northfield.co', name: 'Marcus Reid',    verified: true,  date: 'Dec 19', likes: '5.2k', quote: 'Social engagement up 400% in the first month. The content they create just stops the scroll every single time without fail.' },
  { platform: 'x',  handle: '@priya.solaris', name: 'Priya Nair',     verified: false, date: 'Nov 30', likes: '934',  quote: 'ROI on our ad campaigns was 6x within the first quarter. SceneSet does not just deliver work -- they deliver actual results.' },
  { platform: 'ig', handle: '@vantalabs',     name: 'Tom Okafor',     verified: true,  date: 'Oct 12', likes: '3.8k', quote: 'Every touchpoint felt premium. Our conversion rate doubled and customers keep complimenting the brand aesthetic unprompted.' },
]

const ROW2 = [
  { platform: 'ig', handle: '@riya.ventures', name: 'Riya Kapoor',    verified: true,  date: 'Sep 22', likes: '6.1k', quote: 'Finally an agency that understands luxury brand positioning. The visual language they built for us is second to none.' },
  { platform: 'x',  handle: '@devansh_m',     name: 'Dev Mehta',      verified: false, date: 'Aug 8',  likes: '449',  quote: 'From brief to final delivery in 2 weeks. The quality was insane. I have worked with 4 other agencies and none come close.' },
  { platform: 'ig', handle: '@ember.studio',  name: 'Lena Voss',      verified: true,  date: 'Jul 17', likes: '11k',  quote: 'Our Instagram went from 4k to 140k followers in six months, all organic. The content strategy they built is still running.' },
  { platform: 'x',  handle: '@haris_builds',  name: 'Haris Qureshi',  verified: false, date: 'Jun 3',  likes: '2.0k', quote: 'Paid ads done right. They cut our CPL in half while doubling our ROAS. The data-creative blend is genuinely impressive.' },
  { platform: 'ig', handle: '@clara.design_', name: 'Clara Hoffmann', verified: true,  date: 'May 29', likes: '4.4k', quote: 'The web redesign increased time-on-site by 3x and our bounce rate dropped 40% the week we launched. Remarkable results.' },
  { platform: 'x',  handle: '@noori_media',   name: 'Amir Noori',     verified: true,  date: 'Apr 11', likes: '780',  quote: 'SceneSet does not overpromise. They just consistently deliver stunning work and measurable outcomes. That is rare.' },
]

function Card({ t }) {
  const isX = t.platform === 'x'
  return (
    <div className="testi-card">
      <div className="testi-card__header">
        <div className="testi-card__avatar">
          <span>{t.name.split(' ').map(n => n[0]).join('')}</span>
        </div>
        <div className="testi-card__meta">
          <span className="testi-card__name">
            {t.name}
            {t.verified && (
              <svg className="testi-card__verified" viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            )}
          </span>
          <span className="testi-card__handle">{t.handle}</span>
        </div>
        <div className={`testi-card__platform testi-card__platform--${t.platform}`}>
          {isX ? <IconX /> : <IconIG />}
        </div>
      </div>
      <p className="testi-card__quote">{t.quote}</p>
      <div className="testi-card__footer">
        <span className="testi-card__date">{t.date}</span>
        <span className="testi-card__likes">&#9825; {t.likes}</span>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="testi-section" id="testimonials">

      <div className="testi-header">
        <span className="testi-eyebrow">Social proof</span>
        <h2 className="testi-title">What clients say</h2>
      </div>

      <div className="testi-viewport">
        <div className="testi-track testi-track--left">
          {[...ROW1, ...ROW1].map((t, i) => <Card key={i} t={t} />)}
        </div>
        <div className="testi-fade testi-fade--left" />
        <div className="testi-fade testi-fade--right" />
      </div>

      <div className="testi-viewport">
        <div className="testi-track testi-track--right">
          {[...ROW2, ...ROW2].map((t, i) => <Card key={i} t={t} />)}
        </div>
        <div className="testi-fade testi-fade--left" />
        <div className="testi-fade testi-fade--right" />
      </div>

    </section>
  )
}
