import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/soon";

export const Route = createFileRoute("/admin/$")({
  component: AdminModule,
});

const labels: Record<string, { title: string; items: string[] }> = {
  leads: {
    title: "Leads e captação",
    items: [
      "Pré-cadastro pelo Leonardo (nome, WhatsApp, e-mail)",
      "Geração de link de convite",
      "Cadastro espontâneo pelo site",
      "Aprovação no CRM",
      "Aceite de termos",
      "Origem e atribuição",
    ],
  },
  alunos: {
    title: "Gestão de alunos",
    items: ["Cadastro e edição", "Fichas de treino", "Documentos vinculados", "Histórico", "Status do plano", "Comunicação"],
  },
  empresas: {
    title: "Contas corporativas",
    items: ["Cadastro de empresas", "Programas contratados", "Colaboradores", "Contratos", "Faturamento", "Relatórios"],
  },
  treinos: {
    title: "Construtor de treinos",
    items: ["Biblioteca de exercícios", "Blocos e séries", "Periodização", "Modelos reutilizáveis", "Vídeos vinculados", "Publicação ao aluno"],
  },
  avaliacoes: {
    title: "Avaliações físicas",
    items: ["Protocolos", "Composição corporal", "Testes funcionais", "Relatórios", "Comparativos", "Agendamento"],
  },
  anamneses: {
    title: "Anamneses",
    items: ["Questionário inicial", "Atualizações periódicas", "Restrições e lesões", "Medicações", "Revisões", "Assinatura digital"],
  },
  avatar: {
    title: "Avatar Evolutivo (admin)",
    items: ["Padronização de captura", "Aprovação de registros", "Editor de objetivos", "Comparações", "Metas por aluno", "Exportação"],
  },
  objetivos: {
    title: "Editor de objetivos",
    items: ["Metas por ciclo", "Indicadores acompanhados", "Pesos e prioridades", "Prazos", "Alertas", "Histórico de revisões"],
  },
  timeline: {
    title: "Timeline geral",
    items: ["Eventos por aluno", "Marcos de ciclo", "Registros de avaliação", "Feedbacks", "Filtros", "Exportação"],
  },
  blog: {
    title: "Blog e conteúdo",
    items: ["Editor de artigos", "Categorias e tags", "Agendamento", "SEO por artigo", "Imagens de capa", "Rascunhos"],
  },
  produtos: {
    title: "Produtos e serviços",
    items: ["Consultorias", "Mentorias", "Planilhas", "Cursos e e-books", "Preços", "Página de venda"],
  },
  financeiro: {
    title: "Financeiro",
    items: ["Receita recorrente", "Faturas", "Inadimplência", "Planos", "Repasses", "Relatórios"],
  },
  analytics: {
    title: "Analytics",
    items: ["Funil de conversão", "Origem de leads", "Retenção", "Engajamento", "Coortes", "Exportação"],
  },
  configuracoes: {
    title: "Configurações",
    items: ["Marca e identidade", "Usuários e permissões", "Integrações e embeds", "Domínio", "Notificações", "Segurança"],
  },
};

function AdminModule() {
  const { _splat } = Route.useParams();
  const key = (_splat ?? "").split("/")[0] ?? "";
  const meta = labels[key] ?? {
    title: "Módulo",
    items: ["Estrutura definida", "Conteúdo em construção"],
  };

  return <ComingSoon eyebrow="Administração" title={meta.title} items={meta.items} />;
}
