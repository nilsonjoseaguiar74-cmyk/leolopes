import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, Search } from "lucide-react";

import { PageHeader } from "@/components/app/shell";
import { crmCards, crmStages, type CrmCard } from "@/lib/mock";

export const Route = createFileRoute("/admin/crm")({
  component: Crm,
});

function Crm() {
  const [cards, setCards] = useState<CrmCard[]>(crmCards);
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      cards.filter((c) =>
        `${c.name} ${c.origin} ${c.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [cards, q],
  );

  function advance(card: CrmCard) {
    const i = crmStages.indexOf(card.stage);
    const next = crmStages[Math.min(i + 1, crmStages.length - 1)]!;
    setCards((cs) => cs.map((c) => (c.id === card.id ? { ...c, stage: next } : c)));
  }

  return (
    <div className="grid gap-6 sm:gap-8">
      <PageHeader
        eyebrow="CRM"
        title="Pipeline de relacionamento"
        lead="Do primeiro contato à matrícula — clique em um cartão para avançar de etapa."
        action={
          <div className="flex items-center gap-2 rounded-full border border-input bg-surface/60 px-4 py-2.5 sm:w-72">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nome, origem ou tag"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
            />
          </div>
        }
      />

      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 pb-4 lg:mx-0 lg:px-0">
        <div className="flex min-w-max gap-3">
          {crmStages.map((stage) => {
            const items = filtered.filter((c) => c.stage === stage);
            return (
              <div key={stage} className="w-[268px] shrink-0">
                <div className="mb-3 flex items-center justify-between px-1">
                  <p className="eyebrow">{stage}</p>
                  <span className="font-mono text-xs text-muted-foreground">{items.length}</span>
                </div>
                <div className="grid min-h-[120px] gap-2 rounded-2xl border border-border bg-surface/40 p-2">
                  {items.map((c) => (
                    <motion.button
                      key={c.id}
                      layout
                      whileHover={{ y: -3 }}
                      onClick={() => advance(c)}
                      className="group w-full rounded-xl border border-border bg-surface-2/60 p-4 text-left transition-colors hover:border-border-strong"
                    >
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                        <p className="truncate text-sm font-medium">{c.name}</p>
                        <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{c.origin}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        {c.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] text-primary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 font-mono text-xs text-muted-foreground">{c.value}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
