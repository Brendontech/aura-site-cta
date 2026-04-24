import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

// ── Mockup: Evolução de Paciente ─────────────────────────
function EvolucaoMockup() {
  return (
    <div className="bg-navy rounded-2xl border border-teal/20 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-navy-2 border-b border-white/5">
        <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center text-xs font-bold text-teal">HF</div>
        <div>
          <div className="text-white text-xs font-bold">Helena Farias</div>
          <div className="text-white/35 text-[10px]">Prontuário #00412 · Insuf. Cardíaca</div>
        </div>
        <div className="ml-auto flex gap-1.5">
          {['Enfermagem','Médico','Fisio'].map((t, i) => (
            <div key={t} className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${i===0?'bg-teal/20 text-teal':'bg-white/5 text-white/30'}`}>{t}</div>
          ))}
        </div>
      </div>
      {/* Body */}
      <div className="p-4">
        {/* Sinais vitais */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[['PA','130/80'],['FC','78'],['SpO2','97%'],['T°','36.5']].map(([k,v]) => (
            <div key={k} className="bg-white/5 rounded-xl p-2 text-center border border-white/5">
              <div className="text-teal text-[9px] font-bold mb-0.5">{k}</div>
              <div className="text-white text-[11px] font-black">{v}</div>
            </div>
          ))}
        </div>
        {/* Text area */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/5 mb-3">
          <div className="text-white/30 text-[9px] font-bold uppercase tracking-widest mb-1.5">Descritivo da Evolução</div>
          <div className="text-white/60 text-[11px] leading-relaxed">
            Paciente estável. Curativo realizado em região sacral. 
            Administração conforme prescrição. Sem intercorrências...
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex gap-2">
          <div className="flex-1 bg-teal/15 border border-teal/25 rounded-xl py-2 text-center text-teal text-[10px] font-bold">
            📄 Salvar Evolução
          </div>
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 text-center text-white/50 text-[10px] font-bold">
            🖨 Gerar PDF
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Mockup: Gerenciamento de Estoque ─────────────────────
function EstoqueMockup() {
  const items = [
    { name: 'Metformina 850mg', qtd: 48, alerta: false, color: '#10b981' },
    { name: 'Losartana 50mg',   qtd: 12, alerta: true,  color: '#f59e0b' },
    { name: 'Omeprazol 20mg',   qtd: 6,  alerta: true,  color: '#ef4444' },
    { name: 'AAS 100mg',        qtd: 90, alerta: false,  color: '#10b981' },
  ]
  return (
    <div className="bg-navy rounded-2xl border border-teal/20 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 bg-navy-2 border-b border-white/5">
        <div className="text-white text-xs font-bold">💊 Estoque de Medicamentos</div>
        <div className="text-[9px] bg-yellow-400/15 text-yellow-400 px-2 py-0.5 rounded-full font-bold">2 alertas</div>
      </div>
      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 p-4 pb-2">
        {[['124','Itens'],['8','Vencendo'],['R$4.2k','Valor']].map(([v,l]) => (
          <div key={l} className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
            <div className="font-display font-black text-sm text-white">{v}</div>
            <div className="text-white/30 text-[9px]">{l}</div>
          </div>
        ))}
      </div>
      {/* List */}
      <div className="px-4 pb-4 flex flex-col gap-1.5">
        {items.map(item => (
          <div key={item.name} className={`flex items-center gap-3 p-2.5 rounded-xl border ${item.alerta?'bg-red-500/5 border-red-500/15':'bg-white/3 border-white/5'}`}>
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <div className="flex-1 text-[11px] text-white/70 truncate">{item.name}</div>
            <div className="text-[11px] font-bold" style={{ color: item.color }}>{item.qtd} un</div>
            {item.alerta && <div className="text-[9px] text-red-400 font-bold">⚠</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Mockup: Acompanhamento HomeCare ─────────────────────
function AcompanhamentoMockup() {
  return (
    <div className="bg-navy rounded-2xl border border-teal/20 overflow-hidden shadow-2xl">
      <div className="px-4 py-3 bg-navy-2 border-b border-white/5">
        <div className="text-white text-xs font-bold mb-0.5">🏥 Acompanhamento HomeCare</div>
        <div className="text-white/30 text-[9px]">Visão geral em tempo real</div>
      </div>
      <div className="p-4">
        {/* Status bar chart */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Atendimentos esta semana</span>
            <span className="text-teal text-[9px] font-bold">+12%</span>
          </div>
          <div className="flex items-end gap-1 h-14">
            {[40,65,50,80,70,90,75].map((h,i) => (
              <div key={i} className="flex-1 rounded-t-md transition-all"
                style={{ height:`${h}%`, background: i>=5?'linear-gradient(180deg,#2BBFB3,#52C48A)':'rgba(43,191,179,0.2)' }} />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'].map(d => (
              <div key={d} className="flex-1 text-center text-[8px] text-white/25">{d}</div>
            ))}
          </div>
        </div>
        {/* Patients status */}
        <div className="flex flex-col gap-1.5">
          {[
            { name:'Maria O.',  status:'Em atendimento', color:'#2BBFB3', bg:'rgba(43,191,179,0.15)' },
            { name:'Carlos M.', status:'Aguardando',      color:'#f59e0b', bg:'rgba(245,158,11,0.15)' },
            { name:'Ana Lima',  status:'Concluído',       color:'#10b981', bg:'rgba(16,185,129,0.15)' },
          ].map(p => (
            <div key={p.name} className="flex items-center gap-2.5 p-2 bg-white/4 rounded-xl border border-white/5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                style={{ background: p.bg, color: p.color }}>{p.name.split(' ').map(n=>n[0]).join('')}</div>
              <div className="flex-1 text-[11px] text-white/70">{p.name}</div>
              <div className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color: p.color, background: p.bg }}>{p.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Features data ────────────────────────────────────────
const FEATURES = [
  {
    id: 'evolucao',
    tag: 'Módulo Clínico',
    title: 'Evolução de Pacientes Completa',
    desc: 'Registre evoluções por especialidade — médico, enfermagem, fisioterapia, fonoaudiologia e nutrição — com sinais vitais, prescrições e geração de PDF assinado digitalmente.',
    bullets: ['Múltiplas especialidades', 'Sinais vitais integrados', 'PDF com assinatura digital', 'Histórico completo'],
    mockup: <EvolucaoMockup />,
    reverse: false,
  },
  {
    id: 'estoque',
    tag: 'Módulo Farmácia',
    title: 'Gerenciamento de Estoque Inteligente',
    desc: 'Controle de medicamentos e insumos com alertas automáticos de estoque baixo, validade e bipagem EAN-13 para checagem na administração domiciliar.',
    bullets: ['Alertas de estoque crítico', 'Bipagem EAN-13', 'Controle de validade', 'Integração com farmácias'],
    mockup: <EstoqueMockup />,
    reverse: true,
  },
  {
    id: 'acompanhamento',
    tag: 'Módulo Gestão',
    title: 'Acompanhamento HomeCare em Tempo Real',
    desc: 'Dashboard completo com visão geral de todos os pacientes em atendimento, geolocalização dos profissionais e relatórios automáticos para convênios.',
    bullets: ['Dashboard ao vivo', 'GPS de profissionais', 'Relatórios automáticos', 'Integração com convênios'],
    mockup: <AcompanhamentoMockup />,
    reverse: false,
  },
]

function FeatureBlock({ feature, delay = 0 }) {
  const [ref, visible] = useScrollReveal(0.1)
  const { tag, title, desc, bullets, mockup, reverse } = feature

  return (
    <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center transition-all duration-800 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {/* Text side */}
      <div className={reverse ? 'lg:order-2' : ''}>
        <div className="section-tag mb-5">{tag}</div>
        <h3 className="font-display font-black text-3xl lg:text-4xl text-navy leading-tight mb-5">{title}</h3>
        <p className="text-gray-500 text-lg leading-relaxed mb-7">{desc}</p>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {bullets.map(b => (
            <div key={b} className="flex items-center gap-2.5 text-sm text-gray-600 font-medium">
              <div className="w-5 h-5 rounded-full bg-teal/15 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-teal" />
              </div>
              {b}
            </div>
          ))}
        </div>
        <Link to="/contato"
          className="inline-flex items-center gap-2 bg-aura-grad text-white font-display font-bold px-7 py-3.5 rounded-xl shadow-teal hover:shadow-teal-lg hover:-translate-y-0.5 transition-all">
          Ver este módulo <ChevronRight size={15} />
        </Link>
      </div>
      {/* Mockup side */}
      <div className={`${reverse ? 'lg:order-1' : ''}`}>
        {mockup}
      </div>
    </div>
  )
}

export default function Features() {
  return (
    <section id="funcionalidades" className="section-pad bg-white">
      <div className="container-max">
        <div className="text-center mb-20">
          <div className="section-tag mb-5">🛠️ Funcionalidades</div>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-navy leading-tight mb-5">
            Tudo que você precisa,<br />
            <span className="gradient-text">em um só sistema</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Do cadastro do paciente até o faturamento — cada etapa coberta.</p>
        </div>

        <div className="flex flex-col gap-28">
          {FEATURES.map((f, i) => <FeatureBlock key={f.id} feature={f} delay={i * 100} />)}
        </div>

        {/* Features grid */}
        <div className="mt-28 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { emoji:'👤', title:'Cadastro',        desc:'Ficha completa com CID, convênio e histórico' },
            { emoji:'📅', title:'Agenda',           desc:'Visitas, plantões e check-in GPS' },
            { emoji:'💊', title:'Prescrição',       desc:'Digital com checagem de medicamentos' },
            { emoji:'📊', title:'ABEMID/NEAD',      desc:'Avaliações e classificação automática' },
            { emoji:'💰', title:'Orçamentos',       desc:'Novo ou para paciente existente' },
            { emoji:'📄', title:'Relatórios PDF',   desc:'Com assinatura digital certificada' },
            { emoji:'🔒', title:'Segurança LGPD',   desc:'Dados criptografados e auditados' },
            { emoji:'📱', title:'App Mobile',       desc:'iOS e Android para a equipe de campo' },
          ].map(item => (
            <div key={item.title}
              className="p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:border-teal/30 hover:bg-teal-soft/30 hover:-translate-y-1 transition-all group cursor-pointer">
              <div className="text-2xl mb-3">{item.emoji}</div>
              <div className="font-display font-bold text-navy text-sm mb-1.5 group-hover:text-teal-dark transition-colors">{item.title}</div>
              <div className="text-gray-400 text-xs leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
