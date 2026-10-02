import { useCallback, useEffect, useRef, useState } from 'react'
import { MotionConfig } from 'motion/react'
import Starfield from './components/Starfield.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Intro from './components/Intro.jsx'
import StoryExplorer from './components/StoryExplorer.jsx'
import StoryReader from './components/StoryReader.jsx'
import Worlds from './components/Worlds.jsx'
import CenterQuote from './components/CenterQuote.jsx'
import Credits from './components/Credits.jsx'
import { STORIES } from './data/stories.js'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion.js'

export default function App() {
  const [openId, setOpenId] = useState(null)
  const [originEl, setOriginEl] = useState(null)

  const warpRef = useRef(0)
  const warpTarget = useRef(0)
  const reduced = usePrefersReducedMotion()

  // ── El warp del fondo se interpola hacia el objetivo (no salta)
  useEffect(() => {
    if (reduced) return
    let raf = 0
    const tick = () => {
      const cur = warpRef.current
      const next = cur + (warpTarget.current - cur) * 0.045
      warpRef.current = Math.abs(next - warpTarget.current) < 0.001 ? warpTarget.current : next
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  // ── El warp sube solo al llegar a los créditos (viaje hacia otro mundo)
  useEffect(() => {
    const el = document.getElementById('creditos')
    if (!el || reduced) return
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0]
        warpTarget.current = e.isIntersecting ? Math.min(e.intersectionRatio * 1.35, 1) : 0
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  const openStory = useCallback((id, el) => {
    setOriginEl(el ?? null)
    setOpenId(id)
  }, [])

  const closeReader = useCallback(() => {
    setOpenId(null)
    setOriginEl(null)
  }, [])

  const activeStory = openId
    ? { ...STORIES.find((s) => s.id === openId), originEl }
    : null

  const navigate = useCallback((id) => {
    setOriginEl(null) // al navegar ya no hay portal: transición de página
    setOpenId(id)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      {/* Fondo cósmico */}
      <Starfield warpRef={warpRef} />

      {/* Textura CRT muy sutil sobre todo el documento */}
      <div
        aria-hidden="true"
        className="scanlines pointer-events-none fixed inset-0 z-[90] opacity-[0.035] mix-blend-overlay"
      />

      {/* Nav */}
      <Nav />

      <main className="relative z-10">
        <Hero />
        <Intro />
        <StoryExplorer onOpen={openStory} />
        <Worlds />
        <CenterQuote />
        <Credits onWarp={(v) => (warpTarget.current = v)} />
      </main>

      {/* Lector */}
      <StoryReader story={activeStory} onClose={closeReader} onNavigate={navigate} />
    </MotionConfig>
  )
}