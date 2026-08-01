import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/shell";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { timeline } from "@/lib/mock";

export const Route = createFileRoute("/aluno/timeline")({
  component: Timeline,
});

function Timeline() {
  const entries = [...timeline, ...timeline.map((t) => ({ ...t, date: `${t.date} · 2025` }))];
  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="Timeline"
        title="Cada marco da sua jornada"
        lead="Reavaliações, ciclos, registros fotográficos e feedbacks em ordem cronológica."
      />

      <Stagger className="relative grid gap-6 pl-6" gap={0.06}>
        <span className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-px bg-border" />
        {entries.map((t, i) => (
          <StaggerItem key={`${t.title}-${i}`}>
            <div className="relative">
              <span className="absolute -left-6 top-2 size-3.5 rounded-full border border-primary bg-background" />
              <div className="surface-panel p-5">
                <p className="font-mono text-[11px] text-muted-foreground">{t.date}</p>
                <p className="mt-1.5 text-sm font-medium">{t.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
