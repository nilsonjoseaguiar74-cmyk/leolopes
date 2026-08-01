import { createFileRoute } from "@tanstack/react-router";
import { EntryLanding } from "@/components/site/entry-landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leonardo Lopes" },
      {
        name: "description",
        content:
          "Eleve-se.  Plataforma de Leonardo Lopes: montanha, trilha e evolução física construída todos os dias.",
      },
      { property: "og:title", content: "Leonardo Lopes" },
      {
        property: "og:description",
        content: "Eleve-se.  Plataforma de Leonardo Lopes: montanha, trilha e evolução física construída todos os dias.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EntryLanding,
});
