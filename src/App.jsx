import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ParticlesBackground from './components/ParticlesBackground'
import './index.css'

function App() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <ParticlesBackground />
      <Navbar />
      <Hero />
    </main>
  )
}

export default App

