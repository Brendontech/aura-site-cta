import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { X, MonitorPlay, MessagesSquare, ArrowUpRight, Lock, ChevronRight } from 'lucide-react'
import { DEMO_URL } from '../config'

const Ctx = createContext({ open: () => {} })
export const useDemoChooser = () => useContext(Ctx)

// Botão "Conheça o Sistema": abre a escolha entre explorar a demo ou falar com a equipe
export function DemoChooserProvider({ children }) {
  const [isOpen, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const open = useCallback(() => { setMounted(true); requestAnimationFrame(() => setOpen(true)) }, [])
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setMounted(false), 300)
      return () => clearTimeout(t)
    }
    const onKey = (e) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [isOpen, close])

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {mounted && (
        <div className={`fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          role="dialog" aria-modal="true" aria-labelledby="demo-chooser-title">
          <div className="absolute inset-0 bg-navy/70 backdrop-blur-md" onClick={close} />

          <div className={`relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ease-out-expo ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}`}>
            <div className="h-1.5 bg-aura-grad animate-gradient-x bg-[length:200%_200%]" />
            <button onClick={close} aria-label="Fechar"
              className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-navy hover:bg-gray-100 hover:rotate-90 transition-all duration-300">
              <X size={18} />
            </button>

            <div className="p-7 sm:p-10">
              <h2 id="demo-chooser-title" className="font-display font-black text-2xl sm:text-3xl text-navy pr-10">
                Como você quer conhecer o <span className="gradient-text">Sanyti</span>?
              </h2>
              <p className="text-gray-500 mt-2">Explore por conta própria ou converse com nossa equipe.</p>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <a href={DEMO_URL} target="_blank" rel="noreferrer" onClick={close}
                  className="group relative p-6 rounded-2xl bg-dark-grad text-white overflow-hidden hover:-translate-y-1 hover:shadow-teal-lg transition-all duration-300 chooser-in"
                  style={{ '--d': '80ms' }}>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal/25 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-aura-grad flex items-center justify-center shadow-teal mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                      <MonitorPlay size={22} />
                    </div>
                    <div className="font-display font-bold text-lg flex items-center gap-1.5">
                      Explorar a demo <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                    <p className="text-white/60 text-sm mt-1.5 leading-relaxed">
                      Entre no sistema e navegue pelas telas e funcionalidades agora mesmo.
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-light bg-teal/10 border border-teal/20 rounded-full px-2.5 py-1 mt-4">
                      <Lock size={11} /> Ambiente de demonstração, somente visualização
                    </div>
                  </div>
                </a>

                <Link to="/contato" onClick={close}
                  className="group relative p-6 rounded-2xl border-2 border-gray-100 hover:border-teal/40 bg-white hover:-translate-y-1 hover:shadow-card-lg transition-all duration-300 chooser-in"
                  style={{ '--d': '160ms' }}>
                  <div className="w-12 h-12 rounded-2xl bg-teal-soft text-teal-dark flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                    <MessagesSquare size={22} />
                  </div>
                  <div className="font-display font-bold text-lg text-navy flex items-center gap-1.5">
                    Falar com a equipe <ChevronRight size={17} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                    Agende uma apresentação guiada e tire suas dúvidas sobre a sua operação.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  )
}
