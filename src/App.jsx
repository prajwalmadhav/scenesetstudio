import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Process from './components/Process'
import FrameScroll from './components/FrameScroll'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Services from './components/Services'
import './index.css'

function App() {
  const [page, setPage] = useState('home')

  return (
    <>
      <Navbar onServicesClick={() => setPage('services')} onHomeClick={() => setPage('home')} activePage={page} />

      {page === 'services' ? (
        <Services />
      ) : (
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <About />
          <Features />
          <Process />

          {/* FrameScroll must stay outside any overflow:hidden ancestor for sticky to work */}
          <FrameScroll />

          {/* Brand overlay spans the full CTA + Footer area */}
          <div className="light-zone">
            <div className="brand-zone-bg" aria-hidden="true">
              <div className="brand-zone-bg__verts">
                <span className="brand-zone-bg__vert">SCENE</span>
                <span className="brand-zone-bg__vert">SET</span>
              </div>
              <span className="brand-zone-bg__horiz">STUDIO</span>
            </div>
            <CTA />
            <Footer />
          </div>
        </main>
      )}
    </>
  )
}

export default App
