import { useRef, useEffect, useState, useMemo, useCallback } from 'react'

function transformValue(input, inputRange, outputRange, clamp = false) {
  const progress = (input - inputRange[0]) / (inputRange[1] - inputRange[0])
  let result = outputRange[0] + progress * (outputRange[1] - outputRange[0])
  if (clamp) result = Math.min(Math.max(result, Math.min(...outputRange)), Math.max(...outputRange))
  return result
}

function calcSpread(fontSize) {
  const pts = [{ size: 20, spread: 0.2 }, { size: 50, spread: 0.5 }, { size: 100, spread: 1.5 }]
  if (fontSize <= pts[0].size) return pts[0].spread
  if (fontSize >= pts[pts.length - 1].size) return pts[pts.length - 1].spread
  let i = 0
  while (i < pts.length - 1 && pts[i + 1].size < fontSize) i++
  return pts[i].spread + (fontSize - pts[i].size) * (pts[i + 1].spread - pts[i].spread) / (pts[i + 1].size - pts[i].size)
}

function parseColor(color) {
  const rgba = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (rgba) return `rgba(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, ${rgba[4] ?? 1})`
  return 'rgba(0,0,0,1)'
}

function createParticles(ctx, canvas, text, textX, textY, font, color, alignment) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = color
  ctx.font = font
  ctx.textAlign = alignment
  ctx.textBaseline = 'middle'
  const metrics = ctx.measureText(text)
  const textWidth = metrics.width
  const textLeft = alignment === 'center' ? textX - textWidth / 2 : alignment === 'left' ? textX : textX - textWidth
  ctx.fillText(text, textX, textY)
  const img  = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = img.data
  const dpr  = canvas.width / parseInt(canvas.style.width)
  const step = Math.max(1, Math.round(dpr / (window.devicePixelRatio * 1.5 || 1)))
  const ps   = []
  for (let y = 0; y < canvas.height; y += step)
    for (let x = 0; x < canvas.width; x += step) {
      const i = (y * canvas.width + x) * 4
      if (data[i + 3] > 0) {
        const a = (data[i + 3] / 255) * (step / dpr)
        ps.push({ x, y, originalX: x, originalY: y,
          color: `rgba(${data[i]},${data[i+1]},${data[i+2]},`,
          opacity: a, originalAlpha: a, velocityX: 0, velocityY: 0, angle: 0, speed: 0 })
      }
    }
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  return { particles: ps, textBoundaries: { left: textLeft, right: textLeft + textWidth, width: textWidth } }
}

function updateParticles(particles, vx, dt, spread, vaporizeDuration, direction, density) {
  let done = true
  particles.forEach(p => {
    const hit = direction === 'left-to-right' ? p.originalX <= vx : p.originalX >= vx
    if (hit) {
      if (p.speed === 0) {
        p.angle = Math.random() * Math.PI * 2
        p.speed = (Math.random() + 0.5) * spread
        p.velocityX = Math.cos(p.angle) * p.speed
        p.velocityY = Math.sin(p.angle) * p.speed
        p.shouldFadeQuickly = Math.random() > density
      }
      if (p.shouldFadeQuickly) {
        p.opacity = Math.max(0, p.opacity - dt)
      } else {
        const dx = p.originalX - p.x, dy = p.originalY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const damp = Math.max(0.95, 1 - dist / (100 * spread))
        p.velocityX = (p.velocityX + (Math.random() - 0.5) * spread * 3 + dx * 0.002) * damp
        p.velocityY = (p.velocityY + (Math.random() - 0.5) * spread * 3 + dy * 0.002) * damp
        const mv = spread * 2, cv = Math.hypot(p.velocityX, p.velocityY)
        if (cv > mv) { p.velocityX *= mv / cv; p.velocityY *= mv / cv }
        p.x += p.velocityX * dt * 20
        p.y += p.velocityY * dt * 10
        p.opacity = Math.max(0, p.opacity - dt * 0.25 * (2000 / vaporizeDuration))
      }
      if (p.opacity > 0.01) done = false
    } else { done = false }
  })
  return done
}

function renderParticles(ctx, particles, dpr) {
  ctx.save()
  ctx.scale(dpr, dpr)
  particles.forEach(p => {
    if (p.opacity > 0) {
      ctx.fillStyle = p.color + p.opacity + ')'
      ctx.fillRect(p.x / dpr, p.y / dpr, 1, 1)
    }
  })
  ctx.restore()
}

function resetParticles(particles) {
  particles.forEach(p => { p.x = p.originalX; p.y = p.originalY; p.opacity = p.originalAlpha; p.speed = 0; p.velocityX = 0; p.velocityY = 0 })
}

function useIsInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0, rootMargin: '50px' })
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

export default function VaporizeText({
  texts = ['Scene Set Studio'],
  fontFamily = 'sans-serif',
  fontSize = '50px',
  fontWeight = 400,
  color = 'rgb(240,238,234)',
  spread = 5,
  density = 5,
  vaporizeDuration = 2,
  fadeInDuration = 1,
  waitDuration = 0.5,
  direction = 'left-to-right',
  alignment = 'center',
  style = {},
}) {
  const canvasRef  = useRef(null)
  const wrapperRef = useRef(null)
  const particlesRef   = useRef([])
  const animFrameRef   = useRef(null)
  const vProgressRef   = useRef(0)
  const fadeOpRef      = useRef(0)
  const [textIdx, setTextIdx]   = useState(0)
  const [animState, setAnimState] = useState('static')
  const [size, setSize] = useState({ width: 0, height: 0 })
  const inView = useIsInView(wrapperRef)

  const dpr = useMemo(() => Math.min(window.devicePixelRatio * 1.5 || 1, 3), [])
  const density01 = useMemo(() => transformValue(density, [0, 10], [0.3, 1], true), [density])

  const fSizePx = useMemo(() => parseInt(String(fontSize).replace('px', '')), [fontSize])
  const vSpread  = useMemo(() => calcSpread(fSizePx) * spread, [fSizePx, spread])
  const fontStr  = useMemo(() => `${fontWeight} ${fSizePx * dpr}px ${fontFamily}`, [fontWeight, fSizePx, dpr, fontFamily])
  const ms = useMemo(() => ({
    vaporize: vaporizeDuration * 1000,
    fadeIn:   fadeInDuration * 1000,
    wait:     waitDuration * 1000,
  }), [vaporizeDuration, fadeInDuration, waitDuration])

  const doRender = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !size.width || !size.height) return
    const ctx = canvas.getContext('2d')
    const { width, height } = size
    canvas.style.width  = `${width}px`
    canvas.style.height = `${height}px`
    canvas.width  = Math.floor(width * dpr)
    canvas.height = Math.floor(height * dpr)
    const textX = alignment === 'center' ? canvas.width / 2 : alignment === 'left' ? 0 : canvas.width
    const { particles, textBoundaries } = createParticles(ctx, canvas, texts[textIdx], textX, canvas.height / 2, fontStr, parseColor(color), alignment)
    particlesRef.current = particles
    canvas.textBoundaries = textBoundaries
  }, [size, dpr, texts, textIdx, fontStr, color, alignment])

  useEffect(() => { doRender() }, [doRender])

  useEffect(() => {
    if (inView) { setTimeout(() => setAnimState('vaporizing'), 0) }
    else {
      setAnimState('static')
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [inView])

  useEffect(() => {
    if (!inView) return
    let lastTime = performance.now()
    let fid

    const loop = (now) => {
      const dt = (now - lastTime) / 1000
      lastTime = now
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx || !particlesRef.current.length) { fid = requestAnimationFrame(loop); return }
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (animState === 'static' || animState === 'waiting') {
        renderParticles(ctx, particlesRef.current, dpr)
      } else if (animState === 'vaporizing') {
        vProgressRef.current += dt * 100 / (ms.vaporize / 1000)
        const tb = canvas.textBoundaries
        if (tb) {
          const prog = Math.min(100, vProgressRef.current)
          const vx = direction === 'left-to-right'
            ? tb.left + tb.width * prog / 100
            : tb.right - tb.width * prog / 100
          const done = updateParticles(particlesRef.current, vx, dt, vSpread, ms.vaporize, direction, density01)
          renderParticles(ctx, particlesRef.current, dpr)
          if (vProgressRef.current >= 100 && done) {
            setTextIdx(i => (i + 1) % texts.length)
            setAnimState('fadingIn')
            fadeOpRef.current = 0
          }
        }
      } else if (animState === 'fadingIn') {
        fadeOpRef.current += dt * 1000 / ms.fadeIn
        ctx.save(); ctx.scale(dpr, dpr)
        particlesRef.current.forEach(p => {
          p.x = p.originalX; p.y = p.originalY
          const op = Math.min(fadeOpRef.current, 1) * p.originalAlpha
          ctx.fillStyle = p.color + op + ')'
          ctx.fillRect(p.x / dpr, p.y / dpr, 1, 1)
        })
        ctx.restore()
        if (fadeOpRef.current >= 1) {
          setAnimState('waiting')
          setTimeout(() => { setAnimState('vaporizing'); vProgressRef.current = 0; resetParticles(particlesRef.current) }, ms.wait)
        }
      }
      fid = requestAnimationFrame(loop)
    }

    fid = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(fid)
  }, [animState, inView, texts.length, direction, dpr, vSpread, density01, ms])

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      for (const e of entries) setSize({ width: e.contentRect.width, height: e.contentRect.height })
    })
    ro.observe(el)
    setSize({ width: el.clientWidth, height: el.clientHeight })
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%', pointerEvents: 'none', ...style }}>
      <canvas ref={canvasRef} style={{ minWidth: 30, minHeight: 20, pointerEvents: 'none' }} />
    </div>
  )
}
