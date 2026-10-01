import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Search, X, ChevronDown, Link2, Check, Lightbulb, TriangleAlert, BookOpen, MonitorPlay, MessagesSquare,
  Zap, CalendarDays, UsersRound, FileText, Wrench, Pill, LineChart, Calculator, Printer, Contact, Building2, ShieldCheck, Scale,
} from 'lucide-react'
import help from '../data/help.json'
import { Reveal } from '../components/ui'
import { WHATSAPP_URL } from '../config'

const CAT_ICONS = {
  'primeiros-passos': Zap, agenda: CalendarDays, pacientes: UsersRound, prescricoes: FileText,
  'materiais-exames': Wrench, farmacia: Pill, indicadores: LineChart, orcamentos: Calculator,
  relatorios: Printer, cracha: Contact, operadoras: Building2, seguranca: ShieldCheck, legal: Scale,
}
const CATS = help.categories
const CAT_BY_ID = Object.fromEntries(CATS.map(c => [c.id, c]))

// Busca sem diferenciar acentos e maiúsculas
const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const ARTICLES = help.articles.map(a => ({
  ...a,
  index: norm([a.title, a.summary, ...a.blocks.flatMap(b => (Array.isArray(b.v) ? b.v : [b.v]))].join(' ')),
}))

const POPULAR = [13, 26, 101, 1, 122, 100]

function Highlight({ text, terms }) {
  if (!terms.length) return text
  const n = norm(text)
  const marks = new Array(text.length).fill(false)
  terms.forEach(t => {
    let i = n.indexOf(t)
    while (t && i !== -1) { for (let k = i; k < i + t.length; k++) marks[k] = true; i = n.indexOf(t, i + t.length) }
  })
  const out = []
  let start = 0
  for (let i = 1; i <= text.length; i++) {
    if (i === text.length || marks[i] !== marks[start]) {
      const chunk = text.slice(start, i)
      out.push(marks[start] ? <mark key={start} className="bg-teal/20 text-inherit rounded px-0.5">{chunk}</mark> : chunk)
      start = i
    }
  }
  return out
}

function Block({ b }) {
  if (b.t === 'p') return <p className="text-gray-600 text-[15px] leading-relaxed">{b.v}</p>
  if (b.t === 'ul') return (
    <ul className="flex flex-col gap-2">
      {b.v.map((li, i) => (
        <li key={i} className="flex gap-3 text-gray-600 text-[15px] leading-relaxed">
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
          <span>{li}</span>
        </li>
      ))}
    </ul>
  )
  const tip = b.t === 'dica'
  const Icon = tip ? Lightbulb : TriangleAlert
  return (
    <div className={`flex gap-3 rounded-xl px-4 py-3 text-sm leading-relaxed border ${tip ? 'bg-teal-soft/70 border-teal/20 text-teal-dark' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
      <Icon size={17} className="flex-shrink-0 mt-0.5" />
      <span>{b.v}</span>
    </div>
  )
}

function Article({ a, open, onToggle, terms }) {
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)
  const cat = CAT_BY_ID[a.cat]
  const Icon = CAT_ICONS[a.cat] || BookOpen

  const copy = async (e) => {
    e.stopPropagation()
    const url = `${window.location.origin}/ajuda?artigo=${a.id}`
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* sem permissão */ }
  }

  return (
    <div ref={ref} id={`artigo-${a.id}`}
      className={`rounded-2xl border bg-white transition-all duration-300 scroll-mt-28 ${open ? 'border-teal/40 shadow-card-lg' : 'border-gray-100 hover:border-teal/25 hover:shadow-card'}`}>
      <button onClick={onToggle} aria-expanded={open} className="w-full flex items-center gap-4 p-4 sm:p-5 text-left group">
        <span className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open ? 'bg-aura-grad text-white rotate-3' : 'bg-teal-soft text-teal-dark group-hover:scale-110'}`}>
          <Icon size={18} />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block font-display font-bold text-navy text-[15px] leading-snug"><Highlight text={a.title} terms={terms} /></span>
          <span className="block text-gray-500 text-[13px] mt-0.5 sm:truncate"><Highlight text={a.summary} terms={terms} /></span>
        </span>
        <span className="hidden md:inline text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full whitespace-nowrap">{cat?.label}</span>
        <ChevronDown size={18} className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180 text-teal' : ''}`} />
      </button>
      <div className={`grid transition-all duration-500 ease-out-expo ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-4 sm:px-5 pb-5 sm:pl-[4.75rem] flex flex-col gap-3.5 border-t border-gray-100 pt-4 mx-4 sm:mx-0 sm:border-0 sm:pt-0">
            {a.blocks.map((b, i) => <Block key={i} b={b} />)}
            <button onClick={copy} tabIndex={open ? 0 : -1}
              className="self-start inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-teal-dark transition-colors mt-1">
              {copied ? <><Check size={13} className="text-teal" /> Link copiado</> : <><Link2 size={13} /> Copiar link do artigo</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HelpPage() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const cat = params.get('cat') || 'todos'
  const openId = Number(params.get('artigo')) || null
  const inputRef = useRef(null)

  const update = (patch) => {
    const next = new URLSearchParams(params)
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)))
    setParams(next, { replace: true })
  }

  // Mantém a busca na URL sem registrar cada tecla no histórico
  useEffect(() => {
    const t = setTimeout(() => { if ((params.get('q') || '') !== query) update({ q: query.trim() || null }) }, 250)
    return () => clearTimeout(t)
  }, [query]) // eslint-disable-line react-hooks/exhaustive-deps

  // Atalho "/" para focar a busca
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault(); inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Link direto para um artigo: rola até ele
  useEffect(() => {
    if (!openId) return
    const t = setTimeout(() => document.getElementById(`artigo-${openId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350)
    return () => clearTimeout(t)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const terms = useMemo(() => norm(query).split(/\s+/).filter(t => t.length > 1), [query])
  const results = useMemo(() => ARTICLES.filter(a =>
    (cat === 'todos' || a.cat === cat) && terms.every(t => a.index.includes(t))
  ), [cat, terms])
  const counts = useMemo(() => Object.fromEntries(CATS.map(c => [c.id, ARTICLES.filter(a => a.cat === c.id).length])), [])

  const setCat = (id) => update({ cat: id === 'todos' ? null : id, artigo: null })
  const toggle = (id) => update({ artigo: openId === id ? null : String(id) })

  const CatButton = ({ id, label, Icon, n }) => (
    <button onClick={() => setCat(id)}
      className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
        cat === id ? 'bg-navy text-white shadow-card' : 'text-gray-600 hover:bg-gray-100 hover:text-navy'
      }`}>
      <Icon size={16} className={cat === id ? 'text-teal' : 'text-gray-400'} />
      <span className="flex-1 text-left">{label}</span>
      <span className={`text-[11px] font-bold ${cat === id ? 'text-white/60' : 'text-gray-400'}`}>{n}</span>
    </button>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-dark-grad relative overflow-hidden pt-[76px] noise">
        <div className="absolute inset-0 bg-hero-mesh pointer-events-none" />
        <div className="absolute -top-10 left-[15%] w-80 h-80 bg-teal/10 rounded-full blur-[100px] animate-float-slow pointer-events-none" />
        <div className="container-max relative z-10 pt-14 pb-24 lg:pt-16 lg:pb-28 text-center">
          <div className="section-tag-dark animate-fade-up"><BookOpen size={13} /> Central de Ajuda</div>
          <h1 className="font-display font-black text-[2.2rem] sm:text-5xl text-white mt-6 leading-[1.1] tracking-tight animate-fade-up" style={{ animationDelay: '100ms' }}>
            Como podemos <span className="gradient-text">ajudar?</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mt-4 animate-fade-up" style={{ animationDelay: '180ms' }}>
            {ARTICLES.length} artigos explicando, passo a passo, como o sistema funciona.
          </p>

          <div className="relative max-w-2xl mx-auto mt-9 animate-fade-up" style={{ animationDelay: '260ms' }}>
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} type="search"
              placeholder="Busque por funcionalidade, dúvida ou módulo…" aria-label="Buscar na central de ajuda"
              className="w-full pl-14 pr-24 py-4 sm:py-5 rounded-2xl bg-white text-navy text-base shadow-[0_20px_60px_rgba(0,0,0,0.3)] outline-none focus:ring-4 focus:ring-teal/30 transition-shadow [&::-webkit-search-cancel-button]:hidden" />
            {query ? (
              <button onClick={() => { setQuery(''); inputRef.current?.focus() }} aria-label="Limpar busca"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-navy">
                <X size={16} />
              </button>
            ) : (
              <kbd className="hidden sm:flex absolute right-5 top-1/2 -translate-y-1/2 items-center text-xs font-semibold text-gray-400 border border-gray-200 rounded-md px-2 py-0.5">/</kbd>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-5 animate-fade-up" style={{ animationDelay: '340ms' }}>
            {['check-in', 'assinatura digital', 'portal do responsável', 'receita', 'QR code'].map(s => (
              <button key={s} onClick={() => setQuery(s)}
                className="text-xs font-semibold text-white/70 bg-white/[0.07] border border-white/10 hover:border-teal/40 hover:text-white px-3 py-1.5 rounded-full transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 leading-[0]">
          <svg viewBox="0 0 1440 60" className="w-full h-[40px] sm:h-[60px]" fill="none" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 20C1200 60 900 0 720 20C540 40 240 0 0 20Z" fill="#F9FAFB" />
          </svg>
        </div>
      </header>

      <div className="container-max py-12 lg:py-16">
        {/* Populares (só na tela inicial) */}
        {!terms.length && cat === 'todos' && !openId && (
          <Reveal className="mb-12">
            <h2 className="font-display font-bold text-navy text-lg mb-4">Mais acessados</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {POPULAR.map(id => ARTICLES.find(a => a.id === id)).filter(Boolean).map(a => {
                const Icon = CAT_ICONS[a.cat] || BookOpen
                return (
                  <button key={a.id} onClick={() => toggle(a.id)}
                    className="group flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 text-left hover:border-teal/30 hover:shadow-card-lg hover:-translate-y-0.5 transition-all duration-300">
                    <span className="w-9 h-9 rounded-xl bg-teal-soft text-teal-dark flex items-center justify-center flex-shrink-0 group-hover:bg-aura-grad group-hover:text-white transition-colors"><Icon size={17} /></span>
                    <span>
                      <span className="block font-display font-bold text-navy text-sm leading-snug">{a.title}</span>
                      <span className="block text-gray-500 text-xs mt-1 line-clamp-2">{a.summary}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
          {/* Categorias */}
          <aside className="lg:sticky lg:top-24 min-w-0">
            <div className="hidden lg:flex flex-col gap-0.5 bg-white rounded-2xl border border-gray-100 p-2.5">
              <CatButton id="todos" label="Todos" Icon={BookOpen} n={ARTICLES.length} />
              {CATS.map(c => <CatButton key={c.id} id={c.id} label={c.label} Icon={CAT_ICONS[c.id] || BookOpen} n={counts[c.id]} />)}
            </div>
            <div className="lg:hidden flex gap-2 overflow-x-auto -mx-5 px-5 pb-1 [scrollbar-width:none]">
              {[{ id: 'todos', label: 'Todos' }, ...CATS].map(c => (
                <button key={c.id} onClick={() => setCat(c.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    cat === c.id ? 'bg-navy text-white border-navy' : 'bg-white text-gray-600 border-gray-200'
                  }`}>
                  {c.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Artigos */}
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-4 mb-4 text-sm text-gray-500">
              <span aria-live="polite">
                {terms.length
                  ? <><b className="text-navy">{results.length}</b> resultado{results.length !== 1 && 's'} para “{query.trim()}”</>
                  : <><b className="text-navy">{results.length}</b> artigo{results.length !== 1 && 's'}{cat !== 'todos' && <> em <b className="text-navy">{CAT_BY_ID[cat]?.label}</b></>}</>}
              </span>
              {(terms.length > 0 || cat !== 'todos') && (
                <button onClick={() => { setQuery(''); update({ q: null, cat: null, artigo: null }) }} className="text-teal-dark font-semibold hover:underline">
                  Limpar filtros
                </button>
              )}
            </div>

            {results.length ? (
              <div key={`${cat}-${terms.join('+')}`} className="flex flex-col gap-3">
                {results.map((a, i) => (
                  <div key={a.id} className="animate-swap-in" style={{ animationDelay: `${Math.min(i, 10) * 35}ms` }}>
                    <Article a={a} open={openId === a.id} onToggle={() => toggle(a.id)} terms={terms} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center bg-white rounded-2xl border border-gray-100 py-16 px-6 animate-swap-in">
                <div className="w-14 h-14 rounded-2xl bg-teal-soft text-teal mx-auto flex items-center justify-center mb-4"><Search size={24} /></div>
                <p className="font-display font-bold text-navy">Nenhum artigo encontrado</p>
                <p className="text-gray-500 text-sm mt-1">Tente outras palavras ou fale com a gente.</p>
              </div>
            )}

            {/* Não encontrou */}
            <Reveal className="mt-12 relative overflow-hidden rounded-3xl bg-dark-grad p-7 sm:p-9 noise">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-teal/20 rounded-full blur-[80px]" />
              <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="font-display font-black text-white text-xl sm:text-2xl">Não encontrou o que procurava?</h3>
                  <p className="text-white/55 mt-2">Agende uma apresentação do sistema ou fale diretamente com a nossa equipe.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/contato" className="btn-primary"><MonitorPlay size={17} /> Agendar apresentação</Link>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn-glass"><MessagesSquare size={17} className="text-teal" /> Falar com a equipe</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}
