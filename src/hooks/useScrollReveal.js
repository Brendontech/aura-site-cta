import { useEffect, useRef, useState, useCallback } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Marca o elemento como visível quando entra na viewport (uma única vez)
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) { setVisible(true); return }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// Contador animado disparado ao entrar na viewport
export function useAnimatedCounter(target, duration = 1800) {
  const [ref, started] = useScrollReveal(0.3)
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!started) return
    if (prefersReducedMotion()) { setValue(target); return }
    let raf
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setValue(Math.round((1 - Math.pow(1 - progress, 3)) * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [started, target, duration])
  return [ref, value]
}

// Luz que segue o cursor dentro de um card (usa --mx / --my no CSS .spotlight)
export function useSpotlight() {
  return useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])
}

// Inclinação 3D suave acompanhando o mouse
export function useTilt(max = 8) {
  const ref = useRef(null)
  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1200px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`
  }, [max])
  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = ''
  }, [])
  return { ref, onMouseMove, onMouseLeave }
}
