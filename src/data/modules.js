import {
  Package, Building2, Calculator, Sofa, AlertTriangle, FileBarChart, LineChart, Stethoscope,
  Contact, ClipboardCheck, FileLock2, Boxes, Wallet,
  Pill, NotebookPen, Barcode, FileSignature, Target, ClipboardList, Gauge, Layers, UsersRound, MapPin, ShieldCheck,
} from 'lucide-react'

// Módulos de gestão da empresa
export const GESTAO = [
  { icon: MapPin,         title: 'Check-in e Check-out', desc: 'Presença registrada com a distância até a residência do paciente' },
  { icon: FileSignature,  title: 'Assinatura Digital',   desc: 'Documentos assinados com certificado ICP-Brasil' },
  { icon: Wallet,         title: 'Financeiro',           desc: 'Faturamento conferido com base nas visitas registradas' },
  { icon: Boxes,          title: 'Estoque',              desc: 'Gerenciamento do estoque da operação' },
  { icon: Package,        title: 'Materiais',            desc: 'Cadastro dos materiais utilizados nos atendimentos' },
  { icon: Stethoscope,    title: 'Equipamentos',         desc: 'Cadastro e controle dos equipamentos da operação' },
  { icon: Sofa,           title: 'Mobília',              desc: 'Controle da mobília da operação' },
  { icon: Building2,      title: 'Operadoras',           desc: 'Cadastro das operadoras e convênios atendidos' },
  { icon: Calculator,     title: 'Orçamentos',           desc: 'Criação e gerenciamento de orçamentos' },
  { icon: LineChart,      title: 'Indicadores',          desc: 'Aba de indicadores para acompanhar a operação' },
  { icon: FileBarChart,   title: 'Relatórios',           desc: 'Relatórios da operação reunidos em um só lugar' },
  { icon: AlertTriangle,  title: 'Avaliação de Acidente', desc: 'Registro e avaliação de acidentes' },
  { icon: ClipboardCheck, title: 'Avaliações',           desc: 'Avaliações registradas e centralizadas' },
  { icon: FileLock2,      title: 'Receituário Especial', desc: 'Emissão de receituário de controle especial' },
  { icon: Contact,         title: 'Crachá',               desc: 'Geração de crachá para os profissionais' },
  { icon: ShieldCheck,    title: 'Permissões',           desc: 'Acesso de cada profissional liberado por módulo' },
]

// Módulos dentro do prontuário do paciente
export const PRONTUARIO = [
  { icon: NotebookPen,    title: 'Evolução',             desc: 'Registro de evolução do paciente pela equipe' },
  { icon: Barcode,        title: 'Bipagem EAN-13',       desc: 'Checagem do medicamento por código de barras na administração' },
  { icon: Pill,           title: 'Farmácia',             desc: 'Medicamentos que o paciente está utilizando' },
  { icon: Target,         title: 'Plano Terapêutico',    desc: 'Plano de cuidado do paciente' },
  { icon: ClipboardList,  title: 'Avaliação Inicial',    desc: 'Avaliação de entrada do paciente' },
  { icon: Gauge,          title: 'ABEMID',               desc: 'Tabela de avaliação ABEMID' },
  { icon: Gauge,          title: 'NEAD',                 desc: 'Tabela de avaliação NEAD' },
  { icon: Layers,         title: 'PAD',                  desc: 'Plano de Atenção Domiciliar' },
  { icon: Gauge,          title: 'Complexidade',         desc: 'Classificação de complexidade do paciente' },
  { icon: UsersRound,     title: 'Responsáveis',         desc: 'Cadastro dos responsáveis com acesso ao portal' },
  { icon: ShieldCheck,    title: 'Permissões no prontuário', desc: 'Profissional vinculado ao paciente, com acesso por módulo' },
]
