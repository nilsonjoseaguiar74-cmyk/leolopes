import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FileText, Film, Image as ImageIcon, Search, Upload } from "lucide-react";

import { PageHeader } from "@/components/app/shell";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { mediaLibrary } from "@/lib/mock";

export const Route = createFileRoute("/admin/biblioteca")({
  component: Biblioteca,
});

const kinds = ["Todos", "Imagem", "Vídeo", "PDF", "Logo"];

function Biblioteca() {
  const [kind, setKind] = useState("Todos");
  const [q, setQ] = useState("");

  const items = mediaLibrary.filter(
    (m) =>
      (kind === "Todos" || m.kind === kind) &&
      `${m.name} ${m.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="Biblioteca de mídia"
        title="Um só lugar para todos os arquivos"
        lead="Imagens, vídeos, PDFs, documentos e logos com busca, categorias e tags."
        action={
          <button className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            <Upload className="size-4" />
            Enviar arquivo
          </button>
        }
      />

      <div className="grid gap-3 sm:flex sm:items-center sm:justify-between">
        <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex min-w-max gap-2">
            {kinds.map((k) => (
              <button
                key={k}
                onClick={() => setKind(k)}
                className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                  k === kind
                    ? "border-primary/50 bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-input bg-surface/60 px-4 py-2.5 sm:w-64">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar arquivo ou tag"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => {
          const Icon = m.kind === "Vídeo" ? Film : m.kind === "PDF" ? FileText : ImageIcon;
          return (
            <StaggerItem key={m.name}>
              <article className="surface-panel overflow-hidden">
                <div
                  className="grid h-36 place-items-center"
                  style={{ background: "linear-gradient(150deg, oklch(0.28 0.04 150), oklch(0.19 0.008 155))" }}
                >
                  <Icon className="size-6 text-primary" />
                </div>
                <div className="p-4">
                  <p className="truncate text-sm font-medium">{m.name}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {m.kind} · {m.size}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.tags.map((t) => (
                      <span key={t} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] text-primary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
