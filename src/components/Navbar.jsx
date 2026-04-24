import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronRight } from 'lucide-react'
import logo from '../assets/logo.png'

const LINKS = [
  { label: 'Início',          href: '/#inicio' },
  { label: 'Funcionalidades', href: '/#funcionalidades' },
  { label: 'Benefícios',      href: '/#beneficios' },
  { label: 'Preços',          href: '/#precos' },
  { label: 'Contato',         href: '/contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location])

  const scrollTo = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.slice(2)
      if (location.pathname !== '/') {
        window.location.href = href
        return
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy/95 backdrop-blur-xl shadow-2xl border-b border-teal/10'
          : 'bg-transparent'
      }`}>
        <div className="container-max">
          <div className="flex items-center justify-between h-[70px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logo} alt="Aura" className="h-12 drop-shadow-lg group-hover:scale-105 transition-transform" />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {LINKS.map(({ label, href }) => (
                href.startsWith('/#') ? (
                  <a key={label} href={href} onClick={(e) => scrollTo(e, href)}
                    className="text-sm font-medium text-white/70 hover:text-white px-4 py-2 rounded-lg hover:bg-white/8 transition-all">
                    {label}
                  </a>
                ) : (
                  <Link key={label} to={href}
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                      location.pathname === href ? 'text-teal bg-teal/10' : 'text-white/70 hover:text-white hover:bg-white/8'
                    }`}>
                    {label}
                  </Link>
                )
              ))}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <Link to="/contato"
                className="hidden md:inline-flex items-center gap-2 bg-aura-grad text-white font-display font-bold text-sm px-5 py-2.5 rounded-xl shadow-teal hover:shadow-teal-lg hover:-translate-y-0.5 transition-all">
                Conheça o Sistema <ChevronRight size={14} />
              </Link>
              <button className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-navy flex flex-col items-center justify-center gap-6 transition-all duration-300 ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <img src={logo} alt="Aura" className="h-16 mb-4" />
        {LINKS.map(({ label, href }) => (
          href.startsWith('/#') ? (
            <a key={label} href={href} onClick={(e) => scrollTo(e, href)}
              className="font-display text-2xl font-700 text-white hover:text-teal transition-colors">
              {label}
            </a>
          ) : (
            <Link key={label} to={href}
              className="font-display text-2xl font-bold text-white hover:text-teal transition-colors">
              {label}
            </Link>
          )
        ))}
        <Link to="/contato" onClick={() => setMenuOpen(false)}
          className="mt-4 btn-primary text-lg px-8 py-4">
          Conheça o Sistema
        </Link>
      </div>
    </>
  )
}
