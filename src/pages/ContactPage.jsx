import React, { useState } from 'react'
import { Mail, Phone, MapPin, MessageCircle, Clock, Send, CheckCircle, ChevronRight } from 'lucide-react'

const CHANNELS = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '(61) 99251-0045',
    sub: 'Resposta em minutos',
    color: '#25D366',
    bg: 'rgba(37,211,102,0.1)',
    href: 'https://wa.me/5561992510045',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'contato@aurahomecare.com.br',
    sub: 'Resposta em até 2h úteis',
    color: '#2BBFB3',
    bg: 'rgba(43,191,179,0.1)',
    href: 'mailto:contato@aurahomecare.com.br',
  },
  {
    icon: Clock,
    label: 'Horário de atendimento',
    value: 'Seg–Sex, 8h às 18h',
    sub: 'Suporte Enterprise 24/7',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
    href: null,
  },
]

const PLANS_QUICK = ['Starter — R$197/mês', 'Professional — R$497/mês', 'Enterprise — R$997/mês', 'Não sei ainda']

export default function ContactPage() {
  const [form, setForm] = useState({
    nome: '', empresa: '', email: '', telefone: '',
    pacientes: '', plano: '', mensagem: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.nome.trim())    e.nome    = 'Nome obrigatório'
    if (!form.email.trim())   e.email   = 'E-mail obrigatório'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'E-mail inválido'
    if (!form.telefone.trim()) e.telefone = 'Telefone obrigatório'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Mailto fallback
    const subject = encodeURIComponent(`Demo Aura Homecare — ${form.nome} (${form.empresa})`)
    const body = encodeURIComponent(
      `Nome: ${form.nome}\nEmpresa: ${form.empresa}\nE-mail: ${form.email}\nTelefone: ${form.telefone}\nPacientes: ${form.pacientes}\nPlano de interesse: ${form.plano}\n\nMensagem:\n${form.mensagem}`
    )
    setTimeout(() => {
      window.location.href = `mailto:contato@aurahomecare.com.br?subject=${subject}&body=${body}`
      setLoading(false)
      setSent(true)
    }, 800)
  }

  const inputCls = (field) =>
    `w-full px-4 py-3 bg-gray-50 border rounded-xl text-navy text-sm outline-none transition-all font-body placeholder-gray-300 ${
      errors[field]
        ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 focus:border-teal focus:ring-2 focus:ring-teal/10 focus:bg-white'
    }`

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      {/* Header */}
      <div className="bg-dark-grad relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage:'radial-gradient(circle at 25% 60%, #2BBFB3, transparent 50%), radial-gradient(circle at 75% 40%, #52C48A, transparent 50%)' }} />
        <div className="container-max py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/25 text-teal-light text-xs font-bold px-4 py-2 rounded-full mb-6">
            📩 Entre em Contato
          </div>
          <h1 className="font-display font-black text-4xl lg:text-5xl text-white mb-5 leading-tight">
            Pronto para transformar<br />
            <span className="bg-aura-grad bg-clip-text text-transparent">seu homecare?</span>
          </h1>
          <p className="text-white/55 text-lg max-w-lg mx-auto">
            Solicite uma demonstração gratuita. Nossa equipe responde em até 2 horas nos dias úteis.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" preserveAspectRatio="none">
            <path d="M0 40L1440 40L1440 10C1200 40 900 0 720 10C540 20 240 0 0 10Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div className="container-max py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT: channels */}
          <div className="flex flex-col gap-6">
            {CHANNELS.map(({ icon: Icon, label, value, sub, color, bg, href }) => (
              <div key={label}>
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer"
                    className="flex items-center gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:border-teal/30 hover:bg-teal-soft/30 hover:-translate-y-0.5 transition-all group">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background: bg }}>
                      <Icon size={22} style={{ color }} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-navy text-sm mb-0.5">{label}</div>
                      <div className="text-gray-600 text-sm font-medium">{value}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{sub}</div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: bg }}>
                      <Icon size={22} style={{ color }} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-navy text-sm mb-0.5">{label}</div>
                      <div className="text-gray-600 text-sm font-medium">{value}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{sub}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a href="https://wa.me/5561992510045" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white font-display font-bold rounded-2xl hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl">
              <MessageCircle size={20} /> Chamar no WhatsApp
            </a>

            {/* FAQ mini */}
            <div className="p-5 bg-teal-soft rounded-2xl border border-teal/15">
              <div className="font-display font-bold text-teal-dark text-sm mb-3">❓ Perguntas rápidas</div>
              {[
                ['Tem período de teste?', '14 dias grátis sem cartão'],
                ['Funciona no celular?', 'App iOS e Android incluído'],
                ['Meus dados são seguros?', 'Criptografia + backup diário'],
              ].map(([q, a]) => (
                <div key={q} className="mb-3 last:mb-0">
                  <div className="text-navy text-xs font-bold">{q}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 gap-6">
                <div className="w-20 h-20 rounded-full bg-teal-soft flex items-center justify-center">
                  <CheckCircle size={40} className="text-teal" />
                </div>
                <div>
                  <h2 className="font-display font-black text-2xl text-navy mb-2">Mensagem enviada! 🎉</h2>
                  <p className="text-gray-500">Entraremos em contato em até 2 horas nos dias úteis.</p>
                </div>
                <button onClick={() => setSent(false)}
                  className="inline-flex items-center gap-2 border-2 border-teal text-teal font-display font-bold px-6 py-3 rounded-xl hover:bg-teal/5 transition-all">
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="bg-white border border-gray-100 rounded-3xl p-8 shadow-card">
                <h2 className="font-display font-black text-2xl text-navy mb-1">Solicite uma demonstração</h2>
                <p className="text-gray-400 text-sm mb-8">Preencha o formulário e falaremos em breve.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Nome completo *</label>
                    <input className={inputCls('nome')} placeholder="Seu nome" value={form.nome} onChange={e => set('nome', e.target.value)} />
                    {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Empresa</label>
                    <input className={inputCls('empresa')} placeholder="Nome da empresa" value={form.empresa} onChange={e => set('empresa', e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">E-mail *</label>
                    <input type="email" className={inputCls('email')} placeholder="seu@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Telefone / WhatsApp *</label>
                    <input className={inputCls('telefone')} placeholder="(00) 00000-0000" value={form.telefone} onChange={e => set('telefone', e.target.value)} />
                    {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Quantos pacientes?</label>
                    <select className={inputCls('pacientes')} value={form.pacientes} onChange={e => set('pacientes', e.target.value)}>
                      <option value="">Selecione...</option>
                      <option>Até 30 pacientes</option>
                      <option>31 a 100 pacientes</option>
                      <option>Mais de 100 pacientes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Plano de interesse</label>
                    <select className={inputCls('plano')} value={form.plano} onChange={e => set('plano', e.target.value)}>
                      <option value="">Selecione...</option>
                      {PLANS_QUICK.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Mensagem (opcional)</label>
                  <textarea className={inputCls('mensagem')} rows={4} placeholder="Conte sobre sua operação, dúvidas ou necessidades específicas..."
                    value={form.mensagem} onChange={e => set('mensagem', e.target.value)} />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-aura-grad text-white font-display font-bold text-base rounded-xl flex items-center justify-center gap-3 shadow-teal hover:shadow-teal-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none">
                  {loading ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Enviando...</>
                  ) : (
                    <><Send size={18} /> 🚀 Solicitar Demonstração Gratuita</>
                  )}
                </button>
                <p className="text-center text-gray-300 text-xs mt-3">Ao enviar, você concorda com nossa Política de Privacidade</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
