import { useEffect, useRef } from 'react'

/**
 * LiquidBackground — organic warp shader matching the "Mist" animated gradient reference.
 * Large flowing magenta/fuchsia shapes against deep black, leaving centre mostly clear.
 */

const VERTEX_SHADER = /* glsl */ `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  uniform float u_time;
  uniform vec2  u_resolution;

  uniform vec3  u_color1;
  uniform vec3  u_color2;
  uniform vec3  u_color3;

  uniform float u_speed;
  uniform float u_scale;
  uniform float u_swirl;
  uniform float u_distortion;
  uniform float u_softness;
  uniform float u_proportion;
  uniform float u_rotation;

  // ── Simplex noise ─────────────────────────────────────────────────
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                       -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0,i1.y,1.0))
                   + i.x + vec3(0.0,i1.x,1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  // ─────────────────────────────────────────────────────────────────

  vec2 rotate2D(vec2 p, float angle) {
    float s = sin(angle), c = cos(angle);
    return vec2(c*p.x - s*p.y, s*p.x + c*p.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    uv = rotate2D(uv, u_rotation);

    float t = u_time * u_speed * 0.1;

    vec2 q = uv * (0.5 + u_scale * 0.5);

    float n0 = snoise(q * 1.0 + vec2(t * 0.3, t * 0.2));
    float n1 = snoise(q * 1.8 + vec2(-t * 0.25, t * 0.35) + vec2(n0 * u_swirl));
    float n2 = snoise(q * 2.6 + vec2(t * 0.15, -t * 0.2) + vec2(n1 * u_swirl * 0.7));

    float d = snoise(q + vec2(n1, n2) * u_distortion + vec2(t * 0.1));
    d = d * 0.5 + 0.5;

    // High softness + low proportion = sparse shapes, mostly black background
    float mask = smoothstep(0.0, u_softness + 0.001, d - (1.0 - u_proportion));

    vec3 col = mix(u_color1, u_color2, mask);
    col = mix(col, u_color3, smoothstep(0.55, 0.85, d) * u_proportion * 0.5);

    // Soft vignette — barely darkens
    float vignette = 1.0 - dot(uv * 0.38, uv * 0.38);
    vignette = pow(clamp(vignette, 0.0, 1.0), 0.2);
    col *= vignette;

    gl_FragColor = vec4(col, 1.0);
  }
`

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(gl, vs, fs) {
  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(prog))
    return null
  }
  return prog
}

function hexToRGB01(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return [r, g, b]
}

export default function LiquidBackground({
  color1     = '#04000a',   // deep black base
  color2     = '#7a0a3c',   // mid magenta — the body of the shapes
  color3     = '#c8196e',   // bright fuchsia highlight — matches reference pink
  speed      = 0.35,
  scale      = 0.85,
  swirl      = 1.2,
  distortion = 0.65,
  softness   = 0.88,        // high = very soft edges, shapes fade into black
  proportion = 0.28,        // low = sparse — most of background stays black
  rotation   = -0.25,
}) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const glRef     = useRef(null)
  const progRef   = useRef(null)
  const startRef  = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) {
      console.warn('WebGL not supported, LiquidBackground disabled.')
      return
    }
    glRef.current = gl

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const prog = createProgram(gl, vs, fs)
    if (!prog) return
    progRef.current = prog

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )
    const posLoc = gl.getAttribLocation(prog, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.parentElement?.offsetWidth  || window.innerWidth
      const h = canvas.parentElement?.offsetHeight || window.innerHeight
      canvas.width  = w * dpr
      canvas.height = h * dpr
      canvas.style.width  = w + 'px'
      canvas.style.height = h + 'px'
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    gl.useProgram(prog)

    const u1f = (n, v)       => { const l = gl.getUniformLocation(prog, n); if (l) gl.uniform1f(l, v) }
    const u2f = (n, x, y)    => { const l = gl.getUniformLocation(prog, n); if (l) gl.uniform2f(l, x, y) }
    const u3f = (n, r, g, b) => { const l = gl.getUniformLocation(prog, n); if (l) gl.uniform3f(l, r, g, b) }

    const [r1, g1, b1] = hexToRGB01(color1)
    const [r2, g2, b2] = hexToRGB01(color2)
    const [r3, g3, b3] = hexToRGB01(color3)

    u3f('u_color1', r1, g1, b1)
    u3f('u_color2', r2, g2, b2)
    u3f('u_color3', r3, g3, b3)
    u1f('u_speed',       speed)
    u1f('u_scale',       scale)
    u1f('u_swirl',       swirl)
    u1f('u_distortion',  distortion)
    u1f('u_softness',    softness)
    u1f('u_proportion',  proportion)
    u1f('u_rotation',    rotation)

    startRef.current = performance.now()

    const render = (now) => {
      const elapsed = (now - startRef.current) * 0.001
      u1f('u_time', elapsed)
      u2f('u_resolution', canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [color1, color2, color3, speed, scale, swirl, distortion, softness, proportion, rotation])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
