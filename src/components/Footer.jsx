import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { MessageCircle, Mail, Phone, Shield, Lock, Award } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy border-t border-teal/10">
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={logo} alt="Aura" className="h-14 mb-4" />
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Sistema SaaS completo para gestão de serviços de atenção domiciliar. 
              Digitalize, automatize e cresça com segurança.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://wa.me/5561992510045" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition-colors">
                <MessageCircle size={18} />
              </a>
              <a href="mailto:contato@aurahomecare.com.br"
                className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal hover:bg-teal/20 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-widest mb-5">Sistema</h4>
            <div className="flex flex-col gap-3">
              {['Funcionalidades','Benefícios','Planos e Preços','Solicitar Demo'].map(l => (
                <a key={l} href={`/#${l.toLowerCase().replace(/ /g,'-')}`}
                  className="text-white/45 text-sm hover:text-teal transition-colors">{l}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-widest mb-5">Contato</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:contato@aurahomecare.com.br" className="text-white/45 text-sm hover:text-teal transition-colors flex items-center gap-2">
                <Mail size={13} /> contato@aurahomecare.com.br
              </a>
              <a href="https://wa.me/5561992510045" target="_blank" rel="noreferrer" className="text-white/45 text-sm hover:text-teal transition-colors flex items-center gap-2">
                <Phone size={13} /> (61) 99251-0045
              </a>
              <Link to="/contato" className="text-teal text-sm font-semibold hover:text-teal-light transition-colors">
                → Fale conosco
              </Link>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center gap-4 py-6 border-y border-white/5 mb-6">
          {[
            { icon: Shield, label: 'LGPD Compliant' },
            { icon: Lock,   label: 'Dados Criptografados' },
            { icon: Award,  label: 'Assinatura Digital CFM' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/30 text-xs font-medium">
              <Icon size={13} className="text-teal/50" /> {label}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/25 text-xs">
          <p>© {year} Aura Homecare. Todos os direitos reservados.</p>
          <p>Feito com ❤️ para o homecare brasileiro</p>
        </div>
      </div>
    </footer>
  )
}
