import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/soon";

export const Route = createFileRoute("/aluno/agenda")({
  component: () => (
    <ComingSoon
      eyebrow="Agenda"
      title="Sessões e compromissos"
      items={["Calendário mensal", "Sessões presenciais", "Reavaliações agendadas", "Lembretes", "Reagendamento", "Sincronização"]}
    />
  ),
});
