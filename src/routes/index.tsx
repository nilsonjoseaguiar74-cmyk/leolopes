import { createFileRoute } from "@tanstack/react-router";
import { EntryLanding } from "@/components/site/entry-landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Leonardo OS — Experiência de marca de Leonardo Lopes" },
      {
        name: "description",
        content:
          "Uma apresentação cinematográfica em sete cenas: quem é Leonardo Lopes, a metodologia, os resultados e os projetos antes de entrar na plataforma.",
      },
      { property: "og:title", content: "Leonardo OS — Experiência de marca" },
      {
        property: "og:description",
        content: "Sete cenas para entender como ciência e acompanhamento viram evolução física.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EntryLanding,
});
