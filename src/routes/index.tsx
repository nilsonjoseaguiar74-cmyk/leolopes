import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/site/landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leonardo Lopes — Evolução física com ciência e acompanhamento" },
      {
        name: "description",
        content:
          "Consultoria individual, avaliação física, corrida, musculação e longevidade. Acompanhamento próximo e prescrição baseada em evidências.",
      },
      { property: "og:title", content: "Leonardo Lopes — Evolução física com ciência" },
      {
        property: "og:description",
        content: "Não quero apenas o seu investimento. Quero o seu resultado.",
      },
    ],
  }),
  component: LandingPage,
});
