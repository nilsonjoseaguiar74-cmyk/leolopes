import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { PageHeader, Panel, StatCard } from "@/components/app/shell";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { loadSeries, weightSeries } from "@/lib/mock";

export const Route = createFileRoute("/aluno/evolucao")({
  component: Evolucao,
});

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
} as const;

const tooltip = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  fontSize: 12,
};

function Evolucao() {
  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="Minha evolução"
        title="Cada número tem um contexto"
        lead="Medidas, cargas e indicadores acompanhados ciclo a ciclo."
      />

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Peso atual", value: "68,4 kg", hint: "-5,8 kg em 6 meses" },
          { label: "Gordura corporal", value: "24,3%", hint: "-6,7 pts" },
          { label: "Massa magra", value: "51,8 kg", hint: "+1,9 kg" },
          { label: "Carga semanal", value: "4.510 kg", hint: "+41% desde fev" },
        ].map((s) => (
          <StaggerItem key={s.label}>
            <StatCard {...s} />
          </StaggerItem>
        ))}
      </Stagger>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Peso x gordura corporal">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightSeries}>
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} />
                <Tooltip contentStyle={tooltip} />
                <Line type="monotone" dataKey="peso" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                <Line
                  type="monotone"
                  dataKey="gordura"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Volume de carga por semana">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loadSeries}>
                <XAxis dataKey="week" {...axis} />
                <YAxis {...axis} />
                <Tooltip contentStyle={tooltip} cursor={{ fill: "var(--color-surface-2)" }} />
                <Bar dataKey="carga" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel title="Medidas corporais (cm)">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-left">
                {["Região", "Fev", "Abr", "Jul", "Variação"].map((h) => (
                  <th key={h} className="eyebrow pb-3 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["Cintura", "84,0", "79,5", "75,2", "-8,8"],
                ["Quadril", "102,0", "99,0", "96,5", "-5,5"],
                ["Coxa", "58,0", "57,2", "57,8", "-0,2"],
                ["Braço", "29,0", "29,8", "30,6", "+1,6"],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={`py-3 ${i === 4 ? "font-mono text-primary" : i === 0 ? "" : "font-mono text-muted-foreground"}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
