import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import WorkGallery from './components/WorkGallery'
import Process from './components/Process'
import Services from './components/Services'
import './index.css'

function App() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <WorkGallery />
      <Process />
      <Services />
    </main>
  )
}

export default App
