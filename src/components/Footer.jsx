import React from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Mail, Phone, MapPin, ShieldCheck, FileSignature, MonitorPlay, ArrowUpRight, Barcode } from 'lucide-react'
import Logo from './Logo'
import { CONTACT_EMAIL, DEMO_URL, WHATSAPP_TXT, WHATSAPP_URL } from '../config'

const NAV = [
  ['Funcionalidades', '/#funcionalidades'],
  ['Check-in e Check-out', '/#presenca'],
  ['Benefícios', '/#beneficios'],
  ['Planos e Preços', '/#precos'],
  ['Central de Ajuda', '/ajuda'],
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy border-t border-teal/10 relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[40rem] h-80 bg-teal/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container-max relative pt-16 lg:pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] gap-12 mb-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo size="lg" />
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mt-5">
              Sistema de gestão para empresas de atenção domiciliar: prontuário, check-in e check-out,
              estoque, orçamentos, indicadores e portal do responsável.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 hover:-translate-y-0.5 transition-all">
                <MessageCircle size={18} />
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} aria-label="E-mail"
                className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal hover:bg-teal/20 hover:-translate-y-0.5 transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-widest mb-5">Sistema</h4>
            <div className="flex flex-col gap-3">
              {NAV.map(([l, to]) => (
                <Link key={l} to={to} className="text-white/50 text-sm hover:text-teal hover:translate-x-1 transition-all w-fit">{l}</Link>
              ))}
              <a href={DEMO_URL} target="_blank" rel="noreferrer"
                className="text-teal text-sm font-semibold hover:text-teal-light transition-colors w-fit inline-flex items-center gap-1.5">
                <MonitorPlay size={14} /> Explorar a demo <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-widest mb-5">Contato</h4>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-white/50 text-sm hover:text-teal transition-colors flex items-center gap-2 break-all">
                <Mail size={14} className="flex-shrink-0" /> {CONTACT_EMAIL}
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-white/50 text-sm hover:text-teal transition-colors flex items-center gap-2">
                <Phone size={14} /> {WHATSAPP_TXT}
              </a>
              <Link to="/contato" className="text-teal text-sm font-semibold hover:text-teal-light transition-colors w-fit">
                Fale conosco →
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-6 border-y border-white/5 mb-6">
          {[
            { icon: MapPin,        label: 'Check-in e check-out com distância' },
            { icon: ShieldCheck,   label: 'Permissões em duas camadas' },
            { icon: FileSignature, label: 'Assinatura digital ICP-Brasil' },
            { icon: Barcode,       label: 'Bipagem EAN-13' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/40 text-xs font-medium">
              <Icon size={14} className="text-teal/70" /> {label}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs text-center">
          <p>© {year} Sanyti Homecare. Todos os direitos reservados.</p>
          <p>Feito com ❤️ para o Home Care brasileiro</p>
        </div>
      </div>
    </footer>
  )
}
