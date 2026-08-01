import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/site/landing";

export const Route = createFileRoute("/home")({
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});
