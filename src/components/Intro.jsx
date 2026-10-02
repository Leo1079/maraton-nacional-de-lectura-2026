import { motion } from 'motion/react'
import { HERO_INTRO, SITE } from '../data/site.js'
import { Reveal } from './ui/Reveal.jsx'

/** Libro abierto animado: tapa que gira y páginas que flotan. */
function OpenBook() {
  return (
    <motion.div
      aria-hidden="true"
      className="relative h-40 w-40 sm:h-48 sm:w-48"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-violet-soft/12 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg viewBox="0 0 160 160" fill="none" className="relative h-full w-full">
        <defs>
          <linearGradient id="pgL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fdf6e8" stopOpacity=".22" />
            <stop offset="100%" stopColor="#fdf6e8" stopOpacity=".05" />
          </linearGradient>
          <linearGradient id="pgR" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5ee7ff" stopOpacity=".22" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity=".08" />
          </linearGradient>
        </defs>

        {/* Página izquierda */}
        <motion.path
          d="M78 112C68 100 50 96 30 99V50c20-3 38 1 48 13z"
          fill="url(#pgL)"
          stroke="#fdf6e8"
          strokeOpacity=".35"
          strokeWidth="1.1"
        />
        {/* Página derecha */}
        <motion.path
          d="M82 112c10-12 28-16 48-13V50c-20-3-38 1-48 13z"
          fill="url(#pgR)"
          stroke="#5ee7ff"
          strokeOpacity=".45"
          strokeWidth="1.1"
        />

        {/* Lomo */}
        <motion.path
          d="M80 63v49"
          stroke="#fdf6e8"
          strokeOpacity=".5"
          strokeWidth="1.1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Renglones de texto */}
        <motion.g
          stroke="#fdf6e8"
          strokeOpacity=".2"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <path d="M38 62h30M38 70h26M38 78h30M38 86h20" />
          <path d="M92 62h30M92 70h26M92 78h30M92 86h22" />
        </motion.g>

        {/* Página que levita */}
        <motion.g
          initial={{ opacity: 0, y: 14, rotate: -6 }}
          whileInView={{ opacity: 1, y: -26, rotate: 4 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <path
            d="M56 30h48a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H56a4 4 0 0 1-4-4V34a4 4 0 0 1 4-4z"
            fill="#fdf6e8"
            fillOpacity=".07"
            stroke="#5ee7ff"
            strokeOpacity=".4"
            strokeWidth="1"
          />
          <g stroke="#fdf6e8" strokeOpacity=".28" strokeWidth="1" strokeLinecap="round">
            <path d="M60 42h40M60 50h32M60 58h40" />
          </g>
        </motion.g>
      </svg>

      {/* Partículas que orbitan el libro */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-cyan"
          animate={{
            x: [0, 60 - i * 34, 0],
            y: [0, -46 + i * 20, 0],
            opacity: [0, 0.85, 0],
          }}
          transition={{
            duration: 6 + i * 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.1,
          }}
        />
      ))}
    </motion.div>
  )
}

export default function Intro() {
  return (
    <section id="introduccion" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 55% at 22% 40%, rgba(109,63,212,.10) 0%, transparent 65%)',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
        {/* Texto editorial */}
        <div className="max-w-2xl">
          <Reveal>
            <span className="kicker flex items-center gap-3">
              <span className="h-px w-8 bg-cyan/40" aria-hidden="true" />
              El proyecto
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2.1rem,5.4vw,3.9rem)] font-light leading-[1.06] tracking-tight text-warm">
              ¿Qué pasaría{' '}
              <span className="italic text-aurora">si el futuro</span>{' '}
              <br className="hidden sm:block" />
              fuera diferente?
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 flex gap-5">
              <span className="mt-2.5 h-px w-8 shrink-0 bg-cyan/40" aria-hidden="true" />
              <p className="text-pretty text-base leading-[1.85] text-warm/65 sm:text-lg">{HERO_INTRO.body}</p>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <blockquote className="mt-12 border-l border-violet-soft/30 pl-6 sm:pl-8">
              <p className="font-display text-2xl font-light italic leading-snug text-warm/90 sm:text-[2rem]">
                “{HERO_INTRO.highlight}”
              </p>
              <footer className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan/60">
                {SITE.course} · {SITE.event}
              </footer>
            </blockquote>
          </Reveal>
        </div>

        {/* Libro */}
        <Reveal delay={0.25} className="flex justify-center lg:justify-end">
          <OpenBook />
        </Reveal>
      </div>
    </section>
  )
}