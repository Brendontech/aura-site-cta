import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, ChevronRight, Zap } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const PLANS = [
  {
    name: 'Starter',
    desc: 'Ideal para empresas iniciando no homecare',
    monthly: 197,
    annual: 164,
    color: '#2BBFB3',
    featured: false,
    features: [
      { text: 'Até 30 pacientes',            ok: true },
      { text: 'Até 5 usuários',              ok: true },
      { text: 'Evolução e Prescrição',       ok: true },
      { text: 'App mobile iOS e Android',    ok: true },
      { text: 'Relatórios PDF básicos',      ok: true },
      { text: 'Check-in com GPS',            ok: true },
      { text: 'Assinatura digital',          ok: false },
      { text: 'Integração farmácia',         ok: false },
      { text: 'Suporte prioritário',         ok: false },
    ],
  },
  {
    name: 'Professional',
    desc: 'Para empresas em crescimento com múltiplas equipes',
    monthly: 497,
    annual: 414,
    color: '#52C48A',
    featured: true,
    features: [
      { text: 'Até 100 pacientes',           ok: true },
      { text: 'Até 15 usuários',             ok: true },
      { text: 'Todos os módulos clínicos',   ok: true },
      { text: 'App mobile iOS e Android',    ok: true },
      { text: 'Assinatura digital',          ok: true },
      { text: 'ABEMID, NEAD, PAD',           ok: true },
      { text: 'Relatórios avançados',        ok: true },
      { text: 'Integração farmácia',         ok: false },
      { text: 'Suporte prioritário',         ok: false },
    ],
  },
  {
    name: 'Enterprise',
    desc: 'Solução completa para grandes operações',
    monthly: 997,
    annual: 831,
    color: '#4DD9CE',
    featured: false,
    features: [
      { text: 'Pacientes ilimitados',        ok: true },
      { text: 'Usuários ilimitados',         ok: true },
      { text: 'Todos os módulos',            ok: true },
      { text: 'App mobile iOS e Android',    ok: true },
      { text: 'Assinatura digital ICP',      ok: true },
      { text: 'Integração com farmácias',    ok: true },
      { text: 'Relatórios avançados',        ok: true },
      { text: 'Bipagem EAN-13',              ok: true },
      { text: 'Suporte prioritário 24/7',    ok: true },
    ],
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [ref, visible] = useScrollReveal(0.08)

  return (
    <section id="precos" className="section-pad bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-14">
          <div className="section-tag mb-5">💳 Planos e Preços</div>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-navy leading-tight mb-5">
            Escolha o plano<br />
            <span className="gradient-text">ideal para você</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mx-auto mb-8">
            Sem taxas escondidas. Cancele quando quiser. Suporte incluído em todos os planos.
          </p>

          {/* Toggle anual/mensal */}
          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm">
            <button onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-xl font-display font-semibold text-sm transition-all ${!annual ? 'bg-navy text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
              Mensal
            </button>
            <button onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-xl font-display font-semibold text-sm transition-all flex items-center gap-2 ${annual ? 'bg-navy text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
              Anual
              <span className="text-[10px] bg-teal/15 text-teal-dark px-2 py-0.5 rounded-full font-bold">-17%</span>
            </button>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map(({ name, desc, monthly, annual: ann, color, featured, features }, i) => (
            <div key={name}
              className={`relative rounded-3xl overflow-hidden transition-all duration-600 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-12'} ${
                featured
                  ? 'bg-dark-grad shadow-[0_20px_60px_rgba(13,27,42,0.3)] scale-[1.03] border-2 border-teal/30'
                  : 'bg-white border border-gray-100 shadow-card hover:shadow-card-lg hover:-translate-y-1'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}>

              {featured && (
                <div className="absolute top-0 left-0 right-0 flex justify-center pt-4">
                  <div className="flex items-center gap-1.5 bg-aura-grad text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-teal">
                    <Zap size={11} /> Mais Popular
                  </div>
                </div>
              )}

              <div className={`p-8 ${featured ? 'pt-14' : ''}`}>
                {/* Name + price */}
                <div className="mb-6">
                  <div className="font-display font-black text-xl mb-1" style={{ color: featured ? '#fff' : color }}>{name}</div>
                  <div className={`text-sm leading-relaxed mb-5 ${featured ? 'text-white/50' : 'text-gray-400'}`}>{desc}</div>
                  <div className="flex items-end gap-1">
                    <span className={`text-sm font-bold ${featured ? 'text-white/60' : 'text-gray-400'}`}>R$</span>
                    <span className={`font-display font-black text-5xl leading-none ${featured ? 'text-white' : 'text-navy'}`}>
                      {annual ? ann : monthly}
                    </span>
                    <span className={`text-sm pb-1 ${featured ? 'text-white/40' : 'text-gray-300'}`}>/mês</span>
                  </div>
                  {annual && (
                    <div className={`text-xs mt-1.5 ${featured ? 'text-teal-light' : 'text-teal-dark'}`}>
                      R$ {((annual ? ann : monthly) * 12).toLocaleString('pt-BR')}/ano — 2 meses grátis
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-8">
                  {features.map(({ text, ok }) => (
                    <li key={text} className={`flex items-center gap-3 text-sm ${
                      ok
                        ? featured ? 'text-white/80' : 'text-gray-600'
                        : featured ? 'text-white/20' : 'text-gray-300'
                    }`}>
                      {ok
                        ? <Check size={15} className="flex-shrink-0" style={{ color }} />
                        : <X size={15} className="flex-shrink-0 opacity-40" />}
                      {text}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link to="/contato"
                  className={`w-full py-4 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 ${
                    featured
                      ? 'bg-aura-grad text-white shadow-teal hover:shadow-teal-lg'
                      : 'bg-gray-900 text-white hover:bg-navy'
                  }`}>
                  {featured ? '🚀 Começar agora' : 'Escolher plano'} <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Precisa de um plano personalizado? <a href="https://wa.me/5561992510045" target="_blank" rel="noreferrer" className="text-teal font-semibold hover:underline">Fale conosco no WhatsApp</a>
        </p>
      </div>
    </section>
  )
}
