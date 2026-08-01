import { createFileRoute, Link } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, Flame, Target } from "lucide-react";

import { PageHeader, Panel, StatCard } from "@/components/app/shell";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { insights, student, timeline, weightSeries, workouts } from "@/lib/mock";

export const Route = createFileRoute("/aluno/")({
  component: AlunoDashboard,
});

function AlunoDashboard() {
  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow={`Bem-vinda de volta`}
        title={`Olá, ${student.name.split(" ")[0]}`}
        lead={student.nextSession}
        action={
          <Link
            to="/aluno/treinos"
            className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Iniciar treino de hoje
            <ArrowUpRight className="size-4" />
          </Link>
        }
      />

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {insights.map((i) => (
          <StaggerItem key={i.label}>
            <StatCard label={i.label} value={i.value} hint={i.hint} />
          </StaggerItem>
        ))}
      </Stagger>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Panel title="Composição corporal — últimos 6 meses">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightSeries}>
                <defs>
                  <linearGradient id="gPeso" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  domain={[60, 80]}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="peso"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  fill="url(#gPeso)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <div className="grid gap-4">
          <Panel title="Objetivo do ciclo">
            <div className="flex items-start gap-3">
              <Target className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-muted-foreground">{student.goal}</p>
            </div>
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Progresso</span>
                <span className="font-mono">68%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
                <div className="h-full w-[68%] rounded-full" style={{ background: "var(--gradient-signal)" }} />
              </div>
            </div>
          </Panel>
          <Panel title="Constância">
            <div className="flex items-center gap-4">
              <div className="grid size-14 place-items-center rounded-2xl bg-primary/15">
                <Flame className="size-6 text-primary" />
              </div>
              <div>
                <p className="font-mono text-2xl">{student.streak} dias</p>
                <p className="text-xs text-muted-foreground">sequência ativa · adesão {student.adherence}%</p>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel
          title="Próximos treinos"
          action={
            <Link to="/aluno/treinos" className="text-xs text-primary">
              ver todos
            </Link>
          }
        >
          <ul className="grid gap-2">
            {workouts.map((w) => (
              <li
                key={w.name}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-surface-2/40 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{w.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {w.when} · {w.blocks} blocos · {w.minutes} min
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-[11px] ${
                    w.status === "Concluído"
                      ? "bg-primary/15 text-primary"
                      : "bg-surface-2 text-muted-foreground"
                  }`}
                >
                  {w.status}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Últimas atualizações"
          action={
            <Link to="/aluno/timeline" className="text-xs text-primary">
              timeline
            </Link>
          }
        >
          <ol className="relative grid gap-5 pl-5">
            <span className="absolute left-[5px] top-1.5 h-[calc(100%-12px)] w-px bg-border" />
            {timeline.map((t) => (
              <li key={t.title} className="relative">
                <span className="absolute -left-5 top-1.5 size-2.5 rounded-full border border-primary bg-background" />
                <p className="font-mono text-[11px] text-muted-foreground">{t.date}</p>
                <p className="mt-1 text-sm font-medium">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </div>
  );
}
