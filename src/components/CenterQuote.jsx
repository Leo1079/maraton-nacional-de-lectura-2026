import { motion } from 'motion/react'
import { STORY_COUNT } from '../data/stories.js'
import { Reveal } from './ui/Reveal.jsx'

export default function CenterQuote() {
  return (
    <section className="relative overflow-hidden px-5 py-32 sm:px-8 sm:py-44">
      {/* Oscuridad total: un corte en la página */}
      <div aria-hidden="true" className="absolute inset-0 bg-void" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(70% 50% at 50% 50%, rgba(109,63,212,.13) 0%, transparent 68%)',
        }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal>
          <span className="kicker text-warm/30">El centro de la sala</span>
        </Reveal>

        <motion.blockquote
          initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <p className="font-display text-[clamp(1.75rem,5.6vw,3.75rem)] font-light leading-[1.14] tracking-tight text-aurora">
            ¿Qué mundo imaginamos cuando cerramos los ojos y pensamos en el futuro?
          </p>
        </motion.blockquote>

        <Reveal delay={0.35}>
          <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.26em] text-warm/45">
            {STORY_COUNT} historias
            <span className="mx-2.5 text-cyan/40">·</span>1 curso
            <span className="mx-2.5 text-cyan/40">·</span>
            <span className="text-cyan/75">infinitos mundos posibles</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}