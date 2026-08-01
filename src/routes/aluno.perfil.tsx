import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/soon";

export const Route = createFileRoute("/aluno/perfil")({
  component: () => (
    <ComingSoon
      eyebrow="Perfil"
      title="Seus dados e preferências"
      items={["Dados pessoais", "Objetivos", "Restrições e lesões", "Preferências de notificação", "Termos aceitos", "Segurança"]}
    />
  ),
});
