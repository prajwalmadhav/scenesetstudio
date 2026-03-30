import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Services from './components/Services'
import ParticlesBackground from './components/ParticlesBackground'
import './index.css'

function App() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <ParticlesBackground />
      <Navbar />
      <Hero />
      <Features />
      <Services />
    </main>
  )
}

export default App

