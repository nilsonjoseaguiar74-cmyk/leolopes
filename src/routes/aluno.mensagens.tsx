import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/soon";

export const Route = createFileRoute("/aluno/mensagens")({
  component: () => (
    <ComingSoon
      eyebrow="Mensagens"
      title="Comunicação direta"
      items={["Avisos do Leonardo", "Mensagens diretas", "Notificações", "Feedbacks de treino", "Anexos", "Histórico"]}
    />
  ),
});
