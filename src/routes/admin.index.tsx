import { createFileRoute, Link } from "@tanstack/react-router";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight } from "lucide-react";

import { PageHeader, Panel, StatCard } from "@/components/app/shell";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { adminKpis, crmCards, revenueSeries } from "@/lib/mock";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="Visão geral"
        title="Operação Leonardo OS"
        lead="Pipeline, receita e produção de conteúdo em um só lugar."
        action={
          <Link
            to="/admin/crm"
            className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Abrir CRM
            <ArrowUpRight className="size-4" />
          </Link>
        }
      />

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminKpis.map((k) => (
          <StaggerItem key={k.label}>
            <StatCard label={k.label} value={k.value} hint={k.hint} />
          </StaggerItem>
        ))}
      </Stagger>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Panel title="Receita recorrente (R$ mil)">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueSeries}>
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "var(--color-surface-2)" }}
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="receita" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel
          title="Pipeline recente"
          action={
            <Link to="/admin/crm" className="text-xs text-primary">
              ver kanban
            </Link>
          }
        >
          <ul className="grid gap-2">
            {crmCards.slice(0, 6).map((c) => (
              <li
                key={c.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-surface-2/40 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.stage} · {c.origin}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">{c.value}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { t: "Captação por pré-cadastro", d: "Leonardo cadastra nome e WhatsApp; o sistema gera o convite com dados pré-preenchidos." },
          { t: "Cadastro espontâneo", d: "O visitante se cadastra pelo site e entra no CRM aguardando aprovação." },
          { t: "Incorporações", d: "Instagram, YouTube, Vimeo, Spotify e Maps via URL ou iFrame configurável." },
        ].map((c) => (
          <Panel key={c.t} title={c.t}>
            <p className="text-sm leading-relaxed text-muted-foreground">{c.d}</p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
