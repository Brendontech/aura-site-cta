import React from 'react'
import { useScrollReveal, useSpotlight } from '../hooks/useScrollReveal'

// Anima a entrada do conteúdo ao rolar. variant: up | left | right | scale | blur
export function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) {
  const [ref, visible] = useScrollReveal()
  return (
    <Tag ref={ref} className={`rv rv-${variant} ${visible ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  )
}

// Cabeçalho padrão das seções (tag + título + subtítulo), com espaçamento consistente
export function SectionHeader({ tag, title, subtitle, dark = false, className = '' }) {
  return (
    <div className={`text-center max-w-3xl mx-auto mb-14 lg:mb-20 ${className}`}>
      <Reveal>
        <div className={dark ? 'section-tag-dark' : 'section-tag'}>{tag}</div>
      </Reveal>
      <Reveal delay={80}>
        <h2 className={`font-display font-black text-[2.1rem] sm:text-4xl lg:text-5xl leading-[1.1] mt-5 ${dark ? 'text-white' : 'text-navy'}`}>
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={160}>
          <p className={`text-lg leading-relaxed mt-5 ${dark ? 'text-white/55' : 'text-gray-500'}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}

// Card com brilho que acompanha o cursor
export function SpotlightCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const onMove = useSpotlight()
  return (
    <Tag onMouseMove={onMove} className={`spotlight ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
