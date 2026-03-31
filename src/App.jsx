import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Process from './components/Process'
import Services from './components/Services'
import OurWork from './components/OurWork'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Process />
      <Services />

      {/* Light zone: OurWork → Testimonials → CTA → Footer share the same bg + branding */}
      <div className="light-zone">
        <div className="light-zone__branding" aria-hidden="true">
          <span className="light-zone__brand-line">SCENE SET</span>
          <span className="light-zone__brand-line">STUDIO</span>
        </div>
        <OurWork />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </main>
  )
}

export default App
