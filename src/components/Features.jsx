import React, { useEffect, useState } from 'react'
import {
  NotebookPen, Pill, FileSignature, ShieldCheck, LayoutDashboard, Check, MessageCircle, Mail, ChevronRight,
} from 'lucide-react'
import { Reveal, SectionHeader, SpotlightCard } from './ui'
import { GESTAO, PRONTUARIO } from '../data/modules'
import { useDemoChooser } from '../context/DemoChooser'
import { useScrollReveal } from '../hooks/useScrollReveal'

// Alterna um índice em intervalo fixo (usado pelas animações dos mockups)
function useCycle(length, ms) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % length), ms)
    return () => clearInterval(t)
  }, [length, ms])
  return i
}

function Frame({ title, sub, children, right }) {
  return (
    <div className="bg-navy rounded-2xl border border-teal/20 overflow-hidden shadow-[0_30px_80px_rgba(13,27,42,0.35)]">
      <div className="flex items-center gap-3 px-5 py-3.5 bg-navy-2 border-b border-white/5">
        <div className="min-w-0">
          <div className="text-white text-xs font-bold truncate">{title}</div>
          {sub && <div className="text-white/35 text-[10px] truncate">{sub}</div>}
        </div>
        <div className="ml-auto">{right}</div>
      </div>
      {children}
    </div>
  )
}

// ── Mockup: Prontuário ───────────────────────────────────
function ProntuarioMockup() {
  const tabs = ['Evolução', 'Farmácia', 'Plano terapêutico', 'Avaliação inicial', 'ABEMID', 'NEAD', 'PAD', 'Complexidade', 'Responsáveis']
  const view = useCycle(2, 3200) // 0 = Evolução, 1 = Farmácia
  const meds = [['Losartana 50 mg', '1x ao dia · manhã'], ['Metformina 850 mg', '2x ao dia'], ['Omeprazol 20 mg', 'Em jejum'], ['Dipirona 500 mg', 'Se dor']]

  return (
    <Frame title="Helena Farias" sub="Prontuário #00412"
      right={<div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-[10px] font-bold text-teal">HF</div>}>
      <div className="flex min-h-[290px]">
        <div className="w-[128px] border-r border-white/5 p-2.5 flex flex-col gap-0.5">
          {tabs.map((t, i) => (
            <div key={t} className={`text-[10px] font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-500 ${
              i === view ? 'bg-teal/15 text-teal translate-x-0.5' : 'text-white/35'
            }`}>{t}</div>
          ))}
        </div>
        <div className="flex-1 p-4 min-w-0">
          {view === 0 ? (
            <div key="evo" className="animate-swap-in">
              <div className="text-white/35 text-[9px] font-bold uppercase tracking-widest mb-2">Nova evolução</div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-white/65 text-[11px] leading-relaxed">
                Paciente estável, consciente e orientada. Curativo realizado em região sacral, sem sinais flogísticos.
                Medicação administrada conforme prescrição<span className="inline-block w-[2px] h-3 bg-teal ml-0.5 align-middle animate-pulse" />
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-white/35 text-[10px]">Enf. Carla Souza · 08:14</div>
                <div className="text-[10px] font-bold text-teal bg-teal/15 border border-teal/25 rounded-lg px-3 py-1.5">Salvar evolução</div>
              </div>
            </div>
          ) : (
            <div key="farm" className="animate-swap-in">
              <div className="text-white/35 text-[9px] font-bold uppercase tracking-widest mb-2">Medicamentos em uso</div>
              <div className="flex flex-col gap-1.5">
                {meds.map(([n, p], i) => (
                  <div key={n} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/5 animate-swap-in"
                    style={{ animationDelay: `${i * 70}ms` }}>
                    <div className="w-6 h-6 rounded-lg bg-green/15 text-green flex items-center justify-center"><Pill size={12} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white/80 text-[11px] font-semibold truncate">{n}</div>
                      <div className="text-white/35 text-[9px]">{p}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Frame>
  )
}

// ── Mockup: Portal do responsável ────────────────────────
function PortalMockup() {
  const signed = useCycle(2, 2600) === 1
  const docs = [
    { name: 'Plano terapêutico', done: signed },
    { name: 'Termo de consentimento', done: true },
    { name: 'PAD — Plano de Atenção Domiciliar', done: true },
  ]
  return (
    <Frame title="Portal do Responsável" sub="Carlos Farias · responsável por Helena Farias"
      right={<span className="text-[9px] font-bold text-green bg-green/15 px-2 py-0.5 rounded-full">online</span>}>
      <div className="p-5 min-h-[290px] flex flex-col">
        <div className="text-white/35 text-[9px] font-bold uppercase tracking-widest mb-3">Documentos para assinar</div>
        <div className="flex flex-col gap-2">
          {docs.map(d => (
            <div key={d.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/5">
              <FileSignature size={15} className="text-teal flex-shrink-0" />
              <div className="flex-1 text-white/75 text-[11px] font-semibold truncate">{d.name}</div>
              {d.done ? (
                <span key="ok" className="animate-swap-in text-[10px] font-bold text-green bg-green/15 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Check size={11} /> Assinado
                </span>
              ) : (
                <span key="sign" className="text-[10px] font-bold text-white bg-aura-grad px-3 py-1 rounded-lg shadow-teal animate-pulse-glow">Assinar</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-auto pt-5 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[10px] text-white/70">
            <MessageCircle size={13} className="text-[#25D366]" /> Login enviado por WhatsApp
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-teal/10 border border-teal/20 text-[10px] text-white/70">
            <Mail size={13} className="text-teal" /> ou por e-mail
          </div>
        </div>
      </div>
    </Frame>
  )
}

// ── Mockup: Permissões em duas camadas ───────────────────
function Toggle({ on }) {
  return (
    <span className={`relative w-7 h-4 rounded-full transition-colors duration-500 flex-shrink-0 ${on ? 'bg-teal' : 'bg-white/15'}`}>
      <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all duration-500 ease-out-expo ${on ? 'left-3.5' : 'left-0.5'}`} />
    </span>
  )
}

function PermissoesMockup() {
  const step = useCycle(4, 1500)
  const sistema = [['Pacientes', true], ['Estoque', step >= 2], ['Orçamentos', false], ['Indicadores', true]]
  const prontuario = [['Evolução', true], ['Farmácia', true], ['Plano terapêutico', step >= 1], ['ABEMID / NEAD', step === 3]]
  const Col = ({ title, items }) => (
    <div className="flex-1 bg-white/[0.04] border border-white/5 rounded-xl p-3">
      <div className="text-teal text-[9px] font-bold uppercase tracking-widest mb-2.5">{title}</div>
      <div className="flex flex-col gap-2">
        {items.map(([n, on]) => (
          <div key={n} className="flex items-center justify-between gap-2">
            <span className={`text-[10px] truncate transition-colors duration-500 ${on ? 'text-white/80' : 'text-white/35'}`}>{n}</span>
            <Toggle on={on} />
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <Frame title="Enf. Carla Souza" sub="Permissões do profissional"
      right={<ShieldCheck size={16} className="text-teal" />}>
      <div className="p-5 min-h-[290px]">
        <div className="flex flex-col sm:flex-row gap-3">
          <Col title="1 · No sistema" items={sistema} />
          <Col title="2 · No prontuário" items={prontuario} />
        </div>
        <div className="mt-4 flex items-center gap-2.5 p-3 rounded-xl bg-teal/10 border border-teal/20">
          <div className="w-7 h-7 rounded-full bg-teal/20 text-teal text-[10px] font-bold flex items-center justify-center">HF</div>
          <div className="text-[10px] text-white/70 leading-snug">
            Vinculada à paciente <b className="text-white">Helena Farias</b> — acessa só os módulos liberados.
          </div>
        </div>
      </div>
    </Frame>
  )
}

// ── Mockup: Gestão da operação ───────────────────────────
function GestaoMockup() {
  const [ref, visible] = useScrollReveal(0.2)
  const bars = [45, 62, 54, 78, 70, 88]
  return (
    <Frame title="Painel da operação" sub="Indicadores · Estoque · Orçamentos"
      right={<LayoutDashboard size={16} className="text-teal" />}>
      <div ref={ref} className="p-5 min-h-[290px] grid grid-cols-2 gap-3">
        <div className="col-span-2 bg-white/[0.04] border border-white/5 rounded-xl p-3">
          <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-2">Atendimentos por mês</div>
          <div className="flex items-end gap-1.5 h-16">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md transition-all duration-1000 ease-out-expo"
                style={{ height: visible ? `${h}%` : '4%', transitionDelay: `${i * 90}ms`, background: i === bars.length - 1 ? 'linear-gradient(180deg,#2BBFB3,#52C48A)' : 'rgba(43,191,179,0.25)' }} />
            ))}
          </div>
        </div>
        <div className="bg-white/[0.04] border border-white/5 rounded-xl p-3">
          <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-2">Estoque</div>
          {[['Luvas de procedimento', '320 un'], ['Gaze estéril', '140 pct'], ['Seringa 10 ml', '85 un']].map(([n, q]) => (
            <div key={n} className="flex justify-between gap-2 text-[10px] py-1 border-b border-white/5 last:border-0">
              <span className="text-white/60 truncate">{n}</span><span className="text-teal font-bold whitespace-nowrap">{q}</span>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.04] border border-white/5 rounded-xl p-3">
          <div className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-2">Orçamentos</div>
          {[['#0231', 'Aprovado', '#52C48A'], ['#0232', 'Em análise', '#f59e0b'], ['#0233', 'Enviado', '#2BBFB3']].map(([n, s, c]) => (
            <div key={n} className="flex justify-between gap-2 text-[10px] py-1 border-b border-white/5 last:border-0">
              <span className="text-white/60">{n}</span><span className="font-bold" style={{ color: c }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}

const SHOWCASE = [
  {
    icon: LayoutDashboard,
    label: 'Estoque e financeiro',
    title: 'Estoque, orçamento e faturamento conectados',
    desc: 'Materiais, itens, equipamentos e mobília com saldo real. Orçamentos por operadora, farmácia ligada ao consumo e faturamento conferido pelas visitas realizadas.',
    bullets: ['Estoque de materiais e equipamentos', 'Farmácia ligada ao faturamento', 'Orçamentos por operadora', 'Relatórios e indicadores'],
    Mockup: GestaoMockup,
  },
  {
    icon: NotebookPen,
    label: 'Prontuário do paciente',
    title: 'Todo o cuidado do paciente em um prontuário',
    desc: 'Evolução, plano terapêutico, avaliação inicial e as tabelas ABEMID, NEAD, PAD e complexidade. Na aba Farmácia você vê na hora quais medicamentos o paciente está utilizando.',
    bullets: ['Registro de evolução', 'Farmácia: medicamentos em uso', 'ABEMID, NEAD, PAD e complexidade', 'Plano terapêutico e avaliação inicial'],
    Mockup: ProntuarioMockup,
  },
  {
    icon: FileSignature,
    label: 'Portal do responsável',
    title: 'O responsável assina tudo pelo portal',
    desc: 'Cadastre os responsáveis pelo paciente e envie o login por e-mail ou WhatsApp. Eles acessam o portal, veem os documentos pendentes e assinam pelo próprio sistema — sem papel e sem deslocamento.',
    bullets: ['Login enviado por e-mail ou WhatsApp', 'Documentos pendentes em um só lugar', 'Assinatura pelo próprio sistema', 'Acompanhamento pelo responsável'],
    Mockup: PortalMockup,
  },
  {
    icon: ShieldCheck,
    label: 'Permissões',
    title: 'Controle de acesso em duas camadas',
    desc: 'Primeiro, defina quais módulos do sistema cada profissional pode usar. Depois, vincule o profissional ao paciente e escolha quais módulos do prontuário ele acessa.',
    bullets: ['Permissões por módulo do sistema', 'Vínculo profissional × paciente', 'Permissões dentro do prontuário', 'Cada um vê só o que precisa'],
    Mockup: PermissoesMockup,
  },
]

const ROTATE_MS = 8000

function Showcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [ref, visible] = useScrollReveal(0.2)
  const { open: openChooser } = useDemoChooser()

  useEffect(() => {
    if (paused || !visible) return
    const t = setTimeout(() => setActive(a => (a + 1) % SHOWCASE.length), ROTATE_MS)
    return () => clearTimeout(t)
  }, [active, paused, visible])

  const item = SHOWCASE[active]
  const { Mockup } = item

  return (
    <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Abas */}
      <Reveal className="flex lg:justify-center gap-2 overflow-x-auto py-3 -my-3 -mx-5 px-5 sm:mx-0 sm:px-0 [scrollbar-width:none]" role="tablist">
        {SHOWCASE.map(({ icon: Icon, label }, i) => (
          <button key={label} role="tab" aria-selected={i === active} onClick={() => setActive(i)}
            className={`relative flex-shrink-0 flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl text-sm font-display font-semibold overflow-hidden transition-all duration-300 ${
              i === active ? 'bg-navy text-white shadow-card-lg' : 'bg-gray-50 text-gray-500 hover:text-navy hover:bg-gray-100'
            }`}>
            <Icon size={16} className={i === active ? 'text-teal' : ''} /> {label}
            {i === active && (
              <span key={`${active}-${paused}`} className="absolute left-0 bottom-0 h-[3px] w-full bg-aura-grad origin-left animate-tab-progress"
                style={{ animationDuration: `${ROTATE_MS}ms`, animationPlayState: paused || !visible ? 'paused' : 'running' }} />
            )}
          </button>
        ))}
      </Reveal>

      {/* Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-12 lg:mt-16">
        <div key={active} className="animate-swap-in">
          <h3 className="font-display font-black text-3xl lg:text-[2.5rem] text-navy leading-[1.15]">{item.title}</h3>
          <p className="text-gray-500 text-lg leading-relaxed mt-5">{item.desc}</p>
          <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-3.5 mt-8">
            {item.bullets.map((b, i) => (
              <li key={b} className="flex items-start gap-2.5 text-[15px] text-gray-600 font-medium animate-swap-in" style={{ animationDelay: `${120 + i * 60}ms` }}>
                <span className="mt-0.5 w-5 h-5 rounded-full bg-teal/15 text-teal-dark flex items-center justify-center flex-shrink-0"><Check size={12} strokeWidth={3} /></span>
                {b}
              </li>
            ))}
          </ul>
          <button onClick={openChooser} className="btn-primary mt-10 group">
            Ver no sistema <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div key={`m-${active}`} className="animate-swap-in" style={{ animationDelay: '100ms' }}>
          <Mockup />
        </div>
      </div>
    </div>
  )
}

function ModulesGrid() {
  const [tab, setTab] = useState('gestao')
  const list = tab === 'gestao' ? GESTAO : PRONTUARIO
  const tabs = [['gestao', 'Gestão da empresa', GESTAO.length], ['prontuario', 'Prontuário do paciente', PRONTUARIO.length]]

  return (
    <div className="mt-28 lg:mt-36">
      <Reveal className="text-center">
        <h3 className="font-display font-black text-2xl sm:text-3xl text-navy">Todos os módulos</h3>
        <p className="text-gray-500 mt-3">Duas frentes que se conectam: a gestão da empresa e o prontuário de cada paciente.</p>
      </Reveal>
      <Reveal delay={100} className="flex justify-center mt-8">
        <div className="relative inline-flex bg-gray-100 rounded-2xl p-1.5">
          <span className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-xl bg-white shadow-card transition-transform duration-500 ease-out-expo ${tab === 'prontuario' ? 'translate-x-full' : ''}`} />
          {tabs.map(([k, l, n]) => (
            <button key={k} onClick={() => setTab(k)}
              className={`relative z-10 w-40 sm:w-52 py-2.5 rounded-xl text-xs sm:text-sm font-display font-semibold transition-colors ${tab === k ? 'text-navy' : 'text-gray-400 hover:text-gray-600'}`}>
              {l} <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${tab === k ? 'bg-teal/15 text-teal-dark' : 'bg-gray-200 text-gray-400'}`}>{n}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div key={tab} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-10">
        {list.map(({ icon: Icon, title, desc }, i) => (
          <SpotlightCard key={title}
            className="p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl hover:border-teal/30 hover:-translate-y-1 hover:shadow-card-lg transition-all duration-300 group animate-swap-in"
            style={{ animationDelay: `${i * 40}ms` }}>
            <div className="w-10 h-10 rounded-xl bg-teal-soft text-teal-dark flex items-center justify-center mb-4 group-hover:bg-aura-grad group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Icon size={19} />
            </div>
            <div className="font-display font-bold text-navy text-sm sm:text-[15px] mb-1.5">{title}</div>
            <div className="text-gray-500 text-xs sm:text-[13px] leading-relaxed">{desc}</div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  )
}

export default function Features() {
  return (
    <section id="funcionalidades" className="section-pad bg-white">
      <div className="container-max">
        <SectionHeader
          tag="Funcionalidades"
          title={<>Tudo que o seu Home Care precisa,<br /> <span className="gradient-text">em um só sistema</span></>}
          subtitle="Do cadastro do paciente ao faturamento, com cada profissional acessando exatamente o que precisa."
        />
        <Showcase />
        <ModulesGrid />
      </div>
    </section>
  )
}
