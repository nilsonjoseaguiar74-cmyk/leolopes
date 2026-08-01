import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/soon";

export const Route = createFileRoute("/aluno/materiais")({
  component: () => (
    <ComingSoon
      eyebrow="Materiais"
      title="Conteúdos exclusivos"
      items={["Guias em PDF", "Vídeos demonstrativos", "Planilhas", "E-books", "Aulas gravadas", "Downloads"]}
    />
  ),
});
