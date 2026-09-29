import React from 'react'
import { useAnimatedCounter } from '../hooks/useScrollReveal'
import { Reveal } from './ui'

function CounterStat({ target, suffix, label, delay }) {
  const [ref, value] = useAnimatedCounter(target, 2000)
  return (
    <Reveal delay={delay} className="text-center px-4 py-8 lg:py-10">
      <div ref={ref} className="font-display font-black text-4xl lg:text-5xl gradient-text">{value}{suffix}</div>
      <div className="text-white/50 text-sm font-medium mt-2">{label}</div>
    </Reveal>
  )
}

export default function StatsBar() {
  return (
    <section aria-label="Resultados" className="bg-white pt-8 pb-4 lg:pt-12">
      <div className="container-max">
        <div className="relative overflow-hidden rounded-3xl bg-dark-grad noise">
          <div className="absolute -top-20 left-1/3 w-80 h-80 bg-teal/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 divide-white/5 md:divide-x">
            <CounterStat target={500} suffix="+"  label="Pacientes gerenciados"         delay={0} />
            <CounterStat target={98}  suffix="%"  label="Satisfação dos gestores"        delay={80} />
            <CounterStat target={60}  suffix="%"  label="Redução de custos operacionais" delay={160} />
            <CounterStat target={24}  suffix="/7" label="Acesso em qualquer lugar"       delay={240} />
          </div>
        </div>
      </div>
    </section>
  )
}
