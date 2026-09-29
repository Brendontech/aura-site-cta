import React, { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Mail, MessageCircle, Clock, Send, CheckCircle2, ChevronDown, MonitorPlay, ArrowUpRight, Loader2, Lock, Sparkles } from 'lucide-react'
import { Reveal, SpotlightCard } from '../components/ui'
import { CONTACT_EMAIL, DEMO_URL, WHATSAPP_TXT, WHATSAPP_URL } from '../config'
import { sendLead } from '../lib/sendLead'
import { PLANS } from '../data/plans'

const CHANNELS = [
  { icon: MessageCircle, label: 'WhatsApp', value: WHATSAPP_TXT, sub: 'O jeito mais rápido de falar com a gente', color: '#25D366', href: WHATSAPP_URL },
  { icon: Mail, label: 'E-mail', value: CONTACT_EMAIL, sub: 'Para propostas e dúvidas detalhadas', color: '#2BBFB3', href: `mailto:${CONTACT_EMAIL}` },
  { icon: Clock, label: 'Horário de atendimento', value: 'Seg–Sex, 8h às 18h', sub: 'Horário de Brasília', color: '#8b5cf6', href: null },
]

const FAQ = [
  ['Posso ver o sistema antes de contratar?', 'Sim. A demo é aberta: você entra no sistema e navega pelos módulos e pelo prontuário. É um ambiente só de visualização, então nada é criado ou alterado.'],
  ['Como funciona o check-in e check-out?', 'Próximo à residência, o profissional faz o check-in e o sistema registra a distância até o endereço do paciente. No check-out, o mesmo. Assim o faturamento sabe se a visita realmente aconteceu.'],
  ['Como o responsável assina os documentos?', 'Você cadastra o responsável e envia o login por e-mail ou WhatsApp. Ele acessa o portal, vê os documentos pendentes e assina pelo próprio sistema.'],
  ['Meus dados ficam seguros?', 'Sim. Os dados de cada empresa ficam isolados, a comunicação é criptografada (HTTPS/TLS) e os dados de saúde são tratados como dados sensíveis, conforme a LGPD.'],
  ['Consigo limitar o que cada profissional acessa?', 'Sim, em duas camadas: por módulo do sistema e, dentro do prontuário, por paciente vinculado ao profissional.'],
]

const PLANS_QUICK = [...PLANS.map(p => p.name), 'Ainda não sei']
const CICLOS = ['Mensal', 'Anual']
const EMPTY = { nome: '', empresa: '', email: '', telefone: '', pacientes: '', plano: '', ciclo: 'Mensal', mensagem: '' }

// Plano vindo da seção de preços (?plano=Enterprise&ciclo=anual)
function initialForm(params) {
  const plano = PLANS.find(p => p.name.toLowerCase() === (params.get('plano') || '').toLowerCase())
  return { ...EMPTY, plano: plano?.name || '', ciclo: params.get('ciclo') === 'anual' ? 'Anual' : 'Mensal' }
}

function maskPhone(v) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function validate(form) {
  const e = {}
  if (!form.nome.trim()) e.nome = 'Informe seu nome'
  if (!form.email.trim()) e.email = 'Informe seu e-mail'
  else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'E-mail inválido'
  if (form.telefone.replace(/\D/g, '').length < 10) e.telefone = 'Informe um telefone com DDD'
  return e
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{label}</span>
      {children}
      <span className={`block text-red-500 text-xs overflow-hidden transition-all duration-300 ${error ? 'max-h-6 mt-1.5 opacity-100' : 'max-h-0 opacity-0'}`}>{error}</span>
    </label>
  )
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className={`border-b border-teal/10 last:border-0`}>
      <button onClick={onToggle} aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-4 text-left text-navy text-sm font-bold hover:text-teal-dark transition-colors">
        {q}
        <ChevronDown size={16} className={`flex-shrink-0 text-teal transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-500 ease-out-expo ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="text-gray-500 text-sm leading-relaxed pb-4">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  const [params] = useSearchParams()
  const [form, setForm]       = useState(() => initialForm(params))
  const firstField = useRef(null)
  const selectedPlan = PLANS.find(p => p.name === form.plano)

  // Veio de um plano: já foca no primeiro campo
  useEffect(() => {
    if (!params.get('plano')) return
    const t = setTimeout(() => firstField.current?.focus({ preventScroll: true }), 700)
    return () => clearTimeout(t)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const [errors, setErrors]   = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus]   = useState('idle') // idle | sending | sent | error
  const [via, setVia]         = useState(null)
  const [faq, setFaq]         = useState(0)

  const set = (k, v) => {
    const next = { ...form, [k]: k === 'telefone' ? maskPhone(v) : v }
    setForm(next)
    if (touched[k]) setErrors(validate(next))
  }
  const blur = (k) => { setTouched(t => ({ ...t, [k]: true })); setErrors(validate(form)) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    setTouched({ nome: true, email: true, telefone: true })
    if (Object.keys(errs).length) return
    setStatus('sending')
    try {
      const res = await sendLead({ ...form, ciclo: selectedPlan ? form.ciclo : '' }, `Demonstração Sanyti — ${form.nome}${form.empresa ? ` (${form.empresa})` : ''}`)
      setVia(res.via)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const inputCls = (field) =>
    `w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-navy text-[15px] outline-none transition-all duration-200 font-body placeholder-gray-400 ${
      errors[field] && touched[field]
        ? 'border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100'
        : 'border-gray-200 hover:border-gray-300 focus:border-teal focus:ring-4 focus:ring-teal/10 focus:bg-white'
    }`

  return (
    <div className="bg-white">
      {/* Cabeçalho escuro — começa atrás da navbar */}
      <header className="bg-dark-grad relative overflow-hidden pt-[76px] noise">
        <div className="absolute inset-0 bg-hero-mesh pointer-events-none" />
        <div className="absolute top-10 right-[10%] w-80 h-80 bg-teal/10 rounded-full blur-[100px] animate-float-slow pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(43,191,179,1) 1px, transparent 1px), linear-gradient(90deg, rgba(43,191,179,1) 1px, transparent 1px)', backgroundSize: '64px 64px', maskImage: 'radial-gradient(ellipse at 50% 40%, #000 20%, transparent 70%)' }} />
        <div className="container-max pt-16 pb-28 lg:pt-20 lg:pb-32 relative z-10 text-center">
          <div className="section-tag-dark animate-fade-up">Entre em contato</div>
          <h1 className="font-display font-black text-[2.4rem] sm:text-5xl lg:text-[3.4rem] text-white mt-6 leading-[1.08] tracking-tight animate-fade-up" style={{ animationDelay: '100ms' }}>
            Pronto para transformar<br />
            <span className="gradient-text">seu Home Care?</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mt-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
            Solicite uma apresentação com a nossa equipe ou explore a demo agora mesmo.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 leading-[0]">
          <svg viewBox="0 0 1440 60" className="w-full h-[40px] sm:h-[60px]" fill="none" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 20C1200 60 900 0 720 20C540 40 240 0 0 20Z" fill="white" />
          </svg>
        </div>
      </header>

      <div className="container-max relative z-10 -mt-12 lg:-mt-16 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-10 items-start">

          {/* Formulário (primeiro no mobile) */}
          <Reveal variant="up" className="lg:order-2">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-[0_30px_80px_rgba(13,27,42,0.12)]">
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center text-center py-14 gap-5 animate-swap-in">
                  <div className="relative w-20 h-20 rounded-full bg-teal-soft flex items-center justify-center text-teal">
                    <span className="absolute inset-0 rounded-full bg-teal/20 animate-ping-slow" />
                    <CheckCircle2 size={40} className="relative" />
                  </div>
                  <div>
                    <h2 className="font-display font-black text-2xl text-navy">
                      {via === 'mailto' ? 'Quase lá!' : 'Mensagem enviada!'}
                    </h2>
                    <p className="text-gray-500 mt-2 max-w-sm">
                      {via === 'mailto'
                        ? 'Abrimos seu aplicativo de e-mail com a mensagem pronta. É só clicar em enviar.'
                        : 'Recebemos seus dados e entraremos em contato em breve.'}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <a href={DEMO_URL} target="_blank" rel="noreferrer" className="btn-primary">
                      <MonitorPlay size={17} /> Explorar a demo enquanto isso
                    </a>
                    <button onClick={() => { setForm({ ...EMPTY, plano: form.plano, ciclo: form.ciclo }); setTouched({}); setErrors({}); setStatus('idle') }}
                      className="btn-ghost justify-center">
                      Enviar outra
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="font-display font-black text-2xl sm:text-[1.7rem] text-navy">Solicite uma apresentação</h2>
                  <p className="text-gray-500 text-[15px] mt-1.5 mb-9">Preencha os dados e falaremos com você em breve.</p>

                  {selectedPlan && (
                    <div key={selectedPlan.name + form.ciclo} className="mb-8 relative overflow-hidden flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-dark-grad text-white animate-swap-in">
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal/25 rounded-full blur-3xl" />
                      <div className="relative w-11 h-11 rounded-xl bg-aura-grad flex items-center justify-center flex-shrink-0 shadow-teal"><Sparkles size={20} /></div>
                      <div className="relative flex-1">
                        <div className="text-white/55 text-xs font-semibold uppercase tracking-wider">Plano selecionado</div>
                        <div className="font-display font-bold text-lg leading-tight mt-0.5">
                          {selectedPlan.name} <span className="text-teal-light">· R$ {form.ciclo === 'Anual' ? selectedPlan.annual : selectedPlan.monthly}/mês</span>
                        </div>
                      </div>
                      <div className="relative inline-flex bg-white/10 rounded-xl p-1 self-start sm:self-center">
                        {CICLOS.map(c => (
                          <button type="button" key={c} onClick={() => set('ciclo', c)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${form.ciclo === c ? 'bg-white text-navy' : 'text-white/70 hover:text-white'}`}>
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
                    <Field label="Nome completo *" error={touched.nome && errors.nome}>
                      <input ref={firstField} className={inputCls('nome')} placeholder="Seu nome" autoComplete="name" value={form.nome}
                        onChange={e => set('nome', e.target.value)} onBlur={() => blur('nome')} />
                    </Field>
                    <Field label="Empresa">
                      <input className={inputCls('empresa')} placeholder="Nome da empresa" autoComplete="organization" value={form.empresa}
                        onChange={e => set('empresa', e.target.value)} />
                    </Field>
                    <Field label="E-mail *" error={touched.email && errors.email}>
                      <input type="email" className={inputCls('email')} placeholder="seu@email.com" autoComplete="email" value={form.email}
                        onChange={e => set('email', e.target.value)} onBlur={() => blur('email')} />
                    </Field>
                    <Field label="Telefone / WhatsApp *" error={touched.telefone && errors.telefone}>
                      <input type="tel" inputMode="tel" className={inputCls('telefone')} placeholder="(00) 00000-0000" autoComplete="tel" value={form.telefone}
                        onChange={e => set('telefone', e.target.value)} onBlur={() => blur('telefone')} />
                    </Field>
                    <Field label="Quantos pacientes?">
                      <select className={inputCls('pacientes')} value={form.pacientes} onChange={e => set('pacientes', e.target.value)}>
                        <option value="">Selecione...</option>
                        <option>Até 30 pacientes</option>
                        <option>31 a 100 pacientes</option>
                        <option>Mais de 100 pacientes</option>
                      </select>
                    </Field>
                    <Field label="Plano de interesse">
                      <select className={inputCls('plano')} value={form.plano} onChange={e => set('plano', e.target.value)}>
                        <option value="">Selecione...</option>
                        {PLANS_QUICK.map(p => <option key={p}>{p}</option>)}
                      </select>
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Mensagem (opcional)">
                        <textarea className={`${inputCls('mensagem')} resize-none`} rows={4}
                          placeholder="Conte sobre sua operação, dúvidas ou necessidades específicas..."
                          value={form.mensagem} onChange={e => set('mensagem', e.target.value)} />
                      </Field>
                    </div>
                  </div>

                  {status === 'error' && (
                    <p className="mt-5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 animate-swap-in">
                      Não conseguimos enviar agora. Tente novamente ou fale pelo{' '}
                      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="font-bold underline">WhatsApp</a>.
                    </p>
                  )}

                  <button type="submit" disabled={status === 'sending'}
                    className="btn-primary w-full mt-8 py-4 text-base disabled:opacity-60 disabled:cursor-wait disabled:hover:translate-y-0">
                    {status === 'sending'
                      ? <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                      : <><Send size={17} /> Solicitar apresentação</>}
                  </button>
                  <p className="text-center text-gray-400 text-xs mt-4 flex items-center justify-center gap-1.5">
                    <Lock size={11} /> Seus dados são usados apenas para entrarmos em contato.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* Canais + demo + FAQ */}
          <div className="flex flex-col gap-4 lg:order-1 lg:pt-16">
            <Reveal variant="left">
              <a href={DEMO_URL} target="_blank" rel="noreferrer"
                className="group relative block p-6 rounded-2xl bg-navy text-white overflow-hidden hover:-translate-y-1 hover:shadow-teal-lg transition-all duration-300">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal/25 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-aura-grad flex items-center justify-center shadow-teal flex-shrink-0 group-hover:rotate-6 transition-transform">
                    <MonitorPlay size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-bold flex items-center gap-1.5">
                      Prefere ver sozinho? <ArrowUpRight size={16} className="text-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <div className="text-white/55 text-sm mt-0.5">Explore a demo do sistema agora</div>
                  </div>
                </div>
              </a>
            </Reveal>

            {CHANNELS.map(({ icon: Icon, label, value, sub, color, href }, i) => {
              const inner = (
                <>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: `${color}1a`, color }}>
                    <Icon size={21} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-navy text-sm">{label}</div>
                    <div className="text-gray-700 text-sm font-medium mt-0.5 break-all">{value}</div>
                    <div className="text-gray-400 text-xs mt-0.5">{sub}</div>
                  </div>
                </>
              )
              const cls = 'flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl transition-all duration-300 group'
              return (
                <Reveal key={label} variant="left" delay={80 + i * 80}>
                  {href ? (
                    <SpotlightCard as="a" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                      className={`${cls} hover:border-teal/30 hover:shadow-card-lg hover:-translate-y-0.5`}>
                      {inner}
                    </SpotlightCard>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </Reveal>
              )
            })}

            <Reveal variant="left" delay={340}>
              <div className="p-6 bg-teal-soft/60 rounded-2xl border border-teal/15 mt-2">
                <div className="font-display font-bold text-teal-dark text-sm mb-1">Perguntas rápidas</div>
                {FAQ.map(([q, a], i) => (
                  <FaqItem key={q} q={q} a={a} open={faq === i} onToggle={() => setFaq(faq === i ? -1 : i)} />
                ))}
                <Link to="/ajuda" className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-dark hover:gap-2.5 transition-all mt-3">
                  Mais dúvidas? Veja a Central de Ajuda <ArrowUpRight size={14} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}
