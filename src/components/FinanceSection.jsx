import React, { useEffect, useState } from 'react'
import {
  Calculator, CalendarCheck, Boxes, Pill, Wallet, TrendingUp, ChevronRight, Package, Stethoscope, Sofa, AlertTriangle, CheckCircle2,
} from 'lucide-react'
import { Reveal, SectionHeader, SpotlightCard } from './ui'
import { useDemoChooser } from '../context/DemoChooser'
import { useScrollReveal } from '../hooks/useScrollReveal'

const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Exemplos ilustrativos de resultado por atendimento
const VISITS = [
  { patient: 'Helena Farias',  proc: 'Curativo complexo',       op: 'Operadora A', receita: 420, materiais: 68.4, medicamentos: 32.1, equipe: 150 },
  { patient: 'Rui Barbosa',    proc: 'Visita de enfermagem',    op: 'Operadora B', receita: 260, materiais: 18.9, medicamentos: 12.5, equipe: 120 },
  { patient: 'Maria Oliveira', proc: 'Antibioticoterapia EV',   op: 'Particular',  receita: 380, materiais: 54.2, medicamentos: 176.8, equipe: 140 },
]

const FLOW = [
  { icon: Calculator,    title: 'Orçamento',   desc: 'Valores por procedimento e operadora definidos antes do atendimento.' },
  { icon: CalendarCheck, title: 'Atendimento', desc: 'Check-in e check-out comprovam que a visita aconteceu.' },
  { icon: Pill,          title: 'Consumo',     desc: 'Materiais e medicamentos da farmácia saem do estoque, item a item.' },
  { icon: Wallet,        title: 'Faturamento', desc: 'Só o que foi realizado e comprovado entra na conta da operadora.' },
  { icon: TrendingUp,    title: 'Resultado',   desc: 'Você vê quanto ganhou de verdade em cada atendimento.' },
]

const PILLARS = [
  { icon: Boxes,       title: 'Estoque real',         desc: 'Materiais, itens, equipamentos e mobília com saldo sempre atualizado. A prescrição de materiais não deixa usar mais do que existe.' },
  { icon: Pill,        title: 'Farmácia conectada',   desc: 'Medicamentos dispensados pela farmácia entram no custo do atendimento e no faturamento — sem digitar duas vezes.' },
  { icon: Calculator,  title: 'Orçamentos precisos',  desc: 'Busca inteligente de itens, kits de materiais por procedimento e valores por operadora.' },
  { icon: Wallet,      title: 'Faturamento conferido', desc: 'Check-in e check-out mostram o que realmente foi feito. Divergências aparecem antes de faturar.' },
]

// Barra empilhada animada: receita x custos x resultado
function ResultCard() {
  const [ref, visible] = useScrollReveal(0.25)
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!visible) return
    const t = setInterval(() => setI(v => (v + 1) % VISITS.length), 4200)
    return () => clearInterval(t)
  }, [visible])

  const v = VISITS[i]
  const custos = [
    { label: 'Materiais',    value: v.materiais,    color: '#4DD9CE' },
    { label: 'Medicamentos', value: v.medicamentos, color: '#8b5cf6' },
    { label: 'Equipe',       value: v.equipe,       color: '#f59e0b' },
  ]
  const lucro = v.receita - custos.reduce((a, c) => a + c.value, 0)
  const margem = Math.round((lucro / v.receita) * 100)
  const baixa = margem < 20
  const pct = (x) => `${visible ? (x / v.receita) * 100 : 0}%`

  return (
    <div ref={ref} className="bg-navy rounded-3xl border border-teal/20 shadow-[0_40px_100px_rgba(13,27,42,0.35)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-6 py-4 bg-navy-2 border-b border-white/5">
        <div>
          <div className="text-white text-sm font-bold">Resultado por atendimento</div>
          <div className="text-white/40 text-[11px]">Exemplo ilustrativo</div>
        </div>
        <div className="flex gap-1.5">
          {VISITS.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Ver atendimento ${k + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? 'w-6 bg-teal' : 'w-1.5 bg-white/20 hover:bg-white/40'}`} />
          ))}
        </div>
      </div>

      <div key={i} className="p-6 animate-swap-in">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-white font-display font-bold truncate">{v.patient}</div>
            <div className="text-white/45 text-xs mt-0.5">{v.proc} · {v.op}</div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Receita</div>
            <div className="text-white font-display font-black text-xl">{brl(v.receita)}</div>
          </div>
        </div>

        {/* Barra empilhada */}
        <div className="flex h-4 rounded-full overflow-hidden bg-white/5 mt-6">
          {custos.map((c, k) => (
            <div key={c.label} className="h-full transition-all duration-1000 ease-out-expo" style={{ width: pct(c.value), background: c.color, transitionDelay: `${k * 120}ms` }} />
          ))}
          <div className="h-full transition-all duration-1000 ease-out-expo" style={{ width: pct(Math.max(lucro, 0)), background: 'linear-gradient(90deg,#2BBFB3,#52C48A)', transitionDelay: '360ms' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5">
          {custos.map(c => (
            <div key={c.label} className="flex sm:block items-center justify-between bg-white/[0.04] border border-white/5 rounded-xl px-3 py-2.5 sm:p-3">
              <div className="flex items-center gap-1.5 text-white/45 text-[10px] font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} /> {c.label}
              </div>
              <div className="text-white/85 text-sm font-semibold sm:mt-1 whitespace-nowrap">− {brl(c.value)}</div>
            </div>
          ))}
        </div>

        <div className={`flex items-center justify-between gap-4 mt-4 p-4 rounded-2xl border ${baixa ? 'bg-amber-400/10 border-amber-400/25' : 'bg-teal/10 border-teal/25'}`}>
          <div className="flex items-center gap-2.5">
            {baixa ? <AlertTriangle size={18} className="text-amber-400" /> : <CheckCircle2 size={18} className="text-green" />}
            <div>
              <div className="text-white text-sm font-bold">Resultado do atendimento</div>
              <div className={`text-[11px] font-semibold ${baixa ? 'text-amber-400' : 'text-green'}`}>
                {baixa ? 'Margem abaixo do esperado — revise o orçamento' : 'Atendimento lucrativo'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-display font-black text-xl ${baixa ? 'text-amber-400' : 'text-green'}`}>{brl(lucro)}</div>
            <div className="text-white/45 text-[11px]">margem de {margem}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Estoque baixando conforme o consumo nos atendimentos
function StockCard() {
  const [ref, visible] = useScrollReveal(0.3)
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!visible) return
    const t = setInterval(() => setTick(v => (v + 1) % 6), 1600)
    return () => clearInterval(t)
  }, [visible])
  const items = [
    { icon: Package,     name: 'Gaze estéril',            base: 140, step: 2, un: 'pct' },
    { icon: Pill,        name: 'Ceftriaxona 1 g',         base: 36,  step: 1, un: 'fr' },
    { icon: Stethoscope, name: 'Concentrador de O₂',      base: 12,  step: 0, un: 'eq', tag: '9 em uso' },
    { icon: Sofa,        name: 'Cama hospitalar',         base: 8,   step: 0, un: 'un', tag: '6 locadas' },
  ]
  return (
    <div ref={ref} className="bg-white rounded-3xl border border-gray-100 shadow-card-lg p-6">
      <div className="flex items-center justify-between">
        <div className="font-display font-bold text-navy">Estoque em tempo real</div>
        <span className="flex items-center gap-1.5 text-[11px] font-bold text-teal-dark">
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse" /> atualizado
        </span>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {items.map(({ icon: Icon, name, base, step, un, tag }) => {
          const qty = base - step * tick
          return (
            <div key={name} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <span className="w-8 h-8 rounded-lg bg-teal-soft text-teal-dark flex items-center justify-center flex-shrink-0"><Icon size={15} /></span>
              <span className="flex-1 min-w-0 text-sm text-navy font-medium truncate">{name}</span>
              {tag && <span className="hidden sm:inline text-[10px] font-bold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">{tag}</span>}
              <span key={qty} className="text-sm font-bold text-navy tabular-nums animate-swap-in">{qty} <span className="text-gray-400 font-medium">{un}</span></span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function FinanceSection() {
  const { open: openChooser } = useDemoChooser()
  return (
    <section id="financeiro" className="section-pad bg-gray-50 relative overflow-hidden">
      <div className="absolute top-40 -right-40 w-[30rem] h-[30rem] bg-teal/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="container-max relative">
        <SectionHeader
          tag={<><Wallet size={13} /> Controle financeiro</>}
          title={<>Saiba quanto seu Home Care <span className="gradient-text">realmente ganha</span></>}
          subtitle="A maioria dos sistemas para no prontuário. O Sanyti conecta orçamento, estoque, farmácia e faturamento para mostrar o resultado de cada atendimento — com precisão."
        />

        {/* Fluxo do dinheiro */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3">
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-teal/10 via-teal/50 to-teal/10" />
          {FLOW.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 100} className="relative text-center px-3 group">
              <div className="relative z-10 w-16 h-16 mx-auto rounded-2xl bg-white border border-teal/20 shadow-card flex items-center justify-center text-teal-dark group-hover:bg-aura-grad group-hover:text-white group-hover:-translate-y-1 group-hover:shadow-teal transition-all duration-300">
                <Icon size={24} />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy text-white text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
              </div>
              <div className="font-display font-bold text-navy mt-4">{title}</div>
              <p className="text-gray-500 text-sm leading-relaxed mt-1.5">{desc}</p>
            </Reveal>
          ))}
        </div>

        {/* Mockups */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6 lg:gap-8 items-start mt-16 lg:mt-24">
          <Reveal variant="left"><ResultCard /></Reveal>
          <div className="flex flex-col gap-6">
            <Reveal variant="right" delay={100}><StockCard /></Reveal>
            <Reveal variant="right" delay={200}>
              <div className="relative overflow-hidden rounded-3xl bg-dark-grad p-6 noise">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-teal/25 rounded-full blur-3xl" />
                <div className="relative">
                  <div className="font-display font-bold text-white text-lg leading-snug">Pare de descobrir o prejuízo no fim do mês.</div>
                  <p className="text-white/55 text-sm mt-2">Veja no sistema como orçamento, estoque e faturamento se conectam.</p>
                  <button onClick={openChooser} className="btn-primary mt-5 text-sm group">
                    Ver o financeiro funcionando <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Pilares */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-16 lg:mt-20">
          {PILLARS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 90}>
              <SpotlightCard className="h-full p-6 bg-white border border-gray-100 rounded-2xl hover:border-teal/30 hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300 group">
                <span className="w-11 h-11 rounded-xl bg-teal-soft text-teal-dark flex items-center justify-center mb-4 group-hover:bg-aura-grad group-hover:text-white group-hover:scale-110 transition-all duration-300"><Icon size={20} /></span>
                <div className="font-display font-bold text-navy">{title}</div>
                <p className="text-gray-500 text-sm leading-relaxed mt-2">{desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
