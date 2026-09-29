import React, { useState, useEffect } from 'react'
import { ChevronRight, MonitorPlay, CheckCircle2, MapPin, FileSignature, ShieldCheck } from 'lucide-react'
import { useAnimatedCounter, useTilt } from '../hooks/useScrollReveal'
import { useDemoChooser } from '../context/DemoChooser'
import { DEMO_URL } from '../config'

// ── Mockup do painel ───────────────────────────────────────
function DashboardMockup() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % 3), 2400)
    return () => clearInterval(t)
  }, [])

  const visits = [
    { sigla: 'MO', name: 'Maria Oliveira', info: 'Check-out · 38 m', status: 'concluído', color: '#52C48A' },
    { sigla: 'HF', name: 'Helena Farias',  info: 'Check-in · 42 m',  status: 'em visita', color: '#2BBFB3' },
    { sigla: 'RB', name: 'Rui Barbosa',    info: 'Agendado · 14h',   status: 'agendado',  color: '#f59e0b' },
  ]
  const nav = ['Pacientes', 'Agenda', 'Estoque', 'Orçamentos', 'Indicadores']

  return (
    <div className="bg-navy-2 rounded-2xl border border-teal/20 shadow-[0_40px_100px_rgba(0,0,0,0.55)] overflow-hidden w-full max-w-[460px]">
      <div className="flex items-center gap-2 px-4 py-3 bg-navy border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-4 bg-white/5 rounded-md px-3 py-1 text-[11px] text-white/30 text-center">aura · painel da operação</div>
      </div>
      <div className="flex h-[300px]">
        <div className="w-[108px] bg-navy/60 border-r border-white/5 p-2.5 flex flex-col gap-1">
          {nav.map((n, i) => (
            <div key={n} className={`text-[10px] font-semibold px-2.5 py-2 rounded-lg ${i === 0 ? 'bg-teal/15 text-teal' : 'text-white/30'}`}>{n}</div>
          ))}
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <div className="text-[11px] text-white/40">Bom dia, Dra. Sofia</div>
          <div className="font-display font-bold text-white text-sm mb-3">Visitas de hoje</div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[['14', 'Agendadas', '#2BBFB3'], ['9', 'Check-in', '#52C48A'], ['1', 'Divergência', '#f59e0b']].map(([v, l, c]) => (
              <div key={l} className="bg-white/5 rounded-xl p-2 border border-white/5">
                <div className="font-display font-black text-lg leading-none" style={{ color: c }}>{v}</div>
                <div className="text-white/35 text-[9px] mt-1">{l}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            {visits.map((v, i) => (
              <div key={v.sigla} className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all duration-500 ${
                active === i ? 'bg-white/[0.07] border-teal/25 translate-x-1' : 'border-transparent'
              }`}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{ background: `${v.color}26`, color: v.color }}>{v.sigla}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-[11px] font-semibold truncate">{v.name}</div>
                  <div className="text-white/35 text-[9px] flex items-center gap-1"><MapPin size={8} /> {v.info}</div>
                </div>
                <div className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ color: v.color, background: `${v.color}26` }}>{v.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FloatingBadge({ icon: Icon, title, sub, className, delay, color = '#2BBFB3' }) {
  return (
    <div className={`absolute bg-white rounded-2xl shadow-card-lg px-3.5 py-3 flex items-center gap-3 animate-float ${className}`}
      style={{ animationDelay: delay }}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}1f`, color }}>
        <Icon size={17} />
      </div>
      <div>
        <div className="text-navy font-display font-bold text-xs whitespace-nowrap">{title}</div>
        <div className="text-gray-400 text-[10px] whitespace-nowrap">{sub}</div>
      </div>
    </div>
  )
}

function StatCounter({ target, prefix = '', suffix = '', label }) {
  const [ref, value] = useAnimatedCounter(target, 1600)
  return (
    <div ref={ref}>
      <div className="font-display font-black text-2xl sm:text-3xl text-white leading-none mb-1.5">
        {prefix}{value}{suffix}
      </div>
      <div className="text-white/45 text-xs font-medium leading-snug">{label}</div>
    </div>
  )
}

// Título com palavras entrando em sequência
function Words({ text, start = 0, step = 70, className = '' }) {
  return text.split(' ').map((w, i) => (
    <React.Fragment key={i}>
      <span className="word-rise"><span className={className} style={{ '--d': `${start + i * step}ms` }}>{w}</span></span>{' '}
    </React.Fragment>
  ))
}

export default function Hero() {
  const phrases = ['Prontuário eletrônico', 'Check-in e check-out', 'Bipagem EAN-13', 'Assinatura digital', 'Portal do responsável']
  const [phraseIdx, setPhraseIdx] = useState(0)
  const { open: openChooser } = useDemoChooser()
  const tilt = useTilt(6)

  useEffect(() => {
    const t = setInterval(() => setPhraseIdx(i => (i + 1) % phrases.length), 2600)
    return () => clearInterval(t)
  }, [phrases.length])

  const checks = ['Tudo em um só sistema', 'Acesso pelo navegador', 'Demo aberta para explorar']

  return (
    <section id="inicio" className="relative min-h-[100svh] bg-dark-grad flex items-center overflow-hidden pt-[76px] noise">
      <div className="absolute inset-0 bg-hero-mesh pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(43,191,179,1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,191,179,1) 1px, transparent 1px)', backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%)' }} />
      <div className="absolute top-24 right-[8%] w-[28rem] h-[28rem] bg-teal/10 rounded-full blur-[110px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-10 left-[5%] w-80 h-80 bg-green/10 rounded-full blur-[90px] animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

      <div className="container-max w-full pt-12 pb-28 lg:pt-16 lg:pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2.5 bg-teal/10 border border-teal/25 text-teal-light text-xs font-bold px-4 py-2 rounded-full mb-7 animate-fade-up">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-teal animate-ping" />
                <span className="relative w-2 h-2 rounded-full bg-teal" />
              </span>
              Sistema de gestão para Home Care
            </div>

            <h1 className="font-display font-black text-[2.6rem] sm:text-5xl lg:text-[3.6rem] text-white leading-[1.06] tracking-tight">
              <Words text="Gerencie seu" start={100} /><br />
              <Words text="Home Care" start={240} className="gradient-text" /><br />
              <Words text="com precisão" start={380} />
            </h1>

            <div className="h-9 mt-5 mb-5 flex items-center gap-2 overflow-hidden animate-fade-up" style={{ animationDelay: '500ms' }}>
              <span className="w-6 h-px bg-teal/60" />
              <span key={phraseIdx} className="text-teal-light font-display font-bold text-lg animate-swap-in">
                {phrases[phraseIdx]}
              </span>
            </div>

            <p className="text-white/60 text-lg leading-relaxed max-w-xl animate-fade-up" style={{ animationDelay: '600ms' }}>
              Prontuário do paciente, check-in e check-out geolocalizado, estoque, orçamentos,
              indicadores e o portal onde o responsável assina os documentos — tudo em um único sistema.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2.5 mt-7 animate-fade-up" style={{ animationDelay: '700ms' }}>
              {checks.map(c => (
                <div key={c} className="flex items-center gap-2 text-white/65 text-sm">
                  <CheckCircle2 size={15} className="text-teal flex-shrink-0" /> {c}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3.5 mt-10 animate-fade-up" style={{ animationDelay: '800ms' }}>
              <button onClick={openChooser} className="btn-primary text-base px-8 py-4 group">
                Conheça o Sistema <ChevronRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href={DEMO_URL} target="_blank" rel="noreferrer" className="btn-glass text-base px-7 py-4 group">
                <MonitorPlay size={17} className="text-teal group-hover:scale-110 transition-transform" /> Explorar a demo
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10 max-w-lg animate-fade-up" style={{ animationDelay: '950ms' }}>
              <StatCounter target={87}  suffix="%" label="redução de tempo operacional" />
              <StatCounter target={60}  suffix="%" label="menos custo administrativo" />
              <StatCounter target={100} suffix="%" label="digital e seguro" />
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center animate-fade-up" style={{ animationDelay: '600ms' }}
            onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}>
            <div ref={tilt.ref} className="relative transition-transform duration-300 ease-out [transform-style:preserve-3d]">
              <DashboardMockup />
              <FloatingBadge icon={MapPin} title="Check-in registrado" sub="42 m da residência" className="-top-7 -left-10" delay="0.4s" />
              <FloatingBadge icon={FileSignature} title="Plano terapêutico assinado" sub="pelo responsável · portal" className="-bottom-12 -left-14" delay="1.6s" color="#52C48A" />
              <FloatingBadge icon={ShieldCheck} title="Acesso liberado" sub="Evolução · Farmácia" className="-bottom-6 -right-10" delay="2.4s" color="#8b5cf6" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 leading-[0]">
        <svg viewBox="0 0 1440 70" className="w-full h-[50px] sm:h-[70px]" fill="none" preserveAspectRatio="none">
          <path d="M0 70L1440 70L1440 24C1200 70 900 0 720 24C540 48 240 0 0 24Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
