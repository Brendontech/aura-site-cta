import React from 'react'
import { GESTAO, PRONTUARIO } from '../data/modules'

function Row({ items, reverse }) {
  // Duplicado para o loop infinito sem emenda
  const loop = [...items, ...items]
  return (
    <div className="flex overflow-hidden fade-x group">
      <div className={`flex gap-3 pr-3 w-max ${reverse ? 'animate-scroll-right' : 'animate-scroll-left'} group-hover:[animation-play-state:paused]`}>
        {loop.map(({ icon: Icon, title }, i) => (
          <div key={i} aria-hidden={i >= items.length}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gray-50 border border-gray-100 text-sm font-semibold text-navy/80 whitespace-nowrap hover:border-teal/40 hover:bg-teal-soft hover:text-teal-dark transition-colors">
            <Icon size={15} className="text-teal" /> {title}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ModulesMarquee() {
  return (
    <section aria-label="Módulos do sistema" className="bg-white pt-6 pb-4 lg:pt-10">
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 px-5">
        Gestão da empresa e prontuário do paciente, integrados
      </p>
      <div className="flex flex-col gap-3">
        <Row items={GESTAO} />
        <Row items={PRONTUARIO} reverse />
      </div>
    </section>
  )
}
