import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/soon";

export const Route = createFileRoute("/aluno/fotos")({
  component: () => (
    <ComingSoon
      eyebrow="Fotos"
      title="Registros de evolução"
      items={["Captura guiada", "Padronização de enquadramento", "Galeria por ciclo", "Comparador lado a lado", "Privacidade por aluno", "Exportação"]}
    />
  ),
});
