import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, ChevronRight, Zap } from 'lucide-react'
import { Reveal, SectionHeader } from './ui'
import { WHATSAPP_URL } from '../config'

const PLANS = [
  {
    name: 'Starter',
    desc: 'Para empresas começando a digitalizar o Home Care',
    monthly: 197,
    annual: 164,
    featured: false,
    features: [
      { text: 'Até 30 pacientes',               ok: true },
      { text: 'Até 5 usuários',                 ok: true },
      { text: 'Prontuário e evolução',          ok: true },
      { text: 'Check-in e check-out',           ok: true },
      { text: 'Estoque e materiais',            ok: true },
      { text: 'Relatórios',                     ok: true },
      { text: 'Portal do responsável',          ok: false },
      { text: 'Assinatura digital',             ok: false },
      { text: 'Indicadores',                    ok: false },
      { text: 'Suporte prioritário',            ok: false },
    ],
  },
  {
    name: 'Professional',
    desc: 'Para operações em crescimento, com várias equipes',
    monthly: 497,
    annual: 414,
    featured: true,
    features: [
      { text: 'Até 100 pacientes',              ok: true },
      { text: 'Até 15 usuários',                ok: true },
      { text: 'Prontuário completo',            ok: true },
      { text: 'ABEMID, NEAD, PAD e complexidade', ok: true },
      { text: 'Check-in e check-out',           ok: true },
      { text: 'Portal do responsável',          ok: true },
      { text: 'Relatórios e indicadores',       ok: true },
      { text: 'Assinatura digital',             ok: true },
      { text: 'Permissões em duas camadas',     ok: true },
      { text: 'Bipagem EAN-13',                 ok: false },
      { text: 'Suporte prioritário',            ok: false },
    ],
  },
  {
    name: 'Enterprise',
    desc: 'Para grandes operações que precisam de tudo',
    monthly: 997,
    annual: 831,
    featured: false,
    features: [
      { text: 'Pacientes ilimitados',           ok: true },
      { text: 'Usuários ilimitados',            ok: true },
      { text: 'Todos os módulos',               ok: true },
      { text: 'Check-in e check-out',           ok: true },
      { text: 'Portal do responsável',          ok: true },
      { text: 'Assinatura digital ICP-Brasil',  ok: true },
      { text: 'Bipagem EAN-13',                 ok: true },
      { text: 'Relatórios e indicadores',       ok: true },
      { text: 'Permissões em duas camadas',     ok: true },
      { text: 'Suporte prioritário',            ok: true },
    ],
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="precos" className="section-pad bg-white">
      <div className="container-max">
        <SectionHeader
          tag="Planos e Preços"
          title={<>Escolha o plano<br /><span className="gradient-text">ideal para você</span></>}
          subtitle="Sem taxas escondidas. Suporte incluído em todos os planos."
          className="!mb-10"
        />

        <Reveal className="flex justify-center mb-14 lg:mb-16">
          <div className="relative inline-flex bg-gray-100 rounded-2xl p-1.5">
            <span className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-xl bg-navy shadow transition-transform duration-500 ease-out-expo ${annual ? 'translate-x-full' : ''}`} />
            <button onClick={() => setAnnual(false)}
              className={`relative z-10 w-32 py-2.5 rounded-xl font-display font-semibold text-sm transition-colors ${!annual ? 'text-white' : 'text-gray-500 hover:text-navy'}`}>
              Mensal
            </button>
            <button onClick={() => setAnnual(true)}
              className={`relative z-10 w-32 py-2.5 rounded-xl font-display font-semibold text-sm transition-colors flex items-center justify-center gap-1.5 ${annual ? 'text-white' : 'text-gray-500 hover:text-navy'}`}>
              Anual <span className="text-[10px] bg-teal text-white px-1.5 py-0.5 rounded-full font-bold">-17%</span>
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-7 items-stretch max-w-md md:max-w-none mx-auto">
          {PLANS.map(({ name, desc, monthly, annual: ann, featured, features }, i) => {
            const price = annual ? ann : monthly
            return (
              <Reveal key={name} delay={i * 100} className={featured ? 'md:-my-4' : ''}>
                <div className={`relative h-full flex flex-col rounded-3xl transition-all duration-300 hover:-translate-y-1.5 ${
                  featured
                    ? 'bg-dark-grad shadow-[0_30px_70px_rgba(13,27,42,0.35)] border-spin [--card-bg:#10263a]'
                    : 'bg-white border border-gray-200/80 shadow-card hover:shadow-card-lg hover:border-teal/30'
                }`}>
                  {featured && (
                    <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                      <div className="flex items-center gap-1.5 bg-aura-grad text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-teal">
                        <Zap size={12} /> Mais escolhido
                      </div>
                    </div>
                  )}

                  <div className={`p-8 flex flex-col flex-1 ${featured ? 'md:py-12' : ''}`}>
                    <div className={`font-display font-black text-xl ${featured ? 'text-white' : 'text-navy'}`}>{name}</div>
                    <div className={`text-sm leading-relaxed mt-1.5 min-h-[2.5rem] ${featured ? 'text-white/55' : 'text-gray-500'}`}>{desc}</div>

                    <div className="flex items-end gap-1 mt-6">
                      <span className={`text-sm font-bold pb-1.5 ${featured ? 'text-white/60' : 'text-gray-400'}`}>R$</span>
                      <span key={price} className={`font-display font-black text-5xl leading-none animate-swap-in ${featured ? 'text-white' : 'text-navy'}`}>{price}</span>
                      <span className={`text-sm pb-1 ${featured ? 'text-white/45' : 'text-gray-400'}`}>/mês</span>
                    </div>
                    <div className={`text-xs mt-2 h-4 transition-opacity duration-300 ${annual ? 'opacity-100' : 'opacity-0'} ${featured ? 'text-teal-light' : 'text-teal-dark'}`}>
                      R$ {(ann * 12).toLocaleString('pt-BR')}/ano — 2 meses grátis
                    </div>

                    <div className={`h-px my-7 ${featured ? 'bg-white/10' : 'bg-gray-100'}`} />

                    <ul className="flex flex-col gap-3 mb-9">
                      {features.map(({ text, ok }) => (
                        <li key={text} className={`flex items-center gap-3 text-sm ${
                          ok ? (featured ? 'text-white/85' : 'text-gray-600') : (featured ? 'text-white/25' : 'text-gray-300')
                        }`}>
                          {ok
                            ? <span className="w-5 h-5 rounded-full bg-teal/15 text-teal flex items-center justify-center flex-shrink-0"><Check size={12} strokeWidth={3} /></span>
                            : <span className="w-5 h-5 flex items-center justify-center flex-shrink-0"><X size={13} /></span>}
                          {text}
                        </li>
                      ))}
                    </ul>

                    <Link to="/contato"
                      className={`mt-auto w-full py-4 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 group ${
                        featured ? 'btn-primary' : 'bg-navy text-white hover:bg-navy-3 hover:-translate-y-0.5'
                      }`}>
                      {featured ? 'Começar agora' : 'Escolher plano'} <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal as="p" className="text-center text-gray-500 text-sm mt-14">
          Precisa de um plano personalizado?{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-teal-dark font-semibold underline-offset-4 hover:underline">
            Fale conosco no WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  )
}
