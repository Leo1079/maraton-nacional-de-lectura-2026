import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Grid3x3, X } from 'lucide-react'
import { getAdjacent } from '../data/stories.js'
import { getText } from '../data/texts.js'
import StoryGlyph from './StoryGlyph.jsx'
import { useScrollLock } from '../hooks/useUi.js'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Lector fullscreen. Se presenta como un libro digital: se abre con una
 * transición tipo portal desde la ficha de origen y se cierra con el gesto
 * inverso. Navegación por teclado, foco atrapado y progreso de lectura.
 */
export default function StoryReader({ story, onClose, onNavigate }) {
  const scrollerRef = useRef(null)
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const [origin, setOrigin] = useState(null)
  const [progress, setProgress] = useState(0)

  const paragraphs = story ? getText(story.id) : []
  const { prev, next } = story ? getAdjacent(story.id) : {}

  useScrollLock(Boolean(story))

  // El punto de origen del portal es la ficha desde la que se abrió
  useEffect(() => {
    if (story?.originEl) {
      const r = story.originEl.getBoundingClientRect()
      setOrigin({
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
        radius: Math.hypot(Math.max(r.width, r.height) / 2, window.innerHeight / 2),
      })
    } else {
      setOrigin(null)
    }
  }, [story])

  // Reinicia el scroll y el foco al cambiar de cuento
  useLayoutEffect(() => {
    if (!story) return
    scrollerRef.current?.scrollTo({ top: 0 })
    setProgress(0)
    closeRef.current?.focus({ preventScroll: true })
  }, [story])

  // Progreso de lectura
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 8 ? Math.min(el.scrollTop / max, 1) : 0)
    }
    onScroll()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [story])

  // Teclado: Escape cierra, flechas navegan
  useEffect(() => {
    if (!story) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowLeft' && prev) {
        e.preventDefault()
        onNavigate(prev.id)
      } else if (e.key === 'ArrowRight' && next) {
        e.preventDefault()
        onNavigate(next.id)
      } else if (e.key === 'Tab') {
        trapFocus(e, panelRef.current)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [story, prev, next, onClose, onNavigate])

  // Evita que el fondo siga scrolleando
  useEffect(() => {
    if (!story) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [story])

  const handleNavigate = useCallback(
    (dir) => {
      const target = dir === 'prev' ? prev : next
      if (target) onNavigate(target.id)
    },
    [next, onNavigate, prev],
  )

  const iris = origin
    ? `circle(${origin.radius * 1.12}px at ${origin.x}px ${origin.y}px)`
    : 'circle(150% at 50% 50%)'

  return (
    <AnimatePresence>
      {story && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={story.title}>
          {/* Cortina de portal */}
          <motion.div
            className="absolute inset-0 bg-void"
            initial={{ clipPath: 'circle(0px at 50% 50%)' }}
            animate={{ clipPath: iris }}
            exit={{ clipPath: 'circle(0px at 50% 50%)' }}
            transition={{ duration: 0.72, ease: [0.65, 0, 0.35, 1] }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(60% 45% at 50% 8%, rgba(109,63,212,.20) 0%, transparent 70%)',
              }}
            />
          </motion.div>

          {/* Libro */}
          <motion.div
            ref={panelRef}
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 0, scale: 0.94, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          >
            {/* ── Barra superior ── */}
            <header className="safe-t relative z-20 flex shrink-0 items-center justify-between gap-3 border-b border-electric/10 bg-void/70 px-4 py-3 backdrop-blur-xl sm:px-7 sm:py-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.26em] text-cyan/60">
                  ARCHIVO·MNRL26
                  <span className="ml-2 text-warm/30">{story.n}</span>
                </span>
                <span className="hidden h-3 w-px bg-electric/20 sm:block" />
                <span className="hidden truncate font-mono text-[10px] uppercase tracking-[0.18em] text-warm/40 sm:block">
                  {story.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden font-mono text-[10px] tracking-[0.2em] text-warm/35 sm:block">
                  {String(Math.round(progress * 100)).padStart(3, '0')}%
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="tap group flex items-center gap-2 rounded-full border border-electric/20 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-warm/60 transition-colors hover:border-cyan/50 hover:text-cyan"
                >
                  <Grid3x3 className="h-3.5 w-3.5" strokeWidth={1.5} />
                  <span className="hidden sm:inline">Volver a historias</span>
                  <span className="sm:hidden">Volver</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar lector"
                  className="tap grid place-items-center rounded-full border border-electric/20 text-warm/60 transition-colors hover:border-red-400/50 hover:text-red-300"
                >
                  <X className="h-4 w-4" strokeWidth={1.6} />
                </button>
              </div>
            </header>

            {/* Progreso */}
            <div className="relative z-20 h-px shrink-0 bg-electric/10">
              <div
                className="h-full bg-gradient-to-r from-violet-soft via-cyan to-warm transition-[width] duration-150"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            {/* ── Área de lectura ── */}
            <div ref={scrollerRef} className="relative z-10 flex-1 overflow-y-auto overscroll-contain">
              <article className="mx-auto w-full max-w-[46rem] px-6 pb-16 pt-12 sm:px-10 sm:pt-16">
                {/* Cabecera del cuento */}
                <header className="relative">
                  {/* Lomo / gutter */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-6 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-electric/10 to-transparent sm:block"
                  />

                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                      className="relative"
                      style={{ '--hue': story.hue }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full blur-2xl"
                        style={{ backgroundColor: `hsla(${story.hue}, 80%, 55%, .22)` }}
                      />
                      <span className="relative grid h-24 w-24 place-items-center rounded-full border border-electric/15 bg-deep/50 sm:h-28 sm:w-28">
                        <StoryGlyph name={story.glyph} className="h-12 w-12 sm:h-14 sm:w-14" />
                      </span>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                      className="kicker mt-8"
                    >
                      {story.author ? `Por ${story.author}` : 'Autoría no consignada'}
                    </motion.p>

                    <motion.h1
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.46, ease: EASE }}
                      className="mt-4 font-display text-[clamp(2.2rem,7vw,4rem)] font-light leading-[1.05] tracking-tight text-warm"
                    >
                      {story.title}
                    </motion.h1>

                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
                      className="rule-fade-x mt-8 h-px w-48"
                      aria-hidden="true"
                    />

                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.66 }}
                      className="mt-7 flex flex-wrap justify-center gap-1.5"
                    >
                      {story.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-electric/18 bg-electric/[0.05] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] sm:text-[9.5px] sm:tracking-[0.14em] text-warm/55"
                        >
                          {t}
                        </li>
                      ))}
                    </motion.ul>
                  </div>

                  {/* Sinopsis */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.74 }}
                    className="mt-12 rounded-xl border border-violet-soft/15 bg-violet/[0.04] p-6"
                  >
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-violet-soft/70">
                      Ficha del archivo
                    </p>
                    <p className="mt-3 text-pretty font-read text-[0.98rem] leading-[1.75] text-warm/65 italic">
                      {story.synopsis}
                    </p>
                  </motion.div>
                </header>

                {/* Cuerpo del cuento */}
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.82 }}
                  className="prose-read mt-12"
                >
                  {paragraphs.map((p, i) => (
                    <p key={i} className={i === 0 ? 'prose-read-p-first' : 'prose-read-p'}>
                      {p}
                    </p>
                  ))}
                </motion.div>

                {/* Fin del texto */}
                <div className="mt-14 flex flex-col items-center gap-5">
                  <span className="h-px w-24 bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-warm/30">
                    Fin del archivo
                  </span>
                </div>

                {/* ── Controles ──
                    En móvil: anterior y siguiente en dos columnas a ancho
                    completo, y "volver" en su propia fila. En pantallas
                    grandes vuelven a la fila de tres. */}
                <nav className="mt-14 grid grid-cols-2 items-center gap-3 border-t border-electric/12 pt-8 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
                  <NavButton dir="prev" story={prev} onClick={handleNavigate} />
                  <NavButton dir="next" story={next} onClick={handleNavigate} align="right" />
                  <button
                    type="button"
                    onClick={onClose}
                    className="group col-span-2 flex flex-col items-center gap-2 rounded-full px-4 py-3 transition-colors hover:bg-electric/[0.05] sm:col-span-1 sm:col-start-2 sm:row-start-1"
                  >
                    <span className="tap grid place-items-center rounded-full border border-electric/25 transition-colors group-hover:border-cyan/50 group-hover:bg-cyan/10">
                      <Grid3x3 className="h-4 w-4 text-warm/50 transition-colors group-hover:text-cyan" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-warm/45 transition-colors group-hover:text-cyan sm:hidden">
                      Volver a historias
                    </span>
                  </button>
                </nav>
              </article>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function NavButton({ dir, story, onClick, align = 'left' }) {
  if (!story) return <span />

  const Icon = dir === 'prev' ? ArrowLeft : ArrowRight
  const isRight = align === 'right'

  return (
    <button
      type="button"
      onClick={() => onClick(dir)}
      className={`group tap flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-electric/[0.05] ${
        isRight ? 'flex-row-reverse text-right' : ''
      }`}
    >
      <Icon
        className={`h-4 w-4 shrink-0 text-cyan/60 transition-transform duration-400 group-hover:-translate-x-0.5 ${
          isRight ? 'rotate-180 group-hover:translate-x-0.5' : ''
        }`}
        strokeWidth={1.6}
      />
      <span className={`min-w-0 ${isRight ? 'text-right' : ''}`}>
        <span className="block font-mono text-[9.5px] uppercase tracking-[0.16em] sm:text-[9px] sm:tracking-[0.2em] text-warm/30">
          {dir === 'prev' ? '← Historia anterior' : 'Historia siguiente →'}
        </span>
        <span className="mt-1 block truncate font-display text-base leading-tight text-warm/75 transition-colors group-hover:text-cyan sm:text-lg">
          {story.title}
        </span>
      </span>
    </button>
  )
}

/** Mantiene el foco dentro del lector mientras está abierto. */
function trapFocus(event, container) {
  if (!container) return
  const focusables = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )
  if (!focusables.length) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}