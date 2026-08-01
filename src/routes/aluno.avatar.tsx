import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Camera, GitCompare, Layers, Ruler, Sparkles, Target, History, Flag } from "lucide-react";

import { PageHeader, Panel } from "@/components/app/shell";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export const Route = createFileRoute("/aluno/avatar")({
  component: AvatarEvolutivo,
});

const flow = [
  { icon: Camera, label: "Captura guiada" },
  { icon: Ruler, label: "Padronização" },
  { icon: Layers, label: "Avatar" },
  { icon: Sparkles, label: "Editor" },
  { icon: Target, label: "Objetivos" },
  { icon: History, label: "Timeline" },
  { icon: GitCompare, label: "Comparação" },
  { icon: Flag, label: "Metas" },
];

function AvatarEvolutivo() {
  const [stage, setStage] = useState(2);
  const [progress, setProgress] = useState(60);

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="Avatar Evolutivo"
        title="Seu corpo em linha do tempo"
        lead="Captura padronizada, avatar gerado e comparação objetiva entre ciclos."
      />

      <div className="no-scrollbar -mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
        <div className="flex min-w-max items-center gap-2">
          {flow.map((f, i) => {
            const Icon = f.icon;
            const active = i <= stage;
            return (
              <button
                key={f.label}
                onClick={() => setStage(i)}
                className={`flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-xs transition-colors ${
                  active
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                <Icon className="size-3.5" />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Panel title="Comparação de ciclos">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Fevereiro", tint: "oklch(0.26 0.01 155)", scale: 1 },
              { label: "Julho", tint: "oklch(0.33 0.07 150)", scale: 0.94 },
            ].map((c) => (
              <div key={c.label} className="grid gap-3">
                <div
                  className="relative grid aspect-[3/4] place-items-center overflow-hidden rounded-xl border border-border"
                  style={{ background: `linear-gradient(160deg, ${c.tint}, oklch(0.18 0.008 155))` }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: c.scale }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="h-3/4 w-1/3 rounded-full border border-primary/40 bg-primary/10 backdrop-blur"
                  />
                  <span className="eyebrow absolute left-3 top-3 text-[10px]">{c.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Transição entre ciclos</span>
              <span className="font-mono">{progress}%</span>
            </div>
            <input
              type="range"
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="mt-3 w-full accent-primary"
              aria-label="Transição entre ciclos"
            />
          </div>
        </Panel>

        <div className="grid gap-4">
          <Panel title="Editor de objetivos">
            <div className="grid gap-5">
              {[
                { label: "Redução de gordura", value: 72 },
                { label: "Ganho de massa magra", value: 45 },
                { label: "Capacidade aeróbica", value: 61 },
              ].map((o) => (
                <div key={o.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span>{o.label}</span>
                    <span className="font-mono text-muted-foreground">{o.value}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${o.value}%` }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{ background: "var(--gradient-signal)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {[
              { k: "Ciclos registrados", v: "6" },
              { k: "Próxima captura", v: "12 ago" },
            ].map((s) => (
              <StaggerItem key={s.k}>
                <div className="surface-panel p-5">
                  <p className="eyebrow">{s.k}</p>
                  <p className="mt-3 font-mono text-xl">{s.v}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </div>
  );
}
