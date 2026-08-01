import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/soon";

export const Route = createFileRoute("/empresas/$")({
  component: EmpresaModule,
});

const labels: Record<string, { title: string; items: string[] }> = {
  projetos: {
    title: "Projetos corporativos",
    items: ["Escopo e cronograma", "Equipes envolvidas", "Entregas", "Palestras e eventos", "Custos", "Resultados"],
  },
  programas: {
    title: "Programas de saúde",
    items: ["Qualidade de vida", "Corrida corporativa", "Ginástica laboral", "Musculação assistida", "Trilhas guiadas", "Metas por área"],
  },
  campanhas: {
    title: "Campanhas internas",
    items: ["Desafios por equipe", "Comunicação", "Premiações", "Metas coletivas", "Ranking", "Resultados"],
  },
  indicadores: {
    title: "Indicadores",
    items: ["Adesão", "Absenteísmo", "Sinistralidade", "NPS interno", "Produtividade", "Metas anuais"],
  },
  analytics: {
    title: "Analytics corporativo",
    items: ["Séries históricas", "Comparativo por área", "Coortes", "Segmentações", "Alertas", "Exportação"],
  },
  relatorios: {
    title: "Relatórios",
    items: ["Relatório mensal", "Consolidado anual", "Por programa", "Por área", "PDF executivo", "Compartilhamento"],
  },
  comunicacao: {
    title: "Comunicação",
    items: ["Avisos aos colaboradores", "Campanhas por e-mail", "Notificações", "Materiais", "Agenda de eventos", "Histórico"],
  },
  financeiro: {
    title: "Financeiro corporativo",
    items: ["Contrato vigente", "Faturas", "Notas fiscais", "Centros de custo", "Renovação", "Histórico"],
  },
};

function EmpresaModule() {
  const { _splat } = Route.useParams();
  const key = (_splat ?? "").split("/")[0] ?? "";
  const meta = labels[key] ?? {
    title: "Módulo corporativo",
    items: ["Estrutura definida", "Conteúdo em construção"],
  };
  return <ComingSoon eyebrow="Portal Corporativo" title={meta.title} items={meta.items} />;
}
