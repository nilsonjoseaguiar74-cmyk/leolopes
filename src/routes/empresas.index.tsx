import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { PageHeader, Panel, StatCard } from "@/components/app/shell";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { b2bEngagement, b2bKpis, employees } from "@/lib/mock";

export const Route = createFileRoute("/empresas/")({
  component: EmpresasDashboard,
});

function EmpresasDashboard() {
  return (
    <div className="grid gap-6 sm:gap-8">
      <PageHeader
        eyebrow="Grupo Norte · Programa 2025"
        title="Saúde como indicador de negócio"
        lead="Visão executiva de adesão, absenteísmo e engajamento por área."
        action={
          <button className="self-start rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary">
            Exportar relatório
          </button>
        }
      />

      <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {b2bKpis.map((k) => (
          <StaggerItem key={k.label}>
            <StatCard label={k.label} value={k.value} />
          </StaggerItem>
        ))}
      </Stagger>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Panel title="Adesão ao programa (%)">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={b2bEngagement}>
                <defs>
                  <linearGradient id="gAdesao" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area type="monotone" dataKey="adesao" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#gAdesao)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Programas ativos">
          <ul className="grid gap-3">
            {[
              { n: "Qualidade de Vida", p: 142 },
              { n: "Corrida Corporativa", p: 68 },
              { n: "Ginástica Laboral", p: 74 },
              { n: "Musculação Assistida", p: 28 },
            ].map((p) => (
              <li key={p.n}>
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate">{p.n}</span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">{p.p}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(p.p / 142) * 100}%`, background: "var(--gradient-signal)" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Colaboradores em destaque">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead>
              <tr className="text-left">
                {["Colaborador", "Área", "Programa", "Adesão"].map((h) => (
                  <th key={h} className="eyebrow pb-3 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {employees.map((e) => (
                <tr key={e.name}>
                  <td className="py-3.5">{e.name}</td>
                  <td className="py-3.5 text-muted-foreground">{e.dept}</td>
                  <td className="py-3.5 text-muted-foreground">{e.program}</td>
                  <td className="py-3.5">
                    <span className="font-mono text-xs">{e.adherence}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
