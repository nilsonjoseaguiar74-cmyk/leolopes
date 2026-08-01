import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Send, Sparkles } from "lucide-react";

import { PageHeader, Panel } from "@/components/app/shell";
import { coachMessages, insights } from "@/lib/mock";

export const Route = createFileRoute("/aluno/coach")({
  component: Coach,
});

const canned =
  "Registrei sua observação. Vou revisar o volume do próximo bloco e te mando o ajuste antes de quinta.";

function Coach() {
  const [messages, setMessages] = useState(coachMessages);
  const [draft, setDraft] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages((m) => [...m, { from: "user", text: draft.trim() }]);
    setDraft("");
    setTimeout(() => setMessages((m) => [...m, { from: "coach", text: canned }]), 700);
  }

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="IA Coach"
        title="Leitura contínua da sua semana"
        lead="Resumos, insights e sugestões — sempre revisados pelo Leonardo."
      />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="surface-panel flex h-[600px] flex-col">
          <header className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-border px-5 py-4">
            <span className="grid size-9 place-items-center rounded-lg bg-primary/15">
              <Sparkles className="size-4 text-primary" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Coach</p>
              <p className="text-xs text-muted-foreground">respostas simuladas</p>
            </div>
          </header>

          <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.from === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-surface-2/60 text-foreground"
                  }`}
                >
                  {m.text}
                </p>
              </motion.div>
            ))}
          </div>

          <form onSubmit={send} className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 border-t border-border p-4">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Escreva uma mensagem…"
              className="min-w-0 rounded-full border border-input bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary/60"
            />
            <button
              type="submit"
              aria-label="Enviar"
              className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
            >
              <Send className="size-4" />
            </button>
          </form>
        </section>

        <div className="grid gap-4">
          <Panel title="Resumo semanal">
            <ul className="grid gap-3">
              {insights.map((i) => (
                <li key={i.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm">{i.label}</p>
                    <p className="text-xs text-muted-foreground">{i.hint}</p>
                  </div>
                  <span className="shrink-0 font-mono text-sm">{i.value}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Sugestões">
            <ul className="grid gap-2 text-sm text-muted-foreground">
              {[
                "Adicionar 10 min de mobilidade antes do treino B",
                "Manter hidratação acima de 2,5 L nos dias de trail",
                "Antecipar o sono em 30 min nas quartas",
              ].map((s) => (
                <li key={s} className="rounded-xl border border-border bg-surface-2/40 px-4 py-3">
                  {s}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
