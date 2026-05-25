import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import Preloader from './components/Preloader'
const AdminPage = lazy(() => import('./pages/Admin'))
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useButtonRipple from './hooks/useButtonRipple'

gsap.registerPlugin(ScrollTrigger)
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Process from './components/Process'
import FrameScroll from './components/FrameScroll'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WorkPage from './pages/Work'
import ProcessPage from './pages/Process'
import CaseStudyPage from './pages/CaseStudy'
import ServicesPage from './pages/Services'
import StandardServicesPage from './pages/StandardServices'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import NotFoundPage from './pages/NotFound'
import './index.css'

// Scroll to top and refresh ScrollTrigger on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    // Kill all ScrollTriggers from previous page, then refresh so new ones
    // calculate from a clean scroll-position-zero baseline
    ScrollTrigger.getAll().forEach(t => t.kill())
    ScrollTrigger.refresh()
  }, [pathname])
  return null
}

function HomePage() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <Hero />
      <About />
      <Features />
      <Process />
      <Testimonials />
      <div className="light-zone">
        <CTA />
        <Footer />
        <div className="footer-brand-bg" aria-hidden="true">
          <div className="footer-brand-bg__vert-row">
            <span className="footer-brand-bg__vert footer-brand-bg__vert--neon footer-brand-bg__vert--scene">SCENE</span>
            <span className="footer-brand-bg__vert footer-brand-bg__vert--neon footer-brand-bg__vert--delay1 footer-brand-bg__vert--set">SET</span>
          </div>
          <span className="footer-brand-bg__horizontal footer-brand-bg__horiz--neon footer-brand-bg__horiz--studio">STUDIO</span>
        </div>
      </div>
    </main>
  )
}

const WM_TEXT = 'SCENE SET STUDIO · SSS · '.repeat(10)

function BrandWatermark() {
  return (
    <div className="brand-wm" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={'a' + i} className="brand-wm__line brand-wm__line--a" style={{ top: `${i * 12}%` }}>{WM_TEXT}</span>
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={'b' + i} className="brand-wm__line brand-wm__line--b" style={{ top: `${i * 12}%` }}>{WM_TEXT}</span>
      ))}
    </div>
  )
}

function App() {
  useButtonRipple()

  const [preloaderDone, setPreloaderDone] = useState(
    () => sessionStorage.getItem('sss_loaded') === '1'
  )

  const handlePreloaderDone = () => {
    sessionStorage.setItem('sss_loaded', '1')
    setPreloaderDone(true)
  }

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    // Sync Lenis scroll position to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    const pause  = () => lenis.stop()
    const resume = () => lenis.start()
    window.addEventListener('sss:lenis-pause',  pause)
    window.addEventListener('sss:lenis-resume', resume)

    return () => {
      window.removeEventListener('sss:lenis-pause',  pause)
      window.removeEventListener('sss:lenis-resume', resume)
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  const base = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
  return (
    <>
      {!preloaderDone && <Preloader onDone={handlePreloaderDone} />}
      <BrowserRouter basename={base}>
        <AppContent />
      </BrowserRouter>
    </>
  )
}

function AppContent() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')
  return (
    <>
      <BrandWatermark />
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/"             element={<HomePage />} />
        <Route path="/work"         element={<WorkPage />} />
        <Route path="/work/:client" element={<CaseStudyPage />} />
        <Route path="/services"          element={<ServicesPage />} />
        <Route path="/standard-services" element={<StandardServicesPage />} />
        <Route path="/about"        element={<AboutPage />} />
        <Route path="/contact"      element={<ContactPage />} />
        <Route path="/process"      element={<ProcessPage />} />
        <Route path="/admin"        element={<Suspense fallback={null}><AdminPage /></Suspense>} />
        <Route path="*"             element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
