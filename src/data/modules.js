import {
  Package, Building2, Calculator, Sofa, AlertTriangle, FileBarChart, LineChart, Stethoscope,
  Contact, ClipboardCheck, FileLock2, Boxes, Wallet,
  Pill, NotebookPen, Barcode, FileSignature, CalendarDays, FileText, QrCode, BellRing, Siren, Target, ClipboardList, Gauge, Layers, UsersRound, MapPin, ShieldCheck,
} from 'lucide-react'

// Módulos de gestão da empresa
export const GESTAO = [
  { icon: Wallet,         title: 'Financeiro',           desc: 'Faturamento conferido pelas visitas e resultado por atendimento' },
  { icon: Boxes,          title: 'Estoque',              desc: 'Materiais, itens, equipamentos e mobília com saldo real' },
  { icon: Calculator,     title: 'Orçamentos',           desc: 'Por procedimento e operadora, com kits de materiais' },
  { icon: MapPin,         title: 'Check-in e Check-out', desc: 'Presença registrada com a distância até a residência do paciente' },
  { icon: CalendarDays,   title: 'Agenda',               desc: 'Agendamentos, agendamento por período e lembrete 30 min antes' },
  { icon: FileText,       title: 'Prescrições',          desc: 'Prescrição geral, de materiais e de exames, com folha de checagem' },
  { icon: FileSignature,  title: 'Assinatura Digital',   desc: 'Por imagem ou com certificado ICP-Brasil A1 (Lei 14.063/2020)' },
  { icon: QrCode,         title: 'QR Code de Validação', desc: 'Qualquer pessoa confere a autenticidade do documento' },
  { icon: BellRing,       title: 'Notificações Push',    desc: 'Alertas de agendamentos, lembretes e intercorrências' },
  { icon: Package,        title: 'Materiais',            desc: 'Cadastro dos materiais utilizados nos atendimentos' },
  { icon: Stethoscope,    title: 'Equipamentos',         desc: 'Cadastro e controle dos equipamentos da operação' },
  { icon: Sofa,           title: 'Mobília',              desc: 'Controle da mobília da operação' },
  { icon: Building2,      title: 'Operadoras',           desc: 'Cadastro das operadoras e convênios atendidos' },
  { icon: LineChart,      title: 'Indicadores',          desc: 'Atendimentos, pacientes ativos, internações, LPP, quedas e satisfação' },
  { icon: FileBarChart,   title: 'Relatórios',           desc: 'Relatórios da operação reunidos em um só lugar' },
  { icon: AlertTriangle,  title: 'Avaliação de Acidente', desc: 'Registro e avaliação de acidentes' },
  { icon: ClipboardCheck, title: 'Avaliações',           desc: 'Avaliações registradas e centralizadas' },
  { icon: FileLock2,      title: 'Receituário Especial', desc: 'Receitas branca, amarela e azul, em 2 vias no A4' },
  { icon: Contact,         title: 'Crachá',               desc: 'Crachá digital do profissional com QR code' },
  { icon: ShieldCheck,    title: 'Permissões',           desc: 'Acesso de cada profissional liberado por módulo' },
]

// Módulos dentro do prontuário do paciente
export const PRONTUARIO = [
  { icon: NotebookPen,    title: 'Evolução',             desc: 'Médico, enfermagem, fisioterapia e curativo, com ditado por voz' },
  { icon: Siren,          title: 'Intercorrências',      desc: 'Registro de intercorrências com aviso à equipe' },
  { icon: Barcode,        title: 'Bipagem EAN-13',       desc: 'Checagem do medicamento por código de barras na administração' },
  { icon: Pill,           title: 'Farmácia',             desc: 'Medicamentos em uso, estoque e dispensação' },
  { icon: Target,         title: 'Plano Terapêutico',    desc: 'Plano de cuidado do paciente' },
  { icon: ClipboardList,  title: 'Avaliação Inicial',    desc: 'Avaliação de entrada do paciente' },
  { icon: Gauge,          title: 'ABEMID',               desc: 'Tabela de avaliação ABEMID' },
  { icon: Gauge,          title: 'NEAD',                 desc: 'Tabela de avaliação NEAD' },
  { icon: Layers,         title: 'PAD',                  desc: 'Plano de Atenção Domiciliar' },
  { icon: Gauge,          title: 'Complexidade',         desc: 'Classificação de complexidade do paciente' },
  { icon: UsersRound,     title: 'Responsáveis',         desc: 'Cadastro dos responsáveis com acesso ao portal' },
  { icon: ShieldCheck,    title: 'Permissões no prontuário', desc: 'Profissional vinculado ao paciente, com acesso por módulo' },
]
