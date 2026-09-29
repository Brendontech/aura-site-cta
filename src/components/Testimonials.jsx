import React from 'react'
import { Quote } from 'lucide-react'
import { Reveal, SectionHeader, SpotlightCard } from './ui'

const TESTIMONIALS = [
  {
    text: 'O Sanyti transformou nossa operação. Reduzimos 3 funcionários administrativos e zeramos os erros de prescrição. O ROI foi em menos de 2 meses.',
    name: 'Dr. Rafael Andrade',
    role: 'Diretor — Cuidar Homecare SP',
    color: 'from-teal to-green',
  },
  {
    text: 'O check-in e check-out acabou com as discussões sobre frequência de visitas. Hoje temos rastreabilidade total e o convênio paga sem questionamentos.',
    name: 'Ana Martins',
    role: 'Gerente — Home Med Goiânia',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    text: 'Saímos de planilhas caóticas para um sistema profissional em 1 semana. A equipe adorou. Gerenciamos 120 pacientes com muito mais tranquilidade.',
    name: 'Carla Souza',
    role: 'Coordenadora — VitaCare RJ',
    color: 'from-orange-400 to-red-500',
  },
]

export default function Testimonials() {
  return (
    <section className="section-pad bg-gray-50 !pt-0">
      <div className="container-max">
        <SectionHeader tag="Depoimentos" title={<>O que dizem nossos <span className="gradient-text">clientes</span></>} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {TESTIMONIALS.map(({ text, name, role, color }, i) => (
            <Reveal key={name} delay={i * 100}>
              <SpotlightCard className="relative h-full flex flex-col p-7 lg:p-8 bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color} origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500`} />
                <Quote size={28} className="text-teal/25 mb-4 group-hover:text-teal/50 transition-colors" />
                <div className="text-yellow-400 text-sm tracking-wider mb-3">★★★★★</div>
                <p className="text-gray-600 text-[15px] leading-[1.8] mb-7">“{text}”</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-display font-bold text-navy text-sm">{name}</div>
                    <div className="text-gray-400 text-xs">{role}</div>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
