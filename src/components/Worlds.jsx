import { motion } from 'motion/react'
import { WORLDS } from '../data/worlds.js'
import { STORIES } from '../data/stories.js'
import { Reveal, SectionHeading } from './ui/Reveal.jsx'

const titleOf = (id) => STORIES.find((s) => s.id === id)?.title ?? ''

export default function Worlds() {
  return (
    <section id="mundos" className="relative scroll-mt-24 px-5 py-28 sm:px-8 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-40 mask-fade-b" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="flex justify-center">
          <div className="flex items-center gap-4">
            <span className="kicker shrink-0 text-violet-soft/70">Capítulo 02</span>
            <span className="rule-fade-x h-px w-16" />
          </div>
        </Reveal>

        <div className="mt-8">
          <SectionHeading
            id="mundos-titulo"
            kicker="Los grandes temas"
            title="Otros mundos"
            lead="Seis conceptos que aparecen y reaparecen a lo largo de los quince cuentos."
          />
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-14 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {WORLDS.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.08} style={{ '--hue': w.hue }}>
              <WorldCard world={w} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorldCard({ world, index }) {
  const { word, question, note, stories, hue } = world

  return (
    <article className="group relative flex flex-col">
      {/* Palabra grande con respiración */}
      <motion.h3
        className="font-display text-[clamp(2.4rem,6.5vw,3.6rem)] font-light leading-[0.95] tracking-tight"
        style={{ color: `hsl(${hue} 55% 78%)` }}
        animate={{ opacity: [0.72, 1, 0.72], letterSpacing: ['-0.02em', '0.012em', '-0.02em'] }}
        transition={{ duration: 7 + index * 0.7, repeat: Infinity, ease: 'easeInOut' }}
      >
        {word}
      </motion.h3>

      <span
        aria-hidden="true"
        className="mt-4 h-px w-full origin-left scale-x-[0.35] transition-transform duration-700 group-hover:scale-x-100"
        style={{ backgroundColor: `hsla(${hue}, 80%, 65%, .45)` }}
      />

      <p className="mt-5 font-read text-lg italic leading-snug text-warm/85">“{question}”</p>

      <p className="mt-3 text-pretty text-sm leading-[1.75] text-warm/45">{note}</p>

      <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
        {stories.map((id) => (
          <li
            key={id}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.09em] sm:text-[9.5px] sm:tracking-[0.1em] text-warm/30 transition-colors group-hover:text-warm/45"
          >
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: `hsla(${hue}, 80%, 65%, .8)` }}
            />
            {titleOf(id)}
          </li>
        ))}
      </ul>
    </article>
  )
}