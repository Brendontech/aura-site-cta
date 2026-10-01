// Dados de contato e links usados em todo o site — altere aqui.
export const LOGIN_URL     = 'https://www.sanyti.com.br/'
export const WHATSAPP_NUM  = '5561992510045'
export const WHATSAPP_TXT  = '(61) 99251-0045'
export const WHATSAPP_URL  = `https://wa.me/${WHATSAPP_NUM}`
export const CONTACT_EMAIL = 'contato@sanyti.com.br'

// Endpoint opcional para envio via AJAX (Formspree, FormSubmit, Web3Forms ou API própria).
// Defina VITE_FORM_ENDPOINT no .env; sem ele, o formulário abre o e-mail do visitante.
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''
