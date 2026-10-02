import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import StoryGlyph from './StoryGlyph.jsx'

/**
 * Ficha de archivo futurista. Cada tarjeta lleva número de expediente,
 * glifo conceptual, título, autoría, resumen, etiquetas y el acceso
 * "Leer historia".
 */
export default function StoryCard({ story, index, onOpen }) {
  const { n, title, author, synopsis, tags, glyph, hue } = story

  // Brillo que sigue al cursor (custom properties en vez de re-render)
  const trackGlow = (e) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -14, scale: 0.97, filter: 'blur(6px)' }}
      transition={{
        duration: 0.65,
        delay: Math.min(index * 0.055, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ '--hue': hue }}
      className="story-card group relative"
    >
      <div
        onMouseMove={trackGlow}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-electric/12 bg-deep/40 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-electric/35 hover:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.9)] sm:p-7"
      >
        {/* Brillo que sigue al cursor */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), hsla(var(--hue), 85%, 60%, .13), transparent 62%)',
          }}
        />

        {/* Grano de archivo */}
        <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0 opacity-[0.2]" />

        {/* Número de expediente + glifo */}
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[10px] tracking-[0.28em] text-cyan/55">
            ARCHIVO·MNRL26
            <span className="ml-2 text-warm/25">{n}</span>
          </span>

          <span className="glyph-frame relative grid h-12 w-12 shrink-0 place-items-center rounded-xl">
            <span aria-hidden="true" className="glyph-glow absolute inset-0 rounded-xl" />
            <StoryGlyph name={glyph} className="glyph-hue relative h-8 w-8" />
          </span>
        </div>

        {/* Título y autoría */}
        <h3 className="mt-6 font-display text-[1.7rem] font-light leading-[1.14] tracking-tight text-warm sm:text-[1.85rem]">
          {title}
        </h3>

        <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-warm/40">
          {author ? (
            <>
              <span className="text-warm/30">por</span> <span className="text-cyan/65">{author}</span>
            </>
          ) : (
            <span className="text-warm/25">autoría no consignada</span>
          )}
        </p>

        {/* Resumen */}
        <p className="mt-5 line-clamp-4 text-pretty text-[0.9rem] leading-[1.75] text-warm/55">{synopsis}</p>

        {/* Etiquetas */}
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-electric/15 bg-electric/[0.05] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.11em] sm:text-[9.5px] sm:tracking-[0.12em] text-warm/50 transition-colors group-hover:border-electric/25"
            >
              {t}
            </li>
          ))}
        </ul>

        {/* Acceso */}
        <button
          type="button"
          onClick={(e) => onOpen(story.id, e.currentTarget)}
          className="tap mt-auto flex w-full items-center justify-between gap-3 border-t border-electric/12 pt-5 text-left"
          style={{ marginTop: '1.75rem' }}
        >
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-cyan/80 transition-colors group-hover:text-cyan">
            Leer historia
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan/25 text-cyan/80 transition-all duration-500 group-hover:border-cyan/60 group-hover:bg-cyan/10">
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.6}
            />
          </span>
        </button>

        {/* Esquinas de archivador */}
        <span
          aria-hidden="true"
          className="absolute left-3 top-3 h-3 w-3 border-l border-t border-cyan/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-cyan/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
    </motion.article>
  )
}