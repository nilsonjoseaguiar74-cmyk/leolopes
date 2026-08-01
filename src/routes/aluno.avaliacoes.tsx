import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/soon";

export const Route = createFileRoute("/aluno/avaliacoes")({
  component: () => (
    <ComingSoon
      eyebrow="Avaliações"
      title="Avaliações e reavaliações"
      items={["Avaliação inicial", "Reavaliações periódicas", "Anamneses", "Relatórios em PDF", "Comparativos", "Histórico completo"]}
    />
  ),
});
