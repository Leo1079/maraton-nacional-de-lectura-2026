import { motion } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import PortalBackdrop from './PortalBackdrop.jsx'
import { SITE } from '../data/site.js'
import { STORY_COUNT } from '../data/stories.js'
import { Counter } from './ui/Reveal.jsx'

const EASE = [0.16, 1, 0.3, 1]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-32 pt-36 sm:px-8"
    >
      <PortalBackdrop />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.p
          kicker
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="kicker mb-8 rounded-full border border-cyan/20 bg-void/40 px-4 py-1.5 backdrop-blur-sm"
        >
          {SITE.event}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 34, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.35, ease: EASE }}
          className="font-display text-[clamp(3rem,12vw,8.5rem)] font-light leading-[0.92] tracking-[-0.03em] text-warm text-glow-violet"
        >
          Del futuro
          <br />
          <span className="text-aurora italic">al más allá</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.75, ease: EASE }}
          className="mt-7 max-w-xl text-balance font-display text-lg italic leading-snug text-warm/70 sm:text-2xl"
        >
          {SITE.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.4, delay: 1, ease: EASE }}
          className="rule-fade-x mt-10 h-px w-56"
          aria-hidden="true"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
          className="mt-7 font-mono text-[11px] uppercase tracking-[0.26em] text-warm/55 sm:text-xs"
        >
          {SITE.course}
          <span className="mx-3 text-cyan/50">·</span>
          <span className="text-warm/70">{SITE.teacher}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3, ease: EASE }}
          className="mt-12 flex flex-col items-center gap-7"
        >
          <a
            href="#historias"
            className="group relative inline-flex min-h-[48px] items-center gap-3 overflow-hidden rounded-full border border-cyan/35 bg-cyan/5 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan transition-all duration-500 hover:border-cyan/70 hover:bg-cyan/12 hover:shadow-[0_0_38px_-8px_rgba(94,231,255,0.45)] sm:px-8"
          >
            <span className="relative z-10">Explorar los mundos</span>
            <ArrowDown
              className="relative z-10 h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-1"
              strokeWidth={2}
            />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan/20 to-transparent transition-transform duration-[900ms] group-hover:translate-x-full" />
          </a>

          <p className="font-mono text-[10px] tracking-[0.2em] text-warm/30">
            <Counter to={STORY_COUNT} /> historias archivadas
          </p>
        </motion.div>
      </div>

      {/* Indicador inferior */}
      <motion.a
        href="#introduccion"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        className="safe-b absolute inset-x-0 bottom-7 z-10 mx-auto flex w-max flex-col items-center gap-2 pt-3 text-warm/35 transition-colors hover:text-cyan/80"
        aria-label="Bajar a la introducción"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.24em]">↓ Explorar las historias</span>
        <motion.span
          animate={{ y: [0, 7, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </section>
  )
}