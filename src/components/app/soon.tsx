import { PageHeader } from "@/components/app/shell";
import { Construction } from "lucide-react";

export function ComingSoon({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="grid gap-8">
      <PageHeader eyebrow={eyebrow} title={title} lead="Módulo mapeado no roadmap do Leonardo OS." />
      <div className="surface-panel p-8">
        <Construction className="size-5 text-primary" />
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Estrutura de navegação e arquitetura já definidas. Este módulo entra nas próximas
          iterações com os seguintes blocos:
        </p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {items.map((i) => (
            <li
              key={i}
              className="rounded-xl border border-border bg-surface-2/50 px-4 py-3 text-sm text-muted-foreground"
            >
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
