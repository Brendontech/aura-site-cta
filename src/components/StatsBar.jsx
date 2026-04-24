import React from 'react'
import { useScrollReveal, useAnimatedCounter } from '../hooks/useScrollReveal'

function CounterStat({ target, suffix, label, color = '#2BBFB3' }) {
  const [ref, value] = useAnimatedCounter(target, 2000)
  return (
    <div ref={ref} className="text-center py-6 px-4">
      <div className="font-display font-black text-5xl mb-2" style={{ color }}>{value}{suffix}</div>
      <div className="text-white/45 text-sm font-medium">{label}</div>
    </div>
  )
}

export default function StatsBar() {
  return (
    <div className="bg-navy/95 border-y border-teal/10">
      <div className="container-max">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          <CounterStat target={500}  suffix="+"  label="Pacientes gerenciados"         color="#2BBFB3" />
          <CounterStat target={98}   suffix="%"  label="Satisfação dos gestores"        color="#52C48A" />
          <CounterStat target={60}   suffix="%"  label="Redução de custos operacionais" color="#4DD9CE" />
          <CounterStat target={24}   suffix="/7" label="Acesso em qualquer lugar"       color="#7ED9A8" />
        </div>
      </div>
    </div>
  )
}
