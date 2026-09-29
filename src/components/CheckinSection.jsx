import React, { useEffect, useState } from 'react'
import { MapPin, Home, LogIn, LogOut, NotebookPen, Wallet, CheckCircle2, AlertTriangle, ChevronRight, Barcode, ShieldCheck } from 'lucide-react'
import { Reveal } from './ui'
import { useDemoChooser } from '../context/DemoChooser'
import { useScrollReveal } from '../hooks/useScrollReveal'

const STEPS = [
  { icon: LogIn,       title: 'Check-in ao chegar',   desc: 'Próximo à residência, o profissional faz o check-in e o sistema registra a distância até o endereço do paciente.' },
  { icon: NotebookPen, title: 'Atendimento',          desc: 'A evolução e os demais registros ficam no prontuário, dentro dos módulos que ele tem permissão.' },
  { icon: LogOut,      title: 'Check-out ao sair',    desc: 'No fim da visita, o check-out registra novamente a distância em metros ou quilômetros.' },
  { icon: Wallet,      title: 'Faturamento conferido', desc: 'O financeiro sabe se o profissional realmente foi e esteve no local. Divergências ficam evidentes.' },
]

// Mapa: o profissional se aproxima da casa e o check-in é registrado
function MapMockup() {
  const [arrived, setArrived] = useState(false)
  const [ref, visible] = useScrollReveal(0.3)
  useEffect(() => {
    if (!visible) return
    const t = setInterval(() => setArrived(a => !a), 3400)
    const first = setTimeout(() => setArrived(true), 600)
    return () => { clearInterval(t); clearTimeout(first) }
  }, [visible])

  const pin = arrived ? { left: '58%', top: '44%' } : { left: '86%', top: '22%' }

  return (
    <div ref={ref} className="relative bg-navy-3/60 rounded-3xl border border-teal/20 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
      <div className="relative h-[300px] sm:h-[340px]">
        {/* Ruas */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 340" preserveAspectRatio="none">
          <g stroke="#2BBFB3" strokeOpacity="0.08">
            {Array.from({ length: 12 }, (_, i) => <line key={`h${i}`} x1="0" x2="400" y1={i * 30} y2={i * 30} />)}
            {Array.from({ length: 14 }, (_, i) => <line key={`v${i}`} y1="0" y2="340" x1={i * 30} x2={i * 30} />)}
          </g>
          <path d="M0 200 C120 180 260 220 400 150" stroke="#2BBFB3" strokeOpacity="0.28" strokeWidth="14" fill="none" />
          <path d="M210 0 C200 120 230 230 190 340" stroke="#2BBFB3" strokeOpacity="0.18" strokeWidth="10" fill="none" />
          <path d="M320 0 C330 80 300 140 400 180" stroke="#2BBFB3" strokeOpacity="0.14" strokeWidth="8" fill="none" />
        </svg>

        {/* Raio aceitável em volta da casa */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
          <div className="w-full h-full rounded-full border border-dashed border-teal/40 bg-teal/[0.06] animate-spin-slow" />
        </div>

        {/* Casa do paciente */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-teal">
          <div className="radar relative w-12 h-12 rounded-2xl bg-white text-navy flex items-center justify-center shadow-xl">
            <Home size={22} />
          </div>
        </div>

        {/* Linha de distância */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[[58, 44, arrived], [86, 22, !arrived]].map(([x, y, show]) => (
            <line key={x} x1="50" y1="50" x2={x} y2={y} stroke="#4DD9CE" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
              className="draw-line transition-opacity" style={{ opacity: show ? 1 : 0, transitionDuration: show ? '500ms' : '150ms', transitionDelay: show ? '1300ms' : '0ms' }} />
          ))}
        </svg>

        {/* Profissional */}
        <div className="absolute -translate-x-1/2 -translate-y-full transition-all duration-[1400ms] ease-out-expo" style={pin}>
          <div className="relative flex flex-col items-center">
            <div className={`mb-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap shadow-lg transition-colors duration-500 ${arrived ? 'bg-green text-white' : 'bg-white text-navy'}`}>
              {arrived ? 'Check-in · 42 m' : 'A caminho · 1,8 km'}
            </div>
            <div className="w-9 h-9 rounded-full bg-aura-grad flex items-center justify-center text-white shadow-teal ring-4 ring-navy">
              <MapPin size={16} />
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-navy/85 backdrop-blur rounded-xl px-3 py-2 border border-white/10">
          <div className="text-white text-[11px] font-bold">Visita · Helena Farias</div>
          <div className="text-white/40 text-[10px]">Enf. Carla Souza</div>
        </div>
      </div>

      {/* Registro */}
      <div className="border-t border-white/5 bg-navy/70 p-4 sm:p-5 flex flex-col gap-2">
        {[
          { t: '08:02', l: 'Check-in', d: '42 m',   ok: true },
          { t: '09:15', l: 'Check-out', d: '38 m',  ok: true },
          { t: '14:30', l: 'Check-in', d: '2,4 km', ok: false },
        ].map((r, i) => (
          <div key={i} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border text-[12px] ${
            r.ok ? 'bg-white/[0.03] border-white/5' : 'bg-amber-400/10 border-amber-400/25'
          }`}>
            <span className="text-white/40 font-mono text-[11px]">{r.t}</span>
            <span className="text-white/80 font-semibold">{r.l}</span>
            <span className="text-white/50">· {r.d} da residência</span>
            <span className="ml-auto flex items-center gap-1 font-bold text-[11px] whitespace-nowrap">
              {r.ok
                ? <><CheckCircle2 size={13} className="text-green" /><span className="text-green hidden sm:inline">OK</span></>
                : <><AlertTriangle size={13} className="text-amber-400" /><span className="text-amber-400 hidden sm:inline">Divergência</span></>}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}


// Leitura do código de barras com linha de varredura
function BarcodeScan() {
  return (
    <div className="relative w-44 h-24 mx-auto px-3 pt-2">
      <div className="flex items-end justify-center gap-[3px] h-16">
        {[3,1,4,1,5,2,3,1,2,4,1,3,5,1,2,3,1,4,2,1,3,5,2].map((w, i) => (
          <div key={i} className="bg-white/85 rounded-[1px] h-full" style={{ width: `${w}px` }} />
        ))}
      </div>
      <div className="text-center text-white/50 text-[10px] font-mono mt-1 tracking-widest">7 891234 567895</div>
      <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal to-transparent shadow-[0_0_12px_#2BBFB3] animate-scan" />
      {['top-0 left-0 border-t-2 border-l-2', 'top-0 right-0 border-t-2 border-r-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map(c => (
        <div key={c} className={`absolute w-4 h-4 border-teal rounded-[3px] ${c}`} />
      ))}
    </div>
  )
}

// Assinatura sendo desenhada
function SignatureDraw() {
  const [ref, visible] = useScrollReveal(0.4)
  return (
    <div ref={ref} className="w-full max-w-[220px] mx-auto">
      <svg className="w-full h-16" viewBox="0 0 160 40">
        <defs>
          <linearGradient id="sigGrad" x1="0%" x2="100%"><stop offset="0%" stopColor="#2BBFB3" /><stop offset="100%" stopColor="#52C48A" /></linearGradient>
        </defs>
        <path d="M10 30 C30 10, 50 35, 70 20 C90 5, 110 30, 130 15 C140 10, 148 18, 152 20" stroke="url(#sigGrad)" strokeWidth="2.5"
          fill="none" strokeLinecap="round" pathLength="1"
          style={{ strokeDasharray: 1, strokeDashoffset: visible ? 0 : 1, transition: 'stroke-dashoffset 2.2s cubic-bezier(.65,0,.35,1) .3s' }} />
      </svg>
      <div className="h-px bg-gradient-to-r from-teal/50 to-transparent" />
      <div className="text-white/30 text-[9px] font-mono mt-1.5">SHA-256 · 2048-bit RSA</div>
    </div>
  )
}

const TECH = [
  {
    icon: Barcode, tag: 'Bipagem EAN-13', title: 'Medicamento certo, no paciente certo',
    desc: 'Na administração domiciliar, o profissional bipa o código de barras e o sistema confere o medicamento.',
    visual: <BarcodeScan />, badge: ['✓ Medicamento verificado', 'Metformina 850 mg · Lote 2024A'], color: 'green',
  },
  {
    icon: ShieldCheck, tag: 'Assinatura Digital', title: 'Validade jurídica nos documentos',
    desc: 'Assinatura por imagem com QR code no dia a dia, ou certificado ICP-Brasil A1 com validade jurídica plena (Lei 14.063/2020).',
    visual: <SignatureDraw />, badge: ['✓ Certificado ICP-Brasil', 'Documento assinado e protegido'], color: 'teal',
  },
]

export default function CheckinSection() {
  const { open: openChooser } = useDemoChooser()
  return (
    <section id="presenca" className="relative overflow-hidden bg-[#08131f]">
      <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-teal/10 rounded-full blur-[130px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-96 h-96 bg-green/10 rounded-full blur-[110px] animate-float pointer-events-none" style={{ animationDelay: '3s' }} />
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(43,191,179,1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,191,179,1) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />

      <div className="container-max relative z-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <Reveal><div className="section-tag-dark"><MapPin size={13} /> Check-in e Check-out</div></Reveal>
            <Reveal delay={80}>
              <h2 className="font-display font-black text-[2.1rem] sm:text-4xl lg:text-[2.8rem] text-white leading-[1.1] mt-5">
                Presença comprovada.<br />
                <span className="gradient-text">Faturamento sem dúvidas.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-white/60 text-lg leading-relaxed mt-6 max-w-xl">
                Cada visita tem check-in e check-out com a distância registrada até a residência do paciente.
                Se alguém registra o check-in e não vai, você fica sabendo.
              </p>
            </Reveal>

            <ol className="relative mt-10 flex flex-col gap-6 before:absolute before:left-[21px] before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-teal/60 before:via-teal/20 before:to-transparent">
              {STEPS.map(({ icon: Icon, title, desc }, i) => (
                <Reveal as="li" key={title} variant="left" delay={200 + i * 110} className="relative flex gap-5 group">
                  <div className="relative z-10 w-11 h-11 rounded-xl bg-navy border border-teal/30 text-teal flex items-center justify-center flex-shrink-0 group-hover:bg-aura-grad group-hover:text-white group-hover:border-transparent group-hover:scale-110 transition-all duration-300">
                    <Icon size={18} />
                  </div>
                  <div className="pt-1">
                    <div className="font-display font-bold text-white">{title}</div>
                    <p className="text-white/50 text-sm leading-relaxed mt-1">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={650}>
              <button onClick={openChooser} className="btn-primary mt-10 group">
                Ver funcionando <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={150}>
            <MapMockup />
          </Reveal>
        </div>

        {/* Bipagem + assinatura digital */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mt-24 lg:mt-32">
          {TECH.map(({ icon: Icon, tag, title, desc, visual, badge, color }, i) => (
            <Reveal key={tag} delay={i * 120}>
              <div className="h-full grid sm:grid-cols-[1fr_1.1fr] gap-6 items-center p-6 lg:p-8 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-teal/30 hover:bg-white/[0.06] transition-all duration-300 group">
                <div className="bg-navy/60 rounded-2xl border border-white/5 p-4 flex flex-col gap-4">
                  {visual}
                  <div className={color === 'green' ? 'p-2.5 rounded-xl bg-green/10 border border-green/20' : 'p-2.5 rounded-xl bg-teal/10 border border-teal/20'}>
                    <div className={`text-[11px] font-bold ${color === 'green' ? 'text-green' : 'text-teal'}`}>{badge[0]}</div>
                    <div className="text-white/40 text-[10px] mt-0.5">{badge[1]}</div>
                  </div>
                </div>
                <div>
                  <div className="text-teal text-xs font-bold uppercase tracking-widest flex items-center gap-2"><Icon size={14} /> {tag}</div>
                  <h3 className="font-display font-bold text-white text-xl mt-3 leading-snug">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mt-2">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
