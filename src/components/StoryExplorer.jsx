import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CATEGORIES, STORIES } from '../data/stories.js'
import StoryCard from './StoryCard.jsx'
import { Counter, Reveal, SectionHeading } from './ui/Reveal.jsx'

export default function StoryExplorer({ onOpen }) {
  const [active, setActive] = useState('all')

  const filtered = useMemo(
    () => (active === 'all' ? STORIES : STORIES.filter((s) => s.filters.includes(active))),
    [active],
  )

  return (
    <section id="historias" className="relative scroll-mt-24 px-5 py-28 sm:px-8 sm:py-32">
      {/* Separador de capítulo */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="kicker shrink-0 text-cyan/50">Capítulo 01</span>
            <span className="rule-fade-x h-px flex-1" />
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="historias-titulo"
          kicker="La colección"
          title="Historias de otros mundos"
          lead="Quince cuentos escritos por estudiantes de 1.º año C. Cada ficha es un archivo: abrila para entrar."
        />

        {/* ── Filtros ── */}
        <Reveal delay={0.12} className="mt-12">
          <div className="flex flex-col items-center gap-5">
            <div
              role="tablist"
              aria-label="Filtrar historias por categoría"
              className="mask-fade-x flex w-full max-w-full gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0"
            >
              <FilterChip
                active={active === 'all'}
                onClick={() => setActive('all')}
                label="Todas"
                emoji="✦"
                count={STORIES.length}
              />
              {CATEGORIES.map((c) => (
                <FilterChip
                  key={c.id}
                  active={active === c.id}
                  onClick={() => setActive(c.id)}
                  label={c.label}
                  emoji={c.emoji}
                  count={STORIES.filter((s) => s.filters.includes(c.id)).length}
                />
              ))}
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-warm/35" aria-live="polite">
              {filtered.length === STORIES.length ? (
                <>
                  <Counter to={STORIES.length} /> / {String(STORIES.length).padStart(2, '0')} ·
                  colección completa
                </>
              ) : (
                <>
                  <Counter to={filtered.length} /> /
                  {String(STORIES.length).padStart(2, '0')} ·{' '}
                  {CATEGORIES.find((c) => c.id === active)?.label}
                </>
              )}
            </p>
          </div>
        </Reveal>

        {/* ── Grilla ── */}
        <motion.div
          layout
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((story, i) => (
              <StoryCard key={story.id} story={story} index={i} onOpen={onOpen} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function FilterChip({ active, onClick, label, emoji, count }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`tap relative shrink-0 rounded-full border px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-all duration-400 ${
        active
          ? 'border-cyan/60 bg-cyan/10 text-cyan shadow-[0_0_28px_-10px_rgba(94,231,255,0.7)]'
          : 'border-electric/15 bg-electric/[0.04] text-warm/50 hover:border-electric/35 hover:text-warm/80'
      }`}
    >
      {active && (
        <motion.span
          layoutId="chip-glow"
          className="absolute inset-0 rounded-full bg-cyan/10"
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <span className="relative z-10">
        <span className="mr-1.5">{emoji}</span>
        {label}
        <span className={`ml-2 text-[9px] ${active ? 'text-cyan/60' : 'text-warm/25'}`}>
          {String(count).padStart(2, '0')}
        </span>
      </span>
    </button>
  )
}