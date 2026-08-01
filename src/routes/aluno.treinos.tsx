import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Check, PlayCircle } from "lucide-react";

import { PageHeader, Panel } from "@/components/app/shell";
import { workouts } from "@/lib/mock";

export const Route = createFileRoute("/aluno/treinos")({
  component: Treinos,
});

const blocks = [
  { name: "Agachamento livre", sets: "4 x 6", load: "62 kg", note: "Descanso 2min30" },
  { name: "Levantamento terra", sets: "3 x 5", load: "78 kg", note: "Foco em coluna neutra" },
  { name: "Leg press 45º", sets: "3 x 10", load: "120 kg", note: "Cadência 2-1-2" },
  { name: "Cadeira flexora", sets: "3 x 12", load: "34 kg", note: "Sem apoio lombar" },
  { name: "Panturrilha em pé", sets: "4 x 15", load: "40 kg", note: "Amplitude total" },
  { name: "Prancha isométrica", sets: "3 x 45s", load: "—", note: "Respiração contínua" },
];

function Treinos() {
  const [done, setDone] = useState<string[]>([]);
  const toggle = (n: string) =>
    setDone((d) => (d.includes(n) ? d.filter((x) => x !== n) : [...d, n]));

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="Treinos"
        title="Treino A · Inferiores força"
        lead="6 blocos · 62 minutos · ciclo 3 de 4"
      />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Blocos de hoje"
          action={
            <span className="font-mono text-xs text-muted-foreground">
              {done.length}/{blocks.length}
            </span>
          }
        >
          <ul className="grid gap-2">
            {blocks.map((b) => {
              const isDone = done.includes(b.name);
              return (
                <motion.li
                  key={b.name}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => toggle(b.name)}
                  className={`grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors ${
                    isDone ? "border-primary/40 bg-primary/5" : "border-border bg-surface-2/40"
                  }`}
                >
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-md border ${
                      isDone ? "border-primary bg-primary text-primary-foreground" : "border-border-strong"
                    }`}
                  >
                    {isDone && <Check className="size-3.5" />}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{b.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {b.sets} · {b.load} · {b.note}
                    </p>
                  </div>
                  <PlayCircle className="size-5 shrink-0 text-muted-foreground" />
                </motion.li>
              );
            })}
          </ul>
        </Panel>

        <div className="grid gap-4">
          <Panel title="Orientações do Leonardo">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Mantenha o descanso indicado — a qualidade da série principal importa mais que o
              volume total. Se a percepção de esforço passar de 8, reduza a carga em 5% e me avise.
            </p>
          </Panel>
          <Panel title="Histórico">
            <ul className="grid gap-2">
              {workouts.map((w) => (
                <li
                  key={w.name}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-surface-2/40 px-4 py-3"
                >
                  <p className="truncate text-sm">{w.name}</p>
                  <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{w.when}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
