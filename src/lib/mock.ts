// Dados simulados (mock) do Leonardo OS. Nenhum backend envolvido.

export const brandWords = [
  "Saúde",
  "Qualidade de Vida",
  "Constância",
  "Movimento",
  "Bem-estar",
  "Performance",
  "Longevidade",
  "Corrida",
  "Musculação",
  "Natação",
  "Meio Ambiente",
  "Evolução",
  "Disciplina",
  "Equilíbrio",
];

export const stats = [
  { value: "480+", label: "alunos acompanhados" },
  { value: "12", label: "anos de prática" },
  { value: "2.100", label: "avaliações físicas" },
  { value: "94%", label: "retenção após 6 meses" },
];

export const methodology = [
  {
    step: "01",
    title: "Avaliação completa",
    text: "Anamnese, composição corporal, histórico de lesões, rotina e disponibilidade real.",
  },
  {
    step: "02",
    title: "Planejamento individual",
    text: "Periodização construída para o seu contexto — não um modelo replicado.",
  },
  {
    step: "03",
    title: "Prescrição por evidência",
    text: "Cargas, volumes e progressões sustentadas por ciência do exercício.",
  },
  {
    step: "04",
    title: "Acompanhamento próximo",
    text: "Ajustes constantes, comunicação direta e leitura contínua da evolução.",
  },
];

export const specialties = [
  { title: "Musculação", text: "Força, hipertrofia e saúde articular." },
  { title: "Trail & Corrida", text: "Base aeróbica, ritmo e resistência em terreno." },
  { title: "Natação", text: "Técnica, respiração e condicionamento." },
  { title: "Reabilitação assistida", text: "Retorno seguro ao movimento." },
  { title: "Longevidade", text: "Autonomia, mobilidade e força para a vida." },
  { title: "Iniciantes & inclusão", text: "Respeito absoluto às limitações." },
];

export const pains = [
  "Cansado de começar e desistir",
  "Vive sem energia",
  "Sente dores constantes",
  "Treina sem resultado",
  "Não sabe por onde começar",
  "Medo de envelhecer sem autonomia",
  "Vergonha de frequentar academia",
  "Não consegue manter constância",
];

export const testimonials = [
  {
    name: "Marina Alves",
    role: "Aluna há 2 anos",
    quote:
      "Nunca tive constância na vida. Com o acompanhamento semanal, virou rotina — e a rotina virou resultado.",
  },
  {
    name: "Rodrigo Faria",
    role: "Trail runner",
    quote:
      "Saí de 5 km sofridos para 42 km em montanha. Cada bloco de treino tinha uma razão clara.",
  },
  {
    name: "Cláudia Menezes",
    role: "62 anos",
    quote:
      "Voltei a subir escada sem dor. O Leonardo respeita meu corpo e ainda assim me faz evoluir.",
  },
];

export const beforeAfter = [
  { name: "Aluno A", weeks: 24, delta: "-11,4 kg", metric: "gordura corporal -7,2%" },
  { name: "Aluna B", weeks: 36, delta: "+4,8 kg", metric: "massa magra" },
  { name: "Aluno C", weeks: 16, delta: "-9 min", metric: "pace de 10 km" },
];

export const companies = [
  "Bralar",
  "Vale Verde",
  "Grupo Norte",
  "Instituto Movimento",
  "Clínica Vitta",
  "TechPar",
];

export const projects = [
  {
    title: "Projeto Bralar",
    kind: "Ação social",
    text: "Programa de atividade física orientada para colaboradores e comunidade.",
  },
  {
    title: "Qualidade de Vida Corporativa",
    kind: "B2B",
    text: "Avaliações, ginástica laboral e trilhas de saúde para equipes.",
  },
  {
    title: "Trilhas Guiadas",
    kind: "Evento",
    text: "Treinos em ambiente natural com foco em meio ambiente e performance.",
  },
];

export const posts = [
  { title: "Constância vence intensidade", cat: "Hábitos", read: "6 min" },
  { title: "Força depois dos 60: o que a ciência mostra", cat: "Longevidade", read: "8 min" },
  { title: "Como estruturar sua primeira base de corrida", cat: "Corrida", read: "5 min" },
];

export const products = [
  { title: "Consultoria Individual", price: "R$ 490/mês", items: ["Plano personalizado", "Ajustes semanais", "Comunicação direta"] },
  { title: "Avaliação Física Completa", price: "R$ 280", items: ["Composição corporal", "Anamnese", "Relatório detalhado"] },
  { title: "Programa de Corrida", price: "R$ 340", items: ["12 semanas", "Planilha evolutiva", "Suporte por chat"] },
];

export const faq = [
  { q: "Preciso ter experiência para começar?", a: "Não. A avaliação inicial define um ponto de partida seguro para qualquer nível." },
  { q: "O acompanhamento é presencial ou online?", a: "Ambos. O plano é montado conforme sua rotina e disponibilidade." },
  { q: "Como funcionam os ajustes do treino?", a: "A cada ciclo revisamos indicadores, feedbacks e evolução para recalibrar o plano." },
];

// ---------- Portal do aluno ----------

export const student = {
  name: "Ana Beatriz",
  plan: "Consultoria Individual",
  streak: 18,
  adherence: 92,
  nextSession: "Força · Inferiores — hoje, 18h30",
  goal: "Reduzir 6% de gordura e correr 10 km em 52 min",
};

export const weightSeries = [
  { month: "Fev", peso: 74.2, gordura: 31 },
  { month: "Mar", peso: 73.1, gordura: 30 },
  { month: "Abr", peso: 71.8, gordura: 28.4 },
  { month: "Mai", peso: 70.9, gordura: 27.1 },
  { month: "Jun", peso: 69.6, gordura: 25.8 },
  { month: "Jul", peso: 68.4, gordura: 24.3 },
];

export const loadSeries = [
  { week: "S1", carga: 3200 },
  { week: "S2", carga: 3560 },
  { week: "S3", carga: 3410 },
  { week: "S4", carga: 3980 },
  { week: "S5", carga: 4220 },
  { week: "S6", carga: 4510 },
];

export const workouts = [
  { name: "A · Inferiores força", when: "Hoje", blocks: 6, minutes: 62, status: "Pendente" },
  { name: "B · Superiores push", when: "Amanhã", blocks: 5, minutes: 55, status: "Agendado" },
  { name: "C · Trail intervalado", when: "Quinta", blocks: 4, minutes: 48, status: "Agendado" },
  { name: "D · Mobilidade + core", when: "Concluído", blocks: 5, minutes: 35, status: "Concluído" },
];

export const timeline = [
  { date: "28 jul", title: "Reavaliação física", text: "Gordura corporal 24,3%. Meta ajustada." },
  { date: "14 jul", title: "Novo ciclo de força", text: "Progressão de carga em agachamento e terra." },
  { date: "02 jul", title: "Fotos de evolução", text: "Registro padronizado adicionado à timeline." },
  { date: "19 jun", title: "Feedback semanal", text: "Sono e energia melhoraram; volume mantido." },
];

export const coachMessages = [
  { from: "coach", text: "Bom dia, Ana. Sua adesão está em 92% neste ciclo — excelente." },
  { from: "user", text: "Senti a carga do agachamento mais leve essa semana." },
  { from: "coach", text: "Isso indica adaptação. Sugiro +5% de carga na série principal e manter o tempo de descanso." },
  { from: "user", text: "Fechado. E a corrida de domingo?" },
  { from: "coach", text: "Rodagem contínua de 8 km em ritmo conversável. Foco em cadência, não em pace." },
];

export const insights = [
  { label: "Adesão", value: "92%", hint: "+6 pts vs ciclo anterior" },
  { label: "Carga semanal", value: "4.510 kg", hint: "tendência de alta" },
  { label: "Sono médio", value: "7h20", hint: "estável" },
  { label: "Meta de 10 km", value: "54:10", hint: "faltam 2:10" },
];

// ---------- Portal B2B ----------

export const b2bKpis = [
  { label: "Colaboradores ativos", value: "312" },
  { label: "Adesão ao programa", value: "68%" },
  { label: "Absenteísmo", value: "-14%" },
  { label: "NPS interno", value: "72" },
];

export const b2bEngagement = [
  { month: "Fev", adesao: 41 },
  { month: "Mar", adesao: 47 },
  { month: "Abr", adesao: 52 },
  { month: "Mai", adesao: 58 },
  { month: "Jun", adesao: 64 },
  { month: "Jul", adesao: 68 },
];

export const employees = [
  { name: "Carlos Prado", dept: "Operações", program: "Qualidade de Vida", adherence: 88 },
  { name: "Juliana Reis", dept: "Financeiro", program: "Corrida Corporativa", adherence: 74 },
  { name: "Marcos Lima", dept: "Logística", program: "Ginástica Laboral", adherence: 61 },
  { name: "Patrícia Sá", dept: "RH", program: "Qualidade de Vida", adherence: 95 },
  { name: "Diego Alencar", dept: "TI", program: "Musculação", adherence: 52 },
];

// ---------- Admin ----------

export const adminKpis = [
  { label: "Alunos ativos", value: "142", hint: "+8 no mês" },
  { label: "Leads no pipeline", value: "37", hint: "12 em avaliação" },
  { label: "Receita recorrente", value: "R$ 68.4k", hint: "+11%" },
  { label: "Taxa de conversão", value: "34%", hint: "lead → matrícula" },
];

export const revenueSeries = [
  { month: "Fev", receita: 48 },
  { month: "Mar", receita: 52 },
  { month: "Abr", receita: 55 },
  { month: "Mai", receita: 59 },
  { month: "Jun", receita: 63 },
  { month: "Jul", receita: 68 },
];

export const crmStages = [
  "Lead",
  "Contato",
  "Avaliação",
  "Proposta",
  "Matrícula",
  "Ativo",
  "Pausado",
  "Encerrado",
] as const;

export type CrmCard = {
  id: string;
  name: string;
  stage: (typeof crmStages)[number];
  origin: string;
  tags: string[];
  value: string;
};

export const crmCards: CrmCard[] = [
  { id: "1", name: "Fernanda Duarte", stage: "Lead", origin: "Instagram", tags: ["emagrecimento"], value: "R$ 490" },
  { id: "2", name: "Tiago Moraes", stage: "Lead", origin: "Indicação", tags: ["corrida"], value: "R$ 340" },
  { id: "3", name: "Bruna Castro", stage: "Contato", origin: "Site", tags: ["iniciante"], value: "R$ 490" },
  { id: "4", name: "Grupo Norte", stage: "Avaliação", origin: "B2B", tags: ["corporativo", "120 pessoas"], value: "R$ 12.8k" },
  { id: "5", name: "Rafael Pinho", stage: "Avaliação", origin: "WhatsApp", tags: ["hipertrofia"], value: "R$ 490" },
  { id: "6", name: "Clínica Vitta", stage: "Proposta", origin: "Parceria", tags: ["b2b"], value: "R$ 6.2k" },
  { id: "7", name: "Letícia Prado", stage: "Matrícula", origin: "Instagram", tags: ["trail"], value: "R$ 590" },
  { id: "8", name: "Henrique Sales", stage: "Ativo", origin: "Indicação", tags: ["longevidade"], value: "R$ 490" },
  { id: "9", name: "Camila Rocha", stage: "Ativo", origin: "Site", tags: ["natação"], value: "R$ 440" },
  { id: "10", name: "Otávio Braz", stage: "Pausado", origin: "Instagram", tags: ["lesão"], value: "R$ 490" },
  { id: "11", name: "Sílvia Nunes", stage: "Encerrado", origin: "Site", tags: ["mudança"], value: "—" },
];

export const cmsSections = [
  { name: "Hero", type: "Cinematográfico", visible: true },
  { name: "Sobre Leonardo", type: "Editorial", visible: true },
  { name: "Metodologia", type: "Passos", visible: true },
  { name: "Especialidades", type: "Grid", visible: true },
  { name: "Resultados", type: "Provas", visible: true },
  { name: "Antes e Depois", type: "Comparativo", visible: true },
  { name: "Empresas", type: "Marquee", visible: true },
  { name: "Projetos", type: "Cards", visible: true },
  { name: "Blog", type: "Lista", visible: true },
  { name: "Produtos", type: "Planos", visible: true },
  { name: "Depoimentos", type: "Slider", visible: true },
  { name: "FAQ", type: "Acordeão", visible: false },
  { name: "Contato", type: "Formulário", visible: true },
];

export const mediaLibrary = [
  { name: "hero-trail.jpg", kind: "Imagem", size: "1.8 MB", tags: ["hero", "trail"] },
  { name: "avaliacao-modelo.pdf", kind: "PDF", size: "420 KB", tags: ["documento"] },
  { name: "agachamento-tecnica.mp4", kind: "Vídeo", size: "24 MB", tags: ["exercício"] },
  { name: "logo-leonardo.png", kind: "Logo", size: "180 KB", tags: ["marca"] },
  { name: "guia-corrida.pdf", kind: "PDF", size: "1.1 MB", tags: ["material"] },
  { name: "projeto-bralar-01.jpg", kind: "Imagem", size: "2.4 MB", tags: ["projeto"] },
];
