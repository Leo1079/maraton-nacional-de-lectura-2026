import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BookOpen, Menu, X } from 'lucide-react'
import { SITE } from '../data/site.js'
import { useScrollDirection } from '../hooks/useUi.js'

const LINKS = [
  { href: '#historias', label: 'Historias' },
  { href: '#mundos', label: 'Otros mundos' },
  { href: '#creditos', label: 'Créditos' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const direction = useScrollDirection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /**
   * Navegación desde el desplegable móvil.
   *
   * El enlace se desmonta mientras se anima el cierre, y en puntero táctil
   * el navegador pierde el destino del fragmento: cambia el hash pero la
   * página no se desplaza. Por eso aquí se intercepta y se desplaza después
   * del primer frame, una vez que el menú ya está cerrado.
   */
  const goFromMenu = (event, href) => {
    event.preventDefault()
    setOpen(false)
    requestAnimationFrame(() => {
      const target = document.querySelector(href)
      if (!target) return
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.pushState(null, '', href)
    })
  }

  const hidden = direction === 'down' && !open

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden && scrolled ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] safe-t"
    >
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          scrolled ? 'border-b border-electric/10 bg-void/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      />

      <nav className="relative mx-auto flex h-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group -my-1 flex min-h-[44px] items-center gap-3 py-1" aria-label="Ir al inicio">
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-cyan/25 bg-deep/60">
            <BookOpen className="h-4 w-4 text-cyan/80 transition-colors group-hover:text-cyan" strokeWidth={1.4} />
            <span className="absolute inset-0 rounded-full bg-cyan/10 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-lg tracking-tight text-warm">Del futuro al más allá</span>
            <span className="font-mono text-[9px] tracking-[0.22em] text-warm/35">MNRL 2026 · 1.º C</span>
          </span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.2em] text-warm/55 transition-colors hover:text-warm"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-cyan/70 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#historias"
          className="hidden min-h-[44px] items-center gap-2 rounded-full border border-cyan/25 bg-cyan/5 px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan/90 transition-colors hover:border-cyan/50 hover:bg-cyan/10 lg:inline-flex"
        >
          Explorar
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="tap grid place-items-center rounded-full border border-electric/20 text-warm/70 lg:hidden"
        >
          {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="safe-b overflow-hidden border-b border-electric/10 bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-6">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  className="nav-dropdown-item"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.08 }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => goFromMenu(e, l.href)}
                    className="block py-3 font-display text-2xl text-warm/85 transition-colors hover:text-cyan"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-3 border-t border-electric/10 pt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-warm/40">
                  {SITE.course} · {SITE.teacher}
                </p>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}