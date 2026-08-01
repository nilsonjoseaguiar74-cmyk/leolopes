import { createFileRoute } from "@tanstack/react-router";
import { EntryLanding } from "@/components/site/entry-landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leonardo Lopes — O próximo passo começa aqui" },
      {
        name: "description",
        content:
          "Abertura cinematográfica da plataforma de Leonardo Lopes: montanha, trilha e evolução física construída todos os dias.",
      },
      { property: "og:title", content: "Leonardo Lopes — O próximo passo começa aqui" },
      {
        property: "og:description",
        content: "Entrada premium para a jornada de evolução física com ciência e trilha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EntryLanding,
});
