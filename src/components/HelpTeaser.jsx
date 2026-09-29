import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ArrowRight, BookOpen, MapPin, UsersRound, ShieldCheck, QrCode } from 'lucide-react'
import { Reveal, SectionHeader, SpotlightCard } from './ui'

// Atalhos para artigos da Central de Ajuda (ids em src/data/help.json)
const POPULAR = [
  { id: 13,  icon: MapPin,      title: 'Check-in e check-out', desc: 'Como a presença do profissional é registrada' },
  { id: 26,  icon: UsersRound,  title: 'Portal do responsável', desc: 'O que o responsável acompanha pelo portal' },
  { id: 101, icon: ShieldCheck, title: 'Assinatura digital', desc: 'Imagem ou certificado ICP-Brasil A1' },
  { id: 100, icon: QrCode,      title: 'QR code de validação', desc: 'Como conferir a autenticidade dos documentos' },
]

export default function HelpTeaser() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const submit = (e) => { e.preventDefault(); navigate(q.trim() ? `/ajuda?q=${encodeURIComponent(q.trim())}` : '/ajuda') }

  return (
    <section id="ajuda" className="section-pad bg-white">
      <div className="container-max">
        <SectionHeader
          tag={<><BookOpen size={13} /> Central de Ajuda</>}
          title={<>Entenda o sistema <span className="gradient-text">antes de falar com a gente</span></>}
          subtitle="Mais de 50 artigos explicando, passo a passo, como cada funcionalidade funciona."
          className="!mb-10"
        />

        <Reveal as="form" onSubmit={submit} className="relative max-w-2xl mx-auto">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input value={q} onChange={e => setQ(e.target.value)} type="search" aria-label="Buscar na central de ajuda"
            placeholder="Ex.: check-in, receita azul, portal do responsável…"
            className="w-full pl-14 pr-32 py-4 rounded-2xl bg-gray-50 border border-gray-200 text-navy outline-none focus:bg-white focus:border-teal focus:ring-4 focus:ring-teal/10 transition-all" />
          <button type="submit" className="btn-primary absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 text-sm">Buscar</button>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {POPULAR.map(({ id, icon: Icon, title, desc }, i) => (
            <Reveal key={id} delay={i * 80}>
              <SpotlightCard as={Link} to={`/ajuda?artigo=${id}`}
                className="h-full flex flex-col p-5 bg-white border border-gray-100 rounded-2xl hover:border-teal/30 hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300 group">
                <span className="w-10 h-10 rounded-xl bg-teal-soft text-teal-dark flex items-center justify-center mb-4 group-hover:bg-aura-grad group-hover:text-white group-hover:scale-110 transition-all duration-300"><Icon size={18} /></span>
                <span className="font-display font-bold text-navy">{title}</span>
                <span className="text-gray-500 text-sm mt-1 flex-1">{desc}</span>
                <span className="text-teal-dark text-sm font-semibold mt-4 inline-flex items-center gap-1.5">
                  Ler artigo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-10">
          <Link to="/ajuda" className="btn-ghost group">
            Ver todos os artigos <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
