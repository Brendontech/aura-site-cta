import { CONTACT_EMAIL, FORM_ENDPOINT } from '../config'

const LABELS = {
  nome: 'Nome', empresa: 'Empresa', email: 'E-mail', telefone: 'Telefone',
  pacientes: 'Pacientes', plano: 'Plano de interesse', mensagem: 'Mensagem',
}

// Envia o lead via AJAX quando há endpoint configurado; caso contrário, cai no mailto.
export async function sendLead(data, subject) {
  if (FORM_ENDPOINT) {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, _subject: subject }),
    })
    if (!res.ok) throw new Error(`Falha no envio (${res.status})`)
    return { via: 'ajax' }
  }

  const body = Object.entries(data)
    .filter(([, v]) => v)
    .map(([k, v]) => `${LABELS[k] || k}: ${v}`)
    .join('\n')
  window.location.href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { via: 'mailto' }
}
