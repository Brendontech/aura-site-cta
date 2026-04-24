import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, TrendingDown, Users, Lock, Smartphone } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const BENEFITS = [
  {
    icon: TrendingDown,
    color: '#2BBFB3',
    bg: 'rgba(43,191,179,0.1)',
    title: 'Fim do trabalho manual',
    desc: 'Relatórios, alertas de medicamento e cobranças gerados automaticamente. Sua equipe faz menos papel e mais assistência.',
    highlight: '87% menos tempo operacional',
  },
  {
    icon: Users,
    color: '#52C48A',
    bg: 'rgba(82,196,138,0.1)',
    title: 'Reduza custos com pessoal',
    desc: 'Automatize tarefas que antes exigiam 2-3 funcionários administrativos. Reduza a equipe de apoio sem perder qualidade.',
    highlight: 'Até 60% menos custo admin.',
  },
  {
    icon: Lock,
    color: '#4DD9CE',
    bg: 'rgba(77,217,206,0.1)',
    title: 'Segurança e conformidade',
    desc: 'Dados na nuvem com backup automático, criptografia e auditoria. Conformidade com LGPD e CFM.',
    highlight: '100% seguro e auditado',
  },
  {
    icon: Smartphone,
    color: '#7ED9A8',
    bg: 'rgba(126,217,168,0.1)',
    title: 'Acesso em qualquer lugar',
    desc: 'Web no computador, app no celular. A equipe registra a evolução no domicílio do paciente em tempo real.',
    highlight: 'Web + iOS + Android',
  },
]

const TESTIMONIALS = [
  {
    stars: 5,
    text: '"O Aura transformou nossa operação. Reduzimos 3 funcionários administrativos e zeramos os erros de prescrição. O ROI foi em menos de 2 meses."',
    name: 'Dr. Rafael Andrade',
    role: 'Diretor — Cuidar Homecare SP',
    color: 'from-teal to-green',
  },
  {
    stars: 5,
    text: '"A funcionalidade de check-in por GPS acabou com as discussões sobre frequência de visitas. Hoje temos rastreabilidade total e o convênio paga sem questionamentos."',
    name: 'Ana Martins',
    role: 'Gerente — Home Med Goiânia',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    stars: 5,
    text: '"Saímos de planilhas caóticas para um sistema profissional em 1 semana. A equipe adorou o app. Gerenciamos 120 pacientes com muito mais tranquilidade."',
    name: 'Carla Souza',
    role: 'Coordenadora — VitaCare RJ',
    color: 'from-orange-400 to-red-500',
  },
]

export default function Benefits() {
  const [refBen, visBen] = useScrollReveal()
  const [refTes, visTes] = useScrollReveal()

  return (
    <>
      {/* ── Benefits ── */}
      <section id="beneficios" className="section-pad bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <div className="section-tag mb-5">📈 Benefícios reais</div>
            <h2 className="font-display font-black text-4xl lg:text-5xl text-navy leading-tight mb-5">
              Menos burocracia.<br/>
              <span className="gradient-text">Mais cuidado.</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">
              O Aura transforma operações complexas em processos simples, liberando sua equipe para o que realmente importa.
            </p>
          </div>

          <div ref={refBen} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {BENEFITS.map(({ icon: Icon, color, bg, title, desc, highlight }, i) => (
              <div key={title}
                className={`p-7 bg-white border border-gray-100 rounded-2xl hover:border-teal/30 hover:shadow-card transition-all duration-500 group ${visBen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: bg }}>
                    <Icon size={22} style={{ color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-navy text-lg mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{desc}</p>
                    <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{ color, background: bg }}>
                      ✓ {highlight}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA central */}
          <div className="relative overflow-hidden bg-dark-grad rounded-3xl p-10 text-center">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage:'radial-gradient(circle at 30% 50%, #2BBFB3 0%, transparent 50%), radial-gradient(circle at 70% 50%, #52C48A 0%, transparent 50%)' }} />
            <div className="relative z-10">
              <div className="font-display font-black text-white text-3xl lg:text-4xl mb-4">
                Pronto para transformar seu homecare?
              </div>
              <p className="text-white/55 text-lg mb-8 max-w-lg mx-auto">
                Solicite uma demonstração gratuita e veja o Aura funcionando em 30 minutos.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contato"
                  className="inline-flex items-center gap-2 bg-aura-grad text-white font-display font-bold px-8 py-4 rounded-xl shadow-teal hover:shadow-teal-lg hover:-translate-y-1 transition-all text-base">
                  🚀 Solicitar Demo Gratuita <ChevronRight size={16} />
                </Link>
                <a href="https://wa.me/5561992510045" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-display font-bold px-8 py-4 rounded-xl hover:-translate-y-1 transition-all text-base">
                  💬 WhatsApp Direto
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section-pad bg-white">
        <div className="container-max">
          <div className="text-center mb-14">
            <div className="section-tag mb-5">💬 Depoimentos</div>
            <h2 className="font-display font-black text-4xl text-navy mb-4">
              O que dizem nossos <span className="gradient-text">clientes</span>
            </h2>
          </div>

          <div ref={refTes} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ stars, text, name, role, color }, i) => (
              <div key={name}
                className={`relative p-7 bg-white border border-gray-100 rounded-2xl hover:shadow-card-lg transition-all duration-500 group overflow-hidden ${visTes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`} />
                {/* Stars */}
                <div className="text-yellow-400 text-sm tracking-wider mb-4">{'★'.repeat(stars)}</div>
                <p className="text-gray-500 text-sm leading-[1.8] mb-6 italic">{text}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <div className="font-display font-bold text-navy text-sm">{name}</div>
                    <div className="text-gray-400 text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
