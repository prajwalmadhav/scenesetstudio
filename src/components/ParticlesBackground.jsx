import { useEffect, useRef, useCallback } from 'react'

/**
 * ParticlesBackground — ported from Framer FloatingParticlesBackground
 * Canvas-based floating dust particles with mouse repel + glow.
 * Sits fixed behind all page content as a full-viewport layer.
 */
export default function ParticlesBackground({
  particleCount = 80,
  particleSize = 1.5,
  particleOpacity = 0.45,
  glowIntensity = 8,
  movementSpeed = 0.35,
  mouseInfluence = 120,
  particleColor = '#C8F535',   // lime — ties to brand
  mouseGravity = 'repel',
  gravityStrength = 40,
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const animationRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef([])

  const initParticles = useCallback(
    (width, height) => {
      particlesRef.current = Array.from({ length: particleCount }, (_, id) => ({
        id,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * movementSpeed,
        vy: (Math.random() - 0.5) * movementSpeed,
        size: Math.random() * particleSize + 0.5,
        opacity: particleOpacity,
        baseOpacity: particleOpacity,
        mass: Math.random() * 0.5 + 0.5,
        glowMultiplier: 1,
        glowVelocity: 0,
      }))
    },
    [particleCount, particleSize, particleOpacity, movementSpeed]
  )

  const update = useCallback(
    (canvas) => {
      const { width, height } = canvas
      const mouse = mouseRef.current

      particlesRef.current.forEach((p) => {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < mouseInfluence && dist > 0) {
          const force = (mouseInfluence - dist) / mouseInfluence
          const nx = dx / dist
          const ny = dy / dist
          const gf = force * (gravityStrength * 0.001)

          if (mouseGravity === 'repel') {
            p.vx -= nx * gf
            p.vy -= ny * gf
          } else if (mouseGravity === 'attract') {
            p.vx += nx * gf
            p.vy += ny * gf
          }

          p.opacity = Math.min(1, p.baseOpacity + force * 0.4)
          const targetGlow = 1 + force * 2.5
          const easeSpeed = 0.15
          p.glowMultiplier = p.glowMultiplier + (targetGlow - p.glowMultiplier) * easeSpeed
        } else {
          p.opacity = Math.max(p.baseOpacity * 0.3, p.opacity - 0.015)
          const easeSpeed = 0.08
          p.glowMultiplier = Math.max(1, p.glowMultiplier + (1 - p.glowMultiplier) * easeSpeed)
        }

        // Move
        p.x += p.vx
        p.y += p.vy

        // Subtle drift
        p.vx += (Math.random() - 0.5) * 0.001
        p.vy += (Math.random() - 0.5) * 0.001

        // Damping
        p.vx *= 0.999
        p.vy *= 0.999

        // Wrap edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
      })
    },
    [mouseInfluence, gravityStrength, mouseGravity]
  )

  const draw = useCallback(
    (ctx) => {
      const { width, height } = ctx.canvas
      ctx.clearRect(0, 0, width, height)

      particlesRef.current.forEach((p) => {
        ctx.save()
        ctx.shadowColor = particleColor
        ctx.shadowBlur = glowIntensity * (p.glowMultiplier || 1) * 2
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
    },
    [particleColor, glowIntensity]
  )

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    update(canvas)
    draw(ctx)
    animationRef.current = requestAnimationFrame(animate)
  }, [update, draw])

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = container.offsetWidth
    const h = container.offsetHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    initParticles(w, h)
  }, [initParticles])

  useEffect(() => {
    resize()
    animate()

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', resize, { passive: true })

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', resize)
    }
  }, [animate, resize])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  )
}
