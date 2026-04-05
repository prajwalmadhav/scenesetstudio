import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
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
import CaseStudyPage from './pages/CaseStudy'
import ServicesPage from './pages/Services'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import NotFoundPage from './pages/NotFound'
import './index.css'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function HomePage() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <Hero />
      <About />
      <Features />
      <Process />
      <FrameScroll />
      <Testimonials />
      <div className="light-zone">
        <div className="brand-zone-bg" aria-hidden="true">
          <div className="brand-zone-bg__verts">
            <span className="brand-zone-bg__vert brand-zone-bg__vert--neon">SCENE</span>
            <span className="brand-zone-bg__vert brand-zone-bg__vert--neon brand-zone-bg__vert--neon-delay1">SET</span>
          </div>
          <span className="brand-zone-bg__horiz brand-zone-bg__horiz--neon">STUDIO</span>
        </div>
        <CTA />
        <Footer />
      </div>
    </main>
  )
}

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
  return (
    <BrowserRouter basename={base}>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/work"     element={<WorkPage />} />
        <Route path="/work/:client" element={<CaseStudyPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/contact"  element={<ContactPage />} />
        <Route path="*"         element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
