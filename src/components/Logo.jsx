import React from 'react'

// Molécula da marca Sanyti (nós e ligações)
const NODES = [
  { x: 65,  y: 30,  r: 14, c: '#5EE0D0' },
  { x: 146, y: 38,  r: 9,  c: '#8BE8DD' },
  { x: 88,  y: 76,  r: 19, c: '#14BFAE' },
  { x: 132, y: 82,  r: 11, c: '#2DD4BF' },
  { x: 52,  y: 124, r: 22, c: '#0E9488' },
  { x: 22,  y: 170, r: 12, c: '#14B8A6' },
  { x: 84,  y: 170, r: 17, c: '#3DB8A9' },
  { x: 72,  y: 212, r: 13, c: '#8BE8DD' },
]
const LINKS = [[0, 2], [2, 3], [1, 3], [2, 4], [4, 5], [4, 6], [6, 7]]

export function LogoMark({ className = 'h-10', animated = true }) {
  return (
    <svg viewBox="0 0 168 232" className={`${className} w-auto overflow-visible`} aria-hidden="true">
      <g stroke="#9FE3DA" strokeOpacity="0.7" strokeWidth="6" strokeLinecap="round">
        {LINKS.map(([a, b]) => <line key={`${a}-${b}`} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />)}
      </g>
      {NODES.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.c}
          className={animated ? 'logo-node' : ''} style={{ animationDelay: `${i * 0.35}s`, transformOrigin: `${n.x}px ${n.y}px` }} />
      ))}
    </svg>
  )
}

// dark = logo sobre fundo escuro (texto claro). compact = sem o subtítulo
export default function Logo({ dark = true, compact = false, size = 'md' }) {
  const s = {
    sm: { mark: 'h-10', word: 'text-[1.35rem]', sub: 'text-[6.5px]' },
    md: { mark: 'h-12', word: 'text-[1.7rem]',  sub: 'text-[7.5px]' },
    lg: { mark: 'h-[4.5rem]', word: 'text-[2.4rem]',  sub: 'text-[10px]' },
  }[size]
  return (
    <span className="inline-flex items-center gap-2.5 select-none" aria-label="Sanyti — Sistema de Gerenciamento" role="img">
      <LogoMark className={`${s.mark} transition-all duration-500`} />
      <span className="flex flex-col justify-center leading-none">
        <span className={`font-display font-extrabold tracking-tight ${s.word} transition-all duration-500 ${dark ? 'text-white' : 'text-[#0F3D47]'}`}>
          SANYT<span className="text-teal">i</span>
        </span>
        {!compact && (
          <span className={`font-semibold tracking-[0.28em] mt-1 ${s.sub} ${dark ? 'text-white/55' : 'text-[#4B6B75]'}`}>
            SISTEMA DE GERENCIAMENTO
          </span>
        )}
      </span>
    </span>
  )
}
