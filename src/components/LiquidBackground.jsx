import { useEffect, useRef, useMemo } from 'react'

/**
 * LiquidBackground — Exact Framer "Mist" liquid background logic.
 * Source: https://framer.com/m/AnimatedLiquidBackground-Prod-vIhm.js@ghH1aHLmGZ0iE7qXDFVk
 */

const VERTEX_SHADER = `#version 300 es
  in vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;
uniform float u_rotation;
uniform float u_scale;

out vec4 fragColor;

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;

    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);

    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);

    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float t = u_time;

    float noise_scale = .0005 + .006 * u_scale;

    uv -= .5;
    uv *= (noise_scale * u_resolution);
    uv = rotate(uv, u_rotation * .5 * PI);
    uv /= u_pixelRatio;
    uv += .5;

    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * u_distortion * n2 * cos(angle);
    uv.y += 4. * u_distortion * n2 * sin(angle);

    float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }

    float proportion = clamp(u_proportion, 0., 1.);
    float mixer = 0.;
    
    if (u_shape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
      float shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (u_shape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
      float f = fract(stripes_shape_uv.y);
      float shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {
      // Use the distorted uv coordinate instead of raw gl_FragCoord for organic "Mist"
      float sh = 1.0 - uv.y;
      float shape_scaling = 0.2 * (1.0 - u_shapeScale);
      float shape = smoothstep(0.45 - shape_scaling, 0.55 + shape_scaling, sh + 0.3 * (proportion - 0.5));
      mixer = shape;
    }

    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);
    fragColor = vec4(color_mix.rgb, color_mix.a);
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

function hexToRGBA(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return [r, g, b, 1.0]
}

export default function LiquidBackground({
  color1 = '#050505',
  color2 = '#FF66B8',
  color3 = '#050505',
  speed = 0.35,
  scale = 0.48,
  rotation = 0,
  proportion = 0.35,
  distortion = 0.12,
  swirl = 0.8,
  swirlIterations = 14,
  softness = 0.85,
  shape = 2,
  shapeSize = 0.5,
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const startRef = useRef(performance.now())

  // Memoize variables that don't need to change every frame but are used as depedencies
  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false })
    if (!gl) return

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const prog = createProgram(gl, vs, fs)
    if (!prog) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    
    const posLoc = gl.getAttribLocation(prog, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uLocs = {
      time: gl.getUniformLocation(prog, 'u_time'),
      pixelRatio: gl.getUniformLocation(prog, 'u_pixelRatio'),
      resolution: gl.getUniformLocation(prog, 'u_resolution'),
      color1: gl.getUniformLocation(prog, 'u_color1'),
      color2: gl.getUniformLocation(prog, 'u_color2'),
      color3: gl.getUniformLocation(prog, 'u_color3'),
      proportion: gl.getUniformLocation(prog, 'u_proportion'),
      softness: gl.getUniformLocation(prog, 'u_softness'),
      shape: gl.getUniformLocation(prog, 'u_shape'),
      shapeScale: gl.getUniformLocation(prog, 'u_shapeScale'),
      distortion: gl.getUniformLocation(prog, 'u_distortion'),
      swirl: gl.getUniformLocation(prog, 'u_swirl'),
      swirlIterations: gl.getUniformLocation(prog, 'u_swirlIterations'),
      rotation: gl.getUniformLocation(prog, 'u_rotation'),
      scale: gl.getUniformLocation(prog, 'u_scale'),
    }

    const resize = () => {
      const w = canvas.parentElement?.offsetWidth || window.innerWidth
      const h = canvas.parentElement?.offsetHeight || window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const render = (now) => {
      const elapsed = (now - startRef.current) * 0.001 * speed * 2.0
      gl.useProgram(prog)
      gl.uniform1f(uLocs.time, elapsed)
      gl.uniform1f(uLocs.pixelRatio, dpr)
      gl.uniform2f(uLocs.resolution, canvas.width, canvas.height)
      
      const c1 = hexToRGBA(color1)
      const c2 = hexToRGBA(color2)
      const c3 = hexToRGBA(color3)
      gl.uniform4f(uLocs.color1, c1[0], c1[1], c1[2], c1[3])
      gl.uniform4f(uLocs.color2, c2[0], c2[1], c2[2], c2[3])
      gl.uniform4f(uLocs.color3, c3[0], c3[1], c3[2], c3[3])
      
      gl.uniform1f(uLocs.proportion, proportion)
      gl.uniform1f(uLocs.softness, softness)
      gl.uniform1f(uLocs.shape, shape)
      gl.uniform1f(uLocs.shapeScale, shapeSize)
      gl.uniform1f(uLocs.distortion, distortion)
      gl.uniform1f(uLocs.swirl, swirl)
      gl.uniform1f(uLocs.swirlIterations, swirlIterations)
      gl.uniform1f(uLocs.rotation, rotation * (Math.PI / 180))
      gl.uniform1f(uLocs.scale, scale)

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
  }, [color1, color2, color3, speed, scale, proportion, distortion, swirl, swirlIterations, softness, shape, shapeSize, rotation, dpr])

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
