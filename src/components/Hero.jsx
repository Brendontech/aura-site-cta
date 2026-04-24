import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Play, CheckCircle } from 'lucide-react'
import { useAnimatedCounter } from '../hooks/useScrollReveal'

// ── Mockup do app/dashboard ────────────────────────────────
function DashboardMockup() {
  const [activeItem, setActiveItem] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActiveItem(i => (i + 1) % 3), 2200)
    return () => clearInterval(t)
  }, [])

  const items = [
    { sigla: 'MO', name: 'Maria Oliveira', status: 'concluído', color: '#2BBFB3', bg: 'rgba(43,191,179,0.15)' },
    { sigla: 'HF', name: 'Helena Farias',  status: 'em curso',  color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
    { sigla: 'RB', name: 'Rui Barbosa',    status: 'agendado',  color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  ]

  return (
    <div className="relative">
      {/* Main mockup: Desktop */}
      <div className="bg-navy-2 rounded-2xl border border-teal/20 shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden w-full max-w-[440px]">
        {/* Window bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-navy border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <div className="flex-1 mx-4">
            <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-white/30 text-center">aura.homecare.com.br</div>
          </div>
        </div>
        {/* Content */}
        <div className="flex h-[280px]">
          {/* Sidebar */}
          <div className="w-14 bg-navy flex flex-col items-center pt-4 gap-4 border-r border-white/5">
            {['🏠','📅','👥','💰','📊'].map((icon, i) => (
              <div key={i} className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm cursor-pointer transition-all ${i===0?'bg-teal/20 text-teal':'text-white/25 hover:text-white/60'}`}>
                {icon}
              </div>
            ))}
          </div>
          {/* Main area */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="text-xs text-white/40 mb-1">Bom dia, Dra. Sofia 👋</div>
            <div className="font-display font-bold text-white text-sm mb-4">Dashboard</div>
            {/* Mini metric cards */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { label: 'Pacientes', value: '87', color: '#2BBFB3' },
                { label: 'Hoje',      value: '14', color: '#52C48A' },
              ].map(m => (
                <div key={m.label} className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                  <div className="font-display font-black text-lg" style={{ color: m.color }}>{m.value}</div>
                  <div className="text-white/35 text-[10px]">{m.label}</div>
                </div>
              ))}
            </div>
            {/* Agenda list */}
            <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-2">Agenda de Hoje</div>
            <div className="flex flex-col gap-1.5">
              {items.map((item, i) => (
                <div key={i} className={`flex items-center gap-2 p-2 rounded-xl transition-all duration-500 ${activeItem===i?'bg-white/8 scale-[1.02]':''}`}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                    style={{ background: item.bg, color: item.color }}>{item.sigla}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-[11px] font-semibold truncate">{item.name}</div>
                  </div>
                  <div className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{ color: item.color, background: item.bg }}>{item.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phone mockup overlay */}
      <div className="absolute -bottom-6 -right-8 w-[130px] bg-navy rounded-[20px] border border-teal/25 shadow-2xl overflow-hidden animate-float" style={{ animationDelay: '1s' }}>
        <div className="bg-navy px-3 pt-3 pb-2">
          <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mb-3" />
          <div className="text-[8px] text-white/40 mb-1">App Mobile</div>
          <div className="text-xs font-display font-bold text-white mb-2">Check-in ✓</div>
          <div className="bg-teal/10 rounded-xl p-2 border border-teal/20 mb-2">
            <div className="text-[8px] text-teal font-bold">📍 Localização</div>
            <div className="text-[9px] text-white/60 mt-0.5">Confirmada</div>
          </div>
          <div className="bg-green/10 rounded-xl p-2 border border-green/20">
            <div className="text-[8px] text-green font-bold">💊 Bipagem</div>
            <div className="text-[9px] text-white/60 mt-0.5">EAN-13 OK</div>
          </div>
        </div>
      </div>

      {/* Floating badge: evolução */}
      <div className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-card-lg px-3 py-2.5 flex items-center gap-2.5 animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="w-8 h-8 rounded-xl bg-green/10 flex items-center justify-center text-base">✅</div>
        <div>
          <div className="text-navy font-display font-bold text-xs">Evolução registrada</div>
          <div className="text-gray-400 text-[10px]">há 2 minutos</div>
        </div>
      </div>

      {/* Floating badge: GPS */}
      <div className="absolute bottom-8 -left-10 bg-white rounded-2xl shadow-card-lg px-3 py-2.5 flex items-center gap-2.5 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-8 h-8 rounded-xl bg-teal/10 flex items-center justify-center text-base">📍</div>
        <div>
          <div className="text-navy font-display font-bold text-xs">Check-in GPS</div>
          <div className="text-gray-400 text-[10px]">Confirmado</div>
        </div>
      </div>
    </div>
  )
}

// ── Counter item ───────────────────────────────────────────
function StatCounter({ target, suffix = '', label }) {
  const [ref, value] = useAnimatedCounter(target, 1800)
  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="font-display font-black text-3xl text-white leading-none mb-1">
        <span>{value}</span>{suffix}
      </div>
      <div className="text-white/45 text-xs font-medium">{label}</div>
    </div>
  )
}

// ── Hero ───────────────────────────────────────────────────
export default function Hero() {
  const phrases = ['Prescrições Digitais', 'Check-in por GPS', 'Bipagem EAN-13', 'Relatórios Automáticos']
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false)
      setTimeout(() => { setPhraseIdx(i => (i + 1) % phrases.length); setShow(true) }, 350)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const checks = ['Sem instalação complicada', 'Acesso web + app mobile', 'Suporte incluído em todos os planos']

  return (
    <section id="inicio" className="relative min-h-screen bg-dark-grad flex items-center overflow-hidden pt-[70px]">
      {/* Mesh background */}
      <div className="absolute inset-0 bg-hero-mesh pointer-events-none" />
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(43,191,179,1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,191,179,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      {/* Orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-teal/8 rounded-full blur-[100px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-green/6 rounded-full blur-[80px] animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

      <div className="container-max w-full py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/25 text-teal-light text-xs font-bold px-4 py-2 rounded-full mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse-glow" />
              Sistema SaaS para Homecare
            </div>

            <h1 className="font-display font-black text-5xl lg:text-6xl text-white leading-[1.08] mb-4 animate-slide-up">
              Gerencie seu<br />
              <span className="bg-aura-grad bg-clip-text text-transparent">Homecare</span><br />
              com precisão
            </h1>

            {/* Rotating phrase */}
            <div className="h-10 mb-6 flex items-center">
              <span className="text-white/50 text-lg font-body mr-2">→</span>
              <span className={`text-teal-light font-display font-bold text-lg transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                {phrases[phraseIdx]}
              </span>
            </div>

            <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg animate-slide-up" style={{ animationDelay: '100ms' }}>
              Chega de planilhas e papéis. O Aura digitaliza toda a operação do seu homecare — prescrições, evoluções, agenda e estoque em um único sistema.
            </p>

            {/* Trust checks */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
              {checks.map(c => (
                <div key={c} className="flex items-center gap-2 text-white/60 text-sm">
                  <CheckCircle size={14} className="text-teal flex-shrink-0" /> {c}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <Link to="/contato"
                className="inline-flex items-center gap-2 bg-aura-grad text-white font-display font-bold text-base px-8 py-4 rounded-xl shadow-teal hover:shadow-teal-lg hover:-translate-y-1 transition-all">
                🚀 Conheça o Sistema <ChevronRight size={16} />
              </Link>
              <a href="#funcionalidades"
                className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-white font-display font-semibold text-base px-7 py-4 rounded-xl hover:bg-white/12 transition-all">
                <Play size={14} className="text-teal" /> Ver demo
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/8 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <StatCounter target={87} suffix="%" label="Redução de tempo op." />
              <StatCounter target={60} suffix="%" label="Menos custo admin." />
              <StatCounter target={100} suffix="%" label="Digital e seguro" />
            </div>
          </div>

          {/* RIGHT — mockup */}
          <div className="hidden lg:flex justify-center items-center animate-fade-in" style={{ animationDelay: '500ms' }}>
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L1440 60L1440 20C1200 60 900 0 720 20C540 40 240 0 0 20Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
