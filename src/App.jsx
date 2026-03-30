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
      <OurWork />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}


export default App
