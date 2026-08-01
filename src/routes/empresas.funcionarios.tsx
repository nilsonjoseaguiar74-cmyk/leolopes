import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Panel } from "@/components/app/shell";
import { employees } from "@/lib/mock";
import { useState } from "react";

export const Route = createFileRoute("/empresas/funcionarios")({
  component: Funcionarios,
});

function Funcionarios() {
  const [q, setQ] = useState("");
  const rows = employees.filter((e) =>
    `${e.name} ${e.dept} ${e.program}`.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="grid gap-8">
      <PageHeader
        eyebrow="Funcionários"
        title="312 colaboradores no programa"
        lead="Acompanhamento por área, programa e nível de adesão."
        action={
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filtrar…"
            className="w-full rounded-full border border-input bg-surface/60 px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary/60 sm:w-64"
          />
        }
      />

      <Panel title={`${rows.length} resultados`}>
        <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="text-left">
                {["Colaborador", "Área", "Programa", "Adesão", "Status"].map((h) => (
                  <th key={h} className="eyebrow pb-3 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((e) => (
                <tr key={e.name}>
                  <td className="py-3.5">{e.name}</td>
                  <td className="py-3.5 text-muted-foreground">{e.dept}</td>
                  <td className="py-3.5 text-muted-foreground">{e.program}</td>
                  <td className="py-3.5 font-mono text-xs">{e.adherence}%</td>
                  <td className="py-3.5">
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] ${
                        e.adherence >= 70
                          ? "bg-primary/15 text-primary"
                          : "bg-surface-2 text-muted-foreground"
                      }`}
                    >
                      {e.adherence >= 70 ? "Engajado" : "Atenção"}
                    </span>
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
