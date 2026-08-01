import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/soon";

export const Route = createFileRoute("/aluno/financeiro")({
  component: () => (
    <ComingSoon
      eyebrow="Financeiro"
      title="Plano e pagamentos"
      items={["Plano atual", "Faturas", "Histórico de pagamentos", "Recibos", "Alteração de plano", "Formas de pagamento"]}
    />
  ),
});
