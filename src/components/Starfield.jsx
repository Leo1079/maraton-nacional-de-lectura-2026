import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'

/**
 * Capa cósmica de fondo: campo estelar con paralaje, partículas de polvo
 * interestelar y un modo "warp" (0→1) que aleja las estrellas hacia el
 * espectador, como si el visitante viajara hacia otro mundo.
 *
 * Se dibuja en un <canvas> fijo a pantalla completa con un solo rAF.
 */

const STAR_COUNT_DESKTOP = 260
const STAR_COUNT_MOBILE = 130
const DUST_COUNT = 34

const pickHue = (r) => {
  const roll = r()
  if (roll < 0.62) return 225 // blanco cálido / frío
  if (roll < 0.84) return 195 // cyan
  if (roll < 0.95) return 265 // violeta
  return 42 // ámbar
}

export default function Starfield({ warpRef }) {
  const canvasRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let stars = []
    let dust = []
    let raf = 0
    let disposed = false

    // Mulberry32 — PRNG determinístico y liviano
    const makeRandom = (seed) => () => {
      seed |= 0
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }

    const build = () => {
      const rand = makeRandom(20260321)
      const isSmall = window.innerWidth < 640
      const count = isSmall ? STAR_COUNT_MOBILE : STAR_COUNT_DESKTOP

      stars = Array.from({ length: count }, () => {
        const depth = 0.18 + rand() * 0.82
        return {
          x: rand() * width,
          y: rand() * height,
          depth,
          radius: 0.28 + depth * rand() * 1.25,
          hue: pickHue(rand),
          alpha: 0.22 + depth * rand() * 0.72,
          twinkle: rand() * Math.PI * 2,
          twinkleSpeed: 0.4 + rand() * 1.1,
        }
      })

      dust = Array.from({ length: DUST_COUNT }, () => ({
        x: rand() * width,
        y: rand() * height,
        depth: 0.1 + rand() * 0.6,
        radius: 0.5 + rand() * 1.8,
        drift: 0.06 + rand() * 0.22,
        angle: rand() * Math.PI * 2,
      }))
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    let scrollY = window.scrollY

    const draw = (time) => {
      if (disposed) return
      const t = time / 1000
      const warp = Math.max(0, Math.min(1, warpRef?.current ?? 0))

      ctx.clearRect(0, 0, width, height)

      // ── Parallaje por scroll (el campo se desplaza hacia arriba)
      const parallax = scrollY * 0.055

      // ── Estrellas
      ctx.lineCap = 'round'
      for (const s of stars) {
        const drift = 0.09 + s.depth * 0.34 + warp * s.depth * 9
        let x = s.x - drift
        const y = s.y - parallax * s.depth - warp * s.depth * 5

        // Wrap horizontal
        if (x < -6) {
          x += width + 12
          s.y = (s.y + 97) % height
        }
        const yy = ((y % height) + height) % height

        const twinkle = 0.72 + 0.28 * Math.sin(t * s.twinkleSpeed + s.twinkle)
        const alpha = s.alpha * twinkle * (1 - warp * 0.18)
        const r = s.radius * (1 + warp * 1.1)

        ctx.strokeStyle = `hsla(${s.hue}, 88%, ${72 + s.depth * 16}%, ${alpha})`
        ctx.fillStyle = ctx.strokeStyle

        if (warp > 0.05 && s.depth > 0.55) {
          // Estela de viaje
          const len = warp * s.depth * 34
          ctx.lineWidth = r * 1.5
          ctx.beginPath()
          ctx.moveTo(x, yy)
          ctx.lineTo(x + len, yy)
          ctx.stroke()
        } else {
          ctx.lineWidth = r
          ctx.beginPath()
          ctx.arc(x, yy, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // ── Partículas de polvo
      for (const p of dust) {
        const dx = Math.cos(p.angle) * p.drift
        const dy = Math.sin(p.angle) * p.drift * 0.55 + warp * p.depth * 2.2
        let x = p.x - dx - warp * p.depth * 5
        let y = p.y - dy - parallax * p.depth * 0.6
        if (x < -20) x += width + 40
        if (y < -20) y += height + 40
        p.x = x
        p.y = y

        ctx.beginPath()
        ctx.arc(x, y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(200, 90%, 76%, ${0.05 + p.depth * 0.14})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      for (const s of stars) {
        const y = ((s.y % height) + height) % height
        ctx.beginPath()
        ctx.arc(s.x, y, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${s.hue}, 88%, 78%, ${s.alpha * 0.85})`
        ctx.fill()
      }
    }

    const onScroll = () => {
      scrollY = window.scrollY
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })

    if (reduced) {
      drawStatic()
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduced, warpRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
    />
  )
}