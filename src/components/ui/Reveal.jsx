import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/** Aparición progresiva al entrar en viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  duration = 0.85,
  className = '',
  style,
  as = 'div',
  once = true,
  amount = 0.35,
}) {
  const reduced = useReducedMotion()
  const Comp = motion[as] ?? motion.div

  if (reduced)
    return (
      <Comp className={className} style={style}>
        {children}
      </Comp>
    )

  return (
    <Comp
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  )
}

/** Encabezado de sección: kicker + título + subtítulo. */
export function SectionHeading({ kicker, title, lead, id, align = 'center' }) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <Reveal className={`flex flex-col ${alignment} gap-4`}>
      {kicker && (
        <span className="kicker flex items-center gap-3">
          <span className="h-px w-8 bg-cyan/40" aria-hidden="true" />
          {kicker}
        </span>
      )}
      <h2 id={id} className="font-display text-4xl leading-[1.08] tracking-tight text-warm sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <span className="rule-fade-x mt-1 h-px w-full max-w-xs" aria-hidden="true" />
      {lead && (
        <p className="max-w-2xl text-balance text-sm leading-relaxed text-warm/55 sm:text-base">{lead}</p>
      )}
    </Reveal>
  )
}

/** Contador que cuenta hacia arriba cuando entra en pantalla. */
export function Counter({ to, duration = 2, suffix = '' }) {
  return <CountUp to={to} duration={duration} suffix={suffix} />
}

function CountUp({ to, duration = 2, suffix = '' }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setValue(to)
      return
    }
    const el = ref.current
    if (!el) return

    let raf = 0
    let start = 0

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()

        const step = (t) => {
          if (!start) start = t
          const p = Math.min((t - start) / (duration * 1000), 1)
          const eased = 1 - Math.pow(1 - p, 4)
          setValue(Math.round(eased * to))
          if (p < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, duration, reduced])

  return (
    <span ref={ref}>
      {String(value).padStart(2, '0')}
      {suffix}
    </span>
  )
}