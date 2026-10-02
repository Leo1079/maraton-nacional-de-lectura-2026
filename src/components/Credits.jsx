import { motion } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { SITE } from '../data/site.js'
import { STORY_COUNT, STORIES } from '../data/stories.js'
import { Reveal } from './ui/Reveal.jsx'

/**
 * Cierre. `onWarp` recibe un valor 0→1 que el Starfield usa para alejar las
 * estrellas: la sensación de viajar hacia otro mundo.
 */
export default function Credits({ onWarp }) {
  const roster = STORIES.map((s) => ({ n: s.n, title: s.title, author: s.author }))

  return (
    <footer
      id="creditos"
      className="relative scroll-mt-24 overflow-hidden px-5 pb-10 pt-28 sm:px-8 sm:pt-36"
      onMouseEnter={() => onWarp?.(0.55)}
      onMouseLeave={() => onWarp?.(0)}
    >
      {/* Desvanecido hacia el negro: las estrellas se van lejanos */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-void via-void/85 to-transparent" />

      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <div className="flex justify-center">
            <div className="flex items-center gap-4">
              <span className="rule-fade-x h-px w-12" />
              <span className="kicker text-cyan/50">Archivos cerrados</span>
              <span className="rule-fade-x h-px w-12" />
            </div>
          </div>
        </Reveal>

        {/* Identidad del evento */}
        <Reveal delay={0.1} className="mt-12 flex flex-col items-center text-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.3em] text-cyan/70">{SITE.event}</p>

          <h2 className="mt-7 font-display text-[clamp(2.1rem,6vw,3.6rem)] font-light leading-[1.1] tracking-tight text-warm">
            “Del futuro al más allá:{' '}
            <span className="italic text-aurora">cuando la literatura imagina otros mundos posibles</span>”
          </h2>

          <div className="mt-9 flex flex-col items-center gap-2.5">
            <p className="font-display text-2xl text-warm/85">{SITE.course}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-warm/50">
              {SITE.teacher}
            </p>
          </div>

          <p className="mt-8 max-w-md text-pretty text-sm leading-relaxed text-warm/45">
            {SITE.educatorLine}
          </p>
        </Reveal>

        {/* Nómina de la colección */}
        <Reveal delay={0.18} className="mt-20">
          <div className="rounded-2xl border border-electric/10 bg-deep/25 p-6 backdrop-blur-sm sm:p-9">
            <div className="flex items-baseline justify-between gap-4 border-b border-electric/10 pb-5">
              <h3 className="font-display text-xl text-warm/90">La colección completa</h3>
              <span className="font-mono text-[10px] tracking-[0.2em] text-warm/35">
                {String(STORY_COUNT).padStart(2, '0')} archivos
              </span>
            </div>

            <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {roster.map((r) => (
                <li key={r.n} className="flex items-baseline gap-3 border-b border-electric/[0.07] pb-2.5">
                  <span className="font-mono text-[10px] text-cyan/45">{r.n}</span>
                  <span className="min-w-0 flex-1 truncate font-read text-[0.95rem] text-warm/75">
                    {r.title}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.09em] sm:text-[9.5px] sm:tracking-[0.1em] text-warm/30">
                    {r.author ?? '—'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Cierre: viaje hacia otro mundo */}
        <div className="relative mt-28 flex flex-col items-center">
          <motion.div
            aria-hidden="true"
            className="relative h-40 w-40 sm:h-52 sm:w-52"
            animate={{ scale: [1, 1.35], opacity: [0.85, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="absolute inset-0 rounded-full border border-cyan/25" />
            <span className="absolute inset-[18%] rounded-full border border-violet-soft/25" />
            <span className="absolute inset-[38%] rounded-full bg-cyan/15 blur-xl" />
          </motion.div>

          <motion.p
            className="-mt-8 font-display text-2xl italic text-warm/70 sm:text-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.3 }}
          >
            Seguimos leyendo.
          </motion.p>

          <a
            href="#top"
            className="group tap mt-10 flex items-center justify-center gap-2 rounded-full px-4 font-mono text-[10px] uppercase tracking-[0.22em] text-warm/40 transition-colors hover:text-cyan"
          >
            <ArrowUp
              className="h-3.5 w-3.5 transition-transform duration-400 group-hover:-translate-y-1"
              strokeWidth={1.6}
            />
            Volver al inicio
          </a>
        </div>
      </div>
    </footer>
  )
}