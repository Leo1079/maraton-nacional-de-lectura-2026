import { useEffect, useState } from 'react'

/** Bloquea el scroll del body (para el lector fullscreen) sin salto de layout. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const { body, documentElement } = document
    const scrollbar = window.innerWidth - documentElement.clientWidth
    const prevPadding = body.style.paddingRight
    const prevFlag = body.dataset.scrollLocked

    body.dataset.scrollLocked = 'true'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    return () => {
      body.style.paddingRight = prevPadding
      if (prevFlag === undefined) delete body.dataset.scrollLocked
      else body.dataset.scrollLocked = prevFlag
    }
  }, [locked])
}

/** Detecta si el usuario scrollea hacia abajo (para ocultar la nav). */
export function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState('up')

  useEffect(() => {
    let last = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        if (Math.abs(y - last) > threshold) {
          setDirection(y > last && y > 120 ? 'down' : 'up')
          last = y
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return direction
}

/** Media query como estado (para adaptar comportamiento, no solo estilos). */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}