import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronRight, MonitorPlay } from 'lucide-react'
import Logo from './Logo'
import { useDemoChooser } from '../context/DemoChooser'
import { DEMO_URL } from '../config'

const LINKS = [
  { label: 'Funcionalidades', id: 'funcionalidades' },
  { label: 'Check-in',        id: 'presenca' },
  { label: 'Benefícios',      id: 'beneficios' },
  { label: 'Planos',          id: 'precos' },
  { label: 'Ajuda',           to: '/ajuda' },
  { label: 'Contato',         to: '/contato' },
]

// Páginas cujo topo é escuro: a navbar pode começar transparente
const DARK_TOP = ['/', '/contato', '/ajuda']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive]     = useState(null)
  const [pill, setPill]         = useState(null)
  const linkRefs = useRef({})
  const { pathname } = useLocation()
  const { open: openChooser } = useDemoChooser()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Destaca o link da seção visível (scroll spy)
  useEffect(() => {
    if (!isHome) { setActive(LINKS.some(l => l.to === pathname) ? pathname.slice(1) : null); return }
    const sections = LINKS.filter(l => l.id).map(l => document.getElementById(l.id)).filter(Boolean)
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach(s => obs.observe(s))
    const onTop = () => { if (window.scrollY < 200) setActive(null) }
    window.addEventListener('scroll', onTop, { passive: true })
    return () => { obs.disconnect(); window.removeEventListener('scroll', onTop) }
  }, [isHome, pathname])

  // Pílula deslizante atrás do link ativo
  useLayoutEffect(() => {
    const el = active && linkRefs.current[active]
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null)
  }, [active])

  const goTo = (e, id) => {
    setMenuOpen(false)
    if (!isHome) return
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const solid = scrolled || menuOpen || !DARK_TOP.includes(pathname)

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid ? 'bg-navy/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] border-b border-white/5' : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="container-max">
          <div className={`flex items-center justify-between gap-6 transition-all duration-500 ${scrolled ? 'h-[64px]' : 'h-[76px]'}`}>
            <Link to="/" aria-label="Sanyti — início" className="flex-shrink-0 group"
              onClick={(e) => { if (isHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) } }}>
              <div className="transition-transform duration-300 group-hover:scale-105">
                <span className="xl:hidden"><Logo size="sm" compact /></span>
                <span className="hidden xl:inline"><Logo size={scrolled ? 'sm' : 'md'} compact={scrolled} /></span>
              </div>
            </Link>

            {/* Links (desktop) */}
            <div className="hidden lg:flex relative items-center gap-0.5 xl:gap-1">
              {pill && (
                <span className="absolute top-0 bottom-0 rounded-lg bg-white/10 transition-all duration-500 ease-out-expo"
                  style={{ left: pill.left, width: pill.width }} />
              )}
              {LINKS.map(({ label, id, to }) => {
                const key = id || to.slice(1)
                const cls = `relative whitespace-nowrap text-sm font-medium px-3 xl:px-4 py-2 rounded-lg transition-colors duration-300 ${
                  active === key ? 'text-white' : 'text-white/65 hover:text-white'
                }`
                return to ? (
                  <Link key={key} to={to} ref={el => (linkRefs.current[key] = el)} className={cls}>{label}</Link>
                ) : (
                  <Link key={key} to={`/#${id}`} ref={el => (linkRefs.current[key] = el)} onClick={(e) => goTo(e, id)} className={cls}>{label}</Link>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={openChooser} className="hidden sm:inline-flex btn-primary text-sm px-5 py-2.5">
                Conheça o Sistema <ChevronRight size={15} />
              </button>
              <button className="lg:hidden text-white w-11 h-11 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
                aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}
                onClick={() => setMenuOpen(o => !o)}>
                <span className={`transition-transform duration-300 ${menuOpen ? 'rotate-90' : ''}`}>
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <div className={`fixed inset-0 z-40 bg-navy/[0.98] backdrop-blur-xl lg:hidden transition-all duration-500 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-teal/15 rounded-full blur-[100px]" />
        <div className="relative h-full flex flex-col justify-center container-max pt-20 pb-10">
          <div className="flex flex-col gap-2">
            {LINKS.map(({ label, id, to }, i) => (
              <Link key={label} to={to || `/#${id}`} onClick={(e) => (id ? goTo(e, id) : setMenuOpen(false))}
                className={`font-display text-3xl font-bold text-white/85 hover:text-teal py-2 transition-all duration-500 ease-out-expo ${
                  menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                }`}
                style={{ transitionDelay: menuOpen ? `${80 + i * 60}ms` : '0ms' }}>
                {label}
              </Link>
            ))}
          </div>
          <div className={`flex flex-col sm:flex-row gap-3 mt-10 transition-all duration-500 ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: menuOpen ? '420ms' : '0ms' }}>
            <a href={DEMO_URL} target="_blank" rel="noreferrer" className="btn-primary text-base">
              <MonitorPlay size={18} /> Explorar a demo
            </a>
            <Link to="/contato" onClick={() => setMenuOpen(false)} className="btn-glass text-base">
              Falar com a equipe
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
