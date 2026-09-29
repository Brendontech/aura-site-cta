import React from 'react'
import { Link } from 'react-router-dom'
import { Wallet, FileSignature, ShieldCheck, Layers, MonitorPlay, ArrowUpRight, MessagesSquare, Lock } from 'lucide-react'
import { Reveal, SectionHeader, SpotlightCard } from './ui'
import { DEMO_URL } from '../config'

const BENEFITS = [
  {
    icon: Wallet,
    title: 'Faturamento com segurança',
    desc: 'Check-in e check-out com a distância registrada mostram se a visita realmente aconteceu antes de você faturar.',
    highlight: 'Divergências à vista',
  },
  {
    icon: FileSignature,
    title: 'Documentos assinados sem papel',
    desc: 'O responsável recebe o login por e-mail ou WhatsApp e assina os documentos do paciente pelo portal.',
    highlight: 'Portal do responsável',
  },
  {
    icon: ShieldCheck,
    title: 'Cada um acessa o que precisa',
    desc: 'Permissões por módulo no sistema e, dentro do prontuário, por paciente vinculado ao profissional.',
    highlight: 'Duas camadas de permissão',
  },
  {
    icon: Layers,
    title: 'Gestão e cuidado no mesmo lugar',
    desc: 'Estoque, orçamentos, operadoras, indicadores e o prontuário completo, sem planilhas paralelas.',
    highlight: 'Mais de 20 módulos',
  },
]

function DemoBand() {
  return (
    <Reveal variant="scale" className="relative overflow-hidden rounded-[2rem] bg-dark-grad noise mt-20 lg:mt-28">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal/25 rounded-full blur-[120px] animate-float-slow" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green/20 rounded-full blur-[120px] animate-float" />
      <div className="relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center px-7 py-12 sm:px-12 lg:px-16 lg:py-16">
        <div>
          <div className="section-tag-dark"><MonitorPlay size={13} /> Demo aberta</div>
          <h3 className="font-display font-black text-3xl lg:text-4xl text-white leading-tight mt-5">
            Veja o Sanyti por dentro,<br /><span className="gradient-text">agora mesmo.</span>
          </h3>
          <p className="text-white/60 text-lg mt-4 max-w-lg">
            Entre no ambiente de demonstração e navegue pelos módulos e pelo prontuário, no seu ritmo.
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-white/45 mt-5">
            <Lock size={12} className="text-teal" /> Ambiente somente para visualização — nada é criado ou alterado.
          </div>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5">
          <a href={DEMO_URL} target="_blank" rel="noreferrer" className="btn-primary text-base py-4 group">
            <MonitorPlay size={18} /> Explorar a demo
            <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <Link to="/contato" className="btn-glass text-base py-4">
            <MessagesSquare size={18} className="text-teal" /> Agendar apresentação
          </Link>
        </div>
      </div>
    </Reveal>
  )
}

export default function Benefits() {
  return (
    <section id="beneficios" className="section-pad bg-gray-50">
      <div className="container-max">
        <SectionHeader
          tag="Benefícios"
          title={<>Menos burocracia.<br /><span className="gradient-text">Mais cuidado.</span></>}
          subtitle="O Sanyti organiza a operação para sua equipe dedicar tempo ao que realmente importa: o paciente."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {BENEFITS.map(({ icon: Icon, title, desc, highlight }, i) => (
            <Reveal key={title} delay={i * 90}>
              <SpotlightCard className="h-full p-7 lg:p-8 bg-white border border-gray-100 rounded-2xl hover:border-teal/30 hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-teal-soft text-teal-dark flex items-center justify-center flex-shrink-0 group-hover:bg-aura-grad group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-navy text-lg">{title}</h3>
                    <p className="text-gray-500 text-[15px] leading-relaxed mt-2">{desc}</p>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-teal/10 text-teal-dark mt-4">
                      ✓ {highlight}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <DemoBand />
      </div>
    </section>
  )
}
