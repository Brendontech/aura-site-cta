import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Fingerprint, MapPin, Barcode, ShieldCheck, ChevronRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

// Scan line animation over barcode mockup
function BarcodeScan() {
  return (
    <div className="relative w-36 h-20 mx-auto">
      {/* Barcode lines */}
      <div className="flex items-end justify-center gap-0.5 h-16">
        {[3,1,4,1,5,2,3,1,2,4,1,3,5,1,2,3,1,4,2,1,3,5,2,1,3].map((h,i) => (
          <div key={i} className="w-1 bg-white/80 rounded-sm" style={{ height: `${h * 14}%` }} />
        ))}
      </div>
      <div className="text-center text-white/50 text-[10px] font-mono mt-1 tracking-widest">4 789 001 23456</div>
      {/* Scan line */}
      <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal to-transparent scan-line" />
      {/* Corner brackets */}
      {[['top-0 left-0','border-t-2 border-l-2'],['top-0 right-0','border-t-2 border-r-2'],
        ['bottom-0 left-0','border-b-2 border-l-2'],['bottom-0 right-0','border-b-2 border-r-2']].map(([pos,cls],i) => (
        <div key={i} className={`absolute w-4 h-4 border-teal ${pos} ${cls}`} />
      ))}
    </div>
  )
}

// GPS map mockup
function GpsMockup() {
  return (
    <div className="relative w-40 h-28 bg-navy-3 rounded-xl border border-teal/20 overflow-hidden">
      {/* Map grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 160 112">
        {[20,40,60,80,100].map(y => <line key={y} x1="0" y1={y} x2="160" y2={y} stroke="#2BBFB3" strokeWidth="0.5"/>)}
        {[20,40,60,80,100,120,140].map(x => <line key={x} x1={x} y1="0" x2={x} y2="112" stroke="#2BBFB3" strokeWidth="0.5"/>)}
        {/* Roads */}
        <path d="M0 56 Q80 40 160 56" stroke="#2BBFB3" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <path d="M80 0 Q90 56 80 112" stroke="#2BBFB3" strokeWidth="1.5" fill="none" opacity="0.5"/>
      </svg>
      {/* Location pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="w-6 h-6 bg-teal rounded-full flex items-center justify-center shadow-teal animate-pulse-glow">
            <MapPin size={12} className="text-white" />
          </div>
          <div className="absolute inset-0 rounded-full bg-teal/30 animate-ping" />
        </div>
      </div>
      {/* Location badge */}
      <div className="absolute bottom-2 left-2 right-2 bg-navy/80 backdrop-blur-sm rounded-lg px-2 py-1.5 border border-teal/20">
        <div className="text-teal text-[9px] font-bold">📍 Profissional Localizado</div>
        <div className="text-white/40 text-[8px]">Rua das Flores, 245</div>
      </div>
    </div>
  )
}

// Digital signature mockup
function SignatureMockup() {
  return (
    <div className="relative w-44 h-28 bg-white/5 rounded-xl border border-teal/20 p-3">
      <div className="text-[9px] text-white/40 uppercase tracking-widest mb-2 font-bold">Assinatura Digital</div>
      {/* Signature wave */}
      <svg className="w-full h-10 mb-2" viewBox="0 0 160 40">
        <path d="M10 30 C30 10, 50 35, 70 20 C90 5, 110 30, 130 15 C140 10, 148 18, 152 20" 
          stroke="url(#sigGrad)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <defs>
          <linearGradient id="sigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2BBFB3"/>
            <stop offset="100%" stopColor="#52C48A"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="h-px bg-gradient-to-r from-teal/50 to-transparent mb-1.5" />
      <div className="flex items-center gap-2">
        <ShieldCheck size={11} className="text-teal" />
        <span className="text-teal text-[9px] font-bold">Certificado ICP-Brasil</span>
      </div>
      <div className="text-white/30 text-[8px] mt-0.5 font-mono">SHA-256 · 2048-bit RSA</div>
    </div>
  )
}

export default function IntelligenceBanner() {
  const [ref, visible] = useScrollReveal(0.15)

  const pills = [
    { icon: ShieldCheck, label: 'Assinatura Digital',  sub: 'Validade jurídica',    color: '#2BBFB3' },
    { icon: MapPin,      label: 'Controle via GPS',    sub: 'Geolocalização real',  color: '#52C48A' },
    { icon: Barcode,     label: 'Bipagem EAN-13',      sub: 'Checagem de med.',     color: '#4DD9CE' },
  ]

  return (
    <section ref={ref} className={`relative overflow-hidden py-0 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
      {/* Full-bleed dark background */}
      <div className="bg-[#060f18] relative">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/8 rounded-full blur-[120px] animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green/6 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        </div>
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(43,191,179,1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,191,179,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container-max relative z-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT: text */}
            <div>
              <div className="section-tag mb-6">
                <Fingerprint size={13} /> Tecnologia de Ponta
              </div>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-white leading-[1.1] mb-6">
                Inteligência e Auditoria<br />
                na Palma da{' '}
                <span className="bg-aura-grad bg-clip-text text-transparent">sua Mão.</span>
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-lg">
                Gestão completa com <strong className="text-teal-light">bipagem de medicamentos</strong>, 
                geolocalização de equipes e <strong className="text-teal-light">validade jurídica</strong> para 
                sua operação de Home Care.
              </p>

              {/* Feature pills */}
              <div className="flex flex-col gap-4 mb-10">
                {pills.map(({ icon: Icon, label, sub, color }) => (
                  <div key={label} className="flex items-center gap-4 p-4 bg-white/4 border border-white/8 rounded-2xl hover:border-teal/30 hover:bg-white/6 transition-all group">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-white text-sm">{label}</div>
                      <div className="text-white/40 text-xs mt-0.5">{sub}</div>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{ background: color }} />
                  </div>
                ))}
              </div>

              <Link to="/contato"
                className="inline-flex items-center gap-2 bg-aura-grad text-white font-display font-bold px-8 py-4 rounded-xl shadow-teal hover:shadow-teal-lg hover:-translate-y-1 transition-all">
                Quero essa tecnologia <ChevronRight size={16} />
              </Link>
            </div>

            {/* RIGHT: 3 mockups */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Barcode scanner */}
              <div className="bg-white/4 border border-white/8 rounded-2xl p-5 hover:border-teal/30 transition-all">
                <div className="text-teal text-xs font-bold mb-3 flex items-center gap-2">
                  <Barcode size={13} /> Bipagem EAN-13
                </div>
                <BarcodeScan />
                <div className="mt-4 p-2.5 bg-green/10 border border-green/20 rounded-xl">
                  <div className="text-green text-[10px] font-bold">✓ Medicamento Verificado</div>
                  <div className="text-white/40 text-[9px] mt-0.5">Metformina 850mg · Lote: 2024A</div>
                </div>
              </div>

              {/* GPS */}
              <div className="bg-white/4 border border-white/8 rounded-2xl p-5 hover:border-teal/30 transition-all">
                <div className="text-teal text-xs font-bold mb-3 flex items-center gap-2">
                  <MapPin size={13} /> GPS em Tempo Real
                </div>
                <GpsMockup />
                <div className="mt-3 p-2.5 bg-teal/10 border border-teal/20 rounded-xl">
                  <div className="text-teal text-[10px] font-bold">✓ 4 Profissionais Ativos</div>
                  <div className="text-white/40 text-[9px] mt-0.5">Rastreamento 24/7</div>
                </div>
              </div>

              {/* Assinatura digital */}
              <div className="sm:col-span-2 bg-white/4 border border-white/8 rounded-2xl p-5 hover:border-teal/30 transition-all flex gap-6 items-center">
                <SignatureMockup />
                <div>
                  <div className="text-teal text-xs font-bold mb-2 flex items-center gap-2">
                    <ShieldCheck size={13} /> Assinatura Digital
                  </div>
                  <div className="text-white font-display font-bold text-sm mb-1">Validade Jurídica Total</div>
                  <div className="text-white/40 text-xs leading-relaxed">
                    Prontuários, evoluções e prescrições assinados digitalmente com certificado ICP-Brasil. 
                    Aceito por planos de saúde e CFM.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
