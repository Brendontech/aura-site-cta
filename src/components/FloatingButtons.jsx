import React, { useEffect, useState } from 'react'
import { MessageCircle, Stethoscope, X, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { WHATSAPP_URL } from '../config'
import { sendLead } from '../lib/sendLead'

const inputCls = 'w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-navy outline-none focus:border-teal focus:ring-4 focus:ring-teal/10 focus:bg-white transition-all placeholder-gray-400 font-body'

export default function FloatingButtons() {
  const [open, setOpen]       = useState(false)
  const [form, setForm]       = useState({ nome: '', email: '', mensagem: '' })
  const [status, setStatus]   = useState('idle') // idle | sending | sent | error
  const [visible, setVisible] = useState(false)

  // Aparece depois que o visitante começa a rolar
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const valid = form.nome.trim() && /\S+@\S+\.\S+/.test(form.email) && form.mensagem.trim()

  const handleSend = async (e) => {
    e.preventDefault()
    if (!valid) return
    setStatus('sending')
    try {
      await sendLead(form, `Contato pelo site — ${form.nome}`)
      setStatus('sent')
      setTimeout(() => { setOpen(false); setStatus('idle'); setForm({ nome: '', email: '', mensagem: '' }) }, 2800)
    } catch {
      setStatus('error')
    }
  }

  const show = visible || open

  return (
    <>
      {/* Painel de mensagem */}
      <div className={`fixed bottom-[9.5rem] right-5 z-50 w-[calc(100vw-2.5rem)] max-w-[340px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(13,27,42,0.25)] border border-gray-100 overflow-hidden origin-bottom-right transition-all duration-300 ease-out-expo ${
        open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
      }`} aria-hidden={!open}>
        <div className="bg-aura-grad p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
              <Stethoscope size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-display font-bold text-sm">Fale com nossa equipe</p>
              <p className="text-white/75 text-xs">Retornamos o mais rápido possível</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Fechar" className="text-white/75 hover:text-white p-1.5 rounded-lg hover:bg-white/15 transition-colors">
            <X size={18} />
          </button>
        </div>
        {status === 'sent' ? (
          <div className="p-8 text-center animate-swap-in">
            <div className="w-14 h-14 rounded-full bg-teal-soft text-teal mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 size={28} />
            </div>
            <p className="font-display font-bold text-navy">Mensagem enviada!</p>
            <p className="text-gray-500 text-xs mt-1">Entraremos em contato em breve.</p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-4 flex flex-col gap-3">
            <input className={inputCls} placeholder="Seu nome" aria-label="Seu nome" value={form.nome}
              onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} tabIndex={open ? 0 : -1} />
            <input type="email" className={inputCls} placeholder="Seu e-mail" aria-label="Seu e-mail" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))} tabIndex={open ? 0 : -1} />
            <textarea rows={3} className={`${inputCls} resize-none`} placeholder="Sua mensagem..." aria-label="Sua mensagem" value={form.mensagem}
              onChange={e => setForm(f => ({ ...f, mensagem: e.target.value }))} tabIndex={open ? 0 : -1} />
            {status === 'error' && <p className="text-red-500 text-xs">Não foi possível enviar. Tente pelo WhatsApp.</p>}
            <button type="submit" disabled={!valid || status === 'sending'} tabIndex={open ? 0 : -1}
              className="btn-primary w-full text-sm py-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0">
              {status === 'sending' ? <><Loader2 size={15} className="animate-spin" /> Enviando...</> : <><Send size={14} /> Enviar mensagem</>}
            </button>
          </form>
        )}
      </div>

      {/* Botões flutuantes */}
      <div className={`fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 transition-all duration-500 ease-out-expo ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}>
        <div className="relative group">
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all whitespace-nowrap shadow-lg">
            Falar no WhatsApp
          </span>
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping-slow opacity-30 pointer-events-none" />
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp"
            className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
            <MessageCircle size={26} className="text-white" />
          </a>
        </div>

        <div className="relative group">
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all whitespace-nowrap shadow-lg">
            {open ? 'Fechar' : 'Enviar mensagem'}
          </span>
          <button onClick={() => setOpen(o => !o)} aria-label={open ? 'Fechar mensagem' : 'Enviar mensagem'} aria-expanded={open}
            className="w-14 h-14 rounded-full bg-aura-grad flex items-center justify-center shadow-teal hover:scale-110 hover:shadow-teal-lg transition-all duration-200">
            <span className={`transition-transform duration-300 ${open ? 'rotate-90' : ''}`}>
              {open ? <X size={24} className="text-white" /> : <Stethoscope size={24} className="text-white" />}
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
