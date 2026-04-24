import React, { useState } from 'react'
import { MessageCircle, Stethoscope, X, Send } from 'lucide-react'

export default function FloatingButtons() {
  const [panelOpen, setPanelOpen] = useState(false)
  const [form, setForm] = useState({ nome: '', email: '', msg: '' })
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    const { nome, email, msg } = form
    const subject = encodeURIComponent(`Contato via Aura Homecare — ${nome}`)
    const body    = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${msg}`)
    window.location.href = `mailto:contato@aurahomecare.com.br?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => { setSent(false); setPanelOpen(false); setForm({ nome:'', email:'', msg:'' }) }, 2500)
  }

  return (
    <>
      {/* Email panel */}
      {panelOpen && (
        <div className="fixed bottom-36 right-5 z-50 w-80 bg-white rounded-2xl shadow-card-lg border border-gray-100 overflow-hidden animate-slide-up">
          <div className="bg-aura-grad p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <Stethoscope size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-display font-bold text-sm">Fale com nossa equipe</p>
                <p className="text-white/70 text-xs">Respondemos em até 2h</p>
              </div>
            </div>
            <button onClick={() => setPanelOpen(false)} className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
              <X size={18} />
            </button>
          </div>
          {sent ? (
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-display font-bold text-navy text-sm">Mensagem enviada!</p>
              <p className="text-gray-400 text-xs mt-1">Entraremos em contato em breve.</p>
            </div>
          ) : (
            <div className="p-4 flex flex-col gap-3">
              <input
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-navy outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition-all placeholder-gray-400 font-body"
                placeholder="Seu nome" value={form.nome}
                onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
              />
              <input
                type="email"
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-navy outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition-all placeholder-gray-400 font-body"
                placeholder="Seu e-mail" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
              <textarea
                rows={3}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-navy outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition-all placeholder-gray-400 font-body resize-none"
                placeholder="Sua mensagem..." value={form.msg}
                onChange={e => setForm(f => ({ ...f, msg: e.target.value }))}
              />
              <button
                onClick={handleSend}
                disabled={!form.nome || !form.email || !form.msg}
                className="w-full py-3 bg-aura-grad text-white font-display font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-teal hover:shadow-teal-lg hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send size={14} /> Enviar mensagem
              </button>
            </div>
          )}
        </div>
      )}

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
        {/* WhatsApp */}
        <div className="relative group">
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg">
            Falar no WhatsApp
          </div>
          <a href="https://wa.me/5561992510045" target="_blank" rel="noreferrer"
            className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-200">
            <MessageCircle size={26} className="text-white" />
          </a>
          {/* Ping animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
        </div>

        {/* Doctor / Email */}
        <div className="relative group">
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-lg">
            Enviar mensagem
          </div>
          <button onClick={() => setPanelOpen(!panelOpen)}
            className="w-14 h-14 rounded-full bg-aura-grad flex items-center justify-center shadow-teal hover:scale-110 hover:shadow-teal-lg transition-all duration-200">
            <Stethoscope size={24} className="text-white" />
          </button>
        </div>
      </div>
    </>
  )
}
